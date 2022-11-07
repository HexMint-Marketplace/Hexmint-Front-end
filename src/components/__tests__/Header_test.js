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

describe('Test the Header component', () => {
  test('Render the header with HeXmint logo', () => {
    render(
    <BrowserRouter>
    <WagmiConfig client={client}>
        <Header/>
    </WagmiConfig>
    </BrowserRouter>
    );
    const linkElement = screen.getByTestId('HeXmint_txt')
    expect(linkElement).toBeInTheDocument();
  })

  test('Render the header with connect wallet button', async() => {
    render(
    <BrowserRouter>
    <WagmiConfig client={client}>
        <Header/>
    </WagmiConfig>
    </BrowserRouter>
    );
    const buttonList = await screen.findAllByRole('button')
    expect(buttonList[0]).toHaveTextContent('Connect Wallet')
  });
});
