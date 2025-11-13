// // // import { Component, EventEmitter, Input, Output } from '@angular/core';
// // // import { CommonModule } from '@angular/common';
// // // import { Topic } from 'src/app/models/forum.model';

// // // @Component({
// // //   selector: 'app-topics-list',
// // //   standalone: true,
// // //   imports: [CommonModule],
// // //   template: `
// // //   <div class="cardWithShadow">
// // //     <div class="p-24">
// // //       <div class="topics-list">
// // //         <div
// // //           *ngFor="let topic of topics"
// // //           class="topic-card"
// // //           (click)="onTopicClick(topic)"
// // //         >
// // //           <div class="topic-header">
// // //             <div class="topic-badge-group">
// // //               <span class="category-badge" [attr.data-category]="topic.category">
// // //                 {{ topic.category }}
// // //               </span>
// // //               <span *ngIf="topic.isPinned" class="pinned-badge">
// // //                 <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
// // //                   <path d="M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z"/>
// // //                 </svg>
// // //                 Pinned
// // //               </span>
// // //             </div>
// // //           </div>

// // //           <h2 class="topic-title">{{ topic.title }}</h2>

// // //           <p class="topic-preview">{{ topic.preview }}</p>

// // //           <div class="topic-footer">
// // //             <div class="author-info">
// // //               <img [src]="topic.author.avatar" [alt]="topic.author.name" class="avatar">
// // //               <span class="author-name">{{ topic.author.name }}</span>
// // //             </div>

// // //             <div class="topic-meta">
// // //               <div class="meta-item">
// // //                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
// // //                   <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
// // //                 </svg>
// // //                 <span>{{ topic.replyCount }}</span>
// // //               </div>
// // //               <div class="meta-item">
// // //                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
// // //                   <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
// // //                   <circle cx="12" cy="12" r="3"></circle>
// // //                 </svg>
// // //                 <span>{{ topic.viewCount }}</span>
// // //               </div>
// // //               <div class="meta-item time">
// // //                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
// // //                   <circle cx="12" cy="12" r="10"></circle>
// // //                   <polyline points="12 6 12 12 16 14"></polyline>
// // //                 </svg>
// // //                 <span>{{ getTimeAgo(topic.lastActivity) }}</span>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div *ngIf="topics && topics.length === 0" class="empty-state">
// // //           <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
// // //             <circle cx="11" cy="11" r="8"></circle>
// // //             <path d="m21 21-4.35-4.35"></path>
// // //           </svg>
// // //           <h3>No topics found</h3>
// // //           <p>Try adjusting your search or filters</p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   </div>
// // //   `,
// // //   styles: [`
// // //     .cardWithShadow {
// // //       background: white;
// // //       border-radius: 0.75rem;
// // //       box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
// // //     }

// // //     .p-24 {
// // //       padding: 1.5rem;
// // //     }

// // //     .topics-list {
// // //       display: flex;
// // //       flex-direction: column;
// // //       gap: 1rem;
// // //     }

// // //     .topic-card {
// // //       background: white;
// // //       border: 1px solid #e5e7eb;
// // //       border-radius: 0.75rem;
// // //       padding: 1.25rem;
// // //       cursor: pointer;
// // //       transition: all 0.2s;
// // //     }

// // //     .topic-card:hover {
// // //       border-color: #2563eb;
// // //       box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
// // //       transform: translateY(-2px);
// // //     }

// // //     .topic-header {
// // //       margin-bottom: 0.75rem;
// // //     }

// // //     .topic-badge-group {
// // //       display: flex;
// // //       align-items: center;
// // //       gap: 0.5rem;
// // //       flex-wrap: wrap;
// // //     }

// // //     .category-badge {
// // //       padding: 0.25rem 0.625rem;
// // //       border-radius: 0.375rem;
// // //       font-size: 0.75rem;
// // //       font-weight: 600;
// // //       background: #eff6ff;
// // //       color: #2563eb;
// // //     }

// // //     .category-badge[data-category="Tax & Legal"] {
// // //       background: #fef3c7;
// // //       color: #d97706;
// // //     }

// // //     .category-badge[data-category="Business Growth"] {
// // //       background: #d1fae5;
// // //       color: #059669;
// // //     }

// // //     .category-badge[data-category="Success Stories"] {
// // //       background: #fce7f3;
// // //       color: #db2777;
// // //     }

// // //     .category-badge[data-category="LLC Formation"] {
// // //       background: #ede9fe;
// // //       color: #7c3aed;
// // //     }

// // //     .pinned-badge {
// // //       display: flex;
// // //       align-items: center;
// // //       gap: 0.25rem;
// // //       padding: 0.25rem 0.625rem;
// // //       border-radius: 0.375rem;
// // //       font-size: 0.75rem;
// // //       font-weight: 600;
// // //       background: #fef3c7;
// // //       color: #d97706;
// // //     }

// // //     .topic-title {
// // //       font-size: 1.125rem;
// // //       font-weight: 600;
// // //       color: #1f2937;
// // //       margin: 0 0 0.5rem 0;
// // //       line-height: 1.4;
// // //     }

// // //     .topic-preview {
// // //       color: #6b7280;
// // //       font-size: 0.9375rem;
// // //       line-height: 1.5;
// // //       margin: 0 0 1rem 0;
// // //       display: -webkit-box;
// // //       -webkit-line-clamp: 2;
// // //       -webkit-box-orient: vertical;
// // //       overflow: hidden;
// // //     }

// // //     .topic-footer {
// // //       display: flex;
// // //       justify-content: space-between;
// // //       align-items: center;
// // //       gap: 1rem;
// // //       padding-top: 0.75rem;
// // //       border-top: 1px solid #f3f4f6;
// // //     }

// // //     .author-info {
// // //       display: flex;
// // //       align-items: center;
// // //       gap: 0.5rem;
// // //     }

// // //     .avatar {
// // //       width: 2rem;
// // //       height: 2rem;
// // //       border-radius: 9999px;
// // //       background: #e5e7eb;
// // //     }

// // //     .author-name {
// // //       font-size: 0.875rem;
// // //       font-weight: 500;
// // //       color: #1f2937;
// // //     }

// // //     .topic-meta {
// // //       display: flex;
// // //       align-items: center;
// // //       gap: 1rem;
// // //     }

// // //     .meta-item {
// // //       display: flex;
// // //       align-items: center;
// // //       gap: 0.25rem;
// // //       color: #9ca3af;
// // //       font-size: 0.875rem;
// // //     }

// // //     .meta-item svg {
// // //       flex-shrink: 0;
// // //     }

