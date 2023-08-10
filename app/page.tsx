import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore/lite";
import { IHistoryItem } from "@/components/HistoryItem/HistoryItem";
import App from "@/sections/app/App";

const getHistory = async () => {
  const querySnapshot = await getDocs(collection(db, "history"));
  let history: IHistoryItem[] = [];
  querySnapshot.forEach((doc) => {
    history.push(doc.data() as IHistoryItem);
  });

  return history;
};

export default async function Home() {
  const searchHistory = await getHistory();
  return <App searchHistory={searchHistory} />;
}
