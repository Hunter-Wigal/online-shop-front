import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/account.scss";
import { checkAdmin, setCurrentUser } from "../services/authentication.service";
import Button from "@mui/material/Button";
import { addAddress, getAddress } from "../services/account.service";
import AddressCard from "../components/AddressCard";
import Box from "@mui/material/Box";

export default function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState(<></>);
  const [admin, setAdmin] = useState(false);

  // let user: UserDetails;
  useEffect(() => {
    if (!sessionStorage["user"]) {
      navigate("/auth");
    } else {
      let userDetails = JSON.parse(sessionStorage["user"]);
      if (userDetails.name == null) {
        checkAdmin().then((response) => {
          setAdmin(response);
        });

        setCurrentUser(userDetails.email)?.then(() => {
          let userDetails = JSON.parse(sessionStorage["user"]);

          setUser(
            <>
              <p>Name: {userDetails.name}</p>
              <p>Email: {userDetails.email}</p>
              <p>Age: {userDetails.age}</p>
              <p>Admin: {admin ? "Yes" : "No"}</p>
            </>
          );
        });
        return;
      }

      setUser(
        <>
          <p>Name: {userDetails.name}</p>
          <p>Email: {userDetails.email}</p>
          <p>Age: {userDetails.age}</p>
          <p>Admin: {admin ? "Yes" : "No"}</p>
          <h3>Temp Make Admin</h3>
        </>
      );
    }
  }, []);

  return (
    <div>
      <div className="account-display">
        <h1>Account page</h1>
        <div className="">{user}</div>
        <Button variant="contained" onClick={addAddress}>
          Add Address
        </Button>
        <Button variant="outlined" onClick={getAddress}>
          Get Address
        </Button>
        <div>
          <h1>Previous Orders:</h1>
        </div>
      </div>
      <Box component="fieldset" className="address-display">
        <legend>Address</legend>
        <AddressCard />
      </Box>
    </div>
  );
}
