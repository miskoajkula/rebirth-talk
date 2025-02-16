import React from 'react';
import Input from "@/components/form/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@/components/button";
import { useUserStore } from "@/store/userStore";

const schema = yup.object().shape({
  username: yup.string().required("Required").min(8, "Min. 8 chars").max(100, "Char limit reached"),
});

interface FormValues {
  username: string;
}

type UsernameEditProps = {
  onCancel: () => void;
}
const UsernameEdit = ({ onCancel }: UsernameEditProps) => {
  const { setUser, user } = useUserStore();
  //todo mutation
  const {
    register, handleSubmit, formState: {errors},
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: user?.username,
    }
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  }

  return <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
    <div className={"relative space-y-4"}>

      <Input
        label="Edit"
        name="username"
        register={register}
        placeholder="Enter new username"
        errors={errors}
      />
      <div className={"flex gap-2 justify-end"}>
        <Button title={"Close"} onClick={onCancel} className={"text-gray-600 bg-transparent hover:bg-transparent hover:opacity-60"} buttonType={"button"} />
        <Button title={"Save"} className={"text-white"} buttonType={"submit"} />
      </div>
    </div>
  </form>
}

export default UsernameEdit;
