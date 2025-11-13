// // src/app/services/ws.service.ts

// import { Injectable } from '@angular/core';
// import { Subject, Observable } from 'rxjs';
// import * as Stomp from '@stomp/stompjs';
// import { environment } from 'src/environments/environment';

// /**
//  * Interface matching the WsEvent<T> structure from the backend:
//  * { type: string, payload: T, refId: number | null }
//  */
// interface WsEvent<T> {
//   type: string;
//   payload: T;
//   refId: number | null;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class WsService {
//   private stompClient: Stomp.Client | null = null;
//   private eventSubject = new Subject<WsEvent<any>>();
//   public events$: Observable<WsEvent<any>> = this.eventSubject.asObservable();
//   private subscriptions: { [topic: string]: Stomp.StompSubscription } = {};

//   // NOTE: This property relies on the fix in Step 1
//   private readonly WS_ENDPOINT = (environment as any).wsBaseUrl;

//   constructor() {
//     this.stompClient = new Stomp.Client({
//       brokerURL: this.WS_ENDPOINT,
//       reconnectDelay: 5000,
//       heartbeatIncoming: 4000,
//       heartbeatOutgoing: 4000,
//     });
//   }

//   /**
//    * Connects to the WebSocket/STOMP endpoint.
//    */
//   public connect(): void {
//     if (this.stompClient && this.stompClient.connected) {
//       console.warn('STOMP client is already connected.');
//       return;
//     }
//     console.log(this.stompClient);
    

//     this.stompClient!.onConnect = (frame) => {
//       console.log('STOMP Connected:', frame);
//       // The ForumMainComponent will call subscribeToTopic after this.connect()
//     };

//     this.stompClient!.onStompError = (frame) => {
//       console.error('STOMP Error:', frame);
//     };

//     // Activate the client to initiate the connection
//     this.stompClient!.activate();
//   }

//   /**
//    * Disconnects from the WebSocket/STOMP endpoint.
//    */
//   public disconnect(): void {
//     if (this.stompClient && this.stompClient.connected) {
//       // Unsubscribe from all active topics before disconnecting
//       Object.keys(this.subscriptions).forEach(topic => {
//         this.subscriptions[topic].unsubscribe();
//         delete this.subscriptions[topic];
//       });

//       this.stompClient.deactivate().then(() => {
//         console.log('STOMP Disconnected');
//       });
//     }
//   }

//   /**
//    * Subscribes to a specific WebSocket topic and handles incoming messages.
//    * @param topic The STOMP topic path (e.g., '/topic/title.1' or '/topic/post.123')
//    */
//   public subscribeToTopic(topic: string): void {
//     if (!this.stompClient || !this.stompClient.connected) {
//       console.warn(`STOMP not connected. Cannot subscribe to ${topic}.`);
//       return;
//     }

//     // Prevent duplicate subscriptions and handle switching post topics
//     if (topic.startsWith('/topic/post')) {
//          // Unsubscribe previous post topic if exists and is different
//          const oldPostTopic = Object.keys(this.subscriptions).find(t => t.startsWith('/topic/post') && t !== topic);
//          if (oldPostTopic) {
//              this.subscriptions[oldPostTopic].unsubscribe();
//              delete this.subscriptions[oldPostTopic];
//              console.log(`Unsubscribed from old post topic: ${oldPostTopic}`);
//          }
//       } else if (this.subscriptions[topic]) {
//          // Already subscribed to this exact topic (e.g., title.1), so do nothing
//          return;
//       }
    

//     this.subscriptions[topic] = this.stompClient.subscribe(topic, (message) => {
//       try {
//         const event = JSON.parse(message.body) as WsEvent<any>;
//         // Push the parsed event to the subject for ForumMainComponent to handle
//         this.eventSubject.next(event);
//       } catch (e) {
//         console.error('Error parsing WS message:', e);
//       }
//     });

//     console.log(`Subscribed to topic: ${topic}`);
//   }

//   /**
//    * Unsubscribes from a topic. Use this when navigating away from a topic detail.
//    * @param topic The STOMP topic path.
//    */
//   public unsubscribeFromTopic(topic: string): void {
//       if (this.subscriptions[topic]) {
//           this.subscriptions[topic].unsubscribe();
//           delete this.subscriptions[topic];
//           console.log(`Unsubscribed from topic: ${topic}`);
//       }
//   }
// }


