import { Link } from "react-router-dom";

const Header = () => {
    return (
      <nav className="bg-dark text-center p-2">
        <Link className="display-4 text-decoration-none text-white">
          PetShop
        </Link>
        <div className="mt-2">
          <Link className="btn btn-danger" to='/'><i className="fa-solid fa-house"></i></Link>
        </div>
      </nav>
    );
  }
  
  export default Header
  