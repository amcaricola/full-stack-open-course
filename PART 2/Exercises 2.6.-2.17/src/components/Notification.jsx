import { useEffect } from "react";

const Notification = ({ Message, setMessage }) => {
  if (!Message) return;

  const { text, color } = Message;

  const notificatioStyle = {
    fontSize: 24,
    color: color ? color : "red",
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "lightgrey",
    textAlign: "center",
  };

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, []);

  return <div style={notificatioStyle}>{text}</div>;
};
export default Notification;
