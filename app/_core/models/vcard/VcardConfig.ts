export default class VcardConfig {
    public isCardActivated: boolean;
    public showLocalization: boolean;
    public configTheme: VcardConfigTheme;

    constructor(vconfig: string | null = null) {
        if (vconfig === null) {
            this.isCardActivated = false;
            this.showLocalization = false;
            this.configTheme = new VcardConfigTheme("");
        } else {
            const vConfigObj = JSON.parse((typeof vconfig) == "string" ? vconfig :JSON.stringify(vconfig));
            this.isCardActivated = vConfigObj.isCardActivated;
            this.showLocalization = vConfigObj.showLocalization;
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
    constructor(public primaryColor: string) {}

    array_gen(): Record<string, any> {
        return { primaryColor: this.primaryColor };
    }

    json_gen(): string {
        return JSON.stringify(this.array_gen());
    }
}