// // //     .meta-item.time {
// // //       display: none;
// // //     }

// // //     .empty-state {
// // //       text-align: center;
// // //       padding: 3rem 1rem;
// // //       color: #9ca3af;
// // //     }

// // //     .empty-state svg {
// // //       margin: 0 auto 1rem;
// // //     }

// // //     .empty-state h3 {
// // //       font-size: 1.125rem;
// // //       color: #6b7280;
// // //       margin: 0 0 0.5rem 0;
// // //     }

// // //     .empty-state p {
// // //       margin: 0;
// // //       font-size: 0.9375rem;
// // //     }

// // //     @media (min-width: 640px) {
// // //       .meta-item.time {
// // //         display: flex;
// // //       }
// // //     }

// // //     @media (max-width: 768px) {
// // //       .p-24 {
// // //         padding: 1.25rem;
// // //       }

// // //       .topic-card {
// // //         padding: 1.125rem;
// // //       }
// // //     }

// // //     @media (max-width: 640px) {
// // //       .p-24 {
// // //         padding: 1rem;
// // //       }

// // //       .topic-card {
// // //         padding: 1rem;
// // //       }

// // //       .topic-title {
// // //         font-size: 1rem;
// // //       }

// // //       .topic-preview {
// // //         font-size: 0.875rem;
// // //       }

// // //       .topic-footer {
// // //         flex-direction: column;
// // //         align-items: flex-start;
// // //         gap: 0.75rem;
// // //       }

// // //       .author-info {
// // //         width: 100%;
// // //       }

// // //       .topic-meta {
// // //         width: 100%;
// // //         justify-content: flex-start;
// // //         gap: 0.75rem;
// // //       }
// // //     }
// // //   `]
// // // })
// // // export class TopicsListComponent {
// // //   @Input() topics: Topic[] = [];
// // //   @Output() topicSelected = new EventEmitter<Topic>();

// // //   onTopicClick(topic: Topic): void {
// // //     this.topicSelected.emit(topic);
// // //   }

// // //   getTimeAgo(date: Date): string {
// // //     const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

// // //     if (seconds < 60) return 'just now';
// // //     if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
// // //     if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
// // //     return `${Math.floor(seconds / 86400)}d ago`;
// // //   }
// // // }


// // // src/app/pages/apps/conversational_forum/topics-list/topics-list.component.ts
// // // import { Component, EventEmitter, Input, Output } from '@angular/core';
// // // import { CommonModule } from '@angular/common';
// // // import { Topic } from 'src/app/models/forum.model';

// // // @Component({
// // //   selector: 'app-topics-list',
// // //   standalone: true,
// // //   imports: [CommonModule],
// // //   template: `
// // //   <div class="cardWithShadow">
// // //     <div class="p-24">
// // //       <div class="topics-list">
// // //         <div
// // //           *ngFor="let topic of topics"
// // //           class="topic-card"
// // //           (click)="onTopicClick(topic)"
// // //         >
// // //           <div class="topic-header">
// // //             <div class="topic-badge-group">
// // //               <span class="category-badge" [attr.data-category]="topic.category">
// // //                 {{ topic.category }}
// // //               </span>
// // //               <span *ngIf="topic.isPinned" class="pinned-badge">
// // //                 <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
// // //                   <path d="M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z"/>
// // //                 </svg>
// // //                 Pinned
// // //               </span>
// // //             </div>
// // //           </div>

// // //           <h2 class="topic-title">{{ topic.title }}</h2>

// // //           <p class="topic-preview">{{ topic.preview }}</p>

// // //           <div class="topic-footer">
// // //             <div class="author-info">
// // //               <img [src]="topic.author.avatar" [alt]="topic.author.name" class="avatar">
// // //               <span class="author-name">{{ topic.author.name }}</span>
// // //             </div>

// // //             <div class="topic-meta">
// // //               <div class="meta-item">
// // //                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
// // //                   <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
// // //                 </svg>
// // //                 <span>{{ topic.replyCount }}</span>
// // //               </div>
// // //               <div class="meta-item">
// // //                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
// // //                   <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
// // //                   <circle cx="12" cy="12" r="3"></circle>
// // //                 </svg>
// // //                 <span>{{ topic.viewCount }}</span>
// // //               </div>
// // //               <div class="meta-item time">
// // //                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
// // //                   <circle cx="12" cy="12" r="10"></circle>
// // //                   <polyline points="12 6 12 12 16 14"></polyline>
// // //                 </svg>
// // //                 <span>{{ getTimeAgo(topic.lastActivity) }}</span>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div *ngIf="topics && topics.length === 0" class="empty-state">
// // //           <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
// // //             <circle cx="11" cy="11" r="8"></circle>
// // //             <path d="m21 21-4.35-4.35"></path>
// // //           </svg>
// // //           <h3>No topics found</h3>
// // //           <p>Try adjusting your search or filters</p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   </div>
// // //   `,
// // //   styles: [`
// // //     .cardWithShadow {
// // //       background: white;
// // //       border-radius: 0.75rem;
// // //       box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
// // //     }

// // //     .p-24 {
// // //       padding: 1.5rem;
// // //     }

// // //     .topics-list {
// // //       display: flex;
// // //       flex-direction: column;
// // //       gap: 1rem;
// // //     }

// // //     .topic-card {
// // //       background: white;
// // //       border: 1px solid #e5e7eb;
// // //       border-radius: 0.75rem;
// // //       padding: 1.25rem;
// // //       cursor: pointer;
// // //       transition: all 0.2s;
// // //     }

// // //     .topic-card:hover {
// // //       border-color: #2563eb;
// // //       box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
// // //       transform: translateY(-2px);
// // //     }

// // //     .topic-header {
// // //       margin-bottom: 0.75rem;
// // //     }

// // //     .topic-badge-group {
// // //       display: flex;
// // //       align-items: center;
// // //       gap: 0.5rem;
// // //       flex-wrap: wrap;
// // //     }

// // //     .category-badge {
// // //       padding: 0.25rem 0.625rem;
// // //       border-radius: 0.375rem;
// // //       font-size: 0.75rem;
// // //       font-weight: 600;
// // //       background: #eff6ff;
// // //       color: #2563eb;
// // //     }

// // //     .category-badge[data-category="Tax & Legal"] {
// // //       background: #fef3c7;
// // //       color: #d97706;
// // //     }

// // //     .category-badge[data-category="Business Growth"] {
// // //       background: #d1fae5;
// // //       color: #059669;
// // //     }

