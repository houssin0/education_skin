import { Box, Button, Typography, Grid, Hidden } from "@mui/material";
import React, { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';

const ImageDetails: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { image } = location.state as { image: any };

  const handleReturnClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <Box p={3}>
      <Button variant="contained" onClick={handleReturnClick} sx={{ mb: 3 }}>
        Return
      </Button>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
        <div style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
      <InnerImageZoom src={image.img}  zoomScale={2} />
    </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom >
            {image.title}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Description:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {image.description}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Publisher:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {image.publisher}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Date:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {image.date}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImageDetails;
