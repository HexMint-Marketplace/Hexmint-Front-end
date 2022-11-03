import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';

import { configureChains, chain, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import ExploreList from '../ui/ExploreList/ExploreList';

const { chains, provider, webSocketProvider } = configureChains(
    [chain.mainnet, chain.polygon],
    [publicProvider()]
  );
  
  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  });

  test('Explore page collection section in explore page renders', () => {
    render(
    <BrowserRouter>
    <WagmiConfig client={client}>
        <ExploreList/>
    </WagmiConfig>
    </BrowserRouter>
    );
    const linkElement = screen.getByTestId('collection_section')
    expect(linkElement).toBeInTheDocument();
});
