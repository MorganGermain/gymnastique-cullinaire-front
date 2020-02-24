import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private baseApi: string = 'http://localhost:5000/';

  constructor(public httpClient: HttpClient) { }

  private get(resourceUri: string): Observable<any> {
    return this.httpClient.get(this.baseApi + resourceUri);
  }

  private post(resourceUri: string, data: any, options?: any): Observable<any> {
    return this.httpClient.post(this.baseApi + resourceUri, data, options);
  }

  private put(resourceUri: string, data: any): Observable<any> {
    return this.httpClient.put(this.baseApi + resourceUri, data);
  }

  private delete(resourceUri: string, data: any): Observable<any> {
    return this.httpClient.delete(this.baseApi + resourceUri, data);
  }

  public getRecettes(): Observable<any> {
    return this.get('recipes');
  }

  public getPdf(ids: any): Observable<any> {

    
    // let headers = new HttpHeaders();
    // headers = headers.append('responseType', 'arraybuffer')
    // headers = headers.append('Content-Type', 'application/octet-stream')
    return this.post('recipes/generate', ids);
  }

}
