import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';
import HeroSection from '../../components/ui/HeroSection';
import { configureChains, chain, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import CollectionCard from '../../components/ui/CollectionCard/CollectionCard';
import CollectionList from '../../components/ui/CollectionList/CollectionList';
import BestSellers from '../../components/ui/BestSellers/BestSellers';
import BestBuyers from '../../components/ui/BestBuyers/BestBuyers';
import ServiceSection from '../../components/ui/ServiceSection/ServiceSection';

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

describe('Test the Home Page', () => {

//Hero Section Tests

test('Hero Section in Home page renders, with Discover rare digital art and collect Sell Extraordinary NFTs in the document', () => {
    render(
    <BrowserRouter>
    <WagmiConfig client={client}>
        <HeroSection/>
    </WagmiConfig>
    </BrowserRouter>
    );
    const linkElement = screen.getByTestId('discover_txt')
    expect(linkElement).toBeInTheDocument();
});

test('Home page banner image in Home page, renders with banner image in the document', () => {
  render(
  <BrowserRouter>
  <WagmiConfig client={client}>
      <HeroSection/>
  </WagmiConfig>
  </BrowserRouter>
  );
  const linkElement = screen.getByTestId('homepage_banner')
  expect(linkElement).toBeInTheDocument();
});

test('Render the hero section with connect explore and create buttons', async() => {
  render(
  <BrowserRouter>
  <WagmiConfig client={client}>
      <HeroSection/>
  </WagmiConfig>
  </BrowserRouter>
  );
  const buttonList = await screen.findAllByRole('button')
  expect(buttonList).toHaveLength(2);
  expect(buttonList[0]).toHaveTextContent('Explore')
  expect(buttonList[1]).toHaveTextContent('Create')
});

test('How it works image in hero section of homepage renders', () => {
  render(
  <BrowserRouter>
  <WagmiConfig client={client}>
      <HeroSection/>
  </WagmiConfig>
  </BrowserRouter>
  );
  const linkElement = screen.getByTestId('howitworks_image')
  expect(linkElement).toBeInTheDocument();
});

//Collection List Tests

test('Collection List in Home page renders, with Explore in the document', () => {
  render(
  <BrowserRouter>
  <WagmiConfig client={client}>
      <CollectionList/>
  </WagmiConfig>
  </BrowserRouter>
  );
  const linkElement = screen.getByTestId('explore_txt')
  expect(linkElement).toBeInTheDocument();
});

test('Collection in Collection List of homepage renders', () => {
  render(
  <BrowserRouter>
  <WagmiConfig client={client}>
      <CollectionCard
        key = {1}
        item = {
          {  id: "01",
            title: "Apes Club",
            desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
            imgUrl: "../../assets/images/apesclub.png",
            creator: "Trista Francis",
            creatorImg: "../../assets/images/creator1.png",
            currentBid: 5.89,
            createrUsername: "@TristaF",
            collectionName: "Cyber Punks",
          }
        }
      />
  </WagmiConfig>
  </BrowserRouter>
  );
  const linkElement = screen.getByTestId('collection_image')
  expect(linkElement).toBeInTheDocument();
});

//Best Sellers

test('Best Sellers in Home page renders with Top Sellers text in the document', () => {
  render(
  <BrowserRouter>
  <WagmiConfig client={client}>
      <BestSellers/>
  </WagmiConfig>
  </BrowserRouter>
  );
  const linkElement = screen.getByTestId('topsellers_txt')
  expect(linkElement).toBeInTheDocument();
});

//Best Buyers

test('Best Buyers in Home page renders with Top Buyers text in the document', () => {
  render(
  <BrowserRouter>
  <WagmiConfig client={client}>
      <BestBuyers/>
  </WagmiConfig>
  </BrowserRouter>
  );
  const linkElement = screen.getByTestId('topbuyers_txt')
  expect(linkElement).toBeInTheDocument();
});

//Service Section

test('Connect Your Wallet Box in Service Section renders in the Homepage', () => {
  render(
  <BrowserRouter>
  <WagmiConfig client={client}>
      <ServiceSection/>
  </WagmiConfig>
  </BrowserRouter>
  );
  const linkElement = screen.getByTestId('walletconnect_txt')
  expect(linkElement).toBeInTheDocument();
})

});;