import Users from "../models/UserModel.js";
import UserLevels from "../models/UserLevelModel.js";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
    try {
        Users.belongsTo(UserLevels,{foreignKey: 'user_level'});
        UserLevels.hasMany(Users,{foreignKey : 'id'});
        const users = await Users.findAll({
            attributes: ['id', 'nama', 'email', 'user_level'],
            include:[UserLevels]
        });
        res.json(users);
    } catch (error) {
        console.log(error);        
    }
}

export const getUserLevels = async (req, res) => {
    try {
        const userlevels = await UserLevels.findAll({
            attributes: ['id', 'nama'],
        });
        res.json(userlevels);
    } catch (error) {
        console.log(error);        
    }
}

export const Login = async (req, res) => {
    try {
        Users.belongsTo(UserLevels,{foreignKey: 'user_level'});
        UserLevels.hasMany(Users,{foreignKey : 'id'});
        const user = await Users.findAll({
            where:{
                email: req.body.email
            },
            include:[UserLevels]
        });

        if(req.body.password!=user[0].password) return res.status(400).json({msg: "password salah, coba lagi la"});

        const userId = user[0].id;
        const nama = user[0].nama;
        const email = user[0].email;
        const userLevel = user[0].UserLevel.nama;
        const accessToken = jwt.sign({userId, nama, email, userLevel}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });
        
        const refreshToken = jwt.sign({userId, nama, email}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await Users.update({refresh_token:refreshToken},{
            where:{
                id: userId
            }
        });
        // res.json('okedf');
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24*60*60*1000
        });
        res.json({accessToken});
    } catch (error) {
        res.status(404).json({msg: "email gak terdaftar"});
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token:refreshToken
        }
    });

    if(!user[0]) return res.sendStatus(204);

    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where: {
            id: userId
        }
    });

    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}