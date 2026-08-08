/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { NavigationTab } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { PlaygroundView } from './components/PlaygroundView';
import { DataStructuresView } from './components/DataStructuresView';
import { AlgorithmsView } from './components/AlgorithmsView';
import { ToolsView } from './components/ToolsView';
import { ChallengesView } from './components/ChallengesView';
import { BlogView } from './components/BlogView';
import { FeedbackModal } from './components/FeedbackModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);

  React.useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  const renderCurrentView = () => {
    if (currentTab === 'home') {
      return <HomeView setCurrentTab={setCurrentTab} />;
    }
    if (currentTab === 'playground') {
      return <PlaygroundView />;
    }
    if (currentTab === 'data-structures') {
      return <DataStructuresView setCurrentTab={setCurrentTab} />;
    }
    if (currentTab === 'algorithms') {
      return <AlgorithmsView />;
    }
    if (currentTab === 'tools') {
      return <ToolsView />;
    }
    if (currentTab === 'challenges') {
      return <ChallengesView />;
    }
    if (currentTab === 'blog' || currentTab === 'examples') {
      return <BlogView setCurrentTab={setCurrentTab} />;
    }
    return null;
  };

  return (
    <div className="min-h-screen transition-colors duration-300 dark bg-slate-950 text-slate-100 font-sans antialiased flex flex-col">
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenFeedback={() => setIsFeedbackOpen(true)}
      />

      <main className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.section
            key={currentTab}
            initial={{ opacity: 0, y: 10, scale: 0.998, filter: 'blur(2px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, scale: 0.996, filter: 'blur(2px)' }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="h-full"
          >
            {renderCurrentView()}
          </motion.section>
        </AnimatePresence>
      </main>

      <Footer setCurrentTab={setCurrentTab} />

      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </div>
  );
}
