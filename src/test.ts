import dotenv from "dotenv"
import { NcloudSDK } from "./index"
import { deepStrictEqual as deepEqual, equal } from "assert"
dotenv.config()

describe("NcloudSDK Test", () => {
	describe("Constructor", () => {
		it("should be return error 'accessKey is not defined'", () => {
			try {
				new NcloudSDK({} as any)
			} catch (e: any) {
				equal(e.message, "accessKey is not defined")
			}
		})
		it("should be return error 'secretKey is not defined'", () => {
			try {
				new NcloudSDK({ accessKey: "" } as any)
			} catch (e: any) {
				equal(e.message, "secretKey is not defined")
			}
		})
	})
	describe("sendMail method", () => {
		describe("Invalid access key", () => {
			let sdk: NcloudSDK
			before(() => {
				sdk = new NcloudSDK({
					accessKey: "",
					secretKey: "",
				})
			})
			it("should be return http status 401 (1 / 2)", async () => {
				try {
					await sdk.sendMail({
						sender: "pukuba@kakao.com",
						receiver: "20sunrin041@sunrint.hs.kr",
						title: "test title",
						content: "test content",
					})
				} catch (e: any) {
					deepEqual(e.response.status, 401)
				}
			})
			it("should be return http status 401 (2 / 2)", async () => {
				try {
					await sdk.sendMail({
						sender: "pukuba@kakao.com",
						receiver: "20sunrin041@sunrint.hs.kr",
						title: "test title",
						content: "test content",
						senderName: "pukuba",
					})
				} catch (e: any) {
					deepEqual(e.response.status, 401)
				}
			})
		})

		describe("Valid access key", () => {
			let sdk: NcloudSDK
			before(() => {
				sdk = new NcloudSDK({
					accessKey: process.env.ACCESS_KEY as string,
					secretKey: process.env.SECRET_KEY as string,
				})
			})
			it("should be return valid SendMailResponse (1 / 1)", async () => {
				const res = await sdk.sendMail({
					sender: "pukuba@kakao.com",
					receiver: "20sunrin041@sunrint.hs.kr",
					title: "test title",
					content: "test content",
					senderName: "pukuba",
				})
				deepEqual(typeof res.requestId, "string")
				deepEqual(res.count, 1)
			})
		})
	})

	describe("SendSMS method", () => {
		describe("Invalid access key", () => {
			let sdk: NcloudSDK
			before(() => {
				sdk = new NcloudSDK({
					accessKey: "",
					secretKey: "",
				})
			})
			it("should be return SMS key is not defined error (1 / 1)", async () => {
				try {
					await sdk.sendSMS({
						sender: "01000000000",
						receiver: "01000000000",
						content: "test content",
					})
				} catch (e: any) {
					equal(e.message, "SMS key is not defined")
				}
			})
		})

		describe("Valid access key", () => {
			let sdk: NcloudSDK
			before(() => {
				sdk = new NcloudSDK({
					accessKey: process.env.ACCESS_KEY as string,
					secretKey: process.env.SECRET_KEY as string,
					smsKey: process.env.SMS_KEY as string,
				})
			})
			it("should be return valid SendSMSResponse (1 / 1)", async () => {
				const res = await sdk.sendSMS({
					sender: `${process.env.PHONE_NUMBER1}`,
					receiver: [`${process.env.PHONE_NUMBER2}`],
					content: "test content",
				})
				deepEqual(res.statusCode, "202")
				deepEqual(res.statusName, "success")
				deepEqual(typeof res.requestId, "string")
				deepEqual(typeof res.requestTime, "string")
			})
		})
	})
})
