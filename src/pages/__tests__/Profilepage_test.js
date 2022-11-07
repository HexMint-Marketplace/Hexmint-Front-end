// import {render, screen} from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import { WagmiConfig } from 'wagmi';

// import { configureChains, chain, createClient } from "wagmi";
// import { publicProvider } from "wagmi/providers/public";
// import ExploreList from '../ui/ExploreList/ExploreList';
// import ProfileHead from '../ui/ProfileHead/ProfileHead';

// const { chains, provider, webSocketProvider } = configureChains(
//     [chain.mainnet, chain.polygon],
//     [publicProvider()]
//   );
  
//   const client = createClient({
//     autoConnect: true,
//     provider,
//     webSocketProvider,
//   });

// //Prfile head

//   test('Explore page collection section in explore page renders', () => {
//     render(
//     <BrowserRouter>
//     <WagmiConfig client={client}>
//     <ProfileHead
//        userWallet='0x3e4762d85EAE1E3A997a7Af47b9f09A20Aa8231a'
//        userType='Customer'
//        name='Dasith Samarasinghe'
//        userName='Dasith'
//        proPic='testing pic'
//        email='dasithks@gmail.com'
//        DOB='2022/04/7'
//        mobile='0712324567'
//        key='7'
//        collectionData = {[

//          {
//            collectionId: "01",
//            contractAddress: "0x3e4762d85EAE1E3A997a7Af47b9f09A20Aa8231a",
//            collectionName: "Cyber Punks",
//            description:
//              "Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain. Cool Cat holders can participate in exclusive events such as NFT claims, raffles, community giveaways, and more.",
//            collectionIcon: '../images/collectionIcon.png',
//          },
//          {
//             collectionId: "02",
//             contractAddress: "0x3e4762d85EAE1E3A997a7Af47b9f09A20Aa8231a",
//             collectionName: "Cyber Punks",
//             description:
//               "Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain. Cool Cat holders can participate in exclusive events such as NFT claims, raffles, community giveaways, and more.",
//             collectionIcon: '../images/collectionIcon.png',
//           },
//        ]
//       }
       
//        data='data'
//        setissubmit = 'true'
//        />
//     </WagmiConfig>
//     </BrowserRouter>
//     );
//     const linkElement = screen.getByTestId('collection_section')
//     expect(linkElement).toBeInTheDocument();
// });
