import { useState } from "react";
import { Link } from "react-router";
import { Menu, X, ShoppingBag, Search, User } from "lucide-react";
import { useSelector } from "react-redux";
import { SignedIn, UserButton, SignedOut } from "@clerk/clerk-react";
import ProductSearchForm from "./ProductSearchForm";



export default function Navigation() {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );



  const closeMobileMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-16">
  
          
         <div className=" flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-2xl m-8 ">
            Mebius
          </Link>

          <ProductSearchForm />
       

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10 ">
            {[
              {
                path: "/all",
                label: "Shop",
              },
              {
                path: "/shop/shoes",
                label: "Shoes",
              },
              {
                path: "/shop/tshirts",
                label: "T-Shirt",
              },
              {
                path: "/shop/shorts",
                label: "Shorts",
              },
              {
                path: "/shop/pants",
                label: "Pants",
              },
              {
                path: "/shop/socks",
                label: "Socks",
              },
              {
                path: "/orders",
                label: "MyOrders",
              },
            ].map((item) => {
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="font-medium hover:text-gray-600 "
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

      <nav className="hidden md:flex space-x-8 ml-20">
  {[
    {
      path: "/admin/products/create",
      label: "Create Product",
    },
    {
      path: "/admin/orders",
      label: "View Orders",
    },
    {
      path: "/admin/sales",
      label: "Sales",
    },
  ].map((item) => (
    <Link
      key={item.path}
      to={item.path}
      className="font-medium hover:text-red-500"
    >
      {item.label}
    </Link>
  ))}
</nav>
          {/* Icons */}
          <div className="flex items-center space-x-6 ">
            {/* Shopping Cart Icon with Item Count */}
            <Link
              to="/shop/cart"
              aria-label="Shopping Bag"
              className="p-1 relative"
            >
              <ShoppingBag size={26} />
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            </Link>
            <SignedIn>
              
                <UserButton size={36} />
              
            </SignedIn>
            <div className="hidden md:block">
              <SignedOut>
                <div className="flex items-center gap-4">
                  <Link to="/sign-in">Sign In</Link>
                  <Link to="/sign-up">Sign Up</Link>
                </div>
              </SignedOut>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          </div>
     
  

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            {[
              { path: "/product/Shoes", label: "Shoes" },
              { path: "/product/T-shirts", label: "T-Shirt" },
              { path: "/product/Shorts", label: "Shorts" },
              { path: "/product/Pants", label: "Pants" },
              { path: "/product/Socks", label: "Socks" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-3 py-2 text-base font-medium hover:bg-gray-100 rounded-md"
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="block md:hidden px-4">
            <SignedOut>
              <div className="flex items-center gap-4">
                <Link to="/sign-in">Sign In</Link>
                <Link to="/sign-up">Sign Up</Link>
              </div>
            </SignedOut>
          </div>
        </div>
      )}
    </header>
  );
}