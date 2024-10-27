import React, { FC } from 'react'
import { BiCommentDetail, BiHeart, BiShare } from "react-icons/bi";
import { BiSolidBadgeCheck } from "react-icons/bi";

interface PostCardProps {
  isSuccess?: boolean;
}

const PostCard: FC<PostCardProps> = ({isSuccess}) => {
  return (
    <div className="flex flex-col w-full  mx-auto my-6 border-b-2">
      <div className="md:flex">
        <div className="flex-shrink-0">
          <img
            className="h-12 w-12 rounded-full mx-4 mt-4"
            src="https://via.placeholder.com/150" // Replace with an actual image URL
            alt="User Profile"
          />
        </div>
        <div className="p-4">
          <div className={"flex gap-2 items-center"}>
            <div className="tracking-wide text-sm text-gray-500">#show • 4d</div>
            <div className={"flex gap-1 items-center"}>
              <BiSolidBadgeCheck/>
              <span>Success story</span>
            </div>
          </div>
          <p className="mt-1 text-lg font-semibold text-black">
            I recently started documenting my thoughts while coding!
          </p>
          <p className="mt-1 text-gray-700">
            Initially, it feels more of a time-consuming thing, but it helps a lot in clear thinking, reducing the complexities and you can
            make sure that nothing is overlooked.
          </p>
          <p className="mt-2 text-gray-700">
            So far, liking this process.
          </p>
          <div className="flex items-center mt-4 gap-8">
            <button className="text-gray-500 text-sm flex items-center gap-1">
              <BiHeart className={"w-[16px] h-[16px]"}/>
              <span>12</span>
            </button>
            <button className="text-gray-500 text-sm flex items-center gap-1">
              <BiCommentDetail color={'text-gray-500'} className={"w-[16px] h-[16px]"}/>
              <span>12</span>
            </button>
            <button className="text-gray-500 text-sm  flex items-center gap-1">
              <BiShare color={'text-gray-500'} className={'w-[16px] h-[16px] scale-x-[-1]'}/>
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
