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
                intentData.data.fileName,
            )
        ).data.url;
    }
    return "";
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

export function stringToEnum<T extends object>(enumObj: T, value: string): T[keyof T] | null {
    // Vérifier si la chaîne correspond à une valeur de l'enum
    if (Object.values(enumObj).includes(value as T[keyof T])) {
      return value as T[keyof T];
    }
    return null;
  }