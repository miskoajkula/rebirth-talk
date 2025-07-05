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
  subcategory: yup.string().required("Please select a subcategory"),
  tag: yup.string().required("Please select a tag"),
  isAnonymous: yup.boolean(),
});

interface FormValues {
  title: string;
  description: string;
  focusCommunity: string;
  subcategory: string;
  tag: string;
  isAnonymous: boolean;
}

interface Option {
  value: string;
  label: string;
}

interface Subcategory {
  __typename: string;
  id: string;
  name: string;
}

interface FocusCommunity {
  __typename: string;
  id: string;
  icon: string;
  category: string;
  preselect: boolean;
  subcategories: Subcategory[];
}

const ConfessionForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(confessionSchema),
  });

  const [formattedTags, setFormattedTags] = useState<Option[]>([]);
  const [focusCommunityOptions, setFocusCommunityOptions] = useState<Option[]>([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState<Option[]>([]);

  const { cfg } = useConfigStore();

  // Watch the selected focus community to update subcategories
  const selectedFocusCommunity = watch("focusCommunity");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      console.log("Form Submitted:", data);
      // Add your submission logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  // Format focus communities for select dropdown
  useEffect(() => {
    if (cfg?.communities) {
      const formattedCommunities = cfg.communities.map((community: FocusCommunity) => ({
        value: community.id,
        label: community.category,
      }));
      setFocusCommunityOptions(formattedCommunities);
    }
  }, [cfg?.communities]);

  // Format tags for select dropdown
  useEffect(() => {
    if (cfg?.labels) {
      setFormattedTags(
        cfg.labels.map((label) => ({
          value: label.id,
          label: label.name,
        })),
      );
    }
  }, [cfg?.labels]);

  // Update subcategories when focus community changes
  useEffect(() => {
    if (selectedFocusCommunity && cfg?.communities) {
      const selectedCommunity = cfg.communities.find(
        (community: FocusCommunity) => community.id === selectedFocusCommunity,
      );

      if (selectedCommunity) {
        const formattedSubcategories = selectedCommunity.subcategories.map(
          (sub: Subcategory) => ({
            value: sub.id,
            label: sub.name,
          }),
        );
        setSubcategoryOptions(formattedSubcategories);
      } else {
        setSubcategoryOptions([]);
      }

      // Reset subcategory selection when focus community changes
      setValue("subcategory", "");
    } else {
      setSubcategoryOptions([]);
      setValue("subcategory", "");
    }
  }, [selectedFocusCommunity, cfg?.communities, setValue]);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Share Your Story</h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Every story matters. Share your thoughts, struggles, or moments of courage
              with our supportive community.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Title Input */}
                <div className="space-y-2">
                  <Input
                    label="Title"
                    name="title"
                    register={register}
                    placeholder="Enter a compelling title for your story..."
                    errors={errors}
                  />
                </div>

                {/* Description Textarea */}
                <div className="space-y-2">
                  <Textarea
                    label="Your Story"
                    name="description"
                    register={register}
                    placeholder="Share your experience, thoughts, or feelings. Your words can help others who might be going through something similar..."
                    errors={errors}
                  />
                </div>

                {/* Community Selection Section */}
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Choose Your Community
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Focus Community */}
                    <div className="space-y-2">
                      <Select
                        label="Focus Area"
                        name="focusCommunity"
                        register={register}
                        options={focusCommunityOptions}
                        errors={errors}
                      />
                    </div>

                    {/* Subcategory */}
                    <div className="space-y-2">
                      <Select
                        label="Specific Topic"
                        name="subcategory"
                        register={register}
                        options={subcategoryOptions}
                        errors={errors}
                        disabled={
                          !selectedFocusCommunity || subcategoryOptions.length === 0
                        }
                      />
                      {!selectedFocusCommunity && (
                        <p className="text-sm text-gray-500 mt-1">
                          Select a focus area first
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tag Selection */}
                <div className="space-y-2">
                  <Select
                    label="Tag"
                    name="tag"
                    register={register}
                    options={formattedTags}
                    errors={errors}
                  />
                </div>

                {/* Privacy Section */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Privacy Settings
                  </h3>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      label="Post anonymously"
                      name="isAnonymous"
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2 ml-6">
                    Your identity will be completely hidden from other users
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-300 ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Sharing Your Story...</span>
                      </div>
                    ) : (
                      "Share My Story"
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
              <p className="text-sm text-gray-600 text-center">
                By sharing your story, you're helping create a supportive community for
                everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConfessionForm;
