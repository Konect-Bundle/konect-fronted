/*
 === Part for User Vcard ===
 */
export class PhoneVcard {
    constructor(
        public type: string,
        public text: string,
    ) {}
}

export class WorkVcard {
    constructor(
        public type: string,
        public text: string,
    ) {}
}

/*
 === Part for Company Vcard ===
 */
export class AdressVcard {
    constructor(
        public type: string,
        public text: string,
        public street: string,
        public country: string,
        public code: string,
        public region: string,
        public locality: string,
    ) {}
}

export class NameVcard {
    constructor(
        public givenName: string,
        public familyName: string,
        public middleName: string,
        public prefix: string,
        public suffix: string,
    ) {}
}

export class EmailVcard {
    constructor(
        public type: string,
        public text: string,
    ) {}
}

export class SocialVcardItem {
    constructor(
        public uri: string,
        public type?: string,
    ) {}
}

export class SocialVcardItemAll {
    constructor(
        public facebook: SocialVcardItem,
        public instagram: SocialVcardItem,
        public twitter: SocialVcardItem,
        public youtube: SocialVcardItem,
        public tiktok: SocialVcardItem,
        public linkedin: SocialVcardItem,
    ) {}
}

export class NoteVcard {
    constructor(public text: string) {}
}

export class LocationVcard {
    constructor(
        public ip?: string,
        public iso_code?: string,
        public country?: string,
        public city?: string,
        public state?: string,
        public state_name?: string,
        public postal_code?: string,
        public lat?: number,
        public lon?: number,
        public timezone?: string,
        public continent?: string,
        public currency?: string,
        public deFault?: string,
    ) {}
}

export class UrlVcard {
    constructor(
        public type: string,
        public uri: string,
    ) {}
}

export class VideoLinkVcard {
    constructor(
        public type: string,
        public uri: string,
    ) {}
}
