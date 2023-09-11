import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    return (
        <>
            <div>Dashboard</div>
            <Flex gap={4}>
                <Button onClick={() => navigate("/post")}>Navigate to posts</Button>
                <Button onClick={() => navigate("/recipeList")}>Navigate to recipeList</Button>
            </Flex>
        </>
    )

}

export default Dashboard