import { ProductType } from "../components/ProductCard";
import { CartContextType } from "../App";
import { getUserDetails } from "./authentication.service";
import { sendItemToCart } from "./account.service";

// Function meant to eliminate the long fetch calls. May be changed to ajax later
function easyFetch(
  url_endpoint: string,
  auth: boolean,
  method: string,
  body?: any
): Promise<Response> {
  let jwt = localStorage.getItem("jwt");
  if (!jwt) jwt = "";

  let headers: RequestInit["headers"] = !auth
    ? {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    : {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
        "Access-Control-Allow-Origin": "*"
      };

  return fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/${url_endpoint}`, {
    method: `${method}`,
    headers: headers,
    body: body,
  });
}

// Checks whether the server is available
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

// Retrieves all available products
export async function getProducts(): Promise<ProductType[] | null> {
  let ignore = false;

  if (!(await checkStatus())) return null;

  const fetched = easyFetch("products", false, "GET")
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
      return null;
    });

  return fetched;
}

// Gets the cart contents from the context
export function getCart(context: CartContextType) {
  let cart = new Array<ProductType>();
  // let setCart = null;
  if (context != null) {
    cart = context.cart;
  }

  return cart;
}

// Adds an item to the cart by updating the context and sending the new list to the server
export function addToCart(context: CartContextType, product: ProductType) {
  // let setCart = null;
  if (context != null) {
    let newCart = context.cart.slice();

    newCart.push(product);
    context.setCart(newCart);
    sendItemToCart(product);
  }
}

// Updates quantity of an item in the cart
export function updateQuantity(
  context: CartContextType,
  index: number,
  newQuantity: number
) {

  if (newQuantity < 1) return;

  
  if (context != null) {
    let cart = context.cart;

    let product = cart[index];
    product.quantity = newQuantity;
    
    cart[index] = product;
    
    context.setCart(cart);
  }
}


export function removeFromCart(context: CartContextType, index: number) {
  if (context) {
    let setCart = context.setCart;
    let newCart = context.cart.splice(index, 1);
    setCart(newCart);

    let userDetails = sessionStorage["user"];

    if (!userDetails) {
      return;
    }

    let username = JSON.parse(userDetails).email;

    easyFetch(`user/${username}/cart/${index}`, false, "DELETE").then(
      (response) => {
        console.log(response);
      }
    );

    // Temporary solution
    window.location.reload();
  }
}

// Gets information on a single product
export async function getProduct(id: number) {
  if (!checkStatus()) return;
  else {
    return await easyFetch(`products/${id}`, false, "GET")
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

// Handles searching for a specific product
export function productSearch(keyword: string) {
  let fetched = easyFetch(
    `products/search?keyword=${keyword}`,
    false,
    "GET"
  ).then(async (response) => {
    if (!response.ok) {
      throw new Error("Invalid search: " + response.status);
    }

    let json: ProductType[] = await response.json();

    return json;
  });

  return fetched;
}

// Sends a request to the server to add a new product to the database
export function addProduct(product: {
  name: string;
  description: string;
  image_url: string;
  price: number;
}) {
  console.log(product);

  easyFetch(
    "products",
    false,
    "POST",
    JSON.stringify({
      item_name: product.name,
      description: product.description,
      price: product.price,
      image_url: product.image_url,
    })
  ).then((response) => {
    console.log(response);
  });
}

// Updates product info, meant to be utilized by the admin
export function updateProduct(id: number, name: string, description: string) {
  easyFetch(
    `products/${id}`,
    true,
    "PATCH",
    JSON.stringify({
      item_name: name,
      item_description: description,
    })
  )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Removes a product from the database
export function removeProduct(id: number) {
  if (id == -1) {
    console.log("Error with removing product");
    return new Promise<String>(() => "Failed to delete");
  }

  // TODO change false to true
  return easyFetch(`products/${id}`, false, "DELETE")
    .then((response) => {
      return response.text();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

// Sends a request to the server to create a new transaction
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
  let details = getUserDetails(localStorage["jwt"]);
  if (details) username = details.sub;
  orders.user_email = username;

  return easyFetch("orders", false, "POST", JSON.stringify(orders));
}
