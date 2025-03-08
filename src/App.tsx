import { Moon, Sun } from 'lucide-react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AddTask from './components/AddTask';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import WeatherWidget from './components/WeatherWidget';
import type { RootState } from './store';
import { persistor, store } from './store';
import { toggleTheme } from './store/themeSlice';

function AppContent() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className={isDark ? 'bg-gray-900 min-h-screen' : 'bg-gray-50 min-h-screen'}>
      <div className="fixed top-4 ml right-4 flex items-center space-x-4 z-50">
        <WeatherWidget />
        <button
          onClick={() => dispatch(toggleTheme())}
          className={`p-2 rounded-lg ${
            isDark ? 'bg-gray-700 text-yellow-400' : 'bg-white text-gray-900 shadow-md'
          }`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="flex">
        <Sidebar />
        <div className="flex-1 transition-all duration-300 ml-16 md:ml-64">
          <main className={`max-w-4xl mx-auto mt-10 py-8 px-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <AddTask />
            <TaskList />
          </main>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}