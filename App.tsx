import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AudioPlayer } from './components/AudioPlayer';
import { ImageSlider } from './components/ImageSlider';
import { DailyVerse } from './components/DailyVerse';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { getContent, saveContent, AppContent } from './services/geminiService';

function App() {
  const [logoUrl, setLogoUrl] = useState('');
  const [slides, setSlides] = useState<AppContent['slides']>([]);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [showAdminButton, setShowAdminButton] = useState(false);
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setShowAdminButton(true);
    }
  }, []);

  const handleAdminSave = async (data: Omit<AppContent, 'articles'>) => {
    try {
      await saveContent(data);
      setLogoUrl(data.logoUrl);
      setSlides(data.slides);
      setIsAdminPanelOpen(false);
    } catch (error) {
      console.error("No se pudo guardar el contenido", error);
      alert("Error: No se pudieron guardar los cambios. Por favor, inténtelo de nuevo.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl text-yellow-400 animate-pulse">Cargando RADIOACTIVAJUIGALPA...</p>
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
      <Footer 
        showAdminButton={showAdminButton} 
        onAdminClick={() => setIsAdminPanelOpen(true)} 
      />
      {isAdminPanelOpen && (
        <AdminPanel
          logoUrl={logoUrl}
          slides={slides}
          onClose={() => setIsAdminPanelOpen(false)}
          onSave={handleAdminSave}
        />
      )}
    </div>
  );
}

export default App;
