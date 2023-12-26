import UserModals from "../Modals/User.modals.js"
import bcrypt from 'bcrypt';
import Jwt  from "jsonwebtoken";

export const Login = async (req , res) => {
    // res.send("Hello from login")
    try{
        const {email , password} = req.body.data
        // console.log(email , password , "email,opas")
        if(!email || !password ) return res.status(401).json({success : false , message : "All Fields are Mandatory"})

        const user = await UserModals.findOne({email})
        // console.log(user)
        if(!user) return res.status(401).json({success : false , message : "Email Not Found"})

        const isPasswordCorrect = await bcrypt.compare(password , user.password)

        if(!isPasswordCorrect){
            return res.status(401).json({success : false ,message : "Password not matched"})
        }
        //generate token
        const token = await Jwt.sign({id : user._id}, process.env.JWT_SECRET)
        // console.log(token)

        return res.status(200).json({success : true , message : `Login Successfull, Welcome ${user.name} ` , user : {name : user.name , id : user._id} , token})

    }catch(error){
        res.status(500).json({success : false , message : error.message})
    }
}

export const Register = async (req , res) => {
    // res.send("Hello from register")
    try{
        const {name , email , password} = req.body.data

        if(!name || !email || !password) return res.status(401).json({success : false , message : "All fields are mandatory"})

        const existingUser = await UserModals.findOne({email : email})

        if(existingUser) return res.status(401).json({success : false , message : "Email Already Exist"})

        const hashedPassword = await bcrypt.hash(password , 10); 

        // console.log(hashedPassword);

        const user = new UserModals({
            name : name,
            email,
            password : hashedPassword
        })

        await user.save();

        return res.status(201).json({success : true , message : "Registration successfull"})

    }catch(error){
        res.status(500).json({success : false , message : error.message})
    }
}

export const getCurrentUser = async (req , res) => {
    try{
        console.log("Called")
        const {token} = req.body
        if(!token) return res.status(401).json({success : false , message : "token is required"})

        const {id} = await Jwt.verify(token , process.env.JWT_SECRET)
        console.log(id , 'id')

        const user = await UserModals.findById(id)
        if(!id) return res.status(401).json({success : false , message : "user not found"})

        return res.status(201).json({success : true , user : {name : user.name , id : user._id}})

    }catch(error){
        res.status(500).json({success : false , message : error.message })
    }
}