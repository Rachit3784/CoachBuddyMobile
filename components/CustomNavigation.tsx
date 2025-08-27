// import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

// import { useLinkBuilder, useTheme } from "@react-navigation/native";

// import { Text, PlatformPressable } from "@react-navigation/elements"; // Use PlatformPressable
// import Feather from "@expo/vector-icons/Feather";
// import Ionicons from "@expo/vector-icons/Ionicons";

// const { width, height } = Dimensions.get("window");

// import AntDesign from "@expo/vector-icons/AntDesign";

// import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

// // Optional: Define icon mapping for better management

// const tabIcons = {
//   index: { type: AntDesign, name: "home" },

//   profile: { type: FontAwesome5, name: "user" },

//   Mybatches: { type: Feather, name: "book" },

//   search: { type: Feather, name: "search" },
// };

// function CustomNavigation({ state, descriptors, navigation }) {
//   const { colors } = useTheme();

//   const { buildHref } = useLinkBuilder(); // Not actively used, but useful to keep if needed

//   return (
//     <View style={styles.bottomTabBar}>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];

//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: "tabPress",

//             target: route.key,

//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name, route.params);
//           }
//         };

//         // ✅ Declare IconComponent and iconName here, before JSX

//         const IconComponent = tabIcons[route.name].type;

//         const iconName = tabIcons[route.name].name;

//         return (
//           <PlatformPressable
//             key={index}
//             onPress={onPress}
//             style={styles.bottomBarPlatform}
//             accessibilityRole="tab"
//             accessibilityState={{ selected: isFocused }}
//             accessibilityLabel={`${label} Tab`}
//             android_ripple={{
//               borderless: true,
//               color: "rgba(255,255,255,0.2)",
//             }}
//           >
//             {isFocused ? (
//               <View style={styles.TabButtonStyle}>
//                 <IconComponent name={iconName} size={20} color="black" />

//                 <Text
//                   style={{
//                     color: colors.primary,

//                     fontSize: 14,

//                     fontWeight: "bold",

//                     marginLeft: 5,
//                   }}
//                 >
//                   {label}
//                 </Text>
//               </View>
//             ) : (
//               <IconComponent name={iconName} size={20} color="white" />
//             )}
//           </PlatformPressable>
//         );
//       })}
//     </View>
//   );
// }

// export default CustomNavigation;

// const styles = StyleSheet.create({
//   bottomTabBar: {
//     position: "absolute",

//     display: "flex",

//     flexDirection: "row",

//     bottom: 50,

//     alignSelf: "center",

//     backgroundColor: "#1900faff",

//     borderWidth: 1,

//     width: width * 0.85,

//     height: height * 0.07,

//     alignItems: "center",

//     justifyContent: "space-around",

//     borderRadius: 19,

//     paddingHorizontal: 15,
//   },

//   bottomBarPlatform: {
//     display: "flex",

//     flexDirection: "row",

//     justifyContent: "center",

//     alignItems: "center",

//     flex: 1,

//     paddingVertical: 5,
//   },

//   TabButtonStyle: {
//     backgroundColor: "#fff",

//     borderRadius: 7,

//     paddingHorizontal: 8,

//     paddingVertical: 3,

//     flexDirection: "row", // Display icon and text in a row

//     alignItems: "center",

//     height: height * 0.043,
//   },
// });




import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { Text } from "@react-navigation/elements";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const { width, height } = Dimensions.get("window");

// Tab configuration with proper icons and labels
const tabIcons = {
  index: { type: AntDesign, name: "home", label: "Home" },
  search: { type: Feather, name: "search", label: "Search" },
  Mybatches: { type: Feather, name: "book-open", label: "my course" },
  profile: { type: FontAwesome5, name: "user", label: "Profile" },
};

function CustomNavigation({ state, descriptors, navigation }) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* Main bottom navigation bar */}
      <View style={styles.bottomTabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const tabInfo = tabIcons[route.name];
          
          // Skip if tab info not found
          if (!tabInfo) return null;

          const { type: IconComponent, name: iconName, label } = tabInfo;
          const isFocused = state.index === index;

          // Handle tab press
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={styles.tabButton}
              activeOpacity={0.7}
              accessibilityRole="tab"
              accessibilityState={{ selected: isFocused }}
              accessibilityLabel={`${label} Tab`}
            >
              {isFocused ? (
                // Active tab design with pill shape
                <View style={styles.activeTabContainer}>
                  <View style={styles.activeIconBackground}>
                    <IconComponent 
                      name={iconName} 
                      size={18} 
                      color="#ffffffff" 
                    />
                  </View>
                  <Text style={styles.activeTabText}>
                    {label}
                  </Text>
                </View>
              ) : (
                // Inactive tab design
                <View style={styles.inactiveTabContainer}>
                  <IconComponent 
                    name={iconName} 
                    size={18} 
                    color="rgba(0, 0, 0, 0.3)" 
                  />
                  <Text style={styles.inactiveTabText}>
                    {label}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default CustomNavigation;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    // Safe area padding for modern devices
    paddingBottom: 34,
  },
  bottomTabBar: {
    flexDirection: "row",
    backgroundColor: "#ffffffff",
    
    
   
    paddingVertical: 8,
    paddingHorizontal: 10,
    
    // Modern shadow effect
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 8 },
    // shadowOpacity: 0.25,
    // shadowRadius: 16,
    // elevation: 12,
    // // Subtle border for premium look
    // borderWidth: 0.5,
    // borderColor: "rgba(255, 255, 255, 0.1)",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 18,
    minHeight: 56,
  },
  // Active tab styling (selected state)
  activeTabContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff6b6b",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    // Glowing effect for active tab
    shadowColor: "#ff6b6b",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  activeIconBackground: {
    marginRight: 6,
  },
  activeTabText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  // Inactive tab styling
  inactiveTabContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  inactiveTabText: {
    color: "rgba(0, 0, 0, 0.5)",
    fontSize: 10,
    fontWeight: "500",
    marginTop: 4,
    textAlign: "center",
  },
});

/* 
DESIGN NOTES:
- Fixed position bottom navigation that doesn't interfere with content
- Dark theme with glassmorphism effect
- Active tab has a pill-shaped background with glow effect
- Proper spacing and safe area handling for modern devices
- Clean animations and modern styling
- Icons are properly sized and spaced
*/