// // import { Component, EventEmitter, Output, OnInit } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { ForumService } from 'src/app/services/forum.service';
// // import { Notification } from 'src/app/models/forum.model';

// // @Component({
// //   selector: 'app-notifications-panel',
// //   standalone: true,
// //   imports: [CommonModule],
// //   template: `
// //     <div class="panel-overlay" (click)="onClose()">
// //       <div class="panel-content" (click)="$event.stopPropagation()">
// //         <div class="panel-header">
// //           <h2 class="panel-title">Notifications</h2>
// //           <div class="panel-actions">
// //             <button
// //               class="mark-read-btn"
// //               *ngIf="hasUnread()"
// //               (click)="markAllAsRead()"
// //             >
// //               Mark all as read
// //             </button>
// //             <button class="close-btn" (click)="onClose()">
// //               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
// //                 <line x1="18" y1="6" x2="6" y2="18"></line>
// //                 <line x1="6" y1="6" x2="18" y2="18"></line>
// //               </svg>
// //             </button>
// //           </div>
// //         </div>

// //         <div class="panel-body">
// //           <div *ngIf="notifications.length === 0" class="empty-state">
// //             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
// //               <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
// //               <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
// //             </svg>
// //             <p>No notifications yet</p>
// //           </div>

// //           <div
// //             *ngFor="let notification of notifications"
// //             class="notification-item"
// //             [class.unread]="!notification.isRead"
// //             (click)="onNotificationClick(notification)"
// //           >
// //             <img
// //               [src]="notification.author.avatar"
// //               [alt]="notification.author.name"
// //               class="notification-avatar"
// //             />

// //             <div class="notification-content">
// //               <div class="notification-text">
// //                 <strong>{{ notification.author.name }}</strong>
// //                 {{ notification.message }}
// //               </div>
// //               <div class="notification-topic">{{ notification.topicTitle }}</div>
// //               <div class="notification-time">{{ getTimeAgo(notification.createdAt) }}</div>
// //             </div>

// //             <div class="notification-indicator" *ngIf="!notification.isRead"></div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   `,
// //   styles: [`
// //     .panel-overlay {
// //       position: fixed;
// //       top: 0;
// //       left: 0;
// //       right: 0;
// //       bottom: 0;
// //       background: rgba(0, 0, 0, 0.3);
// //       z-index: 1000;
// //       animation: fadeIn 0.2s;
// //     }

// //     @keyframes fadeIn {
// //       from {
// //         opacity: 0;
// //       }
// //       to {
// //         opacity: 1;
// //       }
// //     }

// //     .panel-content {
// //       position: fixed;
// //       top: 0;
// //       right: 0;
// //       bottom: 0;
// //       width: 100%;
// //       max-width: 400px;
// //       background: white;
// //       display: flex;
// //       flex-direction: column;
// //       box-shadow: -4px 0 6px -1px rgba(0, 0, 0, 0.1);
// //       animation: slideInRight 0.3s;
// //     }

// //     @keyframes slideInRight {
// //       from {
// //         transform: translateX(100%);
// //       }
// //       to {
// //         transform: translateX(0);
// //       }
// //     }

// //     .panel-header {
// //       display: flex;
// //       justify-content: space-between;
// //       align-items: center;
// //       padding: 1.25rem 1.5rem;
// //       border-bottom: 1px solid #e5e7eb;
// //     }

// //     .panel-title {
// //       font-size: 1.125rem;
// //       font-weight: 700;
// //       color: #1f2937;
// //       margin: 0;
// //     }

// //     .panel-actions {
// //       display: flex;
// //       align-items: center;
// //       gap: 0.5rem;
// //     }

// //     .mark-read-btn {
// //       padding: 0.375rem 0.75rem;
// //       border: none;
// //       background: #eff6ff;
// //       color: #2563eb;
// //       border-radius: 0.375rem;
// //       font-size: 0.8125rem;
// //       font-weight: 500;
// //       cursor: pointer;
// //       transition: all 0.2s;
// //     }

// //     .mark-read-btn:hover {
// //       background: #dbeafe;
// //     }

// //     .close-btn {
// //       padding: 0.25rem;
// //       border: none;
// //       background: transparent;
// //       color: #9ca3af;
// //       cursor: pointer;
// //       border-radius: 0.375rem;
// //       transition: all 0.2s;
// //     }

