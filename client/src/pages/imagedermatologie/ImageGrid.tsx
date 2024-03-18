import { Box, Button, Grid, styled, MenuItem, Menu } from "@mui/material";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import ImageCard from "./ImageCard";
import useTitle from "hooks/useTitle";
import { FC, useState } from "react";
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

  // State for managing dropdown menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDisease, setSelectedDisease] = useState<string>("Filter");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDiseaseSelect = (disease: string) => {
    setSelectedDisease(disease);
    setAnchorEl(null);
  };

  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Search image...!" />
        
        <Button variant="outlined" onClick={handleClick}>
          {selectedDisease}
        </Button>
        <Menu
          id="disease-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleDiseaseSelect("Filter")}>All</MenuItem>
          {["Acné", "Eczéma", "Psoriasis", "Urticaire", "Kératose pilaire", "Rosacée", "Dermatite de contact", "Vitiligo", "Herpès", "Cancer de la peau"].map((disease) => (
            <MenuItem key={disease} onClick={() => handleDiseaseSelect(disease)}>{disease}</MenuItem>
          ))}
        </Menu>
        <Button variant="contained" onClick={handleAddImage}>
          Add New Image
        </Button>
      </StyledFlexBox>

      <Grid container spacing={3}>
        {ImageList.filter((image) => selectedDisease === "Filter" || image.type === selectedDisease).map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <ImageCard image={image} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImageGrid;