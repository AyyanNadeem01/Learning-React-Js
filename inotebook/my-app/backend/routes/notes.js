const express= require('express');
const fetchuser = require('../middleware/fetchuser');
const { body } = require('express-validator'); 
const router = express.Router();
const Notes=require('../models/Notes');

//Fetch all notes
// This is a login required route
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    const notes=await Notes.find({ user: req.user.id })
    res.json(notes);
} )
//Add a new notes
// This is a login required route
router.post('/addnote',fetchuser,[
    body('title', "Enter Title").isLength({ min: 3 }),
    body('description', "Enter Description").isLength({ min: 5 }),
],async(req,res)=>{
    const {title,description,tag}=req.body;
    const note= new Notes({
        title,description,tag,user:req.user.id
    })
    const savednote=await note.save();
    res.json(savednote);
} )

//Updating a note
// This is a login required routerp
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag}=req.body;
    const newNote={};
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}

    //Find the note to be updated and update it
    let note= await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed")
    }
    note= await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});
})
//Deleting a note
// This is a login required routerp
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    //Find the note to be deleted and delete it
    let note= await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    //Allow deletion only if user owns this note
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed")
    }
    note= await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted",note:note});
})

module.exports=router;