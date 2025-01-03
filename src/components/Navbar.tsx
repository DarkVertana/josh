'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    // Delay navbar appearance until after home animations
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 6000); // After home animations (5s) + 1s extra

    return () => clearTimeout(timer);
  }, []);

  const navItems = ['Why?', 'How?', 'Team', 'Partners', 'Contact'];

  // Calculate dynamic dimensions based on viewport
  const modalHeight = windowHeight * 0.9; // 90% of viewport height
  const modalWidth = windowWidth * 0.3; // 30% of viewport width
  const paddingY = `${windowHeight * 0.04}px`; // 4% of viewport height
  const paddingX = `${windowHeight * 0.02}px`; // 2% of viewport height
  const fontSize = `${windowHeight * 0.07}px`; // 7% of viewport height

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 600); // Match the transition duration
  };

  return (
    <>
      <nav className={`fixed top-0 right-0 w-full p-4 z-50 bg-transparent ${isVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex-1"></div>
          <div className="w-[60px] h-[60px] relative nav-bottle cursor-pointer" onClick={() => setIsOpen(true)}>
            <Image
              src="/bottle-nav.webp"
              alt="Logo"
              fill
              style={{ objectFit: 'contain', transformOrigin: 'center' }}
              priority
            />
          </div>
        </div>
      </nav>

      {/* Modal Navigation */}
      <div className={`fixed inset-0 z-50 ${isOpen ? 'visible' : 'invisible'}`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${
            isOpen && !isClosing ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleClose}
        />
        
        {/* Modal Content */}
        <div 
          className={`absolute top-1/2 right-8 -translate-y-1/2 transform transition-transform duration-600 ease-out ${
            isOpen && !isClosing ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            height: `${modalHeight}px`,
            width: `${modalWidth}px`,
            display: "inline-flex",
            padding: `${paddingY} ${paddingX}`,
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            borderRadius: "30px",
            border: "3px solid rgba(255, 255, 255, 0.8)",
            background: "#000",
            minWidth: '300px', // Minimum width to ensure readability
          }}
        >
          <div className="relative h-full flex flex-col justify-between w-full">
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-white text-3xl hover:opacity-70 transition-opacity"
            >
              ×
            </button>

            {/* Navigation Items */}
            <div className="flex flex-col justify-center h-full space-y-[2vh]">
              {navItems.map((item, index) => (
                <Link 
                  key={index} 
                  href="#" 
                  className={`nav-link font-bold font-inter text-white hover:text-yellow-300 transition-all transform ${
                    isOpen && !isClosing ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                  }`}
                  style={{
                    alignSelf: "stretch",
                    lineHeight: "0.9",
                    fontSize: fontSize,
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Contact Information and Social Links */}
            <div className="mt-[8vh] text-white/80 space-y-4">
              {/* Address */}
              <div className="text-sm">
                <h4 className="text-yellow-300 mb-1">Address</h4>
                <p>98488 Prosacco Motorway,</p>
                <p>Jalisaburgh, AL 85893-5355</p>
              </div>

              {/* Contact */}
              <div className="text-sm">
                <h4 className="text-yellow-300 mb-1">Enquires</h4>
                <a href="mailto:hello@unrealmilk.com" className="hover:text-yellow-300 transition-colors">
                  hello@unrealmilk.com
                </a>
                <p className="mt-1">
                  <a href="tel:+919449449449" className="hover:text-yellow-300 transition-colors">
                    +91 94494 49449
                  </a>
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                  <Image src="/youtube.svg" alt="YouTube" width={20} height={20} />
                </a>
                <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                  <Image src="/instagram.svg" alt="Instagram" width={20} height={20} />
                </a>
                <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                  <Image src="/email.svg" alt="Email" width={20} height={20} />
                </a>
              </div>

              {/* Copyright */}
              <div className="text-xs text-white/50">
                2021 Brown Foods Inc. All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
