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
  AuthPage,
} from "@pages";
import { routesTree } from "@routes";
import { AuthGuard } from "@components";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path={routesTree.auth} element={<AuthPage />} />
        <Route element={<AuthGuard />}>
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
          <Route path="*" element={<Navigate to={routesTree.home} replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
