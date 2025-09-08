export interface User {
    messageID: string
    timestamp: string
    userID: string
    sign: string
}

export interface UserReturnPayload {
    messageID: string
    timestamp: string
    status: 1 | -1 | -2
    code: 0 | 200 | 201 | 202 | 203
}

// code:
// 0 - The request is normal and the server handles it normally
// 201 The datagram is abnormal
// 202 The necessary parameters are missing
// 203 Data logging failed