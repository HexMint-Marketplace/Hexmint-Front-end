import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

function NFTs(data) {
  const newTo = {
    pathname: "/nftPage/" + data.data.tokenId,
  };
  return (
    <Link to={newTo}>
      <div className="">
        <img src={data.data.image} alt="" width="300" height="200" />
        <div className="">
          <strong className="text-xl">{data.data.name}</strong>
          <p className="display-inline">{data.data.title}</p>
        </div>
      </div>
    </Link>
  );
}

export default NFTs;
