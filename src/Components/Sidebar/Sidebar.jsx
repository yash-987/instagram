import {  Box, Button, Flex, Link, Tooltip } from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';
import {
	
	InstagramLogo,
	InstagramMobileLogo,
	
	
} from '../../assets/Constants';
import { BiLogOut } from 'react-icons/bi';
import useSignout from '../../hooks/useSignout';

import SidebarItems from './SidebarItems';


function Sidebar() {
	
	

    
   const {handleLogout,isLogginOut}= useSignout()
	return (
		<Box
			h={'100vh'}
			borderRight={'1px solid'}
			borderColor={'whiteAlpha.300'}
			py={8}
			position={'sticky'}
			top={0}
			left={0}
			px={{ base: 2, md: 4 }}
		>
			<Flex direction={'column'} gap={10} w={'full'} height={'full'}>
				{/* instagram logo on big screen */}
				<Link
					as={RouterLink}
					to={'/'}
					pl={2}
					display={{ base: 'none', md: 'block' }}
					cursor={'pointer'}
				>
					<InstagramLogo />
				</Link>
				{/* instagram logo on small screen */}
				<Link
					as={RouterLink}
					to={'/'}
					p={2}
					display={{ base: 'block', md: 'none' }}
					cursor={'pointer'}
					borderRadius={6}
					_hover={{
						bg: 'whiteAlpha.200',
					}}
					w={10}
				>
					<InstagramMobileLogo />
				</Link>

				{/* SIdebar links */}
				<Flex direction={'column'} gap={5} cursor={'pointer'}>
					<SidebarItems/>
					
				</Flex>

				<Tooltip
					label={'Logout'}
					hasArrow
					placement="right"
					ml={1}
					openDelay={500}
					display={{ base: 'block', md: 'none' }}
				>
					<Flex
						onClick={handleLogout}
						mt={'auto'}
						alignItems={'center'}
						gap={4}
						_hover={{ bg: 'whiteAlpha.400' }}
						borderRadius={6}
						p={2}
						w={{ base: '10', md: 'full' }}
						justifyContent={{ base: 'center', md: 'flex-start' }}
					>
						<BiLogOut size={25} />

						<Button
							display={{ base: 'none', md: 'block' }}
							variant={'ghost'}
							isLoading={isLogginOut}
							_hover={{ bg: 'transparent' }}
						>
							Logout
						</Button>
					</Flex>
				</Tooltip>
			</Flex>
		</Box>
	);
}

export default Sidebar;
