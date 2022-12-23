import RootLayout from "./components/layouts/root-layout";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  CreateStudentPage,
  UpdateStudentPage,
  ClassesPage,
  HomePage,
} from "@pages";
import { routesTree } from "@routes";

function App() {
  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route path={routesTree.home} element={<HomePage />} />
          <Route path={routesTree.classes} element={<ClassesPage />} />
          <Route
            path={routesTree.createStudent}
            element={<CreateStudentPage />}
          />
          <Route
            path={routesTree.updateStudent}
            element={<UpdateStudentPage />}
          />
          <Route path={routesTree.classes} element={<ClassesPage />} />
          <Route path="*" element={<Navigate to={routesTree.home} replace />} />
        </Routes>
      </RootLayout>
    </Router>
  );
}

export default App;
