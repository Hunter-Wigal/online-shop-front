import { useEffect, useState } from "react";
import "../styles/admin.scss";
import { Box, Tab, Tabs } from "@mui/material";
import OrderDisplay, { Transaction } from "../components/OrderDisplay";
import { getOrders } from "../services/admin.service";
import ProductCard, { ProductType } from "../components/ProductCard";
import { getProducts } from "../services/products.service";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Used for aria attributes
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Admin() {
  const [value, setValue] = useState(0);
  const [orders, setOrders] = useState(new Array<Transaction>());
  const [products, setProducts] = useState(new Array<ProductType>());

  useEffect(() => {
    getOrders().then((array) => {
      if (array) setOrders(array);
    });

    getProducts().then((array) => {
      if (array) {
        setProducts(array);
      }
    });
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    event;
  };

  const tabStyleOverride = { fontSize: "22px" };

  return (
    <>
      <div className="container">
        <h1>Admin page</h1>
        <p>
          Page for managing the site with options to add, update, and remove
          available products. Should also show placed orders and be able to
          manage them. Can't simply check roles, must request roles from server
          everytime reloading the page. Storage can be manipulated
        </p>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            variant="fullWidth"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="Orders" sx={tabStyleOverride} {...a11yProps(0)}></Tab>
            <Tab label="Products" sx={tabStyleOverride} {...a11yProps(1)}></Tab>
            <Tab label="Account" sx={tabStyleOverride} {...a11yProps(2)}></Tab>
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <OrderDisplay orders={orders} />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <div className="row w-100">
            {products.map((product) => {
              return (
                <div className="col w-100 mi-7">
                  <ProductCard
                    key={product.id}
                    product={product}
                    navigate={undefined}
                  />
                </div>
              );
            })}
          </div>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <h2>Account info:</h2>
        </CustomTabPanel>

        {/* <OrderDisplay
          order={{
            productName: "Product",
            quantity: 5,
            price: 16.0,
            customer: undefined,
          }}
        /> */}

        {/* <div className="product-edit">
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
        </div>*/}
      </div>
    </>
  );
}
