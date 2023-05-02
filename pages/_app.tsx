import React from 'react';
import type { AppPropsWithLayout } from 'next/app';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page: React.ReactElement): React.ReactNode => page);
  return getLayout(<Component {...pageProps} />);
}
