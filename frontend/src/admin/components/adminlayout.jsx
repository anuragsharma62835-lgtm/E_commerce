import Admininavbar from "./AdminNavbar";

const AdminLayout = ({ children }) => {
  return (
    <>
      <Admininavbar />
      <div className="p-4">{children}</div>
    </>
  );
};

export default AdminLayout;