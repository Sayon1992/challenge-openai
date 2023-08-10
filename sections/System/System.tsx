import Card from "@/components/Card/Card";
import Input from "@/components/Input/Input";
import React from "react";
import styles from "./System.module.scss";

interface ISystem {
  handleSystem: (v: string) => void;
}

const System = ({ handleSystem }: ISystem) => {
  return (
    <Card className={styles.cardContainer}>
      <h3 className={styles.title}>Sistema</h3>
      <p className={styles.detailsSystem}>
        Para conseguir una respuesta adecuada a tus necesidades, escribe un
        prompt para el sistema.
      </p>
      <Input
        onChange={(e) => handleSystem(e.target.value)}
        className={styles.input}
        placeholder="Insertar un prompt"
      />
    </Card>
  );
};

export default System;
