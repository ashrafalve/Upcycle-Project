import Link from 'next/link';
import { Navbar, Footer } from '@/components/layout';

const stories = [
  { title: 'From Trash to Treasure', author: 'Sarah J.', excerpt: 'How I turned an old dresser into a modern masterpiece' },
  { title: 'The Art of Leather Upcycling', author: 'Mike C.', excerpt: 'Transforming vintage bags into unique accessories' },
  { title: 'Giving Old Clothes New Life', author: 'Emma W.', excerpt: 'Creating beautiful textiles from pre-loved garments' },
  { title: 'Woodworking Magic', author: 'Alex R.', excerpt: 'Building furniture from reclaimed materials' },
];

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="bg-emerald-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Success Stories</h1>
            <p className="mt-4 text-emerald-100">Inspiring upcycling transformations</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            {stories.map((story, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-900">{story.title}</h3>
                <p className="text-gray-500 text-sm mt-1">by {story.author}</p>
                <p className="text-gray-600 mt-4">{story.excerpt}</p>
                <Link href="#" className="inline-block mt-4 text-emerald-600 hover:text-emerald-700">
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
