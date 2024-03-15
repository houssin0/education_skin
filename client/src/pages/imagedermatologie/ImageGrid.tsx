import { Box, Button, Grid, styled } from "@mui/material";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import ImageCard from "./ImageCard";
import useTitle from "hooks/useTitle";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ImageList } from "./ImageList";

// styled component
const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: 20,
  [theme.breakpoints.down(500)]: {
    width: "100%",
    "& .MuiInputBase-root": { maxWidth: "100%" },
    "& .MuiButton-root": {
      width: "100%",
      marginTop: 15,
    },
  },
}));

const ImageGrid: FC = () => {
  // change navbar title
  useTitle("Image Grid");

  const navigate = useNavigate();
  const handleAddImage = () => navigate("/dashboard/add-image");

  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Search image..." />
        <Button variant="contained" onClick={handleAddImage}>
          Add New Image
        </Button>
      </StyledFlexBox>

      <Grid container spacing={3}>
        {ImageList.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <ImageCard image={image} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImageGrid;
