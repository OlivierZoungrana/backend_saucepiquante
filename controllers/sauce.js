const ModelSauce = require('../models/ModelSauce')
// Faut bosser petit :p
exports.createSauce = (req, res, next) => {
    try{
      const sauceObject = JSON.parse(req.body.sauce)
      const sauce = new ModelSauce({
          ...sauceObject,
          imageUrl: `${req.protocol}: //${req.get('host')}/images${req.file.filename}`
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

// exports.modifySauce = (req, res, next) => {
//     const sauce = new Sauce({
//       _id: req.params.id,
//       name: req.body.name,
//       manufacturer: req.body.manufacturer,
//       description: req.body.description,
//       imageUrl: req.body.imageUrl,
//       heat: req.body.heat,
//       userId: req.body.userId
//     });
//     Sauce.updateOne({_id: req.params.id}, sauce).then(
//       () => {
//         res.status(201).json({
//           message: 'Thing updated successfully!'
//         });
//       }
//     ).catch(
//       (error) => {
//         res.status(400).json({
//           error: error
//         });
//       }
//     );
//   };
exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({_id: req.params.id}).then(
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
    
    ModelSauce.find().then(
      (modelsauces) => {
          console.log({modelsauces})
        res.status(200).json(modelsauces);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };
// exports.displaySauceById = (req, res, next) => {
//     Sauce.findOne({
//       _id: req.params.id
//     }).then(
//       (sauce) => {
//         res.status(200).json(sauce);
//       }
//     ).catch(
//       (error) => {
//         res.status(404).json({
//           error: error
//         });
//       }
//     );
//   };
  