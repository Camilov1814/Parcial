import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/20/solid';
import { useSelector,useDispatch } from 'react-redux';
import { toggleStatusTab } from '../stores/cart';


const NavbarComp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const carts = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();
  useEffect(() => {
    let total = 0;
    carts.forEach((item: any) => {
      total += item.quantity;
    });
    setTotalQuantity(total);
  }
  , [carts]);

  const handleOpenTabCart = () => {
    dispatch(toggleStatusTab());
  };
  return (
    <nav className="bg-primary w-full  font-sans z-40 h-16">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-white text-lg font-title">
              <Link to="/">CCEnterprise</Link>
            </div>
            <div className="hidden md:block ml-10">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/home" className="font-title text-background-main hover:bg-secondary hover:text-background-main px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                <Link to="/models" className="font-title text-background-main hover:bg-secondary hover:text-background-main px-3 py-2 rounded-md text-sm font-medium">Models</Link>
                <Link to="/makeup" className="font-title text-background-main hover:bg-secondary hover:text-background-main px-3 py-2 rounded-md text-sm font-medium">Makeup</Link>
                <Link to="/fashion-events" className="font-title text-background-main hover:bg-secondary hover:text-background-main px-3 py-2 rounded-md text-sm font-medium">Fashion Events</Link>
                <Link to="/photos" className="font-title text-background-main hover:bg-secondary hover:text-background-main px-3 py-2 rounded-md text-sm font-medium">Photos</Link>
                <Link to="/membership" className="font-title text-background-main hover:bg-secondary hover:text-background-main px-3 py-2 rounded-md text-sm font-medium">Membership</Link>
                <Link to="/contact-us" className="font-title text-background-main hover:bg-secondary hover:text-background-main px-3 py-2 rounded-md text-sm font-medium">Contact Us</Link>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center relative">
                  <ShoppingCartIcon className="w-6 text-complement2" onClick={handleOpenTabCart} />
                  <span className='absolute top-2/3 right-1/2 bg-complement3 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center '>{totalQuantity}</span>

                </div>
              </div>
            </div>
          </div>
          <div className="mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-secondary inline-flex items-center justify-center p-2 rounded-md text-background-main hover:text-background-main hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-background-main"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/home" className="font-title text-background-main hover:bg-secondary hover:text-background-main block w-full text-left px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/models" className="font-title text-background-main hover:bg-secondary hover:text-background-main block w-full text-left px-3 py-2 rounded-md text-base font-medium">Models</Link>
            <Link to="/makeup" className="font-title text-background-main hover:bg-secondary hover:text-background-main block w-full text-left px-3 py-2 rounded-md text-base font-medium">Makeup</Link>
            <Link to="/fashion-events" className="font-title text-background-main hover:bg-secondary hover:text-background-main block w-full text-left px-3 py-2 rounded-md text-base font-medium">Fashion Events</Link>
            <Link to="/photos" className="font-title text-background-main hover:bg-secondary hover:text-background-main block w-full text-left px-3 py-2 rounded-md text-base font-medium">Photos</Link>
            <Link to="/membership" className="font-title text-background-main hover:bg-secondary hover:text-background-main block w-full text-left px-3 py-2 rounded-md text-base font-medium">Membership</Link>
            <Link to="/contact-us" className="font-title text-background-main hover:bg-secondary hover:text-background-main block w-full text-left px-3 py-2 rounded-md text-base font-medium">Contact Us</Link>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center relative">
                  <ShoppingCartIcon className="w-6 text-complement2" onClick={handleOpenTabCart} />
                  <span className='absolute top-2/3 right-1/2 bg-complement3 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center '>{totalQuantity}</span>

                </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarComp;
