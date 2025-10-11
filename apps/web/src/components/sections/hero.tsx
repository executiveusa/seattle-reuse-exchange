import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative overflow-hidden hero-gradient py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold tracking-tight mb-6">
              The Last Collection
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Auctions and donations for furniture, electronics, sports cards, comics, and art. 
              Every purchase funds New World Kids&apos; non-profit work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/auctions" 
                className="bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-2xl font-medium shadow-lg transition-all"
              >
                Browse Auctions
              </Link>
              <Link 
                href="/donate" 
                className="glass-panel text-white hover:bg-white/20 px-8 py-3 font-medium transition-all"
              >
                Donate Goods
              </Link>
            </div>
          </div>
          
          <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1512446733611-9099a758e0f9"
              alt="Curated collection of furniture and items"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
            />
          </div>
        </div>
      </div>
    </section>
  );
}