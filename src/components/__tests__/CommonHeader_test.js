import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';

import { configureChains, chain, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import CommonHeader from '../ui/CommonHeader/CommonHeader';

const { chains, provider, webSocketProvider } = configureChains(
    [chain.mainnet, chain.polygon],
    [publicProvider()]
  );
  
  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  });

  test('Explore page header in explore page renders with "Expore Collections"', () => {
    render(
    <BrowserRouter>
    <WagmiConfig client={client}>
        <CommonHeader
        title="Explore Collections"
        />
    </WagmiConfig>
    </BrowserRouter>
    );
    const linkElement = screen.getByTestId('commonHeader_txt')
    expect(linkElement).toBeInTheDocument();
});
