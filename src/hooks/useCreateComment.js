import {   useState } from "react"
import {  useRecoilValue, useSetRecoilState, } from "recoil"
import { AuthStore } from "../store/authStore"
import useShowToast from "./useShowToast";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { PostStore } from "../store/postStore";



function useCreateComment() {
    const [isCommenting, setIsCommenting] = useState(false)
    const user = useRecoilValue(AuthStore);
    const showToast = useShowToast()
    
    const setPosts = useSetRecoilState(PostStore)
    

    

    const handleComment = async (postId, comment) => {

        if (isCommenting) return
        if (!user) showToast("Error", 'You need to be logged in to comment', 'error');
 
        setIsCommenting(true)

       
        // creating the comment object
        
        //adding comment to post store
        const addCommentToPostStore = (postId, comment) => {
            setPosts((prevPosts) =>
                prevPosts.map((post) => {
                    if (post.id === postId) {
                        return {
                            ...post,
                            comments: [...post.comments, comment],
                        };
                    }
                    return post;
                })
            );
        };
        const commentDoc = {
            
            comment,
            createdAt: Date.now(),
            createdBy: user.uid,
            postId,
        }
       
        try {

            
            //getting the reference
            const postRef = doc(firestore, 'posts', postId)
            // updating
            await updateDoc(postRef, {
                comments:arrayUnion(commentDoc)
            })
            
         
            
            // updated in database.
            
  
            addCommentToPostStore(postId,commentDoc)

            showToast('Success', "Comment Created Successfully", 'success');
        
            console.log(commentDoc)
         
                
        } catch (error) {
            showToast(
                'Error',
                error.message,
                'error'
            )
            console.log('error',error.message)
        } finally {
            setIsCommenting(false)
        }
    }

    return {isCommenting,handleComment}
}

export default useCreateComment