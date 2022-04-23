import { Tool, statusType } from "../types/toolsTypes"

export const toolsList: Tool[] = [
    {
        id: 'hsye53412',
        sign: 'ksol1234',
        person: 'Ktoś ważany',
        status: statusType.BASE,
        place: 'baza',
        info: {
            type: 'szlifierka',
            subtype: 'kątowa',
            brand: 'bosh',
            serial: 'sssasd5214421'
        }
    },
    {
        id: 'hsgt3342',
        sign: 'kgaz1234',
        person: 'Jurek',
        status: statusType.BASE,
        place: 'baza',
        info: {
            type: 'szlifierka',
            subtype: 'prosta',
            brand: 'bosh',
            serial: 'ss632535214421'
        }
    },

    {
        id: 'hshyys12',
        sign: 'kdyu234',
        person: 'Kierownik',
        status: statusType.REPAIR,
        place: 'serwis',
        info: {
            type: 'szlifierka',
            subtype: 'kątowa',
            brand: 'bosh',
            serial: 'sssasd5214421'
        }
    },

    {
        id: 'hsye534hsy',
        sign: 'ksol1234',
        person: 'Ktoś ważany',
        status: statusType.WORK,
        place: 'Kunice',
        info: {
            type: 'spawarka',
            subtype: 'TIG',
            brand: 'kemppi',
            serial: 'sssad838314421'
        }
    }
]