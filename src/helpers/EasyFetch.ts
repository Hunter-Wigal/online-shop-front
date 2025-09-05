// Function meant to eliminate the long fetch calls. May be changed to axios later
export default async function easyFetch(
  url_endpoint: string,
  auth: boolean,
  method: string,
  body?: any
): Promise<Response> {
  let jwt = localStorage.getItem("jwt");
  if (!jwt) jwt = "";

  let headers: RequestInit["headers"] = !auth
    ? {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }
    : {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
        "Access-Control-Allow-Origin": "*",
      };

  let csrfToken = getCookie("XSRF-TOKEN");

  // if (csrfToken == "") {
  //    let response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/csrf`, {headers: headers});

  //   csrfToken = (await response.json())['token'];
  //   // document.cookie = "XSRF-TOKEN=" + csrfToken + ";";
  // }

  headers["X-XSRF-TOKEN"] = csrfToken;

  return fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/${url_endpoint}`, {
    method: `${method}`,
    headers: headers,
    body: body,
    credentials: "include",
  });
}

function getCookie(name: string): string {
  let cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    let cookieVal = cookie.split("=");
    if (cookieVal[0] == name) {
      return cookieVal[1];
    }
  }

  return "";
}
