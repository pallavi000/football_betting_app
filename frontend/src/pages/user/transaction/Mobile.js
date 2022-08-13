import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import { getTransactionById } from "./Action";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";

function Mobile({ transactions, getPaymentMethod }) {
  return (
    <div className="content-wrapper">
      <div className="mt-5">
        <div className="active-card-title">Transaction List</div>

        <Accordion allowZeroExpanded={true}>
          {transactions.map((transaction) => {
            return (
              <AccordionItem key={transaction._id}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    Transaction ID: #{transaction._id}
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="fw-bold">Amount</div>
                    <div>${transaction.amount}</div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="fw-bold">Payment Method</div>
                    <div className="text-capitalize">
                      {getPaymentMethod(transaction)}
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="fw-bold">Date</div>
                    <div>{format(transaction.createdAt)}</div>
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}

export default Mobile;
