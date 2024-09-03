function get(req, res){
    try {
  
    try {
        if (req.body.amount && req.body.categories && req.body.amount >= 1) {

            console.log(database)


            let returnPacket = [];


            let count = req.body.amount;

            if (database.length < req.body.amount) {
                count = database.length;
            }


            for (let i = 0; i < count; i++) {

                let appender = {
                  
                }
                let elementofDB = database[i];

                returnPacket.push(appender);
            }



            console.clear()


            res.status(200).send(returnPacket).json()

        }
    } catch {
        goto(nepravilno);
    }
} catch {
    res.status(500).send("server issue")
}
}


module.exports = {get}