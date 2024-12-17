import VcardModel from "./VcardModel";
import { PhoneVcard } from "./VcardParts";

export default class UserVcard extends VcardModel {
    public phones: PhoneVcard[] = [];
    //   public work: WorkVcard;

    constructor(vinfo: string | null = null) {
        super(vinfo);

        if (vinfo === null) {
            this.phones = [new PhoneVcard("personal", "")];
            //   this.work = new WorkVcard("", "");
        } else {
            const vinfoObj = JSON.parse(
                typeof vinfo == "string" ? vinfo : JSON.stringify(vinfo),
            );
            if (Array.isArray(vinfoObj.phone)) {
                for (let i = 0; i < vinfoObj.phone.length; i++) {
                    const phone = vinfoObj.phone[i];
                    this.phones.push(new PhoneVcard(phone.type, phone.text));
                }
            } else if (typeof vinfoObj.phone === "object") {
                this.phones.push(vinfoObj.phone);
            }
        }
    }

    addPhone(phone: PhoneVcard): void {
        this.phones.push(phone);
    }
}
