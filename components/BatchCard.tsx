// import React from "react";
// import { View, Text, Image, TouchableOpacity } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";  // ✅ Expo vector icons

// const BatchCard = ({ item }) => {
//   // Generate random rating between 4.0 and 5.0 for demo
//   const rating = (Math.random() * 1 + 4).toFixed(1);

//   return (
//     <View
//       style={{
//         backgroundColor: "transparent",
//         borderRadius: 20,
//         marginHorizontal: 16,
//         marginVertical: 12,
//         overflow: "hidden",
//         shadowColor: "#000",
//         shadowOpacity: 0.3,
//         shadowOffset: { width: 0, height: 8 },
//         shadowRadius: 15,
//         elevation: 10,
//       }}
//     >
//       <LinearGradient
//         colors={["rgba(45, 45, 45, 0.95)", "rgba(30, 30, 30, 0.98)"]}
//         style={{
//           borderRadius: 20,
//           borderWidth: 1,
//           borderColor: "rgba(255, 255, 255, 0.1)",
//         }}
//       >
//         {/* Poster Image */}
//         <View style={{ position: "relative" }}>
//           <Image
//             source={{ uri: item.batchimageurl }}
//             style={{ 
//               width: "100%", 
//               height: 180,
//               borderTopLeftRadius: 20,
//               borderTopRightRadius: 20,
//             }}
//             resizeMode="cover"
//           />
          
//           {/* Overlay gradient */}
//           <LinearGradient
//             colors={["transparent", "rgba(0,0,0,0.3)"]}
//             style={{
//               position: "absolute",
//               bottom: 0,
//               left: 0,
//               right: 0,
//               height: 60,
//             }}
//           />
//         </View>

//         {/* Details Section */}
//         <View style={{ flexDirection: "row", padding: 18, paddingTop: 16 }}>
//           {/* Left Column */}
//           <View style={{ flex: 1, marginRight: 16 , display : 'flex', alignItems : 'flex-start' , justifyContent : 'space-evenly' }}>
//             <Text
//               style={{ 
//                 color: "#ffffff", 
//                 fontSize: 16, 
//                 fontWeight: "500",
//                 lineHeight: 24,
//               }}
//               numberOfLines={1}
//             >
//               {item.batchname}
//             </Text>

//             <Text 
//               style={{ 
//                 color: "rgba(255, 255, 255, 0.7)", 
//                 marginTop: 4, 
//                 fontSize: 14,
//                 fontWeight: "500",
//               }}
//             >
//               By {item.createdbyteacher}
//             </Text>

//             <Text 
//               style={{ 
//                 color: "rgba(255, 255, 255, 0.6)", 
//                 marginTop: 2, 
//                 fontSize: 13,
//               }}
//             >
//               {item.orgid?.organisationname || "Organisation"}
//             </Text>

//             {/* Enroll Button */}
//             <TouchableOpacity
//               style={{
//                 marginTop: 14,
//                 borderRadius: 12,
//                 overflow: "hidden",
//                 alignSelf: "flex-start",
//                 shadowColor: "#ff6b6b",
//                 shadowOpacity: 0.3,
//                 shadowOffset: { width: 0, height: 4 },
//                 shadowRadius: 8,
//                 elevation: 5,
//               }}
//             >
//               <LinearGradient
//                 colors={["#ff6b6b", "#ee5a24"]}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={{
//                   paddingHorizontal: 24,
//                   paddingVertical: 10,
//                   borderRadius: 12,
//                 }}
//               >
//                 <Text 
//                   style={{ 
//                     color: "#fff", 
//                     fontWeight: "700", 
//                     fontSize: 14,
//                     letterSpacing: 0.5,
//                   }}
//                 >
//                   Enroll Now
//                 </Text>
//               </LinearGradient>
//             </TouchableOpacity>
//           </View>