// import { Injectable } from '@angular/core';
// import { Client, IMessage, Stomp } from '@stomp/stompjs';
// import * as SockJS from 'sockjs-client';
// import { environment } from 'src/environments/environment';

// export interface WsEvent<T> {
//   type: string;
//   payload: T;
//   refId?: number;
// }

// @Injectable({ providedIn: 'root' })
// export class WsService {
//   private client!: Client;
//   private topicSubscriptions: Map<string, () => void> = new Map();

// subscribeToTopic<T>(topicId: string, callback: (event: WsEvent<T>) => void): void {
//   const topic = `/topic/topic.${topicId}`;

//   const subscribeFn = () => {
//     const subscription = this.client.subscribe(topic, (message: IMessage) => {
//       const event: WsEvent<T> = JSON.parse(message.body);
//       callback(event);
//     });

//     this.topicSubscriptions.set(topicId, () => subscription.unsubscribe());
//   };

//   if (this.client.connected) {
//     subscribeFn();
//   } else {
//     this.client.onConnect = () => subscribeFn();
//   }
// }

// unsubscribeFromTopic(topicId: string): void {
//   const unsubscribe = this.topicSubscriptions.get(topicId);
//   if (unsubscribe) {
//     unsubscribe();
//     this.topicSubscriptions.delete(topicId);
//   }
// }


//   connect() {
//     this.client = new Client({
//       brokerURL: environment.wsBaseUrl,
//       webSocketFactory: () => new SockJS(environment.wsBaseUrl),
//       reconnectDelay: 5000,
//     });

//     this.client.activate();
//   }

//   subscribe<T>(topic: string, callback: (event: WsEvent<T>) => void) {
//     this.client.onConnect = () => {
//       this.client.subscribe(topic, (message: IMessage) => {
//         const event: WsEvent<T> = JSON.parse(message.body);
//         callback(event);
//       });
//     };
//   }

//   disconnect() {
//     if (this.client && this.client.active) this.client.deactivate();
//   }
// }

// import { Injectable } from '@angular/core';
// import { Client, IMessage, Stomp } from '@stomp/stompjs';
// import * as SockJS from 'sockjs-client';
// import { environment } from 'src/environments/environment';
// import { Subject, Observable } from 'rxjs';

// export interface WsEvent<T> {
//   type: string;
//   payload: T;
//   refId?: number;
// }

// @Injectable({ providedIn: 'root' })
// export class WsService {
//   private client!: Client;
//   private subscriptions = new Map<string, any>();
//   private eventSubject = new Subject<WsEvent<any>>();

//   public events$ = this.eventSubject.asObservable();

//   connect(): void {
//     this.client = new Client({
//       brokerURL: environment.wsBaseUrl,
//       webSocketFactory: () => new SockJS(environment.wsBaseUrl),
//       reconnectDelay: 5000,
//     });

//     this.client.onConnect = () => {
//       console.log('[WS] Connected to WebSocket server');
//     };

//     this.client.onStompError = (frame) => {
//       console.error('[WS] STOMP error', frame);
//     };

//     this.client.activate();
//   }
  

//   subscribe<T>(topic: string, callback: (event: WsEvent<T>) => void): void {
//     if (!this.client || !this.client.connected) {
//       this.client.onConnect = () => this._subscribe(topic, callback);
//     } else {
//       this._subscribe(topic, callback);
//     }
//   }

//   private _subscribe<T>(topic: string, callback: (event: WsEvent<T>) => void): void {
//     const sub = this.client.subscribe(topic, (message: IMessage) => {
//       const event: WsEvent<T> = JSON.parse(message.body);
//       callback(event);
//       this.eventSubject.next(event); // broadcast to global stream
//     });

//     this.subscriptions.set(topic, sub);
//   }

//   subscribeToTopic(topicId: string): void {
//     const topic = `/topic/topic.${topicId}`;
//     this.subscribe(topic, (event) => {
//       console.log('[WS] Topic update:', event);
//     });
//   }

//   unsubscribeFromTopic(topicId: string): void {
//     const topic = `/topic/topic.${topicId}`;
//     const sub = this.subscriptions.get(topic);
//     if (sub) {
//       sub.unsubscribe();
//       this.subscriptions.delete(topic);
//     }
//   }

