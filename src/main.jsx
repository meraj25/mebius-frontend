import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { store } from "./lib/store";
import { Provider } from "react-redux";

import "./index.css";

import HomePage from "./pages/home.page";
import SignInPage from "./pages/sign-in.page";
import SignUpPage from "./pages/sign-up.page";
import ShopPage from "./pages/shop.page";
import RootLayout from "./layouts/root.layout";
import CartPage from "./pages/cart.page";
import CheckoutPage from "./pages/checkout.page";
import ProtectedLayout from "./layouts/protected.layout";
import CreateProductPage from "./pages/create-product-page";
import AdminProtectedLayout from "./layouts/admin-protected.layout";
import SearchedProductPage from "./pages/searchedproduct.page";
import Shopping from "./pages/shopping.page";
import OrdersPage from "./pages/orders.page";
import MyOrdersPage from "./pages/myorders.page";

import { ClerkProvider } from "@clerk/clerk-react";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop">
                <Route path=":category" element={<ShopPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route element={<ProtectedLayout />}>
                  <Route path="checkout" element={<CheckoutPage />} />
                  <Route path="payment" element={<PaymentPage />} />
                </Route>
              </Route>
              <Route element={<ProtectedLayout />}>
                <Route element={<AdminProtectedLayout />}>
                  <Route
                    path="/admin/products/create"
                    element={<CreateProductPage />}
                  />

                </Route>
              </Route>
            </Route>

            <Route element={<RootLayout />}>
             <Route path="shop/products/:id" element={<SearchedProductPage />} />
             <Route path="/all" element={<Shopping />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route element={<ProtectedLayout />}>
              <Route path="/orders" element={<MyOrdersPage />} />
            </Route>
            <Route element={<ProtectedLayout />}>
            <Route element={<AdminProtectedLayout />}>
            
              <Route path="/admin/orders" element={<OrdersPage />} />
            
            </Route>
            </Route>
            </Route>

          </Routes>
        </BrowserRouter>
      </Provider>
    </ClerkProvider>
  </StrictMode>
);
//import Sales from "./pages/sales.page";
//<Route path="/admin/sales" element={<Sales />} />
//import OrdersPage from "./pages/orders.page";
//import MyOrdersPage from "./pages/myorders.page";
//<Route path="/orders" element={<MyOrdersPage />} />
//<Route path="/admin/orders" element={<OrdersPage />} />