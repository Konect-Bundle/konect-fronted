interface PlatformInfo {
    name: string;
    icon: string;
    urlPattern: RegExp;
    displayType: string; // Définir le type d'affichage : 'video', 'profile', 'favicon', etc.
}

class ExternalPlatformDetector {
    private static platforms: PlatformInfo[] = [
        {
            name: "Facebook",
            icon: "/icons/facebook-icon.svg",
            urlPattern: /facebook\.com/i,
            displayType: "profile",
        },
        {
            name: "Github",
            icon: "/icons/github-icon.svg",
            urlPattern: /github\.com/i,
            displayType: "profile",
        },
        {
            name: "LinkedIn",
            icon: "/icons/linkedin-icon.svg",
            urlPattern: /linkedin\.com/i,
            displayType: "profile",
        },
        {
            name: "Twitter",
            icon: "/icons/twitter-icon.svg",
            urlPattern: /twitter\.com/i,
            displayType: "profile",
        },
        {
            name: "Youtube",
            icon: "/icons/youtube-icon.svg",
            urlPattern: /youtube\.com/i,
            displayType: "video",
        },
        {
            name: "Tiktok",
            icon: "/icons/tiktok-icon.svg",
            urlPattern: /tiktok\.com/i,
            displayType: "profile",
        },
        {
            name: "X",
            icon: "/icons/x-icon.svg",
            urlPattern: /X\.com/i,
            displayType: "profile",
        },
        {
            name: "Twitter",
            icon: "/icons/twitter-icon.svg",
            urlPattern: /twitter\.com/i,
            displayType: "profile",
        },
        {
            name: "Instagram",
            icon: "/icons/instagram-icon.svg",
            urlPattern: /instagram\.com/i,
            displayType: "profile",
        },
        {
            name: "Google",
            icon: "/icons/google-icon.svg",
            urlPattern: /google\.com/i,
            displayType: "profile",
        },
        {
            name: "Spotify",
            icon: "/icons/spotify-icon.svg",
            urlPattern: /spotify\.com/i,
            displayType: "profile",
        },
        {
            name: "Soundcloud",
            icon: "/icons/soundcloud-icon.svg",
            urlPattern: /soundcloud\.com/i,
            displayType: "profile",
        },
        {
            name: "Website",
            icon: "/icons/website-icon.svg",
            urlPattern: /^(http|https):\/\/[a-z0-9]+(\.[a-z0-9]+)+/,
            displayType: "favicon",
        },
    ];

    // Méthode statique pour détecter la plateforme d'un lien donné
    public static detectPlatform(url: string): PlatformInfo | null {
        for (const platform of ExternalPlatformDetector.platforms) {
            if (platform.urlPattern.test(url)) {
                return platform;
            }
        }
        return null;
    }

    // Méthode statique pour gérer l'affichage en fonction du type de plateforme
    public static async getDisplayData(url: string): Promise<any> {
        const platform = this.detectPlatform(url);

        if (!platform) {
            return null;
        }

        switch (platform.displayType) {
            case "video":
                return await this.fetchYouTubeVideoData(url); // Gérer la prévisualisation de la vidéo YouTube
            case "profile":
                return await this.fetchProfileData(url, platform.name); // Récupérer la photo de profil pour LinkedIn, Facebook, etc.
            case "favicon":
                return this.fetchFavicon(url); // Récupérer la favicon pour les sites personnels
            default:
                return null;
        }
    }

    // Méthode pour récupérer les informations vidéo depuis YouTube
    private static async fetchYouTubeVideoData(url: string) {
        const videoId = this.extractYouTubeVideoId(url);
        if (!videoId) {
            return null;
        }
        // Appel à l'API YouTube pour récupérer les détails de la vidéo
        const apiKey = "YOUR_YOUTUBE_API_KEY"; // Remplace par ta clé API
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        const videoInfo = data.items[0].snippet;

        return {
            type: "video",
            title: videoInfo.title,
            thumbnail: videoInfo.thumbnails.medium.url,
            description: videoInfo.description,
        };
    }

    // Méthode pour extraire l'ID de la vidéo YouTube à partir d'un URL
    private static extractYouTubeVideoId(url: string): string | null {
        const match = url.match(
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/,
        );
        return match ? match[1] : null;
    }

    // Méthode pour récupérer les informations de profil (LinkedIn, Facebook, etc.)
    private static async fetchProfileData(url: string, platformName: string) {
        // Utilise l'API appropriée selon la plateforme pour récupérer la photo de profil et d'autres informations
        // Exemple pour LinkedIn ou Facebook, selon l'API de la plateforme
        return {
            type: "profile",
            profilePicture: "url_to_profile_picture",
            username: "Nom d'utilisateur",
        };
    }

    // Méthode pour récupérer la favicon d'un site
    private static fetchFavicon(url: string) {
        // On peut souvent utiliser l'URL simplifiée pour récupérer la favicon
        const faviconUrl = new URL("/favicon.ico", url).href;
        return {
            type: "favicon",
            faviconUrl,
        };
    }
}

export default ExternalPlatformDetector;
