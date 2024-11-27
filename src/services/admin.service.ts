// This file specifically handles admin related requests

import { Transaction } from "../components/OrderDisplay";


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
      }
    : {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      };

      //TODO Will have to check this later
  return fetch(`${process.env.VITE_SERVER_URL}/api/v1/${url_endpoint}`, {
    method: `${method}`,
    headers: headers,
    body: body,
  });
}

async function checkStatus() {
    return fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/orders`, { mode: "no-cors" })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

export async function getTransactions(): Promise<Array<Transaction> | null>{
    if(!await checkStatus()){
        alert("Server not available");
        return null;
    }

    // Assume jwt is available because admin is required for this page
    return fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/orders`, {headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + localStorage["jwt"],
      },
      method: "GET",
      // body: JSON.stringify({ username: username}),
    }).then(async (transactionsRecieved)=>{
        const json = await transactionsRecieved.json()
        return json;
    })
}

export async function removeTransaction(transaction_id: number){
  return easyFetch(`orders/${transaction_id}`, true, "DELETE");
}

export async function getTransaction(transaction_id: number): Promise<Transaction>
{
  return easyFetch(`orders/${transaction_id}`, true, "GET").then((response)=>{
    return response.json();
  });
}