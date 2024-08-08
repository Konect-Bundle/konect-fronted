import Header from "@/app/_components/Common/Headers/Header";
import ContainerLayout from "@/app/_components/Layouts/Container";
import { PaymentService } from "@/app/_core/api/services/PaymentService";
import { TbCircleCheckFilled } from "react-icons/tb";
import { cookies } from "next/headers";
import { AUTH_TOKEN_NAME } from "@/app/_core/config/constants";
import ConfettiLayout from "@/app/_components/Layouts/ConfettiLayout";

export interface IPaymentSuccessPageProps {}

export default async function PaymentSuccessPage({
    params,
}: {
    params: { order: string };
}) {
    const cookieStore = cookies();
    const token: string = cookieStore.get(AUTH_TOKEN_NAME)!.value;

    const order = await PaymentService.retreiveSuccessPayment(
        params.order,
        token,
    );
    // console.log(order, token, "K");

    return (
        <ConfettiLayout className="h-screen">
            <Header />
            <ContainerLayout className="flex space-y-2 flex-col items-center pt-8 mb-2">
                <TbCircleCheckFilled className="text-green-600 text-7xl" />
                <h2 className="md:text-4xl text-3xl font-bold">
                    Paiement effectué
                </h2>
                <p className="text-gray-300 text-center">
                    Vos achat a bien été effetué
                </p>
            </ContainerLayout>
        </ConfettiLayout>
    );
}
