const verifyUser = (req, res, next) => {
    if(req.session.user){
        next();
    }else{
        res.render('login', {message: 'Es necesario iniciar sesión para acceder'})
    }
}
const verifyContributor = (req, res, next) => {
    const rol = "colaborador";
    if(req.session.contributor == 1){
        next();
    }
    else{
        res.render('unauthorized',{rol});
    }
}
const verifyAdmin = (req, res, next) => {
    const rol = "administrador";
    if(req.session.admin == 1){
        next();
    }
    else{
        res.render('unauthorized',{rol});
    }
}

module.exports = {verifyUser,verifyContributor,verifyAdmin}