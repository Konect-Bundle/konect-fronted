import Company from "../../models/Company";
import CompanyMember from "../../models/CompanyMember";
import { fetchData } from "../functions";

export class CompanyService {
    static buildObjectParser(data: any) : Company {
        var company: Company = new Company(
            new Date(data.created_at),
            data.uuid,
            data.name,
            data.email,
            data.industry,
            data.tax_id,
            data.website,
            data.brand_logo_path,
            data.address,
            data.city,
            data.country,
            data.description,
            data.videos,
            data.social_profiles,
            data.members.map((member: any) => {
                return new CompanyMember(
                    member.created_at,
                    member.email,
                    member.role,
                    member.phone_ext,
                    member.active,
                    member.request_status,
                    member.user,
                );
            }),
        );
        // console.log(company);
        return company;
    }
    static async getCompanies(
        token: string,
    ) {

        return await fetchData(
            "/api/company",
            null,
            {},
            "GET",
            token,
        );
    }
    static async addCompany(
        email: string,
        name: string,
        token: string,
    ) {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("name", name);

        return await fetchData(
            "/api/company",
            formData,
            {},
            "POST",
            token,
        );
    }

    static async invitePeople(
        usersId: Array<number>,
        companyUid: string,
        token: string,
    ) {
        const formData = new FormData();
        formData.append("usersId", JSON.stringify(usersId));
        formData.append("companyUid", companyUid);

        return await fetchData(
            "/api/company-member",
            formData,
            {},
            "POST",
            token);
    }

    static async invitationFeed(
        request_status: boolean,
        memberUid: string,
        token: string,
    ) {
        const formData = new FormData();
        formData.append("request_status", JSON.stringify(request_status));

        return await fetchData(
            "/api/company-member/" + memberUid,
            formData,
            {},
            "PATCH",
            token);
    }
}