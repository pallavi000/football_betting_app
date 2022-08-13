import React, { useEffect, useState } from "react";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import PageLoader from "../../Loader/PageLoader";
import { getTransactionById } from "./Action";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

function Transaction() {
  const { isMobile } = useDeviceDetect();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const [transactions, setTransactions] = useState([]);

  async function getData() {
    const response = await getTransactionById();
    setTransactions(response.data);
    setIsPageLoaded(true);
  }

  useEffect(() => {
    getData();
  }, []);

  function getPaymentMethod(item) {
    if (item.payment_method === "credit_card") {
      return "Credit Card";
    }
    return item.payment_method;
  }

  return !isPageLoaded ? (
    <PageLoader />
  ) : isMobile ? (
    <Mobile transactions={transactions} getPaymentMethod={getPaymentMethod} />
  ) : (
    <Desktop transactions={transactions} getPaymentMethod={getPaymentMethod} />
  );
}

export default Transaction;
