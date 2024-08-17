import { useState } from "react"
import useShowToast from "./useShowToast"

const usePreviewImg = () => {
    const [selectedFile, setSelectedFile] = useState(null)
    const showToast = useShowToast()
    // size of file
    const maxSize = 2 * 1024 * 1024 //2mb

    const handleImageChange = (e) => {
        const file = e.target.files[0]

        if (file && file.type.startsWith('image/')
        
        ) {
            if (file.size > maxSize) {
                showToast('Error', 'File size must be less than 2mb', 'error');
                setSelectedFile(null)
                return
            }
            const reader = new FileReader();

            reader.onloadend = () => {
                setSelectedFile(reader.result)
            }
            reader.readAsDataURL(file)
        }
        else {
            showToast('Error', "Please select an image file", 'error');
            setSelectedFile(null)
        }
    }
    return {selectedFile,handleImageChange,setSelectedFile}
}

export default usePreviewImg