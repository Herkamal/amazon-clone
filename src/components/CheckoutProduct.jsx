import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React from 'react'
import Currency from "react-currency-formatter"
import { useDispatch } from 'react-redux'
import {addToBasket, removeFromBasket} from "../slices/basketSlice"


function CheckoutProduct({id, title, price, rating, description, category, image, hasPrime}) {
  const dispatch = useDispatch()
  const addItemToBasket = () => {
    const product ={
      id, title, price, rating, description, category, image, hasPrime
    }
    dispatch(addToBasket(product))
  }

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({id}))
  }

  return (
    <div className='grid grid-cols-5'>
      <Image src={image} height={200} width={200} objectFit='contain'/>
      <div className='col-span-3 mx-5'>
        <p>{title}</p>
        <div className='flex'>
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" />
          ))}
        </div>
        <p className='text-xs my-2 line-clamp-3 '>{description}</p>
        
          <Currency quantity={price} currency="USD" />
         

        {hasPrime && (
        <div className="flex items-center space-x-2 ">
          <img
            loading='lazy'
            className="w-12"
            src="https://imgs.search.brave.com/hRArIN1k5vYXe9Qrt2f2bcmzxjkUNF6XCT6hxHkcdR4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0cv/MDEvcHJpbWUvbWFy/a2V0aW5nL3NsYXNo/UHJpbWUvYW1hem9u/LXByaW1lLWRlbGl2/ZXJ5LWNoZWNrbWFy/ay5fQ0I2NTk5OTgy/MzFfLnBuZw"
            alt=""
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}
      </div>

          <div className='flex flex-col space-y-2 my-auto justify-self-end'>
            <button className='button' onClick={addItemToBasket}>Add to Basket</button>
            <button className='button' onClick={removeItemFromBasket}> Remove to Basket</button>
          </div>
    </div>
  )
}

export default CheckoutProduct