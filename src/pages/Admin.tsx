import { useEffect, useState } from "react";
import "../styles/admin.scss";
import { Box, Button, Tab, Tabs } from "@mui/material";
import OrderDisplay, { Transaction } from "../components/OrderDisplay";
import { getTransactions } from "../services/admin.service";
import ProductCard, { ProductType } from "../components/ProductCard";
import { getProducts } from "../services/products.service";
import { useNavigate } from "react-router-dom";

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
      {value === index && (
        <Box sx={{ p: 3 }} key={index}>
          {children}
        </Box>
      )}
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
  const [transactions, setTransactions] = useState(new Array<Transaction>());
  const [products, setProducts] = useState(new Array<ProductType>());
  const navigate = useNavigate();

  useEffect(() => {
    getTransactions().then((array) => {
      if (array) setTransactions(array);
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
        <h1 className="center">Admin page</h1>
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
          <OrderDisplay transactions={transactions} />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <div className="center mb-2"><Button variant="contained" onClick={() =>{return navigate("/new-product")}}>Add new product</Button></div>
          <div className="row w-100 card-container">
            {products.map((product) => {
              return (
                <div className="col w-25 card-flex" key={product.id + 100}>
                  <ProductCard
                    product={product}
                    navigate={navigate}
                    edit={true}
                  />
                </div>
              );
            })}
          </div>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <h2>Account info:</h2>
          <p></p>
        </CustomTabPanel>
      </div>
    </>
  );
}
