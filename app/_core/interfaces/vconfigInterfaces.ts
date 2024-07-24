export interface VcardConfigThemeInterface {
    primaryColor: string;
}

// Définir l'interface VcardConfig
export default interface VcardConfigInterface {
    isCardActivated: boolean;
    showLocalization: boolean;
    configTheme: VcardConfigThemeInterface;
}
