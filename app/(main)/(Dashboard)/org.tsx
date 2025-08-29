import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList, Image, Dimensions, ActivityIndicator, Alert } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { demoBatches } from "@/Database/LocalDataBase";

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import userStore, { BASE_URL } from "@/store/userStore";
import { router } from "expo-router";

const { width , height } = Dimensions.get('window');
const HEADER_HEIGHT = 140;


const CarauselComponent = ()=>{

  const [activeIndex, setActiveIndex] = useState(0);

 const flatListRef = useRef(null);


   useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (activeIndex + 1) % adBanners.length;
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      }
      setActiveIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);

  }, [activeIndex]);

  const onCarouselScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / (width - 80 + 16));
    setActiveIndex(index);
  };

const adBanners = [
    { id: 1, title: "Up to 50% Off\non Premium Courses!", subtitle: "Limited time offer", buttonText: "Claim Now", gradient: ['#667eea', '#764ba2'], emoji: "🎓" },
    { id: 2, title: "Free Certification\nPrograms Available", subtitle: "Start learning today", buttonText: "Explore", gradient: ['#11998e', '#38ef7d'], emoji: "🏆" },
    { id: 3, title: "Join Live Sessions\nwith Expert Mentors", subtitle: "Interactive learning", buttonText: "Join Now", gradient: ['#ff9a9e', '#fecfef'], emoji: "👨‍🏫" }
  ];



  return (<>
<FlatList
              ref={flatListRef}
              data={adBanners}
              horizontal
              pagingEnabled
              snapToInterval={width - 80 + 16}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingLeft: 20 }}
              renderItem={({ item }) => (
                <TouchableOpacity style={{
                  width: width - 60,
                  marginRight: 16,
                  borderRadius: 20,
                  overflow: "hidden",
                  height: 180,
                  
                }}>
                  <LinearGradient
                    colors={item.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      flex: 1,
                      padding: 20,
                      
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{
                          color: "#fff",
                          fontSize: 22,
                          fontWeight: "800",
                          lineHeight: 28,
                          marginBottom: 6,
                        }}>
                          {item.title}
                        </Text>
                        <Text style={{
                          color: "rgba(255,255,255,0.8)",
                          fontSize: 14,
                          fontWeight: "500",
                        }}>
                          {item.subtitle}
                        </Text>
                      </View>
                      <Text style={{ fontSize: 50 }}>{item.emoji}</Text>
                    </View>
                    
                    <TouchableOpacity style={{
                      backgroundColor: "rgba(255,255,255,0.25)",
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      borderRadius: 25,
                      
                      alignSelf: "flex-start",
                    }}>
                      <Text style={{
                        color: "#fff",
                        fontWeight: "700",
                        fontSize: 14,
                      }}>
                        {item.buttonText}
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </TouchableOpacity>
              )}
              onScroll={onCarouselScroll}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
              {adBanners.map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: index === activeIndex ? '#ff6b6b' : '#ccc',
                    marginHorizontal: 4,
                  }}
                />
              ))}
            </View>
  
  </>
  )

}





