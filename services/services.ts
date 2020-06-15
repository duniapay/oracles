export const rp = require('request-promise')






let user: string = ' '

let pass: string = ' '

/**
 *  Disburse funds to mobile Money accounts
 * @param identifier 
 * @param firstName 
 * @param lastName 
 * @param amount 
 * @param provider  Mobile Money provider Name
 * @param phoneNumber 
 */
export async function disburseFunds(identifier: string, firstName: string, lastName: string, amount: Number, provider: IntouchProvider, phoneNumber: string, ) {
    if (typeof (typeof (provider))) {
        console.error('provider cant be undefined');
    }
    else if (typeof (phoneNumber)) {
        console.error('phoneNumber cant be undefined');
    } else if (typeof (identifier)) {
        console.error('identifier cant be undefined');
    } else if (typeof (firstName)) {
        console.error('firstName cant be undefined');
    } else if (typeof (lastName)) {
        console.error('lastName cant be undefined');
    }

    if (amount <= 0) return
    const options: any = {
        method: 'POST',
        auth: {
            'user': user,
            'pass': pass,
            'sendImmediately': false
        },
        uri: '',
        body: {},
        json: true
    }
    options.uri = IntouchEndPoint.CASHOUT
    options.body = {
        login_api: IntouchCredential.LOGIN_API,
        password_api: IntouchCredential.PASSWORD_API,
        call_back_url: IntouchCredential.CALLBACK_URL,
        partner_id: IntouchCredential.PARTNER_ID,
        amount: amount,
        partner_transaction_id: identifier,
        service_id: INTOUCH_SERVICE[provider]['CASHOUT'],
        recipient_phone_number: phoneNumber
    }
    try {
        const result = await rp(options);
        console.log('result', result);
        return result;
    } catch (error) {
        console.log('we have an error');
        console.log('error', error);
        return error;
    }
}


/**
 * Collect funds from mobile money account
 * 
 * @param identifier 
 * @param amount 
 * @param provider 
 * @param phoneNumber 
 * @param otp 
 */

export async function collectFundsFromMobileMoney(identifier: string, amount: Number, provider: IntouchProvider, phoneNumber: string, otp: string) {
    if (typeof (typeof (provider))) {
        console.log('provider cant be undefined');
    } else if (typeof (otp)) {
        console.log('otp cant be undefined');
    }
    else if (typeof (phoneNumber)) {
        console.error('phoneNumber cant be undefined');
    } else if (typeof (identifier)) {
        console.error('identifier cant be undefined');
    }
    if (amount <= 0) return

    const options: any = {
        method: 'PUT',
        auth: {
            'user': user,
            'pass': pass,
            'sendImmediately': false
        },
        uri: '',
        body: {},
        json: true
    }
    options.uri = IntouchEndPoint.CASHIN;
    options.body = {
        idFromClient: identifier,
        amount: amount,
        callback: IntouchCredential.CALLBACK_URL,
        recipientNumber: phoneNumber,
        serviceCode: INTOUCH_SERVICE[provider]['CASHIN'],
        additionnalInfos: {
            recipientEmail: '',
            recipientFirstName: '',
            recipientLastName: '',
        }
    }
    options.body.additionnalInfos = {
        ...options.body.additionnalInfos,
        destinataire: phoneNumber,
        otp: otp
    }

    try {
        const result = await rp(options);
        console.log('result', result);
        return result;
    } catch (error) {
        console.log('we have an error');
        console.log('error', error);
        return error;
    }

}



/**
 * Purchase airtime from mobile money provider
 * 
 * @param identifier
 * @param firstName 
 * @param lastName 
 * @param amount 
 * @param provider 
 * @param phoneNumber 
 */
export async function buyAirtime(identifier: string, firstName: string, lastName: string, amount: Number, provider: IntouchProvider, phoneNumber: string) {
    console.info('yes')
    if (typeof (typeof (provider))) {
        console.log('provider cant be undefined');
    }
    else if (typeof (phoneNumber)) {
        console.error('phoneNumber cant be undefined');
    } else if (typeof (identifier)) {
        console.error('identifier cant be undefined');
    } else if (typeof (firstName)) {
        console.error('firstName cant be undefined');
    } else if (typeof (lastName)) {
        console.error('lastName cant be undefined');
    }
    if (amount <= 0) return



    const options: any = {
        method: 'POST',
        auth: {
            'user': user,
            'pass': pass,
            'sendImmediately': false
        },
        uri: '',
        body: {},
        json: true
    }
    options.uri = IntouchEndPoint.AIRTIME
    options.body = {
        login_api: IntouchCredential.LOGIN_API,
        password_api: IntouchCredential.PASSWORD_API,
        call_back_url: IntouchCredential.CALLBACK_URL,
        partner_id: IntouchCredential.PARTNER_ID,
        amount: amount,
        // transaction_date: Date.now(),
        partner_transaction_id: identifier,
        service_id: INTOUCH_SERVICE[provider]['AIRTIME'],
        recipient_phone_number: phoneNumber
    }
    try {
        const result = await rp(options);
        console.log('result', result);
        return result;
    } catch (error) {
        console.log('we have an error');
        console.log('error', error);
        return error;
    }
}



/**Callback for transaction confirmations */


export const incomingWebhook = functions.https.onRequest(async (request: any, response) => {

    let data = request.body;
    console.info(data)

    let status: any = data.status
    let payload: any = data.partner_transaction_id.split("|");
    let senderId: any
    let transactionId: string
    let transactionType: string
    let amount: number

    if (payload !== undefined) {
        senderId = payload[0]
        transactionId = payload[1]
        transactionType = payload[2]
        amount = payload[3]
    } else {
        return
    }

    console.info('amount ', amount)
    console.info('transactionType ', transactionType)
    console.info('transactionId ', transactionId)
    console.info('senderId ', senderId)
    console.info(status)

    if (data.status === "SUCCESSFUL") {

        try {
            console.info('yes ', request.body)
            if (data.service_id === 'BF_AIRTIME_TELECEL' || data.service_id === 'BF_AIRTIME_TELMOB' || data.service_id === 'BF_AIRTIME_ORANGE') {
                console.info('well done ', request.body)
                let _user = await findUser({ uid: senderId })
                if (_user !== undefined) {
                    // await validateTransaction(_user?.uid, amount, false);
                    response.status(200)
                }

                else return
            } else if (data.service_id === "BF_PAIEMENTMARCHAND_OM" || data.service_id === "BF_PAIEMENTMARCHAND_MOBICASH") {
                console.info('success', request.body)
                let _user = await findUser({ uid: senderId })
                if (_user !== undefined) {
                    //  await validateTransaction(_user?.uid, amount, true);
                    await depositFunds(secretKey, _user.email, Number(amount))
                    response.status(200)
                }
                else return
            } else if (data.service_id == "BF_CASHIN_OM") {
                console.info('success', request.body)
                let _user = await findUser({ uid: senderId })
                if (_user !== undefined) {
                    //   await validateTransaction(_user?.uid, amount, false);

                    response.status(200)
                }
                else {
                    console.error(request.body)
                    return
                }
            } else if (data.service_id == "BF_CASHIN_MOBICASH") {
                console.info('success', request.body)
                let _user = await findUser({ uid: senderId })
                if (_user !== undefined) {
                    //await validateTransaction(_user?.uid, amount, false);

                    response.status(200)
                }
                else {
                    console.error(request.body)

                    return
                }
            }

        } catch (e) {
            console.error('failed ', e)
            response.status(404)
        }
    } else {
        console.info('failed ', request.body)
    }
    response.end()
});

