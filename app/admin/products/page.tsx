'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, FormField, FormButton } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  seller: string;
  status: 'active' | 'sold' | 'pending';
}

const mockProducts: Product[] = [
  { id: 1, title: 'Vintage Oak Dresser', price: 350, category: 'Furniture', seller: 'Sarah J.', status: 'active' },
  { id: 2, title: 'Upcycled Leather Bag', price: 120, category: 'Fashion', seller: 'Mike C.', status: 'active' },
  { id: 3, title: 'Restored Chair', price: 275, category: 'Furniture', seller: 'Emma W.', status: 'sold' },
  { id: 4, title: 'Denim Jacket', price: 85, category: 'Fashion', seller: 'Lisa M.', status: 'active' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Date.now(),
      title: formData.title,
      price: Number(formData.price),
      category: formData.category,
      seller: 'Admin',
      status: 'active',
    };
    setProducts([newProduct, ...products]);
    setShowForm(false);
    setFormData({ title: '', description: '', price: '', category: '' });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>
            <p className="text-gray-600">Add and manage marketplace products</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="bg-gray-900 hover:bg-gray-800">
            {showForm ? 'Cancel' : 'Add Product'}
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField label="Product Title" error="">
                  <Input
                    placeholder="Enter product title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </FormField>

                <FormField label="Description" error="">
                  <Textarea
                    placeholder="Describe the product"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </FormField>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField label="Price ($)" error="">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </FormField>

                  <FormField label="Category" error="">
                    <Select onValueChange={(value: string | null) => setFormData({ ...formData, category: value || '' })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="home-decor">Home Decor</SelectItem>
                        <SelectItem value="art">Art</SelectItem>
                        <SelectItem value="jewelry">Jewelry</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                </div>

                <div>
                  <Label className="mb-2 block">Product Images</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500 mt-2">Click to upload images</p>
                    <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
                  </div>
                </div>

                <FormButton type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
                  Add Product
                </FormButton>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Product</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Category</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Seller</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Price</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-6 font-medium">{product.title}</td>
                      <td className="py-4 px-6 text-gray-600 capitalize">{product.category}</td>
                      <td className="py-4 px-6 text-gray-600">{product.seller}</td>
                      <td className="py-4 px-6 font-medium">${product.price}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          product.status === 'active' ? 'bg-green-100 text-green-700' :
                          product.status === 'sold' ? 'bg-gray-100 text-gray-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-600">Delete</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
