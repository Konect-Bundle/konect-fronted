import { fetchData } from "@/app/_core/api/functions";

export class AppSPAService {
    static async login() {
        return await fetchData("/sanctum/csrf-cookie");
    }
}
