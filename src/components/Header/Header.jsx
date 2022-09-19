import React, {useRef, useEffect} from 'react'
import './header.css'
import {Container} from "reactstrap";
import { NavLink, Link } from 'react-router-dom';

const NAV_LINKS = [
    {
        display : 'Home',
        url : '/home'
    },
    {
        display : 'Explore',
        url : '/explore'
    },
    {
        display : 'Create',
        url : '/create'
    },
    {
        display : 'Contact',
        url : '/contact'
    },
    {
        display: "Profile",
        url: "/seller-profile",
      }
]

function Header() {
  return (
    <header className="header w-100">
        <Container>
            <div className="navigation d-flex  align-items-center justify-content-between ">
                <div className="logo">
                    <h2 className="d-flex gap-2 align-items-center">
                        <span>
                        <i class="ri-zcool-fill"></i>
                        </span>
                        HeXmint
                    </h2>
                </div>
                
                <div className="nav_menu ">
                    <ul className="nav_list d-flex align-items-center">
                        {NAV_LINKS.map((item,index) => (
                            <li className='nav_item' key={index}>
                                <NavLink to={item.url} className={ navClass => navClass.isActive  ? 'active' : ''}>{item.display}</NavLink>
                                
                            </li>

                        ))}
                    </ul>
                </div>

                <div className='nav_right d-flex align-items-center gap-5'>
                    <button className='btn d-flex gap-2 align-items-center'>
                        <span>
                            <i class='ri-wallet-line'></i>
                        </span>
                        <Link to="/wallet">Connect Wallet</Link>
                    </button>

                    <span className='mobile_menu'>
                        <i className="ri-menu-line"></i>
                    </span>
                </div>  

            </div>

        
        
        </Container>
    </header>
  )
}

export default Header