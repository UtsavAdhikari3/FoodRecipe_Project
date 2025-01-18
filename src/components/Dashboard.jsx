import { Button, Flex, Heading, Box, VStack, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.removeItem("meroToken");
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return (
        <Box bg="gray.100" minH="100vh" py={10} px={5}>
            <Box maxW="800px" mx="auto" bg="white" p={8} borderRadius="md" boxShadow="lg">
                <Heading as="h1" size="lg" mb={6} textAlign="center">
                    Welcome to Your Dashboard
                </Heading>
                <Text textAlign="center" color="gray.600" mb={6}>
                    Navigate through the application or log out securely.
                </Text>
                <VStack spacing={4}>
                    <Button 
                        colorScheme="teal" 
                        size="lg" 
                        width="100%" 
                        onClick={() => navigate("/post")}
                    >
                        Navigate to Posts
                    </Button>
                    <Button 
                        colorScheme="blue" 
                        size="lg" 
                        width="100%" 
                        onClick={() => navigate("/recipeList")}
                    >
                        Navigate to Recipe List
                    </Button>
                    <Button 
                        colorScheme="red" 
                        size="lg" 
                        width="100%" 
                        onClick={() => {
                            localStorage.removeItem("meroToken");
                            navigate("/");
                        }}
                    >
                        Logout
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
}

export default Dashboard;
