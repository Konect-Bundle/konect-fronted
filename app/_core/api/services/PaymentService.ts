import { SERVER_API_URL } from "../constants";
import { serialize } from "object-to-formdata";
import { fetchData } from "@/app/_core/api/functions";
import { dataURLToFile } from "../../utils/functions";

export class PaymentService {
    static async makePayment(
        file: File | string | null,
        kGadgetCode: string,
        givenName: string,
        familyName: string,
        companyName: string,
        qteValue: number,
        token: string,
        fileName?: string,
    ) {
        const formData = new FormData();
        formData.append("givenName", givenName);
        formData.append("familyName", familyName);
        formData.append("companyName", companyName);
        formData.append("qteValue", qteValue.toString());

        if (file) {
            var currentFile: File | string | null = file;
            if (typeof file == "string") {
                currentFile = dataURLToFile(file, fileName!);
            }
            formData.append("img", currentFile);
        }
        return await fetchData(
            "/api/payment/" + kGadgetCode,
            formData,
            {},
            "POST",
            token,
            true,
        );
    }

    static async retreiveSuccessPayment(idSession: string, token: string) {
        return await fetchData(
            "/api/payment/success/" + idSession,
            {},
            {},
            "GET",
            token,
        );
    }
}
