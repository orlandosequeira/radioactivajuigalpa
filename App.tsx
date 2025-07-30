
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { AudioPlayer } from './components/AudioPlayer.tsx';
import { ImageSlider } from './components/ImageSlider.tsx';
import { DailyVerse } from './components/DailyVerse.tsx';
import { Footer } from './components/Footer.tsx';
import { getContent, AppContent } from './services/geminiService.ts';

function App() {
  const [logoUrl, setLogoUrl] = useState('');
  const [slides, setSlides] = useState<AppContent['slides']>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      try {
        const content = await getContent();
        setLogoUrl(content.logoUrl);
        setSlides(content.slides);
      } catch (error) {
        console.error("No se pudo cargar el contenido inicial", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadContent();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
            <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl text-yellow-400 animate-pulse">Cargando RADIOACTIVAJUIGALPA...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-yellow-400/30">
      <Header logoUrl={logoUrl} />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 space-y-8 md:space-y-12">
        <AudioPlayer />
        <ImageSlider slides={slides} />
        <DailyVerse />
      </main>
      <Footer />
    </div>
  );
}

export default App;
