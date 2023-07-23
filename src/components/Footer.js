import React from "react";
import Typography from "@mui/material/Typography";

const Footer = (color) => {
    console.log("first",color.color)
  return (
    <div style={{ backgroundColor: color.color, padding: "10px", textAlign: "center", position: "fixed", bottom: 0, width: "100%" }}>
      <Typography variant="body2" color="textSecondary">
        Your Footer content goes here.
      </Typography>
    </div>
  );
};

export default Footer;
