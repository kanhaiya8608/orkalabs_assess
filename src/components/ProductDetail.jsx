import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Alert, Box, Divider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { fetchProductById } from '../api'; // Adjust the import path as needed

const ProductDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await fetchProductById(id);
        setData(productData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getProduct();
  }, [id]);

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

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {Array.from({ length: totalStars }, (_, index) => {
          if (index < filledStars) {
            return <StarIcon key={index} sx={{ color: 'gold' }} />;
          } else if (index === filledStars && halfStar) {
            return <StarIcon key={index} sx={{ color: 'gold', opacity: 0.5 }} />;
          } else {
            return <StarBorderIcon key={index} sx={{ color: 'gold' }} />;
          }
        })}
      </Box>
    );
  };

  // Function to get initials from the reviewer's name
  const getInitials = (name) => {
    const names = name.split(' ');
    return names.length > 1 
      ? names[0][0] + names[1][0] 
      : names[0][0] + names[0][1];
  };

  return (
    <Container sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Box
            sx={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
          >
            <Box
              component="img"
              src={data.thumbnail}
              alt={data.title}
              sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: 'h5.fontSize', sm: 'h4.fontSize' } }}>
              {data.title}
            </Typography>
            <Typography variant="h6" color="textSecondary" paragraph sx={{ fontSize: { xs: 'body2.fontSize', sm: 'h6.fontSize' } }}>
              {data.description}
            </Typography>
            <Typography variant="body1" color="textPrimary" sx={{ fontSize: { xs: 'body2.fontSize', sm: 'body1.fontSize' } }}>
              <strong>Price:</strong> ${data.price}
            </Typography>
            <Typography variant="body1" color="textPrimary" sx={{ fontSize: { xs: 'body2.fontSize', sm: 'body1.fontSize' } }}>
              <strong>Stock:</strong> {data.stock}
            </Typography>
            <Typography variant="body1" color="textPrimary" sx={{ fontSize: { xs: 'body2.fontSize', sm: 'body1.fontSize' } }}>
              <strong>Category:</strong> {data.category}
            </Typography>
            <Typography variant="body1" color="textPrimary" sx={{ fontSize: { xs: 'body2.fontSize', sm: 'body1.fontSize' } }}>
              <strong>Brand:</strong> {data.brand}
            </Typography>
            <Typography variant="body1" color="textPrimary" sx={{ fontSize: { xs: 'body2.fontSize', sm: 'body1.fontSize' } }}>
              <strong>Rating:</strong> {renderStars(data.rating)}
            </Typography>
            <Typography variant="body1" color="textPrimary" sx={{ fontSize: { xs: 'body2.fontSize', sm: 'body1.fontSize' } }}>
              <strong>Discount:</strong> {data.discountPercentage}%
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box>
          <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: 'body1.fontSize', sm: 'h6.fontSize' } }}>
            Reviews:
          </Typography>
          {data.reviews.length > 0 ? (
            <Box>
              {data.reviews.map((review, index) => (
                <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{ 
                    width: 50, 
                    height: 50, 
                    borderRadius: '50%', 
                    backgroundColor: '#ccc', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: { xs: 'body2.fontSize', sm: 'body1.fontSize' } // Adjust font size for initials
                  }}>
                    {getInitials(review.reviewerName)}
                  </Box>
                  <Box>
                    <Typography variant="body1" sx={{ fontSize: { xs: 'body2.fontSize', sm: 'body1.fontSize' } }}>
                      <strong>{review.reviewerName}</strong>: {review.comment}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: 'body2.fontSize', sm: 'body1.fontSize' } }}>
                      {renderStars(review.rating)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: 'body2.fontSize', sm: 'body1.fontSize' } }}>
                      Date: {new Date(review.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: 'body2.fontSize', sm: 'body1.fontSize' } }}>
              No reviews available.
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetail;
