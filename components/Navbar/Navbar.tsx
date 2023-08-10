import React from "react";
import styles from "./Navbar.module.scss";
import Image from "next/image";
import Button from "../Button/Button";
import GeneralResponsive from "../Responsive/GeneralResponsive";

interface INavbar {
  onlyChat: boolean;
  handleOnlyChat: () => void;
}

const Navbar = ({ handleOnlyChat, onlyChat = false }: INavbar) => {
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.leftCol}>
        <Button onClick={handleOnlyChat} className={onlyChat ? styles.onlyChat : ""}>
          {!onlyChat ? (
            <Image alt="sidebar" src={"/icons/sidebar.svg"} width={25} height={25} />
          ) : (
            <Image alt="sidebar" src={"/icons/sidebar-orange.svg"} width={25} height={25} />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
