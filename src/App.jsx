import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Turorials from "./pages/tutorials/Tutorials";
import Components from "./pages/components/Components";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/tutorials" />} />
          <Route path="tutorials" element={<Turorials />} />
          <Route path="components" element={<Components />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
