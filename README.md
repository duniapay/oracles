# Fiat - crypto on/off ramp on CELO Blockchain using oracles 

## User Journey
Using peer-to-peer Network in developing countries can be challenging because, there is no enforced fiat rails for customer to go from cash to crypto. There are solutions to this problem but they come in centralized forms which would require trusting a third party and having to provide identification. Certain countries would have cryptocurrencies banned and therefore no access to centralized exchanges but those countries would still have access to payment services such as Paypal.

## Solution
The solution was to use smart contracts that can interact with real world data through the use of `BandProtocol Oracles`. The use of BandProtocol allows the contract to be able to confirm whether or not a casino or cashout intent has been paid or not.
This solution involves a user, creating a cashin or a cashout intent from his mobile wallet for an agreed amount of ERC2O and locking up the ERC2O in a smart contract. This ERC2O is then unlocked when the intent is paid by the user or by the third party payment provider, the smart contract uses BandProtocol Oracles to confirm that the intent has been paid. If the intent is paid then the user will get his wallet balance funded, or if the intent isn't paid or fails in the process, then the transaction is reverted .

## Procedure
-  `Mobile Money` Users wanting to deposit funds via Mobile Money would first create a `cashin intent` from their mobile app. By tappng the special ussd * *333*45345345# * form their mobile money service provider. They will receive a 6 digits One time code valid 10 min for the payment. Once they received the OTP code the user have to launch the *DuniaPay* mobile wallet application and create a deposit by providing the six digits ` OTP Code` they received, the amount to be funds into his wallet account.

- `Bank wyre` Users wanting to deposit ERC2O via Mobile Money would first create a cashin intent by wiring the deposit amount. They should receive a x digits transaction id after the funds has been wired. Once they received the intent code they would have to go their mobile wallet and make a deposit with the x transaction id intent code that they receive with the amount to be deposited into his account.

- `Cash counter` Users wanting to deposit ERC2O via Mobile Cash counter first go to agent or partnered store request a cashin intent by paying the equivalent amount to funds their wallet to the agent. They should receive a 6 digits transaction code after the agent makes the deposit to the user from his mobile app. Once they payment is created by the merchant the user account is automatically funded

- `Credit card` - `Debit card` Users wanting to deposit ERC2O via`Credit card` - `Debit card` would first make their payment via credit card or debit card. Once the payment is confirmed ,the equivalent amount of funds will be deposited in the user account. 

- `Withdraw to fiat` : A withdraw is created from the user wallet. The user will have to provide a `payment channel` where  they'd like to receive they payment. Once they withdraw is confirmed by the user the funds will be locked and forward to the specified `payment channel`. Once the payment is confirmed the status will be forwarded to the blockchain and the locked tokens will be burned


## Overview

to do

## Features

- [ ] ERC20 to Fiat / Fiat to ERC20
- [ ] Mobile Money Fiat Payment
- [ ] Bank account Payments
- [ ] Credit card - Debit card Fiat Payments
- [ ] Encrypted Maker api credentials
- [ ] DApp UI

## How it Works

Transactions
Transactions are a way to manage value on and between accounts in the `DuniaPay platform`.  Every transaction can be either a debit or a credit. In simple terms debit reduces an account’s balance and a credit increases an account’s balance.

Every transaction has a status that can be used to gauge the state of the transaction. The statuses are:


| status        | description   |
| ------------- | ------------- | 
| Initiating  | processing the transaction insert | 
| Pending     | the transaction has passed all validation      |  
| Complete |the transaction has been applied succefully debited from the user third party provider account  |  
| Failed | the transaction failed from the third party channel   |  




Object

Transactions are basically a series of logs recording payments intents on a user account. With this in mind, transactions contain information that can be used to identify who made the transaction, what the transaction was made on, and what's the current status of the transaction.

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

`curl --request POST --header "Content-Type: application/json" "https://firestore.googleapis.com/v1/projects/website-ce245/databases/(default)/documents/store/"`
