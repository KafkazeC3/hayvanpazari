'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ListingForm } from '@/components/listings/ListingForm';

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default function CreateListingPage() {
  return (
    <main className="min-h-screen bg-earth-50/30">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <h1 className="text-3xl font-bold text-earth-800 mb-3">
            Ücretsiz İlan Ver
          </h1>
          <p className="text-earth-500">
            Hayvanınızı veya ürününüzü dakikalar içinde binlerce alıcıya ulaştırın.
          </p>
        </motion.div>

        <ListingForm />
      </div>
      <Footer />
    </main>
  );
}
