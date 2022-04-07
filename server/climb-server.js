const Room = require("./models/room.js");

const climbServer = { rooms: [] };

climbServer.createGame = (hostSocket, hostParticipant) => {
  // Create a new game instance
  //const Room = RoomFactory(io);
  const newRoom = new Room(
    hostSocket,
    hostParticipant,
    climbServer.getRandomCode()
  );
  console.log("New game object created", newRoom);

  // Store it in the list of game
  climbServer.rooms.push(newRoom);

  return newRoom;
};

climbServer.findRoom = (roomId) => {
  console.log(climbServer.rooms);
  for (let i = 0; i < climbServer.rooms.length; i++) {
    if (climbServer.rooms[i].getId() == roomId) {
      return climbServer.rooms[i];
    }
  }
  console.log("room INEXISTANTE !! " + roomId);
  return null;
};

climbServer.setReady = (roomId, playerId) => {
  climbServer.getPlayers(roomId)?.forEach((player) => {
    if (player.id == playerId) {
      player.ready = true;
    }
  });
};

climbServer.allReady = (roomId) => {
  climbServer.getPlayers(roomId)?.forEach((player) => {
    if (!player.ready) {
      return false;
    }
  });
  return true;
};

climbServer.joinRoom = (roomId, playerSocket, playerName) => {
  let room = climbServer.findRoom(roomId);
  room.addPlayer(playerSocket, playerName);
};

climbServer.startGame = (roomId) => {
  let room = climbServer.findRoom(roomId);
  if (room?.getPlayers().length >= 2) {
    room.startGame();
    return true;
  }
  return false;
};

climbServer.leaveRoom = (roomId, playerId) => {
  let room = climbServer.findRoom(roomId);
  room.removePlayer(playerId);
};

climbServer.codeExist = (code) => {
  for (let i = 0; i < climbServer.rooms.length; i++) {
    if (climbServer.rooms[i].getId() === code) {
      return true;
    }
  }
  return false;
};

climbServer.getRandomCode = () => {
  code = 1000 + Math.floor(Math.random() * 8999);
  while (climbServer.codeExist(code)) {
    code = climbServer.getRandomCode();
  }
  return code;
};

module.exports = climbServer;

climbServer.getPlayers = (roomId) => {
  let room = climbServer.findRoom(roomId);
  room.players.forEach((player) => player.generateEvolution());
  return room.players;
};
