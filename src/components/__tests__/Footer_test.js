import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';

import { configureChains, chain, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Footer from '../Footer/Footer'

const { chains, provider, webSocketProvider } = configureChains(
    [chain.mainnet, chain.polygon],
    [publicProvider()]
  );
  
  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  });

describe('Test the Footer component', () => {
  test('Description text in footer renders', () => {
    render(
    <BrowserRouter>
    <WagmiConfig client={client}>
        <Footer/>
    </WagmiConfig>
    </BrowserRouter>
    );
    const linkElement = screen.getByText('For any inquiries : inquiries@hexmint.com')
    expect(linkElement).toBeInTheDocument();
})

test('Copyright text in footer renders', () => {
  render(
  <BrowserRouter>
  <WagmiConfig client={client}>
      <Footer/>
  </WagmiConfig>
  </BrowserRouter>
  );
  const linkElement = screen.getByText('@HeXmint-2022')
  expect(linkElement).toBeInTheDocument();
})

});

