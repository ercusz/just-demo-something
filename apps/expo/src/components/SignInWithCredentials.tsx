import { useSignIn } from "@clerk/clerk-expo";
import { type ClerkAPIError } from "@clerk/types";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const SignInWithCredentials = () => {
  const { signIn, setSession, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setSession(completeSignIn.createdSessionId);
    } catch (err: unknown) {
      const clerkErr = err as {
        errors?: ClerkAPIError[];
      };

      console.error(
        "Error during login:",
        clerkErr?.errors && clerkErr?.errors?.length > 0
          ? clerkErr?.errors
          : err,
      );
    }
  };

  return (
    <View className="rounded-lg border-2 border-gray-500 p-4 flex gap-2">
      <View>
        <Text className="mx-auto pb-2 text-5xl font-bold text-white">
          Sign in with <Text className="text-pink-400">Credentials</Text>
        </Text>
      </View>
      <View>
        <TextInput
          className="border-gray-30s0 block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email/Username..."
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </View>

      <View>
        <TextInput
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity
        className="text-white bg-[#f472b6] hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm py-2.5 mb-2"
        onPress={() => void onSignInPress()}
      >
        <Text className="text-center font-semibold text-white">
          Sign in with Credentials
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInWithCredentials;
