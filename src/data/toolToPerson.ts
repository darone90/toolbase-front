import { statusType } from "../types/toolsTypes"
import { HistoryList } from "../types/userTypes"

export const history: HistoryList[] = [
    {
        name: 'Krzysiek',
        tool: {
            id: 'hsye53412',
            sign: 'ksol1234',
            person: 'Krzysiek',
            status: statusType.BASE,
            place: 'baza',
            info: {
                type: 'szlifierka',
                subtype: 'kątowa',
                brand: 'bosh',
                serial: 'sssasd5214421'
            }
        },
        from: '20.02.2022',
        to: ''
    },

    {
        name: 'Oleh',
        tool: {
            id: 'hsye53sda4442',
            sign: 'ksol1234',
            person: 'Krzysiek',
            status: statusType.BASE,
            place: 'baza',
            info: {
                type: 'szlifierka',
                subtype: 'kątowa',
                brand: 'bosh',
                serial: 'sssasd5214421'
            }
        },
        from: '21.12.2021',
        to: '29.12.2021'
    },

    {
        name: 'Krzysiek',
        tool: {
            id: 'hsye5341dsasd3222',
            sign: 'ksol1234',
            person: 'Krzysiek',
            status: statusType.BASE,
            place: 'baza',
            info: {
                type: 'szlifierka',
                subtype: 'kątowa',
                brand: 'bosh',
                serial: 'sssasd5214421'
            }
        },
        from: '01.01.2022',
        to: '12.02.2022'
    },
]