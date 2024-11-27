import { useEffect, useState } from "react";
import "../styles/admin.scss";
import { Box, Button, Modal, Tab, Tabs } from "@mui/material";
import OrderDisplay, { Transaction } from "../components/OrderDisplay";
import { getTransactions } from "../services/admin.service";
import ProductCard, { ProductType } from "../components/ProductCard";
import { getProducts, removeProduct } from "../services/products.service";
import { useNavigate } from "react-router-dom";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function callRemove(deleting: number, handleClose: Function) {
  // Change to another modal or something
  removeProduct(deleting).then((response) => {
    window.alert(response);
    handleClose();
  });
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

export default function AdminTabs() {
  const [value, setValue] = useState(0);
  const [transactions, setTransactions] = useState(new Array<Transaction>());
  const [products, setProducts] = useState(new Array<ProductType>());
  const navigate = useNavigate();

  // Modal controls
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [deleting, setDeleting] = useState(-1);

  const [accountInfo, setAccountInfo] = useState({"name": "", "email": "", "age": -1});

  // let accountInfo: {name: string, email: string, age: number} = new Object();


  useEffect(() => {
    getTransactions().then((array) => {
      if (array) setTransactions(array);
    });

    getProducts().then((array) => {
      if (array) {
        setProducts(array);
      }
    });

    let userDetails = sessionStorage['user'] ? JSON.parse(sessionStorage['user']) : undefined;
    if(userDetails){
      setAccountInfo(userDetails);
    }
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
          <OrderDisplay transactions={transactions} navigate={navigate}/>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <div className="center mb-2">
            <Button
              variant="contained"
              onClick={() => {
                return navigate("/admin/new-product");
              }}
            >
              Add new product
            </Button>
          </div>
          <div className="row w-100 card-container">
            {products.map((product) => {
              return (
                <div
                  className="col w-25 card-flex"
                  key={product.product_id + 100}
                >
                  <ProductCard
                    product={product}
                    navigate={navigate}
                    edit={true}
                    handleOpen={handleOpen}
                    setDeleting={setDeleting}
                  />
                </div>
              );
            })}
          </div>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <h2>Account info:</h2>
          <p>Account Holder Name: {accountInfo.name}</p>
          <p>Account Holder Email: {accountInfo.email}</p>
        </CustomTabPanel>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3 style={{ marginBottom: "20%" }}>
            Are you sure you want to delete this product?
          </h3>
          <Button
            className="close-button"
            variant="outlined"
            onClick={handleClose}
          >
            &#10006;
          </Button>
          <Button
            variant="contained"
            color="warning"
            sx={{ marginRight: "50%" }}
            onClick={() => {
              callRemove(deleting, handleClose);
            }}
          >
            Delete
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
}
