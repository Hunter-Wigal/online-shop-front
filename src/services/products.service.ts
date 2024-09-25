import { ProductType } from "../components/ProductCard";
import { CartContextType } from "../App";
import { getUserDetails } from "./authentication.service";

async function checkStatus() {
  return fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/products`, {
    mode: "no-cors",
  })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function getProducts(): Promise<ProductType[] | null> {
  let ignore = false;

  if (!(await checkStatus())) return null;

  const fetched = fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/products`, {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      // Shouldn't need when retrieving products
      // Authorization: "Bearer " + document.cookie.split("=")[1],
    },
  })
    .then(async (data) => {
      if (!data.ok) {
        throw new Error("Server unavailable: " + data.status);
      }
      if (!ignore) {
        let json: ProductType[] = await data.json();

        return json;
      } else {
        ignore = true;
        return null;
      }
    })
    .catch(() => {
      // console.log(err);
      return null;
    });

  return fetched;
}

export function getCart(context: CartContextType) {
  let cart = new Array<ProductType>();
  // let setCart = null;
  if (context != null) {
    cart = context.cart;
    // const product: Product = {id: 3, name: "Item", description: "An item", price: 5.00, quantity: 1};
  }

  return cart;
}

export function addToCart(context: CartContextType, product: ProductType) {
  let setCart = null;
  // let setCart = null;
  if (context != null) {
    setCart = context.setCart;
    let newCart = context.cart.slice();

    newCart.push(product);
    setCart(newCart);
  }
}

export function updateQuantity(context: CartContextType, index: number, newQuantity: number){
  let setCart = null;

  if(newQuantity < 1)return;

  if (context != null) {
    setCart = context.setCart;
    let cart = context.cart;
    let product = cart[index];
    product.quantity = newQuantity;

    let newCart = cart.slice(0, index).concat(product).concat(cart.slice(index, cart.length - 1))

    setCart(newCart);
  }

}

export function removeFromCart(context: CartContextType, index: number){
  if(context){
    let setCart = context.setCart;
    let newCart = context.cart.splice(index, 1);
    setCart(newCart);
    console.log(context.cart);

    // Temporary solution
    window.location.reload();
  }
}

export async function getProduct(id: number) {
  if (!checkStatus()) return;
  else {
    return await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/products/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          // Shouldn't need when retrieving products
          // Authorization: "Bearer " + document.cookie.split("=")[1],
        },
      }
    )
      .then(async (data) => {
        let json = await data.json();
        return json;
      })
      .catch(() => {
        console.log("Item not found");
        return -1;
      });
  }
}

export function addProduct(product: {
  name: string;
  description: string;
  image_url: string;
  price: number;
}) {
  console.log(product);

  fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/products`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      // Authorization: "Bearer " + document.cookie.split("=")[1],
    },
    body: JSON.stringify({
      item_name: product.name,
      description: product.description,
      price: product.price,
      image_url: product.image_url
    }),
  }).then((response) => {
    console.log(response);
  });
}

export function updateProduct(id: number, name: string, description: string) {
  fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/products/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json-patch+json",
      Authorization: "Bearer " + localStorage['jwt'],
    },
    body: JSON.stringify({
      item_name: name,
      item_description: description,
    }),
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function removeProduct() {}

export function buyProducts(cart: ProductType[]) {
  let product_ids = [];
  let quantities = [];
  for (let product of cart) {
    product_ids.push(product.product_id);
    quantities.push(product.quantity);
  }

  let orders = {
    product_ids: product_ids,
    user_email: "",
    quantities: quantities,
    address: "Unfinished",
  };

  let username = "invalid";
  let details = getUserDetails(localStorage['jwt']);
  if (details) username = details.sub;
  orders.user_email = username;


  fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/orders`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json-patch+json",
      // Authorization: "Bearer " + document.cookie.split("=")[1],
    },
    body: JSON.stringify(orders),
  }).then((response) => {
    console.log(response);
  });
}
