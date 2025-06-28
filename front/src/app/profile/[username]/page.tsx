"use client";
import React, { useState } from "react";
import Layout from "@/components/layout";
import { useUserStore } from "@/store/userStore";
import { MdBrush } from "react-icons/md";
import { LuBookmark, LuScroll } from "react-icons/lu";
import { BiCommentDetail, BiHeart } from "react-icons/bi";
import { IoCloseOutline, IoSettingsOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import PortalModal from "@/components/modal";
import AvatarGenerator, { Avatar } from "@/components/avatar-generator";
import { useMutation } from "@apollo/client";
import UPDATE_PROFILE from "@/lib/mutations/update-profile.mutation";
import toast from "react-hot-toast";
import BAvatar from "boring-avatars";
import { FiEdit2 } from "react-icons/fi";
import UsernameEdit from "@/components/username-edit";
import UserPosts from "@/components/user/profile-posts";
import { formatJoinDate } from "@/functions";

const navItems = [
  {
    name: "Posts (0)",
    icon: LuScroll,
    path: "posts",
  },
  {
    name: "Comments (0)",
    icon: BiCommentDetail,
    path: "comments",
  },
  {
    name: "Likes (0)",
    icon: BiHeart,
    path: "likes",
  },
  {
    name: "Saved (0)",
    icon: LuBookmark,
    path: "saved",
  },
  {
    name: "Settings",
    icon: IoSettingsOutline,
    path: "-",
  },
];
const Profile = ({ children }) => {
  const { user, setUser } = useUserStore();
  const params = useParams();
  const pathname = usePathname();
  const [avatarEdit, setAvatarEdit] = useState(false);
  const [usernameEdit, setUsernameEdit] = useState(false);
  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-right", duration: 6000 });
    },
  });

  let lastPath = null;
  let pathBef = null;
  const pathSplit = pathname?.split("/");
  if (pathSplit?.length) {
    lastPath = pathSplit[pathSplit.length - 1];
    pathBef = pathSplit[pathSplit.length - 2];
  }

  console.log(user);
  const isThatUser = user?.username === lastPath || user?.username === pathBef;

  const isNavPath = navItems.some((item) => item.path === lastPath);
  const activeNavPath = isNavPath ? lastPath : "posts";

  return (
    <Layout>
      <div className={" h-[100vh] overflow-y-auto"}>
        <div className={"w-full border-b-4 border-pine-green-900 h-[7rem] relative px-4"}>
          <div className={"w-full h-full absolute left-0 overflow-hidden"}>
            <div
              className={
                "absolute inset-0 bg-gradient-to-b from-pine-green-500 via-pine-green-600 to-pine-green-700 opacity-60"
              }
            />
            <img
              src={"/test2.webp"}
              className={" left-0 right-0 w-full h-full object-cover object-center"}
            />
          </div>
          {user ? (
            <>
              <div className={"absolute bottom-[-5rem] flex items-center"}>
                <BAvatar
                  className={" border-2 rounded-full border-white"}
                  colors={user?.avatar?.colors}
                  name={user?.avatar?.name}
                  variant="beam"
                  size={100}
                />
                {isThatUser && (
                  <MdBrush
                    onClick={() => setAvatarEdit(true)}
                    className={
                      "absolute w-7 h-7 text-white bottom-[0rem] p-1 border-2 bg-pine-green-700 rounded-full border-white hover:opacity-90 hover:cursor-pointer"
                    }
                  />
                )}

                <div
                  className={"left-3 bottom-[-0.5rem] relative flex flex-col items-start"}
                >
                  <span
                    className={
                      "text-black relative text-xl font-bold flex items-start justify-center gap-1"
                    }
                  >
                    {user?.username}
                    {isThatUser && (
                      <FiEdit2
                        className={
                          "text-lg hover:cursor-pointer opacity-30 hover:opacity-90"
                        }
                        onClick={() => setUsernameEdit(true)}
                      />
                    )}
                  </span>
                  <span className={"relative text-xs text-black flex items-start gap-1"}>
                    <FaRegCalendarAlt />
                    {formatJoinDate(user?.createdAt)}
                  </span>
                </div>
              </div>

              <div
                className={
                  "absolute bottom-[0.5rem] right-3 flex items-center justify-center gap-4"
                }
              >
                {navItems.map((item) => (
                  <Link
                    href={`/profile/${params?.username}/${item.path}`}
                    key={item.name}
                    className={`${lastPath === item.path ? "text-[#a9fff4]" : "text-white"} relative  text-sm px-2 flex items-center gap-2`}
                  >
                    {activeNavPath === item.path ? (
                      <div
                        className={
                          "absolute bottom-[-0.75rem] left-0 w-full h-[4px] bg-[#84ddd2]"
                        }
                      />
                    ) : null}
                    <item.icon />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            "A"
          )}
        </div>
        <div className={"pt-24 px-4"}>{children ? children : <UserPosts />}</div>
      </div>

      {/*Avatar edit*/}
      {
        <PortalModal
          // contentClassName={"bg-white"}
          contentClassName={"bg-[#04786980] max-w-2xl"}
          isOpen={avatarEdit}
          onClose={() => setAvatarEdit(false)}
        >
          <div className={"flex justify-end"}>
            <IoCloseOutline
              className={"w-6 h-6  hover:cursor-pointer"}
              color="white"
              onClick={() => setAvatarEdit(false)}
            />
          </div>
          <AvatarGenerator
            renderPalletsInModal={false}
            defaultAvatar={user?.avatar}
            onChange={(avatar: Avatar) => {
              if (user !== null) {
                setUser({ ...user, avatar: avatar });
              }

              updateProfile({
                variables: {
                  payload: {
                    avatar: avatar,
                  },
                },
              });

              setAvatarEdit(false);
              toast.success("Avatar updated!");
            }}
          />
        </PortalModal>
      }

      <PortalModal
        wrapperClassName={"height-auto"}
        contentClassName={"w-4/12 bg-white height-auto"}
        isOpen={usernameEdit}
        onClose={() => setUsernameEdit(false)}
      >
        <div className={"flex justify-between items-center mb-2"}>
          <span>Username</span>
          <IoCloseOutline
            className={"w-6 h-6 hover:cursor-pointer"}
            color="black"
            onClick={() => setUsernameEdit(false)}
          />
        </div>
        <UsernameEdit onCancel={() => setUsernameEdit(false)} />
      </PortalModal>
    </Layout>
  );
};

export default Profile;
