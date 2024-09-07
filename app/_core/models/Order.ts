export interface PayloadOrderInterface {
    session_id: string;
}

export class Order {
    id: number | null;
    createdAt: Date;
    paymentMethod: string;
    payload: PayloadOrderInterface;
    isClosed: boolean;

    constructor(
        id: number | null = null,
        createdAt: string,
        paymentMethod: string,
        payload: PayloadOrderInterface,
        isClosed: boolean,
    ) {
        this.id = id;
        this.createdAt = new Date(createdAt);
        this.paymentMethod = paymentMethod;
        this.payload = payload;
        this.isClosed = isClosed;
    }

    static empty() {
        const order = new Order(
            null,
            "2024-09-06T16:45:52.000000Z",
            "stripe",
            { session_id: "" },
            false,
        );
        return order;
    }

    // Méthode pour afficher les informations sur la commande
    displayOrderInfo(): void {
        console.log(`Order ID: ${this.id}`);
        console.log(`Created At: ${this.createdAt.toISOString()}`);
        console.log(`Payment Method: ${this.paymentMethod}`);
        console.log(`Payload: ${this.payload}`);
        console.log(`Is Closed: ${this.isClosed ? "Yes" : "No"}`);
    }
}
