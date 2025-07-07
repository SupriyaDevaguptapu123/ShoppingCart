import React from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useQuery, gql } from "@apollo/client";

const GET_CART_COUNT = gql`
  query GetCartCount {
    cart {
      count
    }
  }
`;

const Header = ({name}) => {
  const { data } = useQuery(GET_CART_COUNT, { pollInterval: 1000 });

  const count = data?.cart?.count || 0;

  return (
    <header style={{ display: "flex", alignItems: "center", padding: 16, background: "#1976d2", color: "#fff" , position: "sticky",}}>
      <h2 style={{ flex: 1, margin: 0 }}>{name}</h2>
      <Link to="/cart" style={{ color: "#fff", textDecoration: "none" }}>
        <Badge badgeContent={count} color="error">
          <ShoppingCartIcon fontSize="large" />
        </Badge>
      </Link>
    </header>
  );
};

export default Header;