// // //     .category-badge[data-category="Success Stories"] {
// // //       background: #fce7f3;
// // //       color: #db2777;
// // //     }

// // //     .category-badge[data-category="LLC Formation"] {
// // //       background: #ede9fe;
// // //       color: #7c3aed;
// // //     }

// // //     .pinned-badge {
// // //       display: flex;
// // //       align-items: center;
// // //       gap: 0.25rem;
// // //       padding: 0.25rem 0.625rem;
// // //       border-radius: 0.375rem;
// // //       font-size: 0.75rem;
// // //       font-weight: 600;
// // //       background: #fef3c7;
// // //       color: #d97706;
// // //     }

// // //     .topic-title {
// // //       font-size: 1.125rem;
// // //       font-weight: 600;
// // //       color: #1f2937;
// // //       margin: 0 0 0.5rem 0;
// // //       line-height: 1.4;
// // //     }

// // //     .topic-preview {
// // //       color: #6b7280;
// // //       font-size: 0.9375rem;
// // //       line-height: 1.5;
// // //       margin: 0 0 1rem 0;
// // //       display: -webkit-box;
// // //       -webkit-line-clamp: 2;
// // //       -webkit-box-orient: vertical;
// // //       overflow: hidden;
// // //     }

// // //     .topic-footer {
// // //       display: flex;
// // //       justify-content: space-between;
// // //       align-items: center;
// // //       gap: 1rem;
// // //       padding-top: 0.75rem;
// // //       border-top: 1px solid #f3f4f6;
// // //     }

// // //     .author-info {
// // //       display: flex;
// // //       align-items: center;
// // //       gap: 0.5rem;
// // //     }

// // //     .avatar {
// // //       width: 2rem;
// // //       height: 2rem;
// // //       border-radius: 9999px;
// // //       background: #e5e7eb;
// // //     }

// // //     .author-name {
// // //       font-size: 0.875rem;
// // //       font-weight: 500;
// // //       color: #1f2937;
// // //     }

// // //     .topic-meta {
// // //       display: flex;
// // //       align-items: center;
// // //       gap: 1rem;
// // //     }

// // //     .meta-item {
// // //       display: flex;
// // //       align-items: center;
// // //       gap: 0.25rem;
// // //       color: #9ca3af;
// // //       font-size: 0.875rem;
// // //     }

// // //     .meta-item svg {
// // //       flex-shrink: 0;
// // //     }

// // //     .meta-item.time {
// // //       display: none;
// // //     }

// // //     .empty-state {
// // //       text-align: center;
// // //       padding: 3rem 1rem;
// // //       color: #9ca3af;
// // //     }

// // //     .empty-state svg {
// // //       margin: 0 auto 1rem;
// // //     }

// // //     .empty-state h3 {
// // //       font-size: 1.125rem;
// // //       color: #6b7280;
// // //       margin: 0 0 0.5rem 0;
// // //     }

// // //     .empty-state p {
// // //       margin: 0;
// // //       font-size: 0.9375rem;
// // //     }

// // //     @media (min-width: 640px) {
// // //       .meta-item.time {
// // //         display: flex;
// // //       }
// // //     }

// // //     @media (max-width: 768px) {
// // //       .p-24 {
// // //         padding: 1.25rem;
// // //       }

// // //       .topic-card {
// // //         padding: 1.125rem;
// // //       }
// // //     }

// // //     @media (max-width: 640px) {
// // //       .p-24 {
// // //         padding: 1rem;
// // //       }

// // //       .topic-card {
// // //         padding: 1rem;
// // //       }

// // //       .topic-title {
// // //         font-size: 1rem;
// // //       }

// // //       .topic-preview {
// // //         font-size: 0.875rem;
// // //       }

// // //       .topic-footer {
// // //         flex-direction: column;
// // //         align-items: flex-start;
// // //         gap: 0.75rem;
// // //       }

// // //       .author-info {
// // //         width: 100%;
// // //       }

// // //       .topic-meta {
// // //         width: 100%;
// // //         justify-content: flex-start;
// // //         gap: 0.75rem;
// // //       }
// // //     }
// // //   `]
// // // })
// // // export class TopicsListComponent {
// // //   @Input() topics: Topic[] = [];
// // //   @Output() topicSelected = new EventEmitter<Topic>();

// // //   onTopicClick(topic: Topic): void {
// // //     this.topicSelected.emit(topic);
// // //   }

// // //   getTimeAgo(date: Date | string | undefined): string {
// // //     if (!date) return '';
// // //     const d = typeof date === 'string' ? new Date(date) : date;
// // //     const seconds = Math.floor((new Date().getTime() - d.getTime()) / 1000);

// // //     if (seconds < 60) return 'just now';
// // //     if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
// // //     if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
// // //     return `${Math.floor(seconds / 86400)}d ago`;
// // //   }

  
// // // }


// // // // src/app/pages/apps/conversational_forum/topics-list/topics-list.component.ts
// // import { Component, EventEmitter, Input, Output } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { Topic } from 'src/app/models/forum.model';

// // @Component({
// //   selector: 'app-topics-list',
// //   standalone: true,
// //   imports: [CommonModule],
// //   template: `
// //   <div class="cardWithShadow">
// //     <div class="p-24">
// //       <div class="topics-list">
// //         <div
// //           *ngFor="let topic of topics"
// //           class="topic-card"
// //           (click)="onTopicClick(topic)"
// //         >
// //           <div class="topic-header">
// //             <div class="topic-badge-group">
// //               <span class="category-badge" [attr.data-category]="topic.category">
// //                 {{ topic.category }}
// //               </span>
// //               <span *ngIf="topic.isPinned" class="pinned-badge">
// //                 <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
// //                   <path d="M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z"/>
// //                 </svg>
// //                 Pinned
// //               </span>
// //             </div>
// //           </div>

// //           <h2 class="topic-title">{{ topic.title }}</h2>

// //           <p class="topic-preview">{{ topic.preview }}</p>

// //           <div class="topic-footer">
// //             <div class="author-info">
// //               <img
// //                 [src]="topic.author?.avatar"
// //                 [alt]="topic.author?.name || ''"
// //                 class="avatar"
// //               >
// //               <span class="author-name">
// //                 {{ topic.author?.name || '' }}
// //               </span>
// //             </div>

