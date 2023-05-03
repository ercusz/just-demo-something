import React from "react";
import { SafeAreaView, View } from "react-native";
import SignInWithCredentials from "~/components/SignInWithCredentials";

const SignInScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex bg-[#1F104A] justify-center align-middle w-full h-screen">
      <View className="w-full px-8">
        <SignInWithCredentials />
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
