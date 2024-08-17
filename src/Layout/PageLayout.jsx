import { Box, Flex,Spinner} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../Components/Sidebar/Sidebar';
import PropTypes from 'prop-types'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import Navbar from '../Components/Navbar/Navbar';
function PageLayout({ children }) {
	const { pathname } = useLocation();
	const [user,loading] = useAuthState(auth)
	
	const canRenderSidebar = pathname !== '/auth' && user  //this will check if user is logged in or not and it will prevent a slight render of the sidebar
    
	const canRenderNavbar = !user && !loading && pathname !== '/auth';

	const checkingUserIsAuth = !user && loading;
	if(checkingUserIsAuth) return  <PageSpinner/>
	
	return (
		<>
			<Flex flexDir={canRenderNavbar?'column':'row'}>
				{/* sidebar on the left */}
				{canRenderSidebar ? (
					<Box w={{ base: '70px', md: '240px' }}>
						<Sidebar />
					</Box>
				) : null}
				{/* Navbar */}
				{canRenderNavbar? <Navbar/>:null}

				{/* page content on the right */}
				<Box flex={1} w={{ base: 'calc(100%-70px)', md: 'calc(100% - 70px)' }}>
					{children}
				</Box>
			</Flex>
		</>
	);
}



function PageSpinner() {
	return (
		<Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
			<Spinner size='xl' />
		</Flex>
	);
}
PageLayout.propTypes = {
	children: PropTypes.node.isRequired,
}
export default PageLayout;
