'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, FormField, FormButton } from '@/components/ui/form';
import { Label } from '@/components/ui/label';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '',
    bio: '',
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600">Manage your account settings</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField label="First Name" error="">
                  <Input value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                </FormField>
                <FormField label="Last Name" error="">
                  <Input value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                </FormField>
              </div>

              <FormField label="Email" error="">
                <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </FormField>

              <FormField label="Phone Number" error="">
                <Input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+1 (555) 000-0000" />
              </FormField>

              <FormField label="Bio" error="">
                <textarea 
                  className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                />
              </FormField>

              <FormButton type="submit" className="w-full sm:w-auto">
                Save Changes
              </FormButton>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <FormField label="Current Password" error="">
                <Input type="password" placeholder="Enter current password" />
              </FormField>
              <FormField label="New Password" error="">
                <Input type="password" placeholder="Enter new password" />
              </FormField>
              <FormField label="Confirm New Password" error="">
                <Input type="password" placeholder="Confirm new password" />
              </FormField>
              <FormButton type="submit" className="w-full sm:w-auto">
                Update Password
              </FormButton>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Email notifications for messages', 'Email notifications for new offers', 'Weekly digest'].map((item) => (
                <label key={item} className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-emerald-600" />
                  <span className="text-sm text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
