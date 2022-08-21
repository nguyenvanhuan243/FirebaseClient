import React from "react";
import { messaging } from "./init-fcm";
import { compose, lifecycle, withHandlers, withState } from "recompose";

const renderNotification = (notification, i) => (
  <li key={i}>{JSON.stringify(notification)}</li>
);

const App = ({ token, notifications }) => (
  <>
    <h1>React + Firebase Cloud Messaging (Push Notifications)</h1>
    <div>
      Current token is: <p>{token}</p>
    </div>
    <ul>
      Notifications List:
      {notifications.map(renderNotification)}
    </ul>
  </>
);

export default compose(
  withState("token", "setToken", ""),
  withState("notifications", "setNotifications", []),
  withHandlers({
    pushNotification: ({
      setNotifications,
      notifications
    }) => newNotification =>
      setNotifications(notifications.concat(newNotification))
  }),
  lifecycle({
    async componentDidMount() {
      const { pushNotification, setToken } = this.props;

      await messaging
        .requestPermission()
        .then(async () => {
          const token = await messaging.getToken();
          setToken(token);
        })
        .catch(err => {
          console.log("Unable to get permission to notify.", err);
        });

      navigator.serviceWorker.addEventListener("message", message => {
        console.log("Received from sw:", message);
        pushNotification(message.data.firebaseMessaging.payload);
      });
    }
  })
)(App);
