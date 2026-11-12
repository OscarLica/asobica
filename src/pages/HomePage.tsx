import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/public/HeroSection';
import { StandingsTable } from '@/components/public/StandingsTable';

export function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Tabla de Posiciones
        </h2>
        <StandingsTable />
      </section>
    </Layout>
  );
}
