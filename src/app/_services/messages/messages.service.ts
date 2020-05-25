import { Messages } from './messages';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  user;
  messageCollection: AngularFirestoreCollection<Messages>;
  messDocument: AngularFirestoreDocument<Messages>;


  constructor(
    private afs: AngularFirestore,
    private fb: FormBuilder,
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.messageCollection = this.afs.collection('messages');
  }

  // Create message
  createMessage(autor: string, photoURL: string, messages: any) {
    const userId = this.user.uid;
    return this.messageCollection.doc(userId).set({
      autor,
      photoURL,
      messages
    });
  }

  // Get message
  getMessage(id: string) {
    return this.afs.doc(`messages/${id}`);
  }

  // Get messages
  getMessages(id: string) {
    return this.getMessage(id).valueChanges();
  }
  // Update message
  updateMessages(id: string, messages: any[]) {
    return this.getMessage(id).update({ messages });
  }
  // Get senders
  getSenders() {
    return this.messageCollection.snapshotChanges().pipe(map(action => {
      return action.map(res => {
        const data = res.payload.doc.data() as Messages;
        const id = res.payload.doc.id;
        return { id, ...data };
      });
    }));
  }
}
