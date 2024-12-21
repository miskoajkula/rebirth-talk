"use client"

import React from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

interface GoBackProps {
  wrapperStyle?: string
}

const GoBack = ({wrapperStyle}: GoBackProps) => {
  const router = useRouter();

  const action = () => {
    router.back()
  }

  return (
    <div className={`flex items-center justify-start gap-2 ${wrapperStyle}`}>
      <IoMdArrowBack className={"text-black w-6 h-6 hover:cursor-pointer"} onClick={action}/>
      <span className={"text-black hover:cursor-pointer"} onClick={action}>Go back</span>
    </div>
  );
};

export default GoBack;
