const ratings = require("../data/ratings-data")

function list(req,res) {
    const {noteId} = req.params
    const byResult =  noteId ? rating => rating.noteId === +noteId : () => true
    res.json({data: ratings.filter(byResult)})
}


function ratingExists(req,res,next) {
    const ratingId = req.params.ratingId
    const foundRating = ratings.find((rating) => rating.id === Number(ratingId))
    if(foundRating) {
        res.locals.rating = foundRating
        next()
    } else {
        next({
            status: 404,
            message: `Rating id not found: ${req.params.ratingId}`,
          });
    }
}

function read(req,res) {
    const noteId = req.params.noteId
    if(noteId === undefined){
        res.json({data: res.locals.rating}) 
    }

 const result = ratings.find((rating) => rating.noteId === +noteId)
 res.json({data: result})
    
   
}


module.exports = {
    read: [ratingExists,read],
    list 
}