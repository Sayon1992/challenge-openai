import { ChatCompletionRequestMessageRoleEnum } from "openai";

export const openaiRequest = <T>(
  message: string,
  history: {
    role: ChatCompletionRequestMessageRoleEnum;
    content: string;
    date: string;
  }[] = [],
  systemContent = ""
) =>
  fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, history, systemContent }),
  }).then((res) => res.json() as T);
