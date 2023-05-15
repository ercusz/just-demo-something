import { useAuth, useUser } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "~/utils/api";

const EmployeeCard: React.FC = () => {
  const { userId, isSignedIn } = useAuth();

  const { data } = api.employee.byId.useQuery(
    {
      userId: userId ?? "",
    },
    {
      enabled: !!isSignedIn,
    },
  );

  return (
    <View className="flex flex-row rounded-lg bg-white/10 p-4">
      <View className="flex-grow">
        <Text className="text-xl font-semibold text-pink-400">
          Your position is {data?.position.name}
        </Text>
        <Text className="text-lg mt-2 text-white">
          Department: {data?.department.name}
        </Text>
      </View>
    </View>
  );
};

const Index = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useAuth();

  const onSignOutPress = async () => {
    await signOut();
  };

  return (
    <SafeAreaView className="bg-[#1F104A]">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page", headerShown: false }} />
      <View className="h-full w-full p-4">
        <Text className="mx-auto pb-2 text-5xl font-bold text-white">
          Create <Text className="text-pink-400">T3</Text> Turbo
        </Text>

        <View className="py-2 text-white">
          {user && (
            <View className="flex items-center flex-row space-x-1 justify-end">
              <View className="mr-2">
                <Text className="text-xl font-semibold text-white text-right">
                  Hello,{" "}
                  <Text className="text-2xl text-pink-400 font-extrabold">
                    {user.fullName}
                  </Text>{" "}
                  👋
                </Text>
                <TouchableOpacity onPress={() => void onSignOutPress()}>
                  <Text className="font-bold uppercase text-pink-400 text-right underline">
                    Sign out
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="rounded border-2 border-pink-400">
                <Image
                  className="w-14 h-14"
                  source={{
                    uri: user.profileImageUrl,
                    width: 56,
                    height: 56,
                  }}
                  alt={`Profile image of ${user.fullName}`}
                />
              </View>
            </View>
          )}
        </View>

        {isLoaded && <EmployeeCard />}
      </View>
    </SafeAreaView>
  );
};

export default Index;
