const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const climbServer = require("./climb-server");

const port = 3001;
//const index = require("./routes/index");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: `http://localhost:3000`,
    method: ["GET", "POST"],
  },
});

let sockets = [];

io.on("connection", (socket) => {
  sockets.push(socket);
  console.log(`User connected : ${socket.id}`);
  console.log(sockets.length);

  const refreshPlayers = (roomId) => {
    io.to(roomId).emit("refresh_players", climbServer.getPlayers(roomId));
  }
 
  socket.on("create_room", (hostName) => {
    const room = climbServer.createGame(socket.id, hostName);
    socket.join(room.getId());
    socket.emit("room_joined", room, socket.id);
    console.log(`User (${socket.id}) created room : ${room.getId()}`);
  });

  socket.on("join_room", (roomId, playerName) => {
    const room = climbServer.findRoom(roomId);
    if (room === undefined) {
      socket.emit("not_find_room");
    } else {
      socket.join(roomId);
      climbServer.joinRoom(roomId, socket.id, playerName);
      socket.emit("room_joined", room, socket.id);
      refreshPlayers(roomId);

      console.log(`User (${socket.id}) joined room : ${roomId}`);
    }
    const newroom = climbServer.findRoom(roomId);
    console.log(newroom);
  });

  socket.on("leave_room", (roomId, playerId) => {
    climbServer.leaveRoom(roomId, playerId);
  });

  socket.on("start_game", (roomId) => {
    //Condition à faire : Si tout les joueurs sont prêt
    climbServer.startGame(roomId);
    io.to(data.room.getId()).emit("game_started", roomId);
  });

  socket.on("end_day", (data) => {
    //Condition à faire : Si tout les joueurs sont prêt
    io.to(data.room.getId()).emit("next_day", data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected : ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});
