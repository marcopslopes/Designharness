import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcwIcon, UploadCloudIcon, CheckIcon } from 'lucide-react';
export function UploadProgress() {
  const [replayCount, setReplayCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  useEffect(() => {
    setProgress(0);
    setIsComplete(false);
    const startTime = Date.now();
    const duration = 2000;
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const p = Math.min(elapsed / duration, 1);
      // Easing function for progress
      const easeOutQuad = (t: number) => t * (2 - t);
      setProgress(easeOutQuad(p) * 100);
      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => setIsComplete(true), 200);
      }
    };
    requestAnimationFrame(animate);
  }, [replayCount]);
  return (
    <div className="relative w-full max-w-[320px] mx-auto bg-paper rounded-[24px] shadow-sm border border-line p-5 flex flex-col gap-4">
      <button
        type="button"
        onClick={() => setReplayCount((c) => c + 1)}
        className="absolute top-4 right-4 z-10 size-8 rounded-xl bg-sunken hover:bg-line flex items-center justify-center text-muted transition-colors"
        aria-label="Replay animation">
        
        <RotateCcwIcon className="size-4" />
      </button>

      <h3 className="text-[15px] font-bold text-ink pr-10">Upload photo</h3>

      {/* Upload Item */}
      <div className="flex items-center gap-3 p-3 rounded-2xl border border-line bg-canvas">
        <div className="size-12 rounded-xl bg-sunken overflow-hidden shrink-0 relative">
          {/* Fake image skeleton */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-soft to-plum-soft opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-6 rounded-full bg-paper/50" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-semibold text-ink truncate">
            avatar-photo.jpg
          </div>
          <div className="text-[12px] text-muted flex items-center gap-2">
            <span>2.4 MB</span>
            {!isComplete &&
            <>
                <span className="size-1 rounded-full bg-line" />
                <span className="tabular-nums font-medium text-ink">
                  {Math.round(progress)}%
                </span>
              </>
            }
          </div>
        </div>

        <div className="shrink-0 relative size-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isComplete ?
            <motion.div
              key="progress"
              initial={{
                opacity: 0,
                scale: 0.8
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              exit={{
                opacity: 0,
                scale: 0.8
              }}
              className="absolute inset-0">
              
                <svg className="size-full -rotate-90" viewBox="0 0 32 32">
                  <circle
                  cx="16"
                  cy="16"
                  r="14"
                  fill="none"
                  stroke="var(--c-sunken)"
                  strokeWidth="3" />
                
                  <circle
                  cx="16"
                  cy="16"
                  r="14"
                  fill="none"
                  stroke="var(--c-teal)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="87.96"
                  strokeDashoffset={87.96 * (1 - progress / 100)} />
                
                </svg>
              </motion.div> :

            <motion.div
              key="complete"
              initial={{
                opacity: 0,
                scale: 0.5
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25
              }}
              className="absolute inset-0 bg-leaf rounded-full flex items-center justify-center text-paper">
              
                <CheckIcon className="size-4" strokeWidth={3} />
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>

      {/* Dropzone */}
      <div className="border-2 border-dashed border-line rounded-2xl p-6 flex flex-col items-center justify-center gap-2 bg-sunken/50">
        <div className="size-10 rounded-full bg-paper shadow-sm flex items-center justify-center text-ink mb-1">
          <UploadCloudIcon className="size-5" />
        </div>
        <div className="text-[13px] font-semibold text-ink">
          Drop or browse files
        </div>
        <div className="text-[12px] text-muted">JPG, PNG up to 5MB</div>
      </div>
    </div>);

}