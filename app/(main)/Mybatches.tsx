import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput,
  FlatList, 
  Image, 
  Dimensions,
  ScrollView
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get('window');

// Sample purchased batches data
const myPurchasedBatches = [
  {
    _id: "1",
    batchname: "Full Stack Development",
    classes: "12th",
    createdbyteacher: "John Doe",
    typee: "Paid",
    duration: "6 months",
    batchimageurl: "https://picsum.photos/400/200?random=1",
    price: "4999",
    progress: 75,
    totalLessons: 45,
    completedLessons: 34,
    orgid: { _id: "org1", organisationname: "CodeBridge Academy" },
    purchaseDate: "2024-01-15",
    status: "In Progress",
    nextLesson: "React Hooks Advanced"
  },
  {
    _id: "2",
    batchname: "AI & Machine Learning",
    classes: "B.Tech 3rd Year",
    createdbyteacher: "Alice Smith",
    typee: "Paid",
    duration: "1 year",
    batchimageurl: "https://picsum.photos/400/200?random=2",
    price: "7999",
    progress: 45,
    totalLessons: 60,
    completedLessons: 27,
    orgid: { _id: "org2", organisationname: "AI Hub" },
    purchaseDate: "2024-02-10",
    status: "In Progress",
    nextLesson: "Neural Networks Basics"
  },
  {
    _id: "3",
    batchname: "Data Science Bootcamp",
    classes: "College Students",
    createdbyteacher: "Robert Lee",
    typee: "Free",
    duration: "3 months",
    batchimageurl: "https://picsum.photos/400/200?random=3",
    price: "0",
    progress: 100,
    totalLessons: 30,
    completedLessons: 30,
    orgid: { _id: "org3", organisationname: "DataLab" },
    purchaseDate: "2024-01-05",
    status: "Completed",
    certificate: true
  },
  {
    _id: "4",
    batchname: "Cyber Security Fundamentals",
    classes: "12th",
    createdbyteacher: "Sophia Brown",
    typee: "Free",
    duration: "4 months",
    batchimageurl: "https://picsum.photos/400/200?random=4",
    price: "0",
    progress: 20,
    totalLessons: 35,
    completedLessons: 7,
    orgid: { _id: "org4", organisationname: "CyberShield" },
    purchaseDate: "2024-03-01",
    status: "In Progress",
    nextLesson: "Network Security Basics"
  },
  {
    _id: "5",
    batchname: "UI/UX Design",
    classes: "Graduates",
    createdbyteacher: "Olivia Wilson",
    typee: "Paid",
    duration: "4 months",
    batchimageurl: "https://picsum.photos/400/200?random=8",
    price: "3999",
    progress: 60,
    totalLessons: 40,
    completedLessons: 24,
    orgid: { _id: "org8", organisationname: "DesignLab" },
    purchaseDate: "2024-02-20",
    status: "In Progress",
    nextLesson: "User Research Methods"
  }
];

const MyBatchesScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("All"); // All, Paid, Free
  const [filteredBatches, setFilteredBatches] = useState(myPurchasedBatches);

  // Filter batches based on search and tab selection
  const filterBatches = (query, tab) => {
    let filtered = myPurchasedBatches;

    // Filter by tab
    if (tab === "Paid") {
      filtered = filtered.filter(batch => batch.typee === "Paid");
    } else if (tab === "Free") {
      filtered = filtered.filter(batch => batch.typee === "Free");
    }

    // Filter by search query
    if (query) {
      filtered = filtered.filter(batch =>
        batch.batchname.toLowerCase().includes(query.toLowerCase()) ||
        batch.createdbyteacher.toLowerCase().includes(query.toLowerCase()) ||
        batch.orgid.organisationname.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredBatches(filtered);
  };

  // Handle search input change
  const handleSearch = (text) => {
    setSearchQuery(text);
    filterBatches(text, selectedTab);
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    filterBatches(searchQuery, tab);
  };

  const tabs = [
    { key: "All", label: "All Courses", count: myPurchasedBatches.length },
    { key: "Paid", label: "Paid", count: myPurchasedBatches.filter(b => b.typee === "Paid").length },
    { key: "Free", label: "Free", count: myPurchasedBatches.filter(b => b.typee === "Free").length }
  ];

  return (
    <SafeAreaProvider>
      <View style={{ backgroundColor: "#f8f9fa", flex: 1 }}>
        
        {/* HEADER */}
        <View style={{
          paddingTop: 50,
          paddingBottom: 20,
          paddingHorizontal: 20,
          backgroundColor: "#ffffff",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        }}>
          {/* Title and Stats */}
          <View style={{ 
            flexDirection: "row", 
            justifyContent: "space-between", 
            alignItems: "center",
            marginBottom: 20
          }}>
            <View>
              <Text style={{ 
                fontSize: 24, 
                fontWeight: "800", 
                color: "#333",
                marginBottom: 4
              }}>
                My Courses
              </Text>
              <Text style={{
                fontSize: 14,
                color: "#666",
                fontWeight: "500"
              }}>
                {myPurchasedBatches.length} courses enrolled
              </Text>
            </View>
            
            {/* Progress Summary */}
            <View style={{
              backgroundColor: "#ff6b6b",
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 20,
              shadowColor: "#ff6b6b",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 5,
            }}>
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 12 }}>
                {Math.round(myPurchasedBatches.reduce((acc, batch) => acc + batch.progress, 0) / myPurchasedBatches.length)}% COMPLETE
              </Text>
            </View>
          </View>
          
          {/* Search Bar */}
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#f8f9fa",
            borderRadius: 16,
            paddingHorizontal: 16,
            paddingVertical: 4,
            marginBottom: 20,
          }}>
            <Feather name="search" size={18} color="#999" />
            <TextInput 
              placeholder="Search your courses..." 
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={handleSearch}
              style={{ 
                flex: 1,
                fontSize: 15, 
                color: "#333",
                paddingVertical: 12,
                paddingLeft: 12,
              }}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch("")}>
                <Feather name="x" size={18} color="#999" />
              </TouchableOpacity>
            )}
          </View>
          
          {/* Tab Slider */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => handleTabChange(tab.key)}
                style={{
                  backgroundColor: selectedTab === tab.key ? "#ff6b6b" : "#fff",
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 25,
                  marginRight: 12,
                  borderWidth: 1.5,
                  borderColor: selectedTab === tab.key ? "#ff6b6b" : "#e1e8ed",
                  shadowColor: selectedTab === tab.key ? "#ff6b6b" : "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: selectedTab === tab.key ? 0.3 : 0.05,
                  shadowRadius: 4,
                  elevation: selectedTab === tab.key ? 5 : 2,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{
                    color: selectedTab === tab.key ? "#fff" : "#666",
                    fontWeight: selectedTab === tab.key ? "700" : "600",
                    fontSize: 14,
                    marginRight: 6,
                  }}>
                    {tab.label}
                  </Text>
                  <View style={{
                    backgroundColor: selectedTab === tab.key ? "rgba(255,255,255,0.3)" : "#f0f0f0",
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    borderRadius: 10,
                  }}>
                    <Text style={{
                      color: selectedTab === tab.key ? "#fff" : "#666",
                      fontSize: 12,
                      fontWeight: "600",
                    }}>
                      {tab.count}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* BATCHES LIST */}
        <FlatList
          data={filteredBatches}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ 
            padding: 20,
            paddingBottom: 120 // Space for bottom navigation
          }}
          renderItem={({ item }) => <MyBatchCard batch={item} />}
          ListEmptyComponent={() => (
            <View style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 60,
            }}>
              <MaterialIcons name="school" size={80} color="#ccc" />
              <Text style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#666",
                marginTop: 16,
                marginBottom: 8,
              }}>
                No courses found
              </Text>
              <Text style={{
                fontSize: 14,
                color: "#999",
                textAlign: "center",
                lineHeight: 20,
              }}>
                Try adjusting your search or filter options
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaProvider>
  );
};

