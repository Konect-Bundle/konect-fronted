import { productItemRoute } from "../config/routes";
import { IntentInterface } from "../interfaces/appInterfaces";
import { PaymentService } from "../api/services/PaymentService";

export function esser(text: string, length: number): string {
    return length > 1 ? text + "s" : text;
}

export function ucfirst(str: string | null): string {
    if (!str) {
        return "";
    }
    if (typeof str !== "string" || str.length === 0) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function ucwords(str: string): string {
    if (typeof str !== "string" || str.length === 0) return "";

    return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function client_token(): string | null {
    return localStorage.getItem("client_token");
}

export async function intent_processor(
    intentData: IntentInterface,
    token: string,
): Promise<string> {
    if (intentData.from == productItemRoute.name) {
        return (
            await PaymentService.makePayment(
                intentData.data.file,
                intentData.data.code,
                intentData.data.name,
                intentData.data.familyName,
                intentData.data.companyName,
                intentData.data.qty,
                token,
            )
        ).data.url;
    }
    return "";
}

export function convertYouTubeLinkToEmbed(url: string): string {
    // Expression régulière pour extraire l'ID de la vidéo
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i);
    const videoId = videoIdMatch ? videoIdMatch[1] : url;

    if (videoId) {
        // Construire l'URL d'intégration
        return `https://www.youtube.com/embed/${videoId}`;
    }

    return url; // Retourne null si l'ID de la vidéo n'a pas pu être extrait
}