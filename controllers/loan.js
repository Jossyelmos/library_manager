const loanModel = require("../models/loan");

const loanController = {};


loanController.getAll = async (req, res) => {
    try {
        const loans = await loanModel.find({});
        res.status(200).json(loans);
    } catch {
        res.status(500).json({ error: "Failed to get loans" });
    }
};


loanController.get = async (req, res) => {
    try {
        const loan = await loanModel.findById(req.params.id);

        if (!loan) {
            return res.status(404).json({ error: "Loan not found" });
        }

        res.status(200).json(loan);
    } catch {
        res.status(500).json({ error: "Failed to get loan" });
    }
};



loanController.create = async (req, res) => {
    try {
        const loan = {
            memberId: req.body.memberId,
            bookId: req.body.bookId,
            loanDate: req.body.loanDate,
            dueDate: req.body.dueDate,
            returnDate: req.body.returnDate,
            status: req.body.status
        };

        const result = await loanModel.create(loan);
        res.status(201).json(result);
    } catch {
        res.status(500).json({ error: "Failed to create loan" });
    }
};


loanController.update = async (req, res) => {
    try {
        const updatedLoan = await loanModel.findByIdAndUpdate(
            req.params.id,
            {
                memberId: req.body.memberId,
                bookId: req.body.bookId,
                loanDate: req.body.loanDate,
                dueDate: req.body.dueDate,
                returnDate: req.body.returnDate,
                status: req.body.status
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedLoan) {
            return res.status(404).json({ error: "Loan not found" });
        }

        res.status(200).json(updatedLoan);
    } catch {
        res.status(500).json({ error: "Failed to update loan" });
    }
};


loanController.delete = async (req, res) => {
    try {
        const result = await loanModel.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ error: "Loan not found" });
        }

        res.status(200).json({MSG: "Loan deleted successfully"});
    } catch {
        res.status(500).json({ error: "Failed to delete loan" });
    }
};


module.exports = loanController;