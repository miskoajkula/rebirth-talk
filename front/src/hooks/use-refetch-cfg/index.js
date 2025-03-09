"use client";
import { useEffect } from "react";

import { useLazyQuery } from "@apollo/client";
import GET_CONFIG from "../../lib/queries/common.query";
import { useConfigStore } from "../../store/cfgStore";

const RefetchConfig = () => {
  const { setCfg } = useConfigStore();

  const [request] = useLazyQuery(GET_CONFIG, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "network-only",
    onCompleted: (res) => {
      if (res.getConfig) {
        setCfg({
          labels: res.getConfig.tags,
          communities: res.getConfig.communities,
        });
      }
    },
    onError: () => {
      console.log("error");
    },
  });

  useEffect(() => {
    request();
  }, []);

  return null;
};

export default RefetchConfig;
