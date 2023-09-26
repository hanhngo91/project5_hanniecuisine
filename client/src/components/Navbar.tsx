import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div
      id="navbar"
      className="flex justify-center fixed top-0 w-full pt-[1.5rem]transition-all duration-900 ease-out"
    >
      <Link to="/">
        <img
          className="h-[5.5rem] cursor-pointer pt-[1rem]"
          src="/logos/logo.png"
          alt="logo"
        />
      </Link>
      <ul className="flex justify-around text-white w-1/2 text-xl font-medium items-center font-gelasio mt-[2rem]">
        <Link to="/about">
          <li className="hover:underline underline-offset-8 decoration-1 cursor-pointer">
            About
          </li>
        </Link>
        <Link to="/dining">
          <li className="hover:underline underline-offset-8 decoration-1 cursor-pointer">
            Dining
          </li>
        </Link>
        <Link to="/reservations">
          <li className="hover:underline underline-offset-8 decoration-1 cursor-pointer">
            Reservations
          </li>
        </Link>
        <Link to="/sustainability">
          <li className="hover:underline underline-offset-8 decoration-1 cursor-pointer">
            Sustainability
          </li>
        </Link>
        <Link to="/contact">
          <li className="hover:underline underline-offset-8 decoration-1 cursor-pointer">
            Contact
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
