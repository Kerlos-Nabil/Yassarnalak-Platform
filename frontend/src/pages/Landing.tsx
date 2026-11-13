import React from 'react';
import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { JourneyStepper } from '../components/landing/JourneyStepper';
import { DifficultyCards } from '../components/landing/DifficultyCards';
import { FeaturesBento } from '../components/landing/FeaturesBento';
import { SpecialistsPreview } from '../components/landing/SpecialistsPreview';
import { RecoveryLoop } from '../components/landing/RecoveryLoop';
import { FinalCta } from '../components/landing/FinalCta';
import { Disclaimer } from '../components/landing/Disclaimer';
import { Footer } from '../components/landing/Footer';

export function Landing() {
  return (
    <div className="min-h-screen w-full bg-cream">
      <Navbar />
      <main>
        <Hero />
        <JourneyStepper />
        <DifficultyCards />
        <FeaturesBento />
        <SpecialistsPreview />
        <RecoveryLoop />
        <FinalCta />
      </main>
      <Disclaimer />
      <Footer />
    </div>);

}