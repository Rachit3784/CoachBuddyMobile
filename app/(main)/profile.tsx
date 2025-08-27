import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  Dimensions,
  FlatList,
  Modal,
  Alert
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Feather, Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get('window');

// Sample user profile data
const userProfile = {
  id: 1,
  name: "Jenny Wilson",
  username: "@jenny_learns",
  email: "jenny.wilson@email.com",
  avatar: "https://i.pravatar.cc/200?img=1",
  coverImage: "https://picsum.photos/400/200?random=1",
  bio: "Full Stack Developer 💻 | UI/UX Enthusiast 🎨 | EdTech Learner 📚 | Sharing my coding journey",
  location: "San Diego, CA",
  joinedDate: "January 2024",
  isVerified: true,
  stats: {
    posts: 127,
    followers: 2847,
    following: 849,
    batchesCompleted: 12,
    certificates: 8,
    ranking: 156,
    studyHours: 324
  }
};

// Sample user posts
const userPosts = [
  { id: 1, type: "image", url: "https://picsum.photos/200/200?random=1", likes: 234 },
  { id: 2, type: "video", url: "https://picsum.photos/200/200?random=2", likes: 189 },
  { id: 3, type: "image", url: "https://picsum.photos/200/200?random=3", likes: 298 },
  { id: 4, type: "image", url: "https://picsum.photos/200/200?random=4", likes: 156 },
  { id: 5, type: "video", url: "https://picsum.photos/200/200?random=5", likes: 423 },
  { id: 6, type: "image", url: "https://picsum.photos/200/200?random=6", likes: 167 }
];

// Sample achievements/certificates
const achievements = [
  { id: 1, title: "Full Stack Developer", org: "CodeBridge", date: "Mar 2024", icon: "💻" },
  { id: 2, title: "React Expert", org: "React Academy", date: "Feb 2024", icon: "⚛️" },
  { id: 3, title: "UI/UX Design", org: "DesignLab", date: "Jan 2024", icon: "🎨" },
  { id: 4, title: "JavaScript Pro", org: "JS Masters", date: "Dec 2023", icon: "🟨" }
];

// Sample organizations
const myOrganizations = [
  { id: 1, name: "TechHub Academy", role: "Founder", members: 1243, image: "https://picsum.photos/100/100?random=10" },
  { id: 2, name: "Code Warriors", role: "Admin", members: 567, image: "https://picsum.photos/100/100?random=11" }
];

