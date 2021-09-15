const ModelSauce = require('../models/ModelSauce')
// Faut bosser petit :p
exports.createSauce = (req, res, next) => {
    try{
      const sauceObject = JSON.parse(req.body.sauce)
      const sauce = new ModelSauce({
          ...sauceObject,
          imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })

       return sauce.save((error,result)=>{
    
            if(error){

                res.status(400).json({
                    error: error
                  });
           }

            res.status(201).json({
                message: 'Post saved successfully!'
              });
    
        })
        
    }
    catch(e){
      console.log({e})
    }
  };

exports.modifySauce = (req, res, next) => {
 ModelSauce.updateOne({_id:req.params.id}, {...req.body,
  imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  _id:req.params.id})
 .then(()=> res.status(200).json({message: 'sauce modifié'}))
 .catch(error => res.status(400).json({error}))
  };
exports.deleteSauce = (req, res, next) => {
    ModelSauce.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };
exports.displaySauce= (req, res, next) => {
  ModelSauce.find()
  .then((sauces) => {res.status(200).json(sauces)})
  .catch((error) => {res.status(400).json({error: error});
        }
      );
  };
exports.displaySauceById = (req, res, next) => {
    ModelSauce.findOne({
      _id: req.params.id
    }).then(
      (sauce) => {
        res.status(200).json(sauce);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };

exports.likeSauce =(req, res, next)=>{

  if(req.body.like===1){

    ModelSauce.updateOne({_id: req.params.id}, {
      $inc : {likes:req.body.like++},
      $push : {usersLiked:req.body.userId}
    })
    .then(()=>res.status(200).json({message: 'like ajouté !'}))
    .catch(()=> res.status(400).json({error}))
  }else if(req.body.like===-1){

    ModelSauce.updateOne({
      _id:req.params.id}, {
        $inc: {dislikes: (req.body.like++)*-1},
        $push: {usersDisliked:req.body.userId}

    })
    .then(()=> res.status(200).json({message:'dislike ajouté!'}))
    .catch(error => res.status(400).json({error}))
  }else{

    ModelSauce.findOne({_id: req.params.id})
      .then(sauce => {

        if(sauce.usersDisliked.includes(req.body.userId)){

          ModelSauce.updateOne({
            _id: req.params.id}, {
              $pull: {usersDisliked: req.body.userId},
              $inc : {likes: -1}})
            .then(()=>{res.status(200).json({message:'like supprimé !'})})
            .catch(error => res.status(400).json({error}))
        } else if(sauce.usersDisliked.includes(req.body.userId)){
          ModelSauce.updateOne({
            _id: req.params.id
          }, {
            $pull : {usersDisliked : req.body.userId}, $inc:{dislikes:-1}})
            .then(()=>{
              res.status(200).json({message: 'dislike supprimé'})
            })
            .catch(error=> res.status(400).json({error}))
        }
          })
  }
}

        

        
        

        

    



  