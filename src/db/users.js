import { addUserMessages, addMessage } from './messages.js'


var users_db = []

// TODO: switch to map if needed

export function registerPerson(username, nickname, password, img) {
    if (!(typeof username === 'string' || username instanceof String)) {
        return 'error';
    }
    if (!(typeof nickname === 'string' || nickname instanceof String)) {
        return 'error';
    }
    if (!(typeof password === 'string' || password instanceof String)) {
        return 'error';
    }
    // if (!(typeof img === 'string' || img instanceof String)) {
    //     return 'error';
    // }

    users_db.push({
        username,
        nickname,
        password,
        img,
        contacts: []
    });

    addUserMessages(username)
}

export function findPerson({ username, nickname, password }) {
    let result = users_db;
    if (typeof username === 'string' || username instanceof String) {
        result = result.filter(person => person.username === username);
    }
    if (typeof nickname === 'string' || nickname instanceof String) {
        result = result.filter(person => person.nickname === nickname);
    }
    if (typeof password === 'string' || password instanceof String) {
        result = result.filter(person => person.password === password);
    }
    return result;
}

export function resetUsers() {
    users_db = [];
}

export function addContact(usernameAddTo, usernameToAdd) {
    let person = users_db.filter(person => person.username === usernameAddTo);

    if (person.length === 0) {
        return 'error'
    }

    person[0].contacts.push(usernameToAdd);
}

registerPerson('admin', 'admin', 'admin', 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/640px-SpongeBob_SquarePants_character.svg.png');
registerPerson('mike', 'mike', 'admin', 'https://i1.sndcdn.com/avatars-vzVavnrNStPmzryz-P4cGOw-t500x500.jpg');
registerPerson('jhon', 'jhon', 'admin', 'https://www.koimoi.com/wp-content/new-galleries/2022/01/john-cena-on-him-being-a-part-of-wrestlemania-38-001.jpg');
registerPerson('world', 'demargorgon the world destroyer', 'admin', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/06c16d28-cd3e-4d0b-99e6-f90aed576383/d2sxeyh-e174b290-0411-4337-a6da-ae452ef79dd9.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA2YzE2ZDI4LWNkM2UtNGQwYi05OWU2LWY5MGFlZDU3NjM4M1wvZDJzeGV5aC1lMTc0YjI5MC0wNDExLTQzMzctYTZkYS1hZTQ1MmVmNzlkZDkuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.D7iDs1kdPouSRLHw5i7UrJdIiWIie8h0TYhJtQmk4mI');
registerPerson('will', 'Wili', 'admin', 'https://c.tenor.com/clPXsR7DFm8AAAAC/chris-rock-slap-will-smith-slap.gif');