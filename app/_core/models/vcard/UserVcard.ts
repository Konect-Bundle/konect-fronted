import VcardModel from "./VcardModel";
import { PhoneVcard } from "./VcardParts";

export default class UserVcard extends VcardModel {
    public phone: PhoneVcard;
    //   public work: WorkVcard;

    constructor(vinfo: string | null = null) {
        super(vinfo);

        if (vinfo === null) {
            this.phone = new PhoneVcard("", "");
            //   this.work = new WorkVcard("", "");
        } else {
            const vinfoObj = JSON.parse(
                typeof vinfo == "string" ? vinfo : JSON.stringify(vinfo),
            );
            this.phone = new PhoneVcard(
                vinfoObj.phone.type,
                vinfoObj.phone.text,
            );
            //   this.work = new WorkVcard(vinfoObj.works.type, vinfoObj.works.text);
        }
    }

    addPhone(phone: PhoneVcard): void {
        this.phone = phone;
    }

    //   addWork(work: WorkVcard): void {
    //     this.work = work;
    //   }
}
