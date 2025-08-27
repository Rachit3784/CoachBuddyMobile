import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';


const userStore = create((set, get) => ({
  userName: null,
  token: null,
  userEmailID: null,
  userModelID: null,
  userData: null,
  gender: null,
  userProfileData : null,
  

updateUserProfile : async (data) => {

  try{

   console.log(data)
    if(!data) return {message : "Data is empty" , success : false}
    const response = await fetch("http://10.164.89.113:4000/authenticate/updateProfile" , {
      method : "POST",
      headers : {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({
        UserKeyWord :  data.UserKeyWords,
        UserDescription: data.UserDescription,
        userId : data.userId
      })
    })

    const output = await response.json()


    if(!response.ok){
      return {
        message : output.msg || response.statusText || "Unknown Error coming on uploading Details " ,
        success : false
      }
    }


    set((prev)=> (

      {...prev,
  
  userEmailID: output.result.email,
  
  userData: output.result,
  
  userProfileData : {
  UserKeyWord : output.result.UserKeyWord,
  UserDescription : output.result.UserDescription

  }
}

    ) )

console.log(output.result.UserKeyWord,output.result.UserDescription)

    return  {
        message : output?.msg || "details is uploaded",
        success : true
      }

  }catch(error){
    console.log(error)
    return {message : "Failed on uploading Detail" , success : false}
  }
},


  // Signup: expects { username, fullname, email, password } as data
  createUser: async (data) => {
    try {
      const response = await fetch('http://10.164.89.113:4000/authenticate/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
       
        console.log(responseData?.msg)
        return {message : responseData?.msg || response.statusText || 'Unknown error' , success : false};
      }

      if (responseData.success) {
        // Redirect to OTP Screen and pass email for OTP verification
       

        return {message : responseData.msg , success : true};
      }

      
    } catch (error) {
      console.error('Signup Error:', error);
      return 'An error occurred during signup';
    }
  },

  // Verify OTP: expects { email, code } as data
  verifyNewUser: async (data) => {
    try {
      console.log(data)
        console.log("Signup Verified Called Inside Function")
      const b = { email: data.email, otp: data.code }
      console.log(b)
      const resp = await fetch('http://10.164.89.113:4000/authenticate/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, otp: data.code }),
      });

      const respData = await resp.json();
   
      if (!resp.ok) {
        console.log(respData.msg)
        return {message : respData?.msg || 'Error verifying user' , success : false};
      }

      
   const userDetail = respData?.detail
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
        
      }));
      
      console.log(respData?.detail)

      return {message : "Account Created " , success : true}


    } catch (error) {

      console.error('Verify OTP Error:', error);
      return {message : 'An error occurred during OTP verification' , success : false};
    }
  },

  // Login: expects { email, password } as data
  login: async (data) => {
    try {
      
      const emaill = data.email
      
      const pass = data.password 

      
      const resp = await fetch('http://10.164.89.113:4000/authenticate/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'
         },
        body: JSON.stringify({ email: emaill, password: pass}),
      });

      const respData = await resp.json();

      if (!resp.ok) {
        return {message :  respData?.msg || 'Login failed' , success : false};
      }

      
      

      if (respData?.token) {
        await SecureStore.setItemAsync('userToken', respData?.token);
      }
     
      set((currentState) => ({
         ...currentState,
        userName: respData?.detail.username,
        token:respData?.token,
        userEmailID: respData?.detail.email,
        userModelID: respData?.detail._id,
        userData: respData?.detail,
        gender: respData?.detail.gender,
        userProfileData : {
              UserDescription : respData?.detail.UserDescription,
             UserKeyWord : respData?.detail.UserKeyWord
            },
        
       
      }));
     console.log(respData.msg)
     console.log(respData?.detail)

      return {message : "Logged In Sccessfully " , success : true};
    } catch (error) {
      console.error('Login Error:', error);
      return {message : 'An error occurred during login' , success : false};
    }
  },

  // Login With Cookie (check if user session valid via cookie, no args required)
 loginWithCookie: async (token) => {
    try {
      console.log("Cookie Called")
        
      const resp = await fetch('http://10.164.89.113:4000/authenticate/verifywithCookie', {
        method: 'POST',
        headers : {
          'Authorization':`Bearer ${token}`
        } 
      });
      
      const respData = await resp.json();
       
      if (!resp.ok) {
           console.log("i am called bro i am the culprit")
           
        return {message : respData?.msg || 'Session invalid' , success : false}
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
      
      return {message : respData.msg , success : true };
    } catch (error) {
      console.error('LoginWithCookie Error:', error);
      return  {message : "Error Aa Gaya" , success : false};
    }
  },

  // Forget Password Request: expects { email } as data
  forgetPasswordRequest: async (email) => {
    try {
         console.log("Hello Ji How do you do i am resu resnfjknbfjknbkkkiiukusisusju")
      const resp = await fetch('http://10.164.89.113:4000/authenticate/forgetPass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email : email}),
      });

      const respData = await resp.json();

      if (!resp.ok) {
        return {message :  respData?.msg || 'Failed to send OTP for password recovery' , success : false};
      }
    if(respData.success){
return {message : respData.msg , success : true}
    }
    else{
      return {message : respData.msg , success : false}
    }
      
    } catch (error) {
      console.error('ForgetPasswordRequest Error:', error);
      return {message : 'An error occurred during forget password request' , success : false}
    }
  },

  // userStore.js
