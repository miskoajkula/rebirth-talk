import React, { Suspense, useEffect } from "react";
import Header from "@/components/header";

import { Hind } from "next/font/google";
import Sidebar from "@/components/sidebar";
import RightSidebar from "@/components/sidebar/right-sidebar";
import UseRefetchCfg from "@/hooks/use-refetch-cfg";

const roboto = Hind({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const Layout = ({ children }: any) => {
  return (
    <div className={roboto.className}>
      <UseRefetchCfg />
      <Suspense>
        <Header />
      </Suspense>
      <main className={"mx-auto max-w-[1280px] max-[1024px]:px-1.5 flex"}>
        <Sidebar />
        <div
          className={"flex w-full flex-col h-[90vh] overflow-y-scroll bg-gray-50"}
          id={"main-content"}
        >
          {children}
        </div>
        <RightSidebar />
      </main>
    </div>
  );
};

export default Layout;
