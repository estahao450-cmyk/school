/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TodoItem } from '../types';
import { CheckCircle2, Circle, Trash2, Filter, ChevronRight } from 'lucide-react';

interface TodoListProps {
  todos: TodoItem[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'pending') return todo.status === 'pending';
    if (filter === 'completed') return todo.status === 'completed';
    return true;
  });

  const pendingCount = todos.filter(t => t.status === 'pending').length;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="card-base flex flex-col h-full"
    >
      <div className="p-5 border-b border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-slate-900">我的待办</h3>
          {pendingCount > 0 && (
            <span className="px-2 py-0.5 bg-rose-50 text-rose-600 text-xs font-bold rounded-full">
              {pendingCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="text-xs border-none bg-slate-50 rounded-lg px-2 py-1 focus:ring-0 text-slate-600 cursor-pointer"
          >
            <option value="all">全部</option>
            <option value="pending">待处理</option>
            <option value="completed">已完成</option>
          </select>
          <button className="text-xs text-brand-600 font-medium hover:underline flex items-center gap-0.5">
            查看更多 <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <AnimatePresence mode="popLayout">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <motion.div
                key={todo.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <button 
                  onClick={() => onToggle(todo.id)}
                  className="flex-shrink-0 transition-transform active:scale-90"
                >
                  {todo.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-brand-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 group-hover:text-brand-400" />
                  )}
                </button>
                
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${todo.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                    {todo.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded uppercase font-bold tracking-wider">
                      {todo.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{todo.time}</span>
                  </div>
                </div>

                <button 
                  onClick={() => onDelete(todo.id)}
                  className="p-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-12 text-slate-400">
              <CheckCircle2 className="w-12 h-12 mb-2 opacity-20" />
              <p className="text-sm">暂无待办事项</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