const ProfileManagementScreen = () => {
  const [activeTab, setActiveTab] = useState("posts"); // posts, batches, achievements, organizations
  const [showEditModal, setShowEditModal] = useState(false);

  const tabs = [
    { key: "posts", label: "Posts", icon: "grid", count: userProfile.stats.posts },
    { key: "batches", label: "Courses", icon: "book-open", count: userProfile.stats.batchesCompleted },
    { key: "achievements", label: "Certificates", icon: "award", count: userProfile.stats.certificates },
    { key: "organizations", label: "Organizations", icon: "users", count: myOrganizations.length }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case "posts":
        return <PostsGrid posts={userPosts} />;
      case "batches":
        return <BatchesGrid />;
      case "achievements":
        return <AchievementsGrid achievements={achievements} />;
      case "organizations":
        return <OrganizationsGrid organizations={myOrganizations} />;
      default:
        return <PostsGrid posts={userPosts} />;
    }
  };

  return (
    <SafeAreaProvider>
      <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
        
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          
          {/* HEADER WITH COVER IMAGE */}
          <View style={{ position: "relative" }}>
            {/* Cover Image */}
            <Image
              source={{ uri: userProfile.coverImage }}
              style={{ width: "100%", height: 200 }}
              resizeMode="cover"
            />
            
            {/* Header Controls */}
            <View style={{
              position: "absolute",
              top: 50,
              left: 20,
              right: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <TouchableOpacity style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                padding: 10,
                borderRadius: 20,
              }}>
                <Feather name="arrow-left" size={20} color="#fff" />
              </TouchableOpacity>
              
              <TouchableOpacity style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                padding: 10,
                borderRadius: 20,
              }}>
                <Feather name="more-vertical" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            
            {/* Gradient Overlay */}
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.3)"]}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 80,
              }}
            />
          </View>
          
          {/* PROFILE INFO SECTION */}
          <View style={{ paddingHorizontal: 20, paddingTop: 0, paddingBottom: 20 }}>
            
            {/* Profile Picture (Overlapping cover) */}
            <View style={{
              alignItems: "center",
              marginTop: -50,
              marginBottom: 20,
            }}>
              <View style={{
                backgroundColor: "#fff",
                padding: 4,
                borderRadius: 60,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 8,
              }}>
                <Image
                  source={{ uri: userProfile.avatar }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
              </View>
              
              {/* Verified Badge */}
              {userProfile.isVerified && (
                <View style={{
                  position: "absolute",
                  bottom: 5,
                  right: width/2 - 70,
                  backgroundColor: "#1da1f2",
                  padding: 4,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: "#fff",
                }}>
                  <Ionicons name="checkmark" size={12} color="#fff" />
                </View>
              )}
            </View>
            
            {/* User Info */}
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <Text style={{
                fontSize: 24,
                fontWeight: "800",
                color: "#333",
                marginBottom: 4,
              }}>
                {userProfile.name}
              </Text>
              
              <Text style={{
                fontSize: 16,
                color: "#666",
                marginBottom: 8,
              }}>
                {userProfile.username}
              </Text>
              
              <Text style={{
                fontSize: 15,
                color: "#333",
                textAlign: "center",
                lineHeight: 22,
                marginBottom: 12,
              }}>
                {userProfile.bio}
              </Text>
              
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 4,
              }}>
                <Ionicons name="location-outline" size={16} color="#666" />
                <Text style={{
                  fontSize: 14,
                  color: "#666",
                  marginLeft: 4,
                  marginRight: 16,
                }}>
                  {userProfile.location}
                </Text>
                
                <Ionicons name="calendar-outline" size={16} color="#666" />
                <Text style={{
                  fontSize: 14,
                  color: "#666",
                  marginLeft: 4,
                }}>
                  Joined {userProfile.joinedDate}
                </Text>
              </View>
            </View>
            
            {/* Stats Row */}
            <View style={{
              flexDirection: "row",
              backgroundColor: "#f8f9fa",
              borderRadius: 16,
              padding: 16,
              marginBottom: 20,
            }}>
              <StatItem label="Posts" value={userProfile.stats.posts} />
              <StatItem label="Followers" value={userProfile.stats.followers} />
              <StatItem label="Following" value={userProfile.stats.following} />
              <StatItem label="Rank" value={`#${userProfile.stats.ranking}`} />
            </View>
            
            {/* Learning Stats */}
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}>
              <View style={{
                flex: 1,
                backgroundColor: "#ff6b6b",
                borderRadius: 12,
                padding: 16,
                marginRight: 8,
                alignItems: "center",
              }}>
                <MaterialIcons name="school" size={24} color="#fff" />
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700", marginTop: 4 }}>
                  {userProfile.stats.batchesCompleted}
                </Text>
                <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: "500" }}>
                  Courses Completed
                </Text>
              </View>
              
              <View style={{
                flex: 1,
                backgroundColor: "#2ecc71",
                borderRadius: 12,
                padding: 16,
                marginLeft: 8,
                alignItems: "center",
              }}>
                <MaterialIcons name="schedule" size={24} color="#fff" />
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700", marginTop: 4 }}>
                  {userProfile.stats.studyHours}h
                </Text>
                <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: "500" }}>
                  Study Hours
                </Text>
              </View>
            </View>
            
            {/* Action Buttons */}
            <View style={{ flexDirection: "row", gap: 12, marginBottom: 30 }}>
              <TouchableOpacity
                onPress={() => setShowEditModal(true)}
                style={{
                  flex: 1,
                  backgroundColor: "#ff6b6b",
                  paddingVertical: 12,
                  borderRadius: 12,
                  shadowColor: "#ff6b6b",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 5,
                }}
              >
                <Text style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "700",
                }}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={{
                backgroundColor: "#f8f9fa",
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 12,
                borderWidth: 1.5,
                borderColor: "#e1e8ed",
              }}>
                <Feather name="share" size={18} color="#666" />
              </TouchableOpacity>
              
              <TouchableOpacity style={{
                backgroundColor: "#f8f9fa",
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 12,
                borderWidth: 1.5,
                borderColor: "#e1e8ed",
              }}>
                <Feather name="settings" size={18} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* TAB NAVIGATION */}
          <View style={{
            backgroundColor: "#ffffff",
            borderBottomWidth: 0.5,
            borderBottomColor: "#e1e8ed",
          }}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
            >
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab.key}
                  onPress={() => setActiveTab(tab.key)}
                  style={{
                    paddingVertical: 16,
                    paddingHorizontal: 4,
                    marginRight: 32,
                    borderBottomWidth: 2,
                    borderBottomColor: activeTab === tab.key ? "#ff6b6b" : "transparent",
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Feather 
                      name={tab.icon} 
                      size={20} 
                      color={activeTab === tab.key ? "#ff6b6b" : "#666"} 
                    />
                    <Text style={{
                      color: activeTab === tab.key ? "#ff6b6b" : "#666",
                      fontSize: 12,
                      fontWeight: activeTab === tab.key ? "700" : "500",
                      marginTop: 4,
                    }}>
                      {tab.label}
                    </Text>
                    <Text style={{
                      color: activeTab === tab.key ? "#ff6b6b" : "#999",
                      fontSize: 11,
                      fontWeight: "600",
                      marginTop: 2,
                    }}>
                      {tab.count}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          
          {/* TAB CONTENT */}
          <View style={{ paddingBottom: 120 }}>
            {renderTabContent()}
          </View>
          
        </ScrollView>
        
        {/* EDIT PROFILE MODAL */}
        <Modal
          visible={showEditModal}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <EditProfileModal 
            user={userProfile} 
            onClose={() => setShowEditModal(false)} 
          />
        </Modal>
      </View>
    </SafeAreaProvider>
  );
};

