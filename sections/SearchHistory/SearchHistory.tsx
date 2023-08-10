import Card from "@/components/Card/Card";
import HistoryItem, { IHistoryItem } from "@/components/HistoryItem/HistoryItem";
import React, { Dispatch, SetStateAction } from "react";
import styles from "./SearchHistory.module.scss";

interface ISearchHistory {
  searchHistory: IHistoryItem[];
  setSearchHistory: Dispatch<SetStateAction<IHistoryItem[]>>;
  selectedSearchHistory?: number | null;
  setSelectedSearchHistory: Dispatch<SetStateAction<number | null>>;
}

const SearchHistory = ({
  searchHistory = [],
  setSelectedSearchHistory,
  selectedSearchHistory,
  setSearchHistory,
}: ISearchHistory) => {
  const handleSelect = (index: number) => {
    setSelectedSearchHistory(index);
  };

  const handleDelete = (index: number) => {
    let copyDeletedArray = [...searchHistory];
    setSelectedSearchHistory(null);
    copyDeletedArray.splice(index, 1);
    setSearchHistory(copyDeletedArray);
  };

  return (
    <Card className={styles.container}>
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>Historial de busquedas</h3>
      </div>
      <div className={styles.historyItemsContainer}>
        {searchHistory.map((item, index) => (
          <HistoryItem
            index={index}
            isSelected={selectedSearchHistory}
            key={item.id}
            select={handleSelect}
            handleDelete={handleDelete}
            historyItem={item}
          />
        ))}
      </div>
    </Card>
  );
};

export default SearchHistory;
