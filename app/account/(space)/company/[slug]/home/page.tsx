import CompanySpaceClient from "./client";


export default async function CompanySpacePage({
    params,
}: {
    params: { slug: string };
}) {
    return <CompanySpaceClient slug={params.slug} />;
}
