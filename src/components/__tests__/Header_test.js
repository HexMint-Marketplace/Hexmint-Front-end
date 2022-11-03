import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';

import { configureChains, chain, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Header from '../Header/Header';

const { chains, provider, webSocketProvider } = configureChains(
    [chain.mainnet, chain.polygon],
    [publicProvider()]
  );
  
  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  });

  test('HeXmint logo in header renders', () => {
    render(
    <BrowserRouter>
    <WagmiConfig client={client}>
        <Header/>
    </WagmiConfig>
    </BrowserRouter>
    );
    const linkElement = screen.getByTestId('HeXmint_txt')
    expect(linkElement).toBeInTheDocument();
});
