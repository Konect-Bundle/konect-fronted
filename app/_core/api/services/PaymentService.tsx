import {SERVER_API_URL} from "../constants";
import {serialize} from "object-to-formdata";

export class PaymentService {

    static async makePayment(kGadgetCode: string, givenName: string, familyName: string, companyName: string, qteValue: number) {
        const
            res = await fetch(SERVER_API_URL + "/payment/paypal/" + kGadgetCode, {
                method: "POST",
                body: serialize({
                    "givenName": givenName,
                    "familyName": familyName,
                    "companyName": companyName,
                    "qteValue": qteValue
                }),
                cache: 'force-cache'
            })

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error(
                'Failed to fetch data'
            )
        }

        return res.json()
    }

}
