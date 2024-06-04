import axios from "axios";
import config from "../env.config.js";

const { USER_HISTORY_SERVICE_URL } = config;
const url = `${USER_HISTORY_SERVICE_URL}/register`;

const registerEvent = async (userId, action, content) => {
    try {
        const response = await axios.post(url, {
            userId,
            action,
            content
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 500) {
            throw new Error(`code ${response.status}: ${response.error}`);
        }

        console.log(`! Action registered for user #${userId}: ${action} => ${content}`);

        return true;
    } catch (error) {
        console.error(`usersHistoryServiceURL request:`, error);
        return false;
    }
};

export default registerEvent;