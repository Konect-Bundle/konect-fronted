export function esser(text: string, length: number): string {
    return length > 1 ? text + 's' : text;
}

export function ucfirst(str: string): string {
    if (typeof str !== 'string' || str.length === 0) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function ucwords(str: string): string {
    if (typeof str !== 'string' || str.length === 0) return '';

    return str.replace(/\b\w/g, char => char.toUpperCase());
}