// //             <div class="topic-meta">
// //               <div class="meta-item">
// //                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
// //                   <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
// //                 </svg>
// //                 <span>{{ topic.replyCount }}</span>
// //               </div>
// //               <div class="meta-item">
// //                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
// //                   <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
// //                   <circle cx="12" cy="12" r="3"></circle>
// //                 </svg>
// //                 <span>{{ topic.viewCount }}</span>
// //               </div>
// //               <div class="meta-item time">
// //                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
// //                   <circle cx="12" cy="12" r="10"></circle>
// //                   <polyline points="12 6 12 12 16 14"></polyline>
// //                 </svg>
// //                 <span>{{ getTimeAgo(topic.lastActivity) }}</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div *ngIf="topics && topics.length === 0" class="empty-state">
// //           <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
// //             <circle cx="11" cy="11" r="8"></circle>
// //             <path d="m21 21-4.35-4.35"></path>
// //           </svg>
// //           <h3>No topics found</h3>
// //           <p>Try adjusting your search or filters</p>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// //   `,
// //   styles: [/* your existing CSS unchanged */]
// // })
// // export class TopicsListComponent {
// //   @Input() topics: Topic[] = [];
// //   @Output() topicSelected = new EventEmitter<Topic>();

// //   onTopicClick(topic: Topic): void {
// //     this.topicSelected.emit(topic);
// //   }

// //   getTimeAgo(date: Date | string | undefined): string {
// //     if (!date) return '';
// //     const d = typeof date === 'string' ? new Date(date) : date;
// //     const seconds = Math.floor((Date.now() - d.getTime()) / 1000);

// //     if (seconds < 60) return 'just now';
// //     if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
// //     if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
// //     return `${Math.floor(seconds / 86400)}d ago`;
// //   }
// // }

// // import { Component, EventEmitter, Input, Output } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { Topic } from 'src/app/models/forum.model';

// // @Component({
// //   selector: 'app-topics-list',
// //   standalone: true,
// //   imports: [CommonModule],
// //   template: `
// //   <div class="topics-list-container">
// //     <div class="p-24">
// //       <div class="topics-list">
// //         <div
// //           *ngFor="let topic of topics"
// //           class="topic-card"
// //           (click)="onTopicClick(topic)"
// //         >
// //           <div class="topic-header">
// //             <div class="topic-badge-group">
// //               <span class="category-badge" [attr.data-category]="topic.category">
// //                 {{ topic.category }}
// //               </span>
// //               <span *ngIf="topic.isPinned" class="pinned-badge">
// //                 <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
// //                   <path d="M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z"/>
// //                 </svg>
// //                 Pinned
// //               </span>
// //             </div>
// //           </div>

// //           <h2 class="topic-title">{{ topic.title }}</h2>

// //           <p class="topic-preview">{{ topic.preview }}</p>

// //           <div class="topic-footer">
// //             <div class="author-info">
// //               <img
// //                 [src]="topic.author?.avatar"
// //                 [alt]="topic.author?.name || ''"
// //                 class="avatar"
// //               >
// //               <span class="author-name">
// //                 {{ topic.author?.name || 'Unknown' }}
// //               </span>
// //             </div>

// //             <div class="topic-meta">
// //               <div class="meta-item stat-replies">
// //                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
// //                   <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
// //                 </svg>
// //                 <span>{{ topic.replyCount }}</span>
// //               </div>
// //               <div class="meta-item stat-views">
// //                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
// //                   <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
// //                   <circle cx="12" cy="12" r="3"></circle>
// //                 </svg>
// //                 <span>{{ topic.viewCount }}</span>
// //               </div>
// //               <div class="meta-item time">
// //                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
// //                   <circle cx="12" cy="12" r="10"></circle>
// //                   <polyline points="12 6 12 12 16 14"></polyline>
// //                 </svg>
// //                 <span>{{ getTimeAgo(topic.lastActivity) }}</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div *ngIf="topics && topics.length === 0" class="empty-state">
// //           <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
// //             <circle cx="11" cy="11" r="8"></circle>
// //             <path d="m21 21-4.35-4.35"></path>
// //           </svg>
// //           <h3>No topics found</h3>
// //           <p>Try adjusting your search or filters</p>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// //   `,
// //   styles: [`
// //     .topics-list-container {
// //       /* Removed cardWithShadow wrapper style here, using individual card styles below */
// //       padding: 0;
// //     }
// //     .topics-list {
// //       display: grid;
// //       grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
// //       gap: 1.5rem;
// //       padding: 0; /* Remove padding from inner wrapper */
// //     }

// //     .topic-card {
// //       background-color: #ffffff;
// //       border-radius: 12px;
// //       padding: 1.5rem;
// //       cursor: pointer;
// //       border: 1px solid #e5e7eb;
// //       transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
// //       box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); /* Soft initial shadow */
// //       display: flex;
// //       flex-direction: column;
// //       justify-content: space-between;
// //       min-height: 200px; /* Ensure visual consistency */
// //     }

// //     .topic-card:hover {
// //       transform: translateY(-3px);
// //       box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); /* Elevated shadow on hover */
// //       border-color: #3f51b5; /* Highlight border */
// //     }

// //     /* Header & Badges */
// //     .topic-header {
// //       margin-bottom: 0.75rem;
// //     }
// //     .topic-badge-group {
// //       display: flex;
// //       align-items: center;
// //       gap: 0.5rem;
// //     }
// //     .category-badge {
// //       display: inline-block;
// //       padding: 0.2rem 0.6rem;
// //       border-radius: 9999px;
// //       font-size: 0.75rem;
// //       font-weight: 600;
// //       background-color: #eef2ff; /* Light primary background */
// //       color: #3f51b5; /* Primary color text */
// //       text-transform: uppercase;
// //     }
// //     .pinned-badge {
// //       display: inline-flex;
// //       align-items: center;
// //       gap: 0.25rem;
// //       font-size: 0.75rem;
// //       color: #f59e0b; /* Yellow/Orange for importance */
// //       font-weight: 500;
// //     }
// //     .pinned-badge svg {
// //       width: 14px;
// //       height: 14px;
// //     }

// //     /* Title and Preview */
// //     .topic-title {
// //       font-size: 1.375rem;
// //       font-weight: 700;
// //       color: #1f2937;
// //       margin: 0 0 0.5rem;
// //       line-height: 1.3;
// //     }
// //     .topic-preview {
// //       font-size: 0.9375rem;
// //       color: #6b7280;
// //       line-height: 1.5;
// //       margin-bottom: 1rem;
// //       flex-grow: 1;
// //       /* Truncate preview */
// //       display: -webkit-box;
// //       -webkit-line-clamp: 2;
// //       -webkit-box-orient: vertical;
// //       overflow: hidden;
// //       text-overflow: ellipsis;
// //     }

