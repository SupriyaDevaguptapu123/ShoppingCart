import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import {
  Typography,
  Button,
  CircularProgress,
  Box,
  IconButton,
  InputBase,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      longDescription
      imageUrl
      price
    }
  }
`;

const ADD_TO_CART = gql`
  mutation AddToCart($productId: ID!, $quantity: Int!) {
    addToCart(productId: $productId, quantity: $quantity) {
      id
      product {
        id
        name
        imageUrl
        price
      }
      quantity
    }
  }
`;

const ProductDetails = ({ setName }) => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PRODUCT, { variables: { id } });
  const [addToCart] = useMutation(ADD_TO_CART);
  const [quantity, setQuantity] = useState(1);

  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (data && data.product) {
      setMainImage(data.product.imageUrl);
      setName(data.product.name);
    }
  }, [data, setName]);

  useEffect(() => {
    if (data && data.product) {
      setMainImage(data.product.imageUrl);
    }
  }, [data]);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.product) return null;

  const { name, longDescription, imageUrl, price } = data.product;
  const thumbnails = [imageUrl, imageUrl, imageUrl];

  const handleAddToCart = async () => {
    try {
      await addToCart({ variables: { productId: id, quantity: Number(quantity) } });
      alert("Item added to cart!");
    } catch (e) {
      alert("Failed to add item to cart.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 4,
        mt: 5,
        mb: 5,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4}}>
        {thumbnails.map((thumb, idx) => (
          <Box
            key={idx}
            sx={{
              width: 120,
              height: 120,
              background: "#fafafa",
              borderRadius: 2,
              overflow: "hidden",
              cursor: "pointer",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setMainImage(thumb)}
          >
            <img
              src={thumb}
              alt={name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <ZoomInIcon
              sx={{
                position: "absolute",
                bottom: 6,
                right: 6,
                fontSize: 18,
                color: "#888",
                background: "#fff",
                borderRadius: "50%",
                p: "2px",
              }}
            />
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          flex: "0 0 420px",
          background: "#fafafa",
          borderRadius: 2,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 340,
          position: "relative",
        }}
      >
        <img
          src={mainImage}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <ZoomInIcon
          sx={{
            position: "absolute",
            bottom: 14,
            right: 14,
            fontSize: 28,
            color: "#888",
            background: "#fff",
            borderRadius: "50%",
            p: "4px",
          }}
        />
      </Box>

      <Box sx={{ minWidth: 320, maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom>
          {name}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {longDescription}
        </Typography>
        <Box sx={{ color: "#FFA726", fontSize: 28, my: 1 }}>
          {"★".repeat(4)}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
          {price.toLocaleString("de-DE", { minimumFractionDigits: 2 })} EUR
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          all prices incl. 10% taxes
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
          <InputBase
            type="number"
            inputProps={{ min: 1 }}
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            sx={{
              width: 60,
              px: 1,
              py: 0.5,
              fontSize: 18,
              borderRadius: 1,
              border: "1px solid #ccc",
              textAlign: "center",
              background: "#fff",
            }}
          />
          <Button
            variant="contained"
            size="large"
            sx={{ minWidth: 180, fontWeight: "bold" }}
            startIcon={<ShoppingCartIcon />}
            onClick={handleAddToCart}
          >
            ADD TO CART
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetails;