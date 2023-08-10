import Card from "@/components/Card/Card";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ChatItem, { IChats } from "./ChatItem";
import Input from "@/components/Input/Input";
import styles from "./Chat.module.scss";

interface IChatsProps {
  chats?: IChats[];
  send: (input: string) => void;
  createNewChat: () => void;
  enable: boolean;
  loading?: boolean;
}

const Chat = ({ chats = [], send, createNewChat, enable = false, loading = false }: IChatsProps) => {
  const [input, setInput] = useState("");
  const dummyRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    dummyRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <Card className={styles.container}>
      <div className={styles.chatNavbar}>
        <h4>OdamaChat</h4>
        <button onClick={createNewChat} className={styles.button}>
          <Image
            alt="icon plus circle"
            src="/icons/icon-plus-circle.svg"
            width={20}
            height={20}
            style={{ marginRight: 10 }}
          />
          Nueva busqueda
        </button>
      </div>
      <div className={styles.chatContainer}>
        {chats?.map((item) => {
          if (item.role !== "system") return <ChatItem key={item.content} {...item} />;
        })}
        {loading && <ChatItem content="" date="" role="assistant" loading={loading} />}
        <div ref={dummyRef} />
      </div>
      {enable && (
        <div className={styles.inputContainer}>
          <p className={styles.charactersLeft}>{1000 - input.length}</p>
          <Input
            maxLength={1000}
            value={input}
            placeholder="Insertar Prompt"
            onChange={(e) => setInput(e.target.value)}
            handleSend={() => send(input)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                send(input);
                setInput("");
              }
            }}
          />
        </div>
      )}
    </Card>
  );
};

export default Chat;
