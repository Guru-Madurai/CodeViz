import React from 'react';
import { NavigationTab } from '../types';
import {
  Code2,
  Home,
  Play,
  Database,
  Cpu,
  Wrench,
  Trophy,
  BookOpen,
  MessageSquare,
  Sparkles,
  Layers
} from 'lucide-react';

interface HeaderProps {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  onOpenFeedback: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  onOpenFeedback,
}) => {
  const navItems = [
    { id: 'home' as NavigationTab, label: 'Home', icon: Home },
    { id: 'playground' as NavigationTab, label: 'Playground', icon: Play },
    { id: 'data-structures' as NavigationTab, label: 'Data Structures', icon: Database },
    { id: 'algorithms' as NavigationTab, label: 'Algorithms', icon: Cpu },
    { id: 'tools' as NavigationTab, label: 'Tools', icon: Wrench },
    { id: 'challenges' as NavigationTab, label: 'Challenges', icon: Trophy },
    { id: 'blog' as NavigationTab, label: 'Blog', icon: BookOpen },
    { id: 'examples' as NavigationTab, label: 'Examples', icon: Layers },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl transition-all shadow-xl bg-slate-950/85 border-b border-slate-800/80 text-slate-100 shadow-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo */}
          <button
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
            id="brand-logo-btn"
          >
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 group-hover:shadow-indigo-500/50 transition-all">
              <Code2 className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-indigo-400">
                Code Visualizer
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-2xl border transition-colors shadow-inner bg-slate-900/90 border-slate-800/90">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              const isDataStructures = item.id === 'data-structures';
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/40'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
                    } ${isDataStructures ? 'relative overflow-hidden ds-nav-pill' : ''} ${isDataStructures && isActive ? 'ds-nav-pill-active' : ''}`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'} ${isDataStructures ? 'ds-nav-icon' : ''} ${isDataStructures && isActive ? 'ds-nav-icon-active' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenFeedback}
              id="open-feedback-btn"
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all shadow-sm bg-slate-900/90 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/80 hover:border-slate-700"
            >
              <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Feedback</span>
            </button>
          </div>
        </div>

        {/* Mobile Nav Scroll Row */}
        <div className="flex lg:hidden overflow-x-auto pb-2.5 pt-1 gap-1.5 no-scrollbar border-t border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            const isDataStructures = item.id === 'data-structures';
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm ring-1 ring-indigo-400/30'
                    : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border border-slate-800'
                  } ${isDataStructures ? 'relative overflow-hidden ds-nav-pill' : ''} ${isDataStructures && isActive ? 'ds-nav-pill-active' : ''}`}
              >
                <Icon className={`w-3.5 h-3.5 ${isDataStructures ? 'ds-nav-icon' : ''} ${isDataStructures && isActive ? 'ds-nav-icon-active' : ''}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