// Individual Batch Card Component for purchased courses
const MyBatchCard = ({ batch }) => {
  return (
    <TouchableOpacity style={{
      backgroundColor: "#ffffff",
      borderRadius: 16,
      marginBottom: 16,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    }}>
      
      {/* Header with Image and Basic Info */}
      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: batch.batchimageurl }}
          style={{ width: "100%", height: 140 }}
          resizeMode="cover"
        />
        
        {/* Overlay Gradient */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.6)"]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
            justifyContent: "flex-end",
            padding: 16,
          }}
        >
          <Text style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: "700",
            marginBottom: 4,
          }} numberOfLines={1}>
            {batch.batchname}
          </Text>
          <Text style={{
            color: "rgba(255,255,255,0.9)",
            fontSize: 14,
            fontWeight: "500",
          }}>
            by {batch.createdbyteacher}
          </Text>
        </LinearGradient>
        
        {/* Status Badge */}
        <View style={{
          position: "absolute",
          top: 12,
          right: 12,
          backgroundColor: batch.status === "Completed" ? "#2ecc71" : "#ff6b6b",
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 15,
        }}>
          <Text style={{
            color: "#fff",
            fontSize: 11,
            fontWeight: "700",
            textTransform: "uppercase",
          }}>
            {batch.status}
          </Text>
        </View>
        
        {/* Certificate Badge (if completed) */}
        {batch.certificate && (
          <View style={{
            position: "absolute",
            top: 12,
            left: 12,
            backgroundColor: "rgba(255,215,0,0.9)",
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
          }}>
            <MaterialIcons name="verified" size={14} color="#fff" />
            <Text style={{
              color: "#fff",
              fontSize: 10,
              fontWeight: "700",
              marginLeft: 4,
            }}>
              CERTIFIED
            </Text>
          </View>
        )}
      </View>
      
      {/* Content Section */}
      <View style={{ padding: 16 }}>
        
        {/* Progress Bar */}
        <View style={{ marginBottom: 16 }}>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}>
            <Text style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#333",
            }}>
              Course Progress
            </Text>
            <Text style={{
              fontSize: 14,
              fontWeight: "700",
              color: "#ff6b6b",
            }}>
              {batch.progress}%
            </Text>
          </View>
          
          {/* Progress Bar */}
          <View style={{
            backgroundColor: "#f0f0f0",
            height: 8,
            borderRadius: 4,
            overflow: "hidden",
          }}>
            <View style={{
              backgroundColor: "#ff6b6b",
              height: "100%",
              width: `${batch.progress}%`,
              borderRadius: 4,
            }} />
          </View>
          
          <Text style={{
            fontSize: 12,
            color: "#666",
            marginTop: 4,
          }}>
            {batch.completedLessons} of {batch.totalLessons} lessons completed
          </Text>
        </View>
        
        {/* Course Details */}
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 16,
          backgroundColor: "#f8f9fa",
          padding: 12,
          borderRadius: 12,
        }}>
          <View style={{ alignItems: "center", flex: 1 }}>
            <MaterialIcons name="schedule" size={18} color="#666" />
            <Text style={{ color: "#666", fontSize: 12, fontWeight: "600", marginTop: 4 }}>
              {batch.duration}
            </Text>
          </View>
          
          <View style={{ alignItems: "center", flex: 1 }}>
            <MaterialIcons name="school" size={18} color="#666" />
            <Text style={{ color: "#666", fontSize: 12, fontWeight: "600", marginTop: 4 }}>
              {batch.orgid.organisationname}
            </Text>
          </View>
          
          <View style={{ alignItems: "center", flex: 1 }}>
            <MaterialIcons name="payment" size={18} color="#666" />
            <Text style={{ color: "#666", fontSize: 12, fontWeight: "600", marginTop: 4 }}>
              {batch.price === "0" ? "FREE" : `₹${batch.price}`}
            </Text>
          </View>
        </View>
        
        {/* Next Lesson or Completion Message */}
        {batch.status === "Completed" ? (
          <TouchableOpacity style={{
            backgroundColor: "#2ecc71",
            paddingVertical: 12,
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <MaterialIcons name="verified" size={20} color="#fff" />
            <Text style={{
              color: "#fff",
              fontWeight: "700",
              fontSize: 14,
              marginLeft: 8,
            }}>
              Course Completed
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity style={{
              flex: 1,
              backgroundColor: "#ff6b6b",
              paddingVertical: 12,
              borderRadius: 12,
              alignItems: "center",
            }}>
              <Text style={{
                color: "#fff",
                fontWeight: "700",
                fontSize: 14,
              }}>
                Continue Learning
              </Text>
              {batch.nextLesson && (
                <Text style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 11,
                  marginTop: 2,
                }} numberOfLines={1}>
                  Next: {batch.nextLesson}
                </Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity style={{
              backgroundColor: "#f8f9fa",
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 12,
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#e1e8ed",
            }}>
              <MaterialIcons name="more-horiz" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MyBatchesScreen;

/*
FEATURES IMPLEMENTED:

🔍 SEARCH FUNCTIONALITY:
- Real-time search across course names, instructors, and organizations
- Clear search button when typing
- Search state management with useState

📱 TAB SLIDER/TOGGLE:
- Three tabs: All, Paid, Free courses
- Count badges showing number of courses in each category
- Smooth tab switching with visual feedback
- Active tab highlighting with custom styling

📊 COURSE PROGRESS TRACKING:
- Visual progress bars showing completion percentage
- Lesson counters (completed/total)
- Next lesson indicators
- Course status badges (In Progress/Completed)

🎨 MODERN UI DESIGN:
- Card-based layout with shadows and rounded corners
- Image overlays with gradients
- Certificate badges for completed courses
- Professional color scheme and typography
- Responsive design with proper spacing

💡 SIMPLE CODE LOGIC:
- useState hooks for search query, selected tab, and filtered batches
- Simple filter function that combines search and tab filtering
- Clean component structure with reusable MyBatchCard
- Efficient FlatList rendering with proper keys
*/