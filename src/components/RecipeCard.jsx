/* eslint-disable react/prop-types */
import React from "react";
import { Box, Button, Flex, Grid, Image, Input, Text, VStack } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";

const RecipeCard = ({ recipeList, food, setFood, triggerAPI }) => {
    return (
        <Box p={6} bg="gray.50" minH="100vh">
            {/* Search Section */}
            <Flex justifyContent="center" mb={8} alignItems="center">
                <Input
                    placeholder="What recipe are you looking for?"
                    value={food}
                    onChange={(e) => setFood(e.target.value)}
                    size="lg"
                    mr={2}
                    maxW="400px"
                    bg="white"
                    boxShadow="md"
                />
                <Button
                    colorScheme="teal"
                    size="lg"
                    onClick={triggerAPI}
                    leftIcon={<AiOutlineSearch />}
                >
                    Search
                </Button>
            </Flex>

            {/* Recipe List */}
            {recipeList.length === 0 ? (
                <Flex justifyContent="center" alignItems="center" height="50vh">
                    <Text fontSize="xl" color="gray.500">
                        No recipes found. Try searching for something else!
                    </Text>
                </Flex>
            ) : (
                <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
                    {recipeList.map((food, index) => (
                        <Box
                            key={index}
                            bg="white"
                            borderRadius="md"
                            boxShadow="md"
                            overflow="hidden"
                            p={4}
                            transition="transform 0.2s"
                            _hover={{ transform: "scale(1.02)" }}
                        >
                            <Image
                                src={food.recipe.image}
                                alt="Food"
                                borderRadius="md"
                                mb={4}
                                boxShadow="sm"
                            />
                            <VStack align="start" spacing={2}>
                                <Text fontSize="lg" fontWeight="bold">
                                    {food.recipe.label}
                                </Text>
                                <Text fontSize="sm" color="gray.600" fontWeight="semibold">
                                    Ingredients:
                                </Text>
                                {food.recipe.ingredientLines.map((item, index) => (
                                    <Text key={index} fontSize="sm" color="gray.700">
                                        - {item}
                                    </Text>
                                ))}
                            </VStack>
                        </Box>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default RecipeCard;
