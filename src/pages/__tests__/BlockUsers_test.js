import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';

import { configureChains, chain, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import BlockUsers from "../Nadmin/BlockUsers";

const { chains, provider, webSocketProvider } = configureChains(
    [chain.mainnet, chain.polygon],
    [publicProvider()]
  );
  
  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  });

  describe('Test the Block Users page', () => {
    test('Block an user page renders with "Block" button and form inputs', async() => {
        render(
        <BrowserRouter>
        <WagmiConfig client={client}>
            <BlockUsers/>
        </WagmiConfig>
        </BrowserRouter>
        );
        const buttonList = await screen.findAllByRole('button')
        expect(buttonList).toHaveLength(2);
        expect(buttonList[1]).toHaveTextContent("Block");

        const reason = screen.getByPlaceholderText("Enter Reason")
        expect(reason).toBeInTheDocument();
    });

});
