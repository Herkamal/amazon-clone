import React, { useState, useEffect } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image, }) {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(1);
  const [hasPrime, setHasPrime] = useState(true);

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
    };
    
    dispatch(addToBasket(product))
  };

  useEffect(() => {
    setRating(
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    setHasPrime(Math.random() < 0.5);
  }, []);

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10  ">
      <p className="absolute top-2 right-2 tect-sm italic text-gray-400 ">
        {category}
      </p>
      <div className="flex justify-center items-center mb-4">
        <Image src={image} height={200} width={200} objectFit="contain" />
      </div>
      <h4>{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5">
        <Currency quantity={price} currency="USD" />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5 ">
          <img
            className="w-12"
            src="https://imgs.search.brave.com/hRArIN1k5vYXe9Qrt2f2bcmzxjkUNF6XCT6hxHkcdR4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0cv/MDEvcHJpbWUvbWFy/a2V0aW5nL3NsYXNo/UHJpbWUvYW1hem9u/LXByaW1lLWRlbGl2/ZXJ5LWNoZWNrbWFy/ay5fQ0I2NTk5OTgy/MzFfLnBuZw"
            alt=""
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}
      <button onClick={addItemToBasket} className="mt-auto button">
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
