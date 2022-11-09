// import React from 'react'
import "../Loader/loader.css";

// const Loader = () => {
//   return (
//     <div className='loader-element'><svg class="pl" viewBox="0 0 64 64" width="64px" height="64px" xmlns="http://www.w3.org/2000/svg">
//     <defs>
//       <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
//         <stop offset="0%" stop-color="#000" />
//         <stop offset="100%" stop-color="#fff" />
//       </linearGradient>
//       <mask id="grad-mask">
//         <rect x="0" y="0" width="64" height="64" fill="url(#grad)" />
//       </mask>
//     </defs>
//     <circle class="pl__ring" cx="32" cy="32" r="26" fill="none" stroke="hsl(223,90%,55%)" stroke-width="12" stroke-dasharray="169.65 169.65" stroke-dashoffset="-127.24" stroke-linecap="round" transform="rotate(135)" />
//     <g fill="hsl(223,90%,55%)">
//       <circle class="pl__ball1" cx="32" cy="45" r="6" transform="rotate(14)" />
//       <circle class="pl__ball2" cx="32" cy="48" r="3" transform="rotate(-21)" />
//     </g>
//     <g mask="url(#grad-mask)">
//       <circle class="pl__ring" cx="32" cy="32" r="26" fill="none" stroke="hsl(283,90%,55%)" stroke-width="12" stroke-dasharray="169.65 169.65" stroke-dashoffset="-127.24" stroke-linecap="round" transform="rotate(135)" />
//       <g fill="hsl(283,90%,55%)">
//         <circle class="pl__ball1" cx="32" cy="45" r="6" transform="rotate(14)" />
//         <circle class="pl__ball2" cx="32" cy="48" r="3" transform="rotate(-21)" />
//       </g>
//     </g>
//   </svg></div>
//   )
// }

// export default Loader

import React, { Fragment } from "react";

const Loader = (props) => {
  console.log("preloader", props.isLoading);
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
