function add(req,res){
        console.log("data recieved");

        try {
          
                database.push(dataBlock)
                res.status(200).send()

        
            }
      
     catch {
        res.status(500).send("server issue")
    }
}
module.exports = {add}