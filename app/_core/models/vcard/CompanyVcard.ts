import VcardModel from "./VcardModel";
import { AdressVcard } from "./VcardParts";

export default class CompanyVcard extends VcardModel {
    public adress: AdressVcard;

    constructor(vinfo: string | null = null) {
        super(vinfo);

        if (vinfo === null) {
            this.adress = new AdressVcard("", "", "", "", "", "", "");
        } else {
            const vinfoObj = JSON.parse((typeof vinfo) == "string" ? vinfo :JSON.stringify(vinfo));
            this.adress = new AdressVcard(
                vinfoObj.adress.type,
                vinfoObj.adress.text,
                vinfoObj.adress.street,
                vinfoObj.adress.country,
                vinfoObj.adress.code,
                vinfoObj.adress.region,
                vinfoObj.adress.locality,
            );
        }
    }

    addAdress(adress: AdressVcard): void {
        this.adress = adress;
    }
}
