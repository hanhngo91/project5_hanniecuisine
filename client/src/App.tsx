import { useEffect } from "react";
import "./index.css";
import { useLocation, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Dining from "./pages/Dining";
import Reservations from "./pages/Reservations";
import Sustainability from "./pages/Sustainability";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Eat from "./pages/Eat";
import Drink from "./pages/Drink";
import ReservationSlide from "./components/ReservationSlide";
import AdminPage from "./pages/AdminPage";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  const currentLocation = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentLocation.pathname]);

  const Layout: React.FC = () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dining" element={<Dining />} />
        <Route path="/eat" element={<Eat />} />
        <Route path="/drink" element={<Drink />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reserve" element={<ReservationSlide />} />
      </Route>
      <Route path="/admin" element={<AdminLogin />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/home" element={<AdminPage />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
