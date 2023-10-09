const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const notificationStyle = {
    color: message.type === "success" ? "green" : "red",
    background: "lightgrey",
    fontSize: "20px",
    border: `2px solid ${message.type === "success" ? "green" : "red"}`,
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return <div style={notificationStyle}>{message.message}</div>;
};

export default Notification;
