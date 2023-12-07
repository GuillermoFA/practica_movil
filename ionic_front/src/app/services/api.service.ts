import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiService {


  private urlApi = 'http://localhost:5233/api/User'
  constructor(private httpClient: HttpClient) { }

  public get() {
    return this.httpClient.get<any>(this.urlApi);
  }

  public updateProfile(id: number, data: any) {
    const profileUrl = `${this.urlApi}/profile/${id}`;
    return this.httpClient.put(profileUrl, data);
  }

  public updateFramework(id: number, data: any) {
    const frameworkUrl = `${this.urlApi}/framework/${id}`;
    return this.httpClient.put(frameworkUrl, data);
  }

  public updateInterest(id: number, data: any) {
    const interestUrl = `${this.urlApi}/interest/${id}`;
    return this.httpClient.put(interestUrl, data);
  }


}
