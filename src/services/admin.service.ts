// This file specifically handles admin related requests

import { Transaction } from "../components/OrderDisplay";
import easyFetch from "../helpers/EasyFetch";
import { healthCheck } from "./health.service";


export async function getTransactions(): Promise<Array<Transaction> | null> {
  if (!(await healthCheck())) {
    alert("Server not available");
    return null;
  }

  return easyFetch("orders", true, "GET").then(async (transactionsRecieved) => {
      const json = await transactionsRecieved.json();
      return json;
    })
    .catch((err) => {
      console.log("Some err", err);
    });

}

export async function removeTransaction(transaction_id: number) {
  return easyFetch(`orders/${transaction_id}`, true, "DELETE");
}

export async function getTransaction(
  transaction_id: number
): Promise<Transaction> {
  return easyFetch(`orders/${transaction_id}`, true, "GET").then((response) => {
    return response.json();
  });
}

export async function makeAdmin() {
  return easyFetch(`auth/make_me_admin`, true, "post");
}
