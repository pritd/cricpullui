import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessagePackHubProtocol } from '@microsoft/signalr-protocol-msgpack'
import { Summary } from '../models/ScoreSummary';
@Injectable({providedIn : 'root'})
export class ScoreBarService{
    private hubConnection: HubConnection;
    private apiUrl = 'https://localhost:7265/LiveScore';
  
    response = signal<Summary>(new Summary());    
    
    
    constructor(private http: HttpClient) 
    {
        this.hubConnection = this.getConnection();
    }
  
    public connect = () => {
      this.startConnection();
      this.addListeners();
    }
  
    private getConnection(): HubConnection {
      return new HubConnectionBuilder()
        .withUrl(this.apiUrl)
        .withHubProtocol(new MessagePackHubProtocol())
        //  .configureLogging(LogLevel.Trace)
        .build();
    }
  
    private startConnection() {
      this.hubConnection = this.getConnection();
  
      this.hubConnection.start()
        .then(() => console.log('connection started'))
        .catch((err) => console.log('error while establishing signalr connection: ' + err))
    }
  
    private addListeners() {
      this.hubConnection.on("ReceiveScoreSummary", (data: string) => {
        this.response.set(JSON.parse(data));
      })
    }



}