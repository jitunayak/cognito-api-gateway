"use strict";

module.exports.open = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: "Go Serverless v3.0! No Auth! Your function executed successfully!",
                input: event,
            },
            null,
            2
        ),
    };

};
