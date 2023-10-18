import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './store';

import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  HomeScreen,
  ProductDetails,
  CartScreen,
  LoginScreen,
  RegisterScreen,
  ShippingScreen,
  PaymentScreen,
  PlaceOrderScreen,
  OrderScreen,
  ProfileScreen,
} from './screens';
import {
  OrderListScreen,
  ProductEditScreen,
  ProductListScreen,
  UserListScreen,
  UserEditScreen,
  DashboardScreen,
} from './screens/admin';
import { PrivateRoute, AdminRoute } from './components';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/bootstrap.custom.css';
import 'react-toastify/dist/ReactToastify.css';
// import 'bootswatch/dist/lux/bootstrap.min.css';
import './assets/styles/lux.css';

import './assets/styles/index.css';
import './assets/styles/rating.css';
import './assets/styles/product.css';
import './assets/styles/custom.css';

// const routeConfigurations = [
//   { path: '/', element: <HomeScreen /> },
//   { path: '/search/:keyword/*', element: <HomeScreen /> },
//   { path: '/search/:keyword/page/:pageNumber/*', element: <HomeScreen /> },
//   {
//     path: '/search/:keyword/category/:category/brand/:brand',
//     element: <HomeScreen />,
//   },
//   {
//     path: '/search/:keyword/category/:category/brand/:brand/page/:pageNumber',
//     element: <HomeScreen />,
//   },
//   { path: '/search/:keyword/categories/*', element: <HomeScreen /> },
//   { path: '/search/:keyword/category/:category/', element: <HomeScreen /> },
//   {
//     path: '/search/:keyword/category/:category/page/:pageNumber',
//     element: <HomeScreen />,
//   },
//   { path: '/search/brand/:brand', element: <HomeScreen /> },
//   { path: '/search/brand/:brand/page/:pageNumber', element: <HomeScreen /> },
//   { path: '/search/category/:category', element: <HomeScreen /> },
//   {
//     path: '/search/category/:category/page/:pageNumber',
//     element: <HomeScreen />,
//   },
//   { path: '/search/category/:category/brand/:brand', element: <HomeScreen /> },
//   {
//     path: '/search/category/:category/brand/:brand/page/:pageNumber',
//     element: <HomeScreen />,
//   },

//   {
//     path: '/search/:keyword/price/:minPrice-:maxPrice',
//     element: <HomeScreen />,
//   },
//   {
//     path: '/search/:keyword/price/:minPrice-:maxPrice/page/:pageNumber',
//     element: <HomeScreen />,
//   },
//   { path: '/page/:pageNumber', element: <HomeScreen /> },
//   { path: '/product/:id', element: <ProductDetails /> },
//   { path: '/cart', element: <CartScreen /> },
//   { path: '/login', element: <LoginScreen /> },
//   { path: '/register', element: <RegisterScreen /> },
//   { path: '', element: <PrivateRoute /> },
//   { path: '/shipping', element: <ShippingScreen /> },
//   { path: '/payment', element: <PaymentScreen /> },
//   { path: '/placeorder', element: <PlaceOrderScreen /> },
//   { path: '/order/:id', element: <OrderScreen /> },
//   { path: '/profile', element: <ProfileScreen /> },
//   { path: '', element: <AdminRoute /> },
//   { path: '/admin', element: <DashboardScreen /> },
//   { path: '/admin/orderlist', element: <OrderListScreen /> },
//   { path: '/admin/productlist', element: <ProductListScreen /> },
//   {
//     path: '/admin/productlist/page/:pageNumber',
//     element: <ProductListScreen />,
//   },
//   { path: '/admin/product/:id/edit', element: <ProductEditScreen /> },
//   { path: '/admin/userlist', element: <UserListScreen /> },
//   { path: '/admin/user/:id/edit', element: <UserEditScreen /> },
// ];

// const generatedRoutes = routeConfigurations.map((config, index) => (
//   <Route key={index} path={config.path} element={config.element} />
// ));

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<App />}>
//       {generatedRoutes}
//     </Route>
//   )
// );

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/search/:keyword/*' element={<HomeScreen />} />
      <Route path='/search/:keyword' element={<HomeScreen />} />
      <Route
        path='/search/:keyword/page/:pageNumber'
        element={<HomeScreen />}
      />

      <Route
        path='/search/:keyword/category/:category/brand/:brand'
        element={<HomeScreen />}
      />
      <Route
        path='/search/:keyword/category/:category/brand/:brand/page/:pageNumber'
        element={<HomeScreen />}
      />

      <Route path='/search/:keyword/categories/*' element={<HomeScreen />} />

      <Route
        path='/search/:keyword/category/:category/'
        element={<HomeScreen />}
      />
      <Route
        path='/search/:keyword/category/:category/page/:pageNumber'
        element={<HomeScreen />}
      />

      <Route path='/search/brand/:brand' element={<HomeScreen />} />
      <Route
        path='/search/brand/:brand/page/:pageNumber'
        element={<HomeScreen />}
      />

      <Route path='/search/category/:category' element={<HomeScreen />} />
      <Route
        path='/search/category/:category/page/:pageNumber'
        element={<HomeScreen />}
      />

      <Route
        path='/search/category/:category/brand/:brand'
        element={<HomeScreen />}
      />
      <Route
        path='/search/category/:category/brand/:brand/page/:pageNumber'
        element={<HomeScreen />}
      />

      <Route path='/search/:keyword/*' element={<HomeScreen />} />
      <Route
        path='/search/:keyword/page/:pageNumber/*'
        element={<HomeScreen />}
      />

      <Route
        path='/search/:keyword/price/:minPrice-:maxPrice'
        element={<HomeScreen />}
      />

      <Route
        path='/search/:keyword/price/:minPrice-:maxPrice/page/:pageNumber'
        element={<HomeScreen />}
      />

      <Route path='/page/:pageNumber' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductDetails />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/login/send_recovery_email' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>

      <Route path='' element={<AdminRoute />}>
        <Route path='/admin' element={<DashboardScreen />} />
        <Route path='/admin/orderlist' element={<OrderListScreen />} />
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route
          path='/admin/productlist/page/:pageNumber'
          element={<ProductListScreen />}
        />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
