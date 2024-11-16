"use client"

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/components/form/input";
import Textarea from "@/components/form/textarea";
import Select from "@/components/form/select";
import Checkbox from "@/components/form/checkbox";
import Layout from "@/components/layout";

const confessionSchema = yup.object().shape({
  title: yup.string().required("Title is required").max(100, "Title cannot exceed 100 characters"),
  description: yup.string().required("Description is required"),
  focusCommunity: yup.string().required("Please select a focus community"),
  tag: yup.string().required("Please select a tag"),
  isAnonymous: yup.boolean(),
});

const focusCommunities = [
  { value: "Binge Eating", label: "Binge Eating" },
  { value: "Drinking Problems", label: "Drinking Problems" },
  { value: "Smoking", label: "Smoking" },
  { value: "Mental Health", label: "Mental Health" },
  { value: "Fitness & Health", label: "Fitness & Health" },
  { value: "Relationships", label: "Relationships" },
  { value: "Other", label: "Other" },
];

const tags = [
  { value: "success", label: "Success Story" },
  { value: "confession", label: "Confession" },
  { value: "struggle", label: "Struggles & Strength" },
  { value: "reflection", label: "True Reflections" },
  { value: "learning", label: "Learning Moments" },
  { value: "turningPoint", label: "Turning Point" },
];

interface FormValues {
  title: string;
  description: string;
  focusCommunity: string;
  tag: string;
  isAnonymous: boolean;
}

const ConfessionForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(confessionSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <Layout>
      <div className="mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Share Your Story</h1>
        <p className="text-gray-600 mb-6">
          Every story matters. Share your thoughts, struggles, or moments of courage with our supportive community.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Title"
            name="title"
            register={register}
            placeholder="Enter a title for your confession"
            errors={errors}
          />
          <Textarea
            label="Description"
            name="description"
            register={register}
            placeholder="Write your story here..."
            errors={errors}
          />
          <Select
            label="Focus Community"
            name="focusCommunity"
            register={register}
            options={focusCommunities}
            errors={errors}
          />
          <Select
            label="Tag"
            name="tag"
            register={register}
            options={tags}
            errors={errors}
          />
          <Checkbox
            label="Stay Anonymous"
            name="isAnonymous"
            register={register}
            errors={errors}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Post Confession
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ConfessionForm;
