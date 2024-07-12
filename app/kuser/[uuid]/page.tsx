import KuserBlock from "@/app/_components/Inc/KuserBlock";
import { UserService } from "@/app/_core/api/services/UserService";
import type { Metadata, ResolvingMetadata } from "next";
import { ROOT_FILES_URL } from "@/app/_core/config/constants";
import { ucfirst } from "@/app/_core/utils/functions";
import KuserLayout from "@/app/kuser/[uuid]/layout";

export async function generateMetadata(
    { params }: { params: { uuid: string } },
    parent: ResolvingMetadata,
): Promise<Metadata> {
    // read route params
    const uuid = params.uuid;

    // fetch data
    var kuser = (await UserService.getUser(uuid)).data;

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: "Kuser",
        twitter: {
            title:
                "Kuser - " +
                ucfirst(kuser.firstname) +
                " " +
                ucfirst(kuser.name),
            card: "summary_large_image",
            images: ROOT_FILES_URL + "/compressed-photo/" + kuser.uuid + ".jpg",
            description: ucfirst(kuser.vinfo.note.text),
        },
        openGraph: {
            url: "https://www.ikonect.me/kuser/" + kuser.uuid,
            title:
                "Kuser - " +
                ucfirst(kuser.firstname) +
                " " +
                ucfirst(kuser.name),
            siteName: "Konect",
            description: ucfirst(kuser.vinfo.note.text),
            images: [
                ROOT_FILES_URL + "/compressed-photo/" + kuser.uuid + ".jpg",
                ...previousImages,
            ],
        },
    };
}

export default async function KuserPage({
    params,
}: {
    params: { uuid: string };
}) {
    var kuser = (await UserService.getUser(params.uuid)).data;

    return (
        <KuserLayout>
            <KuserBlock kuser={kuser} isLoading={!kuser} />
        </KuserLayout>
    );
}
