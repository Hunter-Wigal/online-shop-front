import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { checkAdmin } from "../services/authentication.service";

export default function Admin() {
  const [admin, setAdmin] = useState(false);

  // Do checks for current user being admin

  useEffect(()=>{
    checkAdmin().then((isAdmin)=>{
      setAdmin(isAdmin);
    })
  }, [])

  if (admin)
  return (
    <>
      <Outlet/>
    </>
  );

  else
  return <h1>You are not authorized to view this page</h1>
}
