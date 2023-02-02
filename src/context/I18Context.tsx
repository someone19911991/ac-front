import {
    ChangeEvent,
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";
import "../i18n";
import { useTranslation } from "react-i18next";

interface I18ContextProviderProps {
    children: ReactNode;
}

interface II18Context {
    changeLanguage_: (lng: string) => void;
}

const I18Context = createContext({} as II18Context);

export const useI18 = () => {
    return useContext(I18Context);
};

export const I18ContextProvider = ({ children }: I18ContextProviderProps) => {
    const { i18n } = useTranslation();
    const changeLanguage_ = (lng: string) => {
        i18n.changeLanguage(lng);
    };
    return (
        <I18Context.Provider value={{ changeLanguage_ }}>
            {children}
        </I18Context.Provider>
    );
};
