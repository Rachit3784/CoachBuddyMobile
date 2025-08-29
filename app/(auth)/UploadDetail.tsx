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
  Alert,
} from "react-native";
import { TextInput } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import myasset from "@/assets/myasset";
import userStore from "@/store/userStore";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

const UserDetailScreen = () => {

    
   const params= useLocalSearchParams();
    
   const isNewUser = params?.isNewUser === "yes" ? true :  false
   console.log(isNewUser)

  const { userProfileData, updateUserProfile , userModelID , setMode } = userStore();

  const [keywords, setKeywords] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState({
    keywords: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // UseEffect to pre-fill data for existing users
  useEffect(() => {
    if (userProfileData && userProfileData.UserKeyWord) {
      setKeywords(userProfileData.UserKeyWord.join(", "));
    }
    if (userProfileData && userProfileData.UserDescription) {
      setDescription(userProfileData.UserDescription);
    }
  }, [userProfileData]);

  const hasError = (field) => error[field] !== "";

  const handleUpdate = async () => {

    let newErrors = { keywords: "", description: "" };
    if (keywords.trim() === "") {
      newErrors.keywords = "Keywords are required";
    }
    if (description.trim() === "") {
      newErrors.description = "Description is required";
    }
    setError(newErrors);

    if (Object.values(newErrors).some((e) => e !== "")) return;

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const data = {
        UserKeyWords: keywords.split(",").map((kw) => kw.trim()),
        UserDescription: description.trim(),
        userId : userModelID
      };

      
      const response = await updateUserProfile(data); // Assume this function updates both local store and the backend
      
      if (response.success) {
        Alert.alert("Success", response.message || "Profile updated successfully!");
         await setMode('User') 
         console.log("I am called")
         router.replace("/(main)");
      } else {
        Alert.alert("Error", response.message || "Failed to update profile. Please try again.");
      }
    } catch (e) {
      console.error("Update failed:", e);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
          {/* Back Button */}
          {!isNewUser && (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                position: "absolute",
                top: 50,
                left: 20,
                zIndex: 1,
              }}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          )}

          {/* Logo and Header */}
          <View style={{ marginTop: isNewUser ? 80 : 100, marginBottom: 20, alignItems: "center" }}>
            <Image
              source={myasset.images.Logo}
              style={{
                width: 120,
                height: 120,
                resizeMode: "contain",
                borderRadius: 20,
              }}
            />
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 24, marginTop: 10 }}>
              {isNewUser ? "Upload your Profile Details" : "Update your Profile Details"}
            </Text>
          </View>

          {/* Keywords Input */}
          <TextInput
            label={error.keywords === "" ? "User Keywords (e.g., Engineer, Dr. )" : error.keywords}
            mode="outlined"
            value={keywords}
            onChangeText={(text) => {
              setKeywords(text);
              setError((prev) => ({ ...prev, keywords: "" }));
            }}
            style={{ marginBottom: 10, backgroundColor: "#000" }}
            theme={getInputTheme("keywords")}
          />
          <Text style={{ color: "#ccc", marginBottom: 20 }}>
            Separate keywords with commas.
          </Text>

          {/* Description Input */}
          <TextInput
            label={error.description === "" ? "User Description" : error.description}
            mode="outlined"
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              setError((prev) => ({ ...prev, description: "" }));
            }}
            multiline={true}
            numberOfLines={4}
            maxLength={300}
            style={{ marginBottom: 10, backgroundColor: "#000", minHeight: 120 }}
            theme={getInputTheme("description")}
          />
          <Text style={{ color: "#ccc", textAlign: "right", marginBottom: 20 }}>
            {description.length}/300 words
          </Text>

          {/* Buttons */}
          <TouchableOpacity
            onPress={handleUpdate}
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
              {isSubmitting ? "Loading..." : isNewUser ? "Add Details" : "Update Details"}
            </Text>
          </TouchableOpacity>
          
          {isNewUser && (
            <TouchableOpacity
              onPress={() =>{
                router.replace("/(main)")} }
              style={{
                height: height * 0.05,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
                borderRadius: 8,
                marginTop: 10,
                borderColor : "white",
                borderWidth : 1,
                
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                Skip for Now
              </Text>
            </TouchableOpacity>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UserDetailScreen;