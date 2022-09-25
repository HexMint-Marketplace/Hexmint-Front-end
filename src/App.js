import './App.css';
import Layout from './components/Layout/Layout.jsx';
import { MoralisProvider } from "react-moralis";



function App() {
  return <MoralisProvider initializeOnMount={false}>
    <Layout/>
  </MoralisProvider>
}

export default App;
