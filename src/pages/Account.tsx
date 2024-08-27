import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { UserDetails } from "../services/authentication.service";

export default function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState(<></>);

  // let user: UserDetails;
  useEffect(() => {
    if (!localStorage["user"]) {
      navigate("/auth");
    }
    else{
      let userDetails = JSON.parse(localStorage["user"]);

      setUser(<><p>Name: {userDetails.name}</p><p>Email: {userDetails.email}</p><p>Age: {userDetails.age}</p></>);
    }
  });

  
  return <><h1>Account page</h1>
  {user}
  </>;
}
