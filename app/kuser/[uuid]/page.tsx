import KuserBlock from "@/app/_components/Inc/KuserBlock";
import {UserService} from "@/app/_core/api/services/UserService";
import type {Metadata, ResolvingMetadata} from 'next'
import {ROOT_FILES_URL} from "@/app/_core/config/constants";

export async function generateMetadata(
    {params}: { params: { uuid: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const uuid = params.uuid

    // fetch data
    var kuser = (await UserService.getUser(uuid)).data;


    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []

    return {
        title: "Kuser",
        openGraph: {
            url: "https://www.ikonect.me/kuser/" + kuser.uuid,
            title:"Kuser - " + kuser.firstname + " " + kuser.name,
            siteName: "Konect",
            description: kuser.vinfo.note,
            images: [ROOT_FILES_URL + "/compressed-photo/" + kuser.uuid + ".jpg", ...previousImages],
        },
    }
}

export default async function KuserPage({params}: { params: { uuid: string } }) {
    var kuser = (await UserService.getUser(params.uuid)).data;

    return (
        <div>
            <KuserBlock kuser={kuser} isLoading={!kuser}/>
        </div>);
}
