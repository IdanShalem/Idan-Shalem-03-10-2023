import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Login from "../Login/Login";
import Home from "../Layout/Home";

const AppRoutes = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
