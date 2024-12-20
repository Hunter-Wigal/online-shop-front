import { Route, Routes } from "react-router-dom";
import "./styles/app.scss";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Account from "./pages/Account";
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout";
import * as as from "./services/authentication.service";
import * as accS from "./services/account.service.ts";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Auth from "./pages/Auth";
import { createContext, SetStateAction, useState } from "react";
import { ProductType } from "./components/ProductCard";
import Product from "./pages/Product";
import EditProduct from "./pages/Edit";
import NotFound from "./pages/404";
import { NewProduct } from "./pages/NewProduct";
import TransactionPage from "./pages/ViewTransaction.tsx";
import AdminTabs from "./components/AdminTabs.tsx";

export interface CartContextType {
  cart: ProductType[];
  setCart: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

const context: CartContextType = {
  cart: [],
  setCart: function (value: SetStateAction<ProductType[]>): void {
    value;
    throw new Error("Function not implemented.");
  },
};

export const CartContext = createContext<CartContextType>(context);

function App() {
  const [cart, setCart] = useState(Array<ProductType>());

  window.addEventListener("load", () => {
    as.checkJWT();
    accS.checkCart().then(async (response) => {
      let newCart = new Array<ProductType>();

      if (response) newCart = response;

      setCart(newCart);
    });
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: "#0097a7",
      },
      secondary: {
        main: "#3f51b5",
      },
      warning: { main: "#ff0000" },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CartContext.Provider value={{ cart: cart, setCart: setCart }}>
          <Navbar cart={cart} setCart={setCart} />

          {/* Figure out a way to change admin routes to begin with /admin and only allow the admin to access*/}
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/shop" index element={<Shop />} />
            <Route path="/account" index element={<Account />} />
            <Route path="/checkout" index element={<Checkout />} />
            <Route path="/about" index element={<About />} />
            <Route path="/auth" index element={<Auth />} />
            <Route path="/item/:id" index element={<Product />} />{/* //TODO ??  */}
            
            <Route path="404" index element={<NotFound />} />

            <Route path="admin" element={<Admin />}>
              <Route path="" element={<AdminTabs/>}/>
              <Route path="edit/:id" element={<EditProduct />} />
              <Route path="new-product" element={<NewProduct />} />
              <Route path="transaction/:id" element={<TransactionPage />}/>
            </Route>

          </Routes>
        </CartContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
