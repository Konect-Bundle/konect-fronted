import { User } from "./User";

export default class CompanyMember {
    createdAt: Date;
    companyEmail: string | null;
    uuid: string;
    role: string | null;
    phoneExt: string | null;
    active: number;
    requestStatus?: string;
    user?: User; // Ajoute ici le type ou la structure appropriée pour l'utilisateur si nécessaire

    constructor(
        createdAt: Date,
        companyEmail: string | null = null,
        uuid: string,
        role: string | null = null,
        phoneExt: string | null = null,
        active: number = 1,
        requestStatus?: string ,
        user?: User // Ajuste selon la structure de l'utilisateur
    ) {
        this.createdAt = createdAt;
        this.companyEmail = companyEmail;
        this.uuid = uuid;
        this.role = role;
        this.phoneExt = phoneExt;
        this.active = active;
        this.requestStatus = requestStatus;
        this.user = user;
        this.user!.vinfo= JSON.parse(user?.vinfo!);
        this.user!.vconfig= JSON.parse(user?.vconfig!);

    }
}