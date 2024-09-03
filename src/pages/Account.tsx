import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/account.scss";
// import { UserDetails } from "../services/authentication.service";

export default function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState(<></>);

  // let user: UserDetails;
  useEffect(() => {
    if (!sessionStorage["user"]) {
      navigate("/auth");
    } else {
      let userDetails = JSON.parse(sessionStorage["user"]);

      setUser(
        <>
          <p>Name: {userDetails.name}</p>
          <p>Email: {userDetails.email}</p>
          <p>Age: {userDetails.age}</p>
        </>
      );
    }
  }, []);

  return (
    <div className="account-display">
        <h1>Account page</h1>
        <div className="">{user}</div>
    </div>
  );
}
