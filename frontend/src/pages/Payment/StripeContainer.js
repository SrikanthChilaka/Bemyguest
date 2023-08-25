import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"
import './StripeContainer.scss';

const PUBLIC_KEY = "pk_test_51MBw1xLJrly6ewF39aOr1WCSa09rxV9RbrFkC5kSjiJ09VMYqjFYYmStLcuRYUpujrxURdZWARER0KLHz18a4JVs00oW68WY6c"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<div className = "payment-form">
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
		</div>
	)
}