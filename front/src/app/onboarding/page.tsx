"use client";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Button from "@/components/button";
import OnboardingForm from "@/app/onboarding/OnboardingForm";
import { useMutation } from "@apollo/client";
import LOGIN from "@/lib/mutations/login.mutation";
import toast from "react-hot-toast";
import UPDATE_PROFILE from "@/lib/mutations/update-profile.mutation";

const App = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("/test2.jpg");
  const [imageAnimation, setImageAnim] = useState(false)

  const onNext = () => {
    const img = new Image();
    img.src = "/mountains2.webp";
    setImageAnim(true)
    img.onload = () => {

      setTimeout(() =>  {
        setBackgroundImage("/mountains2.webp");
        setShowWelcome(false);
        setImageAnim(false)
      }, 200);
    };
  };

  useEffect(() => {
    setShowWelcome(true);
  }, []);

  const onSkip = () => {


  }

  const onDataSubmit = () => {

  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className={`absolute inset-0 h-full w-full bg-cover bg-center transition-opacity duration-500 ${
          imageAnimation ? "opacity-0" : "opacity-100"
        }`}
        style={{backgroundImage: `url(${backgroundImage})`}}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-b from-pine-green-500 via-pine-green-600 to-pine-green-700 opacity-60"></div>

      {showWelcome && (
        <div className="relative text-center text-white welcome-screen opacity-0">
          <Typography variant="h4" mb={2}>
            Welcome to Rebirth Talk
          </Typography>
          <div className="text-gray-200 text-sm font-light">
            Let’s personalize your experience.
          </div>
          <div className="relative mt-12 flex flex-col gap-4 items-center">
            <Button
              title="Get Started"
              onClick={onNext}
              className="bg-white w-full text-pine-green-900 hover:bg-white hover:opacity-90 hover:cursor-pointer"
            />
            <Button
              title="Skip"
              onClick={onSkip}
              className="bg-transparent w-full text-white hover:bg-transparent hover:opacity-70 hover:cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Onboarding Form */}
      {!showWelcome && (
        <div className="relative w-full slide-in">
          <OnboardingForm  />
        </div>
      )}
    </div>
  );
};

export default App;
