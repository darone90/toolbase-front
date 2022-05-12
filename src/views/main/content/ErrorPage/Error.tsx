import { useParams } from 'react-router-dom';


const Error = () => {

    const { info } = useParams();
    const text = info ?
        info
        : 'Niestety wystąpił nie oczekiwany błąd... spróbuj za chwilę'

    return (
        <div>
            <h2>Przepraszamy wystąpił błąd...</h2>
            <p>{text}</p>
        </div>
    );
};

export default Error;