const Index = () => {

  const {userName ,userModelID , loginWithCookie , token , logout , Mode , setMode , AdminId} = userStore();
  const insets = useSafeAreaInsets();
  const [toggle , setToggle] = useState(false);

  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const prevScrollY = useSharedValue(0);
  const headerVisible = useSharedValue(true);
useEffect(()=>{
    const cookieCheck = async ()=>{
      
      
      setLoading(true);

    if(token){
      

const response =  await loginWithCookie(token)

if(!response.success){

     logout()

    }




      }
      
      

    fetchBatchByPage()
    
     
    }


    
    cookieCheck()
  
   
    
   },[])


  
const itemsPerPage = 10;



const fetchBatchByPage = async () => {
  try {
    let url
    if(userModelID){
       url = `${BASE_URL}/batch/fetchByPage?page=${page}&limit=${itemsPerPage}&userId=${userModelID}`
    }
    else{
     url =  `${BASE_URL}/batch/fetchByPage?page=${page}&limit=${itemsPerPage}`
    }

    
    const res = await fetch(
      
      url,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        
      }
    );

    const response = await res.json();
    
    if (!res.ok) {
      throw new Error(response?.msg || res.statusText || "Error fetching batches");
    }

    const newArray = response.batches || [];

    setCourses((prevItems) => [...prevItems, ...newArray]);
    setPage((prevPage) => prevPage + 1);

   

    setLoading(false);
  } catch (error) {
    console.error("Error fetching batches:", error);
    setLoading(false);
  }
};



   


  

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentY = event.contentOffset.y;
      const scrollDirection = currentY - prevScrollY.value;


      if (Math.abs(scrollDirection) > 5) {
        if (currentY > 100 && scrollDirection > 0) {
          headerVisible.value = false;
        } else if (scrollDirection < 0) {
          headerVisible.value = true;
        }
      }
      prevScrollY.value = currentY;
    },
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(headerVisible.value ? 0 : -(HEADER_HEIGHT + insets.top), { duration: 350 }),
        },
      ],
    };
  });

  

  const loadMoreData = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    fetchBatchByPage()
   


  };

  

  const categories = ['All', 'Free', 'Premium', 'Popular', 'New'];
  
  
  const featuredCourses = courses.slice(0, 5);
  const popularCourses = courses.filter(course => course.totalEnrolled > 100).slice(0, 5);
  const dealsOfTheDay = courses.slice(3, 8);

  // 🔄 New: Function to render the non-uniform grid
  const renderBatchGrid = () => {
    const elements = [];
    let i = 0;
    while (i < courses.length) {
      // Group of 4 items in a 2x2 grid
      if (courses.length - i >= 4) {
        elements.push(
          <View key={`grid-${i}`} style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 }}>
            {courses.slice(i, i + 4).map((item, idx) => (
              <BatchCard key={item._id} item={item} style={{ width: '48%', marginBottom: 15 }} />
            ))}
          </View>
        );
        i += 4;
      } 
      // Group of 3 items in a horizontal row
      else if (courses.length - i >= 3) {
        elements.push(
          <View key={`row-${i}`} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
            {courses.slice(i, i + 3).map((item, idx) => (
              <BatchCard key={item._id} item={item} style={{ width: '30%', marginBottom: 15 }} />
            ))}
          </View>
        );
        i += 3;
      }
      // Remaining items
      else {
        elements.push(
          <View key={`rem-${i}`} style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 }}>
            {courses.slice(i).map((item, idx) => (
              <BatchCard key={item._id} item={item} style={{ width: '48%', marginBottom: 15 }} />
            ))}
          </View>
        );
        break;
      }
    }
    return elements;
  };

  return (
    <SafeAreaProvider>

    {/* <View style = {{backgroundColor : '#0000000c' ,width : width , position : 'absolute', top : 0 , height : height*0.06 , zIndex : 2000}}>
<Text></Text>
      </View> */}




      <View style={{ backgroundColor: "#f8f9fa", flex: 1  }}>
        
        {/* FIXED HEADER - Always visible at top */}
        <Animated.View style={[{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "#ffffffff",
          
          zIndex: 1000,
          paddingBottom: 15,
          paddingTop: insets.top,
          shadowColor: "#000000ff",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 8,
          elevation: 5,
        }, animatedHeaderStyle]}>
          
          <View style={{
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
            marginTop : 20
            
          }}>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <Image 
                source={{ uri: 'https://i.pravatar.cc/100?img=1' }}
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 22.5,
                  marginRight: 12,
                  borderWidth: 2,
                  borderColor: "#ff6b6b"
                }}
              />
              <View>
                <Text style={{ color: "#666", fontSize: 13, fontWeight: "500" }}>
                  Good morning 👋
                </Text>
                <Text style={{ color: "#333", fontWeight: "bold", fontSize: 18 }}>
                  {userName ? userName : "Hello User"}
                </Text>
              </View>
            </View>

            {
              token ? 
              (<View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity style={{
                backgroundColor: "#f8f9fa",
                padding: 10,
                borderRadius: 12,
              }}>

                <Ionicons name="chatbubble-outline" size={22} color="black" />
                
              </TouchableOpacity>
              
              <TouchableOpacity style={{
                backgroundColor: "#f8f9fa",
                padding: 10,
                borderRadius: 12,
              }}>
                <Ionicons name="notifications-outline" size={22} color="#666" />

              </TouchableOpacity>
            </View>) : 
            
            (<TouchableOpacity
              onPress={()=>{
                router.push("/(auth)/Login")
              }}
              style = {{width : width*0.2 , height : height*0.05 ,
            borderRadius : 5,
            backgroundColor: "#4c00ffc3" , alignItems : 'center' , justifyContent : 'center'}}>
            <Text style = {{color : '#fff' , fontSize : 17 , fontWeight : '700'}}>Log In</Text>

            </TouchableOpacity>)
            }


          </View>

          <View style={{
            flexDirection: "row",
            alignItems: "center",
            width : width,
            gap : 5,
            borderRadius: 16,
            paddingHorizontal: 13,
            paddingVertical: 3,
            
            justifyContent : 'space-between'
          }}>
            <View style = {{display : 'flex' , alignItems : 'center' , flexDirection : 'row' , width : width*0.8,
              borderColor : 'black' , borderWidth : 1 ,backgroundColor: "#f8f9fa", borderRadius : 10 , height : height*0.059,
              paddingHorizontal : 10
            }}>
              <Feather name="search" size={18} color="#999" />
            <TextInput 
              placeholder="Search courses, instructors..." 
              placeholderTextColor="#999"
              style={{ 
                flex: 1,
                fontSize: 15, 
                color: "#333",
                 
                paddingLeft: 12,
              }}
            />

            </View>

            <TouchableOpacity 

            style = {{backgroundColor : "#f1f1f1ff" , padding : 5 , borderRadius : 10 , borderColor : 'black' , borderWidth : 1}}
            onPress={ async ()=>{

             
            
             setMode('User')
            console.log('Dekho ab ' , Mode)
 
                
            }}
            >
              {toggle ? (<ActivityIndicator size={'small'} color={'#000000'} />)
               : (
                <>
                
                { Mode === 'User' ? <Feather 
              
              name="toggle-left" size={28} color="black" />
              :

              <Feather name="toggle-right" size={28} color="black" /> }

                </>
               )
            }
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* MAIN SCROLLABLE CONTENT */}
        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          style={{ flex: 1 }}
          contentContainerStyle={{ 
            paddingTop: HEADER_HEIGHT + insets.top + 20,
            paddingBottom: 120 
          }}
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={({ nativeEvent }) => {
            const isAtEnd = nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height >= nativeEvent.contentSize.height - 100;
            if (isAtEnd) {
              loadMoreData();
            }
          }}
        >
          
          {/* ADVERTISEMENT CAROUSEL */}
          <View style={{ marginBottom: 30 , marginLeft : 10}}>
            
          
            <CarauselComponent/>

            
            
          </View>

          {/* CATEGORY FILTER PILLS */}
          <View style={{ marginBottom: 30 }}>
            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              contentContainerStyle={{ paddingHorizontal: 20 , marginBottom : 7}}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={{
                    backgroundColor: index === 0 ? "#ff6b6b" : "#fff",
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                    borderRadius: 25,
                    marginRight: 12,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                >
                  <Text style={{
                    color: index === 0 ? "#fff" : "#666",
                    fontWeight: index === 0 ? "700" : "600",
                    fontSize: 14,
                  }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* DEALS OF THE DAY SECTION */}
          {
           dealsOfTheDay.length === 0 ?  (<></>) : (
              <View style={{ marginBottom: 30 }}>
            <View style={{ 
              flexDirection: "row", 
              justifyContent: "space-between", 
              alignItems: "center",
              paddingHorizontal: 20,
              marginBottom: 15,
            }}>
              <Text style={{ fontSize: 20, fontWeight: "800", color: "#333" }}>
                ⚡ Deals of the Day
              </Text>
              <TouchableOpacity>
                <Text style={{ color: "#ff6b6b", fontWeight: "600", fontSize: 14 }}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={dealsOfTheDay}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item._id}
              contentContainerStyle={{ paddingLeft: 20 , paddingBottom : 10 }}
              renderItem={({ item }) => (
                <DealCard item={item} />
              )}
            />
          </View>
            )
          }

          {/* FEATURED COURSES CAROUSEL */}
          {featuredCourses.length === 0 ? (<></>) : (<View style={{ marginBottom: 30 }}>
            <View style={{ 
              flexDirection: "row", 
              justifyContent: "space-between", 
              alignItems: "center",
              paddingHorizontal: 20,
              marginBottom: 15,
              
            }}>
              <Text style={{ fontSize: 20, fontWeight: "800", color: "#333" }}>
                🔥 Featured Courses
              </Text>
              <TouchableOpacity>
                <Text style={{ color: "#ff6b6b", fontWeight: "600", fontSize: 14 }}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={featuredCourses}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item._id}
              contentContainerStyle={{ paddingLeft: 20 , paddingBottom : 10}}
              renderItem={({ item }) => (
                <FeaturedCourseCard item={item} />
              )}
            />
          </View>)}

          {/* POPULAR COURSES CAROUSEL */}
          {
            popularCourses.length === 0 ? (<></>) : (
              <View style={{ marginBottom: 30 }}>
            <View style={{ 
              flexDirection: "row", 
              justifyContent: "space-between", 
              alignItems: "center",
              paddingHorizontal: 20,
              marginBottom: 15,
            }}>
              <Text style={{ fontSize: 20, fontWeight: "800", color: "#333" }}>
                📚 Popular Courses
              </Text>
              <TouchableOpacity>
                <Text style={{ color: "#ff6b6b", fontWeight: "600", fontSize: 14 }}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={popularCourses}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item._id}
              contentContainerStyle={{ paddingLeft: 20 , paddingBottom : 10 }}
              renderItem={({ item }) => (
                <PopularCourseCard item={item} />
              )}
            />
          </View>
            )
          }

          {/* ALL COURSES SECTION with non-uniform grid */}
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ 
              fontSize: 20, 
              fontWeight: "800", 
              color: "#333",
              marginBottom: 20,
            }}>
              All Courses
            </Text>
            {renderBatchGrid()}
            
            {loading && (
              <View style={{ paddingVertical: 20 }}>
                <ActivityIndicator size="large" color="#ff6b6b" />
              </View>
            )}
            {!hasMore && (
              <Text style={{ textAlign: 'center', color: '#999', marginTop: 10 }}>
                No more courses to load.
              </Text>
            )}
          </View>


        </Animated.ScrollView>
      </View>
      <View style = {{backgroundColor : '#fff' , width : width , height : height*0.05 , position : 'absolute' , bottom : 0}}>
       <Text></Text>
      </View>
    </SafeAreaProvider>
  );
};

