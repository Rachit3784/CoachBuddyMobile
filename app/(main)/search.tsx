import React, { useState, useCallback } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  Dimensions, 
  FlatList,
  Modal,
  Alert 
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Feather, Ionicons, Entypo } from "@expo/vector-icons";

const { width } = Dimensions.get('window');

// Sample social media posts data
const socialPosts = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      username: "@sarah_dev",
      avatar: "https://i.pravatar.cc/100?img=1",
      isVerified: true
    },
    timestamp: "2h ago",
    type: "text_with_image",
    content: "Just completed my Full Stack Development course! 🎉 The journey was amazing and I learned so much. Thanks to all the amazing instructors! 💻✨",
    media: {
      type: "image",
      url: "https://picsum.photos/400/300?random=1"
    },
    likes: 234,
    comments: 45,
    shares: 12,
    isLiked: false
  },
  {
    id: 2,
    user: {
      name: "Alex Chen",
      username: "@alex_codes",
      avatar: "https://i.pravatar.cc/100?img=2",
      isVerified: false
    },
    timestamp: "4h ago",
    type: "image_gallery",
    content: "My UI/UX design evolution over the past year! From left to right - practice makes perfect! 🎨✨ What do you think?",
    media: {
      type: "image_gallery",
      urls: [
        "https://picsum.photos/400/300?random=20",
        "https://picsum.photos/400/300?random=21",
        "https://picsum.photos/400/300?random=22"
      ]
    },
    likes: 298,
    comments: 34,
    shares: 19,
    isLiked: true
  },
  {
    id: 3,
    user: {
      name: "Emma Wilson",
      username: "@emma_learns",
      avatar: "https://i.pravatar.cc/100?img=3",
      isVerified: true
    },
    timestamp: "6h ago",
    type: "text_only",
    content: "Anyone else struggling with Data Structures and Algorithms? Looking for study partners! Drop your favorite learning resources below 📚👇",
    likes: 156,
    comments: 89,
    shares: 8,
    isLiked: false
  },
  {
    id: 4,
    user: {
      name: "Mike Rodriguez",
      username: "@mike_design",
      avatar: "https://i.pravatar.cc/100?img=4",
      isVerified: false
    },
    timestamp: "8h ago",
    type: "video",
    content: "Quick tip: How to optimize your React components for better performance! Swipe to see the code examples 👆",
    media: {
      type: "video",
      url: "https://picsum.photos/400/300?random=4",
      duration: "2:34"
    },
    likes: 189,
    comments: 67,
    shares: 23,
    isLiked: true
  }
];

