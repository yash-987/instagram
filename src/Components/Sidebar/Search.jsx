import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tooltip, useDisclosure, } from "@chakra-ui/react";
import { SearchLogo } from "../../assets/Constants";
import useSearchUser from "../../hooks/useSearchUser";
import { useRef, useState } from "react";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";

const Search = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [userAlreadyAvailable,setUserAlreadyAvailable] = useState()
    const { user, isLoading, handleSearchUser,setUser } = useSearchUser()
    const searchRef = useRef(null)
    const SearchUser = (e) => {
        e.preventDefault()
        handleSearchUser(searchRef.current.value)
        setUserAlreadyAvailable(true)
        console.log(user)
    }
    
    const onSearchClick = () => {
        setUserAlreadyAvailable(false)
        onOpen()

    }
	return (
		<>
			<Tooltip
				hasArrow
				label={"Search"}
				placement='right'
				ml={1}
				openDelay={500}
				display={{ base: "block", md: "none" }}
			>
				<Flex
					alignItems={"center"}
					gap={4}
					_hover={{ bg: "whiteAlpha.400" }}
					borderRadius={6}
					p={2}
					w={{ base: 10, md: "full" }}
                    justifyContent={{ base: "center", md: "flex-start" }}
                    onClick={onSearchClick}

				>
					<SearchLogo />
					<Box display={{ base: "none", md: "block" }}>Search</Box>
				</Flex>
            </Tooltip>
            
            <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
                <ModalOverlay/>
                    <ModalContent bg={'black'} border={'1px solid gray'} maxW={'400px'}>
                        <ModalHeader>
                            Search User
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form onSubmit={SearchUser}>
                            <FormControl>
                                <FormLabel>Username</FormLabel>
                                <Input placeholder={
                                    'ayoitsyash'
                                } ref={searchRef}/>
                            </FormControl>
                            <Flex w={'full'} justifyContent={'flex-end'}>
                                <Button type="submit" ml={'auto'} size={'sm'} my={4} isLoading={isLoading}>
                                    Search
                             </Button>

                            </Flex>
                        </form>
                        {user && userAlreadyAvailable && <SuggestedUser user={user} setUser={setUser} />}

                    </ModalBody>
                    </ModalContent>
               

            </Modal>
		</>
	);
};

export default Search;