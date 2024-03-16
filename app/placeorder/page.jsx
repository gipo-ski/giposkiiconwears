"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import CheckoutWizard from "@/components/CheckoutWizard";
// import ShippingAddressPage from "../shipping/page";

export default function PlaceOrderScreen() {
	const {
		cartItems,
		itemsPrice,
		shippingPrice,
		totalPrice,
		taxPrice,
		shippingAddress,
		paymentMethod,
		loading,
	} = useSelector((state) => state.cart);

	const router = useRouter();

	useEffect(() => {
		if (!paymentMethod) {
			router.push("/payment");
		}
	}, [paymentMethod, router]);

	return (
		<div>
			<CheckoutWizard activeStep={3} />
			<h1 className='mb-4 text-xl'>Place Order</h1>
			{loading ? (
				<div>Loading...</div>
			) : cartItems.length === 0 ? (
				<div>
					Cart is Empty. <Link href='/'>Go Shopping</Link>
				</div>
			) : (
				<div className='grid md:grid-cols-4 md:gap-5'>
					<div className='overflow-x-auto md:col-span-3'>
						<div className='card p-5'>
							<h2 className='mb-2 text-lg'>Shipping Address</h2>
							<div>
								{shippingAddress.fullName},{shippingAddress.address},
								{shippingAddress.city},{shippingAddress.postalCode},
								{shippingAddress.country},
							</div>
							<div>
								<Link
									href={"/shipping"}
									className='default-button inline-block'
								>
									Edit
								</Link>
							</div>
						</div>
						<div className='card p-5'>
							<h2 className='mb-2 text-lg'>Payment Method</h2>
							<div>{paymentMethod}</div>
							<div>
								<Link
									href='/payment'
									className='default-button inline-block'
								>
									Edit
								</Link>
							</div>
						</div>
						<div className='card overflow-x-auto p-5'>
							<h2 className='mb-2 text-lg'>Order Items</h2>
							<table className='min-w-full'>
								<thead className='border-b'>
									<tr>
										<th className='px-5 text-left '>Item</th>
										<th className='p-5 text-right '>Quantity</th>
										<th className='p-5 text-right '>Price</th>
										<th className='p-5 text-right '>Subtotal</th>
									</tr>
								</thead>
								<tbody>
									{cartItems.map((item) => (
										<tr
											key={item.id}
											className='border-b'
										>
											<td>
												<Link
													href={`/product/${item.id}`}
													className='flex items-center'
												>
													<Image
														src={item.image}
														alt={item.name}
														width={50}
														height={50}
														style={{ maxWidth: "100%", height: "auto" }}
														className='p-1'
													/>
													{item.name}
												</Link>
											</td>
											<td className='p-5 text-right'>{item.qty}</td>
											<td className='p-5 text-right'>{item.price}</td>
											<td className='p-5 text-right'>
												£{item.qty * item.price}
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<div>
								<Link
									href='/cart'
									className='default-button inline-block'
								>
									Edit
								</Link>
							</div>
						</div>
					</div>
					<div>
						<div className='card p-5'>
							<h2 className='mb-2 text-lg'>Order Summary</h2>
							<ul>
								<li>
									<div className='flex justify-between mb-2'>
										<div>Items</div>
										<div>£{itemsPrice}</div>
									</div>
								</li>
								<li>
									<div className='flex justify-between mb-2'>
										<div>Tax</div>
										<div>£{taxPrice}</div>
									</div>
								</li>
								<li>
									<div className='flex justify-between mb-2'>
										<div>Shipping</div>
										<div>£{shippingPrice}</div>
									</div>
								</li>
								<li>
									<div className='flex justify-between mb-2'>
										<div>Total</div>
										<div>£{totalPrice}</div>
									</div>
								</li>
								<li>
									<button
										onClick={() => alert("Not Implimented")}
										className='primary-button w-full'
									>
										Place Order
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
