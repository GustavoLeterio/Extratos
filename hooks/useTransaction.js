import { useContext } from "react";
import { transactionContext } from "../contexts/TransactionContext";

export default function useTransaction() {
    const context = useContext(transactionContext);
    return context;
}
