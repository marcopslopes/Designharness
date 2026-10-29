import React, { Children } from 'react';
import { motion } from 'framer-motion';
import {
  EyeIcon,
  ArrowUpRightIcon,
  SparklesIcon,
  StarIcon,
  ChevronRightIcon } from
'lucide-react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Bar,
  BarChart,
  RadialBar,
  RadialBarChart,
  PolarAngleAxis } from
'recharts';
const revenueData = [2800, 3100, 2900, 3400, 3200, 3600, 3840].map((value) => ({
  value
}));
const newClientsData = [4, 7, 5, 8, 10, 12].map((value) => ({
  value
}));
const avgTicketData = [110, 115, 112, 120, 118, 125, 128].map((value) => ({
  value
}));
const rebookRingData = [
{
  name: 'rebook',
  value: 61,
  fill: '#731CD8'
}];

const containerVariants = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1
    }
  }
};
const tileVariants = {
  hidden: {
    opacity: 0,
    y: 10
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35
    }
  }
};
export function BentoStatsCard() {
  return (
    <div
      className="bg-white rounded-2xl p-4"
      style={{
        boxShadow: 'var(--shadow-border)'
      }}>
      
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-base font-semibold text-ink">
          Your performance{' '}
          <span className="text-muted-soft font-normal">· May</span>
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-[11px] text-muted bg-surface-2 px-2 py-1 rounded-md">
            <EyeIcon className="w-3.5 h-3.5" strokeWidth={2} />
            <span>Only you</span>
          </div>
          <ChevronRightIcon className="w-4 h-4 text-muted-soft" />
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          margin: '-40px'
        }}
        className="grid grid-cols-2 gap-2">
        
        {/* Hero — Revenue */}
        <motion.div
          variants={tileVariants}
          className="col-span-2 relative overflow-hidden rounded-xl bg-gradient-to-br from-purple to-fuchsia-700 p-4 text-white">
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                May Revenue
              </span>
              <div className="flex items-center gap-1 text-[10px] font-semibold bg-white/15 backdrop-blur px-1.5 py-0.5 rounded tabular-nums">
                <ArrowUpRightIcon className="w-3 h-3" /> 12%
              </div>
            </div>
            <div className="text-3xl font-bold tracking-tight tabular-nums">
              $3,840
            </div>
            <div className="text-xs text-white/70 mt-0.5 tabular-nums">
              vs $3,420 last month
            </div>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-14 opacity-60 pointer-events-none"
            aria-hidden="true">
            
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="bentoRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fff" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#fff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#fff"
                  strokeWidth={1.5}
                  fill="url(#bentoRev)" />
                
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Rebook Rate Ring */}
        <motion.div
          variants={tileVariants}
          className="rounded-xl bg-surface-2/70 p-3 flex flex-col justify-between">
          
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Rebook Rate
          </span>
          <div className="flex items-center justify-between mt-1">
            <div>
              <div className="text-2xl font-bold text-ink leading-none tabular-nums">
                61%
              </div>
              <div className="text-[10px] text-success font-semibold mt-1 tabular-nums">
                ↑ 4%
              </div>
            </div>
            <div className="relative w-12 h-12" aria-hidden="true">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="70%"
                  outerRadius="100%"
                  data={rebookRingData}
                  startAngle={90}
                  endAngle={-270}>
                  
                  <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    angleAxisId={0}
                    tick={false} />
                  
                  <RadialBar
                    background={{
                      fill: '#E9D5FF'
                    }}
                    dataKey="value"
                    cornerRadius={10} />
                  
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* New Clients Bars */}
        <motion.div
          variants={tileVariants}
          className="rounded-xl bg-surface-2/70 p-3 flex flex-col justify-between">
          
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
            New Clients
          </span>
          <div className="flex items-end justify-between mt-1 gap-2">
            <div>
              <div className="text-2xl font-bold text-ink leading-none tabular-nums">
                +12
              </div>
              <div className="text-[10px] text-success font-semibold mt-1 tabular-nums">
                ↑ 2 vs Apr
              </div>
            </div>
            <div className="w-14 h-10" aria-hidden="true">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={newClientsData}>
                  <Bar dataKey="value" fill="#731CD8" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Avg Ticket Wide */}
        <motion.div
          variants={tileVariants}
          className="col-span-2 rounded-xl bg-surface-2/70 p-3 flex items-center justify-between">
          
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
              Avg. Ticket
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <div className="text-xl font-bold text-ink tabular-nums">
                $128
              </div>
              <div className="text-[10px] text-success font-semibold tabular-nums">
                ↑ $5
              </div>
            </div>
          </div>
          <div className="w-24 h-10" aria-hidden="true">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={avgTicketData}>
                <defs>
                  <linearGradient id="bentoTicket" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00A34B" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#00A34B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#00A34B"
                  strokeWidth={2}
                  fill="url(#bentoTicket)" />
                
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Best Day */}
        <motion.div
          variants={tileVariants}
          className="rounded-xl bg-surface-2/70 p-3">
          
          <div className="flex items-center gap-1 mb-1">
            <SparklesIcon className="w-3 h-3 text-purple" strokeWidth={2.5} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
              Best Day
            </span>
          </div>
          <div className="text-base font-bold text-ink leading-tight">
            Sat 11
          </div>
          <div className="text-[10px] text-muted mt-0.5 tabular-nums">
            $612 · 8 cuts
          </div>
        </motion.div>

        {/* Rating */}
        <motion.div
          variants={tileVariants}
          className="rounded-xl bg-surface-2/70 p-3">
          
          <div className="flex items-center gap-1 mb-1">
            <StarIcon className="w-3 h-3 fill-warning text-warning" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
              Rating
            </span>
          </div>
          <div className="text-base font-bold text-ink leading-tight tabular-nums">
            4.9
          </div>
          <div className="text-[10px] text-muted mt-0.5 tabular-nums">
            28 new reviews
          </div>
        </motion.div>
      </motion.div>
    </div>);

}