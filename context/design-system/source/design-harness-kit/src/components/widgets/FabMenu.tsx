import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  CalendarPlusIcon,
  UserPlusIcon,
  ClockIcon } from
'lucide-react';
const actions = [
{
  id: 'block',
  label: 'Block time',
  icon: ClockIcon
},
{
  id: 'walkin',
  label: 'Walk-in',
  icon: UserPlusIcon
},
{
  id: 'new',
  label: 'New appointment',
  icon: CalendarPlusIcon
}];

export function FabMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="relative h-[360px] bg-surface-2 rounded-3xl overflow-hidden border border-line"
      style={{
        backgroundImage:
        'radial-gradient(circle at center, var(--surface-3) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}>
      
      {/* Backdrop */}
      <AnimatePresence initial={false}>
        {isOpen &&
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.2
          }}
          className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10"
          onClick={() => setIsOpen(false)}
          aria-hidden="true" />

        }
      </AnimatePresence>

      {/* Menu Items */}
      <div className="absolute bottom-24 right-4 z-20 flex flex-col items-end gap-3">
        <AnimatePresence initial={false}>
          {isOpen &&
          actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.id}
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.9,
                  filter: 'blur(4px)'
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px)'
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  scale: 0.9,
                  filter: 'blur(4px)'
                }}
                transition={{
                  type: 'spring',
                  bounce: 0,
                  duration: 0.3,
                  delay: index * 0.05 // Stagger from bottom up
                }}
                className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl transition-[box-shadow,transform] duration-150 ease-out active:scale-[0.96] focus-visible:outline focus-visible:outline-3 focus-visible:outline-teal focus-visible:outline-offset-2"
                style={{
                  boxShadow: 'var(--shadow-border)'
                }}>
                
                  <span className="text-sm font-bold text-ink">
                    {action.label}
                  </span>
                  <div className="size-8 rounded-full bg-surface-2 flex items-center justify-center text-ink">
                    <Icon className="size-4" />
                  </div>
                </motion.button>);

          })}
        </AnimatePresence>
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        className="absolute bottom-4 right-4 z-20 size-14 bg-ink text-white rounded-full flex items-center justify-center transition-transform duration-150 ease-out active:scale-[0.96] focus-visible:outline focus-visible:outline-3 focus-visible:outline-teal focus-visible:outline-offset-2"
        style={{
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
        
        <motion.div
          animate={{
            rotate: isOpen ? 45 : 0
          }}
          transition={{
            type: 'spring',
            bounce: 0,
            duration: 0.3
          }}>
          
          <PlusIcon className="size-6" />
        </motion.div>
      </button>
    </div>);

}