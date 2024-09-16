import { Button } from "@mui/material";
import { useContext } from "react";
import { ProductType } from "../components/ProductCard";
import "../styles/checkout.scss";
import ShippingForm from "../components/ShippingForm";
import PaymentForm from "../components/PaymentForm";
import { CartContext } from "../App";

let cart = new Array<ProductType>();

export default function Checkout() {
  const context = useContext(CartContext);
  cart = context.cart;

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
                cart.map((product) => {
                  return (
                    <div className="row mb-1 product p-1" key={product.id}>
                      <img
                        width="150"
                        height="100"
                        className="mr-3"
                        src={product.image_URL}
                      />
                      <div className="col w-25">Name: {product.item_name}</div>
                      <div className="col-start">
                        Price: ${product.price.toFixed(2)}
                      </div>
                      <div className="col-end">
                        <div className="mr-10">
                          Quantity: {product.quantity}
                        </div>
                        <div>
                          Total Price: $
                          {(product.price * product.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
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
                  console.log(cart.length);
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
