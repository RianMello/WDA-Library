export interface TbHeader {
    thId: string;
    thLabel: string;
    order: boolean;
}

export interface TableRows {
    trId: number;
    trContent: (string | number)[];
}