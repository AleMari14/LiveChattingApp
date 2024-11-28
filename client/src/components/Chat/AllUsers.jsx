import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const AllUsers = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat } = useContext(ChatContext);
  const { onlineUsers } = useContext(ChatContext);

  return (
    <div
      className="all-users-container"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        padding: "20px",
        maxWidth: "800px", // Limita la larghezza massima della griglia
        margin: "0 auto", // Centra la griglia
      }}
    >
      {potentialChats &&
        potentialChats.map((receiver, index) => (
          <div
            className="single-user shadow-sm"
            key={index}
            onClick={() => createChat(user._id, receiver._id)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#ffffff",
              padding: "15px",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              border: "1px solid #ddd",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0px 4px 8px rgba(0, 0, 0, 0.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.05)")
            }
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden", // Gestisce l'overflow per nomi lunghi
                whiteSpace: "nowrap", // Impedisce l'andata a capo
                textOverflow: "ellipsis", // Aggiunge i puntini per i nomi troppo lunghi
                maxWidth: "150px", // Limita la larghezza visibile del nome
              }}
            >
              <strong style={{ fontSize: "1rem", color: "#333" }}>
                {receiver.name}
              </strong>
            </div>
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: onlineUsers?.some(
                  (user) => user?.userId === receiver?._id
                )
                  ? "#28a745"
                  : "#ccc",
                marginLeft: "10px",
              }}
            ></span>
          </div>
        ))}
    </div>
  );
};

export default AllUsers;
