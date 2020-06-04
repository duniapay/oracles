# Fiat to crypto ramp on CELO Blockchain using Oracles


## Overview

This fiat gateway provides a fast and decentralized way to sell crypto for fiat and vice versa.

Any number of fiat payment networks can be supported. Each must provide a external adapter implementation to handle paying out and checking payments in.

A pool of Makers provide fiat and crypto liquidity to the system. They receive a fee for each trade. The fee is the same for all Makers.

A Taker buys crypto for fiat or fiat for crypto. They get the current market price minus a fixed Makers fee.

Differences from localethereum:
- fiat payments for sells are executed by Oracles
- fiat payments for buys are executed outside the system but are checked by Oracles before crypto is released
- trades are direct swaps with fixed fees (there is no order book)

Differences from traditional centralized gateways:
- transparency - orders are initiated and finalised on chain
- peer to peer - registered Makers to any Taker
- trusted Oracles (later can be trustless with a TEE deployment) executing payment network transactions

## Features

- [ ] CUSD to Fiat / Fiat to CUSD
- [ ] ERC20 to Fiat / Fiat to ERC20
- [ ] Paypal Fiat Payments
- [ ] Mobile Money Fiat Payments
- [ ] USSD Fiat Payments
- [ ] SEPA Fiat Payments
- [ ] Encrypted Maker api credentials
- [ ] DApp UI

## How it Works

Transactions
Transactions are a way to manage value on and between accounts in the `DuniaPay platform`. Transaction can be only a `credit`.  A credit transaction increases an account’s balance. 

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
        "company": "rehive",
        "currency": {
            "description": "Rand",
            "code": "ZAR",
            "symbol": "R",
            "unit": "rand",
            "divisibility": 2
        },
        "user": {
            "id": "00000000-0000-0000-0000-000000000000",
            "first_name": "Joe",
            "last_name": "Soap",
            "email": "joe@rehive.com",
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



