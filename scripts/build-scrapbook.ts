#!/usr/bin/env npx tsx

import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';
import sharp from 'sharp';

const ROOT = path.resolve(__dirname, '..');
const PHOTOS_DIR = path.join(ROOT, 'photos');
const PUBLIC_SCRAPBOOK = path.join(ROOT, 'public', 'scrapbook');
const ODS_PATH = path.join(ROOT, 'messages.ods');
const OUT_PATH = path.join(ROOT, 'lib', 'scrapbook-data.ts');

// ── Configuration ───────────────────────────────────────────────────────────

const GROUP_COLORS: Record<string, string> = {
  'Family':                           '#b8d4e8',
  'Best Friend':                      '#e8a0a8',
  'University Friends (Pharmacy)':    '#8faa87',
  'huixin':                           '#8faa87',
  'jiaying':                          '#7abeaf',
  'shan':                             '#c9a227',
  'melissa':                          '#9b8ec4',
  'Junior College':                   '#c9a227',
  'AstraZeneca':                      '#e07a5f',
  "Clive's Friend":                   '#7ab3d4',
  "Rach & SM, Fel & Gab and Kelvin + Adriel":  '#c4879b',
};
const DEFAULT_COLOR = '#c9a227';

const FOLDER_GROUP_OVERRIDE: Record<string, string> = {
  university_friends: 'University Friends (Pharmacy)',
  junior_college:     'Junior College',
  family:             'Family',
  astrazeneca:        'AstraZeneca',
  rachael:            'Rach & SM, Fel & Gab and Kelvin + Adriel',
};

// ── 1. Parse ODS (Pure JS) ──────────────────────────────────────────────────

console.log('Reading messages.ods...');
const workbook = XLSX.readFile(ODS_PATH);
const sheetName = workbook.SheetNames[0];
const rawRows = XLSX.utils.sheet_to_json<string[]>(workbook.Sheets[sheetName], { header: 1 });

interface RawRow { group: string; name: string; message: string; hasPhotos: boolean }

const dataRows: RawRow[] = rawRows
  .slice(1) // Skip header
  .filter(r => r[0])
  .map(r => {
    const group     = String(r[0] || '').trim().replace('Pharamacy', 'Pharmacy');
    let   name      = String(r[1] || '').trim();
    let   message   = String(r[2] || '').trim();
    const hasPhotos = String(r[3] || '').trim().toLowerCase() === 'yes';

    // Auto-fix shifted columns
    if (name.length > 50 && !message) {
      message = name;
      name = '';
    }
    if (!name) name = group;

    return { group, name, message, hasPhotos };
  });

// ── 2. Grouping & Normalization ─────────────────────────────────────────────

const groupMap = new Map<string, { name: string; message: string; hasPhotos: boolean }[]>();
const memberToGroup = new Map<string, string>();
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

for (const row of dataRows) {
  if (!groupMap.has(row.group)) groupMap.set(row.group, []);
  groupMap.get(row.group)!.push({ name: row.name, message: row.message, hasPhotos: row.hasPhotos });
  memberToGroup.set(norm(row.name), row.group);
}

function folderToGroup(folderName: string): string | null {
  if (FOLDER_GROUP_OVERRIDE[folderName]) return FOLDER_GROUP_OVERRIDE[folderName];
  if (memberToGroup.has(norm(folderName))) return memberToGroup.get(norm(folderName))!;
  const groupMatch = [...groupMap.keys()].find(g => norm(g) === norm(folderName) || norm(g).startsWith(norm(folderName)));
  return groupMatch || null;
}

// ── 3. Image Processing (Sharp) ─────────────────────────────────────────────