//   disconnect(): void {
//     if (this.client && this.client.active) {
//       this.client.deactivate();
//       console.log('[WS] Disconnected');
//     }
//   }
// }

// import { Injectable } from '@angular/core';
// import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
// import * as SockJS from 'sockjs-client';
// import { environment } from 'src/environments/environment';
// import { Subject, Observable } from 'rxjs';

// export interface WsEvent<T> {
//   type: string;
//   payload: T;
//   refId?: number | string | null;
// }

// @Injectable({ providedIn: 'root' })
// export class WsService {
//   private client: Client | null = null;
//   private subscriptions = new Map<string, StompSubscription>();
//   private eventSubject = new Subject<WsEvent<any>>();

//   public readonly events$: Observable<WsEvent<any>> = this.eventSubject.asObservable();

//   /**
//    * Initialize STOMP over SockJS connection.
//    * Expect: environment.wsBaseUrl = 'http://host/ws' (SockJS endpoint)
//    */
//   connect(): void {
//     // avoid duplicate activation
//     if (this.client && this.client.active) {
//       return;
//     }

//     this.client = new Client({
//       // Using SockJS endpoint from Spring Boot: registry.addEndpoint("/ws").withSockJS()
//       webSocketFactory: () => new SockJS(environment.wsBaseUrl),
//       reconnectDelay: 5000,
//     });

//     this.client.onConnect = () => {
//       console.log('[WS] Connected to WebSocket server:', environment.wsBaseUrl);
//     };

//     this.client.onStompError = (frame) => {
//       console.error('[WS] STOMP error:', frame.headers['message'], frame.body);
//     };

//     this.client.onWebSocketError = (event) => {
//       console.error('[WS] WebSocket error:', event);
//     };

//     this.client.activate();
//   }

//   /**
//    * Subscribe to a STOMP destination.
//    * Example: '/topic/title.1', '/topic/post.5'
//    */
//   subscribe<T>(
//     destination: string,
//     callback: (event: WsEvent<T>) => void
//   ): void {
//     if (!this.client) {
//       // ensure connection, then defer subscription until connected
//       this.connect();
//     }

//     if (!this.client) {
//       console.error('[WS] Client not initialized after connect()');
//       return;
//     }

//     // Avoid duplicate subscription to same destination
//     if (this.subscriptions.has(destination)) {
//       return;
//     }

//     if (this.client.connected) {
//       this._subscribe(destination, callback);
//     } else {
//       const prevOnConnect = this.client.onConnect;
//       this.client.onConnect = (frame) => {
//         if (prevOnConnect) {
//           prevOnConnect(frame);
//         }
//         this._subscribe(destination, callback);
//       };
//     }
//   }

//   /**
//    * Internal subscribe implementation used once the client is connected.
//    */
//   private _subscribe<T>(
//     destination: string,
//     callback: (event: WsEvent<T>) => void
//   ): void {
//     if (!this.client) {
//       return;
//     }

//     console.log('[WS] Subscribing to:', destination);

//     const sub = this.client.subscribe(destination, (message: IMessage) => {
//       try {
//         const parsed = JSON.parse(message.body);

//         const event: WsEvent<T> =
//           parsed && typeof parsed === 'object' && 'type' in parsed
//             ? parsed
//             : { type: 'message', payload: parsed, refId: null };

//         callback(event);
//         this.eventSubject.next(event); // broadcast globally
//       } catch (err) {
//         console.error('[WS] Failed to parse WS message body:', err, message.body);
//       }
//     });

//     this.subscriptions.set(destination, sub);
//   }

//   /**
//    * Convenience helper.
//    * Accepts either:
//    *  - a plain ID like '1'  -> subscribes to '/topic/topic.1'
//    *  - a full destination like '/topic/post.1' -> uses as-is
//    */
//   subscribeToTopic(topicIdOrDestination: string): void {
//     const destination = topicIdOrDestination.startsWith('/topic/')
//       ? topicIdOrDestination
//       : `/topic/topic.${topicIdOrDestination}`;

//     this.subscribe(destination, (event) => {
//       console.log('[WS] Topic update from', destination, event);
//     });
//   }

//   /**
//    * Unsubscribe using same argument style as subscribeToTopic.
//    */
//   unsubscribeFromTopic(topicIdOrDestination: string): void {
//     const destination = topicIdOrDestination.startsWith('/topic/')
//       ? topicIdOrDestination
//       : `/topic/topic.${topicIdOrDestination}`;

