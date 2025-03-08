import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import { addTask } from '../store/tasksSlice';
import type { RootState } from '../store';

export default function AddTask() {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(addTask({
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      priority: 'low',
      createdAt: new Date().toISOString(),
    }));

    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className={`flex items-center space-x-2 p-4 rounded-lg ${
        isDark ? 'bg-gray-700' : 'bg-gray-50'
      }`}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task"
          className={`flex-1 bg-transparent border-none outline-none ${
            isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
          }`}
        />
        <button
          type="submit"
          className={`p-2 rounded-lg ${
            isDark
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-green-500 hover:bg-green-600'
          } text-white`}
        >
          <Plus size={20} />
        </button>
      </div>
    </form>
  );
}