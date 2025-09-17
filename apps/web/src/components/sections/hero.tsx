'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Gavel, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-evergreen to-puget-blue py-20 text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl font-bold tracking-tight mb-6 font-display">
            Keep Good Stuff Out of the Dump.
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Bid on rescued office furniture & gear. Every purchase funds local reuse across Seattle.
            {/* AI-CHAT: This hero emphasizes environmental impact and local community benefit */}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-salmon hover:bg-salmon/90 text-white">
              <Gavel className="mr-2 h-5 w-5" />
              Browse Auctions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-evergreen">
              <Heart className="mr-2 h-5 w-5" />
              Donate Goods
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
    </section>
  );
}