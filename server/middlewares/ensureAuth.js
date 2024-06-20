export const ensureAuthentication = (req, res, next) => {
  try {
    if (req.session && req.session.userId) {
      return next();
    }
  } catch (err) {
    return res.status(403).json({ message: err });
  }
  // const token = req.cookies.token
  // console.log(req.cookies)
  // if(!token){
  //     return res.status(403).json({message: 'Token is required'})
  // }
  // try {
  //     const decoded = jwt.verify(token, process.env.SERVER_SECRET)
  //     req.user = decoded
  //     return next()
  // } catch (err) {
  //     return res.status(403).json({message: 'Token is expired'})

  // }
};
