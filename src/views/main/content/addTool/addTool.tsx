import React, { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import ToolTechnicalForm from '../../../../components/addtool/ToolTechnicalForm';
import ToolDataForm from '../../../../components/addtool/ToolDataForm';
import { Technical, Local } from '../../../../types/toolsTypes';
import ToolDataLook from '../../../../components/addtool/ToolDataLook';
import { dataPoster } from '../../../../global/workersHandle';
import InfoBox from '../../../../components/general/informationBox/InfoBox';


const AddTool = () => {

    const navigate = useNavigate();

    const [technicalInfo, setTechnicalInfo] = useState<Technical | null>(null);
    const [localInfo, setLocalInfo] = useState<Local | null>(null);
    const [infoVisible, setInfoVisible] = useState<boolean>(false);
    const [id, setId] = useState<string>('');

    const setTechnicalData = (data: Technical) => {
        setTechnicalInfo(data);
    };

    const setLocalData = (data: Local) => {
        setLocalInfo(data);
    };

    const addFunc = async (e: MouseEvent<HTMLElement>) => {

        e.preventDefault();
        const dataToSend = {
            ...localInfo,
            ...technicalInfo
        };
        try {
            const id = await dataPoster(dataToSend, 'POST', 'tools');
            setId(id as string);
            setInfoVisible(true);
            setTechnicalInfo(null);
            setLocalInfo(null);
        } catch (err) {
            if (err instanceof Error)
                navigate(`/error/${err.message}`)
        }
    }

    const validation = technicalInfo && localInfo ? false : true;

    return (
        <div className='Adding-tool' onClick={() => { setInfoVisible(false) }}>
            <ToolTechnicalForm addTechnicalInfo={setTechnicalData} />
            <ToolDataForm getToolData={setLocalData} />
            <ToolDataLook technical={technicalInfo}
                local={localInfo}
                validation={validation}
                addFunc={addFunc} />
            <InfoBox visible={infoVisible} name='Nowe urządznie' idn={id} action='a' />
        </div>
    );
};

export default AddTool;
