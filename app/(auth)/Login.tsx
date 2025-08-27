import myasset from "@/assets/myasset";
import { router } from "expo-router";
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
} from "react-native";
import { TextInput } from "react-native-paper";
import userStore from "@/store/userStore";

const { height } = Dimensions.get("window");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });
  const { login , SetLoggedIn } = userStore();

  const hasError = (field) => error[field] !== "";

  const getinputTheme = (field) => ({
    colors: {
      text: "#ffffffff",
      primary: hasError(field) ? "red" : "#5571ffff",
      placeholder: "#ccc",
      background: "#000",
      outline: "#ffffffff",
      error: "red",
      onSurfaceVariant: hasError(field) ? "red" : "#fff",
      onSurface: "#fff",
    },
    fonts: {
      bodyLarge: { fontSize: 18 },
      labelLarge: { fontSize: 18 },
    },
  });

  const handleSubmit = async () => {
    const newError = { email: "", password: "" };

    if (email.trim() === "") {
      newError.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newError.email = "Email is invalid";
    }

    if (password.trim() === "") {
      newError.password = "Password is required";
    } else if (password.length < 8) {
      newError.password = "Password must be at least 8 characters";
    }

    setError(newError);

    if (Object.values(newError).some((e) => e !== "")) return;

    const data = {
      email: email.trim(),
      password: password.trim(),
    };

    const response = await login(data);
     
    if (response.success) {
      
     router.replace({
               pathname: "/(auth)/UploadDetail",
               params: { email: email, isNewUser: "No" },
             });

    } else {
      // Show appropriate error message: you can improve this if you want
      console.log(response.message)
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#000" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingHorizontal: 25,
            paddingBottom: 40,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Welcome Text */}
          <View style={{ marginBottom: 40 }}>
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 45,
                textAlign: "center",
              }}
              accessibilityLabel="Welcome message"
            >
              Welcome
            </Text>
            <Text
              style={{ color: "#ccc", fontSize: 15, textAlign: "center" }}
              accessibilityLabel="Motivational tagline"
            >
              Be limitless, be invincible
            </Text>
          </View>

          {/* Login Heading */}
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 28,
              color: "#fff",
              marginBottom: 30,
              textAlign: "center",
            }}
            accessibilityRole="header"
          >
            Log In
          </Text>

          {/* Inputs */}
          <TextInput
            label={hasError("email") ? error.email : "Email"}
            mode="outlined"
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(text) => {
              setError((prev) => ({ ...prev, email: "" }));
              setEmail(text);
            }}
            style={{ marginBottom: 20, backgroundColor: "#000" }}
            theme={getinputTheme("email")}
            error={hasError("email")}
            accessibilityLabel="Email input"
            accessibilityHint="Enter your email address"
          />

          <TextInput
            label={hasError("password") ? error.password : "Password"}
            mode="outlined"
            value={password}
            secureTextEntry={!showPassword}
            right={
              password ? (
                <TextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={() => setShowPassword(!showPassword)}
                  accessibilityLabel={showPassword ? "Hide password" : "Show password"}
                  accessibilityRole="button"
                />
              ) : null
            }
            style={{ marginBottom: 15, backgroundColor: "#000" }}
            onChangeText={(text) => {
              setError((prev) => ({ ...prev, password: "" }));
              setPassword(text);
            }}
            theme={getinputTheme("password")}
            error={hasError("password")}
            accessibilityLabel="Password input"
            accessibilityHint="Enter your password"
          />

          {/* Buttons */}
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              height: height * 0.05,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#1703fcff",
              borderRadius: 8,
              marginBottom: 15,
              opacity: Object.values(error).some((e) => e !== "") ? 0.6 : 1,
            }}
            disabled={Object.values(error).some((e) => e !== "")}
            accessibilityRole="button"
            accessibilityLabel="Log In Button"
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Log In
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              color: "#aaa",
              fontWeight: "500",
              fontSize: 16,
              textAlign: "center",
              marginVertical: 8,
            }}
          >
            Or
          </Text>

          <TouchableOpacity
            onPress={() => router.replace("/(auth)/Signup")}
            style={{
              height: height * 0.05,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              borderRadius: 8,
              marginBottom: 5,
            }}
            accessibilityRole="button"
            accessibilityLabel="Create Account Button"
          >
            <Text style={{ color: "black", fontWeight: "500", fontSize: 16 }}>
              Create Account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(auth)/forgetPassword")}
            style={{ marginBottom: 30 }}
            accessibilityRole="button"
            accessibilityLabel="Forgot Password Button"
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "500",
                textAlign: "center",
                textDecorationLine: "underline",
              }}
            >
              Forgot Password ?
            </Text>
          </TouchableOpacity>

          <Image
            source={myasset.images.Logo}
            style={{
              width: "100%",
              height: 100,
              resizeMode: "contain",
              alignSelf: "center",
              borderRadius: 100,
            }}
            accessibilityLabel="App Logo"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
