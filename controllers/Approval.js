import Proposals from "../models/ProposalModel.js";
import Users from "../models/UserModel.js";

export const getAllApproval = async (req, res) => {
    try {
        Proposals.belongsTo(Users,{foreignKey: 'update_by'})
        Users.hasMany(Proposals,{foreignKey : 'id'});
        const approval = await Proposals.findAll({
            where: {
                status: 0
            },
            include:[Users]
        });
        res.json(approval);
    } catch (error) {
        res.json({message: error.message});
    }
}

export const getApprovalById = async (req, res) => {
    try {
        Proposals.belongsTo(Users,{foreignKey: 'update_by'})
        Users.hasMany(Proposals,{foreignKey : 'id'});
        const approval = await Proposals.findAll({
            where: {
                id: req.params.id
            },
            include:[Users]
        });
        res.json(approval[0]);
    } catch (error) {
        res.json({message: error.message});
    }
}

export const updateApproval = async (req, res) => {
    try {
        await Proposals.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "edit proposal oke"
        });
    } catch (error) {
        res.json({message: error.message});
    }
}
