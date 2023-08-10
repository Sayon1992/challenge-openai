"use client";

import { IHistoryItem } from "@/components/HistoryItem/HistoryItem";
import { openaiRequest } from "@/openai/api";
import React, { useState } from "react";
import styles from "../../app/page.module.scss";
import Navbar from "@/components/Navbar/Navbar";
import System from "../System/System";
import SearchHistory from "../SearchHistory/SearchHistory";
import Chat from "../Chat/Chat";
import { v4 as uuidv4 } from "uuid";
import { IChats } from "../Chat/ChatItem";

let systemInput = "";

interface IApp {
  searchHistory: IHistoryItem[];
}

const App = ({ searchHistory = [] }: IApp) => {
  const [searchHistoryState, setSearchHistoryState] = useState(searchHistory);
  const [selectedSearchHistory, setSelectedSearchHistory] = useState<number | null>(null);
  const [loadingSend, setLoadingSend] = useState(false);
  const [onlyChat, setOnlyChat] = useState(false);
  const handleSystem = (value: string) => {
    systemInput = value;
  };

  const handleSend = async (value: string) => {
    setLoadingSend(true);
    const shallowCopy = [...searchHistoryState];
    const copyPrompts = searchHistoryState[selectedSearchHistory || 0]?.prompts;
    if (selectedSearchHistory !== null) {
      shallowCopy[selectedSearchHistory].prompts = [
        ...shallowCopy[selectedSearchHistory].prompts,
        { content: value, date: new Date().toISOString(), role: "user" },
      ];
      setSearchHistoryState(shallowCopy);
      const response = await openaiRequest<IChats[]>(value, copyPrompts, systemInput);

      shallowCopy[selectedSearchHistory].prompts = response;
      shallowCopy[selectedSearchHistory].title = response[response[0].role === "system" ? 1 : 0].content;
      setSearchHistoryState([...shallowCopy]);
    }
    setLoadingSend(false);
  };

  const createNewChat = () => {
    setSelectedSearchHistory(0);
    setSearchHistoryState([{ prompts: [], title: "Sample text", id: uuidv4() }, ...searchHistoryState]);
  };

  return (
    <main className={styles.container}>
      <Navbar onlyChat={onlyChat} handleOnlyChat={() => setOnlyChat(!onlyChat)} />
      <div className={`${styles.contentContainer} ${onlyChat ? styles.onlyChat : ""}`}>
        {!onlyChat && (
          <div className={styles.systemAndHistory}>
            <System handleSystem={handleSystem} />
            <SearchHistory
              searchHistory={searchHistoryState}
              setSelectedSearchHistory={setSelectedSearchHistory}
              selectedSearchHistory={selectedSearchHistory}
              setSearchHistory={setSearchHistoryState}
            />
          </div>
        )}
        <div className={`${styles.chatContainer} ${onlyChat ? styles.onlyChatOnChat : ""}`}>
          <Chat
            chats={selectedSearchHistory !== null ? searchHistoryState[selectedSearchHistory]?.prompts : []}
            send={handleSend}
            createNewChat={createNewChat}
            enable={selectedSearchHistory !== null}
            loading={loadingSend}
          />
        </div>
      </div>
    </main>
  );
};

export default App;
