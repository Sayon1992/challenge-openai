import React from "react";
import styles from "./Input.module.scss";
import Image from "next/image";

interface IInput extends React.ComponentPropsWithoutRef<"input"> {
  handleSend?: () => void;
}

const Input = ({ className, handleSend, ...props }: IInput) => {
  return (
    <div className={styles.inputContainer}>
      <input {...props} className={`${styles.input} ${className}`} />
      <div className={styles.sendContainer}>
        <Image
          className={styles.send}
          alt="send"
          src={"icons/send.svg"}
          width={25}
          height={25}
          onClick={handleSend}
        />
      </div>
    </div>
  );
};

export default Input;
