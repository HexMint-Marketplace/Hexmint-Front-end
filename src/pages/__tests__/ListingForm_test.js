import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';
import { configureChains, chain, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import ListingForm from '../../components/ui/ListingForm/ListingForm'

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

describe('Test the Listing Form', () => {

//Create button test

    test('Render the lisiting form with "complete lisitng" button and other form inputs', async() => {
        render(
        <BrowserRouter>
        <WagmiConfig client={client}>
            <ListingForm/>
        </WagmiConfig>
        </BrowserRouter>
        );
        const buttonList = await screen.findAllByRole('button')
        expect(buttonList).toHaveLength(1);
        expect(buttonList[0]).toHaveTextContent('Complete Listing')

        const prize = screen.getByPlaceholderText("Enter Prize")
        expect(prize).toBeInTheDocument();
    });

});;