//           {/* Right Column */}
//           <View style={{display : 'flex' , alignItems: "flex-end", justifyContent: "space-evenly" }}>
//             <Text style={{ color: "#ffffff", fontSize: 22, fontWeight: "800" }}>
//               {item.price === "0" ? "FREE" : `₹${item.price}`}
//             </Text>

//             <Text style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: 14, fontWeight: "600", marginTop: 6 }}>
//               {item.classes}
//             </Text>

//             {/* ⭐ Rating */}
//             <View 
//               style={{ 
//                 flexDirection: "row", 
//                 alignItems: "center",
//                 justifyContent : 'flex-end',
//                 marginTop: 8,
                
                
//                 paddingVertical: 6,
//                 borderRadius: 8,
//               }}
//             >
//               <Ionicons name="star" size={16} color="#ffd700" style={{ marginRight: 4 }} />
//               <Text style={{ color: "#ffd700", fontSize: 14, fontWeight: "600" }}>
//                 {rating}
//               </Text>
//             </View>

//             {/* Type Badge */}
//             <View
//               style={{
//                 backgroundColor: "rgba(255, 255, 255, 0.15)",
//                 paddingHorizontal: 14,
//                 paddingVertical: 8,
//                 borderRadius: 10,
                
//                 marginTop: 10,
//                 borderWidth: 1,
//                 borderColor: "rgba(255, 255, 255, 0.2)",
//               }}
//             >
//               <Text 
//                 style={{ 
//                   color: item.typee === "Free" ? "#2ecc71" : "#ff6b6b",
//                   fontWeight: "700", 
//                   fontSize: 13,
//                   textTransform: "uppercase",
//                   letterSpacing: 0.5,
//                 }}
//               >
//                 {item.typee}
//               </Text>
//             </View>
//           </View>
//         </View>

//         {/* Bottom stats */}
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             paddingHorizontal: 18,
//             paddingBottom: 16,
//             paddingTop: 8,
//             borderTopWidth: 1,
//             borderTopColor: "rgba(255, 255, 255, 0.1)",
//           }}
//         >
//           <Text style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: 12 }}>
//             {item.totalEnrolled} enrolled
//           </Text>
//           <Text style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: 12 }}>
//             {item.duration}
//           </Text>
//           <Text style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: 12 }}>
//             {item.totalSubjects} subjects
//           </Text>
//         </View>
//       </LinearGradient>
//     </View>
//   );
// };

// export default BatchCard;


import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

const { width } = Dimensions.get('window');

