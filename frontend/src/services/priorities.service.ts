// ticketService.ts

import { Priority } from "../models/priority.model";

const apiUrl = "https://localhost:7277/api/Priorities";

export const getPriorities = async (): Promise<{data: Priority[]}> => {
    try {
        const response = await fetch(apiUrl);
        return await response.json();
    } catch (error) {
        console.error("Error fetching Installed Environments:", error);
        throw error;
    }
};