// //     /* Footer and Metadata */
// //     .topic-footer {
// //       display: flex;
// //       justify-content: space-between;
// //       align-items: center;
// //       padding-top: 1rem;
// //       border-top: 1px solid #f3f4f6;
// //     }
    
// //     .author-info {
// //       display: flex;
// //       align-items: center;
// //       gap: 0.5rem;
// //     }
// //     .avatar {
// //       width: 28px;
// //       height: 28px;
// //       border-radius: 50%;
// //       object-fit: cover;
// //       border: 1px solid #d1d5db;
// //     }
// //     .author-name {
// //       font-size: 0.875rem;
// //       font-weight: 600;
// //       color: #374151;
// //     }
    
// //     .topic-meta {
// //       display: flex;
// //       align-items: center;
// //       gap: 1rem;
// //       color: #9ca3af;
// //       font-size: 0.875rem;
// //     }
// //     .meta-item {
// //       display: flex;
// //       align-items: center;
// //       gap: 0.25rem;
// //     }
// //     .meta-item svg {
// //       width: 16px;
// //       height: 16px;
// //       stroke-width: 2;
// //     }

// //     /* Highlight stats */
// //     .stat-replies { color: #3f51b5; } /* Primary color for engagement */
// //     .stat-views { color: #10b981; } /* Green for visibility */
// //     .time { font-style: italic; color: #6b7280; }

// //     /* Empty State */
// //     .empty-state {
// //       grid-column: 1 / -1;
// //       text-align: center;
// //       padding: 3rem;
// //       color: #9ca3af;
// //       background-color: #ffffff;
// //       border-radius: 12px;
// //       border: 2px dashed #e5e7eb;
// //       margin-top: 1rem;
// //     }
// //     .empty-state svg {
// //       width: 48px;
// //       height: 48px;
// //       margin-bottom: 1rem;
// //     }
// //     .empty-state h3 {
// //       font-size: 1.5rem;
// //       font-weight: 600;
// //       color: #374151;
// //       margin: 0 0 0.5rem;
// //     }
// //     .empty-state p {
// //       margin: 0;
// //     }

// //     /* Mobile adjustments */
// //     @media (max-width: 768px) {
// //       .topics-list {
// //         grid-template-columns: 1fr;
// //         gap: 1rem;
// //       }
// //       .topic-card {
// //         padding: 1.25rem;
// //       }
// //       .topic-footer {
// //         flex-direction: column;
// //         align-items: flex-start;
// //         gap: 0.75rem;
// //       }
// //       .topic-meta {
// //         margin-top: 0.5rem;
// //       }
// //     }
    
// //     /* Remove unnecessary outer padding if forum-main already provides it */
// //     .p-24 {
// //       padding: 0 !important; 
// //     }
// //   `]
// // })
// // export class TopicsListComponent {
// //   @Input() topics: Topic[] = [];
// //   @Output() topicSelected = new EventEmitter<Topic>();

// //   onTopicClick(topic: Topic): void {
// //     this.topicSelected.emit(topic);
// //   }

// //   getTimeAgo(date: Date | string | undefined): string {
// //     if (!date) return '';
// //     const d = typeof date === 'string' ? new Date(date) : date;
// //     const seconds = Math.floor((Date.now() - d.getTime()) / 1000);

// //     if (seconds < 60) return 'just now';
// //     if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
// //     if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
// //     return `${Math.floor(seconds / 86400)}d ago`;
// //   }
// // }


// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Topic } from 'src/app/models/forum.model';

// @Component({
//   selector: 'app-topics-list',
//   standalone: true,
//   imports: [CommonModule],
// //   template: `
// //   <div class="cardWithShadow">
// //     <div class="p-24">
// //       <div class="topics-list">
// //         <div
// //           *ngFor="let topic of topics"
// //           class="topic-card"
// //           (click)="onTopicClick(topic)"
// //         >
// //           <div class="topic-header">
// //             <div class="topic-badge-group">
// //               <span class="category-badge" [attr.data-category]="topic.category">
// //                 {{ topic.category }}
// //               </span>
// //               <span *ngIf="topic.isPinned" class="pinned-badge">
// //                 <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
// //                   <path d="M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z"/>
// //                 </svg>
// //                 Pinned
// //               </span>
// //             </div>
// //           </div>

// //           <h2 class="topic-title">{{ topic.title }}</h2>

// //           <p class="topic-preview">{{ topic.preview }}</p>

// //           <div class="topic-footer">
// //             <div class="author-info">
// //               <!-- Use the dedicated function for author display -->
// //               <img
// //                 [src]="topic.author?.avatar"
// //                 [alt]="getAuthorName(topic)"
// //                 class="avatar"
// //               >
// //               <span class="author-name">
// //                 {{ getAuthorName(topic) }}
// //               </span>
// //             </div>

// //             <div class="topic-meta">
// //               <div class="meta-item">
// //                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
// //                   <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
// //                 </svg>
// //                 <span>{{ topic.replyCount }}</span>
// //               </div>
// //               <div class="meta-item">
// //                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
// //                   <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
// //                   <circle cx="12" cy="12" r="3"></circle>
// //                 </svg>
// //                 <span>{{ topic.viewCount }}</span>
// //               </div>
// //               <div class="meta-item time">
// //                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
// //                   <circle cx="12" cy="12" r="10"></circle>
// //                   <polyline points="12 6 12 12 16 14"></polyline>
// //                 </svg>
// //                 <span>{{ getTimeAgo(topic.lastActivity) }}</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div *ngIf="topics && topics.length === 0" class="empty-state">
// //           <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
// //             <circle cx="11" cy="11" r="8"></circle>
// //             <path d="m21 21-4.35-4.35"></path>
// //           </svg>
// //           <h3>No topics found</h3>
// //           <p>Try adjusting your search or filters</p>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// //   `,
// //   styles: [`
// //     .topics-list-container {
// //       /* Removed cardWithShadow wrapper style here, using individual card styles below */
// //       padding: 0;
// //     }
// //     .topics-list {
// //       display: grid;
// //       grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
// //       gap: 1.5rem;
// //       padding: 0; /* Remove padding from inner wrapper */
// //     }

// //     .topic-card {
// //       background-color: #ffffff;
// //       border-radius: 12px;
// //       padding: 1.5rem;
// //       cursor: pointer;
// //       border: 1px solid #e5e7eb;
// //       transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
// //       box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); /* Soft initial shadow */
// //       display: flex;
// //       flex-direction: column;
// //       justify-content: space-between;
// //       min-height: 200px; /* Ensure visual consistency */
// //     }

