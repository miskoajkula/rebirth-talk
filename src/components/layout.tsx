import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';

import { Didact_Gothic, Hind } from 'next/font/google'
import { FaBook, FaChartLine, FaChevronRight, FaHeart, FaPenFancy, FaTrophy, FaUsers } from "react-icons/fa";
import { BsFillChatQuoteFill } from "react-icons/bs";
import Sidebar from "@/components/sidebar";

const roboto = Hind({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300','400', '500', '600', '700']
});

const Layout = ({ children }: any) => {
  return (
    <div className={roboto.className}>
      <Header />
      <main className={'mx-auto max-w-[1280px] max-[1024px]:px-1.5 flex'}>
        <Sidebar />
        <div className={"flex w-full flex-col h-[100vh] overflow-y-scroll p-4"}>
          {children}
        </div>
      </main>
      {/*<Footer/>*/}
    </div>
  );
};

export default Layout;
