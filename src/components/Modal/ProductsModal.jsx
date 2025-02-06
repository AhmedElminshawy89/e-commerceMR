/* eslint-disable react/prop-types */
import { Box, Modal, Typography, styled, Button, Grid, Avatar } from "@mui/material";
import { useShowCategoryQuery } from "../../app/Api/Categories";

const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%", 
    width: "100%",  
    margin: 0,       
    padding: 0,   
  });

const StyledBox = styled(Box)({
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
});

const ProductImage = styled(Avatar)(() => ({
  width: "240px",
  height: "240px",
  marginBottom: "20px",
  objectFit: "cover",
  borderRadius: "8px",
  border: "1px solid #e0e0e0",
}));

const AdditionalImages = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  marginTop: "16px",
}));

const AdditionalImage = styled(Box)(() => ({
  width: "120px",
  height: "120px",
  borderRadius: "8px",
  border: "1px solid #e0e0e0",
  overflow: "hidden",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

// eslint-disable-next-line react/prop-types
const ProductsModal = ({ isModalVisible, handleCloseModal, showProduct }) => {
  const { data: categoryData } = useShowCategoryQuery();

  const categoryName =
    categoryData?.categories?.find((category) => category.id === showProduct?.category_id)
      ?.name_en || "Unknown Category";

  return (
    <StyledModal open={isModalVisible} onClose={handleCloseModal}>
      <StyledBox>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
          Product Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
            <ProductImage src={showProduct?.image} alt={showProduct?.name_en} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
              {showProduct?.name_en}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              {showProduct?.name_ar}
            </Typography>

            <Typography variant="body1" paragraph>
              <strong>Description (EN): </strong> {showProduct?.desc_en}
            </Typography>

            <Typography variant="body1" paragraph>
              <strong>Description (AR): </strong> {showProduct?.desc_ar}
            </Typography>

            <Typography variant="body1" paragraph>
              <strong>Price: </strong> ${showProduct?.main_price}
            </Typography>

            <Typography variant="body1" paragraph>
              <strong>Discount Price: </strong> ${showProduct?.price_discount}
            </Typography>

            <Typography variant="body1" paragraph>
              <strong>Stock: </strong> {showProduct?.stock} units
            </Typography>

            <Typography variant="body1" paragraph>
              <strong>Barcode: </strong> {showProduct?.barcode}
            </Typography>

            <Typography variant="body1" paragraph>
              <strong>Category: </strong> {categoryName}
            </Typography>

            <Typography variant="body1" paragraph>
            <strong>Sizes Available: </strong> 
{Array.isArray(showProduct?.sizes) ? showProduct.sizes.join(", ") : "No sizes available"}
            </Typography>
            <Typography variant="body1" paragraph>
  <strong>Colors Available: </strong>
  {showProduct?.colors?.map((color, index) => (
    <Box key={index} display="inline-block" mr={1} alignItems="center">
      <Box
        component="span"
        sx={{
          display: "inline-block",
          width: "20px",
          height: "20px",
          backgroundColor: color,
          borderRadius: "50%",
          marginRight: "0px",
          border:'1px solid #333'
        }}
      ></Box>
    </Box>
  ))}
</Typography>

          </Grid>
        </Grid>

        {showProduct?.OtherImage && showProduct?.OtherImage?.length > 0 && (
          <AdditionalImages>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
              Additional Images
            </Typography>
            {Array.isArray(showProduct?.OtherImage) ? (
  showProduct.OtherImage.map((image, index) => (
    <AdditionalImage key={index}>
      <img src={image} alt={`Other Image ${index}`} />
    </AdditionalImage>
  ))
) : (
  <p></p>
)}

          </AdditionalImages>
        )}

        <Box mt={2} textAlign="right">
          <Button variant="contained" color="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Box>
      </StyledBox>
    </StyledModal>
  );
};

export default ProductsModal;
