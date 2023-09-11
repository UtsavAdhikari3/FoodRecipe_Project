import React, { useEffect, useState } from 'react'
import { basePostURL } from '../App'
import axios from 'axios'
import { Button, Divider, Flex, Grid, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack, useDisclosure } from '@chakra-ui/react'
import style from "../recipe.module.css";
import { AiOutlineEdit } from "react-icons/ai"
import { RiDeleteBin6Fill } from "react-icons/ri"
const Posts
    = () => {
        // basePostURL
        const [users, setUsers] = useState([])
        const [deleteId,setDeleteId] = useState()
        const { isOpen, onOpen, onClose } = useDisclosure()
  
        const deleteUser = ()=>{
          axios.delete(`${basePostURL}/posts/${deleteId}`).then(
            (res)=>{
              console.log(res)
              onClose()
            }
          ).catch((err)=>console.log(err,"-------->"))

        }
        
        useEffect(() => {
          axios.get(`${basePostURL}/posts`).then(
              (res) => setUsers(res.data)
          ).catch((err) => console.log(err, "---->err"))
      }, [])
   return(
    <div>
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {users.map((user) => {
            return (

                <div key={user.id} className={style.recipe} style={{ marginBottom: "8px" }}>

                    <VStack gap={16} px={8}>
                        <Text >{user.id}</Text>
                        <Text >{user.title}</Text>
                        <Text>{user.body}</Text>
                    </VStack>
                    <Flex sx={{ justifyContent: "flex-end", width: "100%", paddingRight: "8px", columnGap: "8px" }}>
                        <AiOutlineEdit />
                        <RiDeleteBin6Fill onClick={()=>{
                          setDeleteId(user.id)
                          onOpen()
                        }} />
                    </Flex>
                    {/* <Divider borderColor={"black"} /> */}
                </div>
            )
        }
        )}
    </Grid>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Are you sure you want to delete this user?</ModalHeader>
            <ModalCloseButton />
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                </Button>
                <Button variant='ghost' onClick={()=>{deleteUser()}}>Delete</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>

</div >
   )
    }

export default Posts
