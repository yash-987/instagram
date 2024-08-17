import { useRecoilValue } from "recoil";
import { AuthStore } from "../store/authStore";
import {  useState } from "react";
import useShowToast from "./useShowToast";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import {  PostStore, } from "../store/postStore";
import { arrayRemove, deleteDoc, doc } from "firebase/firestore";

export default function useDeletePost() {
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const user = useRecoilValue(AuthStore);
    const post = useRecoilValue(PostStore)
    
     const showToast = useShowToast()
   
    const handleDeletePost = async () => {
        if (isDeleted) return
        
            setIsLoading(true)
            setIsDeleted(true);
            if (!window.confirm("Are you sure you want to delete this post?")) return
            try {
                const imageRef = ref(storage, `posts/${post.id}`)
                await deleteObject(imageRef)

                const userRef = doc(firestore, 'users', user.uid)
                
                await deleteDoc(userRef, {
                    posts:arrayRemove(post.id)
                })
                
                showToast("Success","Post deleted Successfully",'success')


            } catch (error) {
                showToast("Error", error.message, 'error')
                
            } finally {
                
                setIsDeleted(false)
                setIsLoading(false)

            }
        }



    return {isLoading,post,handleDeletePost}
}
