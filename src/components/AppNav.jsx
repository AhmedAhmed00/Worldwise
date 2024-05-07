import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../components/AppNav.module.css";

export default function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to={"cities"}>CITIES</NavLink>
        </li>
        <li>
          <NavLink to={"countries"}>COUNTRIES</NavLink>
        </li>
      </ul>
    </nav>
  );
}

// navLink is more powerFull than Link because when i chose any nav link a class active will be added to it
