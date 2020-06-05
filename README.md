# Fiat to crypto ramp on CELO Blockchain using Oracles

## User Journey
Using peer-to-peer Network in developing countries can be challenging because, there is no enforced fiat rails for customer to go from cash to crypto. There are solutions to this problem but they come in centralized forms which would require trusting a third party and having to provide identification. Certain countries would have cryptocurrencies banned and therefore no access to centralized exchanges but those countries would still have access to payment services such as Paypal.

## Solution
The solution was to use smart contracts that can interact with real world data through the use of `BandProtocol Oracles`. The use of BandProtocol allows the contract to be able to confirm whether or not a casino or cashout intent has been paid or not.
This solution involves a user, creating a cashin or a cashout intent from his mobile wallet for an agreed amount of ERC2O and locking up the ERC2O in a smart contract. This ERC2O is then unlocked when the intent is paid by the user or by the third party payment provider, the smart contract uses BandProtocol Oracles to confirm that the intent has been paid. If the intent is paid then the user will get his wallet balance funded, or if the intent isn't paid or fails in the process, then the transaction is reverted .

## Procedure
-  `Mobile Money` Users wanting to deposit ERC2O via Mobile Money would first create a `cashin intent` from their mobile phone. They should receive a 6 digits code after the intent creation. Once they received the intent code they would have to go their mobile wallet and make a deposit with the six digits `intent code` that they receive with the amount to be deposited into his account.
- `Bank wyre`
- `Cash counter`
- `Credit card`
- `Debit card`


## Overview

This fiat gateway provides a fast and decentralized way to sell crypto for fiat and vice versa.

Any number of fiat payment networks can be supported. Each must provide a external adapter implementation to handle paying out and checking payments in.

A pool of Makers provide fiat and crypto liquidity to the system. They receive a fee for each trade. The fee is the same for all Makers.

A Taker buys crypto for fiat or fiat for crypto. They get the current market price minus a fixed Makers fee.

Differences from exiting services:
- fiat payments for sells are executed by Oracles
- fiat payments for buys are executed outside the system but are checked by Oracles before crypto is released
- trades are direct swaps with fixed fees (there is no order book)

Differences from traditional centralized gateways:
- transparency - orders are initiated and finalised on chain
- peer to peer - registered Makers to any Taker
- trusted Oracles (later can be trustless with a TEE deployment) executing payment network transactions

## Features

- [ ] ERC20 to Fiat / Fiat to ERC20
- [ ] Mobile Money Fiat Payments for deposit 
- [ ] SEPA Fiat Payments
- [ ] Bank account Payments
- [ ] Credit card - Debit card Fiat Payments
- [ ] Encrypted Maker api credentials
- [ ] DApp UI

## How it Works

Transactions
Transactions are a way to manage value on and between accounts in the `DuniaPay platform`.  Every transaction can be either a debit or a credit. In simple terms debit reduces an account’s balance and a credit increases an account’s balance. A transfer can be thought of as a 2-step transaction where one user is debited and another is credited the required amount.

Every transaction has a status that can be used to gauge the state of the transaction. The statuses are:


| status        | description   |
| ------------- | ------------- | 
| Initiating  | processing the transaction insert | 
| Pending     | the transaction has passed all validation      |  
| Complete |the transaction has been applied succefully debited from the user third party provider account  |  
| Failed | the transaction failed from the third party channel   |  




Object

Transactions are basically a series of logs recording payments intents users on an account. With this in mind, transactions contain information that can be used to identify who made the transaction, what the transaction was made on, and what's the current status of the transaction.

A full transaction object looks like:

```
{
    "status": "success",
    "data":  {
        "id": "00000000-0000-0000-0000-000000000000",
        "collection": "00000000-0000-0000-0000-000000000000",
        "parent": null,
        "partner": null,
        "tx_type": "credit",
        "subtype": null,
        "note": "",
        "metadata": {},
        "status": "Pending",
        "reference": "",
        "amount": 500,
        "total_amount": 500,
        "balance": 0,
        "account": "0000000000",
        "label": "Credit",
        "company": "Duniapay",
        "currency": {
            "description": "CFA",
            "code": "XOF",
            "symbol": "CFA",
            "unit": "rand",
            "divisibility": 2
        },
        "user": {
            "id": "00000000-0000-0000-0000-000000000000",
            "first_name": "Joe",
            "last_name": "Soap",
            "email": "joe@duniapay.com",
            "username": null,
            "mobile": "+27840000000",
            "profile": null,
            "temporary": false
        },
        "messages": [],
        "archived": false,
        "created": 1509618707485,
        "updated": 1509618708277
    }
}
```

The partner attribute will be populated with a pointer to the sender transaction.


Endpoints



