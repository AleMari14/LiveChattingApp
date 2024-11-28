import { useContext } from "react";
import { Stack, Badge } from "react-bootstrap";
import avatar from "../../assets/avatar.svg";
import { ChatContext } from "../../context/ChatContext";
import { useFecthLatestMessage } from "../../hooks/useFetchLatestMessage";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import moment from "moment";

const UserCard = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { latestMessage } = useFecthLatestMessage(chat);
  const { onlineUsers, notifications, markThisUserNotificationsAsRead } =
    useContext(ChatContext);

  const unreadNotifications = unreadNotificationsFunc(notifications);

  const isOnline = onlineUsers?.some(
    (user) => user?.userId === recipientUser?._id
  );

  const thisUserNotifications = unreadNotifications?.filter(
    (n) => n.senderId === recipientUser?._id
  );

  const truncateText = (text, maxLength = 30) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card p-3 justify-content-between align-items-center rounded shadow-sm mx-auto"
      role="button"
      style={{
        background: "linear-gradient(145deg, #ffffff, #f3f3f3)",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        borderRadius: "15px",
        boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        marginBottom: "15px",
        maxWidth: "600px", // Larghezza massima per schermi grandi
        width: "100%",
      }}
      onClick={() => {
        if (thisUserNotifications?.length !== 0) {
          markThisUserNotificationsAsRead(thisUserNotifications, notifications);
        }
      }}
    >
      {/* Avatar and User Info */}
      <div
        className="d-flex align-items-center"
        style={{
          flex: "1",
          minWidth: "0",
        }}
      >
        {/* Avatar */}
        <div
          className="avatar-wrapper me-3 position-relative"
          style={{
            position: "relative",
            width: "55px",
            height: "55px",
            flexShrink: "0",
          }}
        >
          <img
            src={avatar}
            alt="User Avatar"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid rgba(0, 0, 0, 0.1)",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          />
          {isOnline && (
            <span
              style={{
                position: "absolute",
                bottom: "4px",
                right: "4px",
                width: "14px",
                height: "14px",
                background: "limegreen",
                borderRadius: "50%",
                border: "2px solid white",
                boxShadow: "0 0 10px rgba(0, 255, 0, 0.7)",
              }}
              title={isOnline ? "Online" : "Offline"} // Aggiunto il title
            ></span>
          )}
        </div>

        {/* User Info */}
        <div
          className="text-content"
          style={{
            flex: "1",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "100%",
          }}
        >
          <div
            className="name"
            style={{
              fontWeight: "bold",
              fontSize: "1rem",
              color: "#333",
              marginBottom: "5px",
              lineHeight: "1.2",
            }}
          >
            {recipientUser?.name || "Unknown User"}
          </div>
          <div
            className="text text-muted"
            style={{
              fontSize: "0.9rem",
              color: "#6c757d",
            }}
          >
            {latestMessage?.text
              ? truncateText(latestMessage?.text)
              : "No messages yet."}
          </div>
          <div
            className="date text-muted"
            style={{
              fontSize: "0.8rem",
              color: "#888",
              marginTop: "5px",
            }}
          >
            {latestMessage?.createdAt
              ? moment(latestMessage?.createdAt).calendar()
              : ""}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div
        className="d-flex flex-column align-items-end text-end"
        style={{
          flex: "0",
          minWidth: "auto",
        }}
      >
        {thisUserNotifications?.length > 0 && (
          <Badge
            bg="danger"
            text="light"
            style={{
              fontSize: "0.8rem",
              padding: "5px 8px",
              borderRadius: "20px",
              boxShadow: "0 2px 4px rgba(255, 0, 0, 0.4)",
            }}
          >
            {thisUserNotifications.length}
          </Badge>
        )}
      </div>
    </Stack>
  );
};

export default UserCard;
