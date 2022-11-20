import "./App.css";
import Layout from "./components/Layout/Layout.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: "yourAlchemyApiKey" }),
  publicProvider(),
]);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

window.Buffer = window.Buffer || require("buffer").Buffer;

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <WagmiConfig client={client}>
        <Layout />
      </WagmiConfig>
    </ThemeProvider>
  );
}

export default App;
