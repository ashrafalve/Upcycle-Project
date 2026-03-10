import { Product, DesignRequest, User } from './api/types';

const mockDesignRequests: DesignRequest[] = [
  {
    id: '1',
    title: 'Vintage Chair Restoration',
    description: 'I have an old wooden chair that needs restoration. The legs are wobbly and the fabric is torn.',
    item_images: ['https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800'],
    budget_min: 100,
    budget_max: 250,
    status: 'pending',
    client: {
      id: '1',
      email: 'user@example.com',
      username: 'user',
      first_name: 'Test',
      last_name: 'User',
      account_type: 'user',
    },
    created_at: '2024-02-10T10:30:00Z',
    updated_at: '2024-02-10T10:30:00Z',
  },
  {
    id: '2',
    title: 'Denim Jacket Customization',
    description: 'Want to add embroidery and patches to my vintage denim jacket.',
    item_images: ['https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800'],
    budget_min: 50,
    budget_max: 150,
    status: 'accepted',
    client: {
      id: '2',
      email: 'client@example.com',
      username: 'client',
      first_name: 'Jane',
      last_name: 'Doe',
      account_type: 'user',
    },
    designer: {
      id: '3',
      email: 'designer@example.com',
      username: 'designer',
      first_name: 'Mike',
      last_name: 'Chen',
      account_type: 'designer',
    },
    created_at: '2024-02-08T14:20:00Z',
    updated_at: '2024-02-09T09:15:00Z',
  },
  {
    id: '3',
    title: 'Coffee Table Refinish',
    description: 'Looking to refinish my coffee table with a modern look.',
    item_images: ['https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800'],
    budget_min: 200,
    budget_max: 400,
    status: 'in_progress',
    client: {
      id: '4',
      email: 'alex@example.com',
      username: 'alex',
      first_name: 'Alex',
      last_name: 'Smith',
      account_type: 'user',
    },
    designer: {
      id: '5',
      email: 'designer2@example.com',
      username: 'designer2',
      first_name: 'Sarah',
      last_name: 'Johnson',
      account_type: 'designer',
    },
    created_at: '2024-02-05T11:00:00Z',
    updated_at: '2024-02-07T16:30:00Z',
  },
];

