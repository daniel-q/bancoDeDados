import {checkPoolConnection,getNotes,getNote,createNote} from "./database.js"
import express from "express";

const app = express()

app.use(express.json())


checkPoolConnection();

app.get("/notes",async (req, res)=>{
    const notes = await getNotes()
    res.sen(notes)
})

app.get("/notes/:id",async (req, res)=>{
    const id = req.params.id
    const notes = await getNote(id)
    res.sen(notes)
})

app.post("/notes",async (req, res)=>{
    const {title,contents} = req.body
    const note = await createNote(title,contents)
    res.status(201).sen(note)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(8080,()=>{console.log('Server is running on port 8080')})