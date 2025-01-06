"use client";
import React, { useState } from "react";
import {
    Avatar,
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

    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return (
                    <div className="w-full max-w-md">
                        <div className="mb-4 text-gray-700">
                            Choose a username
                        </div>

                        <TextField
                            fullWidth
                            label="Username"
                            value={formData.username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                );
            case 1:
                return (
                    <div className="w-full max-w-lg">
                        <Typography variant="h6" className="mb-4">
                            Choose or Upload an Avatar
                        </Typography>
                        <Stack direction="row" spacing={4} className="mb-4">
                            {AVAILABLE_AVATARS.map((avatarPath) => (
                                <Avatar
                                    key={avatarPath}
                                    src={avatarPath}
                                    alt="avatar"
                                    className={`cursor-pointer w-16 h-16 ${
                                        formData.avatar === avatarPath
                                            ? "border-4 border-blue-500"
                                            : "border-2 border-gray-300"
                                    }`}
                                    onClick={() => handleAvatarSelect(avatarPath)}
                                />
                            ))}
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={4}>
                            <Button variant="contained" component="label" startIcon={<PhotoCameraIcon />}>
                                Upload
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files[0]) {
                                            handleAvatarUpload(e.target.files[0]);
                                        }
                                    }}
                                />
                            </Button>
                            {formData.avatar && (
                                <Avatar
                                    src={formData.avatar}
                                    alt="selected-avatar"
                                    className="w-16 h-16"
                                />
                            )}
                        </Stack>
                    </div>
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
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <Stepper activeStep={activeStep} className="mb-6">
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div className="mb-6">{getStepContent(activeStep)}</div>
            <div className="flex justify-end items-center ">
                <Button
                    onClick={handleBack}
                    className={`w-auto mr-3 bg-transparent text-pine-green-900 hover:bg-transparent ${activeStep === 0 ? "opacity-10 pointer-events-none" : ""}`}
                    title={"Back"}
                />
                {activeStep === steps.length - 1 ? (
                    <Button className={"w-auto"} onClick={handleSubmit} title={"Finish"} />
                ) : (
                    <Button className={"w-auto"}  onClick={handleNext} title={"Next"} />

                )}
            </div>
        </div>
    );
}

export default OnboardingForm;
