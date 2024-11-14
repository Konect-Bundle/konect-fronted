import { konectsListRoute, productItemRoute } from "../config/routes";
import { IntentInterface } from "../interfaces/appInterfaces";
import { PaymentService } from "../api/services/PaymentService";
import tinycolor from "tinycolor2";

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
                intentData.data.fileName,
            )
        ).data.url;
    }
    return intentData.path ?? "";
}

export function convertYouTubeLinkToEmbed(url: string): string {
    // Expression régulière pour extraire l'ID de la vidéo
    const videoIdMatch = url.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i,
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : url;

    if (videoId) {
        // Construire l'URL d'intégration
        return `https://www.youtube.com/embed/${videoId}`;
    }

    return url; // Retourne null si l'ID de la vidéo n'a pas pu être extrait
}

export function dataURLToBlob(dataURL: string): Blob {
    // Extraire la partie Base64 après "base64,"
    const byteString = atob(dataURL.split(",")[1]);

    // Créer un tableau d'octets
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // Extraire le type MIME de la chaîne DataURL
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];

    // Créer un Blob à partir du tableau d'octets et du type MIME
    return new Blob([ia], { type: mimeString });
}

export function dataURLToFile(dataURL: string, fileName: string): File {
    // Convertir la DataURL en Blob
    const blob = dataURLToBlob(dataURL);

    // Créer un objet File à partir du Blob
    return new File([blob], fileName, { type: blob.type });
}

export function formatNumber(num: number): string {
    const absNum = Math.abs(num);
    const sign = num < 0 ? "-" : "";

    if (absNum >= 1e9) {
        return sign + (absNum / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (absNum >= 1e6) {
        return sign + (absNum / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (absNum >= 1e3) {
        return sign + (absNum / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
    }

    return sign + absNum.toString();
}

export function generateVCard(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
): void {
    // Structure de la vCard
    const vCard: string = `
BEGIN:VCARD
VERSION:3.0
FN:${firstName} ${lastName}
N:${lastName};${firstName};;;
TEL;TYPE=CELL:${phoneNumber}
EMAIL:${email}
END:VCARD
    `;

    // Créer un blob contenant les données de la vCard
    const blob: Blob = new Blob([vCard], { type: "text/vcard" });

    // Créer un lien de téléchargement
    const url: string = window.URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement("a");
    a.href = url;
    a.download = `${firstName}_${lastName}.vcf`;

    // Simuler un clic sur le lien pour déclencher le téléchargement
    a.click();

    // Libérer l'URL objet
    window.URL.revokeObjectURL(url);
}

export function stringToEnum<T extends object>(
    enumObj: T,
    value: string,
): T[keyof T] | null {
    // Vérifier si la chaîne correspond à une valeur de l'enum
    if (Object.values(enumObj).includes(value as T[keyof T])) {
        return value as T[keyof T];
    }
    return null;
}

interface ColorVariants {
    base: string;
    lighter: string;
    darker: string;
    text: string;
}

export function generateColorVariants(color: string): ColorVariants {
    const baseColor = tinycolor(color);
    return {
        base: baseColor.toString(),
        lighter: baseColor.lighten(20).toString(),
        darker: baseColor.darken(20).toString(),
        text: tinycolor
            .mostReadable(baseColor, ["#ffffff", "#000000"])
            .toString(),
    };
}
export function actionValidityHasExpired(
    dateFrom: string,
    expirationMinutes: number = 60,
): boolean {
    // Convertit la date de création en timestamp
    const createAsTimestamp = new Date(dateFrom).getTime();

    // Calcule le timestamp actuel
    const currentTimestamp = Date.now();

    // Calcule le temps d'expiration en millisecondes
    const expirationMilliseconds = expirationMinutes * 60 * 1000;

    // Calcule la différence de temps entre la date de création et maintenant
    const timeDifference = currentTimestamp - createAsTimestamp;

    // Vérifie si le temps écoulé dépasse le temps d'expiration
    return timeDifference > expirationMilliseconds;
}

export const getCroppedImg = (
    imageSrc: string,
    croppedAreaPixels: any,
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            if (ctx) {
                canvas.width = croppedAreaPixels.width;
                canvas.height = croppedAreaPixels.height;

                ctx.drawImage(
                    image,
                    croppedAreaPixels.x,
                    croppedAreaPixels.y,
                    croppedAreaPixels.width,
                    croppedAreaPixels.height,
                    0,
                    0,
                    croppedAreaPixels.width,
                    croppedAreaPixels.height,
                );

                canvas.toDataURL("image/jpeg");
                resolve(canvas.toDataURL("image/jpeg")); // Retourne l'image recadrée en Base64
            } else {
                reject(
                    new Error("Le contexte 2D du canvas n'est pas disponible."),
                );
            }
        };
        image.onerror = reject;
    });
};

export function extractMimeTypeAndExtension(base64: string) {
    const match = base64.match(/^data:(image\/\w+);base64,/);
    if (!match) {
        throw new Error("Format Base64 invalide");
    }
    const mimeType = match[1];
    const extension = mimeType.split("/")[1];
    return { mimeType, extension };
}

export function base64ToBlob(base64: string): Blob {
    const { mimeType } = extractMimeTypeAndExtension(base64);

    const byteCharacters = atob(base64.split(",")[1]); // Ignore l'en-tête MIME
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
}
