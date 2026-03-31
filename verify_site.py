from playwright.sync_api import sync_playwright
import time

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos",
            viewport={'width': 1280, 'height': 800}
        )
        page = context.new_page()

        try:
            # 1. Load Home Page
            print("Navigating to home page...")
            page.goto("http://localhost:3000", wait_until="networkidle", timeout=60000)
            page.wait_for_timeout(2000)
            page.screenshot(path="/home/jules/verification/screenshots/1_hero.png")

            # 2. Check Countdown & Save to Calendar
            print("Checking Hero section...")
            page.get_by_role("button", name="Save to Calendar").wait_for(state="visible")
            page.wait_for_timeout(1000)

            # 3. Scroll to Details
            print("Scrolling to Details...")
            page.evaluate("window.scrollTo(0, 1000)")
            page.wait_for_timeout(1000)
            page.screenshot(path="/home/jules/verification/screenshots/2_details.png")

            # 4. Scroll to Gallery
            print("Scrolling to Gallery...")
            page.evaluate("window.scrollTo(0, 2000)")
            page.wait_for_timeout(1000)
            page.screenshot(path="/home/jules/verification/screenshots/3_gallery.png")

            # 5. Scroll to RSVP
            print("Scrolling to RSVP...")
            page.evaluate("window.scrollTo(0, 3000)")
            page.wait_for_timeout(1000)
            page.screenshot(path="/home/jules/verification/screenshots/4_rsvp.png")

            # 6. Test Music Toggle
            print("Testing Music Toggle...")
            music_btn = page.locator("button:has(svg.lucide-music), button:has(svg.lucide-volume2)")
            music_btn.click()
            page.wait_for_timeout(1000)
            page.screenshot(path="/home/jules/verification/screenshots/5_music_playing.png")

            print("Verification complete.")

        except Exception as e:
            print(f"Error during verification: {e}")
            page.screenshot(path="/home/jules/verification/screenshots/error.png")
        finally:
            context.close()
            browser.close()

if __name__ == "__main__":
    run_verification()
