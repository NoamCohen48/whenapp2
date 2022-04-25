
var messages_db = new Map();

export function addUserMessages(contact) {
    messages_db.set(contact, []);
}

export function addMessage(contact, iSent, type, data, date) {
    let id = messages_db.get(contact).length;
    messages_db.get(contact).push({
        iSent,
        type,
        data,
        date,
        id
    });
}

export function resetMessages() {
    for (const [key, value] of messages_db.entries()) {
        messages_db.set(key, []);
    }
}

export function receiveMessages(contact) {
    if (!(typeof contact === 'string' || contact instanceof String)) {
        return 'error';
    }
    return messages_db.get(contact)
}

