
import { useEffect, useState } from "react"
import useShowToast from "./useShowToast"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { AuthStore } from "../store/authStore"
import { UserProfile } from "../store/userProfile"
import { PostStore } from "../store/postStore"

import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../firebase/firebase"



function useGetFeedPosts() {
    const [isLoading, setIsLoading] = useState(true)
    const showToast = useShowToast()
    const user = useRecoilValue(AuthStore)
    const setUserProfile = useSetRecoilState(UserProfile)
    const [posts, setPosts] = useRecoilState(PostStore)
    

  useEffect(() => {
       console.log("useGetFeedposts hook called")
        const getFeedPosts = async () => {
            setIsLoading(true)
            if (user.following.length === 0) {
                setIsLoading(false)
                setPosts([])
                return;
            }
            const postRef = collection(firestore,'posts')
            const q = query(postRef, where('createdBy', 'in', user.following))
          try {
              
              const querySnapShot = await getDocs(q)
              const feedposts = []

              querySnapShot.forEach((doc) => {
                  feedposts.push({id:doc.id,...doc.data()})
              })

              feedposts.sort((a,b)=>b.createdAt - a.createdAt)
            setPosts(feedposts)
            console.log(feedposts)
          
          } catch (error) {
            showToast('Error',error.message,'error')
          } finally {
              setIsLoading(false)
          }
        }
      if(user) getFeedPosts()  
    }, [user, setPosts, setUserProfile, showToast])
    
    return{isLoading,posts}
}

export default useGetFeedPosts