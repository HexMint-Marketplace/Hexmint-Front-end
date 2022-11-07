import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';

import { configureChains, chain, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import ViewReports from '../Nadmin/ViewReports'

const { chains, provider, webSocketProvider } = configureChains(
    [chain.mainnet, chain.polygon],
    [publicProvider()]
  );
  
  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  });

  describe('Test the View reports page', () => {
    test('View reports page renders with view reports table', () => {
        render(
        <BrowserRouter>
        <WagmiConfig client={client}>
            <ViewReports/>
        </WagmiConfig>
        </BrowserRouter>
        );
        const reportsTable  = screen.getByTestId("reports_table")
        expect(reportsTable).toBeInTheDocument();
    });

});
