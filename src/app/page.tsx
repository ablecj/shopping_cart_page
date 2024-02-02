'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";


export default function Home() {

  const Router = useRouter();

  return (
   <div className={styles.home}>
      <h1>Shopping Cart</h1>
      <button 
      onClick={()=>{
        Router.push('/products')
      }}
      >
        show products
      </button>
   </div>
  );
}
