import { ProductType } from "../components/ProductCard";
import { CartContextType } from "../App";

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

function getImages(num: number) {
  let images = [];
  let url = "https://picsum.photos/400?random=";
  for (let i = 0; i < num; i++) {
    images.push(url + i);
  }

  return images;
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

        let images = getImages(json.length);
        let count = 0;

        for (let product of json) {
          product.image_URL = images[count++];
        }

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
        json.image_URL = getImages(1);
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
  image_URL: string;
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
      Authorization: "Bearer " + document.cookie.split("=")[1],
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
