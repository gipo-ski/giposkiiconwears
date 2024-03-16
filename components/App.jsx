"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./Header";
import CartSidebar from "./CartSidebar";
import { hideLoading } from "@/redux/slices/cartSlice";
import { usePathname } from "next/navigation";

export default function App({ children }) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(hideLoading());
	}, [dispatch]);

	const { cartItems, loading } = useSelector((state) => state.cart);

	const pathname = usePathname();

	return (
		<div
			className={`${
				loading
					? ""
					: cartItems.length > 0 && (pathname === "/" || pathname.indexOf("/product") >= 0)
					? "mr-32"
					: ""
			}`}
		>
			<div className='w-full mr-32'>
				<Header />
				<main className='p-4'>{children}</main>
			</div>
			<CartSidebar />
		</div>
	);
}
