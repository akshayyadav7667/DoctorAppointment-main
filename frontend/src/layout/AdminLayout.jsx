import { Outlet } from "react-router-dom";
import NavbarAdmin from "../pages/admin/NavbarAdmin";
import FooterAdmin from "../pages/admin/FooterAdmin";

export default function AdminLayout() {
  return (
    <div>
      <NavbarAdmin />

      <main className="bg-gray-50 overflow-auto">
        <Outlet />
      </main>

      <FooterAdmin />
    </div>
  );
}
