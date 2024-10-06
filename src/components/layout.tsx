import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';

import { Didact_Gothic, Hind } from 'next/font/google'

const roboto = Hind({
  subsets: ['latin'],
  display: 'swap',
  variable: true,
  weight: ['300','400', '500', '600', '700']
});

const Layout = ({ children }: any) => {
  return (
    <div className={roboto.className}>
      <Header />
      <main className={'mx-auto max-w-[1280px] max-[1024px]:px-1.5'}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
