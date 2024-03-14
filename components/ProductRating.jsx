"use client";

import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";

export default function ProductRating(rate, count) {
	// const[rating, setRating] = useState(0)

	return (
		<div className='flex bg-slate-300 w-24 h-10'>
			<Rating
				style={{ maxWidth: 250 }}
				value={rate}
				readOnly
			/>
			{count} reviews
		</div>
	);
}
