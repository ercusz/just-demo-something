import SignInScreen from "../screens/sign-in";
import { TRPCProvider } from "../utils/api";
import { tokenCache } from "../utils/cache";
import {
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-expo";
import Constants from "expo-constants";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const RootLayout = () => {
  return (
    <ClerkProvider
      publishableKey={
        Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY as string
      }
      tokenCache={tokenCache}
    >
      <ClerkLoading>
        <SplashScreen />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <TRPCProvider>
            <SafeAreaProvider>
              <Stack
                screenOptions={{
                  headerStyle: {
                    backgroundColor: "#f472b6",
                  },
                }}
              />
              <StatusBar />
            </SafeAreaProvider>
          </TRPCProvider>
        </SignedIn>
        <SignedOut>
          <SignInScreen />
        </SignedOut>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default RootLayout;
