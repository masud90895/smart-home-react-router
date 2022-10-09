import React, { useContext, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { addToDb } from '../utils/fakeDB'
import { CartsDataContext, ProductsContext } from '../utils/Root'
import Product from './Product'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Shop = () => {
  /* const products = useLoaderData() */
  const products = useContext(ProductsContext)
  const [cart, setCart] = useContext(CartsDataContext)
  /* const [cart, setCart] = useState(cartProducts); */

  const addBtnCart =(product)=>{
    let newCart =[]
    const exists =cart.find(existingProduct => existingProduct.id === product.id);

    if (!exists) {
      product.quantity=1;
      newCart=[...cart, product]
    }
    else{
      const restProduct = cart.filter(restProduct => restProduct.id !== product.id);
      exists.quantity += 1;
      newCart = [...restProduct, exists]
    }
    setCart(newCart);
    addToDb(product.id)
    toast.success(' Product Added', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  return (
    <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
      <div className='grid gap-8 row-gap-5 mb-8 lg:grid-cols-3 lg:row-gap-8'>
        {
          products?.map(product => <Product key={product.id} product={product} addBtnCart={addBtnCart}></Product>)
        }
      </div>
    </div>
  )
}

export default Shop
