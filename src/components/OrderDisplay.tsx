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
  product: Product;
  quantity: number;
  status: string;
  transaction_id: number;
  user: Customer;
}

function OrderRow(props: { transaction: Transaction }) {
  const { transaction } = props;
  return (
    <div className="border p-1 w-90 order">
      <h3 className="row">Order Number: {transaction.transaction_id}</h3>

      <div className="row">
        <div className="col w-50 border p-2">
          <div className="row">
            <div className="col w-60 product-info">
              <div className="row mb-3">Product Name: {transaction.product.item_name}</div>
              <div className="row">Quantity: {transaction.quantity}</div>
              
            </div>
            <hr className="mr-2 split"/>
            <div className="col">Current Status: {transaction.status}</div>
          </div>
        </div>
        <div className="col w-50 border p-2">
          <div className="col">Customer info:</div>
          <div className="col">Name: {transaction.user.name}</div>
          <div className="col">Email: {transaction.user.email}</div>
        </div>
      </div>

    </div>
  );
}

export default function OrderDisplay(props?: { transactions?: Array<Transaction> }) {
  if (!props || !props.transactions || props.transactions.length === 0) {
    return <h1 className="warning center">No orders to show</h1>;
  }

  const { transactions } = props;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-center">
            <h2>Orders Display</h2>
          </div>
        </div>
        {transactions.map((item) => {
          return <OrderRow key={item.transaction_id} transaction={item} />;
        })}
      </div>
    </>
  );
}
