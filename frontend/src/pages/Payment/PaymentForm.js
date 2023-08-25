import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as FetchAPI from "../../utils/fetch";
import { UserManagementSliceActions } from "../../Store/UserManagement-slice"
const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm() {
    const navigate = useNavigate();
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const selectedRoomForPayment = useSelector(state => state.apiManagement.selectedRoomForPayment);
    const inHomePage = useSelector(state => state.userManagement.inHomePage);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:4000/payment", {
                amount: selectedRoomForPayment.features.properties.Cost*100,
                id
            })

            if(response.data.success) {
                console.log("Successful payment");
                setSuccess(true);
                if(selectedRoomForPayment.features.properties.MaxCapacity === 1){
                    let deleteMessage = await FetchAPI.deleteData(`http://localhost:9000/rooms/${selectedRoomForPayment.id}`);
                    console.log("deleteMessage = ", deleteMessage);
                }else{
                    const responseObj = await FetchAPI.updateData(`http://localhost:9000/rooms/${selectedRoomForPayment.id}`, {"features.properties.MaxCapacity": selectedRoomForPayment.features.properties.MaxCapacity - 1});
                }
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}

    return (
        <>
        {!success ? 
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button className = "payment-page-btns">Pay</button>
            <button className = "payment-page-btns" onClick = {() => {navigate('/mybookings')}}>Go Back</button>
        </form>
        :
       <div>
           <h2>{`Payment of $ ${selectedRoomForPayment.features.properties.Cost} for room at address : ${selectedRoomForPayment.features.properties.NAME} successful.`}</h2>
           <button className = "payment-page-btns" onClick = {() => {
            dispatch(UserManagementSliceActions.setInHomePage(true));
            navigate('/')
            }}>Go Back</button>
       </div> 
        }
            
        </>
    )
}