//     const sub = this.subscriptions.get(destination);
//     if (sub) {
//       console.log('[WS] Unsubscribing from:', destination);
//       sub.unsubscribe();
//       this.subscriptions.delete(destination);
//     }
//   }

//   /**
//    * Clean disconnect (call on logout/global destroy).
//    */
//   disconnect(): void {
//     this.subscriptions.forEach((sub, dest) => {
//       console.log('[WS] Cleaning subscription:', dest);
//       sub.unsubscribe();
//     });
//     this.subscriptions.clear();

//     if (this.client && this.client.active) {
//       this.client.deactivate();
//       console.log('[WS] Disconnected');
//     }

//     this.client = null;
//   }
// }


// import { Injectable } from '@angular/core';
// import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
// import * as SockJS from 'sockjs-client';
// import { environment } from 'src/environments/environment';
// import { Subject, Observable } from 'rxjs';

// export interface WsEvent<T> {
//   type: string;
//   payload: T;
//   refId?: number | string | null;
// }

// @Injectable({ providedIn: 'root' })
// export class WsService {
//   private client: Client | null = null;
//   private subscriptions = new Map<string, StompSubscription>();
//   private eventSubject = new Subject<WsEvent<any>>();

//   public readonly events$: Observable<WsEvent<any>> = this.eventSubject.asObservable();

//   /**
//    * Initialize STOMP over SockJS connection.
//    */
//   connect(): void {
//     if (this.client && this.client.active) {
//       return;
//     }

//     this.client = new Client({
//       webSocketFactory: () => new SockJS(environment.wsBaseUrl),
//       reconnectDelay: 5000,
//     });

//     this.client.onConnect = () => {
//       console.log('[WS] Connected to WebSocket server:', environment.wsBaseUrl);
//     };

//     this.client.onStompError = (frame) => {
//       console.error('[WS] STOMP error:', frame.headers['message'], frame.body);
//     };

//     this.client.onWebSocketError = (event) => {
//       console.error('[WS] WebSocket error:', event);
//     };

//     this.client.activate();
//   }

//   /**
//    * Subscribe to a STOMP destination.
//    */
//   subscribe<T>(
//     destination: string,
//     callback: (event: WsEvent<T>) => void
//   ): void {
//     if (!this.client) {
//       this.connect();
//     }

//     if (!this.client) {
//       console.error('[WS] Client not initialized after connect()');
//       return;
//     }

//     if (this.subscriptions.has(destination)) {
//       return;
//     }

//     if (this.client.connected) {
//       this._subscribe(destination, callback);
//     } else {
//       const prevOnConnect = this.client.onConnect;
//       this.client.onConnect = (frame) => {
//         if (prevOnConnect) {
//           prevOnConnect(frame);
//         }
//         this._subscribe(destination, callback);
//       };
//     }
//   }

//   /**
//    * Internal subscribe implementation used once the client is connected.
//    */
//   private _subscribe<T>(
//     destination: string,
//     callback: (event: WsEvent<T>) => void
//   ): void {
//     if (!this.client) {
//       return;
//     }

//     console.log('[WS] Subscribing to:', destination);

//     const sub = this.client.subscribe(destination, (message: IMessage) => {
//       try {
//         const parsed = JSON.parse(message.body);

//         const event: WsEvent<T> =
//           parsed && typeof parsed === 'object' && 'type' in parsed
//             ? parsed
//             : { type: 'message', payload: parsed, refId: null };

//         callback(event);
//         this.eventSubject.next(event); // broadcast globally
//       } catch (err) {
//         console.error('[WS] Failed to parse WS message body:', err, message.body);
//       }
//     });

//     this.subscriptions.set(destination, sub);
//   }

//   /**
//    * Convenience helper.
//    */
//   subscribeToTopic(topicIdOrDestination: string): void {
//     // If a raw ID is provided, default to the title topic stream
//     const destination = topicIdOrDestination.startsWith('/topic/')
//       ? topicIdOrDestination
//       : `/topic/title.${topicIdOrDestination}`;

//     this.subscribe(destination, (event) => {
//       console.log('[WS] Topic update from', destination, event);
//     });
//   }

