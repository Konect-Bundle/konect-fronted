import KuserBlock from "@/app/_components/Inc/KuserBlock";
import { UserService } from "@/app/_core/api/services/UserService";
import type { Metadata, ResolvingMetadata } from "next";
import { ROOT_FILES_URL } from "@/app/_core/config/constants";
import { ucfirst } from "@/app/_core/utils/functions";
import KuserCompanyBlock from "@/app/_components/Inc/KuserCompanyBlock";

export async function generateMetadata(
    { params }: { params: { uuid: string } },
    parent: ResolvingMetadata,
): Promise<Metadata> {
    // read route params
    const uuid =
        params.uuid == "k"
            ? "4fb07f74-a2aa-43b0-8be5-855f0fe16c20"
            : params.uuid;

    var gadget = (await UserService.getGadget(uuid)).data;

    // fetch data
    var kuser = gadget.owner;
    var vinfo = JSON.parse(kuser.vinfo);
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
            description: ucfirst(vinfo.note.text),
        },
        openGraph: {
            url: "https://www.ikonect.me/kuser/" + kuser.uuid,
            title:
                "Kuser - " +
                ucfirst(kuser.firstname) +
                " " +
                ucfirst(kuser.name),
            siteName: "Konect",
            description: ucfirst(vinfo.note.text),
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
    var uid: string =
    params.uuid == "k"
        ? "4fb07f74-a2aa-43b0-8be5-855f0fe16c20"
        : params.uuid;

    try {
        var gadget = (await UserService.getGadget(uid)).data;
        if (gadget.company == null) {
            // console.log("PERSONAL");
            return (
                <KuserBlock kuser={gadget.owner} isLoading={!gadget.owner} />
            );
        } else {
            // console.log(gadget);
            return <KuserCompanyBlock gadget={gadget} isLoading={!gadget} />;
        }
    } catch (error) {
        console.log(error);
    }
}
