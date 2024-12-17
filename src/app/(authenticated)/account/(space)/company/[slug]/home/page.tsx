import HomeSpaceClient from "./client";

export default async function CompanySpacePage({
    params,
}: {
    params: { slug: string };
}) {
    return <HomeSpaceClient slug={params.slug} />;
}
