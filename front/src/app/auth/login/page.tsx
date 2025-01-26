"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from 'react';

import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import classNames from "classnames";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import AuthLayout from "@/components/auth-layout";
import { yupResolver } from "@hookform/resolvers/yup";
import GoBack from "@/components/navigation/go-back";
import Input from "@/components/form/input";
import LOGIN from "@/lib/mutations/login.mutation";
import Button from "@/components/button";
import Cookies from "js-cookie";

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

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [login, {loading}] = useMutation(LOGIN, {
    onCompleted: (data) => {
      if (data.authenticateWithEmail) {
        const {token, userInfo} = data.authenticateWithEmail

        localStorage.setItem("user", JSON.stringify(userInfo))

        Cookies.set('token', token, {
          // secure: true,
          sameSite: 'strict',
          expires: 24,
        });

        if (!userInfo.avatar) {
          router.push('/onboarding');
        }
      }
    },
    onError: (error) => {
      toast.error(error.message, {position: "top-right", duration: 6000});
    }
  })

  const onSubmit: SubmitHandler<FormValues> = ({password}: FormValues) => {
    if (loading) return

    login({
      variables: {
        payload: {
          email: searchParams?.get("email"),
          password: password,
        }
      }
    })
  };


  const EyeIcon = inputType === "password" ? IoMdEye : IoMdEyeOff
  const shouldRenderEye = !errors["password"]
  const eyeCss = classNames("w-5 h-5 absolute right-4 opacity-70 text-black top-9 hover:cursor-pointer",
    {
      'hidden': !shouldRenderEye,
    })

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
            className={eyeCss}
          />
        </div>

        <div className="flex items-center justify-end">
          <Link href={"/auth/password-reset"} className={"text-xs text-gray-500"}>
            Forgot password?
          </Link>
        </div>
        <Button title={"Sign in"} className={"w-full text-white"} buttonType={"submit"} loading={loading}/>
      </form>

    </AuthLayout>
  );
};

export default Page;
