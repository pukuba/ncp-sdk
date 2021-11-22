# ncp-sdk

[![codecov](https://codecov.io/gh/pukuba/ncp-sdk/branch/master/graph/badge.svg?token=JRJ98QC1M3)](https://codecov.io/gh/pukuba/ncp-sdk)
[![Build Status](https://app.travis-ci.com/pukuba/ncp-sdk.svg?token=Qfh1H9rnMEdALKheMgyU&branch=master)](https://app.travis-ci.com/pukuba/ncp-sdk)

| Class     | Method                           | Description                                                                  |
| --------- | -------------------------------- | ---------------------------------------------------------------------------- |
| NcloudSDK | [**sendMail**](src/models.ts#19) | NCP의 Cloud Outbound Mailer를 이용하여 메일을 전송합니다                     |
| NcloudSDK | [**sendSMS**](src/models.ts#32)  | NCP의 Simple & Easy Notification Service를 이용하여 문자 메세지를 전송합니다 |

## Mail 전송 예시

```js
import { NcloudSDK } from "ncp-sdk"

const sdk = new NcloudSDK({
    accessKey: process.env.ACCESS_KEY,
    secretKey: process.env.SECRET_KEY,
})

sdk.sendMail({
    sender: "pukuba@kakao.com",
    receiver: "20sunrin041@sunrint.hs.kr",
    title: "test email title",
    content: "test email content",
}).then((res) => console.log(res))
```

## 메세지 전송 예시

```js
import { NcloudSDK } from "ncp-sdk"

const sdk = new NcloudSDK({
    accessKey: process.env.ACCESS_KEY,
    secretKey: process.env.SECRET_KEY,
    smsKey: process.env.SMS_KEY,
})

sdk.sendSMS({
    sender: "010xxxxxxxx",
    receiver: "010xxxxxxxx"
    content: "test sms content"
}).then((res) => console.log(res))
```
