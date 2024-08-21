import { useState } from "react"
import { useRecoilValue } from "recoil"
import { AuthStore } from "../store/authStore"
import useShowToast from "./useShowToast"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { firestore } from "../firebase/firebase"


function useLikePost(post) {
    const user = useRecoilValue(AuthStore)
    const [isUpdating, setIsUpdating] = useState(false)
    const [likeCount, setLikeCount] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(post.likes.includes(user.uid));
    const showToast = useShowToast()

    const handleLikePost = async () => {
        if (isUpdating) return;
        if(!user) return showToast('Error','You must be logged in to like a post','error')
        setIsUpdating(true);
        
        try {
            const postRef = doc(firestore, 'posts', post.id)
            await updateDoc(postRef, {
                likes: isLiked? arrayRemove(user.uid) : arrayUnion(user.uid)
            })

            console.log(post.id)

            // updating the isliked state
            setIsLiked(!isLiked)

            // updating likes count
            isLiked? setLikeCount(likeCount-1) : setLikeCount(likeCount + 1) 
        } catch (error) {
            showToast('Error',error.message,'error')
        } finally {
            setIsUpdating(false)
        }
    }

    return {isLiked,likeCount,isUpdating,handleLikePost}
}

export default useLikePost