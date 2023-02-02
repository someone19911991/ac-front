import React, { useEffect, useRef, useState } from "react";
import "./PrintPdf.scss";
import { useTranslation } from "react-i18next";
import { IPrintProps } from "../../components/Print/Print";
import Print from "../../components/Print/Print";
import {saveAs} from "file-saver";
import axios from "axios";
import LoadingImg from "../../assets/images/loading.gif";
import { data } from "../../data";
import { useNavigate } from "react-router-dom";

const PrintPdf = () => {
    const navigate = useNavigate();
    const componentRef = useRef<HTMLDivElement>(null);
    const {t} = useTranslation();
    let printData = JSON.parse(localStorage.getItem('calc_data') || '{}') as IPrintProps;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const calcData = localStorage.getItem('calc_data');
        if(!calcData){
           navigate('https://www.autocomplex.am')
        }
    }, [])

    const createAndDownloadPdf = async() => {
        try{
            setLoading(true);
            let dataToSend = localStorage.getItem('calc_data');
            let lang = localStorage.getItem('i18nextLng');
            if(dataToSend){
                let parsedData = JSON.parse(dataToSend) as any;
                const locationIndex = parsedData.auction_location_id as keyof typeof data;
                parsedData.auction_location_place = data[locationIndex].label;
                parsedData.lang = lang;
                // await axios.post('https://www.backend.autocomplex.am/api/create-pdf-1', parsedData);
                const response = await axios.post('https://www.backend.autocomplex.am/api/create-pdf-1', parsedData);
                const fileName = response.data;
                // window.location.href = `http://localhost:5000/pdf/${fileName}`;
                // window.open(`http://localhost:5000/pdf/${fileName}`, '_blank');
                window.open(`https://www.backend.autocomplex.am/pdf/${fileName}`, '_blank');
                // const res2 = await axios.get('https://www.backend.autocomplex.am/api/fetch-pdf', {responseType: 'blob'});
                // const res2 = await axios.get('http://localhost:5000/api/fetch-pdf', {responseType: 'blob'});
                // const pdfBlob = new Blob([res2.data], {type: 'application/pdf'});
                // saveAs(pdfBlob, 'calculation.pdf')
                setLoading(false);
            }
        }catch(err){
            console.log(err);
            setLoading(false);
        }
    }

    return (<div className="print-pdf">
            <Print {...printData} ref={componentRef} />
        {!loading && <button className="download_btn" onClick={createAndDownloadPdf}>
            {t("calc.print")}
        </button>}
        {loading && (
            <div className="calculation-loading">
                <img src={LoadingImg} />
            </div>
        )}
    </div>);
};

export default PrintPdf;
