import React, { useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import {
  Card, CardContent, CardMedia, Typography, IconButton, Button, CircularProgress, Grid
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const GET_CART = gql`
  query GetCart {
    cart {
      items {
        id
        quantity
        product {
          id
          name
          shortDescription
          imageUrl
          price
        }
      }
      count
      total
    }
  }
`;
const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($itemId: ID!) {
    removeFromCart(itemId: $itemId)
  }
`;
const CLEAR_CART = gql`
  mutation ClearCart {
    clearCart
  }
`;
const Cart = ({setName}) => {
  const { loading, error, data, refetch } = useQuery(GET_CART);
  const [removeFromCart] = useMutation(REMOVE_FROM_CART);
const [clearCart] = useMutation(CLEAR_CART);

useEffect(() => {
 setName("Cart");
}, [])

  const handleRemove = async (id) => {
  await removeFromCart({ variables: { itemId: id } });
  refetch();
};

const handleClearCart = async () => {
    await clearCart();
    refetch();
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  const items = data.cart.items;
  const total = data.cart.total;

  return (
    <div style={{ padding: 20 }}>
      <div style={{ textAlign: "right", marginBottom: 16 }}>
       <div style={{ textAlign: "right", marginBottom: 16 }}>
        <Button color="secondary" onClick={handleClearCart}>
          Clear the cart
        </Button>
      </div>
      </div>
      <Grid container direction="column" spacing={3}>
        {items.map(({ id, quantity, product }) => (
          <Grid icontainer
        direction="column"
        spacing={3}
        alignItems="center">
            <Card sx={{ display: "flex", alignItems: "center", padding: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 120, height: 120, objectFit: "contain", marginRight: 2 }}
                image={product.imageUrl}
                alt={product.name}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {product.shortDescription}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  Quantity: {quantity}
                </Typography>
              </CardContent>
              <IconButton
                aria-label="remove"
                 onClick={() => handleRemove(id)} 
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" align="center" sx={{ marginTop: 4 }}>
        Total: ${total.toFixed(2)}
      </Typography>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
        <Button variant="contained" color="primary" size="large">
          PURCHASE
        </Button>
      </div>
    </div>
  );
};

export default Cart;