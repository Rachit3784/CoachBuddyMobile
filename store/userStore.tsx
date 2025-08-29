import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { createJSONStorage, persist } from 'zustand/middleware';
import { adminStore } from './adminStore';



// Your base URL centralized here
export const BASE_URL = "http://10.164.89.64:4000";

const userStore = create(persist(
  (set, get) => ({
    userName: null,
    token: null,
    userEmailID: null,
    userModelID: null,
    userData: null,
    gender: null,
    userProfileData: null,
    Mode: 'User',
    


    updateToAdmin : (data)=>{
     
    },

    setMode : async (mode)=>{

     await set((e)=>({   ...e ,  Mode : mode }))
       
     return true


    },

    updateUserProfile: async (data) => {
      try {
        console.log(data);
        if (!data) return { message: "Data is empty", success: false };
        const response = await fetch(`${BASE_URL}/authenticate/updateProfile`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            UserKeyWord: data.UserKeyWords,
            UserDescription: data.UserDescription,
            userId: data.userId
          })
        });

        const output = await response.json();

        if (!response.ok) {
          return {
            message: output.msg || response.statusText || "Unknown Error uploading details",
            success: false
          };
        }

        set((prev) => ({
          ...prev,
          userEmailID: output.result.email,
          userData: output.result,
          userProfileData: {
            UserKeyWord: output.result.UserKeyWord,
            UserDescription: output.result.UserDescription
          },
           Mode : "User"
        }));

        console.log(output.result.UserKeyWord, output.result.UserDescription);

        return {
          message: output?.msg || "details uploaded",
          success: true
        };

      } catch (error) {
        console.log(error);
        return { message: "Failed uploading details", success: false };
      }
    },

    createUser: async (data) => {
      try {
        const response = await fetch(`${BASE_URL}/authenticate/register`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const responseData = await response.json();

        if (!response.ok) {
          console.log(responseData?.msg);
          return { message: responseData?.msg || response.statusText || 'Unknown error', success: false };
        }

        if (responseData.success) {
          return { message: responseData.msg, success: true };
        }
      } catch (error) {
        console.error('Signup Error:', error);
        return 'An error occurred during signup';
      }
    },

    verifyNewUser: async (data) => {
      try {
        console.log(data);
        const resp = await fetch(`${BASE_URL}/authenticate/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email, otp: data.code }),
        });

        const respData = await resp.json();

        if (!resp.ok) {
          console.log(respData.msg);
          return { message: respData?.msg || 'Error verifying user', success: false };
        }

        if (respData?.token) {
          await SecureStore.setItemAsync('userToken', respData.token);
        }

        set((currentState) => ({
          ...currentState,
          userName: respData?.detail.username,
          token: respData?.token,
          userEmailID: respData?.detail.email,
          userModelID: respData?.detail._id,
          userData: respData?.detail,
          gender: respData?.detail.gender,
          Mode : "User"
        }));

        console.log(respData?.detail);

        return { message: "Account Created", success: true };
      } catch (error) {
        console.error('Verify OTP Error:', error);
        return { message: 'An error occurred during OTP verification', success: false };
      }
    },

    login: async (data) => {
      try {
        const emaill = data.email;
        const pass = data.password;

        const resp = await fetch(`${BASE_URL}/authenticate/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emaill, password: pass }),
        });

        const respData = await resp.json();

        if (!resp.ok) {
          return { message: respData?.msg || 'Login failed', success: false };
        }

        if (respData?.token) {
          await SecureStore.setItemAsync('userToken', respData.token);
        }

        set((currentState) => ({
          ...currentState,
          userName: respData?.detail.username,
          token: respData?.token,
          userEmailID: respData?.detail.email,
          userModelID: respData?.detail._id,
          userData: respData?.detail,
          gender: respData?.detail.gender,
          userProfileData: {
            UserDescription: respData?.detail.UserDescription,
            UserKeyWord: respData?.detail.UserKeyWord
          },
          Mode : "User"
        }));


        // await adminStore.getState().setAdmin(respData?.detail.admin);
        // console.log(respData?.detail.admin)

        // console.log(respData.msg);
        // console.log(respData?.detail);

        return { message: "Logged In Successfully", success: true };
      } catch (error) {
        console.error('Login Error:', error);
        return { message: 'An error occurred during login', success: false };
      }
    },

    loginWithCookie: async (token) => {
      try {
        

        const resp = await fetch(`${BASE_URL}/authenticate/verifywithCookie`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const respData = await resp.json();

        if (!resp.ok) {
          console.log("Session invalid");
          return { message: respData?.msg || 'Session invalid', success: false };
        }
        const user = respData?.userdata;



        set((currentState) => ({
          ...currentState,
          userName: user?.username,
          userEmailID: user?.email,
          userModelID: user?._id,
          userData: user,
          gender: user?.gender,
          
        }));

        
        await adminStore.getState().setAdmin(user.admin);
        console.log(user.admin,"oooooooooooooooooooo")

        return { message: respData.msg, success: true };
      } catch (error) {
        console.error('LoginWithCookie Error:', error);
        return { message: "Error occurred", success: false };
      }
    },

    forgetPasswordRequest: async (email) => {
      try {
        console.log("Forget Password Request Called");
        const resp = await fetch(`${BASE_URL}/authenticate/forgetPass`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        const respData = await resp.json();

        if (!resp.ok) {
          return { message: respData?.msg || 'Failed to send OTP for password recovery', success: false };
        }
        if (respData.success) {
          return { message: respData.msg, success: true };
        } else {
          return { message: respData.msg, success: false };
        }

      } catch (error) {
        console.error('ForgetPasswordRequest Error:', error);
        return { message: 'An error occurred during forget password request', success: false };
      }
    },

    ResetPassword: async (data) => {
      try {
        const resp = await fetch(`${BASE_URL}/authenticate/resetPass`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!resp.ok) {
          const errorData = await resp.json();
          return { message: errorData.msg || "Error resetting password", success: false };
        }

        const respData = await resp.json();

        if (respData?.token) {
          await SecureStore.setItemAsync('userToken', respData.token);
        }

        set((currentState) => ({
          ...currentState,
          userName: respData?.detail.username,
          token: respData?.token,
          userEmailID: respData?.detail.email,
          userModelID: respData?.detail._id,
          userData: respData?.detail,
          userProfileData: {
            UserDescription: respData?.detail.UserDescription,
            UserKeyWord: respData?.detail.UserKeyWord
          },
          gender: respData?.detail.gender,
          Mode : "User"
        }));

        console.log(get());

        return { message: "Password Reset Successful", success: true };

      } catch (error) {
        console.log(error);
        return { message: "Unexpected error occurred. Please try again.", success: false };
      }
    },

    verifyForgottedUser: async (data) => {
      try {
        const resp = await fetch(`${BASE_URL}/authenticate/verifyForgotUser`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email, otp: data.code }),
        });

        const respData = await resp.json();

        if (!resp.ok) {
          console.log(respData.msg);
          return { message: respData?.msg || 'Error verifying user', success: false };
        }

        if (!respData.success) return { message: respData.msg, success: respData.success };

        return { message: "OTP Verified", success: true };

      } catch (error) {
        console.error('Verify OTP Error:', error);
        return { message: 'An error occurred during OTP verification', success: false };
      }
    },

    accountRecover: async (data) => {
      try {
        if (!data.identifier) {
          return 'Please provide an email or username';
        }

        const resp = await fetch(`${BASE_URL}/authenticate/account-recover`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier: data.identifier }),
        });

        const respData = await resp.json();

        if (!resp.ok) {
          return respData?.msg || 'Account recovery failed';
        }

        return respData;
      } catch (error) {
        console.error('AccountRecover Error:', error);
        return 'An error occurred during account recovery';
      }
    },

    logout: async () => {
      await SecureStore.deleteItemAsync('userToken');
      set({
        userName: null,
        token: null,
        userEmailID: null,
        userModelID: null,
        userData: null,
        gender: null,
        userProfileData: null,
        Mode : 'User'
      });
      await AsyncStorage.removeItem('zustand'); 
    },

    loadUserFromStorage: async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        if (!token) return false;
        set({ token });
        return true;
      } catch (error) {
        console.error('LoadUserFromStorage Error:', error);
        return false;
      }
    },









  }




),
  {
    name: 'zustand',       // Storage key in AsyncStorage
     storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage for React Native / Expo persistence
    // Optional: partialize: (state) => ({ token: state.token, userName: state.userName }), to persist selected keys only
  }
));

export default userStore;

