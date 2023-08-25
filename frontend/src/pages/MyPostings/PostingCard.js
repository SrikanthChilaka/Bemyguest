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
import "./MyPostings.scss"
import { useDispatch, useSelector } from "react-redux";
import { CheckIcon,CloseIcon } from '@chakra-ui/icons'
import * as FetchAPI from '../../utils/fetch';
import { RoomManagementActions } from "../../Store/RoomManagement-slice";
import { APIManagementActions } from "../../Store/APIManagement-slice";
import { UserManagementSliceActions } from "../../Store/UserManagement-slice";
const PostingCard = ({bookedLeasee,postedRoom}) => {

  const notifications = useSelector(state => state.apiManagement.notifications);

   const dispatch = useDispatch();
   const currentUser = useSelector(state => state.userManagement.currentUser);
   const isLeaseeAlreadyApproved = () => {return postedRoom.approvedLeaseeIds.find((approvedLeasee) => approvedLeasee.id === bookedLeasee.id) !== undefined ? true : false}
   const isLeaseeAlreadyRejected = () => {return bookedLeasee.rejectedRoomIds.find((rejectedRoomId) => rejectedRoomId === postedRoom.id) !== undefined ? true : false}
  //  console.log("isLeaseeAlreadyRejected = ", isLeaseeAlreadyRejected, "user = ", bookedLeasee.name);
  //  console.log("")
  console.log("bookedLeasee.rejectedRoomIds = ", bookedLeasee.rejectedRoomIds , "isLeasee already rejected ? = ", isLeaseeAlreadyRejected());
  console.log("postedRoom.bookedLeaseeIds = ", postedRoom.bookedLeaseeIds)

   const [isApproveClicked,setIsApproveClicked] = useState(false);
   const [isRejectClicked,setIsRejectClicked] = useState(false);

   const handleApprove = async() => {

         let newApprovedLeaseeIds = postedRoom.approvedLeaseeIds.map((approvedLeasee) => approvedLeasee.id);
         newApprovedLeaseeIds.push(bookedLeasee.id);

         let jsonResponse = await FetchAPI.updateData(`http://localhost:9000/rooms/${postedRoom.id}`, {approvedLeaseeIds: newApprovedLeaseeIds});
         console.log("jsonResponse of new updated room = ", jsonResponse)
         const roomsFetchedFromDB = await FetchAPI.getData(`http://localhost:9000/rooms`);
         dispatch(RoomManagementActions.setRooms(roomsFetchedFromDB));
         console.log("postedRoom = ", postedRoom);
         dispatch(APIManagementActions.setNotification({
          message: `Approved user ${bookedLeasee.name} for property ${postedRoom.features.properties.NAME} successfully.`,
          type: "success",
          open: true,
        }))
        setIsApproveClicked(true);
   }

   const handleReject = async() => {

        console.log("rejected room Ids for leasee = ", bookedLeasee.rejectedRoomIds)
        let newRejectedRoomIds = bookedLeasee.rejectedRoomIds;
        console.log("newRejectedRoomIds = ", newRejectedRoomIds);
        newRejectedRoomIds.push(postedRoom.id);
        console.log("rejected room id pushed : ", postedRoom.id);
        console.log("newRejectedRoomIds after push = ", newRejectedRoomIds);

        let jsonResponse = await FetchAPI.updateData(`http://localhost:9000/leasees/${bookedLeasee.id}`, {rejectedRoomIds: newRejectedRoomIds});
         console.log("jsonResponse of new updated Leasee = ", jsonResponse)
         dispatch(APIManagementActions.setNotification({
          message: `Rejected user ${bookedLeasee.name} booking request for ${postedRoom.features.properties.NAME} successfully.`,
          type: "success",
          open: true,
        }))
        setIsRejectClicked(true);
   }

   
  return (

    <div className="app">
      
      {!isLeaseeAlreadyApproved() && !isApproveClicked && !isLeaseeAlreadyRejected() && !isRejectClicked && <Box w="300px" rounded="20px" 
           overflow="hidden" bg={"gray.200"} mt={10} >
        <Image src=
{postedRoom.features.properties.Image}
               alt="Card Image" boxSize="300px">
        </Image>
        <Box p={4}>
          <Stack align="center">
            <Badge variant="solid" colorScheme="green" 
              rounded="full" px={2}>
            
            </Badge>
          </Stack>
          <Stack align="center">
            <Text as="h2" fontWeight="normal" my={2} >
              {postedRoom.features.properties.NAME}
            </Text>
            <Text fontWeight="light" as = "h3">
              {`Name of Leasee : ${bookedLeasee.name}`}
            </Text>
            <Text fontWeight="light" as = "h3">
              {`Email of Leasee : ${bookedLeasee.email}`}
            </Text>
          </Stack>
          <Flex>
          <Button onClick = {handleApprove} variant="solid" 
              colorScheme="green" size="sm" marginTop={"8px"} >
                <CheckIcon />
            </Button>
            <Spacer />
            <Button onClick = {handleReject} variant="solid" 
              colorScheme="red" size="sm" marginTop={"8px"} >
                <CloseIcon />
            </Button>
          </Flex>
        </Box>
      </Box>}
    </div>
  );
}
 
export default PostingCard;