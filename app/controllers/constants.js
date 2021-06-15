// External modules
const fetch = require("node-fetch");

// Internal modules
const db = require("../models/index");
const UserRole = db.initModels.user_role;
const UserStatus = db.initModels.user_status;
const apiResponse = require("../utils/utils").apiResponse;

exports.loadConstants = async () => {
    try {
        const user_role = await UserRole.findAll({
            attributes: ["id", "name"],
            raw: true
        });

        const user_status = await UserStatus.findAll({
            attributes: ["id", "name"],
            raw: true
        });

        return { user_role: user_role, user_status: user_status }

    } catch (err) {
        console.log(err);
    }
}

exports.getConstants = async (req, res) => {
    try {
        const user_role = await UserRole.findAll({
            attributes: ["id", "name"],
            raw: true
        });

        const user_status = await UserStatus.findAll({
            attributes: ["id", "name"],
            raw: true
        });

        const data = {
            user_role: user_role,
            user_status: user_status
        }

        res.status(200).json(
            apiResponse({
                message: "Constants fetched correctly.",
                data: data
            })
        );
    } catch (err) {
        res.status(500).json(
            apiResponse({
                message: "An error occurred."
            })
        );
    }        
}
