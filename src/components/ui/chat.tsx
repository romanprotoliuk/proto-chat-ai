import { ChatProvider } from "@/context/chat-context";
import ChatForm from "../forms/chat-form";
import ChatMessages from "./chat-messages";

export default function Chat() {
  return (
    <ChatProvider>
    <div className="right-container">
      <ChatMessages />
      <ChatForm />
    </div>
  </ChatProvider>
  );
}
