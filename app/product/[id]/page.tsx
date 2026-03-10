'use client';

import { useEffect, useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { productService } from '@/services/productService';
import { Product } from '@/services/api/types';
import { formatPrice } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';

const conditionLabels: Record<string, string> = {
  new: 'New',
  like_new: 'Like New',
  good: 'Good',
  fair: 'Fair',
  poor: 'Poor',
};

const locationMap: Record<string, string> = {
  '1': 'Brooklyn, NY',
  '2': 'Austin, TX',
  '3': 'Portland, OR',
  '4': 'Denver, CO',
  '5': 'Seattle, WA',
  '6': 'Chicago, IL',
  '7': 'San Francisco, CA',
};

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { addToast } = useToast();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showOfferDialog, setShowOfferDialog] = useState(false);
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Delivery information state
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  useEffect(() => {
    loadProduct();
  }, [resolvedParams.id]);

  const loadProduct = async () => {
    setIsLoading(true);
    try {
      const data = await productService.getProduct(resolvedParams.id);
      setProduct(data);
    } catch (error) {
      console.error('Failed to load product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      addToast({
        title: 'Please login',
        description: 'You need to login to purchase items',
        variant: 'warning',
      });
      router.push('/login');
      return;
    }

    if (user?.account_type === 'designer' || user?.account_type === 'admin') {
      addToast({
        title: 'Cannot purchase',
        description: 'Only buyers can purchase items',
        variant: 'error',
      });
      return;
    }

    // Show delivery information dialog
    setShowDeliveryDialog(true);
  };

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmOrder = () => {
    // Validate delivery information
    if (!deliveryInfo.fullName || !deliveryInfo.address || !deliveryInfo.city || !deliveryInfo.state || !deliveryInfo.zipCode || !deliveryInfo.phone) {
      addToast({
        title: 'Missing information',
        description: 'Please fill in all delivery information fields',
        variant: 'error',
      });
      return;
    }

    // Close dialog and place order
    setShowDeliveryDialog(false);
    
    addToast({
      title: 'Order placed!',
      description: `Your order for ${product?.title} will be delivered to: ${deliveryInfo.address}, ${deliveryInfo.city}, ${deliveryInfo.state} ${deliveryInfo.zipCode}`,
      variant: 'success',
    });

    // Reset delivery info
    setDeliveryInfo({
      fullName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
    });
  };

  const handleMakeOffer = () => {
    if (!isAuthenticated) {
      addToast({
        title: 'Please login',
        description: 'You need to login to make an offer',
        variant: 'warning',
      });
      router.push('/login');
      return;
    }

    if (user?.account_type === 'designer' || user?.account_type === 'admin') {
      addToast({
        title: 'Cannot make offer',
        description: 'Only buyers can make offers',
        variant: 'error',
      });
      return;
    }

    setShowOfferDialog(true);
  };

  const handleSubmitOffer = async () => {
    const offer = parseFloat(offerAmount);
    
    if (isNaN(offer) || offer <= 0) {
      addToast({
        title: 'Invalid amount',
        description: 'Please enter a valid offer amount',
        variant: 'error',
      });
      return;
    }

    if (product && offer > product.price * 1.5) {
      addToast({
        title: 'Offer too high',
        description: 'Your offer cannot exceed 150% of the asking price',
        variant: 'warning',
      });
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowOfferDialog(false);
      setOfferAmount('');
      addToast({
        title: 'Offer submitted!',
        description: `Your offer of ${formatPrice(offer)} has been sent to the seller.`,
        variant: 'success',
      });
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
            <Link href="/marketplace">
              <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700">
                Back to Marketplace
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const location = locationMap[product.seller.id] || 'Online';
  const isOwnProduct = user?.id === product.seller.id;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/marketplace"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Marketplace
          </Link>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${
                        selectedImage === index ? 'border-emerald-600' : 'border-transparent'
                      }`}
                    >
                      <Image src={image} alt={`${product.title} ${index + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
                    {conditionLabels[product.condition]}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full capitalize">
                    {product.category}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
                <p className="text-3xl font-bold text-emerald-600 mt-2">
                  {formatPrice(product.price)}
                </p>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-lg py-6"
                  onClick={handleBuyNow}
                  disabled={isOwnProduct}
                >
                  Buy Now
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 text-lg py-6 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                  onClick={handleMakeOffer}
                  disabled={isOwnProduct}
                >
                  Make Offer
                </Button>
              </div>

              {isOwnProduct && (
                <p className="text-sm text-orange-600 text-center">
                  This is your listing
                </p>
              )}

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Description</h3>
                  <p className="text-gray-600 whitespace-pre-wrap">{product.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Seller</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-semibold text-lg">
                      {product.seller.first_name[0]}{product.seller.last_name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {product.seller.first_name} {product.seller.last_name}
                      </p>
                      <p className="text-sm text-gray-500">{location}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                    View Profile
                  </Button>
                </CardContent>
              </Card>

              <div className="text-sm text-gray-500">
                <p>Posted on {new Date(product.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Make Offer Dialog */}
      <Dialog open={showOfferDialog} onOpenChange={setShowOfferDialog}>
        <DialogContent className="bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Make an Offer</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Enter your offer amount for {product.title}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Offer ({formatPrice(product.price)} asking price)
            </label>
            <input
              type="number"
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              min="1"
              step="0.01"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Suggested: {formatPrice(product.price * 0.8)} - {formatPrice(product.price)}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowOfferDialog(false)} className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitOffer}
              disabled={isSubmitting || !offerAmount}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Offer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delivery Information Dialog */}
      <Dialog open={showDeliveryDialog} onOpenChange={setShowDeliveryDialog}>
        <DialogContent className="bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Delivery Information</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Please provide your delivery details to confirm your order for {product.title}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={deliveryInfo.fullName}
                onChange={handleDeliveryChange}
                placeholder="Enter your full name"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={deliveryInfo.address}
                onChange={handleDeliveryChange}
                placeholder="Enter your street address"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={deliveryInfo.city}
                  onChange={handleDeliveryChange}
                  placeholder="City"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  value={deliveryInfo.state}
                  onChange={handleDeliveryChange}
                  placeholder="State"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  ZIP Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={deliveryInfo.zipCode}
                  onChange={handleDeliveryChange}
                  placeholder="ZIP Code"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={deliveryInfo.phone}
                  onChange={handleDeliveryChange}
                  placeholder="Phone Number"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">Order Summary:</span> {product.title} - {formatPrice(product.price)}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeliveryDialog(false)} className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmOrder}
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isSubmitting ? 'Processing...' : 'Confirm Order'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
