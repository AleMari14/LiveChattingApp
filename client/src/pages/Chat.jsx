import { useContext, useState, useEffect } from "react";
import { Container, Stack } from "react-bootstrap";
import AllUsers from "../components/Chat/AllUsers";
import ChatBox from "../components/Chat/ChatBox";
import UserCard from "../components/Chat/UserCard";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat, currentChat } =
    useContext(ChatContext);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Effetto per aggiornare lo stato su ridimensionamento finestra
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    container: {
      padding: "1rem 0",
    },
    chatContainer: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: "1rem",
      alignItems: isMobile ? "center" : "start",
    },
    chatSidebar: {
      flex: isMobile ? "0 0 auto" : "0 0 auto",
      width: isMobile ? "100%" : "30%",
      maxWidth: isMobile ? "100%" : "300px",
      textAlign: isMobile ? "center" : "left",
    },
    userCardContainer: {
      width: isMobile ? "100%" : "auto",
    },
    chatBox: {
      width: "100%",
      marginTop: "1rem",
    },
  };

  // Funzione per chiudere il ChatBox
  const closeChatBox = () => updateCurrentChat(null);

  return (
    <Container fluid style={styles.container}>
      {/* All Users */}
      <AllUsers />

      {/* Chats and ChatBox */}
      {userChats?.length > 0 && (
        <div style={styles.chatContainer}>
          <div style={styles.chatSidebar}>
            <Stack gap={3}>
              {isUserChatsLoading && <p>Fetching Chats...</p>}
              {(!isUserChatsLoading && !userChats) ||
                (!userChats?.length && <p>No Chats...</p>)}
              {userChats?.map((chat, index) => (
                <div key={index} style={styles.userCardContainer}>
                  {/* Singola chat */}
                  <div
                    onClick={() => updateCurrentChat(chat)}
                    style={{ cursor: "pointer" }}
                  >
                    <UserCard chat={chat} user={user} />
                  </div>

                  {/* Mostra ChatBox sotto la chat selezionata */}
                  {isMobile && currentChat?._id === chat._id && (
                    <div style={styles.chatBox}>
                      <ChatBox closeChatBox={closeChatBox} />
                    </div>
                  )}
                </div>
              ))}
            </Stack>
          </div>

          {/* ChatBox per Desktop */}
          {!isMobile && currentChat && (
            <div style={styles.chatBox}>
              <ChatBox closeChatBox={closeChatBox} />
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default Chat;
