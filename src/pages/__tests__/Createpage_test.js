import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';
import { configureChains, chain, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Create from '../Create';

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

describe('Test the Create/ Minting Page', () => {

//Create button test

    test('Render the minting form with create button', async() => {
        render(
        <BrowserRouter>
        <WagmiConfig client={client}>
            <Create/>
        </WagmiConfig>
        </BrowserRouter>
        );
        const buttonList = await screen.findAllByRole('button')
        expect(buttonList[1]).toHaveTextContent('Create')
    });

});;