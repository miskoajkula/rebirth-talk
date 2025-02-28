"use client"

import React, { useEffect } from "react";
import GET_POSTS_BY_USER from "@/lib/queries/posts.query";
import { useLazyQuery } from "@apollo/client";

const UserPosts = () => {

  const [getUserPosts, {loading}] = useLazyQuery(GET_POSTS_BY_USER, {
    fetchPolicy: 'no-cache'
  });

    useEffect(() => {
       getUserPosts({
         variables: {
           username: "test",
           pagination: {
             limit: 10,
             offset: 0
           }
         }
       });
      },[]);

  return (
    <div>
      UserPosts
    </div>
  );
};

export default UserPosts;