// //     .topic-card:hover {
// //       transform: translateY(-3px);
// //       box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); /* Elevated shadow on hover */
// //       border-color: #3f51b5; /* Highlight border */
// //     }

// //     /* Header & Badges */
// //     .topic-header {
// //       margin-bottom: 0.75rem;
// //     }
// //     .topic-badge-group {
// //       display: flex;
// //       align-items: center;
// //       gap: 0.5rem;
// //     }
// //     .category-badge {
// //       display: inline-block;
// //       padding: 0.2rem 0.6rem;
// //       border-radius: 9999px;
// //       font-size: 0.75rem;
// //       font-weight: 600;
// //       background-color: #eef2ff; /* Light primary background */
// //       color: #3f51b5; /* Primary color text */
// //       text-transform: uppercase;
// //     }
// //     .pinned-badge {
// //       display: inline-flex;
// //       align-items: center;
// //       gap: 0.25rem;
// //       font-size: 0.75rem;
// //       color: #f59e0b; /* Yellow/Orange for importance */
// //       font-weight: 500;
// //     }
// //     .pinned-badge svg {
// //       width: 14px;
// //       height: 14px;
// //     }

// //     /* Title and Preview */
// //     .topic-title {
// //       font-size: 1.375rem;
// //       font-weight: 700;
// //       color: #1f2937;
// //       margin: 0 0 0.5rem;
// //       line-height: 1.3;
// //     }
// //     .topic-preview {
// //       font-size: 0.9375rem;
// //       color: #6b7280;
// //       line-height: 1.5;
// //       margin-bottom: 1rem;
// //       flex-grow: 1;
// //       /* Truncate preview */
// //       display: -webkit-box;
// //       -webkit-line-clamp: 2;
// //       -webkit-box-orient: vertical;
// //       overflow: hidden;
// //       text-overflow: ellipsis;
// //     }

// //     /* Footer and Metadata */
// //     .topic-footer {
// //       display: flex;
// //       justify-content: space-between;
// //       align-items: center;
// //       padding-top: 1rem;
// //       border-top: 1px solid #f3f4f6;
// //     }
    
// //     .author-info {
// //       display: flex;
// //       align-items: center;
// //       gap: 0.5rem;
// //     }
// //     .avatar {
// //       width: 28px;
// //       height: 28px;
// //       border-radius: 50%;
// //       object-fit: cover;
// //       border: 1px solid #d1d5db;
// //     }
// //     .author-name {
// //       font-size: 0.875rem;
// //       font-weight: 600;
// //       color: #374151;
// //     }
    
// //     .topic-meta {
// //       display: flex;
// //       align-items: center;
// //       gap: 1rem;
// //       color: #9ca3af;
// //       font-size: 0.875rem;
// //     }
// //     .meta-item {
// //       display: flex;
// //       align-items: center;
// //       gap: 0.25rem;
// //     }
// //     .meta-item svg {
// //       width: 16px;
// //       height: 16px;
// //       stroke-width: 2;
// //     }

// //     /* Highlight stats */
// //     .stat-replies { color: #3f51b5; } /* Primary color for engagement */
// //     .stat-views { color: #10b981; } /* Green for visibility */
// //     .time { font-style: italic; color: #6b7280; }

// //     /* Empty State */
// //     .empty-state {
// //       grid-column: 1 / -1;
// //       text-align: center;
// //       padding: 3rem;
// //       color: #9ca3af;
// //       background-color: #ffffff;
// //       border-radius: 12px;
// //       border: 2px dashed #e5e7eb;
// //       margin-top: 1rem;
// //     }
// //     .empty-state svg {
// //       width: 48px;
// //       height: 48px;
// //       margin-bottom: 1rem;
// //     }
// //     .empty-state h3 {
// //       font-size: 1.5rem;
// //       font-weight: 600;
// //       color: #374151;
// //       margin: 0 0 0.5rem;
// //     }
// //     .empty-state p {
// //       margin: 0;
// //     }

// //     /* Mobile adjustments */
// //     @media (max-width: 768px) {
// //       .topics-list {
// //         grid-template-columns: 1fr;
// //         gap: 1rem;
// //       }
// //       .topic-card {
// //         padding: 1.25rem;
// //       }
// //       .topic-footer {
// //         flex-direction: column;
// //         align-items: flex-start;
// //         gap: 0.75rem;
// //       }
// //       .topic-meta {
// //         margin-top: 0.5rem;
// //       }
// //     }
    
// //     /* Remove unnecessary outer padding if forum-main already provides it */
// //     .p-24 {
// //       padding: 0 !important; 
// //     }
// //   `]

// // })


//  // Removed comment lines (//) for clarity
// template: `
//   <div class="cardWithShadow">
//     <div class="p-24">
//       <div class="topics-list">
//         <div
//           *ngFor="let topic of topics"
//           class="topic-card"
//           (click)="onTopicClick(topic)"
//         >
//           <div class="topic-header">
//             <div class="topic-badge-group">
//               <span class="category-badge" [attr.data-category]="topic.category">
//                 {{ topic.category }}
//               </span>
//               <span *ngIf="topic.isPinned" class="pinned-badge">
//                 <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z"/>
//                 </svg>
//                 Pinned
//               </span>
//             </div>
//           </div>

//           <h2 class="topic-title">{{ topic.title }}</h2>

//          <p class="topic-preview">{{ getLimitedDescription(topic.preview ?? '') }}</p>



//           <div class="topic-footer">
//             <div class="author-info">
//               <img [src]="topic.author?.avatar || 'assets/avatar-0.jpg'" 
//      [alt]="topic.author?.name" class="avatar">

//               <span class="author-name">{{ topic.author?.name }}</span>
//             </div>

//             <div class="topic-meta">
//               <div class="meta-item like-button" (click)="$event.stopPropagation(); onLikeTopic(topic)">
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//                   <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//                 </svg>
//                 <span>{{ topic.likeCount || 0 }}</span>
//               </div>
//               <!-- Reply count -->
//         <div class="meta-item">
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//                 <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//             </svg>
//             <span>{{ topic.replyCount || 0 }}</span>
//         </div>
//               <div class="meta-item">
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//                   <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//                   <circle cx="12" cy="12" r="3"></circle>
//                 </svg>
//                 <span>{{ topic.viewCount || 0}}</span>
//               </div>
//               <div class="meta-item time">
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//                   <circle cx="12" cy="12" r="10"></circle>
//                   <polyline points="12 6 12 12 16 14"></polyline>
//                 </svg>
//                 <span>{{ getTimeAgo(topic.lastActivity) }}</span>
//               </div>
//             </div>
//           </div>
//         </div>
// <div class="meta-item">
//     <!-- Reply count -->
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//         <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//     </svg>
//     <span>{{ topic.replyCount || 0 }}</span>
// </div>

