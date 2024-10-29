import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTransaction } from "../services/admin.service";
import { Transaction } from "../components/OrderDisplay";
import "../styles/edit-transaction.scss";

export default function TransactionPage() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState<Transaction>();

  useEffect(() => {
    getTransaction(Number(id)).then((response) => {
      setTransaction(response);
    });
  }, []);

  return (
    <>
      <div className="row">
        <div className="col center">
          <h2>Edit Transaction Page</h2>
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
          {transaction?.products.map((product) => {
            return (
              <div
                key={product.item_name}
                className="row mb-2"
                style={{ margin: 0 }}
              >
                <div className="col">Product Name: {product.item_name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
