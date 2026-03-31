import Hero from '@/components/Hero';
import Details from '@/components/Details';
import Gallery from '@/components/Gallery';
import RSVPForm from '@/components/RSVPForm';
import MusicToggle from '@/components/MusicToggle';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Hero />

      <div className="relative">
        {/* Tulip Color Accents in the Background */}
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-transparent to-pink-50/50 -z-10" />
        <Details />

        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-yellow-50/30 to-transparent -z-10" />
        <Gallery />

        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-red-50/30 to-transparent -z-10" />
        <RSVPForm />

        <footer className="py-12 bg-white text-center border-t border-gray-100">
          <p className="font-serif italic text-gray-400 text-sm">
            Designed with love for a beautiful beginning.
          </p>
        </footer>
      </div>

      <MusicToggle />
    </main>
  );
}
