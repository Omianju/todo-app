import { Star, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { removeTask, toggleTask, updateTaskPriority } from '../store/tasksSlice';
import type { Task } from '../types';
import TaskStats from './TaskStats';

export default function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <TaskStats />
      
      <div className={`flex-1 p-6 rounded-lg ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <h2 className="text-2xl font-bold mb-4">Pending Tasks</h2>
        <div className="space-y-4">
          {pendingTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center space-x-4 p-4 rounded-lg ${
                isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleTask(task.id))}
                className="w-5 h-5 rounded-full border-2 border-gray-300 checked:bg-green-500"
              />
              
              <span className="flex-1">{task.title}</span>

              <button
                onClick={() => dispatch(updateTaskPriority({
                  id: task.id,
                  priority: task.priority === 'high' ? 'low' : 'high'
                }))}
                className={`${getPriorityColor(task.priority)}`}
              >
                <Star size={20} fill={task.priority === 'high' ? 'currentColor' : 'none'} />
              </button>

              <button
                onClick={() => dispatch(removeTask(task.id))}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {completedTasks.length > 0 && (
        <div className={`flex-1 p-6 rounded-lg ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <h2 className="text-2xl font-bold mb-4">Completed Tasks</h2>
          <div className="space-y-4">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center space-x-4 p-4 rounded-lg ${
                  isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => dispatch(toggleTask(task.id))}
                  className="w-5 h-5 rounded-full border-2 border-gray-300 checked:bg-green-500"
                />
                
                <span className="flex-1 line-through text-gray-500">{task.title}</span>

                <button
                  onClick={() => dispatch(removeTask(task.id))}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}