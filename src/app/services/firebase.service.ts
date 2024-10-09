import { Injectable, inject } from "@angular/core";
import { Firestore, collection, collectionData } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Empleado } from "../interfaces/empleado.interface";
import { addDoc } from "firebase/firestore";


const PATH = 'empleadosferia';

@Injectable({
    providedIn: 'root'
})

export class firebaseService {
    public _firestore = inject(Firestore);

    public _collection = collection(this._firestore, PATH);

    getEmployes(){
        return collectionData(this._collection) as Observable<Empleado[]>;
    }

    sendEmployes(codigoEmpleado : Empleado){
        return addDoc(this._collection, codigoEmpleado)
    }
}