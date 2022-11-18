import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';

import { configureChains, chain, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import AdminsRequests from '../Sadmin/AdminRequests';

const { chains, provider, webSocketProvider } = configureChains(
    [chain.mainnet, chain.polygon],
    [publicProvider()]
  );
  
  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  });

  describe('Test the admins requsts page', () => {
    test('View admins requests form page renders with admin requests table', () => {
        render(
        <BrowserRouter>
        <WagmiConfig client={client}>
            <AdminsRequests/>
        </WagmiConfig>
        </BrowserRouter>
        );
        const adminsRequests = screen.getByTestId("adminRequests_table");
        expect(adminsRequests).toBeInTheDocument();
    });

});
