import { SERVER_API_URL } from "../constants";
import { serialize } from "object-to-formdata";
import { fetchData } from "@/app/_core/api/functions";

export class PaymentService {
    static async makePayment(
        file: File | null,
        kGadgetCode: string,
        givenName: string,
        familyName: string,
        companyName: string,
        qteValue: number,
        token: string,
    ) {
        const formData = new FormData();
        formData.append("givenName", givenName);
        formData.append("familyName", familyName);
        formData.append("companyName", companyName);
        formData.append("qteValue", qteValue.toString());

        if (file) {
            formData.append("img", file);
        }
        return await fetchData(
            "/api/payment/stripe/" + kGadgetCode,
            formData,
            {},
            "POST",
            token,
            true,
        );
    }

    static async retreiveSuccessPayment(idSession: string, token: string) {
        return await fetchData(
            "/api/payment/stripe/success?session_id=" + idSession,
            {},
            {},
            "GET",
            token,
        );
    }
}
