// ticketService.ts

import { InstalledEnvironment } from "../models/installed-environment.model";

const apiUrl = "https://localhost:7277/api/InstalledEnvironments";

export const getInstalledEnvironements = async (): Promise<{data: InstalledEnvironment[]}> => {
    try {
        const response = await fetch(apiUrl);
        return await response.json();
    } catch (error) {
        console.error("Error fetching Installed Environments:", error);
        throw error;
    }
};
