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

// const [item_name, setName] = useState("");
// const [description, setDescription] = useState("");
// const [price, setPrice] = useState(0.0);

// function handleSubmit(event: FormEvent) {
//   event.preventDefault();

//   fetch("http://localhost:8080/api/v1/products", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       item_name: item_name,
//       description: description,
//       price: price,
//     }),
//   }).then((value) => {
//     console.log(value);
//   });
// }

function OrderRow(props: { order: Transaction }) {
  const { order } = props;
  return (
    <div className="border p-1 w-90 order">
      <h3 className="row">Order Number: {order.transaction_id}</h3>

      <div className="row">
        <div className="col w-50 border p-2">
          <div className="row">
            <div className="col w-60 product-info">
              <div className="row mb-3">Product Name: {order.product.item_name}</div>
              <div className="row">Quantity: {order.quantity}</div>
              
            </div>
            <hr className="mr-2 split"/>
            <div className="col">Current Status: {order.status}</div>
          </div>
        </div>
        <div className="col w-50 border p-2">
          <div className="col">Customer info:</div>
          <div className="col">Name: {order.user.name}</div>
          <div className="col">Email: {order.user.email}</div>
        </div>
      </div>

    </div>
  );
}

export default function OrderDisplay(props?: { orders?: Array<Transaction> }) {
  if (!props || !props.orders || props.orders.length === 0) {
    // TODO change this because it shouldn't be displayed
    return <h1 className="warning center">No orders to show</h1>;
  }

  const { orders } = props;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-center">
            <h2>Orders Display</h2>
          </div>
        </div>
        {orders.map((item) => {
          return <OrderRow key={item.transaction_id} order={item} />;
        })}
      </div>
    </>
  );
}
