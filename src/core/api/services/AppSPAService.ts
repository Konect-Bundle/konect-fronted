import { fetchData } from "@/core/api/functions";

export class AppSPAService {
    static async login() {
        return await fetchData("/sanctum/csrf-cookie");
    }
}
