import React from "react";
import styles from "./GeneralResponsive.module.scss";

interface IGeneralResponsive extends React.HTMLAttributes<HTMLDivElement> {
  responsiveType: "tablet" | "tabletToDesktop";
  children: React.ReactNode;
}

const classes = {
  tablet: styles.tabletResponsive,
  tabletToDesktop: styles.desktopResponsive,
};

const GeneralResponsive = ({
  responsiveType,
  children,
  className,
  ...props
}: IGeneralResponsive): JSX.Element => (
  <div className={`${classes[responsiveType]} ${className ?? ""}`} {...props}>
    {children}
  </div>
);

export default GeneralResponsive;
