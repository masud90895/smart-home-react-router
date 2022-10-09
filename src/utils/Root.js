import React, { createContext, useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';


export const ProductsContext = createContext([])
export const CartsDataContext = createContext([])

const Root = () => {
    const {products,initialCart} = useLoaderData()

    const [cart,setCart] =useState(initialCart)

    return (
        <ProductsContext.Provider value={products}>
            <CartsDataContext.Provider value={[cart,setCart]}>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
            </CartsDataContext.Provider>
        </ProductsContext.Provider>
    );
};

export default Root;