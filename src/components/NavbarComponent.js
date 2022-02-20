import { withRouter} from "react-router-dom";
import { getUser, logout } from "../services/authorize";

const NavbarComponent = (props) => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <a href="/" className="navbar-brand ps-3 mb-0 h1">
        FLOKZ BLOG
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#toggleMobileMenu"
        aria-controls="toggleMobileMenu"
        aria-expanded="false"
        aria-label="toggle navigation"
      >
        <span className="fas fa-bars"></span>
      </button>
      <div className="collapse navbar-collapse" id="toggleMobileMenu">
        <ul className="navbar-nav text-center me-auto">
          <li>
            <a href="/" className="nav-link text-primary">
              หน้าแรก
            </a>
          </li>
          {getUser() && (
            <li>
              <a href="/create" className="nav-link text-primary">
                เขียนบทความ
              </a>
            </li>
          )}
        </ul>
        {!getUser() && (
          <div className="d-flex align-items-center justify-content-center">
            <a href="/login" className="btn btn-primary px-3 me-2">
              Login
            </a>
          </div>
        )}
        {getUser() && (
          <div className="d-flex align-items-center justify-content-center">
            <button
              className="btn btn-danger px-3 me-2"
              onClick={() =>
                logout(() => {
                  props.history.push("/");
                })
              }
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default withRouter(NavbarComponent);
