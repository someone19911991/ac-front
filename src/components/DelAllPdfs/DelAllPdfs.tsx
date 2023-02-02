import React, { useEffect } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const DelAllPdfs = () => {
    const navigate = useNavigate();
    useEffect(() => {
        async function deleteAllPdfs(){
            try{
                await axios.post('https://www.backend.autocomplex.am/clean', {sec: 'autocomplex'});
                navigate('/');
            }catch(err){
                interface IErr{message: string};
                const error = err as IErr;
                alert(error.message);
            }
        }
        deleteAllPdfs();
    }, []);

    return (
        <div>

        </div>
    );
};

export default DelAllPdfs;