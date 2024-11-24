import { useRef, useState, useEffect, useContext } from "react";
import { Stack, Container } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, sendTextMessage, isMessagesLoading } =
    useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (textMessage.trim()) {
      sendTextMessage(textMessage, user, currentChat._id, setTextMessage);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Evita di creare una nuova riga nell'input
      handleSendMessage();
    }
  };

  if (!recipientUser)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No conversation selected yet...
      </p>
    );

  if (isMessagesLoading)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>Loading chat...</p>
    );

  return (
    <Container fluid="md" className="chat-box-container p-4">
      <Stack gap={3} className="chat-box border rounded shadow bg-light">
        {/* Header */}
        <div className="chat-header bg-primary text-white p-3 rounded-top">
          <strong>{recipientUser?.name}</strong>
        </div>

        {/* Messaggi */}
        <Stack
          gap={2}
          className="messages overflow-auto px-4 py-3"
          style={{ maxHeight: "60vh" }}
        >
          {messages &&
            messages.map((message, index) => (
              <Stack
                key={index}
                ref={scroll}
                className={`message ${
                  message?.senderId === user?._id
                    ? "align-self-end bg-primary text-white"
                    : "align-self-start bg-secondary text-white"
                } p-3 rounded`}
              >
                <span>{message.text}</span>
                <span className="message-footer text-white-50 small">
                  {moment(message.createdAt).calendar()}
                </span>
              </Stack>
            ))}
        </Stack>

        {/* Input */}
        <Stack
          direction="horizontal"
          className="chat-input align-items-center p-3 border-top bg-light rounded-bottom"
          gap={2}
        >
          <InputEmoji
            value={textMessage}
            onChange={setTextMessage}
            fontFamily="nunito"
            borderColor="rgba(0, 0, 0, 0.2)"
            placeholder="Type a message..."
            className="flex-grow-1 border rounded px-2"
            onKeyDown={handleKeyDown} // Aggiunto evento per il tasto "Enter"
          />
          <button
            className="send-btn btn btn-primary d-flex align-items-center justify-content-center"
            onClick={handleSendMessage} // Centralizzata la logica di invio
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-send-fill"
              viewBox="0 0 16 16"
            >
              <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
            </svg>
          </button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default ChatBox;
