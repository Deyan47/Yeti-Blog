import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ChatMessage } from '../../models/chat/chat';
import { UserServiceService } from '../user/user-service.service';

import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore'

@Injectable()
export class ChatService {
  messagesCollection!: AngularFirestoreCollection<ChatMessage>;
  chatMessageDoc!: AngularFirestoreDocument<ChatMessage>;
  chatMesasges!: Observable<ChatMessage[]>;

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    public afs: AngularFirestore,
    private userService: UserServiceService
  ) {
    this.messagesCollection = this.afs.collection('chat-messages');

    this.loadMessages();
  }

  getAllMessages() {
    return this.chatMesasges;
  }

  loadMessages() {
    this.chatMesasges = this.messagesCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as ChatMessage;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  deleteMessage(message: ChatMessage) {
    this.chatMessageDoc = this.afs.doc(`chat-messages/${message.id}`);
    this.chatMessageDoc.delete();
  }

  postMessage(content: string) {
    let message: ChatMessage = {
      content: content,
      createdOn: new Date().toLocaleString('en-US'),
      user: this.userService.currentUser,
    };
    this.messagesCollection.add(message);
  }
}