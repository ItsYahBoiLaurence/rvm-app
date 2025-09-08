export interface Data {
    rvmID: string
    timestamp: string
    totalCount: number
    totalValue: number
    item: {
        plastic: number
        can: number
    }
    messageId: string
    userID: string
    sign: string
}

export interface DataReturnPayload {
    code: 0 | 201 | 202 | 203
    msg: string
}