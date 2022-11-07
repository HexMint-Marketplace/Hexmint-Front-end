import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';
import { configureChains, chain, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import EditAdminDetails from '../EditAdminDetails';



const { chains, provider, webSocketProvider } = configureChains(
    [chain.mainnet, chain.polygon],
    [publicProvider()]
  );
  
  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  });

describe('Test the Edit Admin Details page', () => {
  test('Email input should have type email', () => {
    render(
    <BrowserRouter>
    <WagmiConfig client={client}>
        (<EditAdminDetails/>)
    </WagmiConfig>
    </BrowserRouter>
    );
    const adminEmail = screen.getByPlaceholderText('Enter Your Email Address')
    expect(adminEmail).toHaveAttribute('type', 'email')
  })

  // test('Should be able to submit the edit details form', () => {
  //   render(
  //   <BrowserRouter>
  //   <WagmiConfig client={client}>
  //       (<EditAdminDetails/>)
  //   </WagmiConfig>
  //   </BrowserRouter>
  //   );
  //   const submitButton = screen.getByTestId('submit')
  //   expect(adminEmail).toHaveAttribute('type', 'email')
  // })

});
