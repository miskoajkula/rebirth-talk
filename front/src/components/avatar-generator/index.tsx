import React, { useState } from "react";
import Avatar from "boring-avatars";

import Button from "@/components/button";
import PortalModal from "@/components/modal";
import { avatarPallets } from "@/constants";
import { getRandomNumber } from "@/functions";

import { FaPalette } from "react-icons/fa6";
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";

export type Avatar = {
  name: string;
  colors: string[];
};

type AvatarGeneratorProps = {
  onChange: (avatar: Avatar) => void;
  defaultAvatar: Avatar;
  renderPalletsInModal: boolean;
};

const AvatarGenerator = ({
  onChange,
  defaultAvatar,
  renderPalletsInModal = true,
}: AvatarGeneratorProps) => {
  console.log(defaultAvatar);

  const [selectedPalette, setSelectedPalette] = useState(defaultAvatar.colors);
  const [tempPalette, setTempPalette] = useState();

  const [name, setName] = useState(defaultAvatar.name);
  const [modal, setModal] = useState(false);

  const handleGenerate = (callOnChange = true) => {
    const randomName = `User ${getRandomNumber(1, 99999999999)}`;
    setName(randomName);
    if (callOnChange) {
      onChange({
        colors: selectedPalette,
        name: randomName,
      });
    }
  };

  const onSaveButtonClick = () => {
    if (defaultAvatar?.name !== name) {
      onChange({
        colors: selectedPalette,
        name: name,
      });
    }
  };

  const renderPallets = (isVertical = true) => {
    const style = isVertical ? "mt-6 grid grid-cols-2 gap-4" : "mt-6 flex gap-4";
    return (
      <div className={style}>
        {avatarPallets.map((palette, index) => (
          <div
            key={index}
            className={`p-4 border rounded cursor-pointer ${tempPalette === palette.colors ? "border-gray-900 backdrop-saturate-50" : "border-gray-300"}`}
            onClick={() => {
              setTempPalette(palette.colors);

              if (!renderPalletsInModal) {
                setSelectedPalette(palette.colors);
                handleGenerate(false);
                return;
              }
            }}
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
    );
  };

  const renderPalletsContainer = () => {
    if (renderPalletsInModal) {
      return (
        <PortalModal
          isOpen={modal}
          wrapperClassName={"backdrop-blur-xl"}
          contentStyle={{
            background: "transparent",
            boxShadow: "none",
          }}
          onClose={() => {
            setModal(false);
          }}
        >
          <div className={"flex justify-between items-center"}>
            <p className={"text-white text-left"}>Color Palette</p>
            <IoClose
              className={"text-white w-8 h-8 hover:cursor-pointer"}
              onClick={() => setModal(false)}
            />
          </div>
          {renderPallets()}
          <div className={"w-full flex justify-end items-end mt-6"}>
            <Button
              onClick={() => {
                if (tempPalette?.length) {
                  setSelectedPalette(tempPalette);
                  setModal(false);

                  handleGenerate(renderPalletsInModal);
                }
              }}
              title={"Confirm"}
              className={`text-white ${!tempPalette ? "opacity-50" : "opacity-100"}`}
            />
          </div>
        </PortalModal>
      );
    } else {
      return (
        <>
          <div className={"relative w-full overflow-scroll"}>{renderPallets(false)}</div>
          <div
            onClick={onSaveButtonClick}
            className={`flex items-center text-white text-lg gap-2 mt-4 ${defaultAvatar?.name !== name ? "opacity-100" : "opacity-30"} hover:cursor-pointer`}
          >
            <IoCheckmarkDoneSharp color={"white"} />
            Save
          </div>
        </>
      );
    }
  };

  return (
    <div className="flex overflow-scroll bg-transparent flex-col items-center justify-center p-4">
      {/* Avatar Preview */}
      <div className={"relative"}>
        <Avatar
          className={"relative"}
          name={name}
          colors={selectedPalette}
          variant="beam"
          size={100}
        />
        <div className={"absolute top-0 right-0 z-10 flex flex-col color-chooser"}>
          {selectedPalette?.map((el, i) => {
            return (
              <div
                key={el + i}
                className={"w-2 h-2 rounded-xl"}
                style={{ backgroundColor: el }}
              />
            );
          })}
        </div>
        <FaPalette
          onClick={() => setModal(true)}
          className={
            "w-8 h-8 bg-[#00382e] text-white rounded-2xl p-2 absolute top-0 right-0 hover:cursor-pointer hover:scale-95"
          }
        />
      </div>

      <div className={"flex items-center gap-4 justify-center "}>
        <Button
          title={"Generate Avatar!"}
          className={"text-white mt-6 px-12 bg-transparent border-2 !rounded-2xl"}
          onClick={() => handleGenerate(renderPalletsInModal)}
        />
      </div>

      {renderPalletsContainer()}
    </div>
  );
};

export default AvatarGenerator;
