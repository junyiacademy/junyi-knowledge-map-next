/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { NextPageWithLayout } from 'next';
import { AppProps } from 'next/app';

declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

declare module 'next' {
  type NextPageWithLayout = NextPage & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
  };
}

declare module 'next/app' {
  type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
  };
}
