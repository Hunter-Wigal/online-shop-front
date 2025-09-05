import Button from "@mui/material/Button";
import Box from "@mui/material/Box"
import { useContext, useState } from "react";
import "../styles/checkout.scss";
import { CartContext } from "../App";
import * as accS from "../services/account.service";
import { ProductType } from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import ProductRow from "../components/ProductRowDisplay";

export default function Cart() {
  const context = useContext(CartContext);
  const [cart, setCart] = useState(context.cart);
  const navigate = useNavigate();
  // const [formValid, setFormValid] = useState(false);

  const calculateCartTotal = ()=>{
    let total = 0;

    for (let product of cart){
        total+= product.price * product.quantity;
    }

    return total;
  };

  // Possibly not updated yet, useful when refreshing
  if (cart.length == 0) {
    accS.checkCart().then(async (response) => {
      let newCart = new Array<ProductType>();

      if (response && response.length > 0) {
        newCart = response;

        setCart(newCart);
      }
    });
  }

  let border = cart.length > 0 ?{border: "2px solid", borderColor:"primary.main", borderRadius: "5px"} : {};

  return (
    <>
      <div className="container checkout">
        <h1 className="col center">Checkout</h1>
        <hr className="row w-75 mt-2" />
        <div className="row">
          <div className="col-start cart">
            <h2>Cart</h2>
            <Box sx={border}>
              {cart.length < 1 ? (
                <h3 className="warning">No items placed in cart</h3>
              ) : (
                cart.map((product, index) => {
                  return (
                    <ProductRow
                      product={product}
                      index={index}
                      context={context}
                      key={product.product_id}
                    />
                  );
                })
              )}
            </Box>
          </div>
        </div>
        <div className="row">
            {cart.length < 1 ? <></> : <h3>Current Total: ${calculateCartTotal()}</h3>}
        </div>
        <div className="row mt-5 mx-auto">
            <Button variant="outlined" onClick={()=>{return navigate("/checkout")}}>Continue to Checkout</Button>
        </div>
      </div>
    </>
  );
}
