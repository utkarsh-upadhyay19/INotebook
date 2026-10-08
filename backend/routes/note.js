const express =require('express');
const Notes=require('../models/Notes');
const router =express.Router();
const {body, validationResult }=require("express-validator");
var fetchuser=require('../middleware/fetchuser');



router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    const notes=await Notes.find({user:req.user.id})
    res.json(notes)
})

router.post('/addnotes', fetchuser,[
    body('tittle').isLength({min:3}).withMessage("tittle should be have in tittle formate!!"),
    body('description').isLength({min:5}).withMessage("description should be have minimum 5 characters!!"),
], async (req, res) => {
  const {tittle,description,tag}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note=new Notes({
      tittle, description, tag, user:req.user.id,date: new Date()
    })
    const savednote=await note.save()
  res.json(savednote)
    
});

//Updating the existing notes...
router.put('/updatenotes/:id', fetchuser,async (req, res) => {
  const {tittle,description,tag}=req.body;
  //creating a newNotes objects;
  const newNotes={};
  if(tittle){newNotes.tittle=tittle};
  if(description){newNotes.description=description};
  if(tag){newNotes.tag=tag};

//finding the note to be updates and updating it..
  let note=await Notes.findById(req.params.id);
  if(!note){return res.status(404).send("Not found")}
  if(note.user.toString()!==req.user.id){
    return res.status(401).send("Not Allowed")
  }

  note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNotes},{new:true})
  res.json({note});

})

//Deleting the existing notes...
router.delete('/delete/:id', fetchuser,async (req, res) => {
  

//finding the note to be Delete and Deleting it..
  let note=await Notes.findById(req.params.id);
  if(!note){return res.status(404).send("Not found")}
  //Allow deletion only if user own that note..
  if(note.user.toString()!==req.user.id){
    return res.status(401).send("Not Allowed")
  }

  note=await Notes.findByIdAndDelete(req.params.id)
  res.json({"Success":"Note has been deleted",note:note});

})
module.exports=router