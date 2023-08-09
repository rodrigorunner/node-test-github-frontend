import { Link } from "react-router-dom";

const Footer = () => {
    return (
      <footer className="bg-dark text-center mt-5 p-5 p-2">
        <div className="mx-auto">
          <Link className="btn btn-danger" to='/'>
            <i className="fa-solid fa-house"></i>
          </Link>
        </div>
      </footer>
    );
  }
  
  export default Footer
  