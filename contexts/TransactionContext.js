import React, { createContext, useState } from "react";

const initialData = { state: "retorno" };

export const transactionContext = createContext(initialData);

export function TransactionProvider({ children }) {
    const [transactionValue, setTransactionValue] = useState(initialData);
    return (
        <transactionContext.Provider value={{ transactionValue, setTransactionValue }} >{children}</transactionContext.Provider>
    );
}