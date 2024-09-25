
import SpaceLayout from "@/app/_components/Layouts/SpaceLayout";


export interface SpaceSubRootLayoutProps { }

export default function SpaceSubRootLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { slug: string };
}) {    
    console.log(params);
    return (
        <>
            <SpaceLayout slug={params.slug}>
                {children}
            </SpaceLayout>
        </>
    );
}
