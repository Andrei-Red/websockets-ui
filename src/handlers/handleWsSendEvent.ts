
const handleWsSendEvent = (ws: any, commandType: string, data: any) => {
  ws.send(
    JSON.stringify({
      type: commandType,
      data: JSON.stringify(data),
      id: 0,
    }),
  );
};

export default handleWsSendEvent;
