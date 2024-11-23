import ReduxInitLayout from "../_components/Layouts/ReduxInit";
import StoreProvider from "../_components/Store/StoreProvider";

export default function WithStoreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ReduxInitLayout>{children}</ReduxInitLayout>;
}
