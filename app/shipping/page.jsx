"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

import CheckoutWizard from "@/components/CheckoutWizard";
import { saveShippingAddress } from "@/redux/slices/cartSlice";

export default function ShippingAddressPage() {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
	} = useForm();

	const router = useRouter();
	const dispatch = useDispatch();
	const { shippingAddress } = useSelector((state) => state.cart);

	useEffect(() => {
		if (!shippingAddress) {
			return <p>Please enter full shipping address.</p>;
		} else {
			setValue("fullName", shippingAddress.fullName);
			setValue("address", shippingAddress.address);
			setValue("city", shippingAddress.city);
			setValue("postalCode", shippingAddress.postalCode);
			setValue("country", shippingAddress.country);
		}
	}, [setValue, shippingAddress]);

	const submitHandler = ({ fullName, address, city, postalCode, country }) => {
		dispatch(
			saveShippingAddress({ fullName, address, city, postalCode, country })
		);

		return router.push("/payment");
	};

	return (
		<div className='min-w-full'>
			<CheckoutWizard activeStep={1} />
			<form
				className='mx-auto max-w-screen-md'
				onSubmit={handleSubmit(submitHandler)}
			>
				<h1 className='mb-4 text-xl'>Shipping Address</h1>
				<div className='mb-4'>
					<label htmlFor='fullName'>Full Name</label>
					<input
						id='fullName'
						className='w-full'
						autoFocus
						{...register("fullName", {
							required: "Please enter Full Name",
						})}
					/>
					{errors.fullName && (
						<div className='text-red-500'>{errors.fullName.message}</div>
					)}
				</div>
				<div className='mb-4'>
					<label htmlFor='address'>Address</label>
					<input
						id='address'
						className='w-full'
						{...register("address", {
							required: "Please enter Address",
							minLength: {
								value: 3,
								message: "Address is more that 2 chars",
							},
						})}
					/>
					{errors.address && (
						<div className='text-red-500'>{errors.address.message}</div>
					)}
				</div>
				<div className='mb-4'>
					<label htmlFor='city'>City</label>
					<input
						id='city'
						className='w-full'
						{...register("city", {
							required: "Please enter City",
						})}
					/>
					{errors.city && (
						<div className='text-red-500'>{errors.city.message}</div>
					)}
				</div>
				<div className='mb-4'>
					<label htmlFor='postalCode'>Postal Code</label>
					<input
						id='postalCode'
						className='w-full'
						{...register("postalCode", {
							required: "Please enter Postal Code",
						})}
					/>
					{errors.postalCode && (
						<div className='text-red-500'>{errors.postalCode.message}</div>
					)}
				</div>
				<div className='mb-4'>
					<label htmlFor='address'>Country</label>
					<input
						id='country'
						className='w-full'
						{...register("country", {
							required: "Please enter Country",
						})}
					/>
					{errors.country && (
						<div className='text-red-500'>{errors.country.message}</div>
					)}
				</div>
				<div className='flex justify-between mb-4'>
					<button className='primary-button'>Next</button>
				</div>
			</form>
		</div>
	);
}
