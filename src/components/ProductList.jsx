import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography, CircularProgress, Alert, Container } from '@mui/material';
import { fetchProducts } from '../api'; 

const ProductList = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setData(productsData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="20vh" 
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  return (
    <Container maxWidth="xl" sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'space-between'
        }}
      >
        {data.products.map(product => (
          <Box
            key={product.id}
            sx={{
              flex: '1 1 calc(33.333% - 24px)',
              maxWidth: 'calc(33.333% - 24px)',
              mb: 3,
              backgroundColor: 'white'
            }}
          >
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'white' }}>
              <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardMedia
                  component="img"
                  image={product.thumbnail}
                  alt={product.title}
                  sx={{ height: 200, objectFit: 'contain', backgroundColor: 'white' }}
                />
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                    flex: 1 // Ensure the content area grows to fill the space
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        {product.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {product.description}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="textPrimary" sx={{ mt: 2 }}>
                      <Typography variant="span" fontWeight={600}>Price:</Typography>  ${product.price}
                    </Typography>
                  </Box>
                </CardContent>
              </Link>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ProductList;
