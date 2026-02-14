'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/mockData';

const colorMap: Record<string, string> = { 
  '1': 'from-nature-500 to-nature-600', 
  '2': 'from-harvest-500 to-harvest-600', 
  '3': 'from-earth-500 to-earth-600', 
  '4': 'from-blue-500 to-blue-600' 
};

const bgColorMap: Record<string, string> = { 
  '1': 'bg-nature-50 group-hover:bg-nature-100', 
  '2': 'bg-harvest-50 group-hover:bg-harvest-100', 
  '3': 'bg-earth-50 group-hover:bg-earth-100', 
  '4': 'bg-blue-50 group-hover:bg-blue-100' 
};

const iconColorMap: Record<string, string> = { 
  '1': 'text-nature-600', 
  '2': 'text-harvest-600', 
  '3': 'text-earth-600', 
  '4': 'text-blue-600' 
};

export function CategorySection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-nature-600 font-semibold text-sm uppercase tracking-wider">Kategoriler</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl font-bold text-earth-800 mt-2">Ne Arıyorsunuz?</motion.h2>
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-earth-500 mt-2 max-w-lg">İhtiyacınız olan kategoriyi seçin, binlerce ilan arasından size en uygununu bulun.</motion.p>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Link href="/kategoriler" className="inline-flex items-center gap-2 text-nature-600 font-medium hover:text-nature-700">Tüm Kategoriler<ArrowRight className="h-4 w-4" /></Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            return (
              <motion.div key={category.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Link href={`/ilanlar?category=${category.id}`}>
                  <div className="group relative overflow-hidden rounded-2xl bg-white shadow-card hover:shadow-card-hover transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-t ${colorMap[category.id]} opacity-60`} />
                      <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">{category.name.charAt(0)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-earth-800 group-hover:text-nature-600 transition-colors">{category.name}</h3>
                        <div className={`w-8 h-8 rounded-lg ${bgColorMap[category.id]} flex items-center justify-center transition-colors`}>
                          <ArrowRight className={`h-4 w-4 ${iconColorMap[category.id]} transform group-hover:translate-x-0.5 transition-transform`} />
                        </div>
                      </div>
                      <p className="text-sm text-earth-500 line-clamp-2 mb-3">{category.description}</p>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-earth-100 text-earth-600">{category.listingCount} ilan</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
