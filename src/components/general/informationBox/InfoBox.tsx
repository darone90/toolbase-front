import React from 'react';

interface Props {
    visible: boolean;
    name: string;
    idn: string;
    action: string;
}

const InfoBox = (props: Props) => {

    const { name, visible, idn, action } = props;

    let actionName: string;

    switch (action) {
        case 'a': {
            actionName = 'zapisany';
            break;
        }
        case 'e': {
            actionName = 'zmieniony';
            break;
        }
        case 'd': {
            actionName = 'usunięty';
            break;
        }
        default: {
            actionName = 'nieokreślony';
            break;
        }
    }

    const content = visible ?
        <div>
            {name} został poprawnie {actionName} w bazie danych
            <strong>ID: {idn}</strong>
        </div>
        : null;


    return (
        <>
            {content}
        </>
    );
};

export default InfoBox;
