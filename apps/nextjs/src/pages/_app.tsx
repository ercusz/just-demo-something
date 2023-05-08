// src/pages/_app.tsx
import { Toaster } from "@acme/ui";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "~/utils/api";
import "../styles/globals.css";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
// include styles from the ui package
import "@acme/ui/styles.css";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ClerkProvider {...pageProps}>
      {getLayout(<Component {...pageProps} />)}
      <Toaster />
    </ClerkProvider>
  );
}

export default api.withTRPC(MyApp);
