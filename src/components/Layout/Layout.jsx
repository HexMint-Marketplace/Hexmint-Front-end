import React from "react";
import Routers from "../../routes/Routers";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout() {
  return (
    <div>
      <Header />
      <div>
        <Routers />
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
