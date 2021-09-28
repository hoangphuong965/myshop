import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchUser, logout } from "../../store/_actions/userActions";

const Header = (props) => {
  const { logout, isAuthenticated, cartItems, fetchUser, role, roleUser } =
    props;

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleLogout = async () => {
    await logout();
    window.location.replace("/");
  };

  const renderContent = () => {
    switch (isAuthenticated) {
      case undefined:
        return (
          <Nav className='mr-auto'>
            <Link to='/login' className='nav-link'>
              <i className='fa fa-sign-in'></i> Login
            </Link>
            <Link to='/register' className='nav-link'>
              <i className='fa fa-registered'></i> Register
            </Link>
          </Nav>
        );
      case false:
        return (
          <Nav className='mr-auto'>
            <Link to='/login' className='nav-link'>
              <i className='fa fa-sign-in'></i> Login
            </Link>
            <Link to='/register' className='nav-link'>
              <i className='fa fa-registered'></i> Register
            </Link>
          </Nav>
        );

      default:
        return (
          <Nav className='mr-auto'>
            {roleUser === "admin" && (
              <Link to='/admin/dashboard' className='nav-link'>
                <i className='fa fa-user'></i> dashboard
              </Link>
            )}
            {role === "admin" && (
              <Link to='/admin/dashboard' className='nav-link'>
                <i className='fa fa-user'></i> dashboard
              </Link>
            )}

            {role === "user" && (
              <Link to='/profile' className='nav-link'>
                <i className='fa fa-user'></i> profile
              </Link>
            )}
            {roleUser === "user" && (
              <Link to='/profile' className='nav-link'>
                <i className='fa fa-user'></i> profile
              </Link>
            )}

            <Link to='/' className='nav-link' onClick={handleLogout}>
              <i className='fa fa-sign-out'></i> logout
            </Link>
          </Nav>
        );
    }
  };

  return (
    <header>
      <Navbar
        style={{ position: "fixed", top: "0", width: "100%", zIndex: "999" }}
        bg='primary'
        expand='lg'
        variant='dark'
        collapseOnSelect>
        <Container>
          <Link to='/'>
            <Navbar.Brand>My Shop 🛒</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Link to='/' className='nav-link'>
                Home
              </Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className='justify-content-end'>
            <Nav className='mr-auto'>
              <Link
                to='/cart'
                className='nav-link'
                style={{ position: "relative" }}>
                <i className='fa fa-shopping-cart'></i>
                <span
                  className='badge bg-info rounded-pill'
                  style={{ position: "absolute", top: "0" }}>
                  {cartItems.length}
                </span>
              </Link>
            </Nav>
            {renderContent()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    role: state.auth.role,
    roleUser: state.auth.fetchUser.role,
    cartItems: state.cart.cartItems,
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps, { logout, fetchUser })(Header);
