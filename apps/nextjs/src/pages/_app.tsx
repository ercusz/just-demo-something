// src/pages/_app.tsx
import { Toaster } from "@acme/ui";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppType } from "next/app";
import { api } from "~/utils/api";
import "../styles/globals.css";
// include styles from the ui package
import "@acme/ui/styles.css";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
      <Toaster />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
