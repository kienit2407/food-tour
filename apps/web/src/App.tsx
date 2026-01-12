import HomePage from "@/pages/Home";
import PlaceDetailPage from "@/pages/PlaceDetail";
import { Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/places/:id" element={<PlaceDetailPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