// <div class="meta-item">
//     <!-- View count -->
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//         <circle cx="12" cy="12" r="3"></circle>
//     </svg>
//     <span>{{ topic.viewCount || 0 }}</span>
// </div>

// <div class="meta-item time">
//     <!-- Time ago -->
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//         <circle cx="12" cy="12" r="10"></circle>
//         <polyline points="12 6 12 12 16 14"></polyline>
//     </svg>
//     <span>{{ getTimeAgo(topic.lastActivity) }}</span>
// </div>

// <!-- Delete Button -->

//         <div *ngIf="topics && topics.length === 0" class="empty-state">
//           <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//             <circle cx="11" cy="11" r="8"></circle>
//             <path d="m21 21-4.35-4.35"></path>
//           </svg>
//           <h3>No topics found</h3>
//           <p>Try adjusting your search or filters</p>
//         </div>
//       </div>
//     </div>
//   </div>
//   `,
//   styles: [`
//     .cardWithShadow {
//   background: white;
//   border-radius: 0.75rem;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
//   transition: all 0.3s ease;
// }

// .cardWithShadow:hover {
//   box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
//   transform: scale(1.02);
// }

// .p-24 {
//   padding: 1.5rem;
// }

// .topics-list {
//   display: flex;
//   flex-direction: column;
//   gap: 1.25rem;
// }

// .topic-card {
//   background: white;
//   border: 1px solid #e5e7eb;
//   border-radius: 0.75rem;
//   padding: 1.25rem;
//   cursor: pointer;
//   transition: all 0.3s ease;
// }

// .topic-card:hover {
//   border-color: #2563eb;
//   box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
//   transform: translateY(-5px);
// }

// .topic-header {
//   margin-bottom: 0.75rem;
// }

// .topic-badge-group {
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   flex-wrap: wrap;
// }

// .category-badge {
//   padding: 0.25rem 0.625rem;
//   border-radius: 0.375rem;
//   font-size: 0.75rem;
//   font-weight: 600;
//   background: #eff6ff;
//   color: #2563eb;
//   transition: background 0.3s ease, color 0.3s ease;
// }

// .category-badge[data-category="Tax & Legal"] {
//   background: #fef3c7;
//   color: #d97706;
// }

// .category-badge[data-category="Business Growth"] {
//   background: #d1fae5;
//   color: #059669;
// }

// .category-badge[data-category="Success Stories"] {
//   background: #fce7f3;
//   color: #db2777;
// }

// .category-badge[data-category="LLC Formation"] {
//   background: #ede9fe;
//   color: #7c3aed;
// }

// .pinned-badge {
//   display: flex;
//   align-items: center;
//   gap: 0.25rem;
//   padding: 0.25rem 0.625rem;
//   border-radius: 0.375rem;
//   font-size: 0.75rem;
//   font-weight: 600;
//   background: #fef3c7;
//   color: #d97706;
// }

// .topic-title {
//   font-size: 1.125rem;
//   font-weight: 600;
//   color: #1f2937;
//   margin: 0 0 0.5rem 0;
//   line-height: 1.4;
//   transition: color 0.3s ease;
// }

// .topic-title:hover {
//   color: #2563eb;
// }

// .topic-preview {
//   color: #6b7280;
//   font-size: 0.9375rem;
//   line-height: 1.5;
//   margin: 0 0 1rem 0;
//   display: -webkit-box;
//   -webkit-line-clamp: 2;
//   -webkit-box-orient: vertical;
//   overflow: hidden;
//   transition: opacity 0.3s ease;
// }

// .topic-footer {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   gap: 1rem;
//   padding-top: 0.75rem;
//   border-top: 1px solid #f3f4f6;
// }

// .author-info {
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// }

// .avatar {
//   width: 2rem;
//   height: 2rem;
//   border-radius: 9999px;
//   background: #e5e7eb;
//   transition: background 0.3s ease;
// }

// .avatar:hover {
//   background: #2563eb;
// }

// .author-name {
//   font-size: 0.875rem;
//   font-weight: 500;
//   color: #1f2937;
// }

// .topic-meta {
//   display: flex;
//   align-items: center;
//   gap: 1rem;
// }

// .meta-item {
//   display: flex;
//   align-items: center;
//   gap: 0.25rem;
//   color: #9ca3af;
//   font-size: 0.875rem;
//   transition: color 0.3s ease;
// }

// .meta-item:hover {
//   color: #2563eb;
// }

// .meta-item svg {
//   flex-shrink: 0;
// }

// .empty-state {
//   text-align: center;
//   padding: 3rem 1rem;
//   color: #9ca3af;
// }

// .empty-state svg {
//   margin: 0 auto 1rem;
// }

// .empty-state h3 {
//   font-size: 1.125rem;
//   color: #6b7280;
//   margin: 0 0 0.5rem 0;
// }

// .empty-state p {
//   margin: 0;
//   font-size: 0.9375rem;
// }

// @media (min-width: 640px) {
//   .meta-item.time {
//     display: flex;
//   }
// }

// @media (max-width: 768px) {
//   .p-24 {
//     padding: 1.25rem;
//   }

//   .topic-card {
//     padding: 1.125rem;
//   }
// }

// @media (max-width: 640px) {
//   .p-24 {
//     padding: 1rem;
//   }

//   .topic-card {
//     padding: 1rem;
//   }

//   .topic-title {
//     font-size: 1rem;
//   }

//   .topic-preview {
//     font-size: 0.875rem;
//   }

//   .topic-footer {
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 0.75rem;
//   }

//   .author-info {
//     width: 100%;
//   }

//   .topic-meta {
//     width: 100%;
//     justify-content: flex-start;
//     gap: 0.75rem;
//   }
// }

//   `]
// })
// export class TopicsListComponent {
//   @Input() topics: Topic[] = [];
//   @Output() topicSelected = new EventEmitter<Topic>();

//   onTopicClick(topic: Topic): void {
//     this.topicSelected.emit(topic);
//   }

//   // 🚀 NEW FUNCTION: Safely retrieves the author name from different fields
//   getAuthorName(topic: any): string {
//     // Check topic.author.name (standard model)
//     if (topic.author?.name) {
//       return topic.author.name;
//     }
//     // Check topic.createdByName (backend inconsistency)
//     if (topic.createdByName) {
//       return topic.createdByName;
//     }
//     return 'Unknown';
//   }
//   onLikeTopic(topic: any): void {
//     // IMPORTANT: Use $event.stopPropagation() in the template to prevent this
//     // from triggering onTopicClick, but handle the like logic here.

