import { Link } from "react-router-dom";
    
const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">Bug Bounty</div>
      <div className="space-x-6">
        <Link to="/" className="hover:text-gray-400">Home</Link>
        <Link to="/payments" className="hover:text-gray-400">Payments</Link>
        <Link to="/reports" className="hover:text-gray-400">Reports</Link>
        <Link to="/login" className="hover:text-gray-400">Login/Signup</Link>
      </div>
    </nav>
  );
};
export default Navbar;
