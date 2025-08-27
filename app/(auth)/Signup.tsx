import myasset from "@/assets/myasset";
import userStore from "@/store/userStore";
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
  Alert,
} from "react-native";
import { TextInput, RadioButton } from "react-native-paper";

const { height } = Dimensions.get("window");

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState("");
  const { createUser } = userStore();
  const [error, setError] = useState({
    email: "",
    username: "",
    password: "",
    fullname: "",
    gender : ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasError = (field) => error[field] !== "";

  const handleSubmit = async () => {
    let newErrors = { email: "", username: "", fullname: "", password: "" , gender : ""};

    if (email.trim() === "") newErrors.email = "Email is required";
    if (username.trim() === "") newErrors.username = "Username is required";
    if (fullname.trim() === "") newErrors.fullname = "Fullname is required";
    if (password.trim() === "" || password.trim().length <= 6)
      newErrors.password = "Password required and must be > 6 char";
    if (gender === "") {
      newErrors.gender = "Select Gender"
     
    }

    setError(newErrors);

    if (Object.values(newErrors).some((e) => e !== "")) return;

    if (isSubmitting) return; // prevent multiple submits

    setIsSubmitting(true);

    const data = {
      email: email.trim(),
      password: password.trim(),
      username: username.trim(),
      fullname: fullname.trim(),
      gender,
    };

    try {
      const msg = await createUser(data);
      if (msg.success) {
        router.push({
          pathname : "/(auth)/OtpScreen",
          params : {email,fullname,password,username,gender , type : "Signup"}

        })
      }
      else{
        setIsSubmitting(false);
      }
    } catch (e) {
      Alert.alert("Error", "Failed to sign up. Please try again.");
    }

    setIsSubmitting(false);
  };

  const getInputTheme = (field) => ({
    colors: {
      text: "#fff",
      onSurfaceVariant: hasError(field) ? "red" : "#fff",
      primary: hasError(field) ? "red" : "#5571ffff",
      onSurface: "#fff",
      outline: hasError(field) ? "red" : "#fff",
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
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome Text */}
          <View style={{ marginBottom: 10, marginTop: 80 }}>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 45 }}>
              Welcome
            </Text>
            <Text style={{ color: "#ccc", fontSize: 15 }}>
              Be limitless, be invincible
            </Text>
          </View>

          {/* Signup Heading */}
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 28,
              color: "#fff",
              marginBottom: 20,
            }}
          >
            Sign Up
          </Text>

          {/* Inputs */}
          <TextInput
            label={error.email === "" ? "Email" : error.email}
            mode="outlined"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError((prev) => ({ ...prev, email: "" }));
            }}
            style={{ marginBottom: 10, backgroundColor: "#000", height: height * 0.055 }}
            theme={getInputTheme("email")}
          />
          <TextInput
            label={error.username === "" ? "Username" : error.username}
            mode="outlined"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setError((prev) => ({ ...prev, username: "" }));
            }}
            style={{ marginBottom: 10, backgroundColor: "#000", height: height * 0.055 }}
            theme={getInputTheme("username")}
          />
          <TextInput
            label={error.fullname === "" ? "Fullname" : error.fullname}
            mode="outlined"
            value={fullname}
            onChangeText={(text) => {
              setFullname(text);
              setError((prev) => ({ ...prev, fullname: "" }));
            }}
            style={{ marginBottom: 10, backgroundColor: "#000", height: height * 0.055 }}
            theme={getInputTheme("fullname")}
          />
          <TextInput
            label={error.password === "" ? "Password" : error.password}
            mode="outlined"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError((prev) => ({ ...prev, password: "" }));
            }}
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            style={{ marginBottom: 10, backgroundColor: "#000", height: height * 0.055 }}
            theme={getInputTheme("password")}
          />

          {/* Gender Selection */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ 
  color: hasError('gender') ? "#ff0000ff" : "#fff", 
  fontSize: 16, 
  marginBottom: 10 
}}>
  { hasError('gender') ? "Gender Selection Required" : "Select Gender" }
</Text>
            <RadioButton.Group onValueChange={(value) => {
               setError((prev)=>({...prev,gender : ""}))
              setGender(value)
            }} value={gender}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="Male" color="#5571ffff" />
                  <Text style={{ color: "#fff", fontSize: 16 }}>Male</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="Female" color="#5571ffff" />
                  <Text style={{ color: "#fff", fontSize: 16 }}>Female</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="Others" color="#5571ffff" />
                  <Text style={{ color: "#fff", fontSize: 16 }}>Other</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>

          {/* Buttons */}
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
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              {isSubmitting ? "Loading..." : "Sign Up"}
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
            style={{
              height: height * 0.05,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              borderRadius: 8,
            }}
            onPress={() => router.replace("/(auth)/Login")}
          >
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 16 }}>
              Log In
            </Text>
          </TouchableOpacity>

          {/* ✅ Logo at the bottom */}
          <Image
            source={myasset.images.Logo}
            style={{
              width: "50%",
              height: 50,
              resizeMode: "contain",
              alignSelf: "center",
              borderRadius: 100,
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;
