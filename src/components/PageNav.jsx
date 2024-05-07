import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../components/PageNav.module.css";
import Logo from "./Logo";

export default function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to={"/pricing"}>PRICING</NavLink>
        </li>
        <li>
          <NavLink to={"/product"}>PRODUCT</NavLink>
        </li>
        <li>
          <NavLink className={styles.ctaLink} to={"/login"}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

// navLink is more powerFull than Link because when i chose any nav link a class active will be added to it
