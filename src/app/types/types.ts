export interface Author {
    id: number;
    authorFirstName: string;
    authorLastName: string;
    createdAt: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
        lat: string;
        lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

export interface AddAuthorModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (firstName: string, lastName: string) => void;
}

export interface AuthorTableProps {
  authors: Author[];
}

export type AuthorKeys = keyof Author;

export interface UserTableProps {
    users: User[];
}

export type UserKeys = keyof User;

export interface SearchBarProps {
    onSearch: (query: string) => void;
    label: string;
}

export interface ToastProps {
    open: boolean;
    message: string;
    onClose: () => void;
    type?: 'success' | 'error';
}