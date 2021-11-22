/**
 * @param {string} accessKey
 * @param {string} secretKey
 * @param {string | undefined} smsKey
 */
export interface NcloudSDKInput {
    accessKey: string
    secretKey: string
    smsKey?: string
}

/**
 * @param {string} sender Sender email address
 * @param {string} receiver Receiver email address
 * @param {string} title Email title
 * @param {string} content Email content
 * @param {string | undefined} senderName Sender name
 */
export interface SendMailInput {
    sender: string
    receiver: string
    title: string
    content: string
    senderName?: string
}

/**
 * @param {string} sender Sender phone number
 * @param {string} receiver Receiver phone number
 * @param {string} content SMS content
 */
export interface SendSMSInput {
    sender: string
    receiver: string
    content: string
}
