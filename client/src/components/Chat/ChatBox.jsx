import { useRef, useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";
import InputEmoji from "react-input-emoji";

const ChatBox = ({ closeChatBox }) => {
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
      e.preventDefault(); // Prevent new line on Enter
      handleSendMessage();
    }
  };

  if (!recipientUser)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        Loading chat box...
      </p>
    );

  if (isMessagesLoading)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>Loading chat...</p>
    );

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "80vh",
        backgroundColor: "#f9fafb",
        padding: "1rem",
      }}
    >
      <div
        className="chat-box shadow-lg"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "15px",
          width: "100%",
          maxWidth: "500px",
          height: "100%",
          maxHeight: "600px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          className="chat-header d-flex align-items-center justify-content-between p-3"
          style={{
            background: "linear-gradient(to right, #6c757d, #343a40)",
            color: "white",
            fontSize: "1rem",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
          }}
        >
          <strong>{recipientUser?.name}</strong>
          <button
            onClick={closeChatBox}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div
          className="messages flex-grow-1 p-3"
          style={{
            overflowY: "auto",
            background: "#f8f9fa",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {messages &&
            messages.map((message, index) => (
              <div
                key={index}
                ref={scroll}
                className={`message ${
                  message?.senderId === user?._id
                    ? "align-self-end bg-primary text-white"
                    : "align-self-start bg-light text-dark"
                } p-2 mb-2 shadow-sm`}
                style={{
                  maxWidth: "75%",
                  borderRadius: "10px",
                  wordWrap: "break-word",
                  fontSize: "0.9rem",
                }}
              >
                <span>{message.text}</span>
                <div
                  className="message-footer"
                  style={{
                    marginTop: "5px",
                    textAlign: "right",
                    fontSize: "0.8rem",
                    color:
                      message?.senderId === user?._id
                        ? "rgba(255, 255, 255, 0.7)"
                        : "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  {moment(message.createdAt).format("HH:mm")}
                </div>
              </div>
            ))}
        </div>

        {/* Input */}
        <div
  className="chat-input d-flex align-items-center p-2"
  style={{
    backgroundColor: "white",
    borderTop: "1px solid rgba(0, 0, 0, 0.1)",
    borderBottomLeftRadius: "15px",
    borderBottomRightRadius: "15px",
    display: "flex",
    flexDirection: "column", // Disposizione verticale
    gap: "10px", // Spaziatura tra input e pulsante
  }}
>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px", // Spaziatura tra emoji e input
      width: "100%", // Assicura che l'input occupi tutta la larghezza
    }}
  >
    <InputEmoji
      value={textMessage}
      onChange={setTextMessage}
      fontFamily="nunito"
      borderColor="rgba(0, 0, 0, 0.2)"
      placeholder="Type a message..."
      onKeyDown={handleKeyDown}
      style={{
        flex: "1", // L'input occupa lo spazio disponibile
        borderRadius: "10px",
        border: "1px solid rgba(0, 0, 0, 0.2)",
        padding: "10px",
        overflowY: "auto",
        maxHeight: "100px", // Limita l'altezza massima del campo di input
      }}
    />
  </div>
  <button
    className="send-btn btn btn-primary d-flex align-items-center justify-content-center"
    onClick={handleSendMessage}
    style={{
      alignSelf: "flex-end", // Allinea il pulsante a destra
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-send-fill"
      viewBox="0 0 16 16"
    >
      <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
    </svg>
  </button>
</div>


      </div>
    </Container>
  );
};

export default ChatBox;
