import { Box } from "@mui/material";

interface SimpleCardProps {
  children: React.ReactNode;
  padding?: "sm" | "md" | "lg";
}

const SimpleCard = ({
  children,
  padding = "md",
  ...props
}: SimpleCardProps): JSX.Element => {
  const paddingMap = {
    sm: "0.3rem 0.5rem",
    md: "0.5rem 0.7rem",
    lg: "0.7rem 1rem",
  };
  return (
    <Box
      sx={{
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
        background: "white",
        padding: padding ? paddingMap[padding] : undefined,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default SimpleCard;
