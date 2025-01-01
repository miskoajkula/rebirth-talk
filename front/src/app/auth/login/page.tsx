"use client";

import React, { useState } from 'react';
import AuthLayout from "@/components/auth-layout";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import GoBack from "@/components/navigation/go-back";
import Input from "@/components/form/input";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const schema = yup.object().shape({
  password: yup.string().required("Required").min(8, "Min. 8 chars").max(100, "Char limit reached"),
});

interface FormValues {
  password: string;
}

const Page = () => {

  const router = useRouter()
  const searchParams = useSearchParams();
  const [inputType, setInputType] = useState("password")

  const onInputTypeChange = () => {
    setInputType(inputType === "password" ? "text" : "password");
  }
  console.log()
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = ({password}: FormValues) => {

    alert(password)
  };


  console.log("inputType", inputType);

  const EyeIcon = inputType === "password" ? IoMdEye : IoMdEyeOff

  return (
    <AuthLayout>
      <h2 className="text-3xl font-semibold text-gray-800 relative">
        <GoBack wrapperStyle={"absolute left-[-2.4rem] top-1 opacity-80"}/>
        Welcome Back,</h2>
      <div className={"flex items-center"}>
        <h2 className="text-sm  font-semibold text-gray-400 mt-0">{searchParams?.get("email")}</h2>
      </div>

      <form className="space-y-4 mt-6" onSubmit={handleSubmit(onSubmit)}>

        <div className={"relative"}>

          <Input
            label="Password"
            name="password"
            register={register}
            type={inputType}
            placeholder="**********"
            errors={errors}
          />
          <EyeIcon
            onClick={onInputTypeChange}
            className={"w-5 h-5 absolute right-4 opacity-70 text-black top-9 hover:cursor-pointer"}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            {/*<input type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded"/>*/}
            {/*<span className="ml-2 text-sm text-gray-700">Remember this device</span>*/}
          </label>
          <Link href={"/auth/password-reset"} className={"text-sm text-indigo-600"}>
            Forgot password?
          </Link>
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-[#047871] text-white font-semibold rounded-md hover:bg-indigo-700">
          Sign in
        </button>
      </form>

    </AuthLayout>
  );
};

export default Page;
