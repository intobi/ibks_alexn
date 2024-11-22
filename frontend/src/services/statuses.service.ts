import { Status } from "../models/status.model";

const apiUrl = "https://localhost:7277/api/Statuses";

export const getStatuses = async (): Promise<{data: Status[]}> => {
    try {
        const response = await fetch(apiUrl);
        return await response.json();
    } catch (error) {
        console.error("Error fetching Statuses:", error);
        throw error;
    }
};
