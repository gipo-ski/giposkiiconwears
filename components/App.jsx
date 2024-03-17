/* eslint-disable no-mixed-spaces-and-tabs */
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import Header from "./Header";
import CartSidebar from "./CartSidebar";
import { hideLoading } from "@/redux/slices/cartSlice";

export default function App({ children }) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(hideLoading());
	}, [dispatch]);

	const { cartItems, loading } = useSelector((state) => state.cart);
	const pathname = usePathname();

	return (
		<div>
			<div
				className={`${
					loading
						? ""
						: cartItems.length > 0 &&
						  (pathname === "/" || pathname.indexOf("/product/") >= 0)
						? "mr-32"
						: ""
				}`}
			>
				<Header />
				<main className='p-4'>{children}</main>
			</div>
			<CartSidebar />
		</div>
	);
}
