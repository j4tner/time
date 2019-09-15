import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';


import { firestore } from 'firebase/app';
@Injectable({
  providedIn: 'root'
})

export class DataService {
  // user$: Observable<UserModel>;
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
  ) {
  }

  collection$(path, query?) {
    return this.afStore.collection(path, query).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data: Object = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  doc$(path): Observable<any> {
    return this.afStore.doc(path).snapshotChanges().pipe(
      map((doc) => {
        return { id: doc.payload.id, ...doc.payload.data() };
      })
    );
  }

  updateAt(path: string, data: object): Promise<any> {
    const segments = path.split('/').filter((v) => v);
    if (segments.length % 2) {
      // Odd is always a collection
      return this.afStore.collection(path).add(data);
    } else {
      // Even is always document
      // { merge: true } will create the document if it doent exist and will update the doc if it does
      return this.afStore.doc(path).set(data, { merge: true });
    }
  }

  updateDocArr(colId: string, docId: string, field: string, data: any) {
    return this.afStore.collection(colId).doc(docId).update({
      [field]: firestore.FieldValue.arrayUnion(data)
    });
  }

  delete(path: string, query?: string) {
    return this.afStore.doc(path).delete();
  }

  getUsers$() {
    // TODO: filter out loggedin user
    return (this.collection$('users', (ref) => {
      // const q1 = ref.orderBy('email').where('email', '<', 'aa@a.com');
      // const q2 = ref.orderBy('email').where('email', '>', 'aa@a.com');
      // return ref.orderBy('email');
      ref.orderBy('email');
      return ref.where('active', '==', true);
      // ref.where('email', '>', 'a@a.com');
      // return ref.where('email', '==', 'a@a.com');
      // return ref;
    }));
  }

  async getUsers() {
    return await this.getUsers$().pipe(take(1)).toPromise();
  }

  getUser$(uid: string) {
    return this.doc$(`users/${uid}`);
  }

  async getCurrentUser() {
    return await this.user$.pipe(take(1)).toPromise();
  }

  getUser(uid: string) {
    return this.getUser$(uid).pipe(take(1)).toPromise();
  }

  async getUsername(uid: string) {
    let username: string;
    await this.getUser(uid).then((user) => {
      username = user.username;
    });
    return username;
  }

  updateUsername(name) {
    const data = { username: name };
    return this.updateAt(`users/${this.afAuth.auth.currentUser.uid}`, data);
  }

  getSampleData$(uid: string) {
    return this.doc$(`sample/${uid}`);
  }

  getContacts$() {
    return (this.collection$(`users/${this.afAuth.auth.currentUser.uid}/contacts/`, (ref) => {
      return ref.orderBy('username');
    }));
  }

  isActive() {
    return this.user$.pipe(take(1), map((u) => u && u.active)).toPromise();
  }
}
