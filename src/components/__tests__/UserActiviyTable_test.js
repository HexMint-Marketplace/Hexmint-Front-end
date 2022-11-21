import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';

import { configureChains, chain, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import UserActivity from '../ui/UserActivity/UserActivity';

const { chains, provider, webSocketProvider } = configureChains(
    [chain.mainnet, chain.polygon],
    [publicProvider()]
  );
  
  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  });

  describe('Test the User Activity Page', () => {
    test('User Activity table renders with table head', () => {
        render(
        <BrowserRouter>
        <WagmiConfig client={client}>
            <UserActivity
            walletaddress="0x0000000000000000000000000000000000000000"
            />
        </WagmiConfig>
        </BrowserRouter>
        );
        const linkElement = screen.getByTestId('activity')
        expect(linkElement).toBeInTheDocument();
    });
});
