import { NavLink } from 'react-router';

function NavBar() {
  return (
    <nav>
      <NavLink to="/">My Contacts</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/addContact">Add New Contact</NavLink>
    </nav>
  );
}

export default NavBar;
