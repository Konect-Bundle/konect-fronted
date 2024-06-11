import { Konect } from "./Konect";

export class KonectCategory {
  kc_label: string;

  constructor(kc_label: string) {
    this.kc_label = kc_label;
  }

  konects(): Konect[] | null {
    // Implémentez cette méthode selon vos besoins
    return null;
  }
}