const BatchCard = ({ item }) => {
  const rating = (Math.random() * 1 + 4).toFixed(1);
  
  // Generate random gradient colors based on course type
  const gradientColors = {
    'Paid': ['#667eea', '#764ba2'],
    'Free': ['#11998e', '#38ef7d'],
    'default': ['#ff9a9e', '#fecfef']
  };
  
  const cardGradient = gradientColors[item.typee] || gradientColors.default;
  
  return (
    <TouchableOpacity
      style={{
        marginBottom: 20,
        borderRadius: 20,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        backgroundColor: "#fff",
      }}
      activeOpacity={0.95}
    >
      {/* Header Section with Gradient */}
      <LinearGradient
        colors={cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          height: 120,
          paddingHorizontal: 20,
          paddingVertical: 16,
          justifyContent: "space-between",
        }}
      >
        {/* Top Row */}
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}>
          {/* Course Category Badge */}
          <View style={{
            backgroundColor: "rgba(255, 255, 255, 0.25)",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            backdropFilter: "blur(10px)",
          }}>
            <Text style={{
              color: "#fff",
              fontSize: 11,
              fontWeight: "700",
              textTransform: "uppercase",
            }}>
              {item.classes}
            </Text>
          </View>
          
          {/* Price */}
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{
              color: "#fff",
              fontSize: 24,
              fontWeight: "900",
              textShadowColor: "rgba(0,0,0,0.3)",
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2,
            }}>
              {item.price === "0" ? "FREE" : `₹${item.price}`}
            </Text>
          </View>
        </View>

        {/* Bottom Row */}
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                fontWeight: "800",
                textShadowColor: "rgba(0,0,0,0.3)",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 2,
              }}
              numberOfLines={1}
            >
              {item.batchname}
            </Text>
            <Text style={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: 14,
              fontWeight: "500",
              marginTop: 2,
            }}>
              by {item.createdbyteacher}
            </Text>
          </View>

          {/* Rating Badge */}
          <View style={{
            backgroundColor: "rgba(255, 255, 255, 0.25)",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 15,
          }}>
            <Ionicons name="star" size={14} color="#ffd700" />
            <Text style={{
              color: "#fff",
              fontSize: 13,
              fontWeight: "700",
              marginLeft: 4,
            }}>
              {rating}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Content Section */}
      <View style={{ backgroundColor: "#fff", padding: 20 }}>
        {/* Organization Info */}
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
        }}>
          <View style={{
            backgroundColor: "#f8f9fa",
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
          }}>
            <MaterialIcons name="school" size={20} color="#666" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{
              color: "#333",
              fontSize: 14,
              fontWeight: "600",
            }}>
              {item.orgid?.organisationname || "Organisation"}
            </Text>
            <Text style={{
              color: "#999",
              fontSize: 12,
              marginTop: 1,
            }}>
              Educational Institute
            </Text>
          </View>
          
          {/* Type Badge */}
          <View style={{
            backgroundColor: item.typee === "Free" ? "#e8f5e8" : "#fff3e0",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: item.typee === "Free" ? "#2ecc71" : "#ff6b6b",
          }}>
            <Text style={{
              color: item.typee === "Free" ? "#2ecc71" : "#ff6b6b",
              fontSize: 11,
              fontWeight: "700",
              textTransform: "uppercase",
            }}>
              {item.typee}
            </Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 16,
          backgroundColor: "#f8f9fa",
          padding: 12,
          borderRadius: 12,
        }}>
          <View style={{ alignItems: "center", flex: 1 }}>
            <MaterialIcons name="people" size={18} color="#666" />
            <Text style={{ 
              color: "#666", 
              fontSize: 12, 
              fontWeight: "600", 
              marginTop: 4 
            }}>
              {item.totalEnrolled}
            </Text>
            <Text style={{ 
              color: "#999", 
              fontSize: 10, 
              fontWeight: "500" 
            }}>
              Students
            </Text>
          </View>
          
          <View style={{ alignItems: "center", flex: 1 }}>
            <MaterialIcons name="schedule" size={18} color="#666" />
            <Text style={{ 
              color: "#666", 
              fontSize: 12, 
              fontWeight: "600", 
              marginTop: 4 
            }}>
              {item.duration}
            </Text>
            <Text style={{ 
              color: "#999", 
              fontSize: 10, 
              fontWeight: "500" 
            }}>
              Duration
            </Text>
          </View>
          
          <View style={{ alignItems: "center", flex: 1 }}>
            <MaterialIcons name="book" size={18} color="#666" />
            <Text style={{ 
              color: "#666", 
              fontSize: 12, 
              fontWeight: "600", 
              marginTop: 4 
            }}>
              {item.totalSubjects}
            </Text>
            <Text style={{ 
              color: "#999", 
              fontSize: 10, 
              fontWeight: "500" 
            }}>
              Subjects
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={{
          flexDirection: "row",
          gap: 12,
        }}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#ff6b6b",
              paddingVertical: 14,
              borderRadius: 14,
              shadowColor: "#ff6b6b",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 5,
            }}
            activeOpacity={0.9}
          >
            <Text style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 15,
              fontWeight: "700",
              letterSpacing: 0.5,
            }}>
              Enroll Now
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={{
              backgroundColor: "#f8f9fa",
              paddingVertical: 14,
              paddingHorizontal: 20,
              borderRadius: 14,
              borderWidth: 1.5,
              borderColor: "#e9ecef",
            }}
            activeOpacity={0.9}
          >
            <Feather name="heart" size={18} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BatchCard;