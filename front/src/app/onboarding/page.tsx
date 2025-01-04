"use client"
import React, { useState } from 'react';

import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Typography,
  Avatar,
  FormControlLabel,
  Checkbox,
  Stack,
  FormGroup,
  FormLabel,
  IconButton,
  Grid,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
/**
 * Example data you might pass in or define:
 * - Available Avatars
 * - List of communities
 * - List of post kinds
 */
const AVAILABLE_AVATARS = [
  '/images/avatar1.png',
  '/images/avatar2.png',
  '/images/avatar3.png',
];
const COMMUNITIES = ['Recovery', 'Mental Health', 'Lifestyle', 'Nutrition'];
const POST_KINDS = ['Success Stories', 'Confessions', 'Struggles & Strength'];

const steps = ['Username', 'Avatar', 'Focus Communities', 'Post Kinds'];

function OnboardingForm() {
  const [activeStep, setActiveStep] = useState(0);

  // Store all user inputs in one state object
  const [formData, setFormData] = useState({
    username: '',
    avatar: '',
    focusCommunities: [],
    postKinds: [],
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Called at final step
  const handleSubmit = () => {
    // Implement your final form submission logic here
    alert(JSON.stringify(formData, null, 2));
  };

  // Helpers for setting data
  const handleUsernameChange = (e) => {
    setFormData({ ...formData, username: e.target.value });
  };

  const handleAvatarSelect = (avatarPath) => {
    setFormData({ ...formData, avatar: avatarPath });
  };

  const handleAvatarUpload = (file) => {
    // You might want to do actual uploading to a server here
    // For simplicity, just store the file name or base64 as the avatar
    const fileURL = URL.createObjectURL(file);
    setFormData({ ...formData, avatar: fileURL });
  };

  const handleFocusCommunitiesChange = (community) => {
    const updated = [...formData.focusCommunities];
    if (updated.includes(community)) {
      // remove
      const idx = updated.indexOf(community);
      updated.splice(idx, 1);
    } else {
      // add
      updated.push(community);
    }
    setFormData({ ...formData, focusCommunities: updated });
  };

  const handlePostKindsChange = (kind) => {
    const updated = [...formData.postKinds];
    if (updated.includes(kind)) {
      const idx = updated.indexOf(kind);
      updated.splice(idx, 1);
    } else {
      updated.push(kind);
    }
    setFormData({ ...formData, postKinds: updated });
  };

  // Dynamically render step content
  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Typography variant="h6" mb={2}>
              Choose a username
            </Typography>
            <TextField
              fullWidth
              label="Username"
              value={formData.username}
              onChange={handleUsernameChange}
            />
          </Box>
        );

      case 1:
        return (
          <Box sx={{ width: '100%', maxWidth: 600 }}>
            <Typography variant="h6" mb={2}>
              Choose or Upload an Avatar
            </Typography>

            {/* Predefined avatars */}
            <Stack direction="row" spacing={2} mb={2}>
              {AVAILABLE_AVATARS.map((avatarPath) => (
                <Avatar
                  key={avatarPath}
                  src={avatarPath}
                  alt="avatar"
                  sx={{
                    width: 60,
                    height: 60,
                    border:
                      formData.avatar === avatarPath
                        ? '3px solid #1976d2'
                        : '2px solid #ccc',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleAvatarSelect(avatarPath)}
                />
              ))}
            </Stack>

            {/* OR user upload */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button
                variant="contained"
                component="label"
                startIcon={<PhotoCameraIcon />}
              >
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
                  sx={{ width: 60, height: 60 }}
                />
              )}
            </Stack>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Typography variant="h6" mb={2}>
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
          </Box>
        );

      case 3:
        return (
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Typography variant="h6" mb={2}>
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
          </Box>
        );

      default:
        return (
          <Typography variant="body1">
            Something went wrong... no such step.
          </Typography>
        );
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 700,
        margin: '0 auto',
        p: 4,
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" mb={2} align="center">
        Rebirth Talk Onboarding
      </Typography>

      {/* Stepper Header */}
      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {/* Step Content */}
      <Box mb={4}>{getStepContent(activeStep)}</Box>

      {/* Navigation Buttons */}
      <Grid container justifyContent="space-between">
        <Grid item>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
        </Grid>
        <Grid item>
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Finish
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}


const App = () => {
  return <div style={{padding: '2rem', backgroundColor: '#f0f2f5', minHeight: '100vh'}}>
    <OnboardingForm/>
  </div>
}
export default App;
