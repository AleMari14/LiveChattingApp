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
      e.preventDefault();
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
    <Container
      fluid
      className="chat-box-container d-flex flex-column p-2 p-md-4"
      style={{
        height: "100vh",
        maxWidth: "100%",
      }}
    >
      <Stack gap={3} className="chat-box border rounded shadow bg-white flex-grow-1">
        {/* Header */}
        <div
          className="chat-header bg-primary text-white p-3 rounded-top d-flex justify-content-center align-items-center"
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          {recipientUser?.name}
        </div>

        {/* Messaggi */}
        <Stack
          gap={3}
          className="messages overflow-auto px-3 py-2 flex-grow-1"
          style={{
            maxHeight: "30vh",
            padding: "0.5rem",
          }}
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
                style={{
                  maxWidth: "75%",
                  wordBreak: "break-word",
                  fontSize: "1rem",
                }}
              >
                <span>{message.text}</span>
                <span
                  className="message-footer text-white-50 small d-block mt-1"
                  style={{ fontSize: "0.8rem" }}
                >
                  {moment(message.createdAt).format("hh:mm A")}
                </span>
              </Stack>
            ))}
        </Stack>

        {/* Input */}
        <Stack
          direction="horizontal"
          className="chat-input align-items-center p-2 border-top bg-light rounded-bottom"
          gap={2}
        >
          <InputEmoji
            value={textMessage}
            onChange={setTextMessage}
            fontFamily="nunito"
            borderColor="rgba(0, 0, 0, 0.2)"
            placeholder="Type a message..."
            className="flex-grow-1 border rounded px-3 py-2"
            onKeyDown={handleKeyDown}
          />
          <button
            className="send-btn btn btn-primary d-flex align-items-center justify-content-center"
            style={{
              minWidth: "50px",
              minHeight: "50px",
              borderRadius: "50%",
            }}
            onClick={handleSendMessage}
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
