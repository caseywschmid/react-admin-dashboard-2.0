// This is a styled component
// This is a way for me to use CSS styles in a component-like manner

const { styled } = require("@mui/system");
const { Box } = require("@mui/material");

const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
