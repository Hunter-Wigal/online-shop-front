import { Product } from "../components/Product";
import { CartContextType } from "../App";

async function checkStatus() {
  return fetch("http://localhost:8080/api/v1/products", { mode: "no-cors" })
    .then(() => {
      console.log("Request sent with no-cors mode");
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function fetchData() {
  let ignore = false;

  if (!(await checkStatus())) return null;

  const fetched = fetch("http://localhost:8080/api/v1/products", {
    headers: {
      method: "GET",
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + document.cookie.split("=")[1],
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then(async (data) => {
      if (!data.ok) {
        throw new Error("Server unavailable: " + data.status);
      }
      if (!ignore) {
        console.log("here");
        return await data.json();
      } else {
        return () => {
          ignore = true;
        };
      }
    })
    .catch(() => {
      // console.log(err);
      return null;
    });

  return fetched;
}


export function getCart(context: CartContextType ){
  
  let cart = new Array<Product>();
  // let setCart = null;
  if (context != null) {
    cart = context.cart;
    // const product: Product = {id: 3, name: "Item", description: "An item", price: 5.00, quantity: 1};
  }
  
  return cart;
}

export function addToCart(context: CartContextType){

  let setCart = null;
  // let setCart = null;
  if (context != null) {
    setCart = context.setCart;
    let newCart = context.cart.slice();
    
    newCart.push({
      id: 0,
      name: "New item",
      description: "An item",
      price: 5,
      quantity: 1
    });

    setCart(newCart);
  }
}