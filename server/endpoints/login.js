function login(req, res){
    try{
             if(req.body.uname && req.body.password){
                 if(users.find(function(user){return user.uname == req.body.uname && user.password== req.body.password})){
                     console.log(req.body.uname);
                      let token ={token:makeHash(128), id: aliveTokens.length+1}
                      aliveTokens.push({token:token.token, id:token.id, alive:true})
                      
                                 setTimeout(function() {
                                     
                                     let tokenToRemove = aliveTokens.find(function(tokens) {
                                         return tokens.id === token.id;
                                     });
                                     if(tokenToRemove.alive){
                                         tokenToRemove.alive = false;
                                         setTimeout(arguments.callee, 1000 * 5 );
                                         return;
                                     }
                                     let indexToRemove = aliveTokens.indexOf(tokenToRemove);
                                     if (indexToRemove !== -1) {
                                         aliveTokens.splice(indexToRemove, 1);
                                     }
                                     console.log("popped session")
                                 }, 1000); 
     
                      res.status(200).send(token).json();
                 }else
                 {
                     res.status(400).send("wrong");
                 }
         }else{
             res.status(500).send("bad request")
         }
         }catch(err){
            console.log(err)
            console.log("server login issue");
             res.status(500).send("server issue");
         }
}



module.exports  = {login};