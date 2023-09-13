import axios from "axios";
import { useEffect, useState } from "react";
import RecipeCard from "./components/RecipeCard";
import { Box, Button, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import Dashboard from "./components/Dashboard";
import { useRoutes } from "react-router-dom";
import Posts from "./components/Posts";
import LoginForm from "./components/LoginForm";
// import Posts from "./components/Posts";


const baseURL = "https://api.edamam.com";
export const basePostURL = "https://jsonplaceholder.typicode.com"

const App = () => {

    const [food, setFood] = useState("")
    const [recipeList, setRecipeList] = useState([])

    // const APP_ID = import.meta.env.VITE_APP_ID;
    // const APP_KEY = import.meta.env.VITE_APP_KEY;

    const APP_ID = "e119e0c8";
    const APP_KEY = "f5bbc911201ddaa8b732d93b5c886884";

    const hitAPI = () => {
        axios.get(`${baseURL}/search?q=${food}&app_id=${APP_ID}&app_key=${APP_KEY}`).then((response) => {
            console.log(response)
            setRecipeList(response.data.hits)
        }).catch(() => { })
    }
    const protectedRoutes = [
        
        {
            path: "/dashboard",
            element:<Dashboard/>
        },
        {
            path: "/post",
            element: <Posts />
        }, {
            path: "/recipeList",
            element: <RecipeCard recipeList={recipeList} food={food} setFood={setFood} triggerAPI={hitAPI} />
        }
    ]
    const openRoutes = [
        {
            path : "/",
            element : <LoginForm/>
        }
    ]
    const renderedComponent = useRoutes(localStorage.getItem("meroToken")?protectedRoutes:openRoutes)

    return (
        <>

            {renderedComponent}
        </>
    );
};

export default App;
