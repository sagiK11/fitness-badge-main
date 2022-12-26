import { Box } from "@mui/material";

interface CardProps {
  children: React.ReactNode;
  center?: boolean;
}
const AuthCard = ({ children, center }: CardProps) => {
  return (
    <Box
      sx={(theme) => ({
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
        background: "white",
        minWidth: "calc(50% - 5rem)",
        minHeight: "80vh",
        ...(center
          ? { display: "flex", alignItems: "center", justifyContent: "center" }
          : {}),
        [theme.breakpoints.down("lg")]: {
          minWidth: "100vw",
          minHeight: "100vh",
        },
      })}
    >
      {children}
    </Box>
  );
};

export default AuthCard;
