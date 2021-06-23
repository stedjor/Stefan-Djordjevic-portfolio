import { AngularFireStorage } from "@angular/fire/storage";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  AngularFirestoreCollection,
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { Cars } from "./cars";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AdsService {
  carsCollection: AngularFirestoreCollection<Cars>;
  carsDocument: AngularFirestoreDocument<Cars>;
  carsForm: FormGroup;
  filterForm: FormGroup;
  downloadURL: any;
  imageURL: string;
  img: string[] = [];

  constructor(
    private afs: AngularFirestore,
    private fb: FormBuilder,
    private afStorage: AngularFireStorage
  ) {
    this.carsCollection = this.afs.collection("ads");
  }

  createCarForm() {
    return (this.carsForm = this.fb.group({
      autor: "",
      autorId: "",
      imgAfsId: null,
      images: [],
      date: new Date(),
      saller: this.fb.group({
        countries: ["", Validators.required],
        town: ["", Validators.required],
        adress: ["", Validators.required],
        adressNumber: ["", Validators.required],
        phone: ["", Validators.required],
      }),
      car: this.fb.group({
        brand: ["", Validators.required],
        model: ["", Validators.required],
        carMark: "",
        age: ["", Validators.required],
        price: ["", Validators.required],
        engine: ["", Validators.required],
        transmission: ["", Validators.required],
        kwKs: ["", Validators.required],
        fuels: ["", Validators.required],
        colors: ["", Validators.required],
        mileage: ["", Validators.required],
        doors: ["", Validators.required],
        seats: ["", Validators.required],
      }),
      comments: [],
    }));
  }

  createFilteredForm() {
    return (this.filterForm = this.fb.group({
      countries: "",
      town: "",
      brand: "",
      model: "",
      fromAge: "",
      toAge: "",
      fromPrice: "",
      toPrice: "",
      transmission: "",
      fuels: "",
      colors: "",
      mileage: "",
    }));
  }

  getCars() {
    return this.carsCollection.snapshotChanges().pipe(
      map((action) => {
        return action.map((res) => {
          const data = res.payload.doc.data() as Cars;
          const id = res.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getCarData(id: string) {
    this.carsDocument = this.afs.doc(`ads/${id}`);
    return this.carsDocument.valueChanges();
  }

  getCar(id: string) {
    return this.afs.doc(`ads/${id}`);
  }

  createCars(data: Cars) {
    return this.carsCollection.add(data);
  }

  updateCars(id: string, formData) {
    return this.getCar(id).update(formData);
  }

  deleteCars(id: string) {
    return this.getCar(id).delete();
  }

  uploadImage(event, pathName) {
    const file = event.target.files[0];
    const randomId = Math.random().toString(36).substring(2);
    const fileName = file.name.split(".");
    const newFileName = fileName[0] + randomId + "." + fileName[1];
    const path = `${pathName}/${newFileName}`;

    if (file.type.split("/")[0] !== "image") {
      return alert("only image files allowed");
    } else {
      const task = this.afStorage.upload(path, file);
      this.downloadURL = task
        .then(() => {
          const ref = this.afStorage.ref(path);
          return ref.getDownloadURL().subscribe((url) => {
            this.imageURL = url;
            if (pathName === "cars") {
              this.img.push(this.imageURL);
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  updateComments(id: string, comments: any[]) {
    return this.getCar(id).update({ comments });
  }
}
