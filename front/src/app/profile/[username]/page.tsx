"use client"
import React, { useState } from 'react';
import Layout from "@/components/layout";
import { useUserStore } from "@/store/userStore";
import Avatar from "boring-avatars";
import { avatarPallets } from "@/constants";
import { MdBrush } from "react-icons/md";
import { LuBookmark, LuScroll } from "react-icons/lu";
import { BiCommentDetail, BiHeart } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import PortalModal from "@/components/modal";
import AvatarGenerator from "@/components/avatar-generator";
import { IoCloseOutline } from "react-icons/io5";
import { IoCheckmarkDoneOutline } from "react-icons/io5";


const navItems = [{
  name: "Posts (0)", icon: LuScroll, path: "posts"
}, {
  name: "Comments (0)", icon: BiCommentDetail, path: "comments"
}, {
  name: "Likes (0)", icon: BiHeart, path: "likes"
}, {
  name: "Saved (0)", icon: LuBookmark, path: "saved"
}, {
  name: "Settings", icon: IoSettingsOutline, path: "-"
}]
const Profile = ({children}) => {
  const {user} = useUserStore();
  const params = useParams();
  const pathname = usePathname();
  const [avatarEdit, setAvatarEdit] = useState(false)

  let lastPath = null
  const pathSplit = pathname?.split("/")
  if (pathSplit?.length) {
    lastPath = pathSplit[pathSplit.length - 1];
  }
  console.log("params")
  console.log(params)
  console.log("lastPath", lastPath)

  const isThatUser = user?.username === lastPath;

  return (<Layout>
    <div className={" h-[100vh] overflow-y-auto"}>
      <div className={"w-full border-b-4 border-pine-green-900 h-[7rem] relative px-4"}>
        <div className={"w-full h-full absolute left-0 overflow-hidden"}>
          <div
            className={"absolute inset-0 bg-gradient-to-b from-pine-green-500 via-pine-green-600 to-pine-green-700 opacity-60"}/>
          <img src={"/test2.webp"} className={" left-0 right-0 w-full h-full object-cover object-center"}/>
        </div>
        {user ? <>

          <div className={"absolute bottom-[-5rem] flex items-center"}>
            <Avatar
              className={" border-2 rounded-full border-white"}
              name={'test'}
              colors={avatarPallets[0].colors}
              variant="beam"
              size={100}
            />
            {isThatUser && <MdBrush onClick={() => setAvatarEdit(true)}
                                    className={"absolute w-7 h-7 text-white bottom-[0rem] p-1 border-2 bg-pine-green-700 rounded-full border-white hover:opacity-90 hover:cursor-pointer"}/>}

            <div className={"left-3 bottom-[-0.5rem] relative flex flex-col"}>
              <span className={"text-black relative text-xl font-bold"}>{user?.username}</span>
              <span className={"relative text-xs text-black flex items-start gap-1"}>
                <FaRegCalendarAlt/>
                Joined Apr 2025</span>
            </div>
          </div>


          <div className={"absolute bottom-[0.5rem] right-3 flex items-center justify-center gap-4"}>
            {navItems.map((item) => (<Link
              href={`/profile/${params?.username}/${item.path}`}
              key={item.name}
              className={`${lastPath === item.path ? "text-[#a9fff4]" : "text-white"} relative  text-sm px-2 flex items-center gap-2`}
            >
              {lastPath === item.path ?
                <div className={'absolute bottom-[-0.75rem] left-0 w-full h-[4px] bg-[#84ddd2]'}/> : null}
              <item.icon/>
              <span>{item.name}</span>
            </Link>))}
          </div>
        </> : 'A'}
      </div>
      <div className={"pt-24 px-4"}>
        {children ? children : <div> no children </div>}
      </div>
    </div>
    {
      <PortalModal
        // contentClassName={"bg-white"}
        contentClassName={"bg-[#04786980]"}
        isOpen={avatarEdit}
        onClose={()=> setAvatarEdit(false)} >
        <div className={"flex justify-end"}>
          <IoCloseOutline className={"w-6 h-6 hover:cursor-pointer"} color="white" onClick={() => setAvatarEdit(false)} />
        </div>
        <AvatarGenerator
          renderPalletsInModal={false}
          defaultAvatar={user?.avatar}
          // defaultAvatar={getValues("avatar")}
          onChange={(avatar: Avatar) => {
            console.log(avatar)
          }}
        />

      </PortalModal>
    }
  </Layout>);
};

export default Profile;
