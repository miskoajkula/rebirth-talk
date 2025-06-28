"use client";

import { useRouter } from "next/navigation";

import { SubmitHandler, useForm } from "react-hook-form";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import * as yup from "yup";

import AuthLayout from "@/components/auth-layout";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "@/components/form/input";
import CHECK_ACCOUNT from "@/lib/queries/user.query";
import Button from "@/components/button";
import SOCIAL_LOGIN from "@/lib/mutations/social-login.mutation";
import Cookies from "js-cookie";
import { useUserStore } from "@/store/userStore";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Not an email")
    .required("Required")
    .max(100, "Char limit reached"),
});

interface FormValues {
  email: string;
}

const Page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const { setUser } = useUserStore();

  const [checkUser, { loading }] = useLazyQuery(CHECK_ACCOUNT, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      if (data.checkAccount) {
        if (data.checkAccount.socialAuth) {
          toast.error("Please use social auth to continue with that account.", {
            duration: 7000,
          });
          return;
        }

        const emailParam = `email=${getValues("email")}`;

        if (data.checkAccount.userExists) {
          router.push(`/auth/login?${emailParam}`);
          return;
        }

        router.push(`/auth/register?${emailParam}`);
      }
    },
  });

  const [socialLogin, { loading: socialLoading }] = useMutation(SOCIAL_LOGIN, {
    onCompleted: (data) => {
      const { token, userInfo } = data.authenticateWithSocial;

      localStorage.setItem("user", JSON.stringify(userInfo));
      setUser(userInfo);

      Cookies.set("token", token, {
        // secure: true,
        sameSite: "strict",
        expires: 24,
      });

      if (!userInfo.avatar) {
        router.push("/onboarding");
        return;
      }

      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        duration: 6000,
      });
    },
  });

  const onSubmit: SubmitHandler<FormValues> = ({ email }: FormValues) => {
    checkUser({
      variables: {
        email,
      },
    });
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

        <Button
          title={"Continue"}
          className={"text-white w-full"}
          loading={loading}
          buttonType="submit"
        />

        <hr />
        <p className={"text-center text-gray-700"}>Or</p>
        <div
          className={
            "flex relative text-white items-center justify-center gap-4 bg-pine-green-700 py-2 rounded-md font-medium hover:bg-pine-green-800"
          }
        >
          <img src={"/google.svg"} />
          <span>Continue with Google</span>

          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              if (!socialLoading) {
                socialLogin({
                  variables: {
                    token: credentialResponse.credential,
                  },
                });
              }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            width={400}
            containerProps={{
              style: {
                position: "absolute",
                left: 0,
                opacity: 0,
              },
            }}
          />
        </div>
      </form>
    </AuthLayout>
  );
};

export default Page;
