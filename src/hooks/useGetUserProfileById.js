import { useEffect, useState } from "react"
import useShowToast from "./useShowToast";
import { doc,  getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";


function useGetUserProfileById(userId) {
    const [isLoading, setIsloading] = useState(true);
    const [userProfile, setUserProfile] = useState(null)
    const showToast = useShowToast()


    useEffect(() => {
        console.log(
            'userGetProfilebyid hook called'
        )
        const getUserProfile = async () => {
            setIsloading(true)
            setUserProfile(null)
            try {
                const userRef = doc(firestore, 'users', userId)
                const userDoc = await getDoc(userRef)

                if (userDoc.exists()) {
                    setUserProfile(userDoc.data())
                }
            } catch (error) {
                showToast("Error", error.message, 'error')
                console.log(error.message)
            } finally {
                setIsloading(false)
            }
        }
        getUserProfile()
    }, [setUserProfile, showToast, userId])
    
    return {isLoading,userProfile,setUserProfile}

}

export default useGetUserProfileById