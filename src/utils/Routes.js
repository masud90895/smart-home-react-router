import Home from '../components/Home' 
import Shop from '../components/Shop' 
import ErrorPage from '../components/ErrorPage' 
import Cart from '../components/Cart' 
import About from '../components/About' 
import Root from '../utils/Root'
import { createBrowserRouter } from 'react-router-dom'
import { productAndData } from '../components/productAndData'


export const router = createBrowserRouter([
    {
      path: '/',
      element: <Root></Root>,
      loader: productAndData,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: '/',
          element: <Home/>,         
        },
        {
          path: 'home',
          element: <Home/>
        },
        {
          path: 'shop',
          element: <Shop/>
        },
        {
          path: 'cart',
          element: <Cart/>
        },
        {
          path: 'about',
          element: <About/>
        },
      ]     
    }
  ])