//     console.log('User liked topic:', topic.id);
    
//     // 1. Send the like data to your backend API (e.g., using a service)
//     // this.forumService.likeTopic(topic.id).subscribe({
//     //   next: (updatedTopic) => {
//     //     // Optionally update the topic data locally if needed
//     //     console.log('Like registered. New count:', updatedTopic.likeCount);
//     //   },
//     //   error: (err) => {
//     //     console.error('Failed to register like:', err);
//     //     // Show an error message to the user
//     //   }
//     // });
//   }
  

//   getTimeAgo(date: Date | string | undefined): string {
//     if (!date) return '';
//     const d = typeof date === 'string' ? new Date(date) : date;
//     const seconds = Math.floor((Date.now() - d.getTime()) / 1000);

//     if (seconds < 60) return 'just now';
//     if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
//     if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
//     return `${Math.floor(seconds / 86400)}d ago`;
//   }

//   getLimitedDescription(description: string): string {
//   if (!description) return '';
//   const words = description.split(' ');
//   return words.slice(0, 16).join(' ') + (words.length > 16 ? '...' : '');
// }

// }


import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Topic } from 'src/app/models/forum.model'; // Ensure the correct import path

@Component({
  selector: 'app-topics-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cardWithShadow">
      <div class="p-24">
        <div class="topics-list">
          <div *ngFor="let topic of topics" class="topic-card" (click)="onTopicClick(topic)">
            <div class="topic-header">
              <div class="topic-badge-group">
                <span class="category-badge" [attr.data-category]="topic.category">
                  {{ topic.category }}
                </span>
                <span *ngIf="topic.isPinned" class="pinned-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z"/>
                  </svg>
                  Pinned
                </span>
              </div>
            </div>

            <h2 class="topic-title">{{ topic.title }}</h2>
            <p class="topic-preview">{{ getLimitedDescription(topic.preview ?? '') }}</p>

            <div class="topic-footer">
              <div class="author-info">
                <img [src]="topic.author?.avatar || 'assets/avatar-0.jpg'" [alt]="topic.author?.name" class="avatar">
                <span class="author-name">{{ topic.author?.name }}</span>
              </div>

              <div class="topic-meta">
                <div class="meta-item like-button" (click)="$event.stopPropagation(); onLikeTopic(topic)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <span>{{ topic.likeCount || 0 }}</span>
                </div>

                <!-- Reply count -->
                <div class="meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <span>{{ topic.replyCount || 0 }}</span>
                </div>

                <!-- View count -->
                <div class="meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <span>{{ topic.viewCount || 0 }}</span>
                </div>

                <!-- Last activity time -->
                <div class="meta-item time">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>{{ getTimeAgo(topic.lastActivity) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Delete Button -->
          

          <div *ngIf="topics && topics.length === 0" class="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <h3>No topics found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cardWithShadow {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.cardWithShadow:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  transform: scale(1.02);
}

.p-24 {
  padding: 1.5rem;
}

.topics-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.topic-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.topic-card:hover {
  border-color: #2563eb;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.topic-header {
  margin-bottom: 0.75rem;
}

.topic-badge-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.category-badge {
  padding: 0.25rem 0.625rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  background: #eff6ff;
  color: #2563eb;
  transition: background 0.3s ease, color 0.3s ease;
}

.category-badge[data-category="Tax & Legal"] {
  background: #fef3c7;
  color: #d97706;
}

.category-badge[data-category="Business Growth"] {
  background: #d1fae5;
  color: #059669;
}

.category-badge[data-category="Success Stories"] {
  background: #fce7f3;
  color: #db2777;
}

.category-badge[data-category="LLC Formation"] {
  background: #ede9fe;
  color: #7c3aed;
}

.pinned-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.625rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  background: #fef3c7;
  color: #d97706;
}

.topic-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.topic-title:hover {
  color: #2563eb;
}

.topic-preview {
  color: #6b7280;
  font-size: 0.9375rem;
  line-height: 1.5;
  margin: 0 0 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: opacity 0.3s ease;
}

.topic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid #f3f4f6;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background: #e5e7eb;
  transition: background 0.3s ease;
}

.avatar:hover {
  background: #2563eb;
}

.author-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
}

.topic-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #9ca3af;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.meta-item:hover {
  color: #2563eb;
}

.meta-item svg {
  flex-shrink: 0;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #9ca3af;
}

.empty-state svg {
  margin: 0 auto 1rem;
}

.empty-state h3 {
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
}

.empty-state p {
  margin: 0;
  font-size: 0.9375rem;
}

@media (min-width: 640px) {
  .meta-item.time {
    display: flex;
  }
}

@media (max-width: 768px) {
  .p-24 {
    padding: 1.25rem;
  }

  .topic-card {
    padding: 1.125rem;
  }
}

@media (max-width: 640px) {
  .p-24 {
    padding: 1rem;
  }

  .topic-card {
    padding: 1rem;
  }

  .topic-title {
    font-size: 1rem;
  }

  .topic-preview {
    font-size: 0.875rem;
  }

  .topic-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .author-info {
    width: 100%;
  }

  .topic-meta {
    width: 100%;
    justify-content: flex-start;
    gap: 0.75rem;
  }
}

  `]
})
export class TopicsListComponent {
  @Input() topics: Topic[] = [];
  @Output() topicSelected = new EventEmitter<Topic>();
  @Output() topicDeleted = new EventEmitter<Topic>();  // Emit event after delete

 

  // Topic click event
  onTopicClick(topic: Topic): void {
    this.topicSelected.emit(topic);
  }

  // Get author's name safely from topic
  getAuthorName(topic: any): string {
    if (topic.author?.name) {
      return topic.author.name;
    }
    if (topic.createdByName) {
      return topic.createdByName;
    }
    return 'Unknown';
  }

  // Handle the like topic button click
  onLikeTopic(topic: any): void {
    console.log('User liked topic:', topic.id);
  }

  

  // Check if the current user can delete this item (e.g., only admins or post authors can delete)
  

  // Get time ago formatted string
  getTimeAgo(date: Date | string | undefined): string {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    const seconds = Math.floor((Date.now() - d.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }

  // Get limited description (only 16 words)
  getLimitedDescription(description: string): string {
    if (!description) return '';
    const words = description.split(' ');
    return words.slice(0, 16).join(' ') + (words.length > 16 ? '...' : '');
  }
}
