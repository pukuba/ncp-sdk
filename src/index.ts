import { NcloudSDKInput, SendMailInput, SendSMSInput } from "./models"
import axios, { AxiosResponse } from "axios"
import crypto from "crypto-js"

/**
 * @module NcloudSDK
 */
export class NcloudSDK {
    /** @private @readonly @type {string} */
    private readonly secretKey: string
    /** @private @readonly @type {string} */
    private readonly accessKey: string
    /** @private @readonly @type {string} */
    private readonly smsKey?: string

    /**
     * @param {Object} args
     * @param {string} args.accessKey
     * @param {string} args.secretKey
     * @param {string | undefined} args.smsKey
     */
    constructor(args: NcloudSDKInput) {
        if (args.accessKey === undefined) throw new Error("accessKey is not defined")
        if (args.secretKey === undefined) throw new Error("secretKey is not defined")
        this.secretKey = args.secretKey
        this.accessKey = args.accessKey
        this.smsKey = args.smsKey
    }

    /**
     * @param {Object} args
     * @param {string} args.sender Sender email address
     * @param {string} args.receiver Receiver email address
     * @param {string} args.title Email title
     * @param {string} args.content Email content
     * @param {string | undefined} args.senderName Sender name
     * @return {AxiosResponse} The AxiosResponse value
     */
    async sendMail(args: SendMailInput): Promise<AxiosResponse> {
        const { sender, receiver, content, title, senderName } = args
        return await axios
            .post(`https://mail.apigw.ntruss.com/api/v1/mails`, {
                headers: this.createHeader("mail"),
                data: JSON.stringify({
                    senderAddress: sender,
                    senderName: senderName || sender,
                    title,
                    body: content,
                    recipients: [{ address: receiver, type: "R" }],
                }),
            })
            .then((res) => res.data)
    }

    /**
     * @param {Object} args
     * @param {string} args.sender Sender phone number
     * @param {string} args.receiver Receiver phone number
     * @param {string} args.content SMS content
     * @return {AxiosResponse} The AxiosResponse value
     */
    async sendSMS(args: SendSMSInput): Promise<AxiosResponse> {
        if (!this.smsKey) throw new Error("SMS key is not defined")
        const { sender, receiver, content } = args
        return await axios
            .post(`https://sens.apigw.ntruss.com/sms/v2/services/${this.smsKey}/messages`, {
                headers: this.createHeader("sms"),
                data: JSON.stringify({
                    type: "SMS",
                    countryCode: "82",
                    from: sender,
                    contentType: "COMM",
                    content: content,
                    messages: [{ to: receiver }],
                }),
            })
            .then((res) => res.data)
    }

    private createHeader(service: string) {
        const timeStamp = Date.now().toString()
        const endPoint =
            service === "sms" ? `/sms/v2/services/${this.smsKey}/messages` : `/api/v1/mails`
        const hmac = crypto.algo.HMAC.create(crypto.algo.SHA256, this.secretKey)
        hmac.update("POST")
        hmac.update(" ")
        hmac.update(endPoint)
        hmac.update("\n")
        hmac.update(timeStamp)
        hmac.update("\n")
        hmac.update(this.accessKey)

        return {
            "Content-Type": "application/json; charset=utf-8",
            "x-ncp-iam-access-key": this.accessKey,
            "x-ncp-apigw-timestamp": timeStamp,
            "x-ncp-apigw-signature-v2": hmac.finalize().toString(crypto.enc.Base64),
        }
    }
}

export default NcloudSDK
