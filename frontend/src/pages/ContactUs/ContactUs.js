import emailjs from "emailjs-com";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RoomManagementActions } from "../../Store/RoomManagement-slice";
export default function ContactUs() {
   const navigate = useNavigate();
   const allRooms = useSelector(state => state.roomManagement.rooms);
   const selectedViewRoomId = useSelector(state => state.roomManagement.selectedViewRoomId);

   console.log("selectedViewRoomId = ", selectedViewRoomId);
   let selectedRoom = allRooms.find((room) => room.id === selectedViewRoomId);
   let lessor = selectedRoom.ownerId;
   console.log("lessor = ",lessor);

    function sendEmail(e) {
        e.preventDefault();
         console.log(e.target);
    emailjs.sendForm('gmail', 'bemyguest', e.target, 'QM1kZ6I6qS1oL9agk')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset()
        navigate('/');
    }

    return(
        <div>
            <div className="container">
            <form onSubmit={sendEmail}>
                    <div className="row pt-5 mx-auto">
                        <div className="col-8 form-group mx-auto">
                            <input type="text" className="form-control" placeholder="Name" name="name" required/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="email" className="form-control" placeholder="Recipient Email Address" name="email" value = {lessor.email}/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="email" className="form-control" placeholder="Your Email Address" name="sender-email"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="text" className="form-control" placeholder="Address" name="room" value = {selectedRoom.features.properties.NAME}/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="text" className="form-control" placeholder="Subject" name="subject" required/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <textarea className="form-control" id="" cols="30" rows="8" placeholder="Your message" name="message"></textarea>
                        </div>
                        <div className="col-8 pt-3 mx-auto">
                            <input type="submit" className="btn btn-info" value="Send Message"></input>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}