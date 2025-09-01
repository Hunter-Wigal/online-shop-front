import { ProductType } from "../components/ProductCard";

// Function meant to eliminate the long fetch calls. May be changed to axios later
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
        crossdomain: "true",
        "Access-Control-Allow-Origin": "*"
      }
    : {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
        "Access-Control-Allow-Origin": "*",
        crossdomain: "true"
      };
  return fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/${url_endpoint}`, {
    method: `${method}`,
    headers: headers,
    body: body,
  });
}

export async function checkCart() {
  let userDetails = sessionStorage["user"];
  let newCart = new Array<ProductType>();

  if (!userDetails) {
    return newCart;
  }
  let username = JSON.parse(userDetails).email;

  return easyFetch(`user/${username}/cart`, true, "GET").then(
    async (response) => {
      if (!response) return newCart;

      let foundCart = await response.json();

      for (let i = 0; i < foundCart.products.length; i++) {
        let product: ProductType = foundCart.products[i];
        product.quantity = foundCart.quantities[i];

        newCart.push(product);
      }
      return newCart;
    }
  ).catch(()=>{
    console.log("no items in cart:");
  });
}

export function sendItemToCart(product: ProductType) {
  let userDetails = sessionStorage["user"];

  if (!userDetails) {
    return;
  }

  let username = JSON.parse(userDetails).email;

  let body = JSON.stringify({
    "product_id": product.product_id,
    "quantity": product.quantity,
  });

  easyFetch(`user/${username}/cart`, false, "POST", body)
    .then(() => {
      // console.log(response);
      window.alert("Item added successfully");
    })
    .catch((err) => {
      console.log(`There was an error with updating the cart: ${err}`);
    });
}

export function clearCart() : Promise<Response>{
  let userDetails = sessionStorage["user"];
  if(!userDetails) return new Promise(()=>{let response = Response.error();return response;});

  let username = JSON.parse(userDetails)['email'];
  return easyFetch(`user/${username}/cart`, true, "DELETE");
}

export function addAddress(){
  let userDetails = sessionStorage["user"];
  if(!userDetails) return new Promise(()=>{let response = Response.error();return response;});

  let username = JSON.parse(userDetails)['email'];

  let body = JSON.stringify({street: "123 Test Street", secondary_street: "", city: "Test City", state: "TS", country: "USA", zip_code: 12345});

  easyFetch(`user/${username}/address`, true, "POST", body).then(async (response)=>{console.log(await response.json())});
}

export function getAddress(){
    let userDetails = sessionStorage["user"];
  if(!userDetails) return new Promise(()=>{let response = Response.error();return response;});

  let username = JSON.parse(userDetails)['email'];


  easyFetch(`user/${username}/address`, true, "GET").then(async (response)=>{console.log(await response.json())});
}