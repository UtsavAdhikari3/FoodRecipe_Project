import * as React from "react";
import { Center, ChakraProvider, Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";


const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
  
      .max(10, "too long")
      .required("Password is required"),
  });
  
  function LoginForm() {
    const navigate = useNavigate();
  
    // const {
    //   register,
    //   handleSubmit,
    //   formState: { errors },
    //   reset,
    // } = useForm({
    //   defaultValues: {
    //     email: "",
    //     password: "",
    //   },
    //   resolver: yupResolver(schema),
    // });
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      defaultValues: {
        email: "",
        password: "",
      },
      resolver: yupResolver(schema),
    });
    const loginFormSubmit = (data) => {
      console.log(data);
      axios.post("https://api.escuelajs.co/api/v1/auth/login",data).then((res)=>{
        localStorage.setItem("meroToken",res.data.access_token)
        navigate("/Dashboard")

    }).catch((err)=>{
        console.log(err)
      })
      // getValues
    };
    console.log(errors, "errors");
    return (
      <Flex height={"100vh"} alignItems={"Center"}>
        <Box
          bg="white"
          w="400px"
          p={4}
          mx="auto"
          mt={4}
          borderRadius="md"
          boxShadow="md"
          alignContent={"center"}
        >
          <Image
            mx="auto"
            boxSize="100px"
            src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
            alt="Facebook Logo"
          />
          <Text fontSize="xl" mb={2} textAlign="center">
            Log in to our App to get into Dashboard.
          </Text>
          <form onSubmit={handleSubmit(loginFormSubmit)}>
            <FormControl id="email">
              <FormLabel>Email or Phone Number</FormLabel>
              <Input
                // onChange={(e)=>SVGAnimateTransformElement(e.taege,sd,value)}
                type="email"
                id="email"
                placeholder="example@mail.com"
                {...register("email")}
              />
              {errors.email && <Text color="red">{errors.email.message}</Text>}
            </FormControl>
            <FormControl id="password" mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                id="password"
                placeholder="password"
                {...register("password")}
              />
              {errors.password && (
                <Text color="red">{errors.password.message}</Text>
              )}
            </FormControl>
            <Flex columnGap={2}>
              <Button
                colorScheme="blue"
                type="button"
                width="full"
                mt={4}
                onClick={() => reset()}
              >
                Reset
              </Button>
              <Button colorScheme="blue" type="submit" width="full" mt={4}>
                Log In
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    );
  }
  
  export default LoginForm;