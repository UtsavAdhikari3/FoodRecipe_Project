import { Button, Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Add an event listener for beforeunload
        const handleBeforeUnload = () => {
            // Remove the item from localStorage when the page is about to unload
            localStorage.removeItem("meroToken");
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return (
        <>
            <div>Dashboard</div>
            <Flex gap={4}>
                <Button onClick={() => navigate("/post")}>Navigate to posts</Button>
                <Button onClick={() => navigate("/recipeList")}>Navigate to recipeList</Button>
                <Button onClick={() => navigate("/")}>Logout</Button>
            </Flex>
        </>
    );
}

export default Dashboard;
