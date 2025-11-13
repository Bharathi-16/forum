// import { Component, EventEmitter, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ForumService } from 'src/app/services/forum.service';

// @Component({
//   selector: 'app-forum-header',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <header class="forum-header">
//       <div class="header-content">
//         <div class="logo-section">
//           <h1 class="logo">LLC Community Forum</h1>
//         </div>

//         <div class="header-actions">
//           <button class="btn-icon notification-btn" (click)="toggleNotifications()">
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//               <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
//               <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
//             </svg>
//             <span class="notification-badge" *ngIf="(unreadCount$ | async)! > 0">
//               {{ unreadCount$ | async }}
//             </span>
//           </button>

//           <button class="btn-primary" (click)="onCreateTopic()">
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//               <line x1="12" y1="5" x2="12" y2="19"></line>
//               <line x1="5" y1="12" x2="19" y2="12"></line>
//             </svg>
//             <span class="btn-text">New Topic</span>
//           </button>
//         </div>
//       </div>
//     </header>
//   `,
//   styles: [`
//     .forum-header {
//       background: white;
//       border-bottom: 1px solid #e5e7eb;
//       position: sticky;
//       top: 0;
//       z-index: 100;
//     }

//     .header-content {
//       max-width: 1200px;
//       margin: 0 auto;
//       padding: 1rem 1.5rem;
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       gap: 1rem;
//     }

//     .logo {
//       font-size: 1.25rem;
//       font-weight: 700;
//       color: #1f2937;
//       margin: 0;
//     }

//     .header-actions {
//       display: flex;
//       align-items: center;
//       gap: 0.75rem;
//     }

//     .btn-icon {
//       position: relative;
//       padding: 0.5rem;
//       border: none;
//       background: transparent;
//       border-radius: 0.5rem;
//       cursor: pointer;
//       color: #6b7280;
//       transition: all 0.2s;
//     }

//     .btn-icon:hover {
//       background: #f3f4f6;
//       color: #1f2937;
//     }

//     .notification-badge {
//       position: absolute;
//       top: 0.25rem;
//       right: 0.25rem;
//       background: #ef4444;
//       color: white;
//       font-size: 0.625rem;
//       font-weight: 600;
//       padding: 0.125rem 0.375rem;
//       border-radius: 9999px;
//       min-width: 1.125rem;
//       text-align: center;
//     }

//     .btn-primary {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       padding: 0.625rem 1rem;
//       background: #2563eb;
//       color: white;
//       border: none;
//       border-radius: 0.5rem;
//       font-weight: 500;
//       font-size: 0.875rem;
//       cursor: pointer;
//       transition: background 0.2s;
//     }

//     .btn-primary:hover {
//       background: #1d4ed8;
//     }

//     .btn-primary svg {
//       flex-shrink: 0;
//     }

//     @media (max-width: 768px) {
//       .header-content {
//         padding: 0.875rem 1rem;
//       }

//       .logo {
//         font-size: 1.125rem;
//       }
//     }

//     @media (max-width: 640px) {
//       .header-content {
//         padding: 0.75rem 1rem;
//       }

//       .logo {
//         font-size: 1rem;
//       }

//       .btn-text {
//         display: none;
//       }

//       .btn-primary {
//         padding: 0.625rem;
//       }

//       .header-actions {
//         gap: 0.5rem;
//       }
//     }
//   `]
// })
// export class ForumHeaderComponent {
//   @Output() createTopicClicked = new EventEmitter<void>();
//   @Output() notificationsClicked = new EventEmitter<void>();

//   unreadCount$ = this.forumService.getUnreadCount();

//   constructor(private forumService: ForumService) {}

//   onCreateTopic(): void {
//     this.createTopicClicked.emit();
//   }

//   toggleNotifications(): void {
//     this.notificationsClicked.emit();
//   }
// }


// conversational_forum/forum-header/forum-header.component.ts (FINAL)
import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumService } from 'src/app/services/forum.service'; 
import { Observable, Subscription, of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon'; 

@Component({
  selector: 'app-forum-header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <header class="forum-header">
      <div class="header-content">
        <div class="logo-section">
          <h1 class="logo">LLC Community Forum</h1>
        </div>

        <div class="header-actions">
           <button class="btn-icon notification-btn" (click)="toggleNotifications()" matTooltip="Notifications">
             <mat-icon>notifications</mat-icon>
              <ng-container *ngIf="(unreadCount$ | async) as count">
                 <span class="notification-badge" *ngIf="count > 0">
                    {{ count }}
                 </span>
             </ng-container>
           </button>

          <button class="btn-primary" (click)="onCreateTopic()">
             <mat-icon>add</mat-icon> <span class="btn-text">New Topic</span>
          </button>
        </div>
      </div>
    </header>
  `,
 styles: [`
    .forum-header {
      background: white;
      border-bottom: 1px solid #e5e7eb;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }

    .logo {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .btn-icon {
      position: relative;
      padding: 0.5rem;
      border: none;
      background: transparent;
      border-radius: 0.5rem;
      cursor: pointer;
      color: #6b7280;
      transition: all 0.2s;
    }

    .btn-icon:hover {
      background: #f3f4f6;
      color: #1f2937;
    }

    .notification-badge {
      position: absolute;
      top: 0.25rem;
      right: 0.25rem;
      background: #ef4444;
      color: white;
      font-size: 0.625rem;
      font-weight: 600;
      padding: 0.125rem 0.375rem;
      border-radius: 9999px;
      min-width: 1.125rem;
      text-align: center;
    }

    .btn-primary {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.625rem 1rem;
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 0.5rem;
      font-weight: 500;
      font-size: 0.875rem;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-primary:hover {
      background: #1d4ed8;
    }

    .btn-primary svg {
      flex-shrink: 0;
    }

    @media (max-width: 768px) {
      .header-content {
        padding: 0.875rem 1rem;
      }

      .logo {
        font-size: 1.125rem;
      }
    }

    @media (max-width: 640px) {
      .header-content {
        padding: 0.75rem 1rem;
      }

      .logo {
        font-size: 1rem;
      }

      .btn-text {
        display: none;
      }

      .btn-primary {
        padding: 0.625rem;
      }

      .header-actions {
        gap: 0.5rem;
      }
    }
  `]
})
export class ForumHeaderComponent implements OnInit, OnDestroy {
  @Output() createTopicClicked = new EventEmitter<void>();
  @Output() notificationsClicked = new EventEmitter<void>();

  unreadCount$: Observable<number>;
  private subscription: Subscription | null = null;

  constructor(private forumService: ForumService) {
    // Support different ForumService shapes:
    // - prefer getUnreadCount() if provided
    // - otherwise use unreadCount$ observable if provided
    // - otherwise fall back to an observable of 0
    const serviceAny = this.forumService as any;
    if (typeof serviceAny.getUnreadCount === 'function') {
      this.unreadCount$ = serviceAny.getUnreadCount();
    } else if (serviceAny.unreadCount$) {
      this.unreadCount$ = serviceAny.unreadCount$ as Observable<number>;
    } else {
      this.unreadCount$ = of(0);
    }
  }

  ngOnInit(): void {}
  ngOnDestroy(): void { this.subscription?.unsubscribe(); }

  onCreateTopic(): void {
    this.createTopicClicked.emit();
  }

  toggleNotifications(): void {
    this.notificationsClicked.emit();
  }
}