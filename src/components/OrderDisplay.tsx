import Button from "@mui/material/Button";
import { removeTransaction } from "../services/admin.service";
import { NavigateFunction } from "react-router-dom";
import { ProductType } from "./ProductCard";

export interface Customer {
  user_id: number;
  name: string;
  email: string;
  age: number;
  phone?: string;
  // address: string;
}

export interface Product {
  item_name: string;
  id: number;
  price: number;
  description: string;
}

export interface Transaction {
  products: Array<ProductType>;
  quantities: Array<number>;
  status: string;
  transaction_id: number;
  user: Customer;
}

function OrderRow(props: {
  transaction: Transaction;
  navigate: NavigateFunction;
}) {
  const { transaction, navigate } = props;

  let products = "";
  for (let product of transaction.products) {
    products += product.item_name + ", ";
  }

  products = products.trim().substring(0, products.length - 2);

  let totalItems = 0;
  for (let quant of transaction.quantities) {
    totalItems += quant;
  }
  return (
    <div className="border p-1 w-90 order mb-1">
      <h3 className="row">Order Number: {transaction.transaction_id}</h3>

      <div className="row">
        <div className="col w-60 p-2">
          <div className="row w-100">
            <div className="col w-100 product-info">
              <div className="row mb-3">Products Ordered: {products}</div>
              <div className="row">Total Items in Order: {totalItems}</div>
            </div>

            <div className="col">Current Status: {transaction.status}</div>
          </div>
        </div>
        <div className="col w-50 p-2">
          <div className="col w-50">Customer info:</div>
          <div className="col">Name: {transaction.user.name}</div>
          <div className="col">Email: {transaction.user.email}</div>
        </div>
        <div className="col delete-btn w-10">
          <Button
            className="mr-2 w-40"
            variant="outlined"
            color="info"
            onClick={() => {
              return navigate(`/admin/transaction/${transaction.transaction_id}`);
            }}
          >
            View
          </Button>
          <Button
            className="w-40"
            variant="outlined"
            color="error"
            onClick={() =>
              removeTransaction(transaction.transaction_id).then((result) => {
                result;
                window.alert("Successfully deleted transaction");
                window.location.reload();
              })
            }
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function OrderDisplay(props?: {
  transactions?: Array<Transaction>;
  navigate: NavigateFunction
}) {
  if (!props || !props.transactions || props.transactions.length === 0) {
    return <h1 className="warning center">No orders to show</h1>;
  }

  const { transactions, navigate } = props;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-center">
            <h2>Orders Display</h2>
          </div>
        </div>
        {transactions.map((item) => {
          return <OrderRow key={item.transaction_id} transaction={item} navigate={navigate}/>;
        })}
      </div>
    </>
  );
}
