import express from "express"
import https from "https"
import { Server } from "socket.io"

const app = express()
const server = https.createServer(app)

const io = new Server(server, {
	cors: {
		origin: "*"
	},
})

io.on("connection", (socket) => {
	console.log("a user connected")

	socket.on("gyroscope", (data) => {
		console.log(data)
	})

	io.on("disconnect", () => {
		console.log("user disconnected")
	})
})

io.listen(3001, () => {
	console.log("listening on *:3001")
})

