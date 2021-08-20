export const addChatHistory = (history, newMsg) => {
    const roomId = Object.keys(newMsg)[0]
    if (!history) {
        history = {}
    }
    if (!history[roomId]) {
        history[roomId] = []
    }
    history[roomId].unshift(newMsg[roomId])
    return history
}

export const addUnReadChat = (message, unRead, roomId) => {
    let newUnRead = { ...unRead }
    let count
    newUnRead[roomId] ? (count = newUnRead[roomId].count + 1) : (count = 1)
    newUnRead[roomId] = { count: count, text: message.msg }
    return newUnRead
}

export const clearNotification = (unRead, roomId) => {
    if (!unRead[roomId]) return;
    let newUnRead = { ...unRead };
    newUnRead[roomId].count = 0;
    return newUnRead
}