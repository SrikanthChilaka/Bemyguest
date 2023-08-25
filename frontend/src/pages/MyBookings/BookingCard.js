
import React, { useEffect } from "react";
import { Box, Image, Badge, Text, Stack, 
   Button, Flex, Spacer,useDisclosure } 
  from "@chakra-ui/react";
  import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { useState } from 'react';
import "./MyBookings.scss"
import { useDispatch, useSelector } from "react-redux";
import * as FetchAPI from '../../utils/fetch';
import { useNavigate} from "react-router-dom";
import { APIManagementActions } from "../../Store/APIManagement-slice";
const BookingCard = ({bookedRoom}) => {
   
  const navigate = useNavigate();
  const dispatch = useDispatch();

   const currentUser = useSelector(state => state.userManagement.currentUser);
   const { isOpen, onOpen, onClose } = useDisclosure();
   const isApproved = () => {
      return bookedRoom.approvedLeaseeIds.find((approvedLeaseeId) => approvedLeaseeId.id == currentUser.id) === undefined ? false : true;
   }
   const isRejected = async() => {
    let rejectedLeaseesForRoom = await FetchAPI.getData(`http://localhost:9000/leasees?rejectedRoomIds=${bookedRoom.id}`);
    return rejectedLeaseesForRoom.find((rejectedLeasee) => rejectedLeasee.id === currentUser.id) === undefined ?  false : true;
   }

   const [isRejectProcessed, setIsRejectProcessed] = useState(false);
   const [isRejectedStatus, setIsRejectedStatus] = useState(false);

   useEffect(() => {

    const isRejected = async() => {
      let rejectedLeaseesForRoom = await FetchAPI.getData(`http://localhost:9000/leasees?rejectedRoomIds=${bookedRoom.id}`);
      console.log("rejectedLeaseesForRoom = ",rejectedLeaseesForRoom)
      let rejectedStatus =  rejectedLeaseesForRoom.find((rejectedLeasee) => rejectedLeasee.id === currentUser.id) === undefined ?  false : true;
      setIsRejectedStatus(rejectedStatus);
      setIsRejectProcessed(true);
     }
    // calling the function
    isRejected()
      // catch any error
      .catch(console.error);
  },[]);

   console.log("isRejectProcessed = ", isRejectProcessed);
  return (
   
    <div className="app">
      
      <Box w="300px" rounded="20px" 
           overflow="hidden" bg={"gray.200"} mt={10} >
        <Image src=
{bookedRoom.features.properties.Image}
               alt="Card Image" boxSize="300px">
        </Image>
        <Box p={5}>
          <Stack align="center">
            <Badge variant="solid" colorScheme="green" 
              rounded="full" px={2}>
            
            </Badge>
          </Stack>
          <Stack align="center">
            <Text as="h2" fontWeight="normal" my={2} >
              {bookedRoom.features.properties.NAME}
            </Text>
            
          
            <Text fontWeight="light">
              {isRejectProcessed && (isApproved()==true ? "Approved" : (isRejectedStatus ? "Rejected" : "Pending"))}
            </Text>
            
            
          </Stack>
          <Flex>  
          {isRejectProcessed && isApproved() && <Button onClick = {()=>{
            dispatch(APIManagementActions.setSelectedRoomForPayment(bookedRoom));
            navigate('/payments');
          }} variant="solid" 
              colorScheme="green" size="sm" >
                Payment
            </Button>}
            <Spacer />
            <Button variant="solid" 
              colorScheme="green" size="sm" onClick={onOpen}>
                Details
            </Button>
            <Modal  isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Room Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {bookedRoom.features.properties.DESCRIPTION}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
           {isApproved() && <Button variant='ghost'>Payment</Button>}
          </ModalFooter>
        </ModalContent>
      </Modal>
          </Flex>
        </Box>
      </Box>
    </div>
  );
}
 
export default BookingCard;