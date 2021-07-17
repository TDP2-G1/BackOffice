import firebase from "../firebase";

class MessageDataService {
    getAll() {
        const ref = firebase.ref('messages');
        ref.on('value', (snapshot) => {
            const data = snapshot.val();
            console.log(data);
        });
    }
}

export default new MessageDataService();