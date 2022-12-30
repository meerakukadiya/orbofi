const userModel  = require('../../models/users');
const jwt = require("jsonwebtoken");
const envv = require("dotenv").config();
const key  =   process.env.TOKEN_KEY;
const loginTokenModel = require('../../models/logintoken');
const validator  = require('../../validations/validator');
const {sentMail} = require('../../services/mail');

// const mail = sentMail(fromMail, toMail)

//User Registration
const register = async(request , response ) => {
    try{

        const
        {
           name,
           email,
           mobile_no,
           user_type
        } = request.body;


        if (!validator.isValid(name)) {
            return response
                .status(200)
                .send({ status: false, message: "please provide valid name" });
        }

        if (!validator.isValid(email)) {
            return response
                .status(200)
                .send({ status: false, message: "please provide valid email" });
        }

        if (!validator.isValid(mobile_no)) {
            return response
                .status(200)
                .send({ status: false, message: "please provide valid mobile_no" });
        }

        if (!validator.isValid(user_type)) {
            return response
                .status(200)
                .send({ status: false, message: "please  provide valid user type" });
        }

         // Validate user input
    // if (!(email && password && first_name && last_name)) {
    //     res.status(400).send("All input is required");
    //   }

        const saveData = {
            name : name,
            email : email,
            mobile_no : mobile_no,
            user_type : user_type
        }

        const createUser = await userModel.create(saveData);
        if(createUser)
        {
            return response.status(200).send({status : true , message : "Your Registration Account Successfully" , data : createUser})
        }
        else
        {
            return response.status(200).send({status : false , message : "Your Registration Account Creating Error" , data : null})
        }
    }catch(error)
    {
        console.log({ error : error})
        return response.status(500).send({status : false , message :error.message , data : null})
    }
}

//User Login
const login = async(request , response) =>{
    try{

        const{
            mobile_no,
            user_type
        } = request.body;

          if (!(mobile_no && user_type )) {
            return response.status(400).send({status : false , message :"All input is required",data:null});
      }
        
        const findUser = await userModel.findOne({mobile_no  :mobile_no })
        if(!findUser)
        {
              return response.status(200).send({status : false , message : "User Does Not Exist",data:null})
        }
       
        //Token Generate
        const token = jwt.sign(
            {
                userId: findUser._id,
                expiresIn: '365d'  //setting token expiry time limit.
            },
            key
        )

        //Add Login Token Data
        const saveData = {
            userId : findUser._id,
            token : token,
            user_type : user_type
        }

        const createLoginToken = await loginTokenModel.create(saveData);
        if(createLoginToken)
        {
            const data = {
                name : findUser.name,
                mobile_no : findUser.mobile_no,
                user_type : findUser.user_type,
                token : createLoginToken.token
            }
            return response.status(200).send({status : true , message :"Login Successfully", data : data})
        }
        else
        {
            return response.status(200).send({status : false , message :"Login Error", data : null})
        }
       

    }catch(error)
    {
        console.log({ error : error})
        return response.status(500).send({status : false , message :error.message , data : null})
    }
}

//Verify Otp
const verifyOtp = async(request , response) => {
      try{

      }catch(error)
      {
        return response.status(500).send({status : false , message :error.message , data : null})
      }
}

//Update Profile
const updateProfile = async(request , response) => {
    try{

    }catch(error)
    {
      return response.status(500).send({status : false , message :error.message , data : null})
    }
}

const loginWithGoogle = async(request , response) => {
    try{

    }catch(error)
    {
        return response.status(500).send({status : false , message :error.message , data : null})
    }
}

module.exports = {
    register,
    login,
    verifyOtp,updateProfile,loginWithGoogle
}