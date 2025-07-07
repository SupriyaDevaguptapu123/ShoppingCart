import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import {
  Grid, Card, CardContent, CardMedia,
  Typography, Button, CircularProgress, Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      shortDescription
      imageUrl
      price
      rating
    }
  }
`;

const ADD_TO_CART = gql`
  mutation AddToCart($productId: ID!, $quantity: Int!) {
    addToCart(productId: $productId, quantity: $quantity) {
      id
      quantity
    }
  }
`;

const ProductsList = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [addToCart, { loading: adding }] = useMutation(ADD_TO_CART, {
    refetchQueries: ["GetCartCount"],
  });
  const navigate = useNavigate();

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        {data.products.map((product) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            key={product.id}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              sx={{
                width: "100%",
                maxWidth: 540,
                minHeight: 260,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  aspectRatio: "21/9",
                  background: "#fafafa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}
                  image={product.imageUrl}
                  alt={product.name}
                />
              </Box>
              <CardContent
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5">{product.name}</Typography>
                <Typography color="text.secondary" gutterBottom>
                  {product.shortDescription}
                </Typography>
                {product.rating && (
                  <Box sx={{ color: "#FFA726", mb: 1 }}>
                    {"★".repeat(Math.floor(product.rating))}
                    {product.rating % 1 ? "☆" : ""}
                    {"☆".repeat(5 - Math.ceil(product.rating))}
                  </Box>
                )}
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    Show Details
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={async () => {
                      await addToCart({
                        variables: { productId: product.id, quantity: 1 },
                      });
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductsList;