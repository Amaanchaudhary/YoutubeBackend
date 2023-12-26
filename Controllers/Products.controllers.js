export const addProduct = async (req , res) => {
    // res.send("Hello from register")
    try{
        const {name , email , password} = req.body.product

        if(!name || !email || !password) return res.status(401).json({success : false , message : "All fields are mandatory"})

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