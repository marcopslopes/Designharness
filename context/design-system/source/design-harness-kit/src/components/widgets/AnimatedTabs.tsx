import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
const tabs = ['Services', 'Reviews', 'Portfolio', 'Details'];
export function AnimatedTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const handleKeyDown = (
  e: KeyboardEvent<HTMLButtonElement>,
  index: number) =>
  {
    let newIndex = index;
    if (e.key === 'ArrowRight') {
      newIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (index - 1 + tabs.length) % tabs.length;
    }
    if (newIndex !== index) {
      setActiveTab(tabs[newIndex]);
      tabRefs.current[newIndex]?.focus();
    }
  };
  return (
    <div
      className="bg-white rounded-2xl p-2"
      style={{
        boxShadow: 'var(--shadow-border)'
      }}>
      
      <div
        role="tablist"
        aria-label="Profile sections"
        className="flex border-b border-line">
        
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              ref={(el) => tabRefs.current[index] = el}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`
                relative flex-1 py-3 px-1 text-sm font-bold text-center
                transition-colors duration-200 ease-out
                focus-visible:outline focus-visible:outline-3 focus-visible:outline-teal focus-visible:-outline-offset-2 rounded-t-lg
                ${isActive ? 'text-ink' : 'text-muted hover:text-ink-soft'}
              `}>
              
              {tab}
              {isActive &&
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-ink"
                initial={false}
                transition={{
                  type: 'spring',
                  bounce: 0.2,
                  duration: 0.5
                }} />

              }
            </button>);

        })}
      </div>
      <div className="p-6 text-center text-sm text-muted">
        Content for {activeTab}
      </div>
    </div>);

}