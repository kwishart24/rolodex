import { NavLink } from 'react-router';
import styles from './Header.module.css';

function Header({ title }) {
  return (
    <header className={styles.header}>
      <h1>Rolodex</h1>

      <nav className={styles.navigation}>
        <NavLink
          to="/"
          className={({ isActive }) => {
            if (isActive === true) {
              return styles.active;
            } else {
              return styles.inactive;
            }
          }}
        >
          My Contacts
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => {
            if (isActive === true) {
              return styles.active;
            } else {
              return styles.inactive;
            }
          }}
        >
          About
        </NavLink>
        <NavLink
          to="/addcontact"
          className={({ isActive }) => {
            if (isActive === true) {
              return styles.active;
            } else {
              return styles.inactive;
            }
          }}
        >
          + New Contact
        </NavLink>
      </nav>
      <h1>{title}</h1>
    </header>
  );
}

export default Header;
