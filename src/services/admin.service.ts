// This file specifically handles admin related requests

import { Transaction } from "../components/OrderDisplay";


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