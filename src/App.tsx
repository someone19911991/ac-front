import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routing from "./routing";
import "./App.scss";
import Layout from "./components/Layout/Layout";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { setLocation } from "./features/App/appSlice";
import PrintPdf from "./features/PrintPdf/PrintPdf";
import DelAllPdfs from "./components/DelAllPdfs/DelAllPdfs";

const App = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(setLocation(location.pathname));
    }, [location.pathname]);


    return (
        <Routes>
            <Route path="/delallpdfs" element={<DelAllPdfs />} />
            <Route path="*" element={<Layout />}>
                {routing.publicRoutes.map((route) => (
                    <Route
                        key="path"
                        path={route.path}
                        element={<route.element />}
                    />
                ))}
                <Route path="*" element={<Navigate to="" />} />
            </Route>
        </Routes>
    );
};

export default App;
