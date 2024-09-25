import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './layout/Layout';
import Dashboard from './pages/dashboard';
import Orders from './pages/orders';
import LogInAdmin from './pages/logInAdmin';
import Products from './pages/products';
import Categories from './pages/categories';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children: [
        {
          index: true,
          element: <Dashboard/>
        },
        {
          path: 'orders',
          element: <Orders/>,
        },
        {
          path: 'login',
          element: <LogInAdmin/>
        },
        {
          path: 'product',
          element: <Products/>
        },
        {
          path: 'categories',
          element: <Categories/>
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
