import React from "react";

export interface IRoute {
    path: string;
    element: () => JSX.Element;
}

export interface IRoutes{
    [key: string]: IRoute[]
}