const mockUserListings: Product[] = [
  {
    id: '101',
    title: 'Vintage Oak Dresser',
    description: 'Beautiful vintage oak dresser',
    price: 350,
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'],
    category: 'furniture',
    condition: 'good',
    seller: {
      id: '1',
      email: 'user@example.com',
      username: 'user',
      first_name: 'Test',
      last_name: 'User',
      account_type: 'user',
    },
    status: 'available',
    created_at: '2024-02-10T10:30:00Z',
    updated_at: '2024-02-10T10:30:00Z',
  },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const upcycleRequestService = {
  async createRequest(data: {
    title: string;
    description: string;
    item_images: string[];
    budget_min: number;
    budget_max: number;
    desired_transformation: string;
    designer_id?: string;
  }): Promise<DesignRequest> {
    console.log('POST /api/upcycle-requests - data:', data);
    await delay(500);
    
    const newRequest: DesignRequest = {
      id: String(mockDesignRequests.length + 1),
      title: data.title,
      description: data.description,
      item_images: data.item_images,
      budget_min: data.budget_min,
      budget_max: data.budget_max,
      status: 'pending',
      client: {
        id: '1',
        email: 'user@example.com',
        username: 'user',
        first_name: 'Test',
        last_name: 'User',
        account_type: 'user',
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    mockDesignRequests.push(newRequest);
    console.log('Upcycle request created (mock):', newRequest);
    return newRequest;
  },

  async getUserRequests(): Promise<DesignRequest[]> {
    console.log('GET /api/user/requests');
    await delay(300);
    return mockDesignRequests;
  },

  async getRequest(id: string): Promise<DesignRequest | null> {
    console.log('GET /api/upcycle-requests/:id - id:', id);
    await delay(300);
    return mockDesignRequests.find(r => r.id === id) || null;
  },

  async updateRequest(id: string, data: Partial<DesignRequest>): Promise<DesignRequest> {
    console.log('PATCH /api/upcycle-requests/:id - id:', id, 'data:', data);
    await delay(300);
    const request = mockDesignRequests.find(r => r.id === id);
    if (!request) throw new Error('Request not found');
    Object.assign(request, data, { updated_at: new Date().toISOString() });
    return request;
  },

  async cancelRequest(id: string): Promise<void> {
    console.log('DELETE /api/upcycle-requests/:id - id:', id);
    await delay(300);
    const index = mockDesignRequests.findIndex(r => r.id === id);
    if (index > -1) {
      mockDesignRequests[index].status = 'cancelled';
    }
  },
};

export const listingService = {
  async createListing(data: {
    title: string;
    description: string;
    images: string[];
    price: number;
    category: string;
    condition: string;
  }): Promise<Product> {
    console.log('POST /api/products - data:', data);
    await delay(500);
    
    const newListing: Product = {
      id: String(mockUserListings.length + 101),
      title: data.title,
      description: data.description,
      images: data.images,
      price: data.price,
      category: data.category,
      condition: data.condition as Product['condition'],
      seller: {
        id: '1',
        email: 'user@example.com',
        username: 'user',
        first_name: 'Test',
        last_name: 'User',
        account_type: 'user',
      },
      status: 'available',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    mockUserListings.push(newListing);
    console.log('Listing created (mock):', newListing);
    return newListing;
  },

  async getUserListings(): Promise<Product[]> {
    console.log('GET /api/user/listings');
    await delay(300);
    return mockUserListings;
  },

  async updateListing(id: string, data: Partial<Product>): Promise<Product> {
    console.log('PATCH /api/products/:id - id:', id, 'data:', data);
    await delay(300);
    const listing = mockUserListings.find(p => p.id === id);
    if (!listing) throw new Error('Listing not found');
    Object.assign(listing, data, { updated_at: new Date().toISOString() });
    return listing;
  },

  async deleteListing(id: string): Promise<void> {
    console.log('DELETE /api/products/:id - id:', id);
    await delay(300);
    const index = mockUserListings.findIndex(p => p.id === id);
    if (index > -1) {
      mockUserListings.splice(index, 1);
    }
  },
};

export const designerService = {
  async getIncomingRequests(): Promise<DesignRequest[]> {
    console.log('GET /api/designer/requests');
    await delay(300);
    return mockDesignRequests.filter(r => r.status === 'pending');
  },

  async acceptRequest(id: string): Promise<DesignRequest> {
    console.log('POST /api/designer/requests/:id/accept - id:', id);
    await delay(300);
    const request = mockDesignRequests.find(r => r.id === id);
    if (!request) throw new Error('Request not found');
    request.status = 'accepted';
    request.updated_at = new Date().toISOString();
    return request;
  },

  async rejectRequest(id: string): Promise<void> {
    console.log('POST /api/designer/requests/:id/reject - id:', id);
    await delay(300);
    const request = mockDesignRequests.find(r => r.id === id);
    if (request) {
      request.status = 'cancelled';
      request.updated_at = new Date().toISOString();
    }
  },

  async submitProposal(data: {
    request_id: string;
    design_idea: string;
    estimated_price: number;
    timeline: number;
  }): Promise<DesignRequest> {
    console.log('POST /api/designer/proposals - data:', data);
    await delay(300);
    const request = mockDesignRequests.find(r => r.id === data.request_id);
    if (!request) throw new Error('Request not found');
    request.status = 'accepted';
    request.updated_at = new Date().toISOString();
    return request;
  },

  async getMyDesigns(): Promise<DesignRequest[]> {
    console.log('GET /api/designer/designs');
    await delay(300);
    return mockDesignRequests.filter(r => r.status === 'accepted' || r.status === 'in_progress' || r.status === 'completed');
  },

  async getEarnings(): Promise<{ total: number; pending: number; available: number }> {
    console.log('GET /api/designer/earnings');
    await delay(300);
    return { total: 2500, pending: 500, available: 2000 };
  },

  async withdrawEarnings(amount: number): Promise<void> {
    console.log('POST /api/designer/withdraw - amount:', amount);
    await delay(300);
  },
};

const mockUsers: User[] = [
  { id: '1', email: 'user1@example.com', username: 'user1', first_name: 'John', last_name: 'Doe', account_type: 'user', created_at: '2024-01-01T00:00:00Z' },
  { id: '2', email: 'designer1@example.com', username: 'designer1', first_name: 'Jane', last_name: 'Smith', account_type: 'designer', created_at: '2024-01-02T00:00:00Z' },
  { id: '3', email: 'admin@example.com', username: 'admin', first_name: 'Admin', last_name: 'User', account_type: 'admin', created_at: '2024-01-01T00:00:00Z' },
];

export const adminService = {
  async getAllUsers(): Promise<User[]> {
    console.log('GET /api/admin/users');
    await delay(300);
    return mockUsers;
  },

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    console.log('PATCH /api/admin/users/:id - id:', id, 'data:', data);
    await delay(300);
    const user = mockUsers.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    Object.assign(user, data);
    return user;
  },

  async deleteUser(id: string): Promise<void> {
    console.log('DELETE /api/admin/users/:id - id:', id);
    await delay(300);
  },

  async getAllDesigners(): Promise<User[]> {
    console.log('GET /api/admin/designers');
    await delay(300);
    return mockUsers.filter(u => u.account_type === 'designer');
  },

  async approveDesigner(id: string): Promise<User> {
    console.log('POST /api/admin/designers/:id/approve - id:', id);
    await delay(300);
    const user = mockUsers.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    return user;
  },

  async rejectDesigner(id: string): Promise<void> {
    console.log('POST /api/admin/designers/:id/reject - id:', id);
    await delay(300);
  },

  async getProducts(): Promise<Product[]> {
    console.log('GET /api/admin/products');
    await delay(300);
    return mockUserListings;
  },

  async createProduct(data: {
    title: string;
    description: string;
    images: string[];
    price: number;
    category: string;
  }): Promise<Product> {
    console.log('POST /api/admin/products - data:', data);
    await delay(300);
    throw new Error('Use listingService.createListing instead');
  },

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    console.log('PATCH /api/admin/products/:id - id:', id, 'data:', data);
    await delay(300);
    const product = mockUserListings.find(p => p.id === id);
    if (!product) throw new Error('Product not found');
    Object.assign(product, data);
    return product;
  },

  async deleteProduct(id: string): Promise<void> {
    console.log('DELETE /api/admin/products/:id - id:', id);
    await delay(300);
  },

  async getAllRequests(): Promise<DesignRequest[]> {
    console.log('GET /api/admin/requests');
    await delay(300);
    return mockDesignRequests;
  },

  async cancelRequest(id: string): Promise<void> {
    console.log('POST /api/admin/requests/:id/cancel - id:', id);
    await delay(300);
  },
};
