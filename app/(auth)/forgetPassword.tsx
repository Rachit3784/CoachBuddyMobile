import React, { useState, useEffect } from "react";
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
} from "react-native";
import { TextInput } from "react-native-paper";
import { router } from "expo-router";
import userStore from "@/store/userStore";
import myasset from "@/assets/myasset";

const { height } = Dimensions.get("window");

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { forgetPasswordRequest } = userStore();

  // Validate email format
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // Controls if Reset button is disabled
  const isResetDisabled = () => {
    return !validateEmail(email) || isSubmitting;
  };

  const getInputTheme = () => ({
    colors: {
      text: "#fff",
      onSurfaceVariant: error ? "red" : "#fff",
      primary: error ? "red" : "#5571ffff",
      onSurface: "#fff",
      outline: error ? "red" : "#fff",
    },
    fonts: {
      bodyLarge: { fontSize: 18 },
      labelLarge: { fontSize: 18 },
    },
  });

  

  const handleReset = async () => {
    setError("");
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    setIsSubmitting(true);
    const response = await forgetPasswordRequest(email);

    setIsSubmitting(false);
    
    if (response.success) {
      // Navigate to OTP screen with email param
      router.push({
        pathname: "/(auth)/OtpScreen",
        params: {email , type : "forget" },
      });
    } else {
      setError(response || "Failed to send OTP. Try again.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 25, paddingBottom: 50 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome Text */}
          <View style={{ marginBottom: 80, marginTop: 80 }}>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 45 }}>
              Forgot Password
            </Text>
            <Text style={{ color: "#ccc", fontSize: 15 }}>
              Enter your email to reset password
            </Text>
          </View>

          {/* Email Input */}
          <TextInput
            label={error ? error : "Email"}
            mode="outlined"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError("");
            }}
            style={{ marginBottom: 10, backgroundColor: "#000", height: height * 0.055 }}
            theme={getInputTheme()}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Reset Password Button */}
          <TouchableOpacity
            onPress={handleReset}
            disabled={isResetDisabled()}
            style={{
              height: height * 0.05,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isResetDisabled() ? "#555" : "#1703fcff",
              borderRadius: 8,
              marginVertical: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Reset Password
            </Text>
          </TouchableOpacity>

          {/* Logo at bottom */}
          <Image
            source={myasset.images.Logo}
            style={{
              width: "50%",
              height: 50,
              resizeMode: "contain",
              alignSelf: "center",
              borderRadius: 100,
              marginTop: 50,
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
