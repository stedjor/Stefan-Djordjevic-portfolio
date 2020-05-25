import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usersCollection: AngularFirestoreCollection<User>;
  userDocument: AngularFirestoreDocument<any>;
  userData: any;
  userStatus: string;
  user: any;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public afStorage: AngularFireStorage,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
    this.usersCollection = this.afs.collection('users');
    setTimeout(() => {
      this.user = JSON.parse(localStorage.getItem('user'));
    }, 100);
  }

  // Register user with email and password
  async register(registerObj) {
    return await this.afAuth.auth.createUserWithEmailAndPassword(registerObj.email, registerObj.password)
      .then((result) => {
        this.sendVerificationMail();
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  // Login with email and password
  async login(email: string, password: string) {
    return await this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.ngZone.run(() => {
          this.router.navigate(['profile']);
        });
      }).catch((error) => {
        window.alert(error.message);
      });
  }


  // Login with provider: google, facebook
  async providerLogin(provider) {
    return await this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['profile']);
        });
        console.log(result.user)
        this.setUserData(result.user);
      }).catch((error) => {
        console.log(error);
      });
  }

  // Login with google
  googleLogin() {
    return this.providerLogin(new auth.GoogleAuthProvider());
  }

  // Login with facebook
  // facebookLogin() {
  //   return this.providerLogin(new auth.FacebookAuthProvider());
  // }

  get authenticated(): boolean {
    return this.userData !== null;
  }

  get currentUserId(): string {
    return this.authenticated ? this.userData.uid : null;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // get isLoggedInAsAdmin(): boolean {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   this.getUserData(user.uid).subscribe(a => {
  //     this.userStatus = a.status;
  //   });
  //   return (user !== null && user.emailVerified !== false && this.userStatus === 'admin') ? true : false;
  // }

  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      status: 'user'
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  getUsers() {
    return this.usersCollection.snapshotChanges().pipe(map(action => {
      return action.map(res => {
        const data = res.payload.doc.data() as User;
        const id = res.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getUserData(id: string) {
    this.userDocument = this.afs.doc(`users/${id}`);
    return this.userDocument.valueChanges();
  }

  getUser(id: string) {
    return this.afs.doc(`users/${id}`);
  }

  updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      status: user.status
    };
    return userRef.update(userData);
  }

  async sendVerificationMail() {
    return await this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }

  async forgotPassword(passwordResetEmail) {
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error);
      });
  }

  updateMessages(id: string, messages: any[]) {
    return this.getUser(id).update({ messages });
  }

  async logOut() {
    return await this.afAuth.auth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      });
  }
}
