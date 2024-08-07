import VcardConfigInterface from "./vconfigInterfaces";

/*
 === Part for User Vcard ===
 */
export interface PhoneVcardInterface {
    type: string;
    text: string;
}

// export interface WorkVcardInterface {
//     type: string;
//     text: string;
// }
/*
 === Part for Company Vcard ===
 */
export interface AddressVcardInterface {
    type: string;
    text: string;
    street: string;
    country: string;
    code: string;
    region: string;
    locality: string;
}

export interface NameVcardInterface {
    givenName: string;
    familyName: string;
    middleName: string;
    prefix: string;
    suffix: string;
}

export interface EmailVcardInterface {
    type: string;
    text: string;
}

export interface SocialVcardItemInterface {
    uri: string;
    type?: string;
}

export interface SocialVcardItemAllInterface {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    tiktok: string;
    linkedin: string;
}

export interface NoteVcardInterface {
    text: string;
}

export interface LocationVcardInterface {
    ip?: string;
    iso_code?: string;
    country?: string;
    city?: string;
    state?: string;
    state_name?: string;
    postal_code?: string;
    lat?: number;
    lon?: number;
    timezone?: string;
    continent?: string;
    currency?: string;
    deFault?: string;
}

export interface UrlVcardInterface {
    type: string;
    uri: string;
}

export interface VideoLinkVcardInterface {
    type: string;
    uri: string;
}

export interface UserVcardInterface {
    names: NameVcardInterface;
    email: EmailVcardInterface;
    socialProfils: SocialVcardItemAllInterface;
    urls: UrlVcardInterface[];
    videoLinks: VideoLinkVcardInterface[];
    note: NoteVcardInterface;
    config: VcardConfigInterface;
    // work: WorkVcardInterface;
    location: LocationVcardInterface;
    phone: PhoneVcardInterface;
}
