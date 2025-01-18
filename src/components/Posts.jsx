import React, { useEffect, useState } from "react";
import { basePostURL } from "../App";
import axios from "axios";
import {
  Button,
  Flex,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  Box,
  IconButton,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";

const Posts = () => {
  const [users, setUsers] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteUser = () => {
    axios
      .delete(`${basePostURL}/posts/${deleteId}`)
      .then((res) => {
        console.log(res);
        setUsers(users.filter((user) => user.id !== deleteId)); // Update UI after deletion
        onClose();
      })
      .catch((err) => console.log(err, "-------->"));
  };

  useEffect(() => {
    axios
      .get(`${basePostURL}/posts`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err, "---->err"));
  }, []);

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <Heading as="h1" size="lg" textAlign="center" mb={6}>
        Posts Management
      </Heading>
      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
        {users.map((user) => (
          <Box
            key={user.id}
            bg="white"
            borderRadius="lg"
            boxShadow="md"
            p={4}
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.02)" }}
          >
            <VStack align="start" spacing={3}>
              <Text fontWeight="bold" fontSize="lg">
                {user.title}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {user.body}
              </Text>
            </VStack>
            <Flex justifyContent="flex-end" mt={4}>
              <IconButton
                aria-label="Edit Post"
                icon={<AiOutlineEdit />}
                size="sm"
                colorScheme="teal"
                variant="ghost"
                mr={2}
              />
              <IconButton
                aria-label="Delete Post"
                icon={<RiDeleteBin6Fill />}
                size="sm"
                colorScheme="red"
                variant="ghost"
                onClick={() => {
                  setDeleteId(user.id);
                  onOpen();
                }}
              />
            </Flex>
          </Box>
        ))}
      </Grid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this post?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={deleteUser}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Posts;
