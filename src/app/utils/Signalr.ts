import * as signalR from "@microsoft/signalr";

export const createConnection = (token: string,baseUrl:string) => {
  return new signalR.HubConnectionBuilder()
    .withUrl(`${baseUrl}/notificationHub`, {
      accessTokenFactory: () => token,
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();
};
