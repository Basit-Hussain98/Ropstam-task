import Layout from "@/components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
  let token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  // console.log(
  //   typeof window !== "undefined" && localStorage.getItem("accessToken")
  // );
  const [layoutDisabled, setLayoutDisabled] = useState(
    Component.name == "Login" || Component.name == "Signup"
  );
  return (
    <>
      {layoutDisabled && <Component {...pageProps} />}
      {!layoutDisabled && (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
}
