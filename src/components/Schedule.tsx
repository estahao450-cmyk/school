/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScheduleItem, UserRole } from '../types';
import { Calendar as CalendarIcon, Clock, MapPin, User, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

interface ScheduleProps {
  schedule: ScheduleItem[];
  role: UserRole;
  onAddEvent: () => void;
}

export default function Schedule({ schedule, role, onAddEvent }: ScheduleProps) {
  const [view, setView] = useState<'day' | 'week'>('day');
  const [selectedDay, setSelectedDay] = useState(new Date().getDay() || 7); // 1-7

  const days = [
    { id: 1, label: '周一' },
    { id: 2, label: '周二' },
    { id: 3, label: '周三' },
    { id: 4, label: '周四' },
    { id: 5, label: '周五' },
    { id: 6, label: '周六' },
    { id: 7, label: '周日' },
  ];

  const filteredSchedule = schedule.filter(item => {
    if (view === 'day') return item.dayOfWeek === selectedDay;
    return true;
  }).sort((a, b) => a.time.localeCompare(b.time));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="card-base flex flex-col h-full"
    >
      <div className="p-5 border-b border-slate-50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">我的安排</h3>
          <div className="flex items-center gap-2">
            <div className="bg-slate-100 p-1 rounded-lg flex">
              <button 
                onClick={() => setView('day')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${view === 'day' ? 'bg-white shadow-sm text-brand-600' : 'text-slate-500'}`}
              >
                按天
              </button>
              <button 
                onClick={() => setView('week')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${view === 'week' ? 'bg-white shadow-sm text-brand-600' : 'text-slate-500'}`}
              >
                按周
              </button>
            </div>
            <button 
              onClick={onAddEvent}
              className="p-1.5 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {view === 'day' && (
          <div className="flex justify-between gap-1 overflow-x-auto pb-1">
            {days.map(day => (
              <button
                key={day.id}
                onClick={() => setSelectedDay(day.id)}
                className={`flex-1 min-w-[40px] flex flex-col items-center py-2 rounded-xl transition-all ${
                  selectedDay === day.id 
                    ? 'bg-brand-50 text-brand-600 ring-1 ring-brand-200' 
                    : 'hover:bg-slate-50 text-slate-400'
                }`}
              >
                <span className="text-[10px] font-bold uppercase mb-1">{day.label.slice(1)}</span>
                <span className="text-sm font-bold">{day.id}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="popLayout">
          {filteredSchedule.length > 0 ? (
            <div className="space-y-4">
              {filteredSchedule.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative pl-4 border-l-2 border-brand-200"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                          item.type === 'course' ? 'bg-blue-50 text-blue-600' :
                          item.type === 'meeting' ? 'bg-indigo-50 text-indigo-600' :
                          'bg-emerald-50 text-emerald-600'
                        }`}>
                          {item.type === 'course' ? '课程' : item.type === 'meeting' ? '会议' : '活动'}
                        </span>
                        {view === 'week' && (
                          <span className="text-[10px] font-bold text-slate-400">周{days.find(d => d.id === item.dayOfWeek)?.label.slice(1)}</span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-800 mb-2">{item.title}</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Clock className="w-3.5 h-3.5" />
                          {item.time}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <MapPin className="w-3.5 h-3.5" />
                          {item.location}
                        </div>
                        {item.teacher && (
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <User className="w-3.5 h-3.5" />
                            {item.teacher}
                          </div>
                        )}
                      </div>
                    </div>
                    {item.credits && (
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">学分</span>
                        <p className="text-sm font-bold text-brand-600">{item.credits}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-12 text-slate-400">
              <CalendarIcon className="w-12 h-12 mb-2 opacity-20" />
              <p className="text-sm">今日暂无安排</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
