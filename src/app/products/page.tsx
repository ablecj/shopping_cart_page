"use client";

import React, { useEffect } from "react";
import styles from "@/styles/productcard.module.css";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { updateCart } from "@/redux/features/cart-slice";

const page = () => {
  interface Products {
    id: number;
    name: string;
    imagePath: string;
    price: number;
    description: string;
  }

  interface CartItem {
    id: number;
    name: string;
    imagePath: string;
    price: number;
    description: string;
    quantity: number;
  }

  const dispatch = useDispatch<AppDispatch>();
  const cartArray: CartItem[] = useAppSelector((state) => state.cartReducer);

  const products: Products[] = [
    {
      id: 1,
      name: "product 1",
      imagePath:
        "https://media.istockphoto.com/id/921893114/photo/athirappilly-falls.jpg?s=612x612&w=0&k=20&c=mDL2tjlFj-nNLxLKqzwCTIrl1pYNq4ulFHXK9GUirVQ=",
      price: 1000,
      description: "this is a most modern art",
    },
    {
      id: 2,
      name: "product 2",
      imagePath:
        "https://media.istockphoto.com/id/921893114/photo/athirappilly-falls.jpg?s=612x612&w=0&k=20&c=mDL2tjlFj-nNLxLKqzwCTIrl1pYNq4ulFHXK9GUirVQ=",
      price: 10300,
      description: "this is a most modern art",
    },
    {
      id: 3,
      name: "product 3",
      imagePath:
        "https://media.istockphoto.com/id/921893114/photo/athirappilly-falls.jpg?s=612x612&w=0&k=20&c=mDL2tjlFj-nNLxLKqzwCTIrl1pYNq4ulFHXK9GUirVQ=",
      price: 1450,
      description: "this is a most modern art",
    },
    {
      id: 4,
      name: "product 4",
      imagePath:
        "https://media.istockphoto.com/id/921893114/photo/athirappilly-falls.jpg?s=612x612&w=0&k=20&c=mDL2tjlFj-nNLxLKqzwCTIrl1pYNq4ulFHXK9GUirVQ=",
      price: 52000,
      description: "this is a most modern art",
    },
  ];

  const addToCart = (product: Products) => {
    const itemIndex = cartArray.findIndex((item) => item.id === product.id);

    if (itemIndex !== -1) {
      const updatedCart = cartArray.map((item, index) =>
        index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
      );

      dispatch(updateCart(updatedCart));
    } else {
      const newCartItem = {
        name: product.name,
        id: product.id,
        imagePath: product.imagePath,
        price: product.price,
        description: product.description,
        quantity: 1,
      };

      const updatedCart = [...cartArray, newCartItem]
      dispatch(updateCart(updatedCart))
    }
  };

  useEffect(()=>{
    console.log("cartArray", cartArray)
  },[cartArray]);

  return (
    <div className={styles.productContainer}>
      {products.map((product) => (
        <div className={styles.productCard1} key={product.id}>
          <Image
            src={product.imagePath}
            alt={product.name}
            width={200}
            height={200}
          />
          <div className={styles.row}>
            <h2>{product.name}</h2>
            <p>{product.price}</p>
          </div>
          <div className={styles.row1}>
            <button>view</button>
            <button onClick={() => addToCart(product)}>Add to cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;
