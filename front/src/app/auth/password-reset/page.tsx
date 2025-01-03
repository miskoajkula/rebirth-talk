"use client"

import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

import AuthLayout from "@/components/auth-layout";
import GoBack from "@/components/navigation/go-back";
import Button from "@/components/button";
import Input from "@/components/form/input";
import REQUEST_PASSWORD_RESET from "@/lib/mutations/request-password-reset.mutation";
import { FaCheck } from "react-icons/fa";

const schema = yup.object().shape({
  email: yup.string().email("Not an email").required("Required").max(100, "Char limit reached"),
});

interface FormValues {
  email: string;
}

const Page = () => {

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [submit, {loading, data}] = useMutation(REQUEST_PASSWORD_RESET, {
    onError: (err) => {
      toast.error(err.message, {duration: 6000});
    }
  })

  const onSubmit: SubmitHandler<FormValues> = ({email}: FormValues) => {
    if (loading) return;

    submit({
      variables: {
        email: email,
      }
    })
  };

  const renderBody = () => {
    if (data?.requestPasswordReset) {
      return <div className={"mt-12 bg-pine-green-50 rounded-2xl px-7 py-4"}>
        <div className={"flex items-center gap-2 relative"}>
          <FaCheck className={"text-white bg-pine-green-500 rounded-2xl p-2 w-8 h-8"}/>
          <h1 className={"text-2xl pt-1 text-pine-green-700 font-medium"}>Success</h1>
        </div>

        <p className={"text-sm text-pine-green-700 mt-2"}>An email has been sent to your inbox with instructions to reset your password.<br/>
          Please check your inbox and follow the steps to regain access to your account.</p>
      </div>
    }

    return <form className="space-y-4 mt-6" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Email Address"
        name="email"
        register={register}
        placeholder="user@example.com"
        errors={errors}
      />

      <Button title={"Submit"} buttonType={"submit"} loading={loading}/>

    </form>
  }


  return (
    <AuthLayout>
      <h2 className="text-3xl font-semibold text-gray-800 relative">
        <GoBack wrapperStyle={"absolute left-[-2.4rem] top-1 opacity-80"}/>
        Password Reset</h2>
      {renderBody()}
    </AuthLayout>
  );
}


export default Page;
