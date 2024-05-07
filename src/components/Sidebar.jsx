import React from "react";
import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav /> 

     {/* the children prop will replace this Outlet */}
     <Outlet/>



      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; copyright {new Date().getFullYear()} by world wise
        </p>
     
      </footer>
    </div>
  );
}
