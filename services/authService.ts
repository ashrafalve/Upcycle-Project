import { User, AuthTokens, LoginCredentials, RegisterData, ApiResponse } from './api/types';

const MOCK_DELAY = 800;

const mockUsers: User[] = [
  {
    id: '1',
    email: 'user@example.com',
    username: 'user',
    first_name: 'Test',
    last_name: 'User',
    account_type: 'user',
    avatar: null,
    bio: null,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'designer@example.com',
    username: 'designer',
    first_name: 'Test',
    last_name: 'Designer',
    account_type: 'designer',
    avatar: null,
    bio: 'Creative designer',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    email: 'admin@example.com',
    username: 'admin',
    first_name: 'Admin',
    last_name: 'User',
    account_type: 'admin',
    avatar: null,
    bio: null,
    created_at: '2024-01-01T00:00:00Z',
  },
];

const mockTokens: AuthTokens = {
  access: 'mock-access-token-xyz123',
  refresh: 'mock-refresh-token-xyz456',
  expires_in: 3600,
};

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> {
    console.log('Login API call - credentials:', credentials);
    await delay(MOCK_DELAY);
    
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (user && credentials.password === 'password123') {
      console.log('Login successful (mock)');
      return { user, tokens: mockTokens };
    }
    
    throw new Error('Invalid email or password');
  },

  async register(data: RegisterData): Promise<{ user: User; tokens: AuthTokens }> {
    console.log('Register API call - data:', data);
    await delay(MOCK_DELAY);
    
    const existingUser = mockUsers.find(u => u.email === data.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }
    
    const newUser: User = {
      id: String(mockUsers.length + 1),
      email: data.email,
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      account_type: data.account_type,
      avatar: null,
      bio: null,
      created_at: new Date().toISOString(),
    };
    
    mockUsers.push(newUser);
    console.log('Registration successful (mock)');
    
    return { user: newUser, tokens: mockTokens };
  },

  async logout(): Promise<void> {
    console.log('Logout API call');
    await delay(300);
  },

  async refreshToken(refresh: string): Promise<AuthTokens> {
    console.log('Refresh token API call');
    await delay(MOCK_DELAY);
    return mockTokens;
  },

  async getCurrentUser(): Promise<User> {
    console.log('Get current user API call');
    await delay(MOCK_DELAY);
    return mockUsers[0];
  },
};
