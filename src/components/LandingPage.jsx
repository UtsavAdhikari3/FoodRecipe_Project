import { Box, Button, Flex, Heading, Text, VStack, Image } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
  return (
    <Box>
      {/* Navbar */}
      <Flex as="nav" bg="teal.500" color="white" p={4} justify="space-between" align="center">
        <Heading size="lg">Recipe Book</Heading>
        <Button colorScheme="blue" variant="outline" onClick={() => navigate('/login')}>Sign In</Button>
      </Flex>

      <VStack spacing={6} textAlign="center" mt={10} p={5}>
        <Heading size="xl">Welcome to Recipe Book</Heading>
        <Image 
          src="heroImage.jpg"
          alt="Delicious food"
          borderRadius="lg"
          height={{ base: "100px", md: "500px" }}
          width={{ base: "80%", md: "50%" }}
          objectFit="cover"
        />
        <Text fontSize="lg" maxW="600px">
          Discover and share amazing recipes with our community. Whether you're a beginner or a pro, find the perfect dish to cook today!
        </Text>
        <Button colorScheme="teal" size="lg" onClick={()=>navigate('/login')}>Get Started</Button>
      </VStack>
    </Box>
  );
};

export default LandingPage;