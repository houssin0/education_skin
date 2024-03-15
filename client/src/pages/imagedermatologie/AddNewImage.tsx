import { Box, Button, Grid, styled, Menu, MenuItem } from "@mui/material";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import ImageCard from "./ImageCard";
import useTitle from "hooks/useTitle";
import { FC, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDisease, setSelectedDisease] = useState<string>("All");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (category && category !== "All") {
      setSelectedDisease(category);
    }
  }, [location.search]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDiseaseSelect = (disease: string) => {
    setSelectedDisease(disease);
    setAnchorEl(null);
    navigate(`/dashboard/image-grid?category=${disease}`);
  };

  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Search image..." />
        <Button variant="contained" onClick={() => navigate("/dashboard/add-image")}>
          Add New Image
        </Button>
        <Button variant="outlined" onClick={handleClick}>
          {selectedDisease}
        </Button>
        <Menu
          id="disease-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={() => handleDiseaseSelect("All")}>All</MenuItem>
          {/* Replace 'disease' with the actual list of diseases */}
          {/* For demonstration, I'm assuming the diseases are stored in an array */}
          {["Acné", "Eczéma", "Psoriasis", "Urticaire", "Kératose pilaire", "Rosacée", "Dermatite de contact", "Vitiligo", "Herpès", "Cancer de la peau"].map((disease) => (
            <MenuItem key={disease} onClick={() => handleDiseaseSelect(disease)}>{disease}</MenuItem>
          ))}
        </Menu>
      </StyledFlexBox>

      <Grid container spacing={3}>
        {ImageList.filter((image) => selectedDisease === "All" || image.type === selectedDisease).map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <ImageCard image={image} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImageGrid;
