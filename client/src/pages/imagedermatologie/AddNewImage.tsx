import { PhotoCamera } from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  MenuItem,
  styled,
  Select,
} from "@mui/material";
import LightTextField from "components/LightTextField";
import { Small } from "components/Typography";
import { useFormik } from "formik";
import useTitle from "hooks/useTitle";
import { useNavigate } from "react-router-dom";
import { FC, useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";


const ButtonWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: 100,
  height: 100,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.secondary[200]
      : alpha(theme.palette.primary[100], 0.1),
}));

const UploadButton = styled(Box)(({ theme }) => ({
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  border: "2px solid",
  alignItems: "center",
  justifyContent: "center",
  borderColor: theme.palette.background.paper,
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.secondary[400]
      : alpha(theme.palette.background.paper, 0.9),
}));

const TextBelowIcon = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: -25,
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: alpha(theme.palette.common.black, 0.8),
  color: theme.palette.common.white,
  padding: "2px 8px",
  borderRadius: 4,
  zIndex: 1,
}));

const AddNewImage: FC = () => {
  useTitle("Add New Image");
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    description: "",
    type: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is Required!"),
    description: Yup.string().required("Description is Required!"),
    type: Yup.string().required("Type is Required!"),
  });

  const [image, setImage] = useState<File | null>(null);
  const [uploaded, setUploaded] = useState<boolean>(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setUploaded(true);
    }
  };

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
  initialValues,
  validationSchema,
  onSubmit: async (values) => {
    console.log("Form Values:", values); // Log form values
    toast.success("The image uploaded successfully",{duration:4000});
    navigate("/dashboard/image-grid");
  },
});


  return (
    <Box pt={2} pb={4}>
      <Card sx={{ padding: 4 }}>
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <Card
              sx={{
                padding: 3,
                boxShadow: 2,
                minHeight: 400,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ButtonWrapper>
                <UploadButton>
                  <label htmlFor="upload-btn">
                    <input
                      accept="image/*"
                      id="upload-btn"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                    <IconButton component="span">
                      <PhotoCamera sx={{ fontSize: 26, color: "white" }} />
                    </IconButton>
                  </label>
                </UploadButton>
                {!uploaded && (
                  <TextBelowIcon>Uploading Image...</TextBelowIcon>
                )}
              </ButtonWrapper>

              {uploaded && (
                <Box mt={2}>
                  <Small
                    marginTop={2}
                    maxWidth={200}
                    lineHeight={1.9}
                    display="block"
                    textAlign="center"
                    color="text.disabled"
                  >
                    Image Uploaded
                  </Small>
                  {image && (
                    <Box mt={1}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Uploaded"
                        style={{ maxWidth: 200, maxHeight: 200 }}
                      />
                    </Box>
                  )}
                </Box>
              )}
            </Card>
          </Grid>
          <Grid item md={8} xs={12}>
            <Card sx={{ padding: 3, boxShadow: 2 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <LightTextField
                      fullWidth
                      name="title"
                      placeholder="Image Title"
                      value={values.title}
                      onChange={handleChange}
                      error={Boolean(touched.title && errors.title)}
                      helperText={touched.title && errors.title}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <LightTextField
                      multiline
                      fullWidth
                      rows={6}
                      name="description"
                      placeholder="Description"
                      value={values.description}
                      onChange={handleChange}
                      error={Boolean(
                        touched.description && errors.description
                      )}
                      helperText={touched.description && errors.description}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Select
                      fullWidth
                      name="type"
                      value={values.type}
                      onChange={handleChange}
                      displayEmpty
                      error={Boolean(touched.type && errors.type)}
                      inputProps={{ "aria-label": "type" }}
                    >
                      <MenuItem value="" disabled>
                        Select Type
                      </MenuItem>
                      {[
                        "Eczema",
                        "Psoriasis",
                        "Acne",
                        "Skin Cancer",
                        "Dermatitis",
                        "Rosacea",
                        "Vitiligo",
                        "Hives",
                        "Benign Growths",
                        "Precancerous Lesions",
                        "Autoimmune Disorders",
                        "Fungal Infections",
                        "Bacterial Infections",
                        "Viral Infections",
                        "Skin Rashes",
                        "Common Skin Conditions",
                        "Chronic Skin Conditions",
                        "Benign Tumors",
                        "Hair Disorders",
                      ].map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained">
                      Add Image
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default AddNewImage;
