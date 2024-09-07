"use client";  // Add this line at the top

import Card from "@/components/Cards";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Map from "@/components/Map/Map";
import Link from 'next/link';

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
      <div className="main-text flex flex-row items-center justify-center bg-secondary h-[76vh] w-screen max:flex-wrap max:h-fit">
        <div className="hero-content text-start mb-1 relative left-20 max:left-0">
          <div className="h-[50vh] p-5 w-[70%] px-4">
            <h1 className="text-6xl text-white font-bold mb-6 500Max:text-5xl 400max:text-4xl 400max:text-center">
              EMPOWERED VOICE
            </h1>
            <p className="py-8 text-white leading-7">
              Empowered Voice is a nonpartisan platform committed to enhancing voter knowledge and participation in North Carolina. Our mission is to provide accurate and accessible voting information to help citizens make informed choices at the polls. Through education, outreach, and advocacy, we aim to empower every voter and strengthen our democracy, ensuring that all voices are heard and represented in the electoral process.
            </p>
          </div>
        </div>
        <img src="/home-images/statue-3.png" alt="hero-image" className="object-contain h-[100%] phoneMax:mt-24 320Max:mt-40" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-2 mt-10 mb-12 ml-24 mobileS:gap-9 place-items-center">
        <Link href="/about" className="w-full">
          <Card 
            title="Protect the freedom to Vote" 
            paragraph="Ensure all Americans have the equal opportunity to exercise their right to vote." 
            image="/home-images/vote.jpg" 
          />
        </Link>
        <Link href="/civics" className="w-full">
          <Card 
            title="Improve elections" 
            paragraph="Inform our voters and help make our elections more free, fair, and equitable." 
            image="/home-images/improve-elections.jpg" 
          />
        </Link>
        <Link href="/candidates" className="w-full">
          <Card 
            title="Find your Candidate" 
            paragraph="Learn about the candidates running for office in your area." 
            image="/home-images/find-your.jpeg" 
          />
        </Link>
        <Link href="/register" className="w-full">
          <Card 
            title="Election registration" 
            paragraph="Register to vote and make your voice heard." 
            image="/home-images/vote-2024.avif" 
          />
        </Link>
      </div>
      <section data-aos='fade-up' className="join-section flex flex-row justify-center items-center py-12 w-screen h-screen max:flex-col">
        <div className="container bg-offwhite h-56 w-2/6 shadow-[-16px_15px_0px_0px_#0368fe;] ml-[10%] md:h-fit phoneMax:h-fit max:w-4/5 max:mb-12">
          <h2 className="text-4xl text-secondary font-bold text-center max:max-w-[75vmin] mt-10">
            Explore Voting Information
          </h2>
          <h2 className="text-4xl text-primary font-bold text-center max:max-w-[75vmin] my-5">
            By State
          </h2>
        </div>
        <Map />
      </section>
    </>
  );
}
