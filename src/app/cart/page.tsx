"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/cart.module.css";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { updateCart } from "@/redux/features/cart-slice";

interface CartItem {
  id: number;
  name: string;
  imagePath: string;
  price: number;
  description: string;
  quantity: number;
}

const page = () => {
  const [CartItem, setCartItem] = useState<CartItem[]>([]);
  console.log(CartItem, "cartItem")

  const dispatch = useDispatch<AppDispatch>();
  const cartArray: CartItem[] = useAppSelector((state) => state.cartReducer);

  // const tempCartItem: CartItem[] = [
  //   {
  //     id: 1,
  //     name: "product 1",
  //     imagePath:
  //       "https://media.istockphoto.com/id/921893114/photo/athirappilly-falls.jpg?s=612x612&w=0&k=20&c=mDL2tjlFj-nNLxLKqzwCTIrl1pYNq4ulFHXK9GUirVQ=",
  //     price: 1000,
  //     description: "this is a most modern art",
  //     quantity: 1,
  //   },
  //   {
  //     id: 2,
  //     name: "product 2",
  //     imagePath:
  //       "https://media.istockphoto.com/id/921893114/photo/athirappilly-falls.jpg?s=612x612&w=0&k=20&c=mDL2tjlFj-nNLxLKqzwCTIrl1pYNq4ulFHXK9GUirVQ=",
  //     price: 10300,
  //     description: "this is a most modern art",
  //     quantity: 1,
  //   },
  //   {
  //     id: 3,
  //     name: "product 3",
  //     imagePath:
  //       "https://media.istockphoto.com/id/921893114/photo/athirappilly-falls.jpg?s=612x612&w=0&k=20&c=mDL2tjlFj-nNLxLKqzwCTIrl1pYNq4ulFHXK9GUirVQ=",
  //     price: 1450,
  //     description: "this is a most modern art",
  //     quantity: 1,
  //   },
  //   {
  //     id: 4,
  //     name: "product 4",
  //     imagePath:
  //       "https://media.istockphoto.com/id/921893114/photo/athirappilly-falls.jpg?s=612x612&w=0&k=20&c=mDL2tjlFj-nNLxLKqzwCTIrl1pYNq4ulFHXK9GUirVQ=",
  //     price: 52000,
  //     description: "this is a most modern art",
  //     quantity: 1,
  //   },
  // ];

  useEffect(() => {
    setCartItem(cartArray);
  }, [cartArray]);

  const increamentCartItem = (index: number) => {
    
    let tempCartItem = cartArray.map((item, i)=>
    i === index ? {...item, quantity:item.quantity + 1} : item
    )
    dispatch(updateCart(tempCartItem))
  };
  const decreamentCartItems = (index: number) => {
    let tempCartItem = cartArray.map((item, i)=>
    i === index && item.quantity >1 ? {...item, quantity:item.quantity - 1} : item
    )
    dispatch(updateCart(tempCartItem))
  };
  const removeCartIems = (index: number) => {
    let tempCartItems = [...cartArray];
    tempCartItems.splice(index,1);
    dispatch(updateCart(tempCartItems));
  };
  return (
    <div className={styles.cartPage}>
      <h1 className={styles.cartHead}>Cart</h1>
      {CartItem.length === 0 ? (
        <h1 className={styles.emptyCart}>Cart is empty</h1>
      ) : null}

      <div>
        {CartItem.map((item, index) => (
          <div className={styles.cartCard} key={index}>
            <div className={styles.s1}>
              <Image
                src={item.imagePath}
                alt={item.name}
                width={200}
                height={200}
              />
              <h3>{item.name}</h3>
            </div>

            <div className={styles.s1}>
              <h2>{item.price * item.quantity}</h2>
              <div className={styles.incredecre}>
                <button
                  onClick={() => {
                    decreamentCartItems(index);
                  }}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => {
                    increamentCartItem(index);
                  }}
                >
                  +
                </button>
              </div>
              <svg
              onClick={()=>{
                removeCartIems(index);
              }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
