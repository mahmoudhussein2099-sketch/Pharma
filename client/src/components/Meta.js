import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title || "Awon Alqhtany Pharmacy"}</title>
      <meta name="description" content={description || "Saudi Arabia pharmacy delivery and AI services"} />
      <meta name="keywords" content={keywords || "pharmacy, medicine, AI, delivery, Saudi Arabia"} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
  );
};

export default Meta;
