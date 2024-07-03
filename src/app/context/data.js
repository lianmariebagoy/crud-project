"use client"

import React, { createContext, useContext, useState, useCallback } from 'react';

const DataProvider = createContext();

export const UseDataContext = () => {
    return useContext(DataProvider);
}

const DataComponent = ({ children }) => {
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const fillData = useCallback((dataPayload) => {
        setData(dataPayload);
        setLoaded(true);
    }, []);

    return (
        <DataProvider.Provider value={{ fillData, data, loaded }}>
            {children}
        </DataProvider.Provider>
    );
}

export default DataComponent;