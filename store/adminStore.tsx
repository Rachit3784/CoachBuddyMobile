import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';
import { BASE_URL } from './userStore';



export const  adminStore = create(
    
    persist(

        (set,get)=>({

            adminId : null,

            setAdmin : async (id)=>{
                set(e=>({...e, adminId : id}));

            },

            applyToAdmin : async (data)=>{
                try{
                   console.log(data)
                    const resp = await fetch(`${BASE_URL}/update/toAdmin` , {
                        method : 'POST',
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify( { email : data.userEmailID , userId : data.userModelID  ,adminName : data.userName} )
                    }) 

                    

                    const response = await resp.json()

                    if(!(await resp).ok){
                        console.log(response.msg)
                        return {message : response.msg || (await resp).statusText || "Unknown Error" , success : false}
                    }

                    console.log(response.msg);

                    if(response.success){

                        set((state)=>({
                            ...state , 
                            adminId : response.adminId
                        }))

 return { message : response.msg , success : true}

                    }

                   return {message : "Error" , success : false}



                }catch(error){
                    console.log(error)
                    return {message : "Error on applying for admin" , success : false}
                }
            }





        }),{
            name : 'zustand',
            storage : createJSONStorage(()=>AsyncStorage)
        }
    )
)