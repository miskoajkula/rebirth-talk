"use client";
import React, { useState } from "react";
import {
    Checkbox,
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
const COMMUNITIES = ["Recovery", "Mental Health", "Lifestyle", "Nutrition"];
const POST_KINDS = ["Success Stories", "Confessions", "Struggles & Strength"];
const steps = ["Username", "Avatar", "Focus Communities", "Post Kinds"];

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

    const handleUsernameChange = (e) =>
        setFormData({ ...formData, username: e.target.value });
    const handleAvatarSelect = (avatarPath) =>
        setFormData({ ...formData, avatar: avatarPath });
    const handleAvatarUpload = (file) => {
        const fileURL = URL.createObjectURL(file);
        setFormData({ ...formData, avatar: fileURL });
    };

    const handleFocusCommunitiesChange = (community) => {
        const updated = [...formData.focusCommunities];
        if (updated.includes(community)) {
            updated.splice(updated.indexOf(community), 1);
        } else {
            updated.push(community);
        }
        setFormData({ ...formData, focusCommunities: updated });
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


    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return (
                    <div className="w-full max-w-md">

                      <Input
                        label={"Choose a username"}
                        extraClassName={"text-white bg-transparent"}
                        labelClassName={"text-white bg-transparent"}
                        name={"username"}
                        register={register} />

                    </div>
                );
            case 1:
                return (
                  <AvatarGenerator />

                );
            case 2:
                return (
                    <div className="w-full max-w-md">
                        <Typography variant="h6" className="mb-4">
                            Choose Your Focus Communities
                        </Typography>
                        <FormGroup>
                            {COMMUNITIES.map((community) => (
                                <FormControlLabel
                                    key={community}
                                    control={
                                        <Checkbox
                                            checked={formData.focusCommunities.includes(community)}
                                            onChange={() => handleFocusCommunitiesChange(community)}
                                        />
                                    }
                                    label={community}
                                />
                            ))}
                        </FormGroup>
                    </div>
                );
            case 3:
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
        <div className="max-w-3xl mx-auto p-6 bg-[#1d766566] backdrop-blur-2xl  rounded-lg shadow-lg h-[90vh] overflow-y-scroll">
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
