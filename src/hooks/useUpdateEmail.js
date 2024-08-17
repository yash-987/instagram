import { useUpdateEmail } from "react-firebase-hooks/auth"
import { auth } from "../firebase/firebase"
import useShowToast from "./useShowToast";

const UpdateEmail = () => {
    const [updateEmail, error] = useUpdateEmail(auth);
     const showToast = useShowToast()
    const handleUpdateEmail = async (email) => {
        try {
            const success = await updateEmail(email);
            if (!success && error) {
                showToast("Error", "Error updating email", "error");
                return;
            }
            showToast("Success", "Email updated successfully", "success");
        } catch (error) {
            showToast('Error',error.message,'error')
        }
    }
    return {handleUpdateEmail}
}

export default UpdateEmail