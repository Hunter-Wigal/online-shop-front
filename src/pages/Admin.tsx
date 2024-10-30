import { Outlet } from "react-router-dom";

export default function Admin() {
  // Do checks for current user being admin

  return (
    <>
      <Outlet/>
    </>
  );
}
