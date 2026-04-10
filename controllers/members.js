const memberModel = require("../models/members");
const memberController = {};


memberController.getAll = async (req, res) => {
    try {
        const members = await memberModel.find({});
        res.status(200).json(members);
    } catch {
        res.status(500).json({ error: "Failed to get authors" });
    }
};


memberController.get = async (req, res) => {
    try {
        const member = await memberModel.findById(req.params.id);

        if (!member) {
            return res.status(404).json({ error: "Member not found" });
        }

        res.status(200).json(member);
    } catch {
        res.status(500).json({ error: "Failed to get member" });
    }
};


memberController.create = async (req, res) => {
    try {
        const member = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
            status: req.body.status,
            role: req.body.role
        };

        const result = await memberModel.create(member);
        res.status(201).json(result);
    } catch {
        res.status(500).json({ error: "Failed to create member" });
    }
};


memberController.update = async (req, res) => {
    try {
        const updatedMember = await memberModel.findByIdAndUpdate(
            req.params.id,
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password,
                status: req.body.status,
                role: req.body.role
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedMember) {
            return res.status(404).json({ error: "Member not found" });
        }

        res.status(200).json(updatedMember);
    } catch {
        res.status(500).json({ error: "Failed to update member" });
    }
};

memberController.delete = async (req, res) => {
    try {
        const result = await memberModel.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ error: "Member not found" });
        }

        res.status(200).json({msg: "Member deleted successfully."});
    } catch {
        res.status(500).json({ error: "Failed to delete member" });
    }
};

module.exports = memberController;