// //     .close-btn:hover {
// //       background: #f3f4f6;
// //       color: #1f2937;
// //     }

// //     .panel-body {
// //       flex: 1;
// //       overflow-y: auto;
// //     }

// //     .empty-state {
// //       display: flex;
// //       flex-direction: column;
// //       align-items: center;
// //       justify-content: center;
// //       padding: 3rem 1.5rem;
// //       color: #9ca3af;
// //       text-align: center;
// //     }

// //     .empty-state svg {
// //       margin-bottom: 1rem;
// //     }

// //     .empty-state p {
// //       margin: 0;
// //       font-size: 0.9375rem;
// //     }

// //     .notification-item {
// //       position: relative;
// //       display: flex;
// //       gap: 0.75rem;
// //       padding: 1rem 1.5rem;
// //       border-bottom: 1px solid #f3f4f6;
// //       cursor: pointer;
// //       transition: background 0.2s;
// //     }

// //     .notification-item:hover {
// //       background: #f9fafb;
// //     }

// //     .notification-item.unread {
// //       background: #eff6ff;
// //     }

// //     .notification-item.unread:hover {
// //       background: #dbeafe;
// //     }

// //     .notification-avatar {
// //       width: 2.5rem;
// //       height: 2.5rem;
// //       border-radius: 9999px;
// //       flex-shrink: 0;
// //     }

// //     .notification-content {
// //       flex: 1;
// //       min-width: 0;
// //     }

// //     .notification-text {
// //       font-size: 0.875rem;
// //       color: #1f2937;
// //       line-height: 1.4;
// //       margin-bottom: 0.25rem;
// //     }

// //     .notification-text strong {
// //       font-weight: 600;
// //     }

// //     .notification-topic {
// //       font-size: 0.8125rem;
// //       color: #6b7280;
// //       margin-bottom: 0.25rem;
// //       overflow: hidden;
// //       text-overflow: ellipsis;
// //       white-space: nowrap;
// //     }

// //     .notification-time {
// //       font-size: 0.75rem;
// //       color: #9ca3af;
// //     }

// //     .notification-indicator {
// //       position: absolute;
// //       top: 1.25rem;
// //       right: 1rem;
// //       width: 0.5rem;
// //       height: 0.5rem;
// //       border-radius: 9999px;
// //       background: #2563eb;
// //     }

// //     @media (max-width: 768px) {
// //       .panel-content {
// //         max-width: 100%;
// //       }

// //       .panel-header {
// //         padding: 1rem 1.25rem;
// //       }

// //       .panel-title {
// //         font-size: 1rem;
// //       }

// //       .mark-read-btn {
// //         font-size: 0.75rem;
// //         padding: 0.375rem 0.625rem;
// //       }
// //     }

// //     @media (max-width: 640px) {
// //       .panel-header {
// //         padding: 1rem;
// //       }

// //       .notification-item {
// //         padding: 0.875rem 1rem;
// //       }

// //       .notification-avatar {
// //         width: 2rem;
// //         height: 2rem;
// //       }

// //       .mark-read-btn {
// //         display: none;
// //       }
// //     }
// //   `]
// // })
// // export class NotificationsPanelComponent implements OnInit {
// //   @Output() close = new EventEmitter<void>();
// //   @Output() notificationClicked = new EventEmitter<string>();

// //   notifications: Notification[] = [];

// //   constructor(private forumService: ForumService) {}

// //   ngOnInit(): void {
// //     this.forumService.getNotifications().subscribe(notifications => {
// //       this.notifications = notifications;
// //     });
// //   }

// //   onClose(): void {
// //     this.close.emit();
// //   }

// //   hasUnread(): boolean {
// //     return this.notifications.some(n => !n.isRead);
// //   }

// //   markAllAsRead(): void {
// //     this.forumService.markAllNotificationsAsRead();
// //   }

// //   onNotificationClick(notification: Notification): void {
// //     this.forumService.markNotificationAsRead(notification.id);
// //     this.notificationClicked.emit(notification.topicId);
// //     this.onClose();
// //   }

// //   getTimeAgo(date: Date): string {
// //     const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

// //     if (seconds < 60) return 'just now';
// //     if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
// //     if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
// //     if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
// //     return `${Math.floor(seconds / 604800)}w ago`;
// //   }
// // }


