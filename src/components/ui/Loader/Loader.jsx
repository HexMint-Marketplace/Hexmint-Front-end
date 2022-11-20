import "../Loader/loader.css";

import React, { Fragment } from "react";

const Loader = (props) => {
  return (
    props.isLoading && (
      <Fragment>
        <div id="preloader" data-testid="preloader">
          {/*  Preloader */}
          <div id="digimax-preloader" className="digimax-preloader">
            {/* Preloader Animation */}
            <div className="preloader-animation">
              {/* Spinner */}
              <div className="spinner" />
              {/* Loader */}
              <div className="loader">
                <span data-text-preloader="H" className="animated-letters">
                  H
                </span>
                <span data-text-preloader="e" className="animated-letters">
                  e
                </span>
                <span data-text-preloader="X" className="animated-letters">
                  X
                </span>
                <span data-text-preloader="m" className="animated-letters">
                  m
                </span>
                <span data-text-preloader="i" className="animated-letters">
                  i
                </span>
                <span data-text-preloader="n" className="animated-letters">
                  n
                </span>
                <span data-text-preloader="t" className="animated-letters">
                  t
                </span>
              </div>
              <p className="fw-5 text-center text-uppercase">NFT Marketplace</p>
            </div>
            {/* Loader Animation */}
            <div className="loader-animation">
              <div className="row h-100">
                {/* Single Loader */}
                <div className="col-3 single-loader p-0">
                  <div className="loader-bg" />
                </div>
                {/* Single Loader */}
                <div className="col-3 single-loader p-0">
                  <div className="loader-bg" />
                </div>
                {/* Single Loader */}
                <div className="col-3 single-loader p-0">
                  <div className="loader-bg" />
                </div>
                {/* Single Loader */}
                <div className="col-3 single-loader p-0">
                  <div className="loader-bg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  );
};

export default Loader;
