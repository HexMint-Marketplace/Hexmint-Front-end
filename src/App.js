import "./App.css";
import Layout from "./components/Layout/Layout.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { MoralisProvider } from "react-moralis";

import { configureChains, chain, WagmiConfig, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

function App() {
  return (
    <WagmiConfig client={client}>
      <Layout />
    </WagmiConfig>
  );
}

export default App;
