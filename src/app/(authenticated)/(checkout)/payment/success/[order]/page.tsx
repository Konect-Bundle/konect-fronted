import { PaymentService } from "@/core/api/services/PaymentService";
import { AUTH_TOKEN_NAME } from "@/core/config/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CancelClient from "./client";
import { homeRoute } from "@/core/config/routes";

export interface IPaymentSuccessPageProps {}

export default async function PaymentSuccessPage({
    params,
}: {
    params: { order: string };
}) {
    try {
        const cookieStore = cookies();
        const token: string = cookieStore.get(AUTH_TOKEN_NAME)!.value;

        const order = await PaymentService.retreiveSuccessPayment(
            params.order,
            token,
        );

        if (order.data.state == false) {
            redirect(homeRoute.path);
        }
        return <CancelClient />;
    } catch (error) {}
}
