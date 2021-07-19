import firebase from "../firebase";

class MessageDataService {
    getAll(callback) {
        const ref = firebase.ref('messages');
        ref.on('value', (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            callback(data)
        });
    }
}

export default new MessageDataService();