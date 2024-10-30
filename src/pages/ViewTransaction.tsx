import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTransaction } from "../services/admin.service";
import { Transaction } from "../components/OrderDisplay";
import "../styles/view-transaction.scss";
import Button from "@mui/material/Button";

export default function TransactionPage() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState<Transaction>({});

  useEffect(() => {
    getTransaction(Number(id)).then((response) => {
      setTransaction(response);
    });
  }, []);

  return (
    <>
      <div className="row">
        <div className="col center">
          <h2>View Transaction Page</h2>
        </div>
      </div>
      <div className="transaction">
        <div className="row">
          <div className="col">Order Number: {transaction?.transaction_id}</div>
        </div>
        <div className=" products-info mt-1">
          <h4 className="col-start w-10 mb-2" style={{ margin: 0 }}>
            Items in Order:
          </h4>
          {transaction?.products.map((product, index) => {
            
            return (
              <div
              className="row mb-1 product p-1"
              key={product.product_id}
            >
              <img
                width="150"
                height="100"
                className="mr-3"
                src={product.image_url}
              />
              <div className="col w-25">Name: {product.item_name}</div>
              <div className="col-start">
                Price: ${product.price.toFixed(2)}
              </div>
              <div className="col-end">
                <div className="mr-10 row center">
                  <span style={{ alignContent: "center" }}>
                    Quantity: {transaction.quantities[index]}
                  </span>

                </div>
                <div style={{ alignContent: "center" }}>
                  Total Price: $
                  {(product.price * transaction.quantities[index]).toFixed(2)}
                </div>

              </div>
            </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
