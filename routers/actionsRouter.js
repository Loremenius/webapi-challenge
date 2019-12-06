const express = require('express');

const router = express.Router();

const db = require('../data/helpers/actionModel');

const dbProj = require('../data/helpers/projectModel');

router.get('/:id', validateActionId, (req,res)=>{
    res.status(200).json(req.user);
});

router.get('/', (req,res)=>{
    db.get()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(error=>{
            res.status(500).json({
                message:" There was a problem getting projects",
                error: error
              });
        });
});

router.post('/project/:id', validateProjectId, validateAction,(req,res)=>{

    const newAction = {

        ...req.body,
        project_id: req.params.id

    }

    db.insert(newAction)
        .then(data=>{
            res.status(201).json(data);
        })
        .catch(error=>{
            res.status(500).json({
                message:" There was a problem adding project",
                error: error
              });
        });
})

router.put('/:id', validateActionId, validateUpdateAction, (req,res)=>{
    db.update(req.params.id, req.body)
        .then(data=>{
            res.status(201).json(data);
        })
        .catch(error=>{
            res.status(500).json({
                message:" There was a problem updating action",
                error: error
              });
        })
});

router.delete('/:id', validateActionId, (req,res)=>{
    db.remove(req.params.id)
        .then(data=>{
            res.status(200).json({message:"successfully deleted action"});
        })
        .catch(error=>{
            res.status(500).json({
                message:" There was a problem deleting action",
                error: error
              });
        })
})


function validateActionId(req, res, next) {
    console.log('Checking Action ID');
    db.get(req.params.id)
      .then(data=>{
        if(data){
          req.user = data
          next();
        }else{
          res.status(400).json({  message: "invalid acion id" });
        }
        
      });
  }

  function validateProjectId(req, res, next) {
    console.log('Checking Project ID');
    dbProj.get(req.params.id)
      .then(data=>{
        if(data){
          req.user = data
          next();
        }else{
          res.status(400).json({  message: "invalid project id" });
        }
        
      });
  }

  

function validateAction(req,res,next){
    console.log('checking for valid project in req body');

    if(Object.entries(req.body).length === 0){

        res.status(400).json({ message: "missing action data" });

        }else if (!req.body.notes || !req.body.description){

        res.status(400).json({ message: "missing notes and description in request body" });

        }else{
            next();
        }
    }

function validateUpdateAction(req,res,next){
    console.log('checking for valid update in req body');

    if(Object.entries(req.body).length === 0){

        res.status(400).json({ message: "missing action data" });

        }else if (!req.body.notes && !req.body.description){

        res.status(400).json({ message: "missing notes or description in request body" });

        }else{
            next();
        }
    }

module.exports = router;



module.exports = router;