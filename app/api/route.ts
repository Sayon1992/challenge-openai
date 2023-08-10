import { NextResponse } from "next/server";
import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
  organization: process.env.OPEN_AI_ORGANIZATION,
});
const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  const {
    message,
    history = [],
    systemContent = "",
  }: {
    message: string;
    history: {
      role: ChatCompletionRequestMessageRoleEnum;
      content: string;
      date: Date;
    }[];
    systemContent: string;
  } = await req.json();

  let messageToSend: ChatCompletionRequestMessage[] = [{ role: "user", content: message }];
  if (systemContent !== "") messageToSend.unshift({ role: "system", content: systemContent });
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.6,
    messages: [...history.map((item) => ({ role: item.role, content: item.content })), ...messageToSend],
  });
  const formatted = [
    ...history,
    { ...messageToSend[0], date: new Date() },
    { ...response.data.choices[0].message, date: new Date() },
  ];
  console.log(formatted);

  return NextResponse.json(formatted);
}
