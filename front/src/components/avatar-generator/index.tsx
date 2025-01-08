import React, { useState } from 'react';
import Avatar from 'boring-avatars';
import Button from "@/components/button";

const palettes = [
  { name: "Pine Sunset", colors: ["#03c9a9", "#ff7d10", "#ffb238", "#ff5500", "#effefa"] },
  { name: "Tropical Vibes", colors: ["#03c9a9", "#ff8800", "#ffcc00", "#ffd580", "#047869"] },
  { name: "Burning Leaves", colors: ["#d97706", "#b45309", "#92400e", "#78350f", "#effefa"] },
  { name: "Citrus Punch", colors: ["#ffb238", "#ff8800", "#ff5500", "#ffd166", "#effefa"] },
  { name: "Golden Hour", colors: ["#ffadad", "#ffd6a5", "#f4a261", "#e76f51", "#effefa"] },
  { name: "Autumn Glow", colors: ["#09665b", "#047869", "#ff7d10", "#ffb238", "#effefa"] },
  { name: "Contrast Boost", colors: ["#00332f", "#ff7d10", "#ff5500", "#effefa", "#ffd166"] },
  { name: "Energetic Spark", colors: ["#03c9a9", "#ef476f", "#ff7d10", "#ffcc00", "#1ce5c2"] },
  { name: "Warm Glow", colors: ["#ffe4b5", "#ffd580", "#ffcc66", "#ffb238", "#effefa"] },
  { name: "Sunlit Forest", colors: ["#03c9a9", "#047869", "#ff7d10", "#ffb238", "#effefa"] },
];


const AvatarGenerator = () => {
  const [selectedPalette, setSelectedPalette] = useState(palettes[0].colors);
  const [name, setName] = useState(`Random User - ${Date.now()}`);

  const handleGenerate = () => {
    const randomName = `User ${Math.floor(Math.random() * 1000000)}`;
    setName(randomName);
  };

  return (
    <div className="flex overflow-scroll bg-transparent flex-col items-center justify-center p-4">
      {/* Avatar Preview */}
        <Avatar
          className={"relative"}
          name={name}
          colors={selectedPalette}
          variant="beam" // Change to other variants like "ring" or "sunset" if desired
          size={100}
        />

      {/* Generate Button */}
      <Button title={"Generate!"} className={"text-white mt-6 px-12"} onClick={handleGenerate}/>

      <p className={"text-white text-left mt-6"}>Color Palette</p>
      {/* Palette Selection */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {palettes.map((palette, index) => (
          <div
            key={index}
            className={`p-4 border rounded cursor-pointer ${
              selectedPalette === palette.colors ? "border-gray-900 backdrop-saturate-50" : "border-gray-300"
            }`}
            onClick={() => setSelectedPalette(palette.colors)}
          >
            <h2 className="text-sm font-semibold mb-2 text-white">{palette.name}</h2>
            <div className="flex space-x-2">
              {palette.colors.map((color, idx) => (
                <div
                  key={idx}
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarGenerator;
