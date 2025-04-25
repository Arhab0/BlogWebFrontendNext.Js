import * as signalR from "@microsoft/signalr";

export const createConnection = (token: string) => {
  return new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:44385/notificationHub", {
      accessTokenFactory: () => token,
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();
};
