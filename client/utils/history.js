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