// // src/app/pages/apps/conversational_forum/notifications-panel/notifications-panel.component.ts
// import { Component, EventEmitter, Output, OnInit, OnDestroy, inject } from '@angular/core';
// import { CommonModule, DatePipe } from '@angular/common';
// import { ForumService } from 'src/app/services/forum.service';
// import { Notification } from 'src/app/models/forum.model';
// import { Subscription } from 'rxjs';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';

// @Component({
//   selector: 'app-notifications-panel',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatIconModule,
//     MatButtonModule
//   ],
//   template: `
//     <div class="panel-overlay" (click)="onClose()">
//       <div class="panel-content" (click)="$event.stopPropagation()">
//         <div class="panel-header">
//           <h2 class="panel-title">Notifications</h2>
//           <div class="panel-actions">
//             <button *ngIf="notifications.length > 0" class="mark-read-btn" (click)="markAllAsRead()">Mark All Read</button>
//             <button class="close-btn" (click)="onClose()">
//               <mat-icon>close</mat-icon>
//             </button>
//           </div>
//         </div>
//         <div class="panel-body">
//           <div *ngIf="notifications.length === 0" class="empty-state">
//             <p>No new notifications</p>
//           </div>
//           <div *ngFor="let notification of notifications" class="notification-item" 
//                [class.unread]="!notification.isRead"
//                (click)="onNotificationClick(notification)">
//             <img class="notification-avatar" [src]="notification.author?.avatar || defaultAvatar" alt="avatar">
//             <div class="notification-content">
//               <p class="notification-text">
//                 <strong>{{ notification.author?.name }}</strong> {{ notification.message }} in 
//                 <span class="notification-topic">{{ notification.topicTitle }}</span>
//               </p>
//               <span class="notification-time">{{ getTimeAgoFromString(notification.createdAt) }}</span>

//             </div>
//             <div *ngIf="!notification.isRead" class="notification-indicator"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   `,
//   styles: [`
//     .panel-overlay {
//       position: fixed;
//       top: 0;
//       left: 0;
//       right: 0;
//       bottom: 0;
//       background: rgba(0, 0, 0, 0.3);
//       z-index: 1000;
//       animation: fadeIn 0.2s;
//     }

//     @keyframes fadeIn {
//       from {
//         opacity: 0;
//       }
//       to {
//         opacity: 1;
//       }
//     }

//     .panel-content {
//       position: fixed;
//       top: 0;
//       right: 0;
//       bottom: 0;
//       width: 100%;
//       max-width: 400px;
//       background: white;
//       display: flex;
//       flex-direction: column;
//       box-shadow: -4px 0 6px -1px rgba(0, 0, 0, 0.1);
//       animation: slideInRight 0.3s;
//     }

//     @keyframes slideInRight {
//       from {
//         transform: translateX(100%);
//       }
//       to {
//         transform: translateX(0);
//       }
//     }

//     .panel-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       padding: 1.25rem 1.5rem;
//       border-bottom: 1px solid #e5e7eb;
//     }

//     .panel-title {
//       font-size: 1.125rem;
//       font-weight: 700;
//       color: #1f2937;
//       margin: 0;
//     }

//     .panel-actions {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//     }

//     .mark-read-btn {
//       padding: 0.375rem 0.75rem;
//       border: none;
//       background: #eff6ff;
//       color: #2563eb;
//       border-radius: 0.375rem;
//       font-size: 0.8125rem;
//       font-weight: 500;
//       cursor: pointer;
//       transition: all 0.2s;
//     }

//     .mark-read-btn:hover {
//       background: #dbeafe;
//     }

//     .close-btn {
//       padding: 0.25rem;
//       border: none;
//       background: transparent;
//       color: #9ca3af;
//       cursor: pointer;
//       border-radius: 0.375rem;
//       transition: all 0.2s;
//     }

//     .close-btn:hover {
//       background: #f3f4f6;
//       color: #1f2937;
//     }

//     .panel-body {
//       flex: 1;
//       overflow-y: auto;
//     }

//     .empty-state {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       justify-content: center;
//       padding: 3rem 1.5rem;
//       color: #9ca3af;
//       text-align: center;
//     }

//     .empty-state svg {
//       margin-bottom: 1rem;
//     }

//     .empty-state p {
//       margin: 0;
//       font-size: 0.9375rem;
//     }

//     .notification-item {
//       position: relative;
//       display: flex;
//       gap: 0.75rem;
//       padding: 1rem 1.5rem;
//       border-bottom: 1px solid #f3f4f6;
//       cursor: pointer;
//       transition: background 0.2s;
//     }

