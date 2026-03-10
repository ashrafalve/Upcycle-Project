'use client';

import { useState } from 'react';
import { DesignerLayout } from '@/components/designer/designer-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, FormField, FormButton } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Mike',
    lastName: 'Chen',
    email: 'mike@example.com',
    bio: 'Passionate upcycling designer with 5+ years of experience transforming vintage items into modern masterpieces.',
    skills: 'Furniture Restoration, Leather Work, Textile Design, Painting',
    hourlyRate: '50',
  });

  return (
    <DesignerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Designer Profile</h1>
            <p className="text-gray-600">Manage your public profile</p>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)} variant="outline">
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-100">
                  <Image 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" 
                    alt="Profile" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <h2 className="mt-4 text-xl font-semibold">Mike Chen</h2>
                <p className="text-gray-500">Upcycling Designer</p>
                <div className="mt-4 flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">24 completed projects</p>
                <Button className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700">View Public Profile</Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <form className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField label="First Name" error="">
                        <Input value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                      </FormField>
                      <FormField label="Last Name" error="">
                        <Input value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                      </FormField>
                    </div>
                    <FormField label="Email" error="">
                      <Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </FormField>
                    <FormField label="Bio" error="">
                      <Textarea value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} rows={4} />
                    </FormField>
                    <FormField label="Skills" error="">
                      <Input value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})} />
                    </FormField>
                    <FormField label="Hourly Rate ($)" error="">
                      <Input type="number" value={formData.hourlyRate} onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})} />
                    </FormField>
                    <FormButton type="button" onClick={() => setIsEditing(false)} className="bg-emerald-600 hover:bg-emerald-700">
                      Save Changes
                    </FormButton>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{formData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bio</p>
                      <p className="text-gray-700">{formData.bio}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Skills</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {formData.skills.split(', ').map((skill) => (
                          <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Hourly Rate</p>
                      <p className="font-medium">${formData.hourlyRate}/hour</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Portfolio Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField label="Instagram" error="">
                  <Input placeholder="@username" />
                </FormField>
                <FormField label="Website" error="">
                  <Input placeholder="https://" />
                </FormField>
                <Button variant="outline">Save Social Links</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DesignerLayout>
  );
}
