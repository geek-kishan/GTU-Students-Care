import { AbstractControl } from "@angular/forms";
import { Observable, Observer } from "rxjs";


export const mime = (control: AbstractControl): Promise<{[ key: string ]: any}> | Observable<{[ key: string ]: any}> => {

	const file = control.value as File;
	const fileReader  = new FileReader();
	const frObs = Observable.create((observer : Observer<{[ key: string ]: any}> ) => {
		fileReader.addEventListener("loadend", () => {
			const arr = new Uint8Array(<ArrayBuffer>fileReader.result).subarray(0, 4);
			let header ="";
			let isValid = false; 
			for (let i =0; i<arr.length; i++) {
				header+= arr[i].toString(16);
			}
			switch(header){
				case "255044462d":
				isValid = true;
				break;
				default:
				isValid = false;
				break;
			}
			if(isValid) {
				observer.next(null);
			}else{
				observer.next({invalidMimeType: true})
			}
			observer.complete();
		});
		fileReader.readAsArrayBuffer(file);
	});
	return frObs;
};