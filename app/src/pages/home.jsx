import { routesTree } from "@routes";
import { Navigate } from "react-router-dom";

const HomePage = (props) => {
  return <Navigate to={routesTree.classes} />;
};

export default HomePage;
