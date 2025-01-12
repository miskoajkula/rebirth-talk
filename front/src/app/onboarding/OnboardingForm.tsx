"use client";
import React, { useState } from "react";
import {
  Checkbox, Collapse,
  FormControlLabel,
  FormGroup,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Button from "@/components/button";
import Input from "@/components/form/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Avatar from 'boring-avatars';
import AvatarGenerator from "@/components/avatar-generator";

const AVAILABLE_AVATARS = [
    "/images/avatar1.png",
    "/images/avatar2.png",
    "/images/avatar3.png",
];
const POST_KINDS = ["Success Stories", "Confessions", "Struggles & Strength"];
const steps = ["Profile", "Focus Communities", "Post Kinds"];
import { FaWineBottle, FaAppleAlt, FaBrain, FaHeart, FaRunning, FaEllipsisH } from "react-icons/fa";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";

import { FaArrowDown } from "react-icons/fa6";

const focusCommunities = [
  {
    category: "Addiction",
    icon: <FaWineBottle size={16} />,
    subcategories: [
      "Alcohol", "Smoking", "Vaping", "Caffeine", "Sugar", "Energy Drinks",
      "Nicotine", "Pornography", "Gambling", "Drugs", "Social Media",
      "Video Games", "Internet Addiction", "Shopping Addiction", "Chemsex",
      "Prescription Drugs"
    ]
  },
  {
    category: "Eating Habits",
    icon: <FaAppleAlt size={16} />,
    subcategories: [
      "Binge Eating", "Emotional Eating", "Sugar Addiction", "Food Addiction",
      "Chewing and Spitting", "Restrictive Eating", "Overeating", "Purging",
      "Orthorexia", "Fast Food Addiction", "Junk Food Addiction"
    ]
  },
  {
    category: "Mental Health",
    icon: <FaBrain size={16} />,
    subcategories: [
      "Depression", "Anxiety", "Anger Management", "OCD", "Self-Harm",
      "Suicidal Thoughts", "PTSD", "ADHD", "Bipolar Disorder", "Stress",
      "Insomnia", "Low Self-Esteem"
    ]
  },
  {
    category: "Relationships",
    icon: <FaHeart size={16} />,
    subcategories: [
      "Toxic Relationships", "Codependency", "Trust Issues", "Attachment Issues",
      "Breakups", "Loneliness", "Dating Apps Addiction", "Stalking", "Jealousy",
      "Abuse"
    ]
  },
  {
    category: "Lifestyle Habits",
    icon: <FaRunning size={16} />,
    subcategories: [
      "Procrastination", "Doomscrolling", "Short-Form Videos", "Gossiping",
      "Overworking", "Excessive Exercising", "Work-Life Imbalance",
      "Knuckle Cracking", "Nail Biting", "Hair Pulling", "Skin Picking"
    ]
  },
  {
    category: "Physical Health",
    icon: <FaEllipsisH size={16} />,
    subcategories: [
      "Fitness Motivation", "Weight Loss Struggles", "Sedentary Lifestyle",
      "Injury Recovery", "Chronic Fatigue", "Overtraining", "Body Dysmorphia",
      "Muscle Imbalance"
    ]
  },
  {
    category: "Other",
    icon: <FaEllipsisH size={16} />,
    subcategories: [
      "Financial Issues", "Career Burnout", "Lack of Purpose", "Parenting Struggles",
      "Addiction to AI/Tech", "Miscellaneous"
    ]
  }
];



function OnboardingForm() {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        username: "",
        avatar: "",
        focusCommunities: [],
        postKinds: [],
    });

    const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
    const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

    const handleSubmit = () => {
        alert(JSON.stringify(formData, null, 2));
    };

    const handlePostKindsChange = (kind) => {
        const updated = [...formData.postKinds];
        if (updated.includes(kind)) {
            updated.splice(updated.indexOf(kind), 1);
        } else {
            updated.push(kind);
        }
        setFormData({ ...formData, postKinds: updated });
    };

  const schema = yup.object().shape({
    username: yup.string().required("Required").min(8, "Min. 8 chars").max(100, "Char limit reached"),
  });

  const {
    register,
    formState: {errors},
    setValue
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [expanded, setExpanded] = useState({});
  const [selected, setSelected] = useState([]);

  const toggleExpand = (category) => {
    setExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
  };


  const handleSelect = (value) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleSelectCategory = (category, subcategories) => {
    const isSelected = selected.includes(category);
    const newSelected = isSelected
      ? selected.filter((item) => item !== category && !subcategories.includes(item))
      : [...selected, category, ...subcategories.filter((item) => !selected.includes(item))];
    setSelected(newSelected);
  };

  const handleSelectAll = (category, subcategories) => {
    const allSelected = subcategories.every((sub) => selected.includes(sub));
    if (allSelected) {
      // Deselect all subcategories
      setSelected((prev) => prev.filter((item) => !subcategories.includes(item)));
    } else {
      // Select all subcategories
      setSelected((prev) => [
        ...prev,
        ...subcategories.filter((sub) => !prev.includes(sub)),
      ]);
    }
  };

    const getStepContent = (stepIndex: number) => {
        switch (stepIndex) {
            case 0:
                return (
                  <div className="w-full flex flex-col items-top">
                    <AvatarGenerator/>
                    <Input
                      wrapperClassName={"flex-1"}
                      label={"Username"}
                      extraClassName={"text-white bg-transparent placeholder-white placeholder:text-xs placeholder:opacity-40"}
                      labelClassName={"text-white bg-transparent"}
                      name={"username"}
                      placeholder={"Pick a username"}
                      register={register}/>
                  </div>
                );
          case 1:
            return (
              <div className="w-full px-2">
                {focusCommunities.map(({category, subcategories, icon}) => (
                  <div key={category} className="border-b">
                    {/* Accordion Header */}
                    <div
                      className="flex justify-between items-center py-2 cursor-pointer"
                      onClick={() => toggleExpand(category)}
                    >
                      <label className="flex items-center">
                        <div className={"text-white mr-4"}>{icon}</div>
                        <span className="font-semibold text-white">{category}</span>
                      </label>
                      <span
                        className={`transition-transform ${expanded[category] ? "rotate-180" : ""}`}
                      >
          <IoIosArrowDown className={"text-white"}/>
        </span>
                    </div>

                    {/* Subcategories with Select All */}
                    {expanded[category] && (
                      <div className="pl-6 py-2">
                        {/* Select All Checkbox */}
                        <label className="flex items-center py-1 text-white font-semibold">
                          <input
                            type="checkbox"
                            checked={subcategories.every((sub) => selected.includes(sub))}
                            onChange={() => handleSelectAll(category, subcategories)}
                            className="mr-2"
                          />
                          All
                        </label>

                        {/* Individual Subcategories */}
                        {subcategories.map((sub) => (
                          <label key={sub} className="flex items-center py-1 text-white">
                            <input
                              type="checkbox"
                              checked={selected.includes(sub)}
                              onChange={() => handleSelect(sub)}
                              className="mr-2"
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
          case 2:
            return (
              <div className="w-full max-w-md">
                <Typography variant="h6" className="mb-4">
                  What kind of posts interest you?
                </Typography>
                <FormGroup>
                  {POST_KINDS.map((kind) => (
                    <FormControlLabel
                      key={kind}
                      control={
                        <Checkbox
                          checked={formData.postKinds.includes(kind)}
                          onChange={() => handlePostKindsChange(kind)}
                        />
                      }
                      label={kind}
                    />
                  ))}
                </FormGroup>
              </div>
            );
          default:
            return <Typography variant="body1">Something went wrong...</Typography>;
        }
    };

  return (
    <div className="max-w-xl mx-auto p-6 bg-[#1d766566] backdrop-blur-2xl  rounded-lg shadow-lg h-[90vh] overflow-y-scroll">
      <Stepper activeStep={activeStep} className="mb-6 onboarding-stepper h-[5vh]">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel><span className={"text-white"}>{label}</span></StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="mb-6 h-[65vh] overflow-y-scroll">{getStepContent(activeStep)}</div>
      <div className="flex justify-end items-center h-[5vh]">
        <Button
          onClick={handleBack}
          className={`w-auto mr-3 bg-transparent text-gray-200 hover:bg-transparent ${activeStep === 0 ? "opacity-10 pointer-events-none" : ""}`}
                    title={"Back"}
                />
                {activeStep === steps.length - 1 ? (
                    <Button className={"w-auto"} onClick={handleSubmit} title={"Finish"} />
                ) : (
                    <Button className={"w-auto bg-white text-pine-green-950 hover:bg-white hover:opacity-90"}  onClick={handleNext} title={"Next"}  />

                )}
            </div>
        </div>
    );
}

export default OnboardingForm;
