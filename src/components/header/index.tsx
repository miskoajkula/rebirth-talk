'use client';

import React, { Suspense, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BsSearch } from "react-icons/bs";
import { TiPlus } from "react-icons/ti";
import { LuPlus } from "react-icons/lu";
import { RiNotificationLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef('');

  const pathSplit = pathname.split('/');
  const firstPath = `/${pathSplit[1]}`;

  const searchParams = useSearchParams();
  const search = searchParams.get('query');

  const [drawerExpanded, setDrawerExpanded] = useState(false);
  const [fading, setFading] = useState(false);

  const handleToggle = () => {
    setFading(true);
    setTimeout(() => {
      setDrawerExpanded(!drawerExpanded);
      setFading(false);
    }, 140);
  };

  const drawerClassName = drawerExpanded
    ? 'max-[1024px]:translate-x-0'
    : 'max-[1024px]:translate-x-[-100%]';
  return (
    <Suspense>
      <header className={'w-full bg-white max-[1024px]:sticky max-[1024px]:top-0 max-[1024px]:z-20'}>
        <div
          className={
            'mx-auto flex max-w-[1280px] items-center justify-between max-[1024px]:px-1 max-[768px]:pb-[10px] max-[768px]:pt-[10px]'
          }
        >
          <img
            className={`block w-1/12 transition-opacity duration-300 lg:hidden ${fading ? 'opacity-0' : 'opacity-100'}`}
            src={drawerExpanded ? '/close.svg' : '/hamburger.svg'}
            onClick={() => handleToggle()}
          />

          <Link href="/" className={'flex items-center'}>
            <img src={'/logo-prew2.png'} className={"w-[96px] h-[64px] object-contain max-[768px]:w-[64px]"}/>
            {/*<span className={"text-black text-xl"}>Rebirth Talk</span>*/}
          </Link>

          <div className={'flex w-4/12 max-[1024px]:w-1/12 relative'}>
            <input
              defaultValue={search ?? ''}
              className={
                'w-full bg-gray-100 rounded-2xl border pb-2 pl-4 pt-2 text-black max-[1024px]:hidden'
              }
              placeholder={'Search Rebirth Talk'}
              onChange={(e) => {
                searchRef.current = e.target.value;
              }}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  router.push(`/search?query=${searchRef.current}`);
                }
              }}
            />
            <div
              className={
                'absolute border-l-2 right-0 top-[15%] flex w-[44px] h-[70%] items-center justify-center rounded-r-md bg-denim-700 hover:cursor-pointer max-[1024px]:bg-transparent'
              }
              onClick={() => {
                router.push(`/search?query=${searchRef.current}`);
              }}
            >
              <BsSearch className={'w-[32px] max-[1024px]:w-[24px] max-[1024px]:invert'} color={"gray"} />
            </div>
          </div>

          <div className={'flex gap-8 max-[1024px]:hidden'}>
            <div className={"rounded-xl flex items-center gap-2"}>
              <LuPlus className={'w-[24px] h-[24px]'} color={"black"} />
              <span className={"text-black"}>New</span>
            </div>
            <div className={"flex gap-2"}>
              <RiNotificationLine className={"w-[24px] h-[24px]"} color={"black"}/>
              <FaUserCircle className={"w-[24px] h-[24px]"} color={"black"}/>
            </div>


          </div>
        </div>

        <div
          className={`border-b border-t transition-all max-[1024px]:fixed max-[1024px]:z-50 max-[1024px]:h-full max-[1024px]:w-full max-[1024px]:bg-white ${drawerClassName}`}
        >
          <div
            className={
              'mx-auto flex max-w-[1280px] gap-4 max-[1024px]:h-full max-[1024px]:flex-col max-[1024px]:gap-0 max-[1024px]:overflow-y-scroll max-[1024px]:px-4'
            }
          >
            {new Array(10).map((category) => {
              return (
                <div
                  key={category.name}
                  className={`category-item border-b-2 border-gray-100
                   relative flex items-center gap-1 pb-4 pt-4 text-sm font-bold text-mine-shaft-950 hover:cursor-pointer max-[1024px]:justify-between`}
                >
                  <Link href={`${category?.link}`}>test</Link>
                </div>
              );
            })}
          </div>
        </div>

      </header>
    </Suspense>
  );
};

export default Header;
