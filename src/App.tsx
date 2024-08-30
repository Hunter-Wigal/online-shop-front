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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Auth from "./pages/Auth";
import { createContext, SetStateAction, useState } from "react";
import { ProductType } from "./components/ProductCard";
import Product from "./pages/Product";

export interface CartContextType{
  cart: ProductType[];
  setCart: React.Dispatch<React.SetStateAction<ProductType[]>>
}

const context: CartContextType = {
  cart: [],
  setCart: function (value: SetStateAction<ProductType[]>): void {
    value;
    throw new Error("Function not implemented.");
  }
};

export const CartContext = createContext<CartContextType>(context);
function App() {
  const [cart, setCart] = useState(Array<ProductType>());


  window.addEventListener("pageshow", () => {
    as.checkJWT();
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: "#0097a7",
      },
      secondary: {
        main: "#3f51b5",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CartContext.Provider  value={ {cart: cart, setCart: setCart }}>
          <Navbar cart={cart}/>

          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/shop" index element={<Shop />} />
            <Route path="/account" index element={<Account />} />
            <Route path="/checkout" index element={<Checkout />} />
            <Route path="/about" index element={<About />} />
            <Route path="/admin" index element={<Admin />} />
            <Route path="/auth" index element={<Auth />} />
            <Route path="/item/:id" index element={<Product/>}></Route>
          </Routes>
        </CartContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
