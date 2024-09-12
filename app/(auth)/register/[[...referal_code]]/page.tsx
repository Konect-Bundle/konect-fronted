import RegisterFormPage from "@/app/_components/Views/RegisterFormPage";
export default function Page({
    params,
}: {
    params: { referal_code: string[] };
}) {
    return (
        <div>
            <RegisterFormPage
                referal_code={
                    params.referal_code
                        ? (params.referal_code[0] as string)
                        : null
                }
            />
        </div>
    );
}
