/* eslint-disable react/prop-types */
import React, { useState } from "react";
import style from "../recipe.module.css";
import { Box, Button, Flex, Grid, Image, Input, Text } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { AiOutlineSearch } from "react-icons/ai"

const RecipeCard = ({ recipeList, food, setFood, triggerAPI }) => {
    return (
        <>
            <Flex marginBottom={"8px"} justifyContent={"center"}>

                <Input type='text' placeholder='K ko recipe chaiyo?' value={food}
                    onChange={(e) => setFood(e.target.value)}
                />
                <Button onClick={() => {
                    triggerAPI()
                }}>
                    <AiOutlineSearch />
                </Button>


            </Flex>
            {recipeList.length === 0 ? (
                <Box display="flex" justifyContent={"center"} width="100%">
                    <Text>No Data</Text>
                </Box>
            ) : (
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    {recipeList.map((food, index) => {
                        return (
                            <>
                                <div key={index} className={style.recipe}>
                                    <Text>{food.recipe.label}</Text>
                                    <Text m={"0px"}>Ingredients:</Text>
                                    {food.recipe.ingredientLines.map((item, index) => {
                                        return (
                                            <Text marginBottom={"0px"} key={index}>{item}</Text>
                                        )
                                    })}
                                    <Image
                                        className={style.image}
                                        alt="food image"
                                        src={food.recipe.image}
                                    />
                                </div>
                            </>
                        );
                    })}
                </Grid>
            )}
        </>
    );
};

export default RecipeCard;
