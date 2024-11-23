import { useTranslations } from "next-intl";
import { useEffect } from "react";
import InvitationClient from "./client";

export default function Invitation({
    params,
}: {
    params: { member: string; is_accepted: string };
}) {
    return (
        <InvitationClient
            isAccepted={!!parseInt(params.is_accepted)}
            uid={params.member}
        />
    );
}
