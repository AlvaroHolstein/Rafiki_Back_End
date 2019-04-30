const {Thread} = require("../models/threads.model")

let crudThread = {
    //Add Thread
    addThread(userid,title,question,tags,date){
        let id =1 

        let threads = []

        Thread.find({},(err,collection)=>{
            if(err) throw err
            threads=collection
        })
        if(threads.length!=0){
            threads.sort(function(a,b){
                if(a.id>b.id) return 1;
                if(a.id<b.id) return -1;
            })
            id = threads[threads.length-1].id +1; 
        }
        let newThread= Thread({
            id:id,
            userid:userid,
            title:title,
            question:question,
            tags:tags,
            upvotes:0,
            date:date,
            views:0
        })
        newThread.save(function(err){
            if (err) throw err;
            console.log("Thread Added")
        })
    },

    //Get all Threads
    findAll(res){
        Thread.find({},(err,collection)=>{
            if(err){
                console.log(err,"Error")
            }else {
                res.json(collection)
            }
        })
    },

    //Get Thread By Tags
    findByTag(res,tags){//tags is an array of String
        let threads = []
        
        Thread.find({},(err,collection)=>{
            if(err){
                console.log(err,"Error")
            }else {
                threads=collection
            }
        })
        
        for(let i=0;i<tags.length;i++){
            threads=threads.filter(thread=>{
                if(thread.tags.tag.text==tags[i]){
                    return true
                }
            })
        }

        console.log(threads)
        res.json(threads)
    },

    //Get Thread By keyword
    findByKeyword(res,keyword){
        Thread.find({$or:[{title:'%'+keyword+'%'},{question:'%'+keyword+'%'}]},(err,collection)=>{
            if(err)throw err
            res.json(collection)
        })
    }
 
    //Close Thread
    
    //Add Upvote

    //Remove Upvote

    //Delete Thread
}