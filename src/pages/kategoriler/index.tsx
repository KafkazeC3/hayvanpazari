'use client';



import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { categories } from '@/data/mockData';

const colorMap: Record<string, string> = { 
  '1': 'from-nature-500 to-nature-600', 
  '2': 'from-harvest-500 to-harvest-600', 
  '3': 'from-earth-500 to-earth-600', 
  '4': 'from-blue-500 to-blue-600' 
};

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-earth-50/30">
      <Navbar />
      <div className="bg-white border-b border-earth-200">
        <div className="container mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto">
            <span className="text-nature-600 font-semibold text-sm uppercase tracking-wider">Kategoriler</span>
            <h1 className="text-3xl md:text-4xl font-bold text-earth-800 mt-3">Tüm Kategoriler</h1>
            <p className="text-earth-500 mt-4">İhtiyacınız olan kategoriyi seçin, binlerce ilan arasından size en uygununu bulun.</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => {
            return (
              <motion.div key={category.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <Link href={`/ilanlar?category=${category.id}`}>
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative md:w-2/5 h-48 md:h-auto overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-t ${colorMap[category.id]} opacity-60`} />
                        <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <span className="text-3xl font-bold text-white">{category.name.charAt(0)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 p-6 md:p-8">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h2 className="text-2xl font-bold text-earth-800 group-hover:text-nature-600 transition-colors">{category.name}</h2>
                            <p className="text-earth-500 mt-2">{category.description}</p>
                          </div>
                          <ArrowRight className="h-6 w-6 text-nature-600 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {category.subcategories.slice(0, 4).map((sub) => <span key={sub.id} className="text-xs px-3 py-1.5 rounded-full bg-earth-100 text-earth-600">{sub.name}</span>)}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-earth-100">
                          <div className="flex items-center gap-4">
                            <div><div className="text-2xl font-bold text-earth-800">{category.listingCount}</div><div className="text-xs text-earth-500">Aktif İlan</div></div>
                          </div>
                          <span className="text-nature-600 font-medium text-sm group-hover:underline">İlanları Gör</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
      <Footer />
    </main>
  );
}
