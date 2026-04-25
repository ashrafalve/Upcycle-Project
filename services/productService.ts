import { Product, Category } from './api/types';

export const mockCategories: Category[] = [
  { id: '1', name: 'Furniture', slug: 'furniture', image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=400&h=400&fit=crop' },
  { id: '2', name: 'Clothing', slug: 'clothing', image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop' },
  { id: '3', name: 'Electronics', slug: 'electronics', image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=400&h=400&fit=crop' },
  { id: '4', name: 'Home Decor', slug: 'home-decor', image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=400&h=400&fit=crop' },
  { id: '5', name: 'Art', slug: 'art', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=400&h=400&fit=crop' },
  { id: '6', name: 'Jewelry', slug: 'jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop' },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Industrial Copper Pipe Lamp',
    description: 'A unique desk lamp handcrafted from industrial copper pipes and a vintage Edison bulb. Each piece is hand-polished and features a rustic yet modern aesthetic.',
    price: 85,
    images: [
      '/images/products/pipe-lamp.png',
    ],
    category: 'furniture',
    condition: 'good',
    seller: {
      id: '1',
      email: 'sarah@example.com',
      username: 'sarah_designs',
      first_name: 'Sarah',
      last_name: 'Johnson',
      role: 'seller',
      account_type: 'user',
      date_joined: '2024-01-15',
    },
    status: 'available',
    created_at: '2024-02-10T10:30:00Z',
    updated_at: '2024-02-10T10:30:00Z',
  },
  {
    id: '2',
    title: 'Vintage Suitcase Planter',
    description: 'A reclaimed vintage leather suitcase transformed into a stunning indoor garden. Includes a custom waterproof liner and a curated selection of easy-care succulents.',
    price: 145,
    images: [
      '/images/products/suitcase-planter.png',
    ],
    category: 'clothing',
    condition: 'like_new',
    seller: {
      id: '2',
      email: 'mike@example.com',
      username: 'mike_creates',
      first_name: 'Mike',
      last_name: 'Chen',
      role: 'designer',
      account_type: 'designer',
      date_joined: '2024-01-20',
    },
    status: 'available',
    created_at: '2024-02-09T14:20:00Z',
    updated_at: '2024-02-09T14:20:00Z',
  },
  {
    id: '3',
    title: 'Bicycle Wheel Wall Clock',
    description: 'Modern industrial wall clock created from a salvaged vintage bicycle wheel. The spokes and hub are preserved to maintain its authentic mechanical look.',
    price: 75,
    images: [
      'https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=800&q=80',
    ],
    category: 'furniture',
    condition: 'like_new',
    seller: {
      id: '3',
      email: 'emma@example.com',
      username: 'emma_vintage',
      first_name: 'Emma',
      last_name: 'Wilson',
      role: 'seller',
      account_type: 'user',
      date_joined: '2024-02-01',
    },
    status: 'available',
    created_at: '2024-02-08T09:15:00Z',
    updated_at: '2024-02-08T09:15:00Z',
  },
  {
    id: '4',
    title: 'Pallet Wood Lounge Chair',
    description: 'Ergonomic lounge chair built entirely from heat-treated shipping pallets. Sanded to a smooth finish and treated with weather-resistant natural oils.',
    price: 210,
    images: [
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80',
    ],
    category: 'furniture',
    condition: 'good',
    seller: {
      id: '4',
      email: 'alex@example.com',
      username: 'alex_woodworks',
      first_name: 'Alex',
      last_name: 'Rivera',
      role: 'designer',
      account_type: 'designer',
      date_joined: '2024-01-25',
    },
    status: 'available',
    created_at: '2024-02-07T16:45:00Z',
    updated_at: '2024-02-07T16:45:00Z',
  },
  {
    id: '5',
    title: 'Vintage Denim Jacket Restyled',
    description: 'Classic vintage denim jacket with custom embroidery. Hand-painted floral design on back. Perfectly worn-in fit. Size M.',
    price: 85,
    images: [
      'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800&h=600&fit=crop',
    ],
    category: 'clothing',
    condition: 'good',
    seller: {
      id: '5',
      email: 'lisa@example.com',
      username: 'lisa_threads',
      first_name: 'Lisa',
      last_name: 'Martinez',
      role: 'designer',
      account_type: 'designer',
      date_joined: '2024-02-05',
    },
    status: 'available',
    created_at: '2024-02-06T11:30:00Z',
    updated_at: '2024-02-06T11:30:00Z',
  },
  {
    id: '6',
    title: 'Mason Jar Pendant Lights (Set of 3)',
    description: 'DIY pendant light kit with vintage-style mason jars. Includes cord set, socket, and jar cage. Perfect for farmhouse kitchen.',
    price: 65,
    images: [
      'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&h=600&fit=crop',
    ],
    category: 'home-decor',
    condition: 'new',
    seller: {
      id: '6',
      email: 'tom@example.com',
      username: 'tom_diy',
      first_name: 'Tom',
      last_name: 'Anderson',
      role: 'seller',
      account_type: 'user',
      date_joined: '2024-01-30',
    },
    status: 'available',
    created_at: '2024-02-05T13:00:00Z',
    updated_at: '2024-02-05T13:00:00Z',
  },
  {
    id: '7',
    title: 'Antique Brass Floor Lamp',
    description: 'Elegant antique brass floor lamp from the 1970s. Working condition with new cord. Marble base. 62" tall.',
    price: 195,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=600&fit=crop',
    ],
    category: 'home-decor',
    condition: 'good',
    seller: {
      id: '1',
      email: 'sarah@example.com',
      username: 'sarah_designs',
      first_name: 'Sarah',
      last_name: 'Johnson',
      role: 'seller',
      account_type: 'user',
      date_joined: '2024-01-15',
    },
    status: 'available',
    created_at: '2024-02-04T10:00:00Z',
    updated_at: '2024-02-04T10:00:00Z',
  },
  {
    id: '8',
    title: 'Hand-painted Canvas Art',
    description: 'Abstract original painting on canvas. Mixed media with acrylic and ink. Size 24" x 36". Gallery-wrapped edges.',
    price: 280,
    images: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=600&fit=crop',
    ],
    category: 'art',
    condition: 'new',
    seller: {
      id: '7',
      email: 'jessica@example.com',
      username: 'jessica_art',
      first_name: 'Jessica',
      last_name: 'Brown',
      role: 'designer',
      account_type: 'designer',
      date_joined: '2024-02-08',
    },
    status: 'available',
    created_at: '2024-02-03T15:30:00Z',
    updated_at: '2024-02-03T15:30:00Z',
  },
];

export const productService = {
  async getProducts(filters?: {
    category?: string;
    condition?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  }): Promise<Product[]> {
    console.log('GET /api/products - filters:', filters);
    
    let products = [...mockProducts];
    
    if (filters?.category) {
      products = products.filter(p => p.category === filters.category);
    }
    
    if (filters?.condition) {
      products = products.filter(p => p.condition === filters.condition);
    }
    
    if (filters?.minPrice !== undefined) {
      products = products.filter(p => p.price >= filters.minPrice!);
    }
    
    if (filters?.maxPrice !== undefined) {
      products = products.filter(p => p.price <= filters.maxPrice!);
    }
    
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      products = products.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }
    
    return products;
  },

  async getProduct(id: string): Promise<Product | null> {
    console.log('GET /api/products/:id - id:', id);
    return mockProducts.find(p => p.id === id) || null;
  },

  async getCategories(): Promise<Category[]> {
    console.log('GET /api/categories');
    return mockCategories;
  },
};
