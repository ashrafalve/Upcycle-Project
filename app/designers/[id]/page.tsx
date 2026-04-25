'use client';

import { useParams, useRouter } from 'next/navigation';
import { Navbar, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Star, Package, MessageSquare } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

// Mock data for demonstration - in a real app, this would come from an API
const designers = [
  { id: 1, name: 'Mike Chen', specialty: 'Furniture Restoration', rating: 4.9, projects: 24, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face', bio: 'Expert in restoring mid-century modern furniture with a sustainable twist.', location: 'Brooklyn, NY' },
  { id: 2, name: 'Sarah Johnson', specialty: 'Leather Work', rating: 4.8, projects: 18, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face', bio: 'Passionate about repurposing vintage leather into modern accessories.', location: 'Austin, TX' },
  { id: 3, name: 'Emma Wilson', specialty: 'Textile Design', rating: 4.7, projects: 12, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face', bio: 'Creating beautiful art from recycled fabrics and textiles.', location: 'Portland, OR' },
  { id: 4, name: 'Alex Rivera', specialty: 'Woodworking', rating: 4.6, projects: 8, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face', bio: 'Specializing in reclaimed wood furniture and custom carvings.', location: 'Denver, CO' },
];

export default function DesignerProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  
  const id = params.id ? parseInt(params.id as string) : null;
  const designer = designers.find(d => d.id === id);

  const handleMessageDesigner = () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/designers/${id}`);
      return;
    }
    // Redirect to messages with designer info
    router.push(`/dashboard/messages?recipient=${id}`);
  };

  if (!designer) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Designer not found</h2>
            <Button className="mt-4" onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1">
        {/* Header/Cover */}
        <div className="h-48 md:h-64 bg-emerald-600 relative">
          <div className="container mx-auto px-4 h-full relative">
            <div className="absolute -bottom-16 left-4 md:left-8 flex flex-col md:flex-row items-end gap-6">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-900 shadow-xl bg-white">
                <img 
                  src={designer.image} 
                  alt={designer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pb-4 mb-2 md:mb-0">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white bg-white/80 dark:bg-black/40 backdrop-blur-md px-4 py-1 rounded-lg">
                  {designer.name}
                </h1>
                <p className="text-emerald-700 dark:text-emerald-400 font-semibold px-4 mt-1">
                  {designer.specialty}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar Info */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-5 h-5 text-emerald-500" />
                    <span>{designer.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span>{designer.rating} Rating</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <Package className="w-5 h-5 text-blue-500" />
                    <span>{designer.projects} Projects Completed</span>
                  </div>
                  <hr className="dark:border-gray-700" />
                  <Button 
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    onClick={handleMessageDesigner}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" /> Message Designer
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4">About Me</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {designer.bio}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content (Showcase/Projects) */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Recent Work</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="group relative aspect-square rounded-xl overflow-hidden bg-gray-200 shadow-sm">
                      <img 
                        src={`https://images.unsplash.com/photo-${1550000000000 + i * 10000}?w=400&h=400&fit=crop`} 
                        alt="Project" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-medium">View Project</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
