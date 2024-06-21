import {SERVER_API_URL} from "../constants";
import {serialize} from "object-to-formdata";
import {fetchData} from "@/app/_core/api/functions";

export class PaymentService {

    static async makePayment(kGadgetCode: string, givenName: string, familyName: string, companyName: string, qteValue: number) {
        return await fetchData("/api/payment/stripe/" + kGadgetCode, serialize({
            "givenName": givenName,
            "familyName": familyName,
            "companyName": companyName,
            "qteValue": qteValue
        }), {}, "POST")


    }

}
