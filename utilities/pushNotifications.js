const { Expo } = require("expo-server-sdk");

const sendPushNotification = async (targetExpoPushToken, title , body , data) => {
  const expo = new Expo();
  const messagePacket = { to: targetExpoPushToken, sound: "default",  title: title, body : body , data : data }
  console.log(messagePacket);

  const chunks = expo.chunkPushNotifications([
    messagePacket
  ]);

  const sendChunks = async () => {
    // This code runs synchronously. We're waiting for each chunk to be send.
    // A better approach is to use Promise.all() and send multiple chunks in parallel.
    console.log("started sending...");
    chunks.forEach(async chunk => {
      console.log("Sending Chunk", chunk);
      try {
        const tickets = await expo.sendPushNotificationsAsync(chunk);
        console.log("Tickets", tickets);
      } catch (error) {
        console.log("Error sending chunk", error);
      }
    });
  };

  await sendChunks();
};

module.exports = sendPushNotification;
