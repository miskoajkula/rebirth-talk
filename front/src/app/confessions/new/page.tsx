"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/components/form/input";
import Textarea from "@/components/form/textarea";
import Select from "@/components/form/select";
import Checkbox from "@/components/form/checkbox";
import Layout from "@/components/layout";
import { useConfigStore } from "@/store/cfgStore";

const confessionSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  description: yup.string().required("Description is required"),
  focusCommunity: yup.string().required("Please select a focus community"),
  tag: yup.string().required("Please select a tag"),
  isAnonymous: yup.boolean(),
});

const focusCommunities = [
  {
    category: "Addiction",
    preSelect: true,
    subcategories: [
      "Alcohol",
      "Smoking",
      "Vaping",
      "Caffeine",
      "Sugar",
      "Energy Drinks",
      "Nicotine",
      "Pornography",
      "Gambling",
      "Drugs",
      "Social Media",
      "Video Games",
      "Internet Addiction",
      "Shopping Addiction",
      "Chemsex",
      "Prescription Drugs",
    ],
  },
  {
    category: "Eating Habits",
    preSelect: true,
    subcategories: [
      "Binge Eating",
      "Emotional Eating",
      "Sugar Addiction",
      "Food Addiction",
      "Chewing and Spitting",
      "Restrictive Eating",
      "Overeating",
      "Purging",
      "Orthorexia",
      "Fast Food Addiction",
      "Junk Food Addiction",
    ],
  },
  {
    category: "Mental Health",
    preSelect: true,
    subcategories: [
      "Depression",
      "Anxiety",
      "Anger Management",
      "OCD",
      "Self-Harm",
      "Suicidal Thoughts",
      "PTSD",
      "ADHD",
      "Bipolar Disorder",
      "Stress",
      "Insomnia",
      "Low Self-Esteem",
    ],
  },
  {
    category: "Relationships",
    subcategories: [
      "Toxic Relationships",
      "Codependency",
      "Trust Issues",
      "Attachment Issues",
      "Breakups",
      "Loneliness",
      "Dating Apps Addiction",
      "Stalking",
      "Jealousy",
      "Abuse",
    ],
  },
  {
    category: "Lifestyle Habits",
    subcategories: [
      "Procrastination",
      "Doomscrolling",
      "Short-Form Videos",
      "Gossiping",
      "Overworking",
      "Excessive Exercising",
      "Work-Life Imbalance",
      "Knuckle Cracking",
      "Nail Biting",
      "Hair Pulling",
      "Skin Picking",
    ],
  },
  {
    category: "Physical Health",
    subcategories: [
      "Fitness Motivation",
      "Weight Loss Struggles",
      "Sedentary Lifestyle",
      "Injury Recovery",
      "Chronic Fatigue",
      "Overtraining",
      "Body Dysmorphia",
      "Muscle Imbalance",
    ],
  },
  {
    category: "Other",
    subcategories: [
      "Financial Issues",
      "Career Burnout",
      "Lack of Purpose",
      "Parenting Struggles",
      "Addiction to AI/Tech",
      "Miscellaneous",
    ],
  },
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
  const [formattedTags, setFormattedTags] = useState<Option[]>([]);

  const { cfg } = useConfigStore();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Submitted:", data);
  };

  useEffect(() => {
    if (cfg?.labels) {
      setFormattedTags(
        cfg.labels.map((label) => {
          return {
            value: label.id,
            label: label.name,
          };
        }),
      );
    }
  }, [cfg]);

  console.log(formattedTags);

  return (
    <Layout>
      <div className="mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Share Your Story</h1>
        <p className="text-gray-600 mb-6">
          Every story matters. Share your thoughts, struggles, or moments of courage with
          our supportive community.
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
            options={formattedTags}
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
