import Users from "../models/UserModel.js";
import UserLevels from "../models/UserLevelModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        
        Users.belongsTo(UserLevels,{foreignKey: 'user_level'});
        UserLevels.hasMany(Users,{foreignKey : 'id'});
        const user = await Users.findAll({
            where:{
                refresh_token:refreshToken
            },
            include:[UserLevels]
        });

        if(!user[0]) return res.sendStatus(403);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);

            const userId = user[0].id;
            const nama = user[0].nama;
            const email = user[0].email;
            const userLevel = user[0].UserLevel.nama;
            const accessToken = jwt.sign({userId, nama, email, userLevel}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });
            res.json({accessToken});
        })
    } catch (error) {
        console.log(error);
    }
}