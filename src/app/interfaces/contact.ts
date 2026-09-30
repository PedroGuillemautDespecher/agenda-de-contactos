export interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    address?: string;
    number?: string;
    email?: string;
    image?: string;
    company?: string;
    description?: string;
    isFavorite?: boolean;
}
