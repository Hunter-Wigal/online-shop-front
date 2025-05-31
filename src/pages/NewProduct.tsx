import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "../styles/new-product.scss";
import { addProduct } from "../services/products.service";
import { useState } from "react";

export function NewProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState(0);

    // TODO figure out a way to get an S3 url from uploading a file


  return <div className="container w-75">
    <h1 className="row center">Product Manager</h1>
    {/* Product name, description, price, image */}
    <div className="row mt-1">
        <TextField variant="outlined" label="Product Name" value={name} onChange={(event)=>{setName(event.target.value);}}/>
    </div>
    <div className="row mt-1">
        <TextField variant="outlined" label="Description" value={description} onChange={(event)=>{setDescription(event.target.value);}}/>
    </div>
    <div className="row mt-1">
        {/* Make this either http link or file drop */}
        <TextField variant="outlined" label="image/url" value={image} onChange={(event)=>{setImage(event.target.value)}}/>
    </div>
    <div className="row mt-1">
        <TextField variant="outlined" label="Price ($)" type="number" value={price} onChange={(event)=>{setPrice(parseFloat(event.target.value))}}/>
    </div>
    <div className="row center mt-1">
        <Button onClick={()=>{addProduct({name: name, description: description, image_url: image, price: price})}} variant="contained">Save New Product</Button>
    </div>
    <div className="row mt-10">Preview product page coming soon....</div>
  </div>;
}
