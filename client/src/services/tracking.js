import io from "socket.io-client";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";

export const getLocationUpdates = (bookingId) => {
  const socket = io(SOCKET_URL);

  return {
    subscribe: (callback) => {
      socket.emit("join", bookingId);
      socket.on("locationUpdate", callback);
    },
    unsubscribe: () => {
      socket.emit("leave", bookingId);
      socket.off("locationUpdate");
      socket.disconnect();
    },
  };
};
