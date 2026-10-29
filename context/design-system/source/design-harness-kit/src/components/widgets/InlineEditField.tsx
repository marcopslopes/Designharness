import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Edit3Icon,
  CheckIcon,
  XIcon,
  UserIcon,
  MailIcon,
  PhoneIcon } from
'lucide-react';
type Row = {
  key: string;
  icon: React.ReactNode;
  label: string;
  value: string;
};
const initial: Row[] = [
{
  key: 'name',
  icon: <UserIcon className="size-4" strokeWidth={2.2} />,
  label: 'Display name',
  value: 'Patricia Taylor'
},
{
  key: 'email',
  icon: <MailIcon className="size-4" strokeWidth={2.2} />,
  label: 'Email',
  value: 'patricia.taylor@studio.co'
},
{
  key: 'phone',
  icon: <PhoneIcon className="size-4" strokeWidth={2.2} />,
  label: 'Phone',
  value: '+1 (415) 555-0119'
}];

export function InlineEditField() {
  const [rows, setRows] = useState(initial);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const startEdit = (r: Row) => {
    setEditingKey(r.key);
    setDraft(r.value);
  };
  const save = () => {
    setRows((rs) =>
    rs.map((r) =>
    r.key === editingKey ?
    {
      ...r,
      value: draft
    } :
    r
    )
    );
    setEditingKey(null);
  };
  const cancel = () => setEditingKey(null);
  return (
    <div
      className="bg-paper rounded-2xl divide-y divide-line"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      {rows.map((r) => {
        const editing = r.key === editingKey;
        return (
          <div key={r.key} className="px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="shrink-0 size-8 rounded-lg bg-sunken text-ink flex items-center justify-center">
                {r.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted">
                  {r.label}
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  {editing ?
                  <motion.div
                    key="edit"
                    initial={{
                      opacity: 0,
                      y: -4
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    exit={{
                      opacity: 0,
                      y: -4
                    }}
                    transition={{
                      duration: 0.15
                    }}
                    className="flex items-center gap-1.5 mt-1">
                    
                      <input
                      autoFocus
                      type="text"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') save();
                        if (e.key === 'Escape') cancel();
                      }}
                      className="flex-1 min-w-0 h-9 px-2.5 rounded-lg bg-sunken text-[14px] text-ink outline-none ring-2 ring-ink/15 focus:ring-ink/40" />
                    
                      <button
                      type="button"
                      onClick={cancel}
                      aria-label="Cancel"
                      className="shrink-0 size-9 rounded-lg bg-sunken text-ink flex items-center justify-center active:scale-[0.94]">
                      
                        <XIcon className="size-4" strokeWidth={2.5} />
                      </button>
                      <button
                      type="button"
                      onClick={save}
                      aria-label="Save"
                      className="shrink-0 size-9 rounded-lg bg-ink text-paper flex items-center justify-center active:scale-[0.94]">
                      
                        <CheckIcon className="size-4" strokeWidth={3} />
                      </button>
                    </motion.div> :

                  <motion.div
                    key="view"
                    initial={{
                      opacity: 0
                    }}
                    animate={{
                      opacity: 1
                    }}
                    className="text-[14px] font-semibold text-ink tabular-nums truncate">
                    
                      {r.value}
                    </motion.div>
                  }
                </AnimatePresence>
              </div>

              {!editing &&
              <button
                type="button"
                aria-label={`Edit ${r.label}`}
                onClick={() => startEdit(r)}
                className="shrink-0 size-9 rounded-lg text-muted hover:text-ink hover:bg-sunken flex items-center justify-center active:scale-[0.94] transition-colors">
                
                  <Edit3Icon className="size-4" strokeWidth={2.2} />
                </button>
              }
            </div>
          </div>);

      })}
    </div>);

}