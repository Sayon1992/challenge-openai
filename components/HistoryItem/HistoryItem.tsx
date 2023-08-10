import React, { useMemo, useState } from "react";
import styles from "./HistoryItem.module.scss";
import Image from "next/image";
import { formatDistance, formatDuration, intervalToDuration } from "date-fns";
import { IChats } from "@/sections/Chat/ChatItem";

export interface IHistoryItem {
  prompts: IChats[];
  title?: string;
  id: string;
}

export interface IHistory {
  historyItem: IHistoryItem;
  handleDelete?: (i: number) => void;
  index: number;
  isSelected?: number | null;
  select?: (index: number) => void;
}

const HistoryItem = ({ index, isSelected, select, handleDelete, historyItem }: IHistory): JSX.Element => {
  const [isDeleting, setIsDeleting] = useState(false);

  const getTime = useMemo(() => {
    if (historyItem.prompts?.[0])
      return `Quedan ${formatDuration(
        intervalToDuration({
          start: new Date(historyItem.prompts?.[0]?.date).valueOf() - new Date().valueOf() + 86400000,
          end: 0,
        })
      )}`;
  }, [historyItem.prompts]);

  return (
    <div
      onClick={() => select?.(index)}
      className={`${styles.container} ${isDeleting || isSelected === index ? styles.deleting : ""}`}
    >
      <div className={styles.leftCol}>
        <div className={styles.searchContainer}>
          <Image alt="search icon" src={"/icons/search.svg"} width={20} height={20} />
        </div>
        <div className={styles.titleContainer}>
          <h5 className={styles.title}>{historyItem.title}</h5>
          {getTime && (
            <div className={styles.time}>
              <Image src="/icons/time-quarter.svg" alt="time quarter" width={20} height={20} />
              {getTime}
            </div>
          )}
        </div>
      </div>
      <div className={styles.rightCol}>
        {isDeleting ? (
          <>
            <Image
              alt="check"
              src="/icons/icon-check.svg"
              width={20}
              height={20}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete?.(index);
              }}
            />
            <Image
              alt="close"
              src="/icons/close.svg"
              width={20}
              height={20}
              onClick={() => setIsDeleting(false)}
            />
          </>
        ) : (
          <Image
            onClick={() => setIsDeleting(true)}
            alt="bin"
            src="/icons/trash.svg"
            width={20}
            height={20}
          />
        )}
      </div>
    </div>
  );
};

export default HistoryItem;
