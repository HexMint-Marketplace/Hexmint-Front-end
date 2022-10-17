import React from 'react'
import {Container,Col,Row} from 'reactstrap'
import {NFT__DATA} from '../../../asssets/data/data.js'
import NFTCard from '../NFTCard/NFTCard'
import SellerNFTCard from "../SellerNFTCard/SellerNFTCard"
import NFTs from "../../../pages/NFTs";
import {USER_NFT_DATA} from "../../../asssets/data/data"

function UserNFTList(props) {
    const {data} = props
    return (
        <section>
        <Container>
            <Row>

                {/* {USER_NFT_DATA.slice(0, 6).map((item) => (
                    <Col lg="3" md="4" sm="6" className="mb-4">
                        <SellerNFTCard key={item.id} item={item} />
                    </Col>
                ))} */}

                {data.map((value, index) => (
                    <Col lg="3" md="4" sm="6" className="mb-4">
                        <SellerNFTCard key={index} item={value} />
                    </Col>
                ))}
            </Row>

            {/* <Row>
                <Col lg="3" md="4" sm="6">
                    <div className="">
                        <div className="">
                        {data.map((value, index) => {
                            return <NFTs data={value} key={index}></NFTs>;
                        })}
                        </div>
                        <div className="mt-10 text-xl">
                        {data.length == 0
                            ? "Oops, No NFT data to display (Are you logged in?)"
                            : ""}
                        </div>
                    </div>
                </Col>
            </Row> */}
        </Container>
  </section>
  )
}

export default UserNFTList