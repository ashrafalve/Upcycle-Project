'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="bg-emerald-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="mt-4 text-emerald-100">We would love to hear from you</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12 max-w-xl">
          {submitted ? (
            <div className="bg-white rounded-lg p-8 shadow-md text-center">
              <div className="text-emerald-600 text-5xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-gray-900">Thank You!</h2>
              <p className="text-gray-600 mt-2">Your message has been sent. We will get back to you soon.</p>
              <Link href="/" className="inline-block mt-6 text-emerald-600 hover:text-emerald-700">
                Back to Home →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-md space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" required />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="How can we help?" rows={5} required />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                Send Message
              </Button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
