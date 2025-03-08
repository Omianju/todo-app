import { Calendar, ChevronLeft, ChevronRight, ListTodo, LogOut, PlusCircle, Star, Users } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { logout } from '../store/authSlice';

export default function Sidebar() {
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  
  const todayTasks = tasks.filter(task => !task.completed).length;
  const completedPercentage = tasks.length > 0 
    ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)
    : 0;

  return (
    <div 
      className={`${
        isCollapsed ? 'w-16' : 'w-64'
      } h-screen fixed left-0 ${
        isDark ? 'bg-gray-900' : 'bg-gray-100'
      } p-4 flex flex-col transition-all duration-300 z-50 ${
        isCollapsed ? 'items-center' : ''
      }`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute -right-3 top-8 p-1 rounded-full ${
          isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        } shadow-lg`}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div className={`flex items-center space-x-3 mb-8 ${isCollapsed ? 'justify-center' : ''}`}>
        {user?.avatar && (
          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
        )}
        {!isCollapsed && (
          <div>
            <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{user?.name}</p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{user?.email}</p>
          </div>
        )}
      </div>

      <nav className="flex-1">
        {/* These are only for to make the sidebar looks good. */}
        <ul className="space-y-2">
          {[
            { icon: <ListTodo size={20} />, label: 'All Tasks' },
            { icon: <Star size={20} />, label: 'Important' },
            { icon: <Calendar size={20} />, label: 'Planned' },
            { icon: <Users size={20} />, label: 'Assigned to me' },
          ].map((item) => (
            <li key={item.label}>
              <a
                href="#"
                className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} p-2 rounded-lg ${
                  isDark ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-200 text-gray-900'
                }`}
              >
                {item.icon}
                {!isCollapsed && <span>{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {!isCollapsed && (
        <button className={`flex items-center space-x-2 p-2 rounded-lg ${
          isDark ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-200 text-gray-900'
        }`}>
          <PlusCircle size={20} />
          <span>Add list</span>
        </button>
      )}

      {!isCollapsed && (
        <div className={`mt-4 p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Today's Tasks
          </h3>
          <div className="flex items-center justify-between">
            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{todayTasks}</span>
            <div className="w-8 h-8 text-xs font-bold  rounded-full bg-green-500 flex items-center justify-center text-white">
              {completedPercentage}%
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => dispatch(logout())}
        className={`mt-4 p-2 rounded-lg ${
          isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
        } text-white w-full flex items-center justify-center`}
      >
        {isCollapsed ? <LogOut /> : 'Logout'}
      </button>
    </div>
  );
}