import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

export default function useShowToast() {
    const toast = useToast()
    const showToast = useCallback((title, description, status) => {
            toast({
                title: title,
                description: description,
                status: status,
                duration: 3000,
                isClosable: true
            })
        
   },[toast])




    return showToast;
}