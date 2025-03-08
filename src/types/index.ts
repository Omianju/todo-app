export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  isOutdoor?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface ThemeState {
  isDark: boolean;
}

export interface WeatherState {
  temperature?: number;
  condition?: string;
  loading: boolean;
  error: string | null;
}

export interface RootState {
  theme: ThemeState;
  auth: AuthState;
  tasks: { tasks: Task[] };
  weather: WeatherState;
}