"use client"
import React from 'react';
import Layout from "@/components/layout";
import { useUserStore } from "@/store/userStore";
import Avatar from "boring-avatars";
import { avatarPallets } from "@/constants";
import { MdBrush } from "react-icons/md";


const Profile = () => {
  const {user} = useUserStore();

  return (<Layout>
    <div className={" h-[100vh] overflow-y-auto"}>
      <div className={"w-full bg-pine-green-700 h-[7rem] relative px-4"}>
        {user ? <>

          <div className={"absolute bottom-[-3rem]"}>
            <Avatar
              className={" border-2 rounded-full border-white"}
              name={'test'}
              colors={avatarPallets[0].colors}
              variant="beam"
              size={100}
            />
            <MdBrush className={"absolute w-7 h-7 bottom-[0rem] p-1 border-2 bg-pine-green-700 rounded-full border-white"}/>
          </div>


        </> : 'A'}
      </div>
    </div>
  </Layout>);
};

export default Profile;
