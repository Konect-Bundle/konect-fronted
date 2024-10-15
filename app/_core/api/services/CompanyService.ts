import { serialize } from "object-to-formdata";
import Company from "../../models/Company";
import CompanyMember from "../../models/CompanyMember";
import { fetchData } from "../functions";
import { User } from "../../models/User";
import { formatNumber } from "../../utils/functions";

export class CompanyService {
    static buildObjectParser(data: any): Company {
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
                var user: User = new User();
                user.uuid = member.user.uuid;
                user.name = member.user.name;
                user.firstname = member.user.firstname;
                user.email = member.user.email;
                user.vinfo = member.user.vinfo;
                user.vconfig = member.user.vconfig;
                user.profile_photo_url = member.user.profile_photo_path;
                user.konects_count = member.user.konects_count;
                user.referal_code = member.user.referal_code;
                user.points = formatNumber(member.user.kpoint);
                return new CompanyMember(
                    member.created_at,
                    member.company_email,
                    member.uuid,
                    member.role,
                    member.phone_ext,
                    member.active,
                    member.request_status,
                    user,
                );
            }),
        );
        // console.log(company);
        return company;
    }
    static async getCompanies(token: string) {
        return await fetchData("/api/company", null, {}, "GET", token);
    }
    static async addCompany(email: string, name: string, token: string) {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("name", name);

        return await fetchData("/api/company", formData, {}, "POST", token);
    }

    static async updateUserInfo(
        company_email: string,
        phone_ext: string,
        role: string,
        memeberUid: string,
        token: string,
    ) {
        const formData = new FormData();
        formData.append("company_email", company_email);
        formData.append("phone_ext", phone_ext);
        formData.append("role", role);

        return await fetchData(
            "/api/company-member/" + memeberUid,
            formData,
            {},
            "PATCH",
            token,
        );
    }

    static async invitePeople(
        userUids: Array<string>,
        companyUid: string,
        token: string,
    ) {
        return await fetchData(
            "/api/company-member",
            serialize({
                userUids: userUids,
                companyUid: companyUid,
            }),
            {},
            "POST",
            token,
        );
    }

    static async invitationFeed(
        request_status: boolean,
        memberUid: string,
        // token: string,
    ) {
        return await fetchData(
            "/api/company-member/invitation/" + memberUid,
            serialize({
                request_status: request_status,
            }),
            {},
            "PATCH",
            // token,
        );
    }
}
