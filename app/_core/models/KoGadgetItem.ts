interface Color {
    name: string;
    hexaCode: string;
}

interface Gadget {
    name: string;
    code: string;
    description: string;
    price: number;
    weightDimensions: number;
    color: Color;
    material: string;
    type: string;
    imageURL: string[];
}

export interface CardCustomDetails {
    name: string;
    firstname: string;
    title: string;
    quantity: number;
    file: string | null;
}

export class KoGadgetItem implements Gadget {
    name: string;
    code: string;
    description: string;
    price: number;
    weightDimensions: number;
    color: Color;
    material: string;
    type: string;
    imageURL: string[];
    cardCustomDetails?: CardCustomDetails | null;

    constructor(
        name: string,
        code: string,
        description: string,
        price: number,
        weightDimensions: number,
        color: Color,
        material: string,
        type: string,
        imageURL: string[],
        cardCustomDetails?: CardCustomDetails | null,
    ) {
        this.name = name;
        this.code = code;
        this.description = description;
        this.price = price;
        this.weightDimensions = weightDimensions;
        this.color = color;
        this.material = material;
        this.type = type;
        this.imageURL = imageURL;
        this.cardCustomDetails = cardCustomDetails;
    }

    static empty() {
        var ko: KoGadgetItem = new KoGadgetItem(
            "",
            "",
            "",
            0,
            0,
            { name: "", hexaCode: "" },
            "",
            "",
            [],
            null,
        );
        return ko;
    }

    // Méthode pour afficher les informations sur le produit
    displayProductInfo(): void {
        console.log(`Product: ${this.name}`);
        console.log(`Description: ${this.description}`);
        console.log(`Price: $${this.price}`);
        console.log(`Weight & Dimensions: ${this.weightDimensions}`);
        console.log(`Color: ${this.color.name} (${this.color.hexaCode})`);
        console.log(`Material: ${this.material}`);
        console.log(`Type: ${this.type}`);
        console.log(`Images: ${this.imageURL.join(", ")}`);
        console.log(`Custom details: ${this.cardCustomDetails}}`);
    }
}
