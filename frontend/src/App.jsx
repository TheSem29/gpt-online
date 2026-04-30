import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatWindow from './components/ChatWindow';
import AdBanner from './components/AdBanner';
import AdPopup from './components/AdPopup';
import SubscriptionModal from './components/SubscriptionModal';

function App() {
  const [sessionInfo, setSessionInfo] = useState(null);
  const [showAdPopup, setShowAdPopup] = useState(false);
  const [adBannerVisible, setAdBannerVisible] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);

  // Load session info on mount
  useEffect(() => {
    // In a real app you would call /api/session to get flags
    // For placeholder we just set defaults
    setSessionInfo({ adDisabled: false });
  }, []);

  const handleResponseFlags = (flags) => {
    if (flags.adBanner) setAdBannerVisible(true);
    if (flags.adPopup) setShowAdPopup(true);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4 text-center">
        <h1 className="text-xl font-semibold">GPT Онлайн на русском без регистрации</h1>
      </header>
      {adBannerVisible && !sessionInfo?.adDisabled && <AdBanner />}
      <main className="flex-1 overflow-auto p-4">
        <ChatWindow onResponseFlags={handleResponseFlags} />
      </main>
      <footer className="p-2 text-center text-sm text-gray-600">
        © 2026 GPT Онлайн
      </footer>
      {showAdPopup && !sessionInfo?.adDisabled && (
        <AdPopup onClose={() => setShowAdPopup(false)} />
      )}
      {showSubscription && (
        <SubscriptionModal onClose={() => setShowSubscription(false)} />
      )}
    </div>
  );
}

export default App;
