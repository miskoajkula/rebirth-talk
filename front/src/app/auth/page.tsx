"use client"

import React from 'react';
import AuthLayout from "@/components/auth-layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import Input from "@/components/form/input";
import CHECK_ACCOUNT from "@/lib/queries/user.query";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import Button from "@/components/button";
import { GoogleLogin } from "@react-oauth/google";

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
    getValues,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [checkUser, {loading}] = useLazyQuery(CHECK_ACCOUNT, {
    onCompleted: data => {
      if (data.checkAccount) {
        if (data.checkAccount.socialAuth) {
          alert("Use social auth")
          return
        }

        const emailParam = `email=${getValues("email")}`

        if (data.checkAccount.userExists) {
          router.push(`/auth/login?${emailParam}`)
          return
        }

        router.push(`/auth/register?${emailParam}`)
      }
    }
  })

  const onSubmit: SubmitHandler<FormValues> = ({email}: FormValues) => {
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

        <Button title={"Continue"} loading={loading} buttonType="submit"/>

        <hr/>
        <p className={"text-center text-gray-700"}>Or</p>
        <a href={"/auth"} className={"flex text-white items-center justify-center gap-4 bg-pine-green-700 py-2 rounded-md font-medium"}>
          <img src={'/google.svg'}/>
          <span>
          Continue with Google
          </span>
        </a>
        <GoogleLogin
          useOneTap={true}
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />

      </form>

    </AuthLayout>
  );
};

export default Page;
