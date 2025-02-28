import React from "react";
import Input from "@/components/form/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@/components/button";
import { useUserStore } from "@/store/userStore";
import { useMutation } from "@apollo/client";
import UPDATE_PROFILE from "@/lib/mutations/update-profile.mutation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  username: yup.string().required("Required").min(8, "Min. 8 chars").max(100, "Char limit reached")
});

interface FormValues {
  username: string;
}

type UsernameEditProps = {
  onCancel: () => void;
}
const UsernameEdit = ({ onCancel }: UsernameEditProps) => {
  const { setUser, user } = useUserStore();
  const router = useRouter();
  const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE, {
    onCompleted: (data) => {
      if (user) {
        const name = getValues("username")
        setUser({ ...user, username: name });
        router.push(`/profile/${name}`);
      }
      console.log(data);
      toast.success("Successfully updated username!");
    }, onError: (error) => {
      toast.error(error.message, { position: "top-right", duration: 6000 });
    }
  });

  const {
    register, handleSubmit, formState: { errors }, getValues
  } = useForm<FormValues>({
    resolver: yupResolver(schema), defaultValues: {
      username: user?.username
    }
  });

  const onSubmit = (values: FormValues) => {
    if (loading) return;

    updateProfile({
      variables: {
        payload: {
          username: values.username
        }
      }
    });
  };

  return <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
    <div className={"relative"}>

      <Input
        label="Edit Username"
        name="username"
        register={register}
        placeholder="Username"
        errors={errors}
      />
      <div className={"flex gap-2 justify-end mt-6"}>
        <Button title={"Close"} onClick={onCancel}
                className={"text-gray-600 bg-transparent hover:bg-transparent hover:opacity-60"}
                buttonType={"button"} />
        <Button title={"Save"} className={"text-white"} buttonType={"submit"} loading={loading} />
      </div>
    </div>
  </form>;
};

export default UsernameEdit;