//   /**
//    * Unsubscribe using same argument style as subscribeToTopic.
//    */
//   unsubscribeFromTopic(topicIdOrDestination: string): void {
//     const destination = topicIdOrDestination.startsWith('/topic/')
//       ? topicIdOrDestination
//       : `/topic/title.${topicIdOrDestination}`;

//     const sub = this.subscriptions.get(destination);
//     if (sub) {
//       console.log('[WS] Unsubscribing from:', destination);
//       sub.unsubscribe();
//       this.subscriptions.delete(destination);
//     }
//   }

//   /**
//    * Clean disconnect (call on logout/global destroy).
//    */
//   disconnect(): void {
//     this.subscriptions.forEach((sub, dest) => {
//       console.log('[WS] Cleaning subscription:', dest);
//       sub.unsubscribe();
//     });
//     this.subscriptions.clear();

//     if (this.client && this.client.active) {
//       this.client.deactivate();
//       console.log('[WS] Disconnected');
//     }

//     this.client = null;
//   }
// }


// import { Injectable } from '@angular/core';
// import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
// import * as SockJS from 'sockjs-client';
// import { environment } from 'src/environments/environment';
// import { Subject, Observable } from 'rxjs';

// export interface WsEvent<T> {
//   type: string;
//   payload: T;
//   refId?: number | string | null;
// }

// @Injectable({ providedIn: 'root' })
// export class WsService {
//   private client: Client | null = null;
//   private subscriptions = new Map<string, StompSubscription>();
//   private eventSubject = new Subject<WsEvent<any>>();

//   public readonly events$: Observable<WsEvent<any>> = this.eventSubject.asObservable();

//   /**
//    * Initialize STOMP over SockJS connection.
//    */
//   connect(): void {
//     if (this.client && this.client.active) {
//       return;
//     }

//     this.client = new Client({
//       webSocketFactory: () => new SockJS(environment.wsBaseUrl),
//       reconnectDelay: 5000,
//     });

//     this.client.onConnect = () => {
//       console.log('[WS] Connected to WebSocket server:', environment.wsBaseUrl);
//     };

//     this.client.onStompError = (frame) => {
//       console.error('[WS] STOMP error:', frame.headers['message'], frame.body);
//     };

//     this.client.onWebSocketError = (event) => {
//       console.error('[WS] WebSocket error:', event);
//     };

//     this.client.activate();
//   }

//   /**
//    * Subscribe to a STOMP destination.
//    * Example: '/topic/title.1', '/topic/post.5'
//    */
//   subscribe<T>(
//     destination: string,
//     callback: (event: WsEvent<T>) => void
//   ): void {
//     if (!this.client) {
//       this.connect();
//     }

//     if (!this.client) {
//       console.error('[WS] Client not initialized after connect()');
//       return;
//     }

//     if (this.subscriptions.has(destination)) {
//       return;
//     }

//     if (this.client.connected) {
//       this._subscribe(destination, callback);
//     } else {
//       const prevOnConnect = this.client.onConnect;
//       this.client.onConnect = (frame) => {
//         if (prevOnConnect) {
//           prevOnConnect(frame);
//         }
//         this._subscribe(destination, callback);
//       };
//     }
//   }

//   /**
//    * Internal subscribe implementation used once the client is connected.
//    */
//   private _subscribe<T>(
//     destination: string,
//     callback: (event: WsEvent<T>) => void
//   ): void {
//     if (!this.client) {
//       return;
//     }

//     console.log('[WS] Subscribing to:', destination);

//     const sub = this.client.subscribe(destination, (message: IMessage) => {
//       try {
//         const parsed = JSON.parse(message.body);

//         const event: WsEvent<T> =
//           parsed && typeof parsed === 'object' && 'type' in parsed
//             ? parsed
//             : { type: 'message', payload: parsed, refId: null };

//         callback(event);
//         this.eventSubject.next(event); // broadcast globally
//       } catch (err) {
//         console.error('[WS] Failed to parse WS message body:', err, message.body);
//       }
//     });

//     this.subscriptions.set(destination, sub);
//   }

//   /**
//    * Convenience helper.
//    * ALIGNED FIX: Defaults to '/topic/title.' if only ID is provided.
//    */
//   subscribeToTopic(topicIdOrDestination: string): void {
//     const destination = topicIdOrDestination.startsWith('/topic/')
//       ? topicIdOrDestination
//       : `/topic/title.${topicIdOrDestination}`; // Aligned to WsTopics.java naming

