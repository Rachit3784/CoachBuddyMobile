import userStore from "@/store/userStore";
import { useLocalSearchParams, router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from "react-native";
import { TextInput } from "react-native-paper";
import { withDecay } from "react-native-reanimated";


const {width , height} = Dimensions.get('window')
// ⏳ Timer Component (isolated re-render)
const CountdownTimer = ({ start = 59, onComplete }) => {
  const [time, setTime] = useState(start);
  
  React.useEffect(() => {
    if (time === 0) {
      onComplete?.();
      return;
    }
    const interval = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [time]);

  return <Text style={{ color: "gray" }}>Resend OTP in {time}s</Text>;
};


const OtpScreen = () => {
  const [otp, setOTP] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const refObj = useRef([]);
  const [ActionType , setActionType] = useState("SignUP")
  const { verifyNewUser , createUser , verifyForgottedUser , forgetPasswordRequest}  = userStore();

  const  params = useLocalSearchParams();

  useEffect(()=>{
    if(params.type === "forget") {
      setActionType("forget")
    }
  },[])
  

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // Only numbers

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Auto focus next
    if (value && index < otp.length - 1) {
      refObj.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      refObj.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 6) {
      setError("Invalid OTP");
      return;
    }

    setError("");
    try {
      let response
      if(ActionType === 'forget'){
        console.log("Hello Ji How do you do")
         response = await verifyForgottedUser({ email: params.email, code });

      }else {
        console.log("Signup Verified Called")
         response = await verifyNewUser({ email: params.email, code });
      }
      
     

      if (response.success) {
        
        if(ActionType === 'forget'){
          console.log("Dekho mai aa gaya ")
          router.replace({
            pathname : "/(auth)/ResetPassword",
            params : {email : params.email}
          })
        }
        else{
router.replace({
          pathname : "/(auth)/UploadDetail" , 
           params : { email: params.email ,  isNewUser : "yes"}
        });

        
        }
        

      } else {
        
        setError("OTP verification failed. Try again.");
      }
    } catch (e) {
      setError("An error occurred during verification");
    }
  };

  const handleResend = async () => {
    setError("");
    setOTP(Array(6).fill(""));
    setIsResendDisabled(true);
    refObj.current[0]?.focus();
    console.log(params)
    if(ActionType === 'forget'){
       console.log("Hello Ji How do you do i am resu resu")
const msg = await forgetPasswordRequest(params.email)
    }
    else{
const msg = await createUser({...params});
    }
     

  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "black" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingVertical: 40,
          paddingHorizontal: 20,
          backgroundColor: "black",
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            backgroundColor: "#1e1e1e",
            borderRadius: 12,
            padding: 20,
            alignItems: "center",
            shadowColor: "white",
            shadowOpacity: 0.2,
            elevation: 5,
            maxWidth: 400,
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18, marginBottom: 10, textAlign: "center" }}>
            OTP sent to: <Text style={{ fontWeight: "bold", color: "#aaa" }}>{params.email}</Text>
          </Text>
          <Text style={{ color: "gray", marginBottom: 20, textAlign: "center" }}>
            Please verify the OTP
          </Text>

          {/* OTP Inputs */}
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems : 'center' , width : width, marginBottom: 20 }}>
            {otp.map((item, index) => (
              <TextInput
                key={index}
                mode="outlined"
                value={otp[index]}
                maxLength={1}
                ref={(el) => (refObj.current[index] = el)}
                onChangeText={(text) => {
                  setError("");
                  handleChange(text, index);
                }}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="numeric"
                style={{
                  width: 45,
                  height: 45,
                  marginHorizontal: 5,
                  backgroundColor: "#2c2c2c",
                  color: "white",
                  fontWeight: "bold",
                }}
                theme={{
                  colors: {
                    text: "white",
                    placeholder: "gray",
                    onSurface: "#fff",
                    primary: "white",
                    background: "#2c2c2c",
                  },
                }}
              />
            ))}
          </View>

          {/* Error Message */}
          {error ? (
            <Text style={{ color: "#f44336", fontSize: 16, marginBottom: 10 }}>{error}</Text>
          ) : null}

          {/* Verify Button */}
          <TouchableOpacity
            onPress={handleVerify}
            style={{
              backgroundColor: "#1c00b9ff",
              paddingVertical: 12,
              borderRadius: 8,
              width: "100%",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Verify OTP</Text>
          </TouchableOpacity>

          {/* Resend Section */}
          {isResendDisabled ? (
            <CountdownTimer start={59} onComplete={() => setIsResendDisabled(false)} />
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text style={{ color: "#4185cfff", fontWeight: "bold" }}>Resend OTP</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OtpScreen;
