import { useState } from 'react';
import IntroScreen from '@/components/IntroScreen';
import Hero from '@/components/Hero';
import Cake from '@/components/Cake';
import Confetti from '@/components/Confetti';
import FloatingDecorations from '@/components/FloatingDecorations';
import SongsSection from '@/components/SongsSection';
import WishCards from '@/components/WishCards';
import Closing from '@/components/Closing';
import { birthdayData } from '@/data/birthdayData';

function App() {
  const [opened, setOpened] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    setConfettiActive(true);
  };

  const handleCandlesBlown = () => {
    setConfettiActive(false);
    setTimeout(() => setConfettiActive(true), 50);
  };

  return (
    <div className="relative min-h-[100dvh] w-full max-w-full overflow-x-hidden selection:bg-rose-200 selection:text-rose-700">
      <FloatingDecorations />
      <Confetti active={confettiActive} duration={7000} />

      {!opened && <IntroScreen onOpen={handleOpen} name={birthdayData.introName || birthdayData.name} />}

      {opened && (
        <main className="relative w-full max-w-full overflow-x-hidden">
          <Hero active={opened} />
          <Cake onAllBlown={handleCandlesBlown} />
          <SongsSection />
          <WishCards />
          <Closing />
        </main>
      )}
    </div>
  );
}

export default App;
