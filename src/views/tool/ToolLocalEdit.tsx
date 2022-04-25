import React from 'react';
import { useParams } from 'react-router-dom';

const ToolLocalEdit = () => {

    const { id } = useParams()

    return (
        <div>
            Edycja lokalna dla numeru id: {id}
        </div>
    );
};

export default ToolLocalEdit;