import { KPreviewThemeMode, KPreviewZoom } from "../../utils/enums";

export default class VcardConfig {
    public isCardActivated: boolean;
    public showLocalization: boolean;
    public showKonects: boolean;

    public configTheme: VcardConfigTheme;

    constructor(vconfig: string | null = null) {
        if (vconfig === null) {
            this.isCardActivated = false;
            this.showLocalization = false;
            this.showKonects = false;
            this.configTheme = new VcardConfigTheme("");
        } else {
            const vConfigObj = JSON.parse(
                typeof vconfig == "string" ? vconfig : JSON.stringify(vconfig),
            );
            this.isCardActivated = vConfigObj.isCardActivated;
            this.showLocalization = vConfigObj.showLocalization;
            this.showKonects = vConfigObj.showKonects;
            this.configTheme = new VcardConfigTheme(
                vConfigObj.configTheme.primaryColor,
            );
        }
    }

    array_gen(): Record<string, any> {
        return {
            isCardActivated: this.isCardActivated,
            showLocalization: this.showLocalization,
            configTheme: this.configTheme,
        };
    }

    json_gen(): string {
        return JSON.stringify(this.array_gen());
    }
}

class VcardConfigTheme {
    constructor(
        public primaryColor: string = "#ffffff",
        public kpZoom: KPreviewZoom = KPreviewZoom.NORMAL,
        public themeMode: KPreviewThemeMode = KPreviewThemeMode.LIGHT,
    ) {}

    array_gen(): { [key: string]: any } {
        return {
            primaryColor: this.primaryColor,
            kpZoom: this.kpZoom,
            themeMode: this.themeMode,
        };
    }

    json_gen(): string {
        return JSON.stringify(this);
    }
}
