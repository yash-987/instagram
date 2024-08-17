import { useState } from "react"
import useShowToast from "./useShowToast"
import { collection,  getDocs, query, where } from "firebase/firestore"
import { firestore } from "../firebase/firebase"



function useSearchUser() {
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(null)
    const showToast = useShowToast()

    const handleSearchUser = async (username) => {
        setIsLoading(true)
        setUser(null)
        try {
            const userRef = collection(firestore,'users')
            const q = query(userRef, where('username', '==', username));

            // executing the query
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) return showToast('Error',
                "User not found",
                'error'
            )

            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            })
        } catch (error) {
          
            console.log(error

            )
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }

    return {isLoading,user,handleSearchUser,setUser}
}

export default useSearchUser