'use client';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const [bottleAnimated, setBottleAnimated] = useState(false);
  const [cowAnimated, setCowAnimated] = useState(false);
  const [cloudsAnimated, setCloudsAnimated] = useState(false);
  const [section1Animated, setSection1Animated] = useState(false);
  const [section2Animated, setSection2Animated] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFlipAnimated, setIsFlipAnimated] = useState(false);
  const [currentBookImage, setCurrentBookImage] = useState(1);
  const [currentFlipImage, setCurrentFlipImage] = useState(1);
  const totalSections = 6;

  const scrollToSection = useCallback((index: number) => {
    const container = document.querySelector('.smooth-scroll');
    if (container) {
      const targetScroll = window.innerWidth * index;
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      setActiveSection(index);
    }
  }, []);

  const handleScroll = useCallback((event: React.WheelEvent) => {
    event.preventDefault();
    
    if (event.deltaY > 0 && activeSection < totalSections - 1) {
      setActiveSection(prev => prev + 1);
    } else if (event.deltaY < 0 && activeSection > 0) {
      setActiveSection(prev => prev - 1);
    }
  }, [activeSection, totalSections]);

  const handleFlip = useCallback(() => {
    console.log('Flip clicked');
    setIsFlipped(prev => !prev);
    // Reset after animation completes
    setTimeout(() => {
      setIsFlipped(false);
    }, 1000);
  }, []);

  const handleFlipClick = useCallback(() => {
    if (currentFlipImage === 1) {
      setIsFlipAnimated(true);
      const audio = new Audio('/audio.mp3');
      audio.play();
      
      // Change to flip2 after animation
      setTimeout(() => {
        setCurrentFlipImage(2);
      }, 300);
      
      // Reset animation state
      setTimeout(() => {
        setIsFlipAnimated(false);
      }, 600);
    }
  }, [currentFlipImage]);

  const handleBookClick = () => {
    setCurrentBookImage((prev) => (prev === 1 ? 2 : 1));
  };

  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const container = e.currentTarget as HTMLElement;
    
    const scrollAmount = e.deltaY * 25;
    const viewportWidth = window.innerWidth;
    const maxScroll = viewportWidth * (totalSections - 1);
    
    // Calculate new scroll position
    let newScroll = container.scrollLeft + scrollAmount;
    
    // Keep scroll within bounds
    newScroll = Math.max(0, Math.min(newScroll, maxScroll));
    container.scrollLeft = newScroll;
    
    // Update active section based on scroll position
    const currentSection = Math.floor((newScroll + viewportWidth / 2) / viewportWidth);
    if (currentSection !== activeSection) {
      setActiveSection(currentSection);
    }
  }, [activeSection, totalSections]);

  useEffect(() => {
    scrollToSection(activeSection);
  }, [activeSection, scrollToSection]);

  useEffect(() => {
    // Trigger bottle animation after a 1 second delay
    const timer = setTimeout(() => {
      setBottleAnimated(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Trigger cow and clouds animation
    const timer = setTimeout(() => {
      setCowAnimated(true);
      setCloudsAnimated(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Trigger section 1 animation when it becomes active
    if (activeSection === 1) {
      setSection1Animated(true);
    }
  }, [activeSection]);

  useEffect(() => {
    // Trigger section 2 animation when it becomes active
    if (activeSection === 2) {
      setSection2Animated(true);
    }
  }, [activeSection]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const container = document.querySelector('.smooth-scroll') as HTMLElement;
      if (!container) return;

      let newScroll = container.scrollLeft;
      const viewportWidth = window.innerWidth;
      
      switch (e.key) {
        case 'ArrowRight':
          newScroll += viewportWidth;
          break;
        case 'ArrowLeft':
          newScroll -= viewportWidth;
          break;
        default:
          return;
      }

      // Keep scroll within bounds
      newScroll = Math.max(0, Math.min(newScroll, viewportWidth * (totalSections - 1)));
      container.scrollLeft = newScroll;
      
      // Update active section
      const currentSection = Math.floor((newScroll + viewportWidth / 2) / viewportWidth);
      setActiveSection(currentSection);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSections]);

  return (
    <main className="relative">
      <div 
        className="flex overflow-x-scroll smooth-scroll h-screen"
        style={{ scrollBehavior: 'smooth' }}
        onWheel={(e: React.WheelEvent<HTMLDivElement>) => handleWheel(e)}
      >
        {/* Logo */}
        <div className={`logo-container transition-opacity duration-500 ${activeSection === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <Link href="/" className="block h-full w-full">
            <Image
              src="/logo.png"
              alt="Logo"
              width={60}
              height={60}
              className="h-full w-full object-contain"
              priority
            />
          </Link>
        </div>

        {/* Main Section */}
      <section className="section-container h-screen w-screen flex-shrink-0 snap-start relative">
        {/* Top Left Cloud */}
        <div className={`absolute top-[12%] left-65 cursor-pointer cloud-left ${cloudsAnimated ? 'animated' : ''}`}>
          <Image
            src="/mini-cloud.webp"
            alt="Cloud"
            width={85}
            height={85}
            style={{ 
              objectFit: 'contain',
              width: 'auto',
              height: 'auto',
              maxHeight: '85px'
            }}
            priority
          />
        </div>

        {/* Top Right Cloud */}
        <div className={`absolute top-[10%] right-20 cursor-pointer cloud-right ${cloudsAnimated ? 'animated' : ''}`}>
          <Image
            src="/cloud.webp"
            alt="Cloud"
            width={180}
            height={200}
            style={{ 
              objectFit: 'contain',
              width: 'auto',
              height: 'auto',
              maxHeight: '200px'
            }}
            priority
          />
        </div>

        <h1 className="wave-text main-title" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: "center",
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 700,
          letterSpacing: "0.802px",
        }}>
          UnReal<br/>Milk
        </h1>

        {/* Bottom Right Image - Cow */}
        <div className={`absolute bottom-0 right-0 cow-container ${cowAnimated ? 'animated' : ''}`}>
          <Image
            src="/cow-img.webp"
            alt="Cow"
            width={350}
            height={350}
            style={{ 
              objectFit: 'contain',
              width: 'auto',
              height: 'auto',
              maxHeight: '500px'
            }}
            priority
          />
        </div>

        {/* Bottom Left Image - Milk Bottle */}
        <div className={`absolute bottom-0 left-[6%] milk-bottle-container ${bottleAnimated ? 'animated' : ''}`}>
          <Image
            src="/milk-bottle.webp"
            alt="Milk Bottle"
            width={500}
            height={500}
            style={{ 
              objectFit: 'contain',
              width: 'auto',
              height: 'auto',
              maxHeight: '550px'
            }}
            priority
          />
        </div>
      </section>

        {/* Section 1 - Centered Bottle */}
        <section className="section-container h-screen w-screen flex-shrink-0 snap-start relative">
          {/* Top Right Cloud */}
          <div className={`section1-cloud-right pr-70 ${section1Animated ? 'animated' : ''}`}>
            <Image
              src="/cloud.webp"
              alt="Cloud"
              width={150}
              height={150}
              style={{ 
                objectFit: 'contain',
                width: 'auto',
                height: 'auto',
              }}
              priority
            />
          </div>

          {/* Sustain Image near right cloud */}
          <div className={`absolute top-[15%] right-[25%] z-[2] sustain-container ${section1Animated ? 'animated' : ''}`}>
            <Image
              src="/sustain.png"
              alt="Sustain"
              width={200}
              height={200}
              style={{ 
                objectFit: 'contain',
                width: 'auto',
                height: 'auto',
              }}
              priority
            />
          </div>

          {/* Animal Image below sustain */}
          <div className={`absolute top-[55%] right-[20%] z-[2] animal-container ${section1Animated ? 'animated' : ''}`}>
            <Image
              src="/animal.png"
              alt="Animal"
              width={200}
              height={200}
              style={{ 
                objectFit: 'contain',
                width: 'auto',
                height: 'auto',
              }}
              priority
            />
          </div>

          {/* Adult Image beside sustain */}
          <div className={`absolute top-[25%] right-[0%] z-[2] adult-container ${section1Animated ? 'animated' : ''}`}>
            <Image
              src="/adult.png"
              alt="Adult"
              width={200}
              height={200}
              style={{ 
                objectFit: 'contain',
                width: 'auto',
                height: 'auto',
              }}
              priority
            />
          </div>

          {/* Products Image above left cloud */}
          <div className={`absolute top-[6%] left-[15%] z-[2] products-container ${section1Animated ? 'animated' : ''}`}>
            <Image
              src="/products.png"
              alt="Products"
              width={200}
              height={200}
              style={{ 
                objectFit: 'contain',
                width: 'auto',
                height: 'auto',
              }}
              priority
            />
          </div>

          {/* Dairy Image below products */}
          <div className={`absolute top-[54%] left-[4%] z-[2] dairy-container ${section1Animated ? 'animated' : ''}`}>
            <Image
              src="/dairy.png"
              alt="Dairy"
              width={200}
              height={200}
              style={{ 
                objectFit: 'contain',
                width: 'auto',
                height: 'auto',
              }}
              priority
            />
          </div>

          {/* High Image beside dairy */}
          <div className={`absolute top-[60%] left-[20%] z-[2] high-container ${section1Animated ? 'animated' : ''}`}>
            <Image
              src="/high.png"
              alt="High"
              width={200}
              height={200}
              style={{ 
                objectFit: 'contain',
                width: 'auto',
                height: 'auto',
              }}
              priority
            />
          </div>

          {/* Middle Left Cloud */}
          <div className={`section1-cloud-left absolute top-[10%] left-[10%] ${section1Animated ? 'animated' : ''}`}>
            <Image
              src="/mini-cloud.webp"
              alt="Cloud"
              width={75}
              height={75}
              style={{ 
                objectFit: 'contain',
                width: 'auto',
                height: 'auto',
              }}
              priority
            />
          </div>

          {/* Bottom Right Food Image */}
          <div className={`absolute top-[60%] right-0 z-[2] food-container ${section1Animated ? 'animated' : ''}`}>
            <Image
              src="/food.png"
              alt="Food"
              width={300}
              height={300}
              style={{ 
                objectFit: 'contain',
                width: 'auto',
                height: 'auto',
              }}
              priority
            />
          </div>

          {/* Navigation Line - Only in Section 1 */}
          <div className="absolute bottom-[57px] left-1/2 transform -translate-x-1/2 w-[1728px]">
            <Image
              src="/nav-line.svg"
              alt="Navigation Line"
              width={1728}
              height={6}
              style={{ 
                objectFit: 'contain',
                width: '100%',
                height: 'auto',
              }}
              priority
            />
          </div>

          <div className="section1-container">
            <div className={`section1-bottle ${section1Animated ? 'animated' : ''}`}>
              <Image
                src="/bottle-slide.webp"
                alt="Centered Milk Bottle"
                width={600}
                height={600}
                style={{ 
                  objectFit: 'contain',
                  width: 'auto',
                  height: 'auto',
                  maxHeight: '600px'
                }}
                priority
              />
            </div>
          </div>
        </section>

        {/* Section 2 - Split Images */}
        <section className="section-container h-screen w-screen flex-shrink-0 snap-start relative">
          {/* Left Cloud */}
          <div className={`absolute top-[40%] left-[5%] ${section2Animated ? 'animated' : ''}`}>
            <Image
              src="/mini-cloud.webp"
              alt="Left Cloud"
              width={85}
              height={85}
              style={{ 
                objectFit: 'contain',
                width: 'auto',
                height: 'auto',
                maxHeight: '85px'
              }}
              priority
            />
          </div>

          {/* Right Cloud */}
          <div className={`absolute top-[34%] right-[2%] ${section2Animated ? 'animated' : ''}`}>
            <Image
              src="/mini-cloud.webp"
              alt="Right Cloud"
              width={100}
              height={100}
              style={{ 
                objectFit: 'contain',
                width: 'auto',
                height: 'auto',
                maxHeight: '150px'
              }}
              priority
            />
          </div>

          <div className="flex h-full w-full items-center justify-between">
            {/* Left Image Container */}
            <div className={`flex-1 h-full flex items-center justify-center section2-left relative ${section2Animated ? 'animated' : ''}`}>
              {/* Text 2 Image */}
              <div className="absolute bottom-[68%] z-10">
                <Image
                  src="/txt2.png"
                  alt="Text 2"
                  width={300}
                  height={100}
                  style={{ 
                    objectFit: 'contain',
                    width: '200px',
                    height: '200px',
                    transform: 'rotate(-2deg)',
                  }}
                  priority
                />
              </div>
              {/* Main Left Image */}
              <div className="absolute bottom-[15%] left-[20%] z-10">
                <Image
                  src="/img1.jpg"
                  alt="Left Section Image"
                  width={600}
                  height={600}
                  style={{ 
                    objectFit: 'contain',
                    width: '500px',
                    height: '500px',
                    transform: 'rotate(-4deg)',
                  }}
                  priority
                />
              </div>
            </div>

            {/* Arrow between images */}
            <div className="absolute top-[13%] left-1/2 transform -translate-x-1/2 z-10 arrow-container">
              <Image
                src="/arrow.png"
                alt="Arrow"
                width={150}
                height={150}
                style={{ 
                  objectFit: 'contain',
                  width: 'auto',
                  height: 'auto',
                }}
                priority
              />
            </div>

            {/* Right Image Container */}
            <div className={`flex-1 h-full flex items-center justify-center section2-right relative ${section2Animated ? 'animated' : ''}`}>
              {/* Text 1 Image */}
              <div className="absolute bottom-[68%] z-10">
                <Image
                  src="/txt1.png"
                  alt="Text 1"
                  width={300}
                  height={100}
                  style={{ 
                    objectFit: 'contain',
                    width: '200px',
                    height: '200px',
                    transform: 'rotate(2deg)',
                  }}
                  priority
                />
              </div>
              {/* Main Right Image */}
              <div className="absolute bottom-[15%] right-[20%] z-10">
                <Image
                  src="/img2.jpg"
                  alt="Right Section Image"
                  width={500}
                  height={500}
                  style={{ 
                    objectFit: 'contain',
                    width: '500px',
                    height: '500px',
                    transform: 'rotate(6deg)',
                  }}
                  priority
                />
              </div>
            </div>

            {/* Bottom Navigation Line */}
            <div className="absolute bottom-[63px] left-1/2 transform -translate-x-1/2 w-[1728px]">
              <Image
                src="/nav-line.svg"
                alt="Navigation Line"
                width={1728}
                height={6}
                style={{ 
                  objectFit: 'contain',
                  width: '100%',
                  height: 'auto',
                }}
                priority
              />
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="section-container h-screen w-screen flex-shrink-0 snap-start relative">
          <div className="flex h-full w-full items-center justify-center">
            {/* Tube Image */}
            <div className="absolute top-[-10%] left-1/2 transform -translate-x-1/2">
              <Image
                src="/tube.png"
                alt="Tube"
                width={400}
                height={400}
                style={{ 
                  objectFit: 'contain',
                  width: 'auto',
                  height: 'auto',
                }}
                priority
              />
            </div>

            {/* Left Cloud */}
            <div className={`section1-cloud-left absolute top-[10%] left-[10%] ${section1Animated ? 'animated' : ''}`}>
              <Image
                src="/mini-cloud.webp"
                alt="Left Cloud"
                width={75}
                height={75}
                style={{ 
                  objectFit: 'contain',
                  width: 'auto',
                  height: 'auto',
                }}
                priority
              />
            </div>

            {/* Right Cloud */}
            <div className={`section1-cloud-right pr-70 ${section1Animated ? 'animated' : ''}`}>
              <Image
                src="/cloud.webp"
                alt="Right Cloud"
                width={150}
                height={150}
                style={{ 
                  objectFit: 'contain',
                  width: 'auto',
                  height: 'auto',
                }}
                priority
              />
            </div>

            {/* P1 Image over right cloud */}
            <div className="absolute right-[13%] top-[6%] z-20">
              <div className="border-[8px] border-solid border-white overflow-hidden" style={{ transform: 'rotate(6deg)' }}>
                <Image
                  src="/p1.jpg"
                  alt="P1"
                  width={200}
                  height={200}
                  style={{ 
                    objectFit: 'cover',
                    width: '190px',
                    height: '150px',
                  }}
                  priority
                />
              </div>
            </div>
            
            {/* Labs Image near DNA */}
            <div className="absolute top-[20%] left-[9%] z-[2]">
              <div className="border-[8px] border-solid border-white overflow-hidden" style={{ transform: 'rotate(-8deg)' }}>
                <Image
                  src="/labs.jpg"
                  alt="Labs"
                  width={200}
                  height={200}
                  style={{ 
                    objectFit: 'cover',
                    width: '200px',
                    height: '150px'
                  }}
                  priority
                />
              </div>
            </div>

            {/* DNA Image */}
            <div className="absolute top-[-60px] left-[-60px]">
              <Image
                src="/dna.png"
                alt="DNA"
                width={400}
                height={400}
                style={{ 
                  objectFit: 'contain',
                  width: '450px',
                  height: '450px',
                }}
                priority
              />
            </div>
            
            {/* Testes Image above Jar */}
            <div className="absolute bottom-[25%] left-[12%] z-[2]">
              <div className="border-[8px] border-solid border-white overflow-hidden" style={{ transform: 'rotate(4deg)' }}>
                <Image
                  src="/testes.jpg"
                  alt="Testes"
                  width={200}
                  height={200}
                  style={{ 
                    objectFit: 'cover',
                    width: '210px',
                    height: '150px',
                  }}
                  priority
                />
              </div>
            </div>

            {/* Jar Image */}
            <div className="absolute top-[55%] left-[-5%] z-10">
              <Image
                src="/jar.png"
                alt="Jar"
                width={450}
                height={450}
                style={{ 
                  objectFit: 'contain',
                  width: 'auto',
                  height: 'auto',
                }}
                priority
              />
            </div>

            {/* Flip1 Image */}
            <div 
              className="absolute top-[30%] right-[24%] z-[2]"
              onClick={handleFlipClick}
              style={{ cursor: 'pointer' }}
            >
              <div 
                className="overflow-hidden" 
                style={{ 
                  transform: `rotate(-6deg)`,
                  transformStyle: 'preserve-3d',
                  transition: 'all 0.6s ease-in-out',
                }}
              >
                <Image
                  src={`/flip${currentFlipImage}.webp`}
                  alt="Flip"
                  width={200}
                  height={200}
                  style={{ 
                    objectFit: 'cover',
                    width: '100px',
                    height: '100px',
                    transform: isFlipAnimated ? 'rotateY(180deg)' : 'rotateY(0)',
                    transition: 'transform 0.6s ease-in-out',
                  }}
                  priority
                />
              </div>
            </div>

            {/* Book1 Image */}
            <div className="absolute top-[25%] right-[0%] z-10">
              <div 
                className="book-hover"
                onClick={handleBookClick}
              >
                <Image
                  src={`/book${currentBookImage}.png`}
                  alt={`Book Image ${currentBookImage}`}
                  width={650}
                  height={650}
                  className="w-auto h-auto"
                  style={{ 
                    objectFit: 'contain',
                    width: '650px',
                    height: '650px',
                  }}
                  priority
                />
              </div>
            </div>

            {/* Textual Image */}
            <div className="absolute top-[55%] right-[43%] z-[3]">
              <div className="overflow-hidden" style={{ transform: 'rotate(-4deg)' }}>
                <Image
                  src="/textual.png"
                  alt="Textual"
                  width={200}
                  height={200}
                  style={{ 
                    objectFit: 'cover',
                    width: '100px',
                    height: '250px',
                  }}
                  priority
                />
              </div>
            </div>

            {/* Bottom Line for Section 3 */}
            <div className="absolute bottom-[69] left-1/2 transform -translate-x-1/2 w-[1728px]">
              <Image
                src="/nav-line.svg"
                alt="Section 3 Line"
                width={1028}
                height={6}
                style={{ 
                  objectFit: 'contain',
                  width: '100%',
                  height: 'auto',
                }}
                priority
              />
            </div>
          </div>
        </section>

        {/* Additional Sections */}
        {[...Array(2)].map((_, index) => (
          <section 
            key={index + 4} 
            className="section-container h-screen w-screen flex-shrink-0 snap-start flex items-center justify-center relative"
          >
            {index === 0 && (
              <>
                {/* Left Cloud */}
                <div className={`section4-cloud-left absolute top-[20%] left-[5%] ${section1Animated ? 'animated' : ''}`}>
                  <Image
                    src="/mini-cloud.webp"
                    alt="Left Cloud"
                    width={66}
                    height={66}
                    style={{ 
                      objectFit: 'contain',
                      width: 'auto',
                      height: 'auto',
                    }}
                    priority
                  />
                </div>

                {/* Right Cloud */}
                <div className={`section1-cloud-right pr-70 ${section1Animated ? 'animated' : ''}`}>
                  <Image
                    src="/cloud.webp"
                    alt="Right Cloud"
                    width={150}
                    height={150}
                    style={{ 
                      objectFit: 'contain',
                      width: 'auto',
                      height: 'auto',
                    }}
                    priority
                  />
                </div>

                {/* Person 1 - Bottom Left */}
                <div className="absolute bottom-[15%] left-[0%] z-10">
                  <Image
                    src="/person3.png"
                    alt="Person 1"
                    width={180}
                    height={180}
                    style={{ 
                      objectFit: 'contain',
                      width: '350px',
                      height: '350px',
                    }}
                    priority
                  />
                </div>

                {/* Person 2 - Top Center */}
                <div className="absolute bottom-[45%] left-[25%] transform -translate-x-1/2 z-10">
                  <Image
                    src="/person2.webp"
                    alt="Person 2"
                    width={200}
                    height={200}
                    style={{ 
                      objectFit: 'contain',
                      width: '380px',
                      height: '380px',
                    }}
                    priority
                  />
                </div>

                {/* Person 3 - Bottom Right */}
                <div className="absolute bottom-[15%] left-[25%] z-10">
                  <Image
                    src="/person1.png"
                    alt="Person 3"
                    width={180}
                    height={180}
                    style={{ 
                      objectFit: 'contain',
                      width: '350px',
                      height: '350px',
                    }}
                    priority
                  />
                </div>

                {/* We Image - Center Right */}
                <div className="absolute bottom-[25%] right-[10%] transform -translate-y-1/2 z-10">
                  <Image
                    src="/we.png"
                    alt="We"
                    width={400}
                    height={400}
                    style={{ 
                      objectFit: 'contain',
                      width: '250px',
                      height: '250px',
                    }}
                    priority
                  />
                </div>
              </>
            )}

            {(index === 0 || index === 1) && (
              <>
                <div className={`absolute top-1/2 ${index === 0 ? 'left-[90%]' : 'right-[90%]'} transform -translate-y-1/2 ${index === 1 ? '-translate-x-1/2' : ''}`}>
                  <Image
                    src="/png.png"
                    alt="PNG Image"
                    width={400}
                    height={400}
                    style={{ 
                      objectFit: 'contain',
                      width: index === 0 ? '250px' : '150px',
                      height: index === 0 ? '250px' : '150px',
                    }}
                    priority
                  />
                </div>
                {index === 0 && (
                  <div className="absolute bottom-32 right-8 max-w-[600px] text-white text-lg font-light leading-relaxed">
                    Three friends, bonded over 22 years and hailing from Stanford, Rice, and IIT Delhi, teamed up with advisors from MIT and Harvard. In 2022, we did the unthinkable—creating real cow milk in a lab! Now, we're moo-ving towards a more sustainable future, one glass at a time.
                  </div>
                )}
                {index === 1 && (
                  <>
                    <div className="absolute top-[47%] left-[5%] transform -translate-y-1/2 z-10s">
                      <Image
                        src="/together.webp"
                        alt="Together Image"
                        width={400}
                        height={400}
                        style={{ 
                          objectFit: 'contain',
                          width: '250px',
                          height: '250px',
                        }}
                        priority
                      />
                    </div>
                    {/* Handy Image - Bottom Right */}
                    <div className="absolute bottom-0 right-0 z-10">
                      <Image
                        src="/handy.png"
                        alt="Handy"
                        width={400}
                        height={400}
                        style={{ 
                          objectFit: 'contain',
                          width: 'auto',
                          height: 'auto',
                          maxHeight: '600px'
                        }}
                        priority
                      />
                    </div>
                    {/* Inpress Image - Bottom Right beside Handy */}
                    <div className="absolute bottom-[30%] right-[30%] z-10">
                      <Image
                        src="/inpress.webp"
                        alt="Inpress"
                        width={400}
                        height={400}
                        style={{ 
                          objectFit: 'contain',
                          width: '120px',
                          height: '120px',
                        }}
                        priority
                      />
                    </div>
                    {/* Tcrunch Image - Under Inpress */}
                    <div className="absolute bottom-[17%] right-[27%] z-10">
                      <Image
                        src="/tcrunch.webp"
                        alt="Tcrunch"
                        width={400}
                        height={400}
                        style={{ 
                          objectFit: 'contain',
                          width: '200px',
                          height: '200px',
                        }}
                        priority
                      />
                    </div>
                    {/* FST Image - Under Tcrunch */}
                    <div className="absolute bottom-[8%] right-[35%] z-10">
                      <Image
                        src="/fst.webp"
                        alt="FST"
                        width={400}
                        height={400}
                        style={{ 
                          objectFit: 'contain',
                          width: '200px',
                          height: '200px',
                        }}
                        priority
                      />
                    </div>
                    {/* Enter Image - Beside FST */}
                    <div className="absolute bottom-[8%] right-[20%] z-10">
                      <Image
                        src="/enter.webp"
                        alt="Enter"
                        width={400}
                        height={400}
                        style={{ 
                          objectFit: 'contain',
                          width: '200px',
                          height: '200px',
                        }}
                        priority
                      />
                    </div>
                    {/* Cloud 3 Image - Top Right */}
                    <div className={`absolute top-[20%] right-[3%] z-10 cloud-right ${section1Animated ? 'animated' : ''}`}>
                      <Image
                        src="/cloud-3.png"
                        alt="Cloud 3"
                        width={200}
                        height={200}
                        style={{ 
                          objectFit: 'contain',
                          width: 'auto',
                          height: 'auto',
                          maxHeight: '200px'
                        }}
                        priority
                      />
                    </div>
                    {/* Cloud 3 Image - Top Left */}
                    <div className={`absolute top-[20%] left-[8%] z-10 cloud-left ${section1Animated ? 'animated' : ''}`}>
                      <Image
                        src="/cloud-3.png"
                        alt="Cloud 3"
                        width={300}
                        height={300}
                        style={{ 
                          objectFit: 'contain',
                          width: 'auto',
                          height: 'auto',
                          maxHeight: '400px'
                        }}
                        priority
                      />
                    </div>
                  </>
                )}
              </>
            )}
            {index === 1 && (
              <>
                <div className={`absolute top-[10%] left-[10%] z-10 cloud-left ${section1Animated ? 'animated' : ''}`}>
                  <Image
                    src="/comb.webp"
                    alt="Comb"
                    width={250}
                    height={250}
                    style={{ 
                      objectFit: 'contain',
                      width: 'auto',
                      height: 'auto',
                      maxHeight: '250px'
                    }}
                    priority
                  />
                </div>
                <div className={`absolute bottom-[28%] left-[25%] z-[2] cloud-left ${section1Animated ? 'animated' : ''}`}>
                  <Image
                    src="/creative.webp"
                    alt="Creative"
                    width={250}
                    height={250}
                    style={{ 
                      objectFit: 'contain',
                      width: 'auto',
                      height: 'auto',
                      maxHeight: '220px'
                    }}
                    priority
                  />
                </div>
                <div className={`absolute bottom-[40%] left-[40%] z-10 cloud-right ${section1Animated ? 'animated' : ''}`}>
                  <Image
                    src="/agro.webp"
                    alt="Agro"
                    width={250}
                    height={250}
                    style={{ 
                      objectFit: 'contain',
                      width: 'auto',
                      height: 'auto',
                      maxHeight: '250px'
                    }}
                    priority
                  />
                </div>
                <div className={`absolute top-[10%] left-[30%] z-10 cloud-right ${section1Animated ? 'animated' : ''}`}>
                  <Image
                    src="/fund.webp"
                    alt="Fund"
                    width={250}
                    height={250}
                    style={{ 
                      objectFit: 'contain',
                      width: 'auto',
                      height: 'auto',
                      maxHeight: '200px'
                    }}
                    priority
                  />
                </div>
                <div className={`absolute top-[7%] left-[50%] z-10 cloud-left ${section1Animated ? 'animated' : ''}`}>
                  <Image
                    src="/amino.webp"
                    alt="Amino"
                    width={250}
                    height={250}
                    style={{ 
                      objectFit: 'contain',
                      width: 'auto',
                      height: 'auto',
                      maxHeight: '180px'
                    }}
                    priority
                  />
                </div>
                <div className={`absolute bottom-[20%] left-[10%] z-10 cloud-right ${section1Animated ? 'animated' : ''}`}>
                  <Image
                    src="/sri.webp"
                    alt="Sri"
                    width={250}
                    height={250}
                    style={{ 
                      objectFit: 'contain',
                      width: 'auto',
                      height: 'auto',
                      maxHeight: '180px'
                    }}
                    priority
                  />
                </div>
              </>
            )}
            {/* Navigation Line for each section except home */}
            <div className="absolute bottom-[8.6%] left-1/2 transform -translate-x-1/2 w-[1728px]">
              <Image
                src="/nav-line.svg"
                alt="Navigation Line"
                width={1728}
                height={6}
                style={{ 
                  objectFit: 'contain',
                  width: '100%',
                  height: 'auto',
                }}
                priority
              />
            </div>
          </section>
        ))}
        
        {/* Navigation Points */}
        <div className="nav-points">
          {Array.from({ length: totalSections }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveSection(index);
                const container = document.querySelector('.smooth-scroll');
                if (container) {
                  container.scrollTo({
                    left: window.innerWidth * index,
                    behavior: 'smooth'
                  });
                }
              }}
              className={`nav-point ${activeSection === index ? 'active' : ''}`}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
