import React from 'react';
import Profile from "@/app/profile/[username]/page";
import UserPosts from "@/components/user/profile-posts";

const Page = () => {
  return (
    <Profile>
      <UserPosts/>
    </Profile>
  );
};

export default Page;
