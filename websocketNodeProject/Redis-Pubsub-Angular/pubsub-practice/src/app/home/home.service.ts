import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private eventSource: EventSource;

  constructor() {
    this.eventSource = new EventSource('http://localhost:3000/events');  
    // Agar aap yahan URL badalenge (e.g. http://localhost:8000/event), toh aap kisi specific server se connect karenge

    this.eventSource.onmessage = (event) => {
      console.log('New event:', event.data);
    };

    this.eventSource.onerror = (error) => {
      console.error('EventSource error:', error);
    };
  }

  closeConnection() {
    if (this.eventSource) {
      this.eventSource.close();
      console.log('EventSource connection closed');
    }
  }
}
