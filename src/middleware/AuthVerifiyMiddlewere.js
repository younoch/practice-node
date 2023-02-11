var jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    let Token = req.headers['token-key']
    jwt.verify(Token, "nawaNoor", (err, decoded) => {
        if (err) {
            res.status(401).json({status: "unauthorized", data: err})
        } else {
            //Get user name decoded token and add with decoded token
            let UserName = decoded['data']['UserName']
            req.headers.username = UserName;
            next()
        }
    })
}