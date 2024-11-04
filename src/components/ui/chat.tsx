import ChatForm from "../forms/chat-form";
import ChatMessages from "./chat-messages";

export default function Chat() {
  return (
    <div className="right-container">
      <ChatMessages />
      <ChatForm />
    </div>
  );
}
