'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ListingCard } from '@/components/listings/ListingCard';
import { listings } from '@/data/mockData';

export function RecentListings() {
  const recentListings = listings.slice(0, 8);

  return (
    <section className="py-16 md:py-24 bg-earth-50/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-nature-600 font-semibold text-sm uppercase tracking-wider">Yeni İlanlar</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl font-bold text-earth-800 mt-2">Son Eklenen İlanlar</motion.h2>
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-earth-500 mt-2 max-w-lg">En yeni ilanları keşfedin, fırsatları kaçırmayın.</motion.p>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Link href="/ilanlar">
              <Button variant="outline" className="rounded-full gap-2 border-earth-200 hover:bg-earth-50">Tüm İlanlar<ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recentListings.map((listing, index) => (
            <motion.div key={listing.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
              <ListingCard listing={listing} />
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-10 text-center md:hidden">
          <Link href="/ilanlar">
            <Button className="gradient-nature text-white rounded-full gap-2 px-8">Tüm İlanları Gör<ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
