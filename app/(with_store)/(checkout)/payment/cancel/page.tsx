import Header from "@/app/_components/Common/Headers/Header";
import ContainerLayout from "@/app/_components/Layouts/Container";
import { TbCircleCheckFilled } from "react-icons/tb";

export interface IPaymentCancelPageProps {}

export default function PaymentCancelPage(props: IPaymentCancelPageProps) {
    return (
        <div className='h-screen'>
            <Header />
            <ContainerLayout className='flex space-y-2 flex-col items-center pt-8 mb-2'>
                <TbCircleCheckFilled className='text-green-600 text-7xl' />
                <h2 className='md:text-4xl text-3xl font-bold'>
                    Transaction annulée
                </h2>
                <p className='text-gray-300 text-center'>
                    Vous avez annulé votre transaction avec succès
                </p>
            </ContainerLayout>
        </div>
    );
}