async function processImages() {
  fs.mkdirSync(PUBLIC_SCRAPBOOK, { recursive: true });
  const groupPhotos = new Map<string, { src: string; caption: string; rotation: number }[]>();
  
  const sourceFolders = fs.existsSync(PHOTOS_DIR) ? fs.readdirSync(PHOTOS_DIR) : [];
  const processedFolders = fs.readdirSync(PUBLIC_SCRAPBOOK);
  const allFolders = [...new Set([...sourceFolders, ...processedFolders])];

  for (const folder of allFolders) {
    if (folder === '.DS_Store') continue;

    const targetGroup = folderToGroup(folder);
    if (!targetGroup) {
      console.warn(`  ⚠ No group match for folder: ${folder}`);
      continue;
    }

    const srcDir = path.join(PHOTOS_DIR, folder);
    const destDir = path.join(PUBLIC_SCRAPBOOK, folder);
    fs.mkdirSync(destDir, { recursive: true });

    // Handle files in source (new uploads)
    if (fs.existsSync(srcDir)) {
      const files = fs.readdirSync(srcDir).filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f));
      for (const file of files) {
        const ext = path.extname(file);
        const fileNameNoExt = path.basename(file, ext);
        const destFileName = `${fileNameNoExt}.webp`;
        const destPath = path.join(destDir, destFileName);

        console.log(`    Optimizing: ${folder}/${file}`);
        await sharp(path.join(srcDir, file))
          .resize(1600, 1600, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(destPath);
        
        fs.unlinkSync(path.join(srcDir, file)); // Remove original
      }
      // Clean up empty source folder
      const remaining = fs.readdirSync(srcDir).filter(f => f !== '.DS_Store');
      if (remaining.length === 0) fs.rmSync(srcDir, { recursive: true, force: true });
    }

    // Index all image files (webp from conversion, or jpg/jpeg/png placed directly)
    const optimizedFiles = fs.readdirSync(destDir).filter(f => /\.(webp|jpe?g|png|gif)$/i.test(f));
    if (!groupPhotos.has(targetGroup)) groupPhotos.set(targetGroup, []);

    for (const file of optimizedFiles) {
      // Create a deterministic "scrapbook tilt" (-3 to 3 degrees) based on filename
      const charCodeSum = file.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const rotation = (charCodeSum % 7) - 3; 

      groupPhotos.get(targetGroup)!.push({
        src: `/scrapbook/${folder}/${encodeURIComponent(file)}`,
        caption: memberToGroup.has(norm(folder)) ? folder : targetGroup,
        rotation
      });
    }
  }
  return groupPhotos;
}

// ── 4. Main Build ──────────────────────────────────────────────────────────

async function main() {
  const groupPhotos = await processImages();

  const output = [...groupMap.entries()].map(([groupName, members]) => {
    const color = GROUP_COLORS[groupName] ?? DEFAULT_COLOR;
    const allPhotos = groupPhotos.get(groupName) ?? [];

    return {
      groupName,
      color,
      allPhotos,
      members: members.map(m => ({
        name: m.name,
        message: m.message || undefined,
        hasPhotos: m.hasPhotos,
        // Identify which photos belong specifically to this member folder (case-insensitive)
        photos: allPhotos
          .filter(p => {
            const folder = decodeURIComponent(p.src.split('/scrapbook/')[1]?.split('/')[0] ?? '');
            return norm(folder) === norm(m.name);
          })
      }))
    };
  });

  const ts = `// AUTO-GENERATED - DO NOT EDIT
export interface ScrapbookMember {
  name: string;
  message?: string;
  hasPhotos: boolean;
  photos: { src: string; caption: string; rotation: number }[];
}

export interface ScrapbookGroup {
  groupName: string;
  color: string;
  members: ScrapbookMember[];
  allPhotos: { src: string; caption: string; rotation: number }[];
}

export const scrapbookGroups: ScrapbookGroup[] = ${JSON.stringify(output, null, 2)};
`;

  fs.writeFileSync(OUT_PATH, ts);
  console.log(`\n✅ Success: Wrote ${output.length} groups to ${OUT_PATH}`);
}

main().catch(console.error);