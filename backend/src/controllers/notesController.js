import Note from "../../models/Notes.js";
export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes Controller ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if(!getNoteById) return res.status(404).json({message:"Note Not Found"});
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getAllNotes Controller ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export async function createNote(req, res) {
    try {
        const { title, content } = req.body
        const note = new Note({ title, content });
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in Creating Note ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export async function updateNote(req, res) {
    try {
        const { title, content } = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, {
            new: true,
        });
        if (!updatedNote) return res.status(400).json({ message: "Note not Found" });
        res.status(200).json({ updatedNote });
    } catch (error) {
        console.error("Error in Updating Note ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export async function deleteNote(req, res) {
    try {
        const { title, content } = req.body;
        const deletedNote = await Note.findByIdAndDelete(req.params.id, { title, content }, {
            new: true,
        });
        res.status(200).json({ message: "Note Deleted Successfully!" });
        if (!deleteNote) return res.status(404).json({ message: "Note Not Found" });
    } catch (error) {
        ("Error in Deleting Note", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}