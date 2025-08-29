import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  ScrollView 
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import userStore from "@/store/userStore";
import { adminStore } from "@/store/adminStore";

const ApplyForAdminScreen = () => {

  
  const [hasAgreed, setHasAgreed] = useState(false);


  const { userName, userEmailID ,userModelID ,  setMode } = userStore();

  const { applyToAdmin } = adminStore();

  const handleApply = async () => {
    
    try{
   
      
      const response = await applyToAdmin({userName , userEmailID , userModelID})

    if(response.success)
    {
         setMode("Admin");

    router.back()

    }
    else {


      Alert.alert(
      "Fail to Update",
      `${response.message}`,
      [
        { text: "OK", style: "cancel" },
       
      ],
      { cancelable: false }
    )

  }


    }catch(error){
   console.log(error)
    Alert.alert(
      "Some Thing Went Wrong",
      "Please try again later",
      [
        { text: "OK", style: "cancel" },
       
      ],
      { cancelable: false }
    )

    }




    
   


 
    
  };

  const confirmApplication = () => {
    
    Alert.alert(
      "Confirm Application",
      "Are you sure you want to proceed with your Admin application?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes, Apply", onPress: handleApply },
      ],
      { cancelable: false }
    );
  };

  const termsAndConditionsText = `
I am applying for the Admin role and commit to upholding the highest standards of integrity and responsibility. 
I will not misuse my position, and I acknowledge that any violation may lead to my account being blocked.

I will ensure that all batches I create, whether free or paid, are genuine and beneficial to students. 
I will not mislead users or assign unqualified individuals as teachers.

I also confirm that I will not ask teachers for financial compensation in exchange for their assignments. 
Any unsatisfactory organization or batch created under my admin account may be deleted or banned by the application team.
  `;

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Apply for Admin</Text>

        <View style={styles.card}>
          <Text style={styles.terms}>{termsAndConditionsText}</Text>
        </View>

        <TouchableOpacity 
          style={styles.checkboxContainer} 
          onPress={() => setHasAgreed(!hasAgreed)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={hasAgreed ? "checkbox" : "square-outline"}
            size={26}
            color={hasAgreed ? "#667eea" : "#aaa"}
          />
          <Text style={styles.checkboxLabel}>
            I have read and agree to the terms
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={confirmApplication}
          disabled={!hasAgreed}
          activeOpacity={0.8}
          style={[styles.applyButton, !hasAgreed && styles.disabled]}
        >
          <LinearGradient
            colors={["#667eea", "#764ba2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Apply for Admin</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f9fafb" 
  },
  scrollContent: { 
    padding: 20, 
    paddingBottom: 120 
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 10,
    marginTop : 20
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 25,
  },
  terms: {
    fontSize: 15,
    color: "#4b5563",
    lineHeight: 22,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 15,
    color: "#374151",
  },
  footer: {
    position: "absolute",
    bottom: 70,
    left: 0,
    right: 0,
    padding: 20,
    
    
    alignItems: "center",
  },
  applyButton: {
    width: "85%",
    borderRadius: 28,
    overflow: "hidden",
  },
  disabled: {
    opacity: 0.6,
  },
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});

export default ApplyForAdminScreen;
