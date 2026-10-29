import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
export function PullToRefresh() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [items, setItems] = useState([1, 2, 3]);
  const handlePull = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setTimeout(() => {
      setItems((prev) => [Date.now(), ...prev.slice(0, 2)]);
      setIsRefreshing(false);
    }, 1500);
  };
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-[320px] mx-auto">
      {/* Phone Frame */}
      <div className="relative w-full h-[400px] bg-paper rounded-[32px] shadow-sm border-[6px] border-sunken overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 inset-x-0 h-14 bg-paper/80 backdrop-blur-md z-20 flex items-center justify-center border-b border-line">
          <span className="font-bold text-[15px] text-ink">Notifications</span>
        </div>

        {/* Scroll Area */}
        <div className="absolute inset-0 pt-14 bg-canvas overflow-hidden">
          {/* Refresh Indicator */}
          <motion.div
            className="absolute top-14 inset-x-0 h-16 flex items-center justify-center z-10"
            initial={{
              y: -64,
              opacity: 0
            }}
            animate={{
              y: isRefreshing ? 0 : -64,
              opacity: isRefreshing ? 1 : 0
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25
            }}>
            
            <div className="size-8 rounded-full bg-paper shadow-sm flex items-center justify-center">
              <motion.div
                animate={{
                  rotate: isRefreshing ? 360 : 0
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="size-5 rounded-full border-2 border-line border-t-ink" />
              
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="p-4 space-y-3"
            animate={{
              y: isRefreshing ? 64 : 0
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25
            }}>
            
            <AnimatePresence initial={false}>
              {items.map((id, index) =>
              <motion.div
                key={id}
                initial={{
                  opacity: 0,
                  y: -20,
                  scale: 0.95
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 30
                }}
                className={`p-4 rounded-2xl border border-line flex gap-3 ${index === 0 && !isRefreshing ? 'bg-leaf-soft/30' : 'bg-paper'}`}>
                
                  <div className="size-10 rounded-full bg-sunken shrink-0" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-3 w-3/4 bg-line rounded-full" />
                    <div className="h-3 w-1/2 bg-sunken rounded-full" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Trigger Button */}
      <button
        onClick={handlePull}
        disabled={isRefreshing}
        className="h-10 px-6 rounded-full bg-ink text-paper font-semibold text-[14px] hover:bg-ink/90 disabled:opacity-50 transition-colors">
        
        {isRefreshing ? 'Refreshing...' : 'Simulate Pull'}
      </button>
    </div>);

}