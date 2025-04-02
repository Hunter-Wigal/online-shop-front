'use client';
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import "../styles/product.scss";
import { Button, Skeleton } from "@mui/material";
import { NavigateFunction } from "react-router-dom";
import { ReactElement, ReactEventHandler } from "react";
const isClient = typeof window !== 'undefined';

{
  /* <img
src={product.image_url}
alt={`A picture of ${product.item_name}`}
style={{"display": "hidden"}}
onLoad={imgLoadedCallback}
/> */
}

export interface ProductType {
  product_id: number;
  item_name: string;
  image_url?: string;
  description: string;
  price: number;
  quantity: number;
}

function initiateDelete(
  id: number,
  handleOpen: Function,
  handleDeleting: Function
) {
  handleOpen(true);
  handleDeleting(id);
}

function SkeletonLoader(product: ProductType): ReactElement {
  return (
    <Skeleton
      className="skel-img"
      id={product.image_url + "-skeleton"}
      variant="rounded"
    />
  );
}

export default function ProductCard(props: {
  product: ProductType;
  navigate?: NavigateFunction;
  edit?: boolean;
  handleOpen?: Function;
  setDeleting?: Function;
  key?: string;
}) {
  // const [imageLoaded, setImageLoaded] = useState(false);
  // let imageLoaded = false;

  let btnText = "View Item";
  let route = "item";

  // const [image, setImage] = useState<ReactElement>(SkeletonLoader(props.product));

  if (props.edit) {
    btnText = "Edit Item";
    route = "admin/edit";
  }

  let product = props.product;

  let imgLoadedCallback: ReactEventHandler<HTMLImageElement> = (event) => {
    if(!isClient)
      return;
    console.log(event);
    let id = props.product.image_url;
    if (!id) return;
    let loader = document.getElementById(id + "-skeleton");
    let image = document.getElementById(id + "-image");

    if(loader != null && image != null){
      loader.style.display = "none";
      image.style.display = "block";
    }


  };

  return (
    <Card
      key={props.key}
      className="card mi-1"
      id={`product-${product.product_id}`}
      sx={{ minWidth: "400px", minHeight: "200px" }}
    >
      <CardContent className="">
        <h2>{product.item_name}</h2>
        <p>{product.description}</p>
        <img
          src={product.image_url}
          alt={`A picture of ${product.item_name}`}
          style={{ display: "none" }}
          onLoad={imgLoadedCallback}
          id={product.image_url + "-image"}
          loading="eager"
        />
        {SkeletonLoader(props.product)}
        <p>Price: ${product.price}</p>
        <div className="buttons">
          <Button
            variant="outlined"
            onClick={() => {
              if (props.navigate)
                return props.navigate(`/${route}/${product.product_id}`);
            }}
          >
            {btnText}
          </Button>
          {props.edit ? (
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                if (props.handleOpen && props.setDeleting)
                  initiateDelete(
                    product.product_id,
                    props.handleOpen,
                    props.setDeleting
                  );
              }}
            >
              Delete
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
