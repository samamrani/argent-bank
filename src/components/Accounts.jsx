import React from "react";
import accountsData from "../data/accountData"; 

function Accounts() {
  return (
    <>
      <h2 className="sr-only">Accounts</h2>

      {accountsData.map((account) => (
        <section className="account" key={account.id}>
          <div className="account-content-wrapper">
            <h3 className="account-title">{account.title}</h3>
            <p className="account-amount">${account.amount}</p>
            <p className="account-amount-description">{account.description}</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      ))}
    </>
  );
}

export default Accounts;
