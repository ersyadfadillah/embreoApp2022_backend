import Proposals from "../models/ProposalModel.js";
import Users from "../models/UserModel.js";

export const getAllMonitoring = async (req, res) => {
    try {
        Proposals.belongsTo(Users,{foreignKey: 'update_by'})
        Users.hasMany(Proposals,{foreignKey : 'id'});
        const monitoring = await Proposals.findAll({
            include:[Users]
        });
        res.json(monitoring);
    } catch (error) {
        res.json({message: error.message});
    }
}

export const getProposalById = async (req, res) => {
    try {
        const proposal = await Proposals.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(proposal[0]);
    } catch (error) {
        res.json({message: error.message});
    }
}

export const createProposal = async (req, res) => {
    try {
        await Proposals.create(req.body);
        res.json({
            "message": "berhasil menambahkan proposal baru"
        });
    } catch (error) {
        res.json({message: error.message});
    }
}

export const updateProposal = async (req, res) => {
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

export const deleteProposal = async (req, res) => {
    try {
        await Proposals.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "hapus proposal oke"
        });
    } catch (error) {
        res.json({message: error.message});
    }
}