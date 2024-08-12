import { FormEvent, useState } from "react";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import "../styles/Admin.scss";

export default function Admin() {
  const [item_name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0.0);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    fetch("http://localhost:8080/api/v1/products", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ item_name: item_name, description: description, price: price }),
    }).then((value) => {
      console.log(value);
    });
    // You should see email and password in console.
    // ..code to submit form to backend here...
  }
  return (
    <>
      <div className="container">
        <h1>Admin page</h1>
        <div className="product-edit">
          <form
            action=""
            method="post"
            onSubmit={handleSubmit}
            className="edit-form"
          >
            <TextField
              value={item_name}
              label="Item name"
              color="secondary"
              focused
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <TextField
              value={description}
              label="description"
              variant="filled"
              color="success"
              focused
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
            <TextField
              value={price}
              label="price"
              variant="standard"
              color="warning"
              focused
              type="number"
              onChange={(event) => {
                setPrice(Number(event.target.value));
              }}
            />
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    </>
  );
}
