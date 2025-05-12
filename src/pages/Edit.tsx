import { useNavigate, useParams } from "react-router-dom";
import "../styles/edit.scss";
import { getProduct, updateProduct } from "../services/products.service";
import { useEffect, useState } from "react";
import { getImages } from "../components/Carousel";
import { Button, TextareaAutosize, TextField } from "@mui/material"


export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newURL, setNewURL] = useState("");
  const [newPrice, setNewPrice] = useState(0.0);

  const [changed, setChanged] = useState(false);

  const [product, setProduct] = useState({
    item_name: "Loading...",
    id: 0,
    price: 0,
    description: "",
    imageURL: "",
  });

  if (!id) {
    return <h1>404. Invalid product</h1>;
  }

  const productId = parseInt(id);

  useEffect(() => {
    getProduct(productId).then((productFound) => {
      if (productFound == -1) {
        navigate("/404");
      }
      productFound.imageURL = getImages(1);
      setProduct(productFound);
      setNewName(productFound.item_name);
      setNewDescription(productFound.description);
      setNewURL(productFound.imageURL);
      setNewPrice(productFound.price);
    });
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="center">Editing...</h1>
        <div className="center"><TextareaAutosize className="title-edit" value={newName} onChange={(event)=>{setNewName(event.target.value); setChanged(true)}}/></div>
        <div className="col-center">
          <img className="img" src={product.imageURL} alt="" />
        </div>
        <div className="col-center mt-3">
          <strong>Description:</strong> 
          <TextareaAutosize value={newDescription} onChange={(event)=>{setNewDescription(event.target.value);setChanged(true)}}/>
        </div>
        <div className="col-center mt-3">
          <TextField label="Price" type="number" InputLabelProps={{ shrink: true }} value={newPrice} onChange={(event)=>{setNewPrice(Number(event.target.value));setChanged(true)}}/>
        </div>
        <div className="col-center mt-2"><Button variant="contained" onClick={()=>{if(changed){updateProduct(productId, newName, newDescription, newURL, newPrice)}}}>Save</Button></div>
      </div>
    </>
  );
}
