const express = require('express');

const router = express.Router();

const db = require('../data/helpers/projectModel');

router.get('/:id', validateProjectId, (req,res)=>{
    res.status(200).json(req.user);
});

router.get('/:id/actions', validateProjectId,(req,res)=>{
    db.getProjectActions(req.params.id)
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(error=>{
            res.status(500).json({
                message:" There was a problem getting actions",
                error: error
              });
        });
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

router.post('/', validateProject, (req,res)=>{
    db.insert(req.body)
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

router.put('/:id', validateProjectId, validateUpdateProject, (req,res)=>{
    db.update(req.params.id, req.body)
        .then(data=>{
            res.status(201).json(data);
        })
        .catch(error=>{
            res.status(500).json({
                message:" There was a problem updating project",
                error: error
              });
        })
});

router.delete('/:id', validateProjectId, (req,res)=>{
    db.remove(req.params.id)
        .then(data=>{
            res.status(200).json({message:"successfully deleted project"});
        })
        .catch(error=>{
            res.status(500).json({
                message:" There was a problem deleting project",
                error: error
              });
        })
})


function validateProjectId(req, res, next) {
    console.log('Checking ID');
    db.get(req.params.id)
      .then(data=>{
        if(data){
          req.user = data
          next();
        }else{
          res.status(400).json({  message: "invalid project id" });
        }
        
      });
  }

  

function validateProject(req,res,next){
    console.log('checking for valid project in req body');

    if(Object.entries(req.body).length === 0){

        res.status(400).json({ message: "missing project data" });

        }else if (!req.body.name || !req.body.description){

        res.status(400).json({ message: "missing name and description in request body" });

        }else{
            next();
        }
    }

function validateUpdateProject(req,res,next){
    console.log('checking for valid update in req body');

    if(Object.entries(req.body).length === 0){

        res.status(400).json({ message: "missing project data" });

        }else if (!req.body.name && !req.body.description){

        res.status(400).json({ message: "missing name or description in request body" });

        }else{
            next();
        }
    }

module.exports = router;