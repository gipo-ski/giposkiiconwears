import Link from "next/link";
import Image from "next/image";
import ProductRating from "./ProductRating";


import AddToCart from "./AddToCart";

export default function ProductItem({ product }) {
     if (!product) {
				// Handle the case when product is undefined
				return;
			}

	return (
		<div className='card'>
			<Link href={`/product/${product.id}`}>
				<Image
					src={product.image}
					alt={product.name}
					width={400}
					height={400}
					className='rounded shadow object-cover h-96 w-full'
				/>
			</Link>

			<div className='flex flex-col items-center justify-center p-5'>
				<Link href={`/product/${product.id}`}>
					<h2 className='text-lg'>{product.name}</h2>
				</Link>
				<ProductRating
					rate={product.rating}
					count={product.numReviews}
				/>
				<p className='mb-2'>{product.brand}</p>
				<p>£{product.price}</p>
				<AddToCart
					showQty={false}
					product={product}
					increasePerClick={true}
					redirect={false}
				/>
			</div>
		</div>
	);
}
