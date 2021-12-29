import React from 'react'
import '../index.css';

// Another boring component
export default () =>{
    return(
    <nav className="Navbar flex w-full h-nav justify-between items-center p-5">
    <div className="logo text-xl font-medium ">TickerCheck</div>
    <div className="navItems flex">
      <div className="name">Made by Riley C</div>
    </div>
  </nav>
    );
}