// Minor improvements for consistency and error handling

ResetPassword: async (data) => {
    try {
       
        

        const resp = await fetch('http://10.164.89.113:4000/authenticate/resetPass', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        
        // Handle non-200 responses gracefully
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
            userProfileData : {
              UserDescription : respData?.detail.UserDescription,
             UserKeyWord : respData?.detail.UserKeyWord
            },
            gender: respData?.detail.gender,
        }));
        
        set((c)=> {
          
          console.log(c)
          return {
          ...c
        } })
        

        return { message: "Password Reset Successfull", success: true };

    } catch (error) {
        console.log(error);
        // This catch block handles network errors or JSON parse errors
        return { message: "An unexpected error occurred. Please try again.", success: false };
    }
},

  verifyForgottedUser : async (data)=>{

     try {
         
      
      
      const resp = await fetch('http://10.164.89.113:4000/authenticate/verifyForgotUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, otp: data.code }),
      });

      const respData = await resp.json();
   
      if (!resp.ok) {
        console.log(respData.msg)
        return {message : respData?.msg || 'Error verifying user' , success : false};
      }

      
     if(!respData.success) return {message : respData.msg , success : respData.success}
     

      return {message : "OTP Verrified " , success : true}


    } catch (error) {

      console.error('Verify OTP Error:', error);
      return {message : 'An error occurred during OTP verification' , success : false};
    }
  },
  // Account Recover: expects { identifier } as data (email or username)
  accountRecover: async (data) => {
    try {
      if (!data.identifier) {
        return 'Please provide an email or username';
      }

      const resp = await fetch('http://10.164.89.113:4000/authenticate/account-recover', {
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

  // Utility - Logout User: clears stored token and state
  logout: async () => {
    await SecureStore.deleteItemAsync('userToken');
    set({
      userName: null,
      token: null,
      userEmailID: null,
      userModelID: null,
      userData: null,
      gender: null,
    });
  },

  // Utility - Load token from storage and set user state accordingly (optional)
  loadUserFromStorage: async () => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      if (!token) return false;
      // Optionally you may decode token to prefill user info or verify backend
      set({ token });
      return true;
    } catch (error) {
      console.error('LoadUserFromStorage Error:', error);
      return false;
    }
  },
}));

export default userStore;



// Replace 'YOUR_BACKEND_URL/... with your actual backend endpoints.

// For createUser, pass { username, fullname, email, password }

// For verifyNewUser, pass { email, code } where code is OTP

// For login, pass { email, password }

// For forgetPasswordRequest, pass { email }

// For accountRecover, pass { identifier } which is email or username

// Call loginWithCookie() without arguments to validate existing cookie-based session

// Use logout() to clear user session locally