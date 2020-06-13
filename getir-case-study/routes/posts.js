const express = require('express');      //importing express
const router = express.Router();         //importing router
const Post = require('../models/Post');  //importing Post for using the declare data variables

//GET BACK ALL THE POSTS
//for control(for me on the database)
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message: err});
    }
});

/*
//SUBMIT A POST
router.post('/', async (req, res) => {
    //console.log(req.body);
    const post = new Post({
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        minCount: req.body.minCount,
        maxCount: req.body.maxCount
    });
    try{

    const savedPost = await post.save();
    res.json(savedPost);
    } catch (err) {
        res.json({message: err});
    }
});
*/


//if we put http://localhost:8000/posts, we can HTTP post request "/" means is this
router.post('/', async (req, res) => {
    
    const { startDate, endDate, minCount, maxCount } = req.body //we declared them in req.body so we have to use it like that variables
    
    //0 for success of that code
    let code = 0
    let msg = 'Success'
    //some trouble in the records, I didn't do what I want, but I tried on there
    let records = await Post.aggregate([
        { $match: { $and: [
          { createdAt: { $gte: new Date(startDate) } },
          { createdAt: { $lte: new Date(endDate) } },
          { count: { $gte: minCount } },
          { count: { $lte: maxCount } }
        ] } },
        { $group: { _id: "$key", createdAt: { $first: "createdAt" },  totalCount: { $sum: "count" } } },
        { $project: { _id: 0, key: "$_id", createdAt: 1, totalCount: 1 } }
      ])

    res.json({ code, msg, records }) //response will be like code, msg, records
});
module.exports = router; //connection with router

//Some kind of stuff about changing the database, we don't use them but we just use HTTP post request on that project

/*
//SPECIFIC POST (may be with the url) (bak mesela id sini alıp url sonuna koyunca getleyince onu sadece onu getirtiyor)(postId dynamictir.)
router.get('/:postId', async (req, res) => {
    try{
    const post = await Post.findById(req.params.postId);
    res.json(post);
    }catch(err) {
        res.json({message: err});
    }
});

//Delete Post
router.delete('/:postId', async (req, res) => {
    try{
    const removedPost = await Post.remove({_id: req.params.postId})
    //"_" çünkü mongonun kendisinde id den önce _ var
    res.json(removedPost);
    } catch(err) {
        res.json({message: err});
    }
});

//Update a post
router.patch('/:postId', async (req, res) => {
    try{
    const updatedPost = await Post.updateOne({_id: req.params.postId},
        {$set: {title: req.body.title}}
        );
        res.json(updatedPost);
    } catch(err) {
        res.json({message: err});
    }
});
*/