// 🆕 Re-styled BatchCard component for better spacing and modern look
const BatchCard = ({ item, style }) => (
  <TouchableOpacity style={[{
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  }, style]}>
    <Image
      source={{ uri: item.batchimageurl }}
      style={{ width: "100%", height: 100 }}
      resizeMode="cover"
    />
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 14, fontWeight: "600", color: "#333", marginBottom: 4 }} numberOfLines={1}>
        {item.batchname}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#ff6b6b" }}>
          {item.price === "0" ? "FREE" : `₹${item.price}`}
        </Text>
        <Text style={{ fontSize: 10, color: "#999", textDecorationLine: 'line-through', marginLeft: 6 }}>
          {item.originalPrice ? `₹${item.originalPrice}` : ''}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
        <Ionicons name="star" size={12} color="#ffd700" />
        <Text style={{ fontSize: 10, color: "#666", marginLeft: 2 }}>
          {(Math.random() * 1 + 4).toFixed(1)}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

// 🆕 Re-styled DealCard to be used in the main list as well
const DealCard = ({ item }) => (
  <TouchableOpacity style={{
    width: 150,
    marginRight: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  }}>
    <Image
      source={{ uri: item.batchimageurl }}
      style={{ width: "100%", height: 80 }}
      resizeMode="cover"
    />
    
    <View style={{ padding: 8 }}>
      <Text style={{ fontSize: 12, fontWeight: "600", color: "#333", marginBottom: 4 }} numberOfLines={1}>
        {item.batchname}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
        <Text style={{ fontSize: 14, fontWeight: "800", color: "#ff6b6b" }}>
          ₹{(item.price * 0.75).toFixed(0)}
        </Text>
        <Text style={{ fontSize: 10, color: "#999", textDecorationLine: 'line-through', marginLeft: 6 }}>
          ₹{item.price}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
        <Ionicons name="star" size={12} color="#ffd700" />
        <Text style={{ fontSize: 10, color: "#666", marginLeft: 2 }}>
          {(Math.random() * 1 + 4).toFixed(1)}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

// (Existing components, left unchanged for brevity)
const FeaturedCourseCard = ({ item }) => (
  <TouchableOpacity style={{
    width: 280,
    marginRight: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  }}>
    <Image
      source={{ uri: item.batchimageurl }}
      style={{ width: "100%", height: 140 }}
      resizeMode="cover"
    />
    
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: "700", color: "#333", marginBottom: 4 }} numberOfLines={1}>
        {item.batchname}
      </Text>
      <Text style={{ fontSize: 13, color: "#666", marginBottom: 8 }}>
        by {item.createdbyteacher}
      </Text>
      
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "800", color: "#ff6b6b" }}>
          {item.price === "0" ? "FREE" : `₹${item.price}`}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="people" size={14} color="#999" />
          <Text style={{ fontSize: 12, color: "#999", marginLeft: 4 }}>
            {item.totalEnrolled}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const PopularCourseCard = ({ item }) => (
  <TouchableOpacity style={{
    width: 200,
    marginRight: 16,
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  }}>
    <Image
      source={{ uri: item.batchimageurl }}
      style={{ width: "100%", height: 100 }}
      resizeMode="cover"
    />
    
    <View style={{ padding: 12 }}>
      <Text style={{ fontSize: 14, fontWeight: "600", color: "#333", marginBottom: 4 }} numberOfLines={1}>
        {item.batchname}
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#ff6b6b" }}>
          {item.price === "0" ? "FREE" : `₹${item.price}`}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="star" size={12} color="#ffd700" />
          <Text style={{ fontSize: 11, color: "#666", marginLeft: 2 }}>
            {(Math.random() * 1 + 4).toFixed(1)}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default Index;