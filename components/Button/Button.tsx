import React from "react";
import styles from "./Button.module.scss";

interface IButton extends React.PropsWithChildren, React.ComponentPropsWithoutRef<"button"> {
  onClick?: () => void;
}

const Button = ({ children, onClick, className, ...props }: IButton) => {
  return (
    <button onClick={onClick} className={`${styles.buttonContainer} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
