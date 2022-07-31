import React from 'react'
import CollectionList from '../components/ui/CollectionList/CollectionList';
import HeroSection from '../components/ui/HeroSection';
import BestSellers from '../components/ui/BestSellers/BestSellers';
import BestBuyers from '../components/ui/BestBuyers/BestBuyers';
import ServiceSection from '../components/ui/ServiceSection/ServiceSection';

function Home() {
  return (
    <div>
      <HeroSection/>
      <CollectionList/>
      <BestSellers/>
      <BestBuyers/>
      <ServiceSection/>
    </div>
  );
}

export default Home