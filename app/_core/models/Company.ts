import CompanyMember from "./CompanyMember";

export default class Company {
    createdAt: Date;
    uuid: string;
    name: string;
    email: string;
    industry?: string | null;
    taxId?: string | null;
    website?: string | null;
    brandLogoImg?: string | null;
    address?: string | null;
    city?: string | null;
    country?: string | null;
    description?: string | null;
    videos?: string | null;
    socialProfiles?: string | null;
    members?: Array<CompanyMember>;

    constructor(
        createdAt: Date,
        uuid: string,
        name: string,
        email: string,
        industry: string | null = null,
        taxId: string | null = null,
        website: string | null = null,
        brandLogoImg: string | null = null,
        address: string | null = null,
        city: string | null = null,
        country: string | null = null,
        description: string | null = null,
        videos: string | null = null,
        socialProfiles: string | null = null,
        members?: Array<CompanyMember>,
    ) {
        this.createdAt = createdAt;
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.industry = industry;
        this.taxId = taxId;
        this.website = website;
        this.brandLogoImg = brandLogoImg;
        this.address = address;
        this.city = city;
        this.country = country;
        this.description = description;
        this.videos = videos;
        this.socialProfiles = socialProfiles;
        this.members = members;
    }
}
