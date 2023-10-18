"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [error, setError] = useState("");

  const verifyUserEmail = async () => {
    try {
      const res = await axios.post("/api/user/verifymail", {
        token: token,
      });
      console.log(res.data);
      if (res.data.success) {
        setVerifyEmail(true);
      } else {
        setError(res.data.message);
      }
    } catch (error: any) {
      setError(error);
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      verifyUserEmail();
    }
  }, [token]);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <h1>Verify email</h1>
      <h2>{token ? `Token:${token}` : "NO TOKEN"}</h2>
    </div>
  );
};

export default VerifyEmail;
