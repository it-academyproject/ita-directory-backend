// External modules
const fetch = require("node-fetch");

// Internal modules
const db = require("../models/index");
const UserRole = db.initModels.user_role;
const UserStatus = db.initModels.user_status;
const apiResponse = require("../utils/utils").apiResponse

exports.getConstants = async (req, res) => {
    if (!global.CONSTANTS) {
        try {
            const user_role = await UserRole.findAll({
                attributes: ["id", "name"]
            });
    
            const user_status = await UserStatus.findAll({
                attributes: ["id", "name"]
            });
    
            global.CONSTANTS = { 
                user_role: user_role[0].dataValues, 
                user_status: user_status[0].dataValues 
            };

            res.status(200).json(
                apiResponse({
                    message: "Constants fetched correctly."
                })
            );
        } catch (err) {
            res.status(500).json(
                apiResponse({
                    message: "An error occurred."
                })
            );
        }        
    } else {
        try {
            res.status(200).json(
                apiResponse({
                    message: "Constants already fetched."
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
}
