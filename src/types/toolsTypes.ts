export enum statusType {
    BASE = 'na bazie: Dostępna',
    REPAIR = 'w serwisie: Niedostępna',
    WORK = 'na wyjeździe: Niedostępna',
    PRIVATE = 'wypożyczona: Niedostępna'
}

export interface Tool {
    id: string;
    sign: string;
    person: string;
    status: statusType;
    place: string;
    info: {
        type: string;
        subtype: string;
        brand: string;
        serial: string;
    };
}

export interface ToolsNames {
    name: string;
    subtypes: string[];
}