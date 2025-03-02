"use client";

import { useLazyQuery } from "@apollo/client";
import CHECK_ACCOUNT from "../../lib/queries/user.query";
import { useEffect } from "react";
// import { GET_ME } from "api/query/get-me";
// import { userState } from "state/atom/user";
// import { useSetRecoilState } from "recoil";

const RefetchConfig = () => {
  // const setUser = useSetRecoilState(userState);
  //
  const [request] = useLazyQuery(CHECK_ACCOUNT, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "network-only",
    onCompleted: (d) => {

    },
    onError: () => {
      console.log("error");
    }
  });

  useEffect(() => {
    request()
  }, []);

  return null;
};

export default RefetchConfig;
