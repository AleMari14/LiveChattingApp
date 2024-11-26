import { useContext } from "react";
import { Stack } from "react-bootstrap";
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
    (n) => n.senderId == recipientUser?._id
  );

  const truncateText = (text) => {
    let shortText = text.substring(0, 20);
    if (text.length > 20) {
      shortText = shortText + "...";
    }
    return shortText;
  };

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-3 rounded shadow-sm position-relative"
      role="button"
      onClick={() => {
        if (thisUserNotifications?.length !== 0) {
          markThisUserNotificationsAsRead(
            thisUserNotifications,
            notifications
          );
        }
      }}
      style={{
        backgroundColor: "#fff",
        border: "1px solid #e5e7eb",
        transition: "background-color 0.3s ease, transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#f9fafb";
        e.currentTarget.style.transform = "scale(1.02)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#fff";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {/* Avatar e Informazioni */}
      <div className="d-flex align-items-center">
        <div className="me-3">
          <img
            src={avatar}
            alt="person-circle"
            height="45px"
            style={{
              borderRadius: "50%",
              border: "2px solid #e5e7eb",
            }}
          />
        </div>
        <div className="text-content">
          <div
            className="name fw-bold"
            style={{
              fontSize: "1rem",
              color: "#374151",
            }}
          >
            {recipientUser?.name}
          </div>
          <div
            className="text text-muted"
            style={{
              fontSize: "0.9rem",
            }}
          >
            {latestMessage?.text && truncateText(latestMessage?.text)}
          </div>
        </div>
      </div>

{/* Stato e Notifiche */}
<div className="d-flex flex-column align-items-end">
  <div
    className="date text-muted"
    style={{
      fontSize: "0.8rem",
    }}
  >
    {moment(latestMessage?.createdAt).calendar()}
  </div>

  {/* Contatore notifiche */}
  {thisUserNotifications?.length > 0 && (
    <div
      className={`this-user-notifications text-white fw-bold bg-success rounded-pill px-2 py-1 mt-1`}
      style={{
        fontSize: "0.8rem",
        minWidth: "20px",
        textAlign: "center",
      }}
    >
      {thisUserNotifications?.length}
    </div>
  )}

  {/* Cerchio verde solo quando l'utente è online e ci sono notifiche */}
  {thisUserNotifications?.length > 0 && (
    <span
      className={`user-online position-absolute ${
        isOnline ? "bg-success" : "bg-secondary"
      }`}
      style={{
        bottom: "10px",
        right: "10px",
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        border: "2px solid #fff",
      }}
    ></span>
  )}
</div>


    </Stack>
  );
};

export default UserCard;
