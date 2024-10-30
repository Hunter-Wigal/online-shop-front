import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import "../styles/checkout.scss";
import ShippingForm from "../components/ShippingForm";
import PaymentForm from "../components/PaymentForm";
import { CartContext } from "../App";
import { buyProducts } from "../services/products.service";
import { clearCart } from "../services/account.service";
import * as accS from "../services/account.service";
import { ProductType } from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import ProductRow from "../components/ProductRowDisplay";

export default function Checkout() {
  const context = useContext(CartContext);
  const [cart, setCart] = useState(context.cart);
  const navigate = useNavigate();

  useEffect(() => {
    accS.checkCart().then(async (response) => {
      let newCart = new Array<ProductType>();

      if (response) newCart = response;

      setCart(newCart);
    });
  });

  return (
    <>
      <div className="container checkout">
        <h1 className="col center">Checkout</h1>
        <hr className="row w-75 mt-2" />
        <div className="row">
          <div className="col-start cart">
            <h2>Cart</h2>
            <div>
              {cart.length < 1 ? (
                <h3 className="warning">No items placed in cart</h3>
              ) : (
                cart.map((product, index) => {
                  return (
                    <ProductRow
                      product={product}
                      index={index}
                      context={context}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col" style={{ display: "block" }}>
            <h2>Delivery Details</h2>
            <ShippingForm />
          </div>
        </div>
        <div className="row">
          <div className="col" style={{ display: "block" }}>
            <h2>Payment Info</h2>
            <PaymentForm />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="place">
              <Button
                className="pb-10 w-50 mt-3 mb-3"
                variant="outlined"
                onClick={() => {
                  return buyProducts(cart).then((response) => {
                    console.log(response);
                    if (response.ok) {
                      context.setCart([]);
                      setCart([]);
                      clearCart().then((response) => {
                        if (response == null || !response.ok) {
                          window.alert("An error has occured");
                        }
                      });
                      window.alert("Successfully placed order");
                      navigate("/shop");
                    }
                  });
                }}
              >
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
