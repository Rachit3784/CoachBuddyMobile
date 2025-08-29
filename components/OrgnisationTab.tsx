
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
  org: { type: AntDesign, name: "home", label: "Home" },
  Batches: { type: Feather, name: "book-open", label: "Batches" },
  Post  : { type: Ionicons, name: "videocam-outline", label: "Post" },
  Profile: { type: FontAwesome5, name: "user", label: "Profile" },
};

function OrginationTab({ state, descriptors, navigation }) {

  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* Main bottom navigation bar */}
      <View style={styles.bottomTabBar}>
        {state.routes.map((route, index) => {

          const { options } = descriptors[route.key];
          
          const tabInfo = tabIcons[route.name];

          console.log("Admin Ke Mode Me")
          
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

export default OrginationTab;

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