//     this.subscribe(destination, (event) => {
//       console.log('[WS] Topic update from', destination, event);
//     });
//   }

//   /**
//    * Unsubscribe using same argument style as subscribeToTopic.
//    */
//   unsubscribeFromTopic(topicIdOrDestination: string): void {
//     const destination = topicIdOrDestination.startsWith('/topic/')
//       ? topicIdOrDestination
//       : `/topic/title.${topicIdOrDestination}`;

//     const sub = this.subscriptions.get(destination);
//     if (sub) {
//       console.log('[WS] Unsubscribing from:', destination);
//       sub.unsubscribe();
//       this.subscriptions.delete(destination);
//     }
//   }

//   /**
//    * Clean disconnect (call on logout/global destroy).
//    */
//   disconnect(): void {
//     this.subscriptions.forEach((sub, dest) => {
//       console.log('[WS] Cleaning subscription:', dest);
//       sub.unsubscribe();
//     });
//     this.subscriptions.clear();

//     if (this.client && this.client.active) {
//       this.client.deactivate();
//       console.log('[WS] Disconnected');
//     }

//     this.client = null;
//   }
// }

import { Injectable } from '@angular/core';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';

export interface WsEvent<T> {
  type: string;
  payload: T;
  refId?: number | string | null;
}

@Injectable({ providedIn: 'root' })
export class WsService {
  private client: Client | null = null;
  private subscriptions = new Map<string, StompSubscription>();
  private eventSubject = new Subject<WsEvent<any>>();

  public readonly events$: Observable<WsEvent<any>> = this.eventSubject.asObservable();

  /**
   * Initialize STOMP over SockJS connection.
   */
  connect(): void {
    if (this.client && this.client.active) {
      return;
    }

    this.client = new Client({
      webSocketFactory: () => new SockJS(environment.wsBaseUrl),
      reconnectDelay: 5000,
    });

    this.client.onConnect = () => {
      console.log('[WS] Connected to WebSocket server:', environment.wsBaseUrl);
    };

    this.client.onStompError = (frame) => {
      console.error('[WS] Error:', frame);
    };

    this.client.onWebSocketClose = (event) => {
      console.log('[WS] WebSocket closed:', event);
    };

    this.client.activate();
  }

  /**
   * Subscribe to a specific WebSocket destination.
   * @param destination Destination path for WebSocket messages.
   * @param callback Function to handle incoming messages.
   */
  subscribe(destination: string, callback: (event: WsEvent<any>) => void): void {
    if (!this.client || !this.client.connected) {
      console.error('[WS] Not connected');
      return;
    }

    const subscription = this.client.subscribe(destination, (message: IMessage) => {
      const payload = JSON.parse(message.body ?? '{}');
      const event: WsEvent<any> = {
        type: payload.type,
        payload: payload.payload,
        refId: payload.refId || null,
      };

      callback(event);
      this.eventSubject.next(event); // Emit to other subscribers if needed
    });

    this.subscriptions.set(destination, subscription);
    console.log(`[WS] Subscribed to ${destination}`);
  }

  /**
   * Unsubscribe from a specific WebSocket destination.
   * @param destination Destination path to unsubscribe.
   */
  unsubscribeFromTopic(destination: string): void {
    const subscription = this.subscriptions.get(destination);
    if (subscription) {
      subscription.unsubscribe();
      this.subscriptions.delete(destination);
      console.log(`[WS] Unsubscribed from ${destination}`);
    } else {
      console.log(`[WS] No active subscription for ${destination}`);
    }
  }

  /**
   * Unsubscribe from all active topics.
   */
  unsubscribeAll(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions.clear();
    console.log('[WS] Unsubscribed from all topics');
  }

  /**
   * Send a message to a specific WebSocket destination.
   * @param destination Destination path for sending the message.
   * @param message Message payload to send.
   */
  sendMessage(destination: string, message: any): void {
    if (!this.client || !this.client.connected) {
      console.error('[WS] Not connected');
      return;
    }

    const messageString = JSON.stringify(message);
    this.client.publish({ destination, body: messageString });
    console.log(`[WS] Sent message to ${destination}: ${messageString}`);
  }

  /**
   * Disconnect the WebSocket connection.
   */
  disconnect(): void {
    if (this.client) {
      this.client.deactivate();
      console.log('[WS] WebSocket disconnected');
    }
  }
}