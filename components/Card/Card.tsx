import React, { PropsWithChildren } from "react";
import styles from "./Card.module.scss";

type CardProps = React.HTMLAttributes<HTMLDivElement> & PropsWithChildren;

const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div className={`${styles.container} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
