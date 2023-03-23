const handleSignin = (db, bcrypt) => (req,res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json('incorrect form submission');
    }
    db.select('email','hash').from('login')
        .where('email', '=', req.body.email)
        .then(async data => {
            const match = await bcrypt.compare(req.body.password, data[0].hash)
            if(match){
                return db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            }else{
                res.status(400).json('wrong credentials')
            }
            
        })
        .catch(err => res.status(400).json('wrong credentials'))
    
}


export {handleSignin};