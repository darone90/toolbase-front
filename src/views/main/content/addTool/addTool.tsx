import React, { useState, MouseEvent } from 'react';
import ToolTechnicalForm from '../../../../components/addtool/ToolTechnicalForm';
import ToolDataForm from '../../../../components/addtool/ToolDataForm';
import { Technical, Local } from '../../../../types/toolsTypes';
import ToolDataLook from '../../../../components/addtool/ToolDataLook';


const AddTool = () => {

    const [technicalInfo, setTechnicalInfo] = useState<Technical | null>(null);
    const [localInfo, setLocalInfo] = useState<Local | null>(null);

    const setTechnicalData = (data: Technical) => {
        setTechnicalInfo(data);
    };

    const setLocalData = (data: Local) => {
        setLocalInfo(data);
    };

    const addFunc = (e: MouseEvent<HTMLElement>) => {

        e.preventDefault();
        const dataToSend = {
            ...localInfo,
            info: technicalInfo
        };

        console.log('wysyłamy na serwer: ', dataToSend)
    }

    const validation = technicalInfo && localInfo ? false : true;

    return (
        <div className='Adding-tool'>
            <ToolTechnicalForm addTechnicalInfo={setTechnicalData} />
            <ToolDataForm getToolData={setLocalData} />
            <ToolDataLook technical={technicalInfo}
                local={localInfo}
                validation={validation}
                addFunc={addFunc} />
        </div>
    );
};

export default AddTool;
