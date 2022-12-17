import RootLayout from "./components/layouts/root-layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddStudentPage, EditStudentPage, HomePage } from "@pages";
import { routesTree } from "@routes";

function App() {
  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route path={routesTree.home} element={<HomePage />} />
          <Route path={routesTree.student.add} element={<AddStudentPage />} />
          <Route path={routesTree.student.edit} element={<EditStudentPage />} />
        </Routes>
      </RootLayout>
    </Router>
  );
}

export default App;
