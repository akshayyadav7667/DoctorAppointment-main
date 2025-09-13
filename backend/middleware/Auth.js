
import jwt from 'jsonwebtoken'

export  const ProtectedAuth=async(req,res,next)=>{
    try {

        const token= req.headers.authorization.split(" ")[1];
        
         if(!token)
        {
            return res.json({message:"Not Authorized Login Again "})
        }

        const decodedToken= jwt.verify(token,process.env.JWT_SECRET);

        // console.log(decodedToken)

        req.user= decodedToken;

        // console.log(req.user)
        
        next();

    } catch (error) {
         console.log(error);
        res.json({message:error.message})
    }
}


export const authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        // console.log(req.user);
        if(!roles.includes(req.user.role))
        {
            return res.status(403).json({message:"Access Denied "});
        }
        next();
    }
}


export const isAdmin=(req,res,next)=>{
    if(req.user?.role!=='admin')
    {
        return res.status(403).json({message:"Access denied : Admin Only."})
    }
    next();
}