import myasset from "@/assets/myasset";
import userStore from "@/store/userStore";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator
} from "react-native";
import { TextInput } from "react-native-paper";

const { height } = Dimensions.get("window");

const ResetPass = () => {
  const { ResetPassword } = userStore();
  const params = useLocalSearchParams();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasError = error !== "";

  const handleSubmit = async () => {
    if (password.trim() === "" || password.trim().length <= 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    const data = {
      email: params.email,
      password: password.trim(),
    };

    try {
      const msg = await ResetPassword(data);

      if (msg.success) {
        router.replace({
          pathname: "/(auth)/UploadDetail",
          params: { email: params.email, isNewUser: "No" },
        });
      } else {
        setError(msg.message || "Failed to reset password. Please try again.");
      }
    } catch (e) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputTheme = () => ({
    colors: {
      text: "#fff",
      onSurfaceVariant: hasError ? "red" : "#fff",
      primary: hasError ? "red" : "#5571ffff",
      onSurface: "#fff",
      outline: hasError ? "red" : "#fff",
    },
    fonts: {
      bodyLarge: { fontSize: 18 },
      labelLarge: { fontSize: 18 },
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 25,
            paddingBottom: 50,
            paddingTop: height * 0.1,
            alignItems: 'center'
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <Image
            source={myasset.images.Logo}
            style={{
              width: "50%",
              height: 100,
              resizeMode: "contain",
              alignSelf: "center",
              borderRadius: 100,
              marginBottom: 20
            }}
          />

          {/* Heading */}
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 28,
              color: "#fff",
              marginBottom: 20,
              textAlign: "center"
            }}
          >
            Reset Your Password
          </Text>

          {/* Password Input */}
          <TextInput
            label={hasError ? error : "New Password"}
            mode="outlined"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError("");
            }}
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
                color={hasError ? 'red' : '#fff'}
              />
            }
            style={{ 
              marginBottom: 20, 
              backgroundColor: "#000", 
              height: height * 0.055,
              width: '100%'
            }}
            theme={getInputTheme()}
          />
          
          {/* Reset Password Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isSubmitting}
            style={{
              height: height * 0.05,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#1703fcff",
              borderRadius: 8,
              opacity: isSubmitting ? 0.6 : 1,
              width: '100%'
            }}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                Reset Password
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPass;