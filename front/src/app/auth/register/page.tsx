"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from 'react';

import { useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import * as yup from "yup";
import classNames from "classnames";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";

import AuthLayout from "@/components/auth-layout";
import GoBack from "@/components/navigation/go-back";
import Input from "@/components/form/input";
import Button from "@/components/button";
import REGISTER_VIA_EMAIL from "@/lib/mutations/create-user.mutation";


const schema = yup.object().shape({
  email: yup.string().email("Not an email").required("Required").max(100, "Char limit reached"),
  password: yup.string().required("Required").min(8, "Min. 8 chars").max(100, "Char limit reached"),
});


interface FormValues {
  password: string;
  email: string;
}

const Page = () => {
  const [inputType, setInputType] = useState("password")
  const onInputTypeChange = () => {
    setInputType(inputType === "password" ? "text" : "password");
  }
  const [forbiddenEmail, setForbiddenEmail] = useState(false)
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const searchParams = useSearchParams();

  const [submitRegistration, {loading, data: registerData}] = useMutation(REGISTER_VIA_EMAIL, {
    onCompleted: (res) => {
      if (!res.createAccountWithEmail) {
        setForbiddenEmail(true)
        return;
      }
    },
    onError: (err) => {
      toast.error("There has been an error. Try again later.", {
        position: "top-right",
      });
    }
  });

  useEffect(() => {
    if (searchParams?.get("email")) {
      setValue("email", searchParams.get("email")!)
    }
  }, [searchParams]);

  const onSubmit: SubmitHandler<FormValues> = (payload: FormValues) => {
    setForbiddenEmail(false)

    submitRegistration({
      variables: {
        payload
      }
    })
  };

  const EyeIcon = inputType === "password" ? IoMdEye : IoMdEyeOff
  const shouldRenderEye = !errors["password"]

  const eyeCss = classNames("w-5 h-5 absolute right-4 opacity-70 text-black top-9 hover:cursor-pointer",
    {
      'hidden': !shouldRenderEye,
    })


  const renderRegistration = () => {
    if (registerData?.createAccountWithEmail) {
      return <div className={"mt-12 bg-pine-green-50 rounded-2xl px-7 py-4"}>
        <div className={"flex items-center gap-2 relative"}>
          <FaCheck className={"text-white bg-pine-green-500 rounded-2xl p-2 w-8 h-8"}/>
          <h1 className={"text-2xl pt-1 text-pine-green-700 font-medium"}>Success</h1>
        </div>

        <p className={"text-sm text-pine-green-700 mt-2"}>A confirmation email has been sent to your inbox. Please check it to complete the activation.</p>
      </div>
    }
    return <>
      <form className="space-y-4 mt-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email Address"
          name="email"
          register={register}
          placeholder="user@example.com"
          errors={errors}
        />
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
        <Button title={"Submit"} loading={loading} buttonType="submit"/>
      </form>
      {
        forbiddenEmail && <p className={"mt-4 absolute text-red-600 "}>The email is already used!</p>
      }
    </>
  }

  return (
    <AuthLayout>
      <div className={"relative"}>
        <h2 className="text-3xl font-semibold text-gray-800 relative">
          <GoBack wrapperStyle={"absolute left-[-2.4rem] top-1 opacity-80"}/>
          Registration</h2>

        {
          renderRegistration()
        }
      </div>
    </AuthLayout>
  );
};

export default Page;