//     .notification-item:hover {
//       background: #f9fafb;
//     }

//     .notification-item.unread {
//       background: #eff6ff;
//     }

//     .notification-item.unread:hover {
//       background: #dbeafe;
//     }

//     .notification-avatar {
//       width: 2.5rem;
//       height: 2.5rem;
//       border-radius: 9999px;
//       flex-shrink: 0;
//     }

//     .notification-content {
//       flex: 1;
//       min-width: 0;
//     }

//     .notification-text {
//       font-size: 0.875rem;
//       color: #1f2937;
//       line-height: 1.4;
//       margin-bottom: 0.25rem;
//     }

//     .notification-text strong {
//       font-weight: 600;
//     }

//     .notification-topic {
//       font-size: 0.8125rem;
//       color: #6b7280;
//       margin-bottom: 0.25rem;
//       overflow: hidden;
//       text-overflow: ellipsis;
//       white-space: nowrap;
//     }

//     .notification-time {
//       font-size: 0.75rem;
//       color: #9ca3af;
//     }

//     .notification-indicator {
//       position: absolute;
//       top: 1.25rem;
//       right: 1rem;
//       width: 0.5rem;
//       height: 0.5rem;
//       border-radius: 9999px;
//       background: #2563eb;
//     }

//     @media (max-width: 768px) {
//       .panel-content {
//         max-width: 100%;
//       }

//       .panel-header {
//         padding: 1rem 1.25rem;
//       }

//       .panel-title {
//         font-size: 1rem;
//       }

//       .mark-read-btn {
//         font-size: 0.75rem;
//         padding: 0.375rem 0.625rem;
//       }
//     }

//     @media (max-width: 640px) {
//       .panel-header {
//         padding: 1rem;
//       }

//       .notification-item {
//         padding: 0.875rem 1rem;
//       }

//       .notification-avatar {
//         width: 2rem;
//         height: 2rem;
//       }

//       .mark-read-btn {
//         display: none;
//       }
//     }
//   `]

// })
// export class NotificationsPanelComponent implements OnInit, OnDestroy {
//   @Output() close = new EventEmitter<void>();
//   @Output() notificationClicked = new EventEmitter<string>(); 

//   notifications: Notification[] = [];
//   private notificationSubscription: Subscription | null = null;
//   private forumService = inject(ForumService);
//   private datePipe = inject(DatePipe);

//   defaultAvatar = 'https://ui-avatars.com/api/?name=User';

//   ngOnInit(): void {
//     this.notificationSubscription = this.forumService.getNotifications()
//       .subscribe((notifications: Notification[]) => {
//         this.notifications = notifications;
//       });
//   }

//   ngOnDestroy(): void {
//     this.notificationSubscription?.unsubscribe();
//   }

//   onClose(): void {
//     this.close.emit();
//   }

//   markAllAsRead(): void {
//     this.notifications
//       .filter(n => !n.isRead)
//       .forEach(n => {
//         n.isRead = true;
//         this.forumService.markNotificationAsRead(n.id);
//       });
//   }

//   onNotificationClick(notification: Notification): void {
//     if (!notification.isRead) {
//       notification.isRead = true;
//       this.forumService.markNotificationAsRead(notification.id);
//     }
//     this.notificationClicked.emit(notification.topicId);
//   }

//   // getTimeAgoFromString(date: Date): string {
//   //   const now = new Date();
//   //   const created = new Date(date);
//   //   const seconds = Math.floor((now.getTime() - created.getTime()) / 1000);

//   //   if (seconds < 60) return 'just now';
//   //   const minutes = Math.floor(seconds / 60);
//   //   if (minutes < 60) return `${minutes}m ago`;
//   //   const hours = Math.floor(minutes / 60);
//   //   if (hours < 24) return `${hours}h ago`;
//   //   const days = Math.floor(hours / 24);
//   //   return `${days}d ago`;
//   // }
//   getTimeAgoFromString(date: string | Date): string {
//   const parsedDate = new Date(date);
//   return this.getTimeAgo(parsedDate);
// }
// getTimeAgo(date: Date): string {
//   const now = new Date();
//   const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

//   if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
//   if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
//   if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;

//   return `${Math.floor(diffInSeconds / 86400)} days ago`;
// }

// }
