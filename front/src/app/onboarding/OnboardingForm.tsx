"use client";
import React, { useEffect, useState } from "react";
import { Step, StepLabel, Stepper, Typography, } from "@mui/material";
import Button from "@/components/button";
import Input from "@/components/form/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AvatarGenerator, { Avatar } from "@/components/avatar-generator";
import { FaAppleAlt, FaBrain, FaEllipsisH, FaHeart, FaRunning, FaWineBottle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { avatarPallets } from "@/constants";
import { SiSunrise } from "react-icons/si";

interface FocusCommunity {
  category: string;
  icon: React.ReactNode;
  preselect: boolean;
  subcategories: string[];
}

interface FormValues {
  username: string;
  avatar: Avatar | null;
  communities: string[];
}

const focusCommunities: FocusCommunity[] = [
  {
    category: "Addiction",
    icon: <FaWineBottle size={16}/>,
    preselect: true,
    subcategories: [
      "Alcohol", "Smoking", "Vaping", "Caffeine", "Sugar", "Energy Drinks",
      "Nicotine", "Pornography", "Gambling", "Drugs", "Social Media",
      "Video Games", "Internet Addiction", "Shopping Addiction", "Chemsex",
      "Prescription Drugs",
    ],
  },
  {
    category: "Eating Habits",
    icon: <FaAppleAlt size={16}/>,
    preselect: true,
    subcategories: [
      "Binge Eating", "Emotional Eating", "Sugar Addiction", "Food Addiction",
      "Chewing and Spitting", "Restrictive Eating", "Overeating", "Purging",
      "Orthorexia", "Fast Food Addiction", "Junk Food Addiction",
    ],
  },
  {
    category: "Mental Health",
    icon: <FaBrain size={16}/>,
    preselect: true,
    subcategories: [
      "Depression", "Anxiety", "Anger Management", "OCD", "Self-Harm",
      "Suicidal Thoughts", "PTSD", "ADHD", "Bipolar Disorder", "Stress",
      "Insomnia", "Low Self-Esteem",
    ],
  },
  {
    category: "Relationships",
    icon: <FaHeart size={16}/>,
    preselect: false,
    subcategories: [
      "Toxic Relationships", "Codependency", "Trust Issues", "Attachment Issues",
      "Breakups", "Loneliness", "Dating Apps Addiction", "Stalking", "Jealousy",
      "Abuse",
    ],
  },
  {
    category: "Lifestyle Habits",
    icon: <SiSunrise size={16}/>,
    preselect: false,
    subcategories: [
      "Procrastination", "Doomscrolling", "Short-Form Videos", "Gossiping",
      "Overworking", "Excessive Exercising", "Work-Life Imbalance",
      "Knuckle Cracking", "Nail Biting", "Hair Pulling", "Skin Picking",
    ],
  },
  {
    category: "Physical Health",
    icon: <FaRunning size={16}/>,
    preselect: false,
    subcategories: [
      "Fitness Motivation", "Weight Loss Struggles", "Sedentary Lifestyle",
      "Injury Recovery", "Chronic Fatigue", "Overtraining", "Body Dysmorphia",
      "Muscle Imbalance",
    ],
  },
  {
    category: "Other",
    icon: <FaEllipsisH size={16}/>,
    preselect: false,
    subcategories: [
      "Financial Issues", "Career Burnout", "Lack of Purpose", "Parenting Struggles",
      "Addiction to AI/Tech", "Miscellaneous",
    ],
  },
];

const schema = yup.object().shape({
  username: yup.string().required("Required").min(8, "Min. 8 chars").max(100, "Char limit reached"),
  avatar: yup.object().nullable(),
  communities: yup.array().of(yup.string().required("Required")),
});

const OnboardingForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<string[]>([]);

  const {
    register,
    formState: {errors},
    getValues,
    setValue,
  } = useForm<FormValues>({
    // @ts-ignore
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      avatar: {
        name: `Random User - ${Date.now()}`,
        colors: avatarPallets[0].colors,
      },
      communities: [],
    },
  });

  // Populate `selected` with preselected subcategories on mount
  useEffect(() => {
    const preselectedSubcategories = focusCommunities
      .filter((category) => category.preselect)
      .flatMap((category) => category.subcategories);
    setSelected(preselectedSubcategories);
    // @ts-ignore
    setValue("communities", preselectedSubcategories);
  }, [setValue]);

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => Math.max(prevStep - 1, 0));

  const handleSubmit = () => {
    console.log(getValues());
  };

  const handleSelect = (value: string) => {
    const updatedSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    setSelected(updatedSelected);
    // @ts-ignore
    setValue("communities", updatedSelected);
  };

  const handleSelectAll = (category: string, subcategories: string[]) => {
    const allSelected = subcategories.every((sub) => selected.includes(sub));
    const updatedSelected = allSelected
      ? selected.filter((item) => !subcategories.includes(item))
      : [...selected, ...subcategories.filter((sub) => !selected.includes(sub))];
    setSelected(updatedSelected);
    // @ts-ignore
    setValue("communities", updatedSelected); // Update form value
  };

  const toggleExpand = (category: string) => {
    setExpanded((prev) => ({...prev, [category]: !prev[category]}));
  };

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return (
          <div className="w-full flex flex-col items-top">
            <h3 className={"text-sm text-white"}>Customize your appearance</h3>
            <form>
              <AvatarGenerator
                defaultAvatar={getValues("avatar")}
                onChange={(avatar: Avatar) => {
                  // @ts-ignore
                  setValue("avatar", avatar);
                }}
              />
              <Input
                wrapperClassName={"flex-1"}
                label={"Username"}
                extraClassName={
                  "text-white bg-transparent placeholder-white placeholder:text-xs placeholder:opacity-40"
                }
                labelClassName={"text-white bg-transparent"}
                name={"username"}
                placeholder={"Pick a username"}
                register={register}
              />
            </form>
          </div>
        );
      case 1:
        return (
          <div className="w-full">
            <h3 className={"text-sm text-white"}>Communities to follow</h3>
            {focusCommunities.map(({category, subcategories, icon}) => (
              <div key={category} style={{borderBottom: "1px solid #ffffff24"}}>
                <div
                  className="flex justify-between items-center py-2 cursor-pointer"
                  onClick={() => toggleExpand(category)}
                >
                  <label className="flex items-center">
                    <div className={"text-white mr-4"}>{icon}</div>
                    <span className="text-white text-sm">
                      {category}
                      <span className="text-xs text-pine-green-100 mr-4 block">
                        {selected.filter((sub) =>
                          focusCommunities
                            .find((c) => c.category === category)
                            ?.subcategories.includes(sub)
                        ).length}{" "}
                        selected
                      </span>
                    </span>
                  </label>
                  <span
                    className={`transition-transform ${
                      expanded[category] ? "rotate-180" : ""
                    }`}
                  >
                    <IoIosArrowDown className={"text-white"}/>
                  </span>
                </div>

                {expanded[category] && (
                  <div className="pl-6 py-2 grid grid-cols-3">
                    <label className="flex items-center text-sm py-1 text-pine-green-100">
                      <input
                        type="checkbox"
                        checked={subcategories.every((sub) => selected.includes(sub))}
                        onChange={() => handleSelectAll(category, subcategories)}
                        className="mr-2 accent-green-500"
                      />
                      All
                    </label>
                    {subcategories.map((sub) => (
                      <label key={sub} className="flex text-xs items-center py-1 text-pine-green-100">
                        <input
                          type="checkbox"
                          checked={selected.includes(sub)}
                          onChange={() => handleSelect(sub)}
                          className="mr-2 accent-green-400"
                        />
                        {sub}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      default:
        return <Typography variant="body1">Something went wrong...</Typography>;
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-[#1d766566] backdrop-blur-2xl rounded-lg shadow-lg h-[90vh] overflow-y-scroll">
      <Stepper activeStep={activeStep} className="mb-6 onboarding-stepper h-[5vh]">
        {["Profile", "Communities"].map((label) => (
          <Step key={label}>
            <StepLabel>
              <span className={"text-white"}>{label}</span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="mb-6 h-[65vh] overflow-y-scroll px-2">{getStepContent(activeStep)}</div>
      <div className="flex justify-end items-center h-[5vh]">
        <Button
          onClick={handleBack}
          className={`w-auto mr-3 bg-transparent text-gray-200 hover:bg-transparent ${
            activeStep === 0 ? "opacity-10 pointer-events-none" : ""
          }`}
          title={"Back"}
        />
        {activeStep === 1 ? (
          <Button
            className={"w-auto bg-white text-pine-green-950 hover:bg-white hover:opacity-90"}
            onClick={handleSubmit}
            title={"Finish"}
          />
        ) : (
          <Button
            className={"w-auto bg-white text-pine-green-950 hover:bg-white hover:opacity-90"}
            onClick={handleNext}
            title={"Next"}
          />
        )}
      </div>
    </div>
  );
};

export default OnboardingForm;
