"use client";
import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import Button from "@/components/button";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { LoaderIcon } from "react-hot-toast";
import OnboardingForm from "@/app/onboarding/OnboardingForm";


const App = () => {
    const [showWelcome, setShowWelcome] = useState(true);
    const [backgroundImage, setBackgroundImage] = useState("/test2.jpg");

    useEffect(() => {
        // Set initial fade-in effects for welcome screen
    }, []);

    const onNext = () => {
      const img = new Image();
      img.src = "/mountains2.webp";
      img.onload = () => {
        setBackgroundImage("/mountains2.webp");
        setShowWelcome(false);
      };
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <AnimatePresence>
                <motion.div
                    key={backgroundImage}
                    className="absolute inset-0 h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-b from-pine-green-500 via-pine-green-600 to-pine-green-700 opacity-60"></div>

            {/* Animations */}
            <AnimatePresence>
                {showWelcome && (
                    <motion.div
                        className="relative text-center text-white"
                        initial={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <Typography variant="h4" mb={2}>
                                Welcome to Rebirth Talk
                            </Typography>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.8 }}
                            transition={{ delay: 0.5, duration: 1 }}
                        >
                            <div className="text-gray-200  text-sm font-light">
                                Let’s personalize your experience.
                            </div>
                        </motion.div>
                        <motion.div
                            className="relative mt-12 flex flex-col gap-4 items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.8, duration: 1 }}
                        >
                            <Button
                                title="Get Started"
                                onClick={onNext}
                                className="bg-white w-full text-pine-green-900 hover:bg-white hover:opacity-90 hover:cursor-pointer"
                            />
                            <Button
                                title="Skip"
                                onClick={onNext}
                                className="bg-transparent w-full text-white hover:bg-transparent hover:opacity-70 hover:cursor-pointer"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {!showWelcome && (
                    <motion.div
                        className="relative w-full"
                        initial={{ translateX: "100%" }}
                        animate={{ translateX: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <OnboardingForm />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default App;
