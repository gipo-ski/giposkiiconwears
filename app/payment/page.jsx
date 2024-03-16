"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

import CheckoutWizard from "@/components/CheckoutWizard";
import { savePaymentMethod } from "@/redux/slices/cartSlice";

export default function ShippingAddressPage() {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
	} = useForm();

	const router = useRouter();
	const dispatch = useDispatch();
	const { shippingAddress, paymentMethod } = useSelector((state) => state.cart);

	useEffect(() => {
		// Check if ShippingAddress.address exists
		if (!shippingAddress.address) {
			return router.push("/shipping");
		} else {
			setValue("paymentMethod", paymentMethod);
		}
	}, [setValue, paymentMethod, shippingAddress, router]);

	const submitHandler = ({ paymentMethod }) => {
		dispatch(savePaymentMethod(paymentMethod));

		router.push("/placeorder"); // Client-side redirection
	};

	return (
		<div className='min-w-full'>
			<CheckoutWizard activeStep={2} />
			<form
				className='mx-auto max-w-screen-md'
				onSubmit={handleSubmit(submitHandler)}
			>
				<h1 className='mb-4 text-xl'>Payment Method</h1>
				{["PayPal", "Stripe", "CashOnDelivery"].map((payment) => (
					<div
						key={payment}
						className='mb-4'
					>
						<input
							id={payment}
							name='paymentMethod'
							type='radio'
							value={payment}
							className='p-2 outline-none focus:ring-0'
							{...register("paymentMethod", {
								required: "Please select Payment Method",
							})}
						/>
						<label htmlFor={payment}>{payment}</label>
					</div>
				))}
				{errors.paymentMethod && (
					<div className='text-red-500'>{errors.paymentMethod.message}</div>
				)}

				<div className='flex justify-between mb-4'>
					<button className='primary-button'>Next</button>
				</div>
			</form>
		</div>
	);
}
