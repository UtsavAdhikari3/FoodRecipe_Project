import * as React from "react";
import {
  Box,
  Button,
  Center,
  ChakraProvider,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup
    .string()
    .max(10, "Password cannot exceed 10 characters")
    .required("Password is required"),
});

function LoginForm() {
  const navigate = useNavigate();
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
    axios
      .post("https://api.escuelajs.co/api/v1/auth/login", data)
      .then((res) => {
        localStorage.setItem("meroToken", res.data.access_token);
        navigate("/Dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Flex height="100vh" justifyContent="center" alignItems="center" bg="gray.50">
      <Box
        bg="white"
        w={{ base: "90%", sm: "400px" }}
        p={6}
        borderRadius="lg"
        boxShadow="xl"
        textAlign="center"
      >
        <Image
          mx="auto"
          boxSize="120px"
          src="logo.png"
          alt="My Logo"
          mb={4}
        />
        <Text fontSize="2xl" fontWeight="bold" mb={2}>
          Welcome Back
        </Text>
        <Text fontSize="md" color="gray.600" mb={6}>
          Log in to access your dashboard
        </Text>
        <form onSubmit={handleSubmit(loginFormSubmit)}>
          <VStack spacing={4} align="stretch">
            <FormControl id="email" isInvalid={!!errors.email}>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                placeholder="example@mail.com"
                {...register("email")}
              />
              {errors.email && (
                <Text fontSize="sm" color="red.500">
                  {errors.email.message}
                </Text>
              )}
            </FormControl>
            <FormControl id="password" isInvalid={!!errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <Text fontSize="sm" color="red.500">
                  {errors.password.message}
                </Text>
              )}
            </FormControl>
            <Flex columnGap={2} mt={4}>
              <Button
                colorScheme="gray"
                variant="outline"
                width="full"
                onClick={() => reset()}
              >
                Reset
              </Button>
              <Button colorScheme="blue" width="full" type="submit">
                Log In
              </Button>
            </Flex>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}

export default LoginForm;
