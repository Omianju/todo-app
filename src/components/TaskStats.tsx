import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export default function TaskStats() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // Calculate the circle's circumference
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  return (
    <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Today's Progress
          </h2>
          <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {completedTasks} of {totalTasks} tasks completed
          </p>
        </div>
        
        <div className="relative w-24 h-24">
          <svg className="transform -rotate-90 w-24 h-24">
            {/* Background circle */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              className={`${isDark ? 'stroke-gray-700' : 'stroke-gray-200'}`}
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              className="stroke-green-500"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              style={{
                strokeDasharray,
                strokeDashoffset,
                transition: 'stroke-dashoffset 0.5s ease'
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {completionPercentage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}