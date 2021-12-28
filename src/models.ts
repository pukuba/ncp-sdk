/**
 * @param {string} accessKey Naver Cloud Platform access key
 * @param {string} secretKey Naver Cloud Platform secret key
 * @param {string | undefined} smsKey Naver Cloud Platform sms key
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
	receiver: string[]
	content: string
}

export interface SendMailResponse {
	requestId: string
	count: number
}

export interface SendSMSResponse {
	statusCode: string
	statusName: string
	requestId: string
	requestTime: string
}