// Stat Item Component
const StatItem = ({ label, value }) => (
  <View style={{ flex: 1, alignItems: "center" }}>
    <Text style={{
      fontSize: 18,
      fontWeight: "800",
      color: "#333",
      marginBottom: 2,
    }}>
      {typeof value === 'number' && value > 999 ? `${(value/1000).toFixed(1)}k` : value}
    </Text>
    <Text style={{
      fontSize: 12,
      color: "#666",
      fontWeight: "500",
    }}>
      {label}
    </Text>
  </View>
);

// Posts Grid Component
const PostsGrid = ({ posts }) => (
  <View style={{ padding: 1 }}>
    <FlatList
      data={posts}
      numColumns={3}
      keyExtractor={(item) => item.id.toString()}
      scrollEnabled={false}
      renderItem={({ item }) => (
        <TouchableOpacity style={{
          width: (width - 4) / 3,
          height: (width - 4) / 3,
          margin: 0.5,
          position: "relative",
        }}>
          <Image
            source={{ uri: item.url }}
            style={{ width: "100%", height: "100%", borderRadius: 2 }}
          />
          {item.type === "video" && (
            <View style={{
              position: "absolute",
              top: 8,
              right: 8,
            }}>
              <Ionicons name="play" size={16} color="#fff" />
            </View>
          )}
          <View style={{
            position: "absolute",
            bottom: 4,
            left: 4,
            flexDirection: "row",
            alignItems: "center",
          }}>
            <Ionicons name="heart" size={12} color="#fff" />
            <Text style={{ color: "#fff", fontSize: 10, marginLeft: 2 }}>
              {item.likes}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  </View>
);

// Batches Grid Component
const BatchesGrid = () => {
  const completedBatches = [
    { id: 1, name: "Full Stack Development", org: "CodeBridge", image: "https://picsum.photos/200/150?random=21" },
    { id: 2, name: "React Native", org: "Mobile Academy", image: "https://picsum.photos/200/150?random=22" },
    { id: 3, name: "UI/UX Design", org: "DesignLab", image: "https://picsum.photos/200/150?random=23" },
    { id: 4, name: "Data Science", org: "DataLab", image: "https://picsum.photos/200/150?random=24" }
  ];

  return (
    <View style={{ padding: 20 }}>
      {completedBatches.map((batch) => (
        <TouchableOpacity key={batch.id} style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          marginBottom: 16,
          overflow: "hidden",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}>
          <Image
            source={{ uri: batch.image }}
            style={{ width: "100%", height: 100 }}
          />
          <View style={{ padding: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#333", marginBottom: 4 }}>
              {batch.name}
            </Text>
            <Text style={{ fontSize: 14, color: "#666" }}>
              {batch.org}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Achievements Grid Component
const AchievementsGrid = ({ achievements }) => (
  <View style={{ padding: 20 }}>
    {achievements.map((achievement) => (
      <TouchableOpacity key={achievement.id} style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}>
        <View style={{
          backgroundColor: "#f8f9fa",
          width: 50,
          height: 50,
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 16,
        }}>
          <Text style={{ fontSize: 24 }}>{achievement.icon}</Text>
        </View>
        
        <View style={{ flex: 1 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: "700",
            color: "#333",
            marginBottom: 2,
          }}>
            {achievement.title}
          </Text>
          <Text style={{
            fontSize: 14,
            color: "#666",
            marginBottom: 2,
          }}>
            {achievement.org}
          </Text>
          <Text style={{
            fontSize: 12,
            color: "#999",
          }}>
            {achievement.date}
          </Text>
        </View>
        
        <MaterialIcons name="verified" size={24} color="#2ecc71" />
      </TouchableOpacity>
    ))}
  </View>
);

// Organizations Grid Component
const OrganizationsGrid = ({ organizations }) => (
  <View style={{ padding: 20 }}>
    {organizations.map((org) => (
      <TouchableOpacity key={org.id} style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}>
        <Image
          source={{ uri: org.image }}
          style={{ width: 50, height: 50, borderRadius: 25, marginRight: 16 }}
        />
        
        <View style={{ flex: 1 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: "700",
            color: "#333",
            marginBottom: 2,
          }}>
            {org.name}
          </Text>
          <Text style={{
            fontSize: 14,
            color: "#666",
            marginBottom: 2,
          }}>
            {org.role}
          </Text>
          <Text style={{
            fontSize: 12,
            color: "#999",
          }}>
            {org.members} members
          </Text>
        </View>
        
        <TouchableOpacity style={{
          backgroundColor: "#ff6b6b",
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 20,
        }}>
          <Text style={{
            color: "#fff",
            fontSize: 12,
            fontWeight: "600",
          }}>
            Manage
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    ))}
  </View>
);

// Edit Profile Modal Component
const EditProfileModal = ({ user, onClose }) => (
  <SafeAreaProvider>
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: "#e1e8ed",
      }}>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <TouchableOpacity onPress={onClose}>
            <Text style={{ fontSize: 16, color: "#ff6b6b", fontWeight: "600" }}>
              Cancel
            </Text>
          </TouchableOpacity>
          
          <Text style={{ fontSize: 18, fontWeight: "700", color: "#333" }}>
            Edit Profile
          </Text>
          
          <TouchableOpacity onPress={() => {
            Alert.alert("Success", "Profile updated successfully!");
            onClose();
          }}>
            <Text style={{ fontSize: 16, color: "#ff6b6b", fontWeight: "600" }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <View style={{ alignItems: "center", marginBottom: 30 }}>
          <Image
            source={{ uri: user.avatar }}
            style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 16 }}
          />
          <TouchableOpacity style={{
            backgroundColor: "#ff6b6b",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 20,
          }}>
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              Change Photo
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Edit form fields would go here */}
        <Text style={{
          textAlign: "center",
          color: "#666",
          fontSize: 16,
          marginTop: 50,
        }}>
          Profile editing form fields would be implemented here...
        </Text>
      </ScrollView>
    </View>
  </SafeAreaProvider>
);

export default ProfileManagementScreen;

/*
INSTAGRAM-STYLE PROFILE FEATURES IMPLEMENTED:

👤 PROFILE HEADER:
- Cover image with overlay controls
- Profile picture with verified badge
- User stats (posts, followers, following, ranking)
- Bio, location, and join date
- Action buttons (Edit Profile, Share, Settings)

📊 LEARNING STATS:
- Courses completed counter
- Study hours tracking
- Achievement badges
- Ranking system

📱 TAB NAVIGATION (4 TABS):
- Posts: Instagram-style grid with like counts
- Courses: Completed batches with certificates
- Achievements: Certificates and awards earned  
- Organizations: Created/managed organizations

🎨 MODERN UI FEATURES:
- Professional card layouts
- Gradient overlays and shadows
- Interactive tabs with counters
- Modal for profile editing
- Responsive grid layouts

💡 SIMPLE CODE LOGIC:
- useState for tab switching and modal state
- Clean component separation for each tab
- Reusable StatItem component
- Simple data mapping with sample data
- Basic modal implementation for editing

🔧 EDTECH-SPECIFIC FEATURES:
- Course completion tracking
- Certificate management
- Organization management
- Study hours and ranking
- Learning achievements display
*/