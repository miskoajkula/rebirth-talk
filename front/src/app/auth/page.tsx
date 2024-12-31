"use client"

import React from 'react';
import AuthLayout from "@/components/auth-layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import Input from "@/components/form/input";
import CHECK_ACCOUNT from "@/lib/queries/user.query";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  email: yup.string().email("Not an email").required("Required").max(100, "Char limit reached"),
});

interface FormValues {
  email: string;
}

const Page = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [checkUser] = useLazyQuery(CHECK_ACCOUNT, {
    onCompleted: data => {
      if(data.checkAccount) {
        if(data.checkAccount.socialAuth) {
          alert("Use social auth")
          return
        }
        router.push('/auth/login')
      }
    }
  })

  const onSubmit: SubmitHandler<FormValues> = ({ email }: FormValues) => {

    checkUser({
      variables: {
        email,
      }
    })
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Get Started</h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

        <Input
          label="Email Address"
          name="email"
          register={register}
          placeholder="user@example.com"
          errors={errors}
        />

        <button type="submit" className="w-full py-2 px-4 bg-pine-green-700 text-white font-semibold rounded-md ">
          Continue
        </button>

        <hr/>
        <p className={"text-center text-gray-700"}>Or</p>
        <a href={"/auth"} className={"flex items-center justify-center gap-4 bg-pine-green-700 py-2 rounded-md font-medium"}>
          <img src={'/google.svg'}/>
          <span>
          Continue with Google
          </span>
        </a>

      </form>

    </AuthLayout>
  );
};

export default Page;
