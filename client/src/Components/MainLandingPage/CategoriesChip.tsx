import React from "react";
import { Box, SvgIcon, SvgIconProps, Typography } from "@mui/material";

interface CategoriesBoxProps {
  label: string;
  onClick?: () => void;
  IconComponent: (props: SvgIconProps) => JSX.Element;
}

const CategoriesBox: React.FC<CategoriesBoxProps> = ({
  label,
  onClick,
  IconComponent,
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: "100%",
        height: "55px",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        border: "1px solid #eeedf2",
        overflow: "hidden",
        backgroundColor: "#f8f7fa",

        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "70px",
          height: "100%",
          backgroundColor: "#fdf7f5",
        }}
      >
        <IconComponent sx={{ color: "rgb(209, 65, 12)" }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          width: "70%",
          height: "100%",
          paddingLeft: "1rem",
        }}
      >
        <Typography>{label}</Typography>
      </Box>
    </Box>
  );
};

export default CategoriesBox;
