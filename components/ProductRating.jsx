"use client";

import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";


export default function ProductRating({ rate, count }) {

	return (
		<div className='flex'>
			<Rating
				style={{ maxWidth: 100 }}
				value={rate}
				readOnly
			/>
			{count} reviews
		</div>
	);
}
