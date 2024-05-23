import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, ReplaySubject, throwError } from 'rxjs';
 
@Injectable({
  providedIn: 'root',
})
export class HttpService {
   api:string="";
 status=new ReplaySubject(1)
 loader=new ReplaySubject(1) 
 queryCounter=0
  constructor(private http: HttpClient){
  }
  setStatus(status){
    this.status.next(status)
  }
  setLoader(status){
    this.loader.next(status)
  }
 setApi(api){
  this.api=api
 }
 getApi(){
  return this.api
 }
 getServerUrl(){
  return ""
  return this.api+"/web/"  
 }
  get(url){
    let headers = new HttpHeaders();
    let options = { headers: headers, withCredentials: true }
    return this.http.get(this.getServerUrl()+url, options).pipe(
      catchError((err) => {
        return throwError(err);  
      })
    )
  }
  post(url, body, head={}){
    let headers = new HttpHeaders(head);
    let options = { headers: headers, withCredentials: true}
    return this.http.post(this.getServerUrl()+url, body, options ).pipe(
      catchError((err) => {
        return throwError(err);  
      })
    ) 
   }
   download(url, body){
    let headers = new HttpHeaders( );
    let options = { headers: headers, withCredentials: true , responseType: 'blob' as 'json'}
  
    return this.http.post(this.getServerUrl()+url, body, options).pipe(
      catchError((err) => {
        return throwError(err);  
      })
    ) 
   }
   put(url, body){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers, withCredentials: true  }
    return this.http.put(this.getServerUrl()+url, body, options) 
  }
  putBlob(url, body){
    let headers = new HttpHeaders({
      
    });
    let options = { headers: headers, withCredentials: true  }
    return this.http.post(this.getServerUrl()+url, body, options).pipe(
      catchError((err) => {
        return throwError(err);  
      })
    )
  }
  patchBlob(url, body){
    let headers = new HttpHeaders({
      
    });
    let options = { headers: headers, withCredentials: true  }
    return this.http.post(this.getServerUrl()+url, body, options).pipe(
      catchError((err) => {
        return throwError(err);  
      })
    )
  }
  
  delete(url, body){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
       withCredentials: true,
       body: body,
    };
    return this.http.delete(this.getServerUrl()+url, options).pipe(
      catchError((err) => {
        return throwError(err);  
      })
    )

  }
  patch(url, body){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers, withCredentials: true  }
    return this.http.patch(this.getServerUrl()+url, body, options).pipe(
      catchError((err) => {
        return throwError(err);  
      })
    )
  }
}
