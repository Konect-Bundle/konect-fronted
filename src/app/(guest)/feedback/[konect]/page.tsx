import { useTranslations } from "next-intl";
import { useEffect } from "react";
import FeedbackClient from "./client";
import { KonectService } from "@/core/api/services/KonectService";

export default async function Invitation({
    params,
}: {
    params: { konect: string };
}) {
    var feed = JSON.parse(
        (await KonectService.getConnect(params.konect)).data.feed_info,
    );
    return (
        <FeedbackClient
            firstname={feed.firstname}
            name={feed.name}
            email={feed.email}
            phone={feed.phone}
        />
    );
}
