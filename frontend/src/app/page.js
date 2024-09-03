"use client";  // Add this line at the top

import Card from "@/components/Cards";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      offset: 100,    // Offset (in pixels) from the original trigger point
      once: true,     // Whether animation should happen only once - while scrolling down
    });
  }, []);

  return (
    <>
      <div className="main-text flex flex-col items-center justify-center bg-hero bg-cover bg-center z-10">
        <div className="hero-content text-center mb-12">
          <div className="max-w-100vw px-4">
            <h1 className="text-6xl text-white font-bold mb-6">
              Empowering Voices
            </h1>
            <p className="py-8 text-white">
              Empowering Voices is a nonpartisan platform committed to enhancing voter knowledge and participation in North Carolina. Our mission is to provide accurate and accessible voting information to help citizens make informed choices at the polls. Through education, outreach, and advocacy, we aim to empower every voter and strengthen our democracy, ensuring that all voices are heard and represented in the electoral process.
            </p>
            <button className="btn text-white border-none bg-primary hover:bg-secondary hover:text-white">
              Get Started
            </button>
          </div>
        </div>
      </div>
      <div data-aos="fade-zoom-in" data-aos-easing="ease-in-back" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-2 mt-10 mb-12 mobileS:gap-9">
        <Card 
          title="Protect the freedom to Vote" 
          paragraph="Ensure all Americans have the equal opportunity to exercise their right to vote." 
          image="why-matters.jpg" 
        />
        <Card 
          title="Improve elections" 
          paragraph="Inform our voters and help make our elections more free, fair, and equitable." 
          image="improve-elections.webp" 
        />
        <Card 
          title="Find your Candidate" 
          paragraph="This is a description for card 3." 
          image="find-your.jpeg" 
        />
        <Card 
          title="Election registration" 
          paragraph="This is a description for card 4." 
          image="election-registration.jpg" 
        />
      </div>
      <section data-aos="fade-up" className="join-section flex flex-row justify-center items-center flex-wrap py-12 w-screen h-screen max:flex-col">
        <div className="container bg-offwhite h-56 w-2/6 shadow-[-16px_15px_0px_0px_#0368fe;] mr-9 md:h-fit phoneMax:h-fit max:w-4/5">
          <h2 className="text-4xl font-bold text-center max:max-w-[75vmin] my-10">
            Become a part of the movement to empower voters and strengthen democracy in North Carolina.
          </h2>
        </div>
        <button className="btn text-xl text-white border-none bg-primary max:mt-20 max:w-40 max:text-2xl hover:bg-secondary hover:text-white">
          Join Us
        </button>
      </section>
    </>
  );
}