// Reusable component for media galleries
const PostMediaGallery = ({ media }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const onScroll = (e) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveImageIndex(newIndex);
  };

  return (
    <View style={{ marginBottom: 12 }}>
      <FlatList
        data={media.urls}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item}-${index}`}
        onScroll={onScroll}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ width: width, height: 300 }}
            resizeMode="cover"
          />
        )}
      />
      {/* Pagination dots */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: 10, left: 0, right: 0 }}>
        {media.urls.map((_, index) => (
          <View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: index === activeImageIndex ? '#ff6b6b' : 'rgba(255,255,255,0.6)',
              marginHorizontal: 4,
            }}
          />
        ))}
      </View>
    </View>
  );
};

// Extracted Modal Component for better performance
const PostOptionsModal = ({ postId, onClose, onAction }) => {
  const isVisible = postId !== null;
  
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.3)",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={onClose}
      >
        <View style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          marginHorizontal: 40,
          paddingVertical: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 16,
          elevation: 12,
        }}>
          <Text style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "700",
            color: "#333",
            marginBottom: 20,
          }}>
            Post Options
          </Text>
          
          {[
            { icon: "bookmark-outline", text: "Save Post", color: "#666" },
            { icon: "flag-outline", text: "Report Post", color: "#ff6b6b" },
            { icon: "person-remove-outline", text: "Unfollow User", color: "#666" },
            { icon: "eye-off-outline", text: "Hide Post", color: "#666" },
          ].map((option, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingVertical: 12,
              }}
              onPress={() => onAction(option.text)}
            >
              <Ionicons name={option.icon} size={20} color={option.color} />
              <Text style={{
                marginLeft: 16,
                fontSize: 16,
                color: option.color,
                fontWeight: "500",
              }}>
                {option.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

// Individual Post Card Component
const PostCard = ({ 
  post, 
  onLike, 
  onComment, 
  onShare, 
  onShowOptions, 
}) => {
  
  return (
    <View style={{
      backgroundColor: "#ffffff",
      marginBottom: 8,
      borderBottomWidth: 0.5,
      borderBottomColor: "#e1e8ed",
    }}>
      
      {/* POST HEADER - User info and options */}
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 12,
      }}>
        {/* User Avatar */}
        <Image
          source={{ uri: post.user.avatar }}
          style={{
            width: 45,
            height: 45,
            borderRadius: 22.5,
            marginRight: 12,
          }}
        />
        
        {/* User Info */}
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{
              fontSize: 16,
              fontWeight: "700",
              color: "#333",
              marginRight: 4,
            }}>
              {post.user.name}
            </Text>
            {post.user.isVerified && (
              <Ionicons name="checkmark-circle" size={16} color="#1da1f2" />
            )}
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{
              fontSize: 14,
              color: "#8899a6",
              marginRight: 6,
            }}>
              {post.user.username}
            </Text>
            <Text style={{ color: "#8899a6", fontSize: 14 }}>•</Text>
            <Text style={{
              fontSize: 14,
              color: "#8899a6",
              marginLeft: 6,
            }}>
              {post.timestamp}
            </Text>
          </View>
        </View>
        
        {/* Three Dots Menu */}
        <TouchableOpacity
          onPress={() => onShowOptions(post.id)}
          style={{
            padding: 8,
            borderRadius: 20,
          }}
        >
          <Entypo name="dots-three-horizontal" size={18} color="#8899a6" />
        </TouchableOpacity>
      </View>
      
      {/* POST CONTENT - Text */}
      <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
        <Text style={{
          fontSize: 16,
          lineHeight: 22,
          color: "#333",
          fontWeight: "400",
        }}>
          {post.content}
        </Text>
      </View>
      
      {/* POST MEDIA - Image or Video */}
      {post.media && (
        <>
          {post.media.type === "image" ? (
            <Image
              source={{ uri: post.media.url }}
              style={{
                width: "100%",
                height: 300,
              }}
              resizeMode="cover"
            />
          ) : post.media.type === "video" ? (
            <View style={{ position: "relative" }}>
              <Image
                source={{ uri: post.media.url }}
                style={{
                  width: "100%",
                  height: 300,
                }}
                resizeMode="cover"
              />
              {/* Video Play Button Overlay */}
              <View style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.3)",
              }}>
                <TouchableOpacity style={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                  <Ionicons name="play" size={24} color="#333" style={{ marginLeft: 3 }} />
                </TouchableOpacity>
              </View>
              {/* Video Duration Badge */}
              <View style={{
                position: "absolute",
                bottom: 12,
                right: 12,
                backgroundColor: "rgba(0,0,0,0.8)",
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4,
              }}>
                <Text style={{ color: "#fff", fontSize: 12, fontWeight: "600" }}>
                  {post.media.duration}
                </Text>
              </View>
            </View>
          ) : post.media.type === "image_gallery" ? (
            <PostMediaGallery media={post.media} />
          ) : null}
        </>
      )}
      
      {/* POST ACTIONS - Like, Comment, Share */}
      <View style={{
        flexDirection: "row",
        justifyContent: "space-around",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderTopWidth: 0.5,
        borderTopColor: "#e1e8ed",
      }}>
        {/* Like Button */}
        <TouchableOpacity
          onPress={() => onLike(post.id)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
            paddingVertical: 8,
          }}
        >
          <Ionicons
            name={post.isLiked ? "heart" : "heart-outline"}
            size={20}
            color={post.isLiked ? "#ff6b6b" : "#8899a6"}
          />
          <Text style={{
            marginLeft: 6,
            color: post.isLiked ? "#ff6b6b" : "#8899a6",
            fontSize: 14,
            fontWeight: "600",
          }}>
            {post.likes}
          </Text>
        </TouchableOpacity>
        
        {/* Comment Button */}
        <TouchableOpacity
          onPress={() => onComment(post.id)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
            paddingVertical: 8,
          }}
        >
          <Ionicons name="chatbubble-outline" size={20} color="#8899a6" />
          <Text style={{
            marginLeft: 6,
            color: "#8899a6",
            fontSize: 14,
            fontWeight: "600",
          }}>
            {post.comments}
          </Text>
        </TouchableOpacity>
        
        {/* Share Button */}
        <TouchableOpacity
          onPress={() => onShare(post.id)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
            paddingVertical: 8,
          }}
        >
          <Ionicons name="share-outline" size={20} color="#8899a6" />
          <Text style={{
            marginLeft: 6,
            color: "#8899a6",
            fontSize: 14,
            fontWeight: "600",
          }}>
            {post.shares}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Memoize the PostCard component to prevent unnecessary re-renders
const MemoizedPostCard = React.memo(PostCard);

export default function SocialMediaScreen() {
  const [posts, setPosts] = useState(socialPosts);
  // Renamed state to be more specific to the modal
  const [modalPostId, setModalPostId] = useState(null); 
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Memoized handler functions using useCallback
  const handleLike = useCallback((postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  }, []);

  const handleShare = useCallback(() => {
    Alert.alert("Share Post", "Share functionality would open sharing options");
  }, []);

  const handleComment = useCallback(() => {
    Alert.alert("Comments", "Comments screen would open here");
  }, []);
  
  // Pass the post id to the modal state
  const showPostOptions = useCallback((postId) => {
    setModalPostId(postId);
  }, []);

  const closeDropdown = useCallback(() => {
    setModalPostId(null);
  }, []);

  const handleModalAction = useCallback((actionText) => {
    Alert.alert("Action", `${actionText} selected`);
    setModalPostId(null);
  }, []);
  
  const loadMorePosts = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const newPosts = socialPosts.map(post => ({
        ...post,
        id: post.id + posts.length, 
        timestamp: `${Math.floor(Math.random() * 10) + 1}h ago`,
        isLiked: false,
        likes: Math.floor(Math.random() * 500),
      }));
      
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setPage(prevPage => prevPage + 1);
      setIsLoading(false);
      
      if (page >= 3) { 
        setHasMore(false);
      }
    }, 1000);
  }, [isLoading, hasMore, page, posts.length]);

  return (
    <SafeAreaProvider>
      <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
        
        {/* HEADER */}
        <View style={{
          paddingTop: 50,
          paddingBottom: 15,
          paddingHorizontal: 20,
          backgroundColor: "#ffffff",
          borderBottomWidth: 0.5,
          borderBottomColor: "#e1e8ed",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 2,
        }}>
          <View style={{ 
            flexDirection: "row", 
            justifyContent: "space-between", 
            alignItems: "center" 
          }}>
            <Text style={{ 
              fontSize: 24, 
              fontWeight: "800", 
              color: "#333",
              letterSpacing: -0.5
            }}>
              Social Feed
            </Text>
            
            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity style={{
                backgroundColor: "#f8f9fa",
                padding: 10,
                borderRadius: 12,
              }}>
                <Feather name="search" size={20} color="#666" />
              </TouchableOpacity>
              
              <TouchableOpacity style={{
                backgroundColor: "#ff6b6b",
                padding: 10,
                borderRadius: 12,
                shadowColor: "#ff6b6b",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 3,
              }}>
                <Feather name="plus" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* POSTS FEED */}
        <FlatList
          data={posts}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }} 
          renderItem={({ item }) => (
            <MemoizedPostCard 
              post={item} 
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
              onShowOptions={showPostOptions}
            />
          )}
          onEndReached={loadMorePosts}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => (
            <View style={{ paddingVertical: 20 }}>
              {isLoading && <Text style={{ textAlign: 'center', color: '#888' }}>Loading more posts...</Text>}
              {!hasMore && (
                <Text style={{ textAlign: 'center', color: '#888' }}>
                  You've reached the end of the feed.
                </Text>
              )}
            </View>
          )}
        />
      </View>
      
      {/* The modal is now outside the FlatList and only renders when needed */}
      <PostOptionsModal
        postId={modalPostId}
        onClose={closeDropdown}
        onAction={handleModalAction}
      />
    </SafeAreaProvider>
  );
};