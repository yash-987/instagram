import {  useState } from "react"
import {  useRecoilValue, } from "recoil"
import { AuthStore } from "../store/authStore"
import useShowToast from "./useShowToast";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";


function useCreateComment() {
    const [isCommenting, setIsCommenting] = useState(false)
    const user = useRecoilValue(AuthStore);
    const showToast = useShowToast()
    

    

    const handleComment = async (postId, comment) => {
        if (isCommenting) return
        if (!user) showToast("Error", 'You need to be logged in to comment', 'error');
        setIsCommenting(true)

        // creating the comment object
        const commentDoc = {
            comment,
            createdAt: Date.now(),
            createdBy: user.uid,
            postId,
        }
        try {
            //getting the reference
            const docRef = doc(firestore, 'posts', postId)
            // updating
            await updateDoc(docRef, {
                comments:arrayUnion(commentDoc)
            })
            // updated in database.
            
  
            // addCommentToPostStore(postId,comment)

            showToast('Success', "Comment Created Successfully", 'success');
        } catch (error) {
            showToast(
                'Error',
                error.message,
                'error'
            )
        } finally {
            setIsCommenting(false)
        }
    }

    return {isCommenting,handleComment}
}

export default useCreateComment