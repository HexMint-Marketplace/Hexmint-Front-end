import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';

import { configureChains, chain, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Dashboard from "../Nadmin/Dashboard"
import NormalAdminNav from "../../components/SideNav/NormalAdmin/NormalAdminNav"

const { chains, provider, webSocketProvider } = configureChains(
    [chain.mainnet, chain.polygon],
    [publicProvider()]
  );
  
  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  });

  describe('Test the Admin Dashboard', () => {
    test('Marketplace balance renders', () => {
        render(
        <BrowserRouter>
        <WagmiConfig client={client}>
            <Dashboard/>
        </WagmiConfig>
        </BrowserRouter>
        );
        const linkElement = screen.getByTestId("balance_text")
        expect(linkElement).toBeInTheDocument();
    });

    test('Admin sidebar renders', () => {
        render(
        <BrowserRouter>
        <WagmiConfig client={client}>
            <NormalAdminNav/>
        </WagmiConfig>
        </BrowserRouter>
        );
        const linkElement = screen.getByTestId("admin_sidebar")
        expect(linkElement).toBeInTheDocument();
    });
});
