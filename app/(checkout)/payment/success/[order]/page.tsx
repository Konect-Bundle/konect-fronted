export interface IPaymentSuccessPageProps {
}

export default function PaymentSuccessPage({ params }: { params: { order: string } }) {
    return (
        <>
            Success Order: {params.order}
        </>
    );
}
