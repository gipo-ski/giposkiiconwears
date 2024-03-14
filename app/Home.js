import Link from "next/link";
import Image from "next/image";
import ProductRating from "@/components/ProductRating";
import { data } from "@/utils/data";

// import ProductItem from "@/components/ProductItem";
export default function Home() {
	const { products } = data;
	console.log(products);
	if (!products) {
		return;
	}

	return (
		<div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
			{products.map((product) => (
				<div
					className='card'
					key={product.id}
				>
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
						<p className='mb-2'>{product.description}</p>
						<p>${product.price}</p>
						<button>Add to Cart</button>
					</div>
				</div>
			))}
		</div>
	);
}
