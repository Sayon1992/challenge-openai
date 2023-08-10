import { ChatCompletionRequestMessageRoleEnum } from "openai";
import React, { useMemo } from "react";
import styles from "./Chat.module.scss";
import { format } from "date-fns";
import Image from "next/image";

export interface IChats {
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
  date: string;
  loading?: boolean;
}

const ChatItem = ({ content, date, role, loading = false }: IChats) => {
  const formattedContent = useMemo(() => {
    const dividedContent = content.split("```");
    if (dividedContent.length === 1) return content;
    return dividedContent
      .map((item, index) => {
        return `${item} ${
          index + 1 !== dividedContent.length ? (index % 2 === 0 ? "<pre><code>" : "</code></pre>") : ""
        }`;
      })
      .join("");
  }, [content]);
  return (
    <div className={styles.chatItemContainer}>
      <div className={styles.titleAndDateContainer}>
        <h4 className={`${styles.title} ${role !== "assistant" ? styles.user : styles.assistant}`}>
          {role !== "assistant" ? "Ana clara" : "OdamaChat"}
        </h4>
        {loading ? (
          <Image alt="loading" src={"/icons/loading.svg"} width={20} height={10} />
        ) : (
          <p className={styles.date}>{format(new Date(date), "hh:mm a")}</p>
        )}
      </div>
      <div className={styles.divider} />
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: formattedContent || "",
        }}
      />
    </div>
  );
};

export default ChatItem;
