// import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { TopicDetail, Post, Reply, User } from 'src/app/models/forum.model';
// import { ForumService } from 'src/app/services/forum.service';
// import { ReplyDialogComponent } from '../reply-dialog.component';

// @Component({
//   selector: 'app-topic-detail',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatButtonModule,
//     MatIconModule,
//     MatDialogModule,
//     MatTooltipModule
//   ],
//   template: `
//     <ng-template #replyCardTemplate let-reply let-post="post">
//       <div class="reply-card">
//         <div class="author-info">
//           <img [src]="reply.author.avatar" [alt]="reply.author.name" class="avatar-small">
//           <div class="author-details">
//             <div class="author-name">{{ reply.author.name }}</div>
//             <div class="post-time">{{ getTimeAgo(reply.createdAt) }}</div>
//           </div>
//         </div>

//         <div class="reply-content">{{ reply.content }}</div>

//         <div class="reply-actions">
//           <button
//             class="action-btn-reply"
//             [class.liked]="isReplyLiked(reply)"
//             (click)="onLikeReply(post, reply)"
//             [matTooltip]="isReplyLiked(reply) ? 'Unlike' : 'Like'"
//           >
//             <mat-icon>thumb_up</mat-icon>
//             <span *ngIf="reply.likes.length > 0">{{ reply.likes.length }}</span>
//             <span>Like{{ reply.likes.length !== 1 ? 's' : '' }}</span>
//           </button>
//           <button
//             class="action-btn-reply reply"
//             (click)="onReplyToPost(post)"
//             matTooltip="Reply to this post"
//           >
//             <mat-icon>reply</mat-icon>
//             <span>Reply</span>
//           </button>
//         </div>
//       </div>
//     </ng-template>

//     <div class="topic-detail" *ngIf="topic">
//       <button class="back-btn" (click)="onBack()">
//         <mat-icon>arrow_back</mat-icon>
//         <span>Back to topics</span>
//       </button>

//       <div class="posts-container">
//         <ng-container *ngFor="let post of topic.posts; let i = index">
//           <div class="post-card" [class.main-post]="i === 0">
//             <div *ngIf="i === 0" class="topic-header-inline">
//               <div class="header-top">
//                 <div class="topic-badges">
//                   <span class="category-badge" [attr.data-category]="topic.category">
//                     {{ topic.category }}
//                   </span>
//                   <span *ngIf="topic.isPinned" class="pinned-badge">
//                     <mat-icon>push_pin</mat-icon>
//                     Pinned
//                   </span>
//                 </div>

//                 <div class="topic-stats">
//                   <div class="stat-item">
//                     <mat-icon>forum</mat-icon>
//                     <span>{{ topic.replyCount }}</span>
//                   </div>
//                   <div class="stat-item">
//                     <mat-icon>visibility</mat-icon>
//                     <span>{{ topic.viewCount }}</span>
//                   </div>
//                 </div>
//               </div>

//               <h1 class="topic-title">{{ topic.title }}</h1>

//               <div class="topic-footer">
//                 <mat-icon>schedule</mat-icon>
//                 <span>Last activity {{ getTimeAgo(topic.lastActivity) }}</span>
//               </div>
//             </div>
//             <div class="post-header">
//               <div class="author-info">
//                 <img [src]="post.author.avatar" [alt]="post.author.name" class="avatar">
//                 <div class="author-details">
//                   <div class="author-name">{{ post.author.name }}</div>
//                   <div class="post-time">
//                     <mat-icon class="time-icon">schedule</mat-icon>
//                     {{ getTimeAgo(post.createdAt) }}
//                   </div>
//                 </div>
//               </div>
//               <span *ngIf="i === 0" class="author-badge">
//                 <mat-icon>person</mat-icon>
//                 Topic Starter
//               </span>
//             </div>

//             <div class="post-content">{{ post.content }}</div>

//             <div class="post-actions">
//               <button
//                 mat-stroked-button
//                 class="action-btn"
//                 [class.liked]="isLiked(post)"
//                 (click)="onLikePost(post)"
//                 [matTooltip]="isLiked(post) ? 'Unlike' : 'Like this post'"
//               >
//                 <mat-icon>{{ isLiked(post) ? 'thumb_up' : 'thumb_up_outline' }}</mat-icon>
//                 <span>{{ post.likes.length > 0 ? post.likes.length : '' }} {{ post.likes.length === 1 ? 'Like' : (post.likes.length > 1 ? 'Likes' : 'Like') }}</span>
//               </button>
//               <button
//                 mat-stroked-button
//                 class="action-btn reply-btn"
//                 (click)="onReplyToPost(post)"
//                 matTooltip="Reply to this post"
//               >
//                 <mat-icon>reply</mat-icon>
//                 <span>Reply</span>
//               </button>
//             </div>

//             <div *ngIf="post.replies.length > 0" class="replies-section" [class.flat]="i === 0">
//               <div class="replies-header">
//                 <mat-icon>{{ i === 0 ? 'forum' : 'subdirectory_arrow_right' }}</mat-icon>
//                 <span>{{ post.replies.length }} {{ post.replies.length === 1 ? 'Reply' : 'Replies' }}</span>
//               </div>
//               <ng-container *ngFor="let reply of post.replies">
//                 <ng-container
//                   *ngTemplateOutlet="replyCardTemplate; context: {$implicit: reply, post: post}">
//                 </ng-container>
//               </ng-container>
//             </div>
//           </div>
//         </ng-container>
//       </div>

//       <div class="reply-form">
//         <div class="reply-form-header">
//           <mat-icon>rate_review</mat-icon>
//           <h3 class="reply-form-title">Join the discussion</h3>
//         </div>
//         <div class="current-user-info">
//           <img [src]="currentUser.avatar" [alt]="currentUser.name" class="avatar-small">
//           <span class="user-name">Posting as {{ currentUser.name }}</span>
//         </div>
//         <textarea
//           class="reply-textarea"
//           placeholder="Share your thoughts, ask questions, or provide feedback..."
//           rows="5"
//           [(ngModel)]="replyContent"
//         ></textarea>
//         <div class="reply-form-actions">
//           <button
//             mat-button
//             (click)="replyContent = ''"
//             [disabled]="!replyContent.trim()"
//           >
//             <mat-icon>close</mat-icon>
//             Cancel
//           </button>
//           <button
//             mat-raised-button
//             color="primary"
//             class="post-btn"
//             [disabled]="!replyContent.trim()"
//             (click)="submitReply()"
//           >
//             <mat-icon>send</mat-icon>
//             Post Reply
//           </button>
//         </div>
//       </div>
//     </div>
//   `,
//   styles: [`
//     .topic-detail {
//       max-width: 100%;
//     }

//     .back-btn {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       padding: 0.625rem 1.125rem;
//       border: none;
//       background: white;
//       color: #6b7280;
//       border-radius: 0.5rem;
//       font-size: 0.9375rem;
//       font-weight: 500;
//       cursor: pointer;
//       margin-bottom: 1.5rem;
//       transition: all 0.2s;
//       box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
//     }

//     .back-btn:hover {
//       background: #f3f4f6;
//       color: #1f2937;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//     }

//     .back-btn mat-icon {
//       font-size: 20px;
//       width: 20px;
//       height: 20px;
//     }

//     .topic-header-inline {
//       padding-bottom: 1.5rem;
//       margin-bottom: 1.5rem;
//       border-bottom: 2px solid #e5e7eb;
//     }

//     .header-top {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       gap: 1rem;
//       margin-bottom: 1rem;
//     }

//     .topic-badges {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       flex-wrap: wrap;
//     }

//     .topic-stats {
//       display: flex;
//       gap: 1rem;
//       align-items: center;
//     }

//     .stat-item {
//       display: flex;
//       align-items: center;
//       gap: 0.375rem;
//       color: #6b7280;
//       font-size: 0.875rem;
//       font-weight: 600;
//     }

//     .stat-item mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     .category-badge {
//       display: flex;
//       align-items: center;
//       gap: 0.25rem;
//       padding: 0.375rem 0.75rem;
//       border-radius: 0.5rem;
//       font-size: 0.8125rem;
//       font-weight: 600;
//       background: #eff6ff;
//       color: #2563eb;
//     }

//     .category-badge[data-category="Tax & Legal"] {
//       background: #fef3c7;
//       color: #d97706;
//     }

//     .category-badge[data-category="Business Growth"] {
//       background: #d1fae5;
//       color: #059669;
//     }

//     .category-badge[data-category="Success Stories"] {
//       background: #fce7f3;
//       color: #db2777;
//     }

//     .category-badge[data-category="LLC Formation"] {
//       background: #ede9fe;
//       color: #7c3aed;
//     }

//     .pinned-badge {
//       display: flex;
//       align-items: center;
//       gap: 0.375rem;
//       padding: 0.375rem 0.75rem;
//       border-radius: 0.5rem;
//       font-size: 0.8125rem;
//       font-weight: 600;
//       background: #fef3c7;
//       color: #d97706;
//     }

//     .pinned-badge mat-icon {
//       font-size: 16px;
//       width: 16px;
//       height: 16px;
//     }

//     .topic-title {
//       font-size: 1.75rem;
//       font-weight: 700;
//       color: #111827;
//       margin: 0 0 0.875rem 0;
//       line-height: 1.3;
//     }

//     .topic-footer {
//       display: flex;
//       align-items: center;
//       gap: 0.375rem;
//       color: #6b7280;
//       font-size: 0.875rem;
//     }

//     .topic-footer mat-icon {
//       font-size: 16px;
//       width: 16px;
//       height: 16px;
//     }

//     .posts-container {
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//       margin-bottom: 1.5rem;
//     }

//     .post-card {
//       background: white;
//       border: 1px solid #e5e7eb;
//       border-radius: 0.75rem;
//       padding: 1.5rem;
//       transition: all 0.2s;
//       box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
//     }

//     .post-card:hover {
//       box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
//     }

//     .post-card.main-post {
//       border-color: #2563eb;
//       border-width: 2px;
//       background: linear-gradient(to bottom, #eff6ff, white);
//     }

//     .post-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       margin-bottom: 1rem;
//       gap: 1rem;
//     }

//     .author-info {
//       display: flex;
//       align-items: center;
//       gap: 0.75rem;
//     }

//     .avatar {
//       width: 2.75rem;
//       height: 2.75rem;
//       border-radius: 9999px;
//       background: #e5e7eb;
//       border: 2px solid white;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//     }

//     .avatar-small {
//       width: 2rem;
//       height: 2rem;
//       border-radius: 9999px;
//       background: #e5e7eb;
//       border: 2px solid white;
//       box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
//     }

//     .author-details {
//       display: flex;
//       flex-direction: column;
//       gap: 0.125rem;
//     }

//     .author-name {
//       font-weight: 600;
//       color: #111827;
//       font-size: 0.9375rem;
//     }

//     .post-time {
//       display: flex;
//       align-items: center;
//       gap: 0.25rem;
//       font-size: 0.8125rem;
//       color: #9ca3af;
//     }

//     .time-icon {
//       font-size: 14px !important;
//       width: 14px !important;
//       height: 14px !important;
//     }

//     .author-badge {
//       display: flex;
//       align-items: center;
//       gap: 0.375rem;
//       padding: 0.375rem 0.75rem;
//       border-radius: 0.5rem;
//       font-size: 0.8125rem;
//       font-weight: 600;
//       background: #dbeafe;
//       color: #2563eb;
//       white-space: nowrap;
//     }

//     .author-badge mat-icon {
//       font-size: 16px;
//       width: 16px;
//       height: 16px;
//     }

//     .post-content {
//       color: #374151;
//       line-height: 1.7;
//       font-size: 0.9375rem;
//       margin-bottom: 1.25rem;
//       white-space: pre-wrap;
//     }

//     .post-actions {
//       display: flex;
//       gap: 0.75rem;
//       padding-top: 1rem;
//       border-top: 1px solid #f3f4f6;
//     }

//     .action-btn {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       padding: 0.5rem 1rem !important;
//       border-radius: 0.5rem !important;
//       font-weight: 500 !important;
//       font-size: 0.875rem !important;
//       transition: all 0.2s;
//       border-color: #e5e7eb !important;
//       color: #6b7280 !important;
//     }

//     .action-btn:hover:not(.liked) {
//       background: #f9fafb !important;
//       border-color: #d1d5db !important;
//       color: #374151 !important;
//     }

//     .action-btn.liked {
//       background: #dbeafe !important;
//       border-color: #93c5fd !important;
//       color: #2563eb !important;
//     }

//     .action-btn mat-icon {
//       font-size: 20px;
//       width: 20px;
//       height: 20px;
//     }

//     .reply-btn {
//       color: #059669 !important;
//     }

//     .reply-btn:hover {
//       background: #d1fae5 !important;
//       border-color: #6ee7b7 !important;
//       color: #047857 !important;
//     }

//     .replies-section {
//       margin-top: 1.5rem;
//       padding-left: 2.5rem;
//       border-left: 3px solid #e5e7eb;
//     }

//     .replies-section.flat {
//       margin-top: 0;
//       padding-left: 0;
//       border-left: none;
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//     }

//     .replies-header {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       margin-bottom: 0.75rem;
//       color: #6b7280;
//       font-size: 0.875rem;
//       font-weight: 600;
//     }

//     .replies-header mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     .reply-card {
//       background: white;
//       border: 1px solid #e5e7eb;
//       border-radius: 0.625rem;
//       padding: 1.25rem;
//       transition: all 0.2s;
//       display: flex;
//       flex-direction: column;
//       gap: 0.75rem;
//     }

//     .replies-section.flat .reply-card {
//         margin-bottom: 0;
//     }

//     .replies-section:not(.flat) .reply-card {
//       background: #f9fafb;
//     }

//     .reply-card:hover {
//       border-color: #d1d5db;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
//     }

//     .reply-content {
//       color: #374151;
//       line-height: 1.6;
//       font-size: 0.9375rem;
//       white-space: pre-wrap;
//       margin: 0;
//       padding: 0;
//     }

//     .reply-actions {
//       display: flex;
//       gap: 0.5rem;
//       padding: 0;
//       margin-top: 0.5rem;
//     }

//     .action-btn-reply {
//       display: inline-flex;
//       align-items: center;
//       gap: 0.5rem;
//       padding: 0.375rem 0.875rem;
//       border-radius: 0.375rem;
//       font-size: 0.875rem;
//       font-weight: 500;
//       cursor: pointer;
//       border: 1px solid #d1d5db;
//       background-color: transparent;
//       color: #6b7280;
//       transition: all 0.2s;
//     }

//     .action-btn-reply:hover {
//       background-color: #f3f4f6;
//     }

//     .action-btn-reply mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     .action-btn-reply.liked {
//       background-color: #e0eaff;
//       color: #3b82f6;
//       border-color: transparent;
//     }

//     .action-btn-reply.liked:hover {
//       background-color: #d1e0ff;
//     }

//     .reply-form {
//       background: white;
//       border: 2px solid #e5e7eb;
//       border-radius: 0.875rem;
//       padding: 1.75rem;
//       box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
//     }

//     .reply-form-header {
//       display: flex;
//       align-items: center;
//       gap: 0.75rem;
//       margin-bottom: 1.25rem;
//     }

//     .reply-form-header mat-icon {
//       color: #2563eb;
//       font-size: 28px;
//       width: 28px;
//       height: 28px;
//     }

//     .reply-form-title {
//       font-size: 1.25rem;
//       font-weight: 700;
//       color: #111827;
//       margin: 0;
//     }

//     .current-user-info {
//       display: flex;
//       align-items: center;
//       gap: 0.625rem;
//       margin-bottom: 1rem;
//       padding: 0.75rem;
//       background: #f9fafb;
//       border-radius: 0.5rem;
//     }

//     .user-name {
//       font-size: 0.875rem;
//       font-weight: 500;
//       color: #6b7280;
//     }

//     .reply-textarea {
//       width: 100%;
//       padding: 1rem;
//       border: 2px solid #e5e7eb;
//       border-radius: 0.625rem;
//       font-size: 0.9375rem;
//       font-family: inherit;
//       line-height: 1.6;
//       resize: vertical;
//       transition: all 0.2s;
//       min-height: 120px;
//     }

//     .reply-textarea:focus {
//       outline: none;
//       border-color: #2563eb;
//       box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
//     }

//     .reply-textarea::placeholder {
//       color: #9ca3af;
//     }

//     .reply-form-actions {
//       display: flex;
//       justify-content: flex-end;
//       gap: 0.75rem;
//       margin-top: 1rem;
//     }

//     .reply-form-actions button {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       font-weight: 600 !important;
//     }

//     .reply-form-actions button mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     .post-btn {
//       background: #2563eb !important;
//       color: white !important;
//       padding: 0.625rem 1.5rem !important;
//     }

//     .post-btn:hover:not(:disabled) {
//       background: #1d4ed8 !important;
//       box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);
//     }

//     .post-btn:disabled {
//       opacity: 0.5;
//     }

//     @media (max-width: 768px) {
//       .topic-header-inline { padding-bottom: 1.25rem; margin-bottom: 1.25rem; }
//       .header-top { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
//       .topic-title { font-size: 1.5rem; }
//       .post-card { padding: 1.375rem; }
//       .reply-form { padding: 1.5rem; }
//       .post-actions { flex-wrap: wrap; }
//     }

//     @media (max-width: 640px) {
//       .back-btn { width: 100%; justify-content: center; margin-bottom: 1rem; }
//       .topic-header-inline { padding-bottom: 1rem; margin-bottom: 1rem; }
//       .topic-title { font-size: 1.25rem; }
//       .topic-stats { gap: 0.75rem; }
//       .stat-item { font-size: 0.8125rem; }
//       .post-card { padding: 1rem; }
//       .post-header { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
//       .author-badge { align-self: flex-start; }
//       .post-content { font-size: 0.875rem; }
//       .post-actions { gap: 0.5rem; }
//       .action-btn { font-size: 0.8125rem !important; padding: 0.5rem 0.875rem !important; }
//       .replies-section { padding-left: 0.75rem; border-left-width: 2px; margin-top: 1rem; }
//       .reply-card { padding: 0.875rem; }
//       .reply-content { padding-left: 0; font-size: 0.875rem;}
//       .reply-actions { padding-left: 0; }
//       .reply-form { padding: 1rem; }
//       .reply-form-header mat-icon { font-size: 24px; width: 24px; height: 24px; }
//       .reply-form-title { font-size: 1.125rem; }
//       .reply-textarea { font-size: 0.875rem; min-height: 100px; }
//       .reply-form-actions { flex-wrap: wrap; }
//       .reply-form-actions button { flex: 1; min-width: 120px; }
//     }
//   `]
// })
// export class TopicDetailComponent implements OnChanges {
//   @Input() topic: TopicDetail | null = null;
//   @Output() back = new EventEmitter<void>();
//   @Output() replySubmitted = new EventEmitter<{ content: string; parentPostId: string }>();

//   replyContent = '';
//   currentUser: User;

//   constructor(
//     private forumService: ForumService,
//     private dialog: MatDialog
//   ) {
//     this.currentUser = this.forumService.getCurrentUser();
//   }

//   ngOnChanges(): void {
//     if (this.topic) {
//       const freshTopic = this.forumService.getTopicById(this.topic.id);
//       if (freshTopic) {
//         this.topic = freshTopic;
//       }
//     }
//   }

//   onBack(): void {
//     this.back.emit();
//   }

//   submitReply(): void {
//     if (this.replyContent.trim() && this.topic && this.topic.posts.length > 0) {
//       const firstPostId = this.topic.posts[0].id;
//       this.forumService.addReplyToTopic(this.topic.id, this.replyContent, firstPostId);
//       this.replyContent = '';
//       this.refreshTopic();
//     }
//   }

//   onLikePost(post: Post): void {
//     if (this.topic) {
//       this.forumService.togglePostLike(this.topic.id, post.id);
//       this.refreshTopic();
//     }
//   }

//   onLikeReply(post: Post, reply: Reply): void {
//     if (this.topic) {
//       this.forumService.toggleReplyLike(this.topic.id, post.id, reply.id);
//       this.refreshTopic();
//     }
//   }

//   onReplyToPost(post: Post): void {
//     const isTopicStarter = this.topic?.posts[0].id === post.id;

//     const dialogRef = this.dialog.open(ReplyDialogComponent, {
//       width: '600px',
//       maxWidth: '90vw',
//       data: {
//         post,
//         currentUser: this.currentUser,
//         isTopicStarter
//       }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result && this.topic) {
//         if (isTopicStarter) {
//           this.forumService.addReplyToTopic(this.topic.id, result, post.id);
//         } else {
//           this.forumService.addNestedReply(this.topic.id, post.id, result);
//         }
//         this.refreshTopic();
//       }
//     });
//   }

//   private refreshTopic(): void {
//     if (this.topic) {
//       const updatedTopic = this.forumService.getTopicById(this.topic.id);
//       if (updatedTopic) {
//         this.topic = updatedTopic;
//       }
//     }
//   }

//   isLiked(post: Post): boolean {
//     return post.likes.includes(this.currentUser.id);
//   }

//   isReplyLiked(reply: Reply): boolean {
//     return reply.likes.includes(this.currentUser.id);
//   }

//   getTimeAgo(date: Date): string {
//     const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

//     if (seconds < 60) return 'just now';
//     if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
//     if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
//     return `${Math.floor(seconds / 86400)}d ago`;
//   }
// }

// conversational_forum/topic-detail/topic-detail.component.ts (FINAL)
// import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { TopicDetail, Post, Reply, User } from 'src/app/models/forum.model'; 
// import { ForumService } from 'src/app/services/forum.service'; 
// import { UserService } from 'src/app/shared/userService';
// import { ReplyDialogComponent, ReplyDialogData } from '../reply-dialog.component'; 
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-topic-detail',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatButtonModule,
//     MatIconModule,
//     MatDialogModule,
//     MatTooltipModule
//   ],
//   template: `
//     <div class="topic-detail" *ngIf="topic">
//       <button class="back-btn" (click)="onBack()">
//         <mat-icon>arrow_back</mat-icon>
//         <span>Back to topics</span>
//       </button>

//       <div class="posts-container">
//         <ng-container *ngIf="topic.posts && topic.posts.length > 0">
//          <div class="post-card main-post">
//             <div class="post-actions">
//                  <button mat-stroked-button class="action-btn" [class.liked]="isPostLikedByCurrentUser(topic.posts[0])" (click)="onLikePost(topic.posts[0])" matTooltip="Like this post">
//                     <mat-icon>{{ isPostLikedByCurrentUser(topic.posts[0]) ? 'thumb_up' : 'thumb_up_outline' }}</mat-icon>
//                      <span>{{ topic.posts[0].likesCount ?? 0 }} {{ (topic.posts[0].likesCount ?? 0) === 1 ? 'Like' : 'Likes' }}</span>
//                 </button>
//                  <button mat-stroked-button class="action-btn reply-btn" (click)="onReplyToPost(topic.posts[0])" matTooltip="Reply to this post">
//                     <mat-icon>reply</mat-icon><span>Reply</span>
//                 </button>
//             </div>
//             </div>
//         </ng-container>

//          <ng-container *ngFor="let post of topic.posts.slice(1); let i = index">
//              <div class="post-card">
//                  <div class="post-actions">
//                     <button mat-stroked-button class="action-btn" [class.liked]="isPostLikedByCurrentUser(post)" (click)="onLikePost(post)" matTooltip="Like this reply">
//                        <mat-icon>{{ isPostLikedByCurrentUser(post) ? 'thumb_up' : 'thumb_up_outline' }}</mat-icon>
//                         <span>{{ post.likesCount ?? 0 }} {{ (post.likesCount ?? 0) === 1 ? 'Like' : 'Likes' }}</span>
//                    </button>
//                     <button mat-stroked-button class="action-btn reply-btn" (click)="onReplyToPost(post)" matTooltip="Reply to this comment">
//                        <mat-icon>reply</mat-icon><span>Reply</span>
//                    </button>
//                </div>
//                 </div>
//         </ng-container>
//       </div>

//        <div class="reply-form">
//          <textarea class="reply-textarea" placeholder="Share your thoughts, ask questions, or provide feedback..." rows="5" [(ngModel)]="replyContent"></textarea>
//          <div class="reply-form-actions">
//             <button mat-button (click)="replyContent = ''" [disabled]="!replyContent.trim()"><mat-icon>close</mat-icon>Cancel</button>
//             <button mat-raised-button color="primary" class="post-btn" [disabled]="!replyContent.trim()" (click)="submitReplyToTopic()">
//                  <mat-icon>send</mat-icon>Post Reply
//             </button>
//          </div>
//        </div>
//     </div>

//      <ng-template #replyCardTemplate let-reply let-post="post">
//       <div class="reply-card">
//         <div class="reply-actions">
//           <button class="action-btn-reply" [class.liked]="isReplyLikedByCurrentUser(reply)" (click)="onLikeReply(reply)" matTooltip="Like this reply">
//             <mat-icon>thumb_up</mat-icon>
//              <span *ngIf="(reply.likesCount ?? 0) > 0">{{ reply.likesCount }}</span>
//              <span>Like{{ (reply.likesCount ?? 0) !== 1 ? 's' : '' }}</span>
//           </button>
//           <button class="action-btn-reply reply" (click)="onReplyToReply(post, reply)" matTooltip="Reply to this comment">
//             <mat-icon>reply</mat-icon>
//              <span>Reply</span>
//           </button>
//         </div>
//       </div>
//     </ng-template>
//   `,
//   styles: [`
//     .topic-detail {
//       max-width: 100%;
//     }

//     .back-btn {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       padding: 0.625rem 1.125rem;
//       border: none;
//       background: white;
//       color: #6b7280;
//       border-radius: 0.5rem;
//       font-size: 0.9375rem;
//       font-weight: 500;
//       cursor: pointer;
//       margin-bottom: 1.5rem;
//       transition: all 0.2s;
//       box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
//     }

//     .back-btn:hover {
//       background: #f3f4f6;
//       color: #1f2937;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//     }

//     .back-btn mat-icon {
//       font-size: 20px;
//       width: 20px;
//       height: 20px;
//     }

//     .topic-header-inline {
//       padding-bottom: 1.5rem;
//       margin-bottom: 1.5rem;
//       border-bottom: 2px solid #e5e7eb;
//     }

//     .header-top {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       gap: 1rem;
//       margin-bottom: 1rem;
//     }

//     .topic-badges {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       flex-wrap: wrap;
//     }

//     .topic-stats {
//       display: flex;
//       gap: 1rem;
//       align-items: center;
//     }

//     .stat-item {
//       display: flex;
//       align-items: center;
//       gap: 0.375rem;
//       color: #6b7280;
//       font-size: 0.875rem;
//       font-weight: 600;
//     }

//     .stat-item mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     .category-badge {
//       display: flex;
//       align-items: center;
//       gap: 0.25rem;
//       padding: 0.375rem 0.75rem;
//       border-radius: 0.5rem;
//       font-size: 0.8125rem;
//       font-weight: 600;
//       background: #eff6ff;
//       color: #2563eb;
//     }

//     .category-badge[data-category="Tax & Legal"] {
//       background: #fef3c7;
//       color: #d97706;
//     }

//     .category-badge[data-category="Business Growth"] {
//       background: #d1fae5;
//       color: #059669;
//     }

//     .category-badge[data-category="Success Stories"] {
//       background: #fce7f3;
//       color: #db2777;
//     }

//     .category-badge[data-category="LLC Formation"] {
//       background: #ede9fe;
//       color: #7c3aed;
//     }

//     .pinned-badge {
//       display: flex;
//       align-items: center;
//       gap: 0.375rem;
//       padding: 0.375rem 0.75rem;
//       border-radius: 0.5rem;
//       font-size: 0.8125rem;
//       font-weight: 600;
//       background: #fef3c7;
//       color: #d97706;
//     }

//     .pinned-badge mat-icon {
//       font-size: 16px;
//       width: 16px;
//       height: 16px;
//     }

//     .topic-title {
//       font-size: 1.75rem;
//       font-weight: 700;
//       color: #111827;
//       margin: 0 0 0.875rem 0;
//       line-height: 1.3;
//     }

//     .topic-footer {
//       display: flex;
//       align-items: center;
//       gap: 0.375rem;
//       color: #6b7280;
//       font-size: 0.875rem;
//     }

//     .topic-footer mat-icon {
//       font-size: 16px;
//       width: 16px;
//       height: 16px;
//     }

//     .posts-container {
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//       margin-bottom: 1.5rem;
//     }

//     .post-card {
//       background: white;
//       border: 1px solid #e5e7eb;
//       border-radius: 0.75rem;
//       padding: 1.5rem;
//       transition: all 0.2s;
//       box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
//     }

//     .post-card:hover {
//       box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
//     }

//     .post-card.main-post {
//       border-color: #2563eb;
//       border-width: 2px;
//       background: linear-gradient(to bottom, #eff6ff, white);
//     }

//     .post-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       margin-bottom: 1rem;
//       gap: 1rem;
//     }

//     .author-info {
//       display: flex;
//       align-items: center;
//       gap: 0.75rem;
//     }

//     .avatar {
//       width: 2.75rem;
//       height: 2.75rem;
//       border-radius: 9999px;
//       background: #e5e7eb;
//       border: 2px solid white;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//     }

//     .avatar-small {
//       width: 2rem;
//       height: 2rem;
//       border-radius: 9999px;
//       background: #e5e7eb;
//       border: 2px solid white;
//       box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
//     }

//     .author-details {
//       display: flex;
//       flex-direction: column;
//       gap: 0.125rem;
//     }

//     .author-name {
//       font-weight: 600;
//       color: #111827;
//       font-size: 0.9375rem;
//     }

//     .post-time {
//       display: flex;
//       align-items: center;
//       gap: 0.25rem;
//       font-size: 0.8125rem;
//       color: #9ca3af;
//     }

//     .time-icon {
//       font-size: 14px !important;
//       width: 14px !important;
//       height: 14px !important;
//     }

//     .author-badge {
//       display: flex;
//       align-items: center;
//       gap: 0.375rem;
//       padding: 0.375rem 0.75rem;
//       border-radius: 0.5rem;
//       font-size: 0.8125rem;
//       font-weight: 600;
//       background: #dbeafe;
//       color: #2563eb;
//       white-space: nowrap;
//     }

//     .author-badge mat-icon {
//       font-size: 16px;
//       width: 16px;
//       height: 16px;
//     }

//     .post-content {
//       color: #374151;
//       line-height: 1.7;
//       font-size: 0.9375rem;
//       margin-bottom: 1.25rem;
//       white-space: pre-wrap;
//     }

//     .post-actions {
//       display: flex;
//       gap: 0.75rem;
//       padding-top: 1rem;
//       border-top: 1px solid #f3f4f6;
//     }

//     .action-btn {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       padding: 0.5rem 1rem !important;
//       border-radius: 0.5rem !important;
//       font-weight: 500 !important;
//       font-size: 0.875rem !important;
//       transition: all 0.2s;
//       border-color: #e5e7eb !important;
//       color: #6b7280 !important;
//     }

//     .action-btn:hover:not(.liked) {
//       background: #f9fafb !important;
//       border-color: #d1d5db !important;
//       color: #374151 !important;
//     }

//     .action-btn.liked {
//       background: #dbeafe !important;
//       border-color: #93c5fd !important;
//       color: #2563eb !important;
//     }

//     .action-btn mat-icon {
//       font-size: 20px;
//       width: 20px;
//       height: 20px;
//     }

//     .reply-btn {
//       color: #059669 !important;
//     }

//     .reply-btn:hover {
//       background: #d1fae5 !important;
//       border-color: #6ee7b7 !important;
//       color: #047857 !important;
//     }

//     .replies-section {
//       margin-top: 1.5rem;
//       padding-left: 2.5rem;
//       border-left: 3px solid #e5e7eb;
//     }

//     .replies-section.flat {
//       margin-top: 0;
//       padding-left: 0;
//       border-left: none;
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//     }

//     .replies-header {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       margin-bottom: 0.75rem;
//       color: #6b7280;
//       font-size: 0.875rem;
//       font-weight: 600;
//     }

//     .replies-header mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     .reply-card {
//       background: white;
//       border: 1px solid #e5e7eb;
//       border-radius: 0.625rem;
//       padding: 1.25rem;
//       transition: all 0.2s;
//       display: flex;
//       flex-direction: column;
//       gap: 0.75rem;
//     }

//     .replies-section.flat .reply-card {
//         margin-bottom: 0;
//     }

//     .replies-section:not(.flat) .reply-card {
//       background: #f9fafb;
//     }

//     .reply-card:hover {
//       border-color: #d1d5db;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
//     }

//     .reply-content {
//       color: #374151;
//       line-height: 1.6;
//       font-size: 0.9375rem;
//       white-space: pre-wrap;
//       margin: 0;
//       padding: 0;
//     }

//     .reply-actions {
//       display: flex;
//       gap: 0.5rem;
//       padding: 0;
//       margin-top: 0.5rem;
//     }

//     .action-btn-reply {
//       display: inline-flex;
//       align-items: center;
//       gap: 0.5rem;
//       padding: 0.375rem 0.875rem;
//       border-radius: 0.375rem;
//       font-size: 0.875rem;
//       font-weight: 500;
//       cursor: pointer;
//       border: 1px solid #d1d5db;
//       background-color: transparent;
//       color: #6b7280;
//       transition: all 0.2s;
//     }

//     .action-btn-reply:hover {
//       background-color: #f3f4f6;
//     }

//     .action-btn-reply mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     .action-btn-reply.liked {
//       background-color: #e0eaff;
//       color: #3b82f6;
//       border-color: transparent;
//     }

//     .action-btn-reply.liked:hover {
//       background-color: #d1e0ff;
//     }

//     .reply-form {
//       background: white;
//       border: 2px solid #e5e7eb;
//       border-radius: 0.875rem;
//       padding: 1.75rem;
//       box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
//     }

//     .reply-form-header {
//       display: flex;
//       align-items: center;
//       gap: 0.75rem;
//       margin-bottom: 1.25rem;
//     }

//     .reply-form-header mat-icon {
//       color: #2563eb;
//       font-size: 28px;
//       width: 28px;
//       height: 28px;
//     }

//     .reply-form-title {
//       font-size: 1.25rem;
//       font-weight: 700;
//       color: #111827;
//       margin: 0;
//     }

//     .current-user-info {
//       display: flex;
//       align-items: center;
//       gap: 0.625rem;
//       margin-bottom: 1rem;
//       padding: 0.75rem;
//       background: #f9fafb;
//       border-radius: 0.5rem;
//     }

//     .user-name {
//       font-size: 0.875rem;
//       font-weight: 500;
//       color: #6b7280;
//     }

//     .reply-textarea {
//       width: 100%;
//       padding: 1rem;
//       border: 2px solid #e5e7eb;
//       border-radius: 0.625rem;
//       font-size: 0.9375rem;
//       font-family: inherit;
//       line-height: 1.6;
//       resize: vertical;
//       transition: all 0.2s;
//       min-height: 120px;
//     }

//     .reply-textarea:focus {
//       outline: none;
//       border-color: #2563eb;
//       box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
//     }

//     .reply-textarea::placeholder {
//       color: #9ca3af;
//     }

//     .reply-form-actions {
//       display: flex;
//       justify-content: flex-end;
//       gap: 0.75rem;
//       margin-top: 1rem;
//     }

//     .reply-form-actions button {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       font-weight: 600 !important;
//     }

//     .reply-form-actions button mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     .post-btn {
//       background: #2563eb !important;
//       color: white !important;
//       padding: 0.625rem 1.5rem !important;
//     }

//     .post-btn:hover:not(:disabled) {
//       background: #1d4ed8 !important;
//       box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);
//     }

//     .post-btn:disabled {
//       opacity: 0.5;
//     }

//     @media (max-width: 768px) {
//       .topic-header-inline { padding-bottom: 1.25rem; margin-bottom: 1.25rem; }
//       .header-top { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
//       .topic-title { font-size: 1.5rem; }
//       .post-card { padding: 1.375rem; }
//       .reply-form { padding: 1.5rem; }
//       .post-actions { flex-wrap: wrap; }
//     }

//     @media (max-width: 640px) {
//       .back-btn { width: 100%; justify-content: center; margin-bottom: 1rem; }
//       .topic-header-inline { padding-bottom: 1rem; margin-bottom: 1rem; }
//       .topic-title { font-size: 1.25rem; }
//       .topic-stats { gap: 0.75rem; }
//       .stat-item { font-size: 0.8125rem; }
//       .post-card { padding: 1rem; }
//       .post-header { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
//       .author-badge { align-self: flex-start; }
//       .post-content { font-size: 0.875rem; }
//       .post-actions { gap: 0.5rem; }
//       .action-btn { font-size: 0.8125rem !important; padding: 0.5rem 0.875rem !important; }
//       .replies-section { padding-left: 0.75rem; border-left-width: 2px; margin-top: 1rem; }
//       .reply-card { padding: 0.875rem; }
//       .reply-content { padding-left: 0; font-size: 0.875rem;}
//       .reply-actions { padding-left: 0; }
//       .reply-form { padding: 1rem; }
//       .reply-form-header mat-icon { font-size: 24px; width: 24px; height: 24px; }
//       .reply-form-title { font-size: 1.125rem; }
//       .reply-textarea { font-size: 0.875rem; min-height: 100px; }
//       .reply-form-actions { flex-wrap: wrap; }
//       .reply-form-actions button { flex: 1; min-width: 120px; }
//     }
//   `]
// })
// export class TopicDetailComponent implements OnInit, OnChanges, OnDestroy {
//   @Input() topicId: string | null = null;
//   @Output() back = new EventEmitter<void>();

//   topic: TopicDetail | null = null;
//   replyContent = '';
//   currentUser: User;
//   isLoading = false;
//   error: string | null = null;

//   likedPosts = new Set<string>();
//   likedReplies = new Set<string>();

//   private topicSubscription: Subscription | null = null;


//   constructor(
//     private forumService: ForumService,
//     private userService: UserService,
//     private dialog: MatDialog
//   ) {
//     this.currentUser = this.forumService.getCurrentUser();
//   }

//    ngOnInit(): void {
//     if (this.topicId) {
//       this.fetchTopicDetails(this.topicId);
//     }
//   }
  

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['topicId'] && !changes['topicId'].firstChange && this.topicId) {
//        this.fetchTopicDetails(this.topicId);
//     }
//   }

//    ngOnDestroy(): void {
//     this.topicSubscription?.unsubscribe();
//   }

//   fetchTopicDetails(id: string): void {
//     this.isLoading = true;
//     this.error = null;
//      this.topicSubscription = this.forumService.getTopicById(id).subscribe({
//       next: (topicDetail) => {
//         this.topic = topicDetail;
//          this.isLoading = false;
//       },
//       error: (err) => {
//         console.error('Error fetching topic details:', err);
//         this.error = 'Failed to load topic details.';
//         this.isLoading = false;
//       }
//     });
//   }


//   onBack(): void {
//     this.back.emit();
//   }

//    submitReplyToTopic(): void {
//     if (this.replyContent.trim() && this.topic && this.topic.posts.length > 0) {
//       const mainPostId = this.topic.posts[0].id;

//        this.forumService.addReplyToPost(mainPostId, this.replyContent)
//           .subscribe({
//             next: () => {
//                 this.replyContent = '';
//             },
//             error: (err) => console.error('Error submitting reply:', err)
//           });
//     }
//   }


//    onLikePost(post: Post): void {
//     this.forumService.toggleLike(post.id, null).subscribe({
//         error: (err) => {
//             console.error('Error toggling post like:', err);
//         }
//     });
//   }

//   onLikeReply(reply: Reply): void {
//      this.forumService.toggleLike(null, reply.id).subscribe({
//         error: (err) => {
//             console.error('Error toggling reply like:', err);
//         }
//      });
//   }

//    // ✅ FIX: Restored method definition (resolves TS2339 in template)
//    onReplyToPost(postToReplyTo: Post): void {
//        this.openReplyDialog(postToReplyTo, null);
//    }

//    // ✅ FIX: Restored method definition (resolves TS2339 in template)
//    onReplyToReply(parentPost: Post, replyToReplyTo: Reply): void {
//        this.openReplyDialog(parentPost, replyToReplyTo);
//    }


//    private openReplyDialog(parentPost: Post, parentReply: Reply | null): void {
//        const dialogRef = this.dialog.open(ReplyDialogComponent, {
//            width: '600px',
//            maxWidth: '90vw',
//            data: {
//                post: parentPost,
//                replyingTo: parentReply,
//                currentUser: this.currentUser
//            } as ReplyDialogData
//        });

//        dialogRef.afterClosed().subscribe(result => {
//            if (result && typeof result === 'string' && this.topic) { 
//                const content = result;
//                if (parentReply) {
//                    this.forumService.addNestedReply(parentPost.id, parentReply.id, content)
//                        .subscribe({
//                            error: (err) => console.error('Error adding nested reply:', err)
//                        });
//                } else {
//                    this.forumService.addReplyToPost(parentPost.id, content)
//                       .subscribe({
//                            error: (err) => console.error('Error adding direct reply:', err)
//                        });
//                }
//            }
//        });
//    }


//   isPostLikedByCurrentUser(post: Post): boolean {
//     return post.likes.includes(this.currentUser.id);
//   }

//   isReplyLikedByCurrentUser(reply: Reply): boolean {
//       return reply.likes.includes(this.currentUser.id);
//   }

//   getTimeAgo(dateInput: Date | string | undefined): string {
//      if (!dateInput) return '';
//     const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
//      if (isNaN(date.getTime())) return ''; 

//     const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

//     if (seconds < 60) return 'just now';
//     const minutes = Math.floor(seconds / 60);
//     if (minutes < 60) return `${minutes}m ago`;
//     const hours = Math.floor(minutes / 60);
//     if (hours < 24) return `${hours}h ago`;
//     const days = Math.floor(hours / 24);
//      if (days < 7) return `${days}d ago`;
//     const weeks = Math.floor(days / 7);
//     return `${weeks}w ago`;
//   }
// }


// import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { TopicDetail, Post, Reply, User } from 'src/app/models/forum.model'; 
// import { ForumService } from 'src/app/services/forum.service'; 
// import { UserService } from 'src/app/shared/userService';
// import { ReplyDialogComponent, ReplyDialogData } from '../reply-dialog.component'; 
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-topic-detail',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatButtonModule,
//     MatIconModule,
//     MatDialogModule,
//     MatTooltipModule
//   ],
//   template: `
//     <div class="topic-detail" *ngIf="topic">
//       <button class="back-btn" (click)="onBack()">
//         <mat-icon>arrow_back</mat-icon>
//         <span>Back to topics</span>
//       </button>

//       <div class="posts-container">
//         <ng-container *ngIf="topic.posts && topic.posts.length > 0">
//          <div class="post-card main-post">
//             <div class="post-actions">
//                  <button mat-stroked-button class="action-btn" [class.liked]="isPostLikedByCurrentUser(topic.posts[0])" (click)="onLikePost(topic.posts[0])" matTooltip="Like this post">
//                     <mat-icon>{{ isPostLikedByCurrentUser(topic.posts[0]) ? 'thumb_up' : 'thumb_up_outline' }}</mat-icon>
//                      <span>{{ topic.posts[0].likesCount ?? 0 }} {{ (topic.posts[0].likesCount ?? 0) === 1 ? 'Like' : 'Likes' }}</span>
//                 </button>
//                  <button mat-stroked-button class="action-btn reply-btn" (click)="onReplyToPost(topic.posts[0])" matTooltip="Reply to this post">
//                     <mat-icon>reply</mat-icon><span>Reply</span>
//                 </button>
//             </div>
//             </div>
//         </ng-container>

//          <ng-container *ngFor="let post of topic.posts.slice(1); let i = index">
//              <div class="post-card">
//                  <div class="post-actions">
//                     <button mat-stroked-button class="action-btn" [class.liked]="isPostLikedByCurrentUser(post)" (click)="onLikePost(post)" matTooltip="Like this reply">
//                        <mat-icon>{{ isPostLikedByCurrentUser(post) ? 'thumb_up' : 'thumb_up_outline' }}</mat-icon>
//                         <span>{{ post.likesCount ?? 0 }} {{ (post.likesCount ?? 0) === 1 ? 'Like' : 'Likes' }}</span>
//                    </button>
//                     <button mat-stroked-button class="action-btn reply-btn" (click)="onReplyToPost(post)" matTooltip="Reply to this comment">
//                        <mat-icon>reply</mat-icon><span>Reply</span>
//                    </button>
//                </div>
//                 </div>
//         </ng-container>
//       </div>

//        <div class="reply-form">
//          <textarea class="reply-textarea" placeholder="Share your thoughts, ask questions, or provide feedback..." rows="5" [(ngModel)]="replyContent"></textarea>
//          <div class="reply-form-actions">
//             <button mat-button (click)="replyContent = ''" [disabled]="!replyContent.trim()"><mat-icon>close</mat-icon>Cancel</button>
//             <button mat-raised-button color="primary" class="post-btn" [disabled]="!replyContent.trim()" (click)="submitReplyToTopic()">
//                  <mat-icon>send</mat-icon>Post Reply
//             </button>
//          </div>
//        </div>
//     </div>

//      <ng-template #replyCardTemplate let-reply let-post="post">
//       <div class="reply-card">
//         <div class="reply-actions">
//           <button class="action-btn-reply" [class.liked]="isReplyLikedByCurrentUser(reply)" (click)="onLikeReply(reply)" matTooltip="Like this reply">
//             <mat-icon>thumb_up</mat-icon>
//              <span *ngIf="(reply.likesCount ?? 0) > 0">{{ reply.likesCount }}</span>
//              <span>Like{{ (reply.likesCount ?? 0) !== 1 ? 's' : '' }}</span>
//           </button>
//           <button class="action-btn-reply reply" (click)="onReplyToReply(post, reply)" matTooltip="Reply to this comment">
//             <mat-icon>reply</mat-icon>
//              <span>Reply</span>
//           </button>
//         </div>
//       </div>
//     </ng-template>
//   `,
//   styles: [`
//     .topic-detail {
//       max-width: 100%;
//     }

//     .back-btn {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       padding: 0.625rem 1.125rem;
//       border: none;
//       background: white;
//       color: #6b7280;
//       border-radius: 0.5rem;
//       font-size: 0.9375rem;
//       font-weight: 500;
//       cursor: pointer;
//       margin-bottom: 1.5rem;
//       transition: all 0.2s;
//       box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
//     }

//     .back-btn:hover {
//       background: #f3f4f6;
//       color: #1f2937;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//     }

//     .back-btn mat-icon {
//       font-size: 20px;
//       width: 20px;
//       height: 20px;
//     }

//     .topic-header-inline {
//       padding-bottom: 1.5rem;
//       margin-bottom: 1.5rem;
//       border-bottom: 2px solid #e5e7eb;
//     }

//     .header-top {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       gap: 1rem;
//       margin-bottom: 1rem;
//     }

//     .topic-badges {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       flex-wrap: wrap;
//     }

//     .topic-stats {
//       display: flex;
//       gap: 1rem;
//       align-items: center;
//     }

//     .stat-item {
//       display: flex;
//       align-items: center;
//       gap: 0.375rem;
//       color: #6b7280;
//       font-size: 0.875rem;
//       font-weight: 600;
//     }

//     .stat-item mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     .category-badge {
//       display: flex;
//       align-items: center;
//       gap: 0.25rem;
//       padding: 0.375rem 0.75rem;
//       border-radius: 0.5rem;
//       font-size: 0.8125rem;
//       font-weight: 600;
//       background: #eff6ff;
//       color: #2563eb;
//     }

//     .category-badge[data-category="Tax & Legal"] {
//       background: #fef3c7;
//       color: #d97706;
//     }

//     .category-badge[data-category="Business Growth"] {
//       background: #d1fae5;
//       color: #059669;
//     }

//     .category-badge[data-category="Success Stories"] {
//       background: #fce7f3;
//       color: #db2777;
//     }

//     .category-badge[data-category="LLC Formation"] {
//       background: #ede9fe;
//       color: #7c3aed;
//     }

//     .pinned-badge {
//       display: flex;
//       align-items: center;
//       gap: 0.375rem;
//       padding: 0.375rem 0.75rem;
//       border-radius: 0.5rem;
//       font-size: 0.8125rem;
//       font-weight: 600;
//       background: #fef3c7;
//       color: #d97706;
//     }

//     .pinned-badge mat-icon {
//       font-size: 16px;
//       width: 16px;
//       height: 16px;
//     }

//     .topic-title {
//       font-size: 1.75rem;
//       font-weight: 700;
//       color: #111827;
//       margin: 0 0 0.875rem 0;
//       line-height: 1.3;
//     }

//     .topic-footer {
//       display: flex;
//       align-items: center;
//       gap: 0.375rem;
//       color: #6b7280;
//       font-size: 0.875rem;
//     }

//     .topic-footer mat-icon {
//       font-size: 16px;
//       width: 16px;
//       height: 16px;
//     }

//     .posts-container {
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//       margin-bottom: 1.5rem;
//     }

//     .post-card {
//       background: white;
//       border: 1px solid #e5e7eb;
//       border-radius: 0.75rem;
//       padding: 1.5rem;
//       transition: all 0.2s;
//       box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
//     }

//     .post-card:hover {
//       box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
//     }

//     .post-card.main-post {
//       border-color: #2563eb;
//       border-width: 2px;
//       background: linear-gradient(to bottom, #eff6ff, white);
//     }

//     .post-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       margin-bottom: 1rem;
//       gap: 1rem;
//     }

//     .author-info {
//       display: flex;
//       align-items: center;
//       gap: 0.75rem;
//     }

//     .avatar {
//       width: 2.75rem;
//       height: 2.75rem;
//       border-radius: 9999px;
//       background: #e5e7eb;
//       border: 2px solid white;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//     }

//     .avatar-small {
//       width: 2rem;
//       height: 2rem;
//       border-radius: 9999px;
//       background: #e5e7eb;
//       border: 2px solid white;
//       box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
//     }

//     .author-details {
//       display: flex;
//       flex-direction: column;
//       gap: 0.125rem;
//     }

//     .author-name {
//       font-weight: 600;
//       color: #111827;
//       font-size: 0.9375rem;
//     }

//     .post-time {
//       display: flex;
//       align-items: center;
//       gap: 0.25rem;
//       font-size: 0.8125rem;
//       color: #9ca3af;
//     }

//     .time-icon {
//       font-size: 14px !important;
//       width: 14px !important;
//       height: 14px !important;
//     }

//     .author-badge {
//       display: flex;
//       align-items: center;
//       gap: 0.375rem;
//       padding: 0.375rem 0.75rem;
//       border-radius: 0.5rem;
//       font-size: 0.8125rem;
//       font-weight: 600;
//       background: #dbeafe;
//       color: #2563eb;
//       white-space: nowrap;
//     }

//     .author-badge mat-icon {
//       font-size: 16px;
//       width: 16px;
//       height: 16px;
//     }

//     .post-content {
//       color: #374151;
//       line-height: 1.7;
//       font-size: 0.9375rem;
//       margin-bottom: 1.25rem;
//       white-space: pre-wrap;
//     }

//     .post-actions {
//       display: flex;
//       gap: 0.75rem;
//       padding-top: 1rem;
//       border-top: 1px solid #f3f4f6;
//     }

//     .action-btn {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       padding: 0.5rem 1rem !important;
//       border-radius: 0.5rem !important;
//       font-weight: 500 !important;
//       font-size: 0.875rem !important;
//       transition: all 0.2s;
//       border-color: #e5e7eb !important;
//       color: #6b7280 !important;
//     }

//     .action-btn:hover:not(.liked) {
//       background: #f9fafb !important;
//       border-color: #d1d5db !important;
//       color: #374151 !important;
//     }

//     .action-btn.liked {
//       background: #dbeafe !important;
//       border-color: #93c5fd !important;
//       color: #2563eb !important;
//     }

//     .action-btn mat-icon {
//       font-size: 20px;
//       width: 20px;
//       height: 20px;
//     }

//     .reply-btn {
//       color: #059669 !important;
//     }

//     .reply-btn:hover {
//       background: #d1fae5 !important;
//       border-color: #6ee7b7 !important;
//       color: #047857 !important;
//     }

//     .replies-section {
//       margin-top: 1.5rem;
//       padding-left: 2.5rem;
//       border-left: 3px solid #e5e7eb;
//     }

//     .replies-section.flat {
//       margin-top: 0;
//       padding-left: 0;
//       border-left: none;
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//     }

//     .replies-header {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       margin-bottom: 0.75rem;
//       color: #6b7280;
//       font-size: 0.875rem;
//       font-weight: 600;
//     }

//     .replies-header mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     .reply-card {
//       background: white;
//       border: 1px solid #e5e7eb;
//       border-radius: 0.625rem;
//       padding: 1.25rem;
//       transition: all 0.2s;
//       display: flex;
//       flex-direction: column;
//       gap: 0.75rem;
//     }

//     .replies-section.flat .reply-card {
//         margin-bottom: 0;
//     }

//     .replies-section:not(.flat) .reply-card {
//       background: #f9fafb;
//     }

//     .reply-card:hover {
//       border-color: #d1d5db;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
//     }

//     .reply-content {
//       color: #374151;
//       line-height: 1.6;
//       font-size: 0.9375rem;
//       white-space: pre-wrap;
//       margin: 0;
//       padding: 0;
//     }

//     .reply-actions {
//       display: flex;
//       gap: 0.5rem;
//       padding: 0;
//       margin-top: 0.5rem;
//     }

//     .action-btn-reply {
//       display: inline-flex;
//       align-items: center;
//       gap: 0.5rem;
//       padding: 0.375rem 0.875rem;
//       border-radius: 0.375rem;
//       font-size: 0.875rem;
//       font-weight: 500;
//       cursor: pointer;
//       border: 1px solid #d1d5db;
//       background-color: transparent;
//       color: #6b7280;
//       transition: all 0.2s;
//     }

//     .action-btn-reply:hover {
//       background-color: #f3f4f6;
//     }

//     .action-btn-reply mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     .action-btn-reply.liked {
//       background-color: #e0eaff;
//       color: #3b82f6;
//       border-color: transparent;
//     }

//     .action-btn-reply.liked:hover {
//       background-color: #d1e0ff;
//     }

//     .reply-form {
//       background: white;
//       border: 2px solid #e5e7eb;
//       border-radius: 0.875rem;
//       padding: 1.75rem;
//       box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
//     }

//     .reply-form-header {
//       display: flex;
//       align-items: center;
//       gap: 0.75rem;
//       margin-bottom: 1.25rem;
//     }

//     .reply-form-header mat-icon {
//       color: #2563eb;
//       font-size: 28px;
//       width: 28px;
//       height: 28px;
//     }

//     .reply-form-title {
//       font-size: 1.25rem;
//       font-weight: 700;
//       color: #111827;
//       margin: 0;
//     }

//     .current-user-info {
//       display: flex;
//       align-items: center;
//       gap: 0.625rem;
//       margin-bottom: 1rem;
//       padding: 0.75rem;
//       background: #f9fafb;
//       border-radius: 0.5rem;
//     }

//     .user-name {
//       font-size: 0.875rem;
//       font-weight: 500;
//       color: #6b7280;
//     }

//     .reply-textarea {
//       width: 100%;
//       padding: 1rem;
//       border: 2px solid #e5e7eb;
//       border-radius: 0.625rem;
//       font-size: 0.9375rem;
//       font-family: inherit;
//       line-height: 1.6;
//       resize: vertical;
//       transition: all 0.2s;
//       min-height: 120px;
//     }

//     .reply-textarea:focus {
//       outline: none;
//       border-color: #2563eb;
//       box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
//     }

//     .reply-textarea::placeholder {
//       color: #9ca3af;
//     }

//     .reply-form-actions {
//       display: flex;
//       justify-content: flex-end;
//       gap: 0.75rem;
//       margin-top: 1rem;
//     }

//     .reply-form-actions button {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       font-weight: 600 !important;
//     }

//     .reply-form-actions button mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     .post-btn {
//       background: #2563eb !important;
//       color: white !important;
//       padding: 0.625rem 1.5rem !important;
//     }

//     .post-btn:hover:not(:disabled) {
//       background: #1d4ed8 !important;
//       box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);
//     }

//     .post-btn:disabled {
//       opacity: 0.5;
//     }

//     @media (max-width: 768px) {
//       .topic-header-inline { padding-bottom: 1.25rem; margin-bottom: 1.25rem; }
//       .header-top { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
//       .topic-title { font-size: 1.5rem; }
//       .post-card { padding: 1.375rem; }
//       .reply-form { padding: 1.5rem; }
//       .post-actions { flex-wrap: wrap; }
//     }

//     @media (max-width: 640px) {
//       .back-btn { width: 100%; justify-content: center; margin-bottom: 1rem; }
//       .topic-header-inline { padding-bottom: 1rem; margin-bottom: 1rem; }
//       .topic-title { font-size: 1.25rem; }
//       .topic-stats { gap: 0.75rem; }
//       .stat-item { font-size: 0.8125rem; }
//       .post-card { padding: 1rem; }
//       .post-header { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
//       .author-badge { align-self: flex-start; }
//       .post-content { font-size: 0.875rem; }
//       .post-actions { gap: 0.5rem; }
//       .action-btn { font-size: 0.8125rem !important; padding: 0.5rem 0.875rem !important; }
//       .replies-section { padding-left: 0.75rem; border-left-width: 2px; margin-top: 1rem; }
//       .reply-card { padding: 0.875rem; }
//       .reply-content { padding-left: 0; font-size: 0.875rem;}
//       .reply-actions { padding-left: 0; }
//       .reply-form { padding: 1rem; }
//       .reply-form-header mat-icon { font-size: 24px; width: 24px; height: 24px; }
//       .reply-form-title { font-size: 1.125rem; }
//       .reply-textarea { font-size: 0.875rem; min-height: 100px; }
//       .reply-form-actions { flex-wrap: wrap; }
//       .reply-form-actions button { flex: 1; min-width: 120px; }
//     }
// //   `]

// })
// export class TopicDetailComponent implements OnInit, OnChanges, OnDestroy {
//   @Input() topicId: string | null = null;
//   @Output() back = new EventEmitter<void>();

//   topic: TopicDetail | null = null;
//   replyContent = '';
//   currentUser: User;
//   isLoading = false;
//   error: string | null = null;

//   private topicSubscription: Subscription | null = null;

//   constructor(
//     private forumService: ForumService,
//     private userService: UserService,
//     private dialog: MatDialog
//   ) {
//     this.currentUser = this.forumService.getCurrentUser();
    
//   }

//   ngOnInit(): void {
//     if (this.topicId) {
//       this.fetchTopicDetails(this.topicId);
//     }
//   }
  
//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['topicId'] && !changes['topicId'].firstChange && this.topicId) {
//        this.fetchTopicDetails(this.topicId);
//     }
//   }

//   ngOnDestroy(): void {
//     this.topicSubscription?.unsubscribe();
//   }

//   fetchTopicDetails(id: string): void {
//     this.isLoading = true;
//     this.error = null;
//     this.topicSubscription = this.forumService.getTopicById(id).subscribe({
//       next: (topicDetail) => {
//         this.topic = topicDetail;
//         this.isLoading = false;
//       },
//       error: (err) => {
//         console.error('Error fetching topic details:', err);
//         this.error = 'Failed to load topic details.';
//         this.isLoading = false;
//       }
//     });
//   }

//   onBack(): void {
//     this.back.emit();
//   }

//   submitReplyToTopic(): void {
//     if (this.replyContent.trim() && this.topic && this.topic.posts.length > 0) {
//       const mainPostId = this.topic.posts[0].postId;

//       this.forumService.addReplyToPost(mainPostId, this.replyContent)
//           .subscribe({
//             next: () => {
//                 this.replyContent = '';
//             },
//             error: (err) => console.error('Error submitting reply:', err)
//           });
//     }
//   }

//   onLikePost(post: Post): void {
//   this.forumService.toggleLike({ postId: post.postId, replyId: null, like: true }).subscribe({
//     error: (err) => {
//       console.error('Error toggling post like:', err);
//     }
//   });
// }

// onLikeReply(reply: Reply): void {
//   this.forumService.toggleLike({ postId: null, replyId: reply.replyId, like: true }).subscribe({
//     error: (err) => {
//       console.error('Error toggling reply like:', err);
//     }
//   });
// }


//   onReplyToPost(postToReplyTo: Post): void {
//        this.openReplyDialog(postToReplyTo, null);
//   }

//   onReplyToReply(parentPost: Post, replyToReplyTo: Reply): void {
//        this.openReplyDialog(parentPost, replyToReplyTo);
//   }

//   private openReplyDialog(parentPost: Post, parentReply: Reply | null): void {
//        const dialogRef = this.dialog.open(ReplyDialogComponent, {
//            width: '600px',
//            maxWidth: '90vw',
//            data: {
//                post: parentPost,
//                replyingTo: parentReply,
//                currentUser: this.currentUser
//            } as ReplyDialogData
//        });

//        dialogRef.afterClosed().subscribe(result => {
//            if (result && typeof result === 'string' && this.topic) { 
//                const content = result;
//                if (parentReply) {
//                    this.forumService.addNestedReply(parentPost.postId, parentReply.replyId, content)
//                        .subscribe({
//                            error: (err) => console.error('Error adding nested reply:', err)
//                        });
//                } else {
//                    this.forumService.addReplyToPost(parentPost.postId, content)
//                       .subscribe({
//                            error: (err) => console.error('Error adding direct reply:', err)
//                        });
//                }
//            }
//        });
//    }

//   isPostLikedByCurrentUser(post: Post): boolean {
//     return post.likes?.includes(this.currentUser.id) ?? false;
//   }

//   isReplyLikedByCurrentUser(reply: Reply): boolean {
//     return reply.likes?.includes(this.currentUser.id) ?? false;
//   }

//   getTimeAgo(dateInput: Date | string | undefined): string {
//      if (!dateInput) return '';
//     const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
//      if (isNaN(date.getTime())) return ''; 

//     const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

//     if (seconds < 60) return 'just now';
//     const minutes = Math.floor(seconds / 60);
//     if (minutes < 60) return `${minutes}m ago`;
//     const hours = Math.floor(minutes / 60);
//     if (hours < 24) return `${hours}h ago`;
//     const days = Math.floor(hours / 24);
//      if (days < 7) return `${days}d ago`;
//     const weeks = Math.floor(days / 7);
//     return `${weeks}w ago`;
//   }
// }

// // src/app/pages/apps/conversational_forum/topic-detail/topic-detail.component.ts
// import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { TopicDetail, Post, Reply, User } from 'src/app/models/forum.model';
// import { ForumService } from 'src/app/services/forum.service';
// import { UserService } from 'src/app/shared/userService';
// import { ReplyDialogComponent, ReplyDialogData } from '../reply-dialog.component';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-topic-detail',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatButtonModule,
//     MatIconModule,
//     MatDialogModule,
//     MatTooltipModule
//   ],
//   template: `
//     <ng-template #replyCardTemplate let-reply let-post="post">
//       <div class="reply-card">
//         <div class="author-info">
//           <img [src]="reply.author.avatar" [alt]="reply.author.name" class="avatar-small">
//           <div class="author-details">
//             <div class="author-name">{{ reply.author.name }}</div>
//             <div class="post-time">{{ getTimeAgo(reply.createdAt) }}</div>
//           </div>
//         </div>

//         <div class="reply-content">{{ reply.content }}</div>

//         <div class="reply-actions">
//           <button
//             class="action-btn-reply"
//             [class.liked]="isReplyLiked(reply)"
//             (click)="onLikeReply(post, reply)"
//             [matTooltip]="isReplyLiked(reply) ? 'Unlike' : 'Like'"
//           >
//             <mat-icon>thumb_up</mat-icon>
//             <span *ngIf="reply.likes.length > 0">{{ reply.likes.length }}</span>
//             <span>Like{{ reply.likes.length !== 1 ? 's' : '' }}</span>
//           </button>
//           <button
//             class="action-btn-reply reply"
//             (click)="onReplyToPost(post)"
//             matTooltip="Reply to this post"
//           >
//             <mat-icon>reply</mat-icon>
//             <span>Reply</span>
//           </button>
//         </div>
//       </div>
//     </ng-template>

//     <div class="topic-detail" *ngIf="topic">
//       <button class="back-btn" (click)="onBack()">
//         <mat-icon>arrow_back</mat-icon>
//         <span>Back to topics</span>
//       </button>

//       <div class="posts-container">
//         <ng-container *ngFor="let post of topic.posts; let i = index">
//           <div class="post-card" [class.main-post]="i === 0">
//             <div *ngIf="i === 0" class="topic-header-inline">
//               <div class="header-top">
//                 <div class="topic-badges">
//                   <span class="category-badge" [attr.data-category]="topic.category">
//                     {{ topic.category }}
//                   </span>
//                   <span *ngIf="topic.isPinned" class="pinned-badge">
//                     <mat-icon>push_pin</mat-icon>
//                     Pinned
//                   </span>
//                 </div>

//                 <div class="topic-stats">
//                   <div class="stat-item">
//                     <mat-icon>forum</mat-icon>
//                     <span>{{ topic.replyCount }}</span>
//                   </div>
//                   <div class="stat-item">
//                     <mat-icon>visibility</mat-icon>
//                     <span>{{ topic.viewCount }}</span>
//                   </div>
//                 </div>
//               </div>

//               <h1 class="topic-title">{{ topic.title }}</h1>

//               <div class="topic-footer">
//                 <mat-icon>schedule</mat-icon>
//                 <span>Last activity {{ getTimeAgo(topic.lastActivity) }}</span>
//               </div>
//             </div>
//             <div class="post-header">
//               <div class="author-info">
//                 <img [src]="post.author.avatar" [alt]="post.author.name" class="avatar">
//                 <div class="author-details">
//                   <div class="author-name">{{ post.author.name }}</div>
//                   <div class="post-time">
//                     <mat-icon class="time-icon">schedule</mat-icon>
//                     {{ getTimeAgo(post.createdAt) }}
//                   </div>
//                 </div>
//               </div>
//               <span *ngIf="i === 0" class="author-badge">
//                 <mat-icon>person</mat-icon>
//                 Topic Starter
//               </span>
//             </div>

//             <div class="post-content">{{ post.content }}</div>

//             <div class="post-actions">
//               <button
//                 mat-stroked-button
//                 class="action-btn"
//                 [class.liked]="isLiked(post)"
//                 (click)="onLikePost(post)"
//                 [matTooltip]="isLiked(post) ? 'Unlike' : 'Like this post'"
//               >
//                 <mat-icon>{{ isLiked(post) ? 'thumb_up' : 'thumb_up_outline' }}</mat-icon>
//                 <span>{{ post.likes.length > 0 ? post.likes.length : '' }} {{ post.likes.length === 1 ? 'Like' : (post.likes.length > 1 ? 'Likes' : 'Like') }}</span>
//               </button>
//               <button
//                 mat-stroked-button
//                 class="action-btn reply-btn"
//                 (click)="onReplyToPost(post)"
//                 matTooltip="Reply to this post"
//               >
//                 <mat-icon>reply</mat-icon>
//                 <span>Reply</span>
//               </button>
//             </div>

//             <div *ngIf="post.replies.length > 0" class="replies-section" [class.flat]="i === 0">
//               <div class="replies-header">
//                 <mat-icon>{{ i === 0 ? 'forum' : 'subdirectory_arrow_right' }}</mat-icon>
//                 <span>{{ post.replies.length }} {{ post.replies.length === 1 ? 'Reply' : 'Replies' }}</span>
//               </div>
//               <ng-container *ngFor="let reply of post.replies">
//                 <ng-container
//                   *ngTemplateOutlet="replyCardTemplate; context: {$implicit: reply, post: post}">
//                 </ng-container>
//               </ng-container>
//             </div>
//           </div>
//         </ng-container>
//       </div>

//       <div class="reply-form">
//         <div class="reply-form-header">
//           <mat-icon>rate_review</mat-icon>
//           <h3 class="reply-form-title">Join the discussion</h3>
//         </div>
//         <div class="current-user-info">
//           <img [src]="currentUser.avatar" [alt]="currentUser.name" class="avatar-small">
//           <span class="user-name">Posting as {{ currentUser.name }}</span>
//         </div>
//         <textarea
//           class="reply-textarea"
//           placeholder="Share your thoughts, ask questions, or provide feedback..."
//           rows="5"
//           [(ngModel)]="replyContent"
//         ></textarea>
//         <div class="reply-form-actions">
//           <button
//             mat-button
//             (click)="replyContent = ''"
//             [disabled]="!replyContent.trim()"
//           >
//             <mat-icon>close</mat-icon>
//             Cancel
//           </button>
//           <button
//             mat-raised-button
//             color="primary"
//             class="post-btn"
//             [disabled]="!replyContent.trim()"
//             (click)="submitReply()"
//           >
//             <mat-icon>send</mat-icon>
//             Post Reply
//           </button>
//         </div>
//       </div>
//     </div>
//   `,
//   styles: [`
//     .topic-detail {
//       max-width: 100%;
//     }

//     .back-btn {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       padding: 0.625rem 1.125rem;
//       border: none;
//       background: white;
//       color: #6b7280;
//       border-radius: 0.5rem;
//       font-size: 0.9375rem;
//       font-weight: 500;
//       cursor: pointer;
//       margin-bottom: 1.5rem;
//       transition: all 0.2s;
//       box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
//     }

//     .back-btn:hover {
//       background: #f3f4f6;
//       color: #1f2937;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//     }

//     .back-btn mat-icon {
//       font-size: 20px;
//       width: 20px;
//       height: 20px;
//     }

//     .topic-header-inline {
//       padding-bottom: 1.5rem;
//       margin-bottom: 1.5rem;
//       border-bottom: 2px solid #e5e7eb;
//     }

//     .header-top {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       gap: 1rem;
//       margin-bottom: 1rem;
//     }

//     .topic-badges {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       flex-wrap: wrap;
//     }

//     .topic-stats {
//       display: flex;
//       gap: 1rem;
//       align-items: center;
//     }

//     .stat-item {
//       display: flex;
//       align-items: center;
//       gap: 0.375rem;
//       color: #6b7280;
//       font-size: 0.875rem;
//       font-weight: 600;
//     }

//     .stat-item mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     .category-badge {
//       display: flex;
//       align-items: center;
//       gap: 0.25rem;
//       padding: 0.375rem 0.75rem;
//       border-radius: 0.5rem;
//       font-size: 0.8125rem;
//       font-weight: 600;
//       background: #eff6ff;
//       color: #2563eb;
//     }

//     .category-badge[data-category="Tax & Legal"] {
//       background: #fef3c7;
//       color: #d97706;
//     }

//     .category-badge[data-category="Business Growth"] {
//       background: #d1fae5;
//       color: #059669;
//     }

//     .category-badge[data-category="Success Stories"] {
//       background: #fce7f3;
//       color: #db2777;
//     }

//     .category-badge[data-category="LLC Formation"] {
//       background: #ede9fe;
//       color: #7c3aed;
//     }

//     .pinned-badge {
//       display: flex;
//       align-items: center;
//       gap: 0.375rem;
//       padding: 0.375rem 0.75rem;
//       border-radius: 0.5rem;
//       font-size: 0.8125rem;
//       font-weight: 600;
//       background: #fef3c7;
//       color: #d97706;
//     }

//     .pinned-badge mat-icon {
//       font-size: 16px;
//       width: 16px;
//       height: 16px;
//     }

//     .topic-title {
//       font-size: 1.75rem;
//       font-weight: 700;
//       color: #111827;
//       margin: 0 0 0.875rem 0;
//       line-height: 1.3;
//     }

//     .topic-footer {
//       display: flex;
//       align-items: center;
//       gap: 0.375rem;
//       color: #6b7280;
//       font-size: 0.875rem;
//     }

//     .topic-footer mat-icon {
//       font-size: 16px;
//       width: 16px;
//       height: 16px;
//     }

//     .posts-container {
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//       margin-bottom: 1.5rem;
//     }

//     .post-card {
//       background: white;
//       border: 1px solid #e5e7eb;
//       border-radius: 0.75rem;
//       padding: 1.5rem;
//       transition: all 0.2s;
//       box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
//     }

//     .post-card:hover {
//       box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
//     }

//     .post-card.main-post {
//       border-color: #2563eb;
//       border-width: 2px;
//       background: linear-gradient(to bottom, #eff6ff, white);
//     }

//     .post-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       margin-bottom: 1rem;
//       gap: 1rem;
//     }

//     .author-info {
//       display: flex;
//       align-items: center;
//       gap: 0.75rem;
//     }

//     .avatar {
//       width: 2.75rem;
//       height: 2.75rem;
//       border-radius: 9999px;
//       background: #e5e7eb;
//       border: 2px solid white;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//     }

//     .avatar-small {
//       width: 2rem;
//       height: 2rem;
//       border-radius: 9999px;
//       background: #e5e7eb;
//       border: 2px solid white;
//       box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
//     }

//     .author-details {
//       display: flex;
//       flex-direction: column;
//       gap: 0.125rem;
//     }

//     .author-name {
//       font-weight: 600;
//       color: #111827;
//       font-size: 0.9375rem;
//     }

//     .post-time {
//       display: flex;
//       align-items: center;
//       gap: 0.25rem;
//       font-size: 0.8125rem;
//       color: #9ca3af;
//     }

//     .time-icon {
//       font-size: 14px !important;
//       width: 14px !important;
//       height: 14px !important;
//     }

//     .author-badge {
//       display: flex;
//       align-items: center;
//       gap: 0.375rem;
//       padding: 0.375rem 0.75rem;
//       border-radius: 0.5rem;
//       font-size: 0.8125rem;
//       font-weight: 600;
//       background: #dbeafe;
//       color: #2563eb;
//       white-space: nowrap;
//     }

//     .author-badge mat-icon {
//       font-size: 16px;
//       width: 16px;
//       height: 16px;
//     }

//     .post-content {
//       color: #374151;
//       line-height: 1.7;
//       font-size: 0.9375rem;
//       margin-bottom: 1.25rem;
//       white-space: pre-wrap;
//     }

//     .post-actions {
//       display: flex;
//       gap: 0.75rem;
//       padding-top: 1rem;
//       border-top: 1px solid #f3f4f6;
//     }

//     .action-btn {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       padding: 0.5rem 1rem !important;
//       border-radius: 0.5rem !important;
//       font-weight: 500 !important;
//       font-size: 0.875rem !important;
//       transition: all 0.2s;
//       border-color: #e5e7eb !important;
//       color: #6b7280 !important;
//     }

//     .action-btn:hover:not(.liked) {
//       background: #f9fafb !important;
//       border-color: #d1d5db !important;
//       color: #374151 !important;
//     }

//     .action-btn.liked {
//       background: #dbeafe !important;
//       border-color: #93c5fd !important;
//       color: #2563eb !important;
//     }

//     .action-btn mat-icon {
//       font-size: 20px;
//       width: 20px;
//       height: 20px;
//     }

//     .reply-btn {
//       color: #059669 !important;
//     }

//     .reply-btn:hover {
//       background: #d1fae5 !important;
//       border-color: #6ee7b7 !important;
//       color: #047857 !important;
//     }

//     .replies-section {
//       margin-top: 1.5rem;
//       padding-left: 2.5rem;
//       border-left: 3px solid #e5e7eb;
//     }

//     .replies-section.flat {
//       margin-top: 0;
//       padding-left: 0;
//       border-left: none;
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//     }

//     .replies-header {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       margin-bottom: 0.75rem;
//       color: #6b7280;
//       font-size: 0.875rem;
//       font-weight: 600;
//     }

//     .replies-header mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     .reply-card {
//       background: white;
//       border: 1px solid #e5e7eb;
//       border-radius: 0.625rem;
//       padding: 1.25rem;
//       transition: all 0.2s;
//       display: flex;
//       flex-direction: column;
//       gap: 0.75rem;
//     }

//     .replies-section.flat .reply-card {
//         margin-bottom: 0;
//     }

//     .replies-section:not(.flat) .reply-card {
//       background: #f9fafb;
//     }

//     .reply-card:hover {
//       border-color: #d1d5db;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
//     }

//     .reply-content {
//       color: #374151;
//       line-height: 1.6;
//       font-size: 0.9375rem;
//       white-space: pre-wrap;
//       margin: 0;
//       padding: 0;
//     }

//     .reply-actions {
//       display: flex;
//       gap: 0.5rem;
//       padding: 0;
//       margin-top: 0.5rem;
//     }

//     .action-btn-reply {
//       display: inline-flex;
//       align-items: center;
//       gap: 0.5rem;
//       padding: 0.375rem 0.875rem;
//       border-radius: 0.375rem;
//       font-size: 0.875rem;
//       font-weight: 500;
//       cursor: pointer;
//       border: 1px solid #d1d5db;
//       background-color: transparent;
//       color: #6b7280;
//       transition: all 0.2s;
//     }

//     .action-btn-reply:hover {
//       background-color: #f3f4f6;
//     }

//     .action-btn-reply mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     .action-btn-reply.liked {
//       background-color: #e0eaff;
//       color: #3b82f6;
//       border-color: transparent;
//     }

//     .action-btn-reply.liked:hover {
//       background-color: #d1e0ff;
//     }

//     .reply-form {
//       background: white;
//       border: 2px solid #e5e7eb;
//       border-radius: 0.875rem;
//       padding: 1.75rem;
//       box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
//     }

//     .reply-form-header {
//       display: flex;
//       align-items: center;
//       gap: 0.75rem;
//       margin-bottom: 1.25rem;
//     }

//     .reply-form-header mat-icon {
//       color: #2563eb;
//       font-size: 28px;
//       width: 28px;
//       height: 28px;
//     }

//     .reply-form-title {
//       font-size: 1.25rem;
//       font-weight: 700;
//       color: #111827;
//       margin: 0;
//     }

//     .current-user-info {
//       display: flex;
//       align-items: center;
//       gap: 0.625rem;
//       margin-bottom: 1rem;
//       padding: 0.75rem;
//       background: #f9fafb;
//       border-radius: 0.5rem;
//     }

//     .user-name {
//       font-size: 0.875rem;
//       font-weight: 500;
//       color: #6b7280;
//     }

//     .reply-textarea {
//       width: 100%;
//       padding: 1rem;
//       border: 2px solid #e5e7eb;
//       border-radius: 0.625rem;
//       font-size: 0.9375rem;
//       font-family: inherit;
//       line-height: 1.6;
//       resize: vertical;
//       transition: all 0.2s;
//       min-height: 120px;
//     }

//     .reply-textarea:focus {
//       outline: none;
//       border-color: #2563eb;
//       box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
//     }

//     .reply-textarea::placeholder {
//       color: #9ca3af;
//     }

//     .reply-form-actions {
//       display: flex;
//       justify-content: flex-end;
//       gap: 0.75rem;
//       margin-top: 1rem;
//     }

//     .reply-form-actions button {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       font-weight: 600 !important;
//     }

//     .reply-form-actions button mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     .post-btn {
//       background: #2563eb !important;
//       color: white !important;
//       padding: 0.625rem 1.5rem !important;
//     }

//     .post-btn:hover:not(:disabled) {
//       background: #1d4ed8 !important;
//       box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);
//     }

//     .post-btn:disabled {
//       opacity: 0.5;
//     }

//     @media (max-width: 768px) {
//       .topic-header-inline { padding-bottom: 1.25rem; margin-bottom: 1.25rem; }
//       .header-top { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
//       .topic-title { font-size: 1.5rem; }
//       .post-card { padding: 1.375rem; }
//       .reply-form { padding: 1.5rem; }
//       .post-actions { flex-wrap: wrap; }
//     }

//     @media (max-width: 640px) {
//       .back-btn { width: 100%; justify-content: center; margin-bottom: 1rem; }
//       .topic-header-inline { padding-bottom: 1rem; margin-bottom: 1rem; }
//       .topic-title { font-size: 1.25rem; }
//       .topic-stats { gap: 0.75rem; }
//       .stat-item { font-size: 0.8125rem; }
//       .post-card { padding: 1rem; }
//       .post-header { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
//       .author-badge { align-self: flex-start; }
//       .post-content { font-size: 0.875rem; }
//       .post-actions { gap: 0.5rem; }
//       .action-btn { font-size: 0.8125rem !important; padding: 0.5rem 0.875rem !important; }
//       .replies-section { padding-left: 0.75rem; border-left-width: 2px; margin-top: 1rem; }
//       .reply-card { padding: 0.875rem; }
//       .reply-content { padding-left: 0; font-size: 0.875rem;}
//       .reply-actions { padding-left: 0; }
//       .reply-form { padding: 1rem; }
//       .reply-form-header mat-icon { font-size: 24px; width: 24px; height: 24px; }
//       .reply-form-title { font-size: 1.125rem; }
//       .reply-textarea { font-size: 0.875rem; min-height: 100px; }
//       .reply-form-actions { flex-wrap: wrap; }
//       .reply-form-actions button { flex: 1; min-width: 120px; }
//     }
//   `]
// })
// export class TopicDetailComponent implements OnInit, OnChanges, OnDestroy {
//   @Input() topicId: string | null = null;
//   @Output() back = new EventEmitter<void>();

//   topic: TopicDetail | null = null;
//   replyContent = '';
//   // keep a safe default so templates and methods can use currentUser.id
//   currentUser: User ;
//   isLoading = false;
//   error: string | null = null;

//   private topicSubscription: Subscription | null = null;

//   constructor(
//     private forumService: ForumService,
//     private userService: UserService,
//     private dialog: MatDialog
//   ) {
//     // attempt to read synchronous user info if available
//     try {
//       const maybe = (this.userService as any).getCurrentUser?.();
//       // if userService returns an observable, subscribe; if returns object, use it
//       if (maybe && typeof maybe.subscribe === 'function') {
//         maybe.subscribe((u: User) => { if (u) this.currentUser = u; });
//       } else if (maybe) {
//         this.currentUser = maybe as User;
//       }
//     } catch {
//       // fallback left as default
//     }
//   }

//   ngOnInit(): void {
//     if (this.topicId) {
//       this.fetchTopicDetails(this.topicId);
//     }
//   }
  
//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['topicId'] && !changes['topicId'].firstChange && this.topicId) {
//        this.fetchTopicDetails(this.topicId);
//     }
//   }

//   ngOnDestroy(): void {
//     this.topicSubscription?.unsubscribe();
//   }

//   fetchTopicDetails(id: string): void {
//     this.isLoading = true;
//     this.error = null;
//     this.topicSubscription = this.forumService.getTopicById(id).subscribe({
//       next: (topicDetail) => {
//         this.topic = topicDetail;
//         this.isLoading = false;
//       },
//       error: (err) => {
//         console.error('Error fetching topic details:', err);
//         this.error = 'Failed to load topic details.';
//         this.isLoading = false;
//       }
//     });
//   }

//   onBack(): void {
//     this.back.emit();
//   }

//   submitReplyToTopic(): void {
//     if (this.replyContent.trim() && this.topic && this.topic.posts && this.topic.posts.length > 0) {
//       const mainPostId = this.topic.posts[0].postId;
//       this.forumService.addReplyToPost(mainPostId, this.replyContent)
//           .subscribe({
//             next: () => {
//                 this.replyContent = '';
//                 // optionally refresh topic detail
//                 if (this.topicId) this.fetchTopicDetails(this.topicId);
//             },
//             error: (err) => console.error('Error submitting reply:', err)
//           });
//     }
//   }

//   onLikePost(post: Post): void {
//     const payload = { postId: post.postId ?? null, replyId: null, like: true };
//     this.forumService.toggleLike(payload).subscribe({
//       next: () => {
//         // optimistic update (optional)
//         post.likesCount = (post.likesCount ?? 0) + 1;
//       },
//       error: (err) => {
//         console.error('Error toggling post like:', err);
//       }
//     });
//   }

//   onLikeReply(reply: Reply): void {
//     const payload = { postId: null, replyId: reply.replyId ?? null, like: true };
//     this.forumService.toggleLike(payload).subscribe({
//       next: () => {
//         reply.likesCount = (reply.likesCount ?? 0) + 1;
//       },
//       error: (err) => {
//         console.error('Error toggling reply like:', err);
//       }
//     });
//   }

//   onReplyToPost(postToReplyTo: Post): void {
//        this.openReplyDialog(postToReplyTo, null);
//   }

//   onReplyToReply(parentPost: Post, replyToReplyTo: Reply): void {
//        this.openReplyDialog(parentPost, replyToReplyTo);
//   }

//   private openReplyDialog(parentPost: Post, parentReply: Reply | null): void {
//        const dialogRef = this.dialog.open(ReplyDialogComponent, {
//            width: '600px',
//            maxWidth: '90vw',
//            data: {
//                post: parentPost,
//                replyingTo: parentReply,
//                currentUser: this.currentUser
//            } as ReplyDialogData
//        });

//        dialogRef.afterClosed().subscribe(result => {
//            if (result && typeof result === 'string' && this.topic) { 
//                const content = result;
//                if (parentReply) {
//                    this.forumService.addNestedReply(parentPost.postId, parentReply.replyId, content)
//                        .subscribe({
//                            next: () => { if (this.topicId) this.fetchTopicDetails(this.topicId); },
//                            error: (err) => console.error('Error adding nested reply:', err)
//                        });
//                } else {
//                    this.forumService.addReplyToPost(parentPost.postId, content)
//                       .subscribe({
//                            next: () => { if (this.topicId) this.fetchTopicDetails(this.topicId); },
//                            error: (err) => console.error('Error adding direct reply:', err)
//                        });
//                }
//            }
//        });
//    }

//   isPostLikedByCurrentUser(post: Post): boolean {
//     return (post.likes ?? []).includes(this.currentUser.id);
//   }

//   isReplyLikedByCurrentUser(reply: Reply): boolean {
//     return (reply.likes ?? []).includes(this.currentUser.id);
//   }

//   getTimeAgo(dateInput: Date | string | undefined): string {
//      if (!dateInput) return '';
//     const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
//      if (isNaN(date.getTime())) return ''; 

//     const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

//     if (seconds < 60) return 'just now';
//     const minutes = Math.floor(seconds / 60);
//     if (minutes < 60) return `${minutes}m ago`;
//     const hours = Math.floor(minutes / 60);
//     if (hours < 24) return `${hours}h ago`;
//     const days = Math.floor(hours / 24);
//      if (days < 7) return `${days}d ago`;
//     const weeks = Math.floor(days / 7);
//     return `${weeks}w ago`;
//   }
// }

// /src/app/pages/apps/conversational_forum/topic-detail/topic-detail.component.ts
// import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { MatTooltipModule } from '@angular/material/tooltip';
// // NOTE: Assuming your TopicDetail, Post, Reply models have the necessary properties (category, isPinned, etc.)
// import { TopicDetail, Post, Reply, User } from 'src/app/models/forum.model';
// import { ForumService } from 'src/app/services/forum.service';
// import { UserService } from 'src/app/shared/userService';
// import { ReplyDialogComponent, ReplyDialogData } from '../reply-dialog.component';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-topic-detail',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatButtonModule,
//     MatIconModule,
//     MatDialogModule,
//     MatTooltipModule
//   ],
//   template: `
//     <ng-template #replyCardTemplate let-reply let-post="post">
//       <div class="reply-card">
//         <div class="author-info">
//           <img [src]="reply.author.avatar" [alt]="reply.author.name" class="avatar-small">
//           <div class="author-details">
//             <div class="author-name">{{ reply.author.name }}</div>
//             <div class="post-time">{{ getTimeAgo(reply.createdAt) }}</div>
//           </div>
//         </div>

//         <div class="reply-content">{{ reply.content }}</div>

//         <div class="reply-actions">
//           <button
//             class="action-btn-reply"
//             [class.liked]="isReplyLikedByCurrentUser(reply)" (click)="onLikeReply(reply)" [matTooltip]="isReplyLikedByCurrentUser(reply) ? 'Unlike' : 'Like'" >
//             <mat-icon>thumb_up</mat-icon>
//             <span *ngIf="reply.likes?.length > 0">{{ reply.likes?.length }}</span>
//             <span>Like{{ reply.likes?.length !== 1 ? 's' : '' }}</span>
//           </button>
//           <button
//             class="action-btn-reply reply"
//             (click)="onReplyToPost(post)"
//             matTooltip="Reply to this post"
//           >
//             <mat-icon>reply</mat-icon>
//             <span>Reply</span>
//           </button>
//         </div>
//       </div>
//     </ng-template>

//     <div class="topic-detail" *ngIf="topic">
//       <button class="back-btn" (click)="onBack()">
//         <mat-icon>arrow_back</mat-icon>
//         <span>Back to topics</span>
//       </button>

//       <div class="posts-container">
//         <ng-container *ngFor="let post of topic.posts; let i = index">
//           <div class="post-card" [class.main-post]="i === 0">
//             <div *ngIf="i === 0" class="topic-header-inline">
//               <div class="header-top">
//                 <div class="topic-badges">
//                   <span class="category-badge" [attr.data-category]="topic.category">
//                     {{ topic.category }}
//                   </span>
//                   <span *ngIf="topic.isPinned" class="pinned-badge">
//                     <mat-icon>push_pin</mat-icon>
//                     Pinned
//                   </span>
//                 </div>

//                 <div class="topic-stats">
//                   <div class="stat-item">
//                     <mat-icon>forum</mat-icon>
//                     <span>{{ topic.replyCount }}</span>
//                   </div>
//                   <div class="stat-item">
//                     <mat-icon>visibility</mat-icon>
//                     <span>{{ topic.viewCount }}</span>
//                   </div>
//                 </div>
//               </div>

//               <h1 class="topic-title">{{ topic.title }}</h1>

//               <div class="topic-footer">
//                 <mat-icon>schedule</mat-icon>
//                 <span>Last activity {{ getTimeAgo(topic.lastActivity) }}</span>
//               </div>
//             </div>
//             <div class="post-header">
//               <div class="author-info">
//                 <img [src]="post.author.avatar" [alt]="post.author.name" class="avatar">
//                 <div class="author-details">
//                   <div class="author-name">{{ post.author.name }}</div>
//                   <div class="post-time">
//                     <mat-icon class="time-icon">schedule</mat-icon>
//                     {{ getTimeAgo(post.createdAt) }}
//                   </div>
//                 </div>
//               </div>
//               <span *ngIf="i === 0" class="author-badge">
//                 <mat-icon>person</mat-icon>
//                 Topic Starter
//               </span>
//             </div>

//             <div class="post-content">{{ post.content }}</div>

//             <div class="post-actions">
//               <button
//                 mat-stroked-button
//                 class="action-btn"
//                 [class.liked]="isPostLikedByCurrentUser(post)" (click)="onLikePost(post)"
//                 [matTooltip]="isPostLikedByCurrentUser(post) ? 'Unlike' : 'Like this post'" >
//                 <mat-icon>{{ isPostLikedByCurrentUser(post) ? 'thumb_up' : 'thumb_up_outline' }}</mat-icon> <span>{{ post.likes?.length > 0 ? post.likes?.length : '' }} {{ post.likes?.length === 1 ? 'Like' : (post.likes?.length > 1 ? 'Likes' : 'Like') }}</span>
//               </button>
//               <button
//                 mat-stroked-button
//                 class="action-btn reply-btn"
//                 (click)="onReplyToPost(post)"
//                 matTooltip="Reply to this post"
//               >
//                 <mat-icon>reply</mat-icon>
//                 <span>Reply</span>
//               </button>
//             </div>

//             <div *ngIf="post.replies?.length > 0" class="replies-section" [class.flat]="i === 0">
//               <div class="replies-header">
//                 <mat-icon>{{ i === 0 ? 'forum' : 'subdirectory_arrow_right' }}</mat-icon>
//                 <span>{{ post.replies?.length }} {{ post.replies?.length === 1 ? 'Reply' : 'Replies' }}</span>
//               </div>
//               <ng-container *ngFor="let reply of post.replies">
//                 <ng-container
//                   *ngTemplateOutlet="replyCardTemplate; context: {$implicit: reply, post: post}">
//                 </ng-container>
//               </ng-container>
//             </div>
//           </div>
//         </ng-container>
//       </div>

//       <div class="reply-form">
//         <div class="reply-form-header">
//           <mat-icon>rate_review</mat-icon>
//           <h3 class="reply-form-title">Join the discussion</h3>
//         </div>
//         <div class="current-user-info">
//           <img [src]="currentUser.avatar" [alt]="currentUser.name" class="avatar-small">
//           <span class="user-name">Posting as {{ currentUser.name }}</span>
//         </div>
//         <textarea
//           class="reply-textarea"
//           placeholder="Share your thoughts, ask questions, or provide feedback..."
//           rows="5"
//           [(ngModel)]="replyContent"
//         ></textarea>
//         <div class="reply-form-actions">
//           <button
//             mat-button
//             (click)="replyContent = ''"
//             [disabled]="!replyContent.trim()"
//           >
//             <mat-icon>close</mat-icon>
//             Cancel
//           </button>
//           <button
//             mat-raised-button
//             color="primary"
//             class="post-btn"
//             [disabled]="!replyContent.trim()"
//             (click)="submitReply()" >
//             <mat-icon>send</mat-icon>
//             Post Reply
//           </button>
//         </div>
//       </div>
//     </div>
//   `,
//   styles: [`
//     // ... (Your CSS styles remain the same)
//     .topic-detail { max-width: 100%; }
//     .back-btn { /* ... */ }
//     /* ... (rest of styles) */
//     .post-btn:disabled { opacity: 0.5; }

//     @media (max-width: 768px) {
//       .topic-header-inline { padding-bottom: 1.25rem; margin-bottom: 1.25rem; }
//       .header-top { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
//       .topic-title { font-size: 1.5rem; }
//       .post-card { padding: 1.375rem; }
//       .reply-form { padding: 1.5rem; }
//       .post-actions { flex-wrap: wrap; }
//     }

//     @media (max-width: 640px) {
//       .back-btn { width: 100%; justify-content: center; margin-bottom: 1rem; }
//       .topic-header-inline { padding-bottom: 1rem; margin-bottom: 1rem; }
//       .topic-title { font-size: 1.25rem; }
//       .topic-stats { gap: 0.75rem; }
//       .stat-item { font-size: 0.8125rem; }
//       .post-card { padding: 1rem; }
//       .post-header { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
//       .author-badge { align-self: flex-start; }
//       .post-content { font-size: 0.875rem; }
//       .post-actions { gap: 0.5rem; }
//       .action-btn { font-size: 0.8125rem !important; padding: 0.5rem 0.875rem !important; }
//       .replies-section { padding-left: 0.75rem; border-left-width: 2px; margin-top: 1rem; }
//       .reply-card { padding: 0.875rem; }
//       .reply-content { padding-left: 0; font-size: 0.875rem;}
//       .reply-actions { padding-left: 0; }
//       .reply-form { padding: 1rem; }
//       .reply-form-header mat-icon { font-size: 24px; width: 24px; height: 24px; }
//       .reply-form-title { font-size: 1.125rem; }
//       .reply-textarea { font-size: 0.875rem; min-height: 100px; }
//       .reply-form-actions { flex-wrap: wrap; }
//       .reply-form-actions button { flex: 1; min-width: 120px; }
//     }
//   `]
// })
// export class TopicDetailComponent implements OnInit, OnChanges, OnDestroy {
//   @Input() topicId: string | null = null;
//   @Output() back = new EventEmitter<void>();

//   @Input() topic: TopicDetail | null = null;
//   @Output() replySubmitted = new EventEmitter<any>();
//   replyContent = '';
//   // The 'as User' assertion is added for safety in the provided code, assuming User has 'id', 'name', 'avatar'.
//   // NOTE: You'll need to define a fallback user ID/details if the service can't provide one, or ensure
//   // your User model has safe defaults for 'id', 'name', 'avatar'.
//   currentUser: User ; // Initialized to avoid 'possibly undefined' errors if TopicDetail is not loaded.
//   isLoading = false;
//   error: string | null = null;

//   private topicSubscription: Subscription | null = null;

//   constructor(
//     private forumService: ForumService,
//     private userService: UserService,
//     private dialog: MatDialog
//   ) {
//     // attempt to read synchronous user info if available
//     try {
//       const maybe = (this.userService as any).getCurrentUser?.();
//       // if userService returns an observable, subscribe; if returns object, use it
//       if (maybe && typeof maybe.subscribe === 'function') {
//         maybe.subscribe((u: User) => { if (u) this.currentUser = u; });
//       } else if (maybe) {
//         this.currentUser = maybe as User;
//       }
//     } catch {
//       // fallback left as default
//     }
//   }

//   ngOnInit(): void {
//     if (this.topicId) {
//       this.fetchTopicDetails(this.topicId);
//     }
//   }
  
//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['topicId'] && !changes['topicId'].firstChange && this.topicId) {
//       this.fetchTopicDetails(this.topicId);
//     }
//   }

//   ngOnDestroy(): void {
//     this.topicSubscription?.unsubscribe();
//   }

//   fetchTopicDetails(id: string): void {
//     this.isLoading = true;
//     this.error = null;
//     this.topicSubscription = this.forumService.getTopicById(id).subscribe({
//       next: (topicDetail) => {
//         this.topic = topicDetail;
//         this.isLoading = false;
//       },
//       error: (err) => {
//         console.error('Error fetching topic details:', err);
//         this.error = 'Failed to load topic details.';
//         this.isLoading = false;
//       }
//     });
//   }

//   onBack(): void {
//     this.back.emit();
//   }

//   // FIX: Renamed from submitReplyToTopic to submitReply to match template
//   submitReply(): void { 
//     if (this.replyContent.trim() && this.topic && this.topic.posts && this.topic.posts.length > 0) {
//       const mainPostId = this.topic.posts[0].postId;
//       this.forumService.addReplyToPost(mainPostId, this.replyContent)
//         .subscribe({
//           next: () => {
//             this.replyContent = '';
//             // optionally refresh topic detail
//             if (this.topicId) this.fetchTopicDetails(this.topicId);
//           },
//           error: (err) => console.error('Error submitting reply:', err)
//         });
//     }
//   }

//   onLikePost(post: Post): void {
//     // Check if the user has already liked the post using the *correct* method
//     const alreadyLiked = this.isPostLikedByCurrentUser(post);
//     // Determine if we are liking (if not liked) or unliking (if already liked)
//     const likeAction = !alreadyLiked;
    
//     // NOTE: The provided original logic was for incrementing likesCount, but the payload 'like: true' suggests
//     // the backend is handling the toggle. I'm keeping the original optimistic update structure for simplicity,
//     // but the `isLiked` checks should use the `likes: string[]` array.

//     // The current optimistic update is flawed for a 'toggle' function as it only increments. 
//     // It is generally better to refresh the data or use the server's response for the new state.
    
//     // For a simple fix, I'll update the optimistic logic to toggle:
    
//     const payload = { postId: post.postId, replyId: null, like: likeAction };
//     this.forumService.toggleLike(payload).subscribe({
//       next: () => {
//         // Optimistic update to toggle like in the post.likes array
//         const userId = this.currentUser.id;
//         if (post.likes && likeAction) {
//             if (!post.likes.includes(userId)) {
//                 post.likes.push(userId); // Add like
//             }
//         } else if (post.likes && !likeAction) {
//             const index = post.likes.indexOf(userId);
//             if (index > -1) {
//                 post.likes.splice(index, 1); // Remove like
//             }
//         }
//         // If the backend returns the updated Post/TopicDetail, use that instead of this client-side toggle.
//         // If the full refresh is needed: if (this.topicId) this.fetchTopicDetails(this.topicId);
//       },
//       error: (err) => {
//         console.error('Error toggling post like:', err);
//       }
//     });
//   }

//   // FIX: Corrected method signature to take only 'reply'
//   onLikeReply(reply: Reply): void {
//     const alreadyLiked = this.isReplyLikedByCurrentUser(reply);
//     const likeAction = !alreadyLiked;

//     const payload = { postId: null, replyId: reply.replyId, like: likeAction };
//     this.forumService.toggleLike(payload).subscribe({
//       next: () => {
//         // Optimistic update to toggle like in the reply.likes array
//         const userId = this.currentUser.id;
//         if (reply.likes && likeAction) {
//             if (!reply.likes.includes(userId)) {
//                 reply.likes.push(userId); // Add like
//             }
//         } else if (reply.likes && !likeAction) {
//             const index = reply.likes.indexOf(userId);
//             if (index > -1) {
//                 reply.likes.splice(index, 1); // Remove like
//             }
//         }
//         // If the full refresh is needed: if (this.topicId) this.fetchTopicDetails(this.topicId);
//       },
//       error: (err) => {
//         console.error('Error toggling reply like:', err);
//       }
//     });
//   }

//   onReplyToPost(postToReplyTo: Post): void {
//     this.openReplyDialog(postToReplyTo, null);
//   }

//   onReplyToReply(parentPost: Post, replyToReplyTo: Reply): void {
//     this.openReplyDialog(parentPost, replyToReplyTo);
//   }

//   private openReplyDialog(parentPost: Post, parentReply: Reply | null): void {
//     const dialogRef = this.dialog.open(ReplyDialogComponent, {
//       width: '600px',
//       maxWidth: '90vw',
//       data: {
//         post: parentPost,
//         replyingTo: parentReply,
//         currentUser: this.currentUser
//       } as ReplyDialogData
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result && typeof result === 'string' && this.topic) { 
//         const content = result;
//         if (parentReply) {
//           this.forumService.addNestedReply(parentPost.postId, parentReply.replyId, content)
//             .subscribe({
//               next: () => { if (this.topicId) this.fetchTopicDetails(this.topicId); },
//               error: (err) => console.error('Error adding nested reply:', err)
//             });
//         } else {
//           this.forumService.addReplyToPost(parentPost.postId, content)
//             .subscribe({
//               next: () => { if (this.topicId) this.fetchTopicDetails(this.topicId); },
//               error: (err) => console.error('Error adding direct reply:', err)
//             });
//         }
//       }
//     });
//   }

//   // NOTE: This was previously 'isPostLikedByCurrentUser', fixing template usages to match
//   isPostLikedByCurrentUser(post: Post): boolean {
//     return (post.likes ?? []).includes(this.currentUser.id);
//   }

//   // NOTE: This was previously 'isReplyLikedByCurrentUser', fixing template usages to match
//   isReplyLikedByCurrentUser(reply: Reply): boolean {
//     return (reply.likes ?? []).includes(this.currentUser.id);
//   }

//   getTimeAgo(dateInput: Date | string | undefined): string {
//     if (!dateInput) return '';
//     const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
//     if (isNaN(date.getTime())) return ''; 

//     const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

//     if (seconds < 60) return 'just now';
//     const minutes = Math.floor(seconds / 60);
//     if (minutes < 60) return `${minutes}m ago`;
//     const hours = Math.floor(minutes / 60);
//     if (hours < 24) return `${hours}h ago`;
//     const days = Math.floor(hours / 24);
//     if (days < 7) return `${days}d ago`;
//     const weeks = Math.floor(days / 7);
//     return `${weeks}w ago`;
//   }
// }


// /src/app/pages/apps/conversational_forum/topic-detail/topic-detail.component.ts
// import {
//   Component,
//   EventEmitter,
//   Input,
//   Output,
//   OnChanges,
//   SimpleChanges,
//   OnInit,
//   OnDestroy
// } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { TopicDetail, Post, Reply, User } from 'src/app/models/forum.model';
// import { ForumService } from 'src/app/services/forum.service';
// import { UserService } from 'src/app/shared/userService';
// import { ReplyDialogComponent, ReplyDialogData } from '../reply-dialog.component';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-topic-detail',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatButtonModule,
//     MatIconModule,
//     MatDialogModule,
//     MatTooltipModule
//   ],
//   template: `
//     <ng-template #replyCardTemplate let-reply let-post="post">
//       <div class="reply-card">
//         <div class="author-info">
//           <img
//             [src]="reply.author?.avatar"
//             [alt]="reply.author?.name"
//             class="avatar-small"
//           />
//           <div class="author-details">
//             <div class="author-name">{{ reply.author?.name }}</div>
//             <div class="post-time">{{ getTimeAgo(reply.createdAt) }}</div>
//           </div>
//         </div>

//         <div class="reply-content">{{ reply.content }}</div>

//         <div class="reply-actions">
//           <button
//             class="action-btn-reply"
//             [class.liked]="isReplyLikedByCurrentUser(reply)"
//             (click)="onLikeReply(reply)"
//             [matTooltip]="
//               isReplyLikedByCurrentUser(reply) ? 'Unlike' : 'Like'
//             "
//           >
//             <mat-icon>thumb_up</mat-icon>
//             <span *ngIf="(reply.likes?.length ?? 0) > 0">
//               {{ reply.likes?.length ?? 0 }}
//             </span>
//             <span>
//               Like{{ (reply.likes?.length ?? 0) !== 1 ? 's' : '' }}
//             </span>
//           </button>
//           <button
//             class="action-btn-reply reply"
//             (click)="onReplyToPost(post)"
//             matTooltip="Reply to this post"
//           >
//             <mat-icon>reply</mat-icon>
//             <span>Reply</span>
//           </button>
//         </div>
//       </div>
//     </ng-template>

//     <div class="topic-detail" *ngIf="topic">
//       <button class="back-btn" (click)="onBack()">
//         <mat-icon>arrow_back</mat-icon>
//         <span>Back to topics</span>
//       </button>

//       <div class="posts-container">
//         <ng-container *ngFor="let post of topic.posts; let i = index">
//           <div class="post-card" [class.main-post]="i === 0">
//             <div *ngIf="i === 0" class="topic-header-inline">
//               <div class="header-top">
//                 <div class="topic-badges">
//                   <span
//                     class="category-badge"
//                     [attr.data-category]="topic.category"
//                   >
//                     {{ topic.category }}
//                   </span>
//                   <span *ngIf="topic.isPinned" class="pinned-badge">
//                     <mat-icon>push_pin</mat-icon>
//                     Pinned
//                   </span>
//                 </div>

//                 <div class="topic-stats">
//                   <div class="stat-item">
//                     <mat-icon>forum</mat-icon>
//                     <span>{{ topic.replyCount }}</span>
//                   </div>
//                   <div class="stat-item">
//                     <mat-icon>visibility</mat-icon>
//                     <span>{{ topic.viewCount }}</span>
//                   </div>
//                 </div>
//               </div>

//               <h1 class="topic-title">{{ topic.title }}</h1>

//               <div class="topic-footer">
//                 <mat-icon>schedule</mat-icon>
//                 <span>Last activity {{ getTimeAgo(topic.lastActivity) }}</span>
//               </div>
//             </div>

//             <div class="post-header">
//               <div class="author-info">
//                 <img
//                   [src]="post.author.avatar"
//                   [alt]="post.author.name"
//                   class="avatar"
//                 />
//                 <div class="author-details">
//                   <div class="author-name">{{ post.author.name }}</div>
//                   <div class="post-time">
//                     <mat-icon class="time-icon">schedule</mat-icon>
//                     {{ getTimeAgo(post.createdAt) }}
//                   </div>
//                 </div>
//               </div>
//               <span *ngIf="i === 0" class="author-badge">
//                 <mat-icon>person</mat-icon>
//                 Topic Starter
//               </span>
//             </div>

//             <div class="post-content">{{ post.content }}</div>

//             <div class="post-actions">
//               <button
//                 mat-stroked-button
//                 class="action-btn"
//                 [class.liked]="isPostLikedByCurrentUser(post)"
//                 (click)="onLikePost(post)"
//                 [matTooltip]="
//                   isPostLikedByCurrentUser(post)
//                     ? 'Unlike'
//                     : 'Like this post'
//                 "
//               >
//                 <mat-icon>
//                   {{
//                     isPostLikedByCurrentUser(post)
//                       ? 'thumb_up'
//                       : 'thumb_up_outline'
//                   }}
//                 </mat-icon>
//                 <span>
//                   {{
//                     (post.likes?.length ?? 0) > 0
//                       ? (post.likes?.length ?? 0)
//                       : ''
//                   }}
//                   {{
//                     (post.likes?.length ?? 0) === 1
//                       ? 'Like'
//                       : ((post.likes?.length ?? 0) > 1
//                           ? 'Likes'
//                           : 'Like')
//                   }}
//                 </span>
//               </button>
//               <button
//                 mat-stroked-button
//                 class="action-btn reply-btn"
//                 (click)="onReplyToPost(post)"
//                 matTooltip="Reply to this post"
//               >
//                 <mat-icon>reply</mat-icon>
//                 <span>Reply</span>
//               </button>
//             </div>

//             <div
//               *ngIf="(post.replies?.length ?? 0) > 0"
//               class="replies-section"
//               [class.flat]="i === 0"
//             >
//               <div class="replies-header">
//                 <mat-icon>
//                   {{ i === 0 ? 'forum' : 'subdirectory_arrow_right' }}
//                 </mat-icon>
//                 <span>
//                   {{ post.replies?.length ?? 0 }}
//                   {{
//                     (post.replies?.length ?? 0) === 1
//                       ? 'Reply'
//                       : 'Replies'
//                   }}
//                 </span>
//               </div>
//               <ng-container *ngFor="let reply of post.replies">
//                 <ng-container
//                   *ngTemplateOutlet="
//                     replyCardTemplate;
//                     context: { $implicit: reply, post: post }
//                   "
//                 ></ng-container>
//               </ng-container>
//             </div>
//           </div>
//         </ng-container>
//       </div>

//       <div class="reply-form">
//         <div class="reply-form-header">
//           <mat-icon>rate_review</mat-icon>
//           <h3 class="reply-form-title">Join the discussion</h3>
//         </div>
//         <div class="current-user-info">
//           <img
//             [src]="currentUser.avatar"
//             [alt]="currentUser.name"
//             class="avatar-small"
//           />
//           <span class="user-name">
//             Posting as {{ currentUser.name || 'User' }}
//           </span>
//         </div>
      
//         <textarea
//           class="reply-textarea"
//           placeholder="Share your thoughts, ask questions, or provide feedback..."
//           rows="5"
//           [(ngModel)]="replyContent"
//         ></textarea>
//         <div class="reply-form-actions">
//           <button
//             mat-button
//             (click)="replyContent = ''"
//             [disabled]="!replyContent.trim()"
//           >
//             <mat-icon>close</mat-icon>
//             Cancel
//           </button>
//           <button
//             mat-raised-button
//             color="primary"
//             class="post-btn"
//             [disabled]="!replyContent.trim()"
//             (click)="submitReply()"
//           >
//             <mat-icon>send</mat-icon>
//             Post Reply
//           </button>
//         </div>
//       </div>
//     </div>
//   `,
//   styles: [`
//     .topic-detail { max-width: 100%; }
//     .post-btn:disabled { opacity: 0.5; }
//     /* your existing styles, unchanged */
//     @media (max-width: 768px) {
//       .topic-header-inline { padding-bottom: 1.25rem; margin-bottom: 1.25rem; }
//       .header-top { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
//       .topic-title { font-size: 1.5rem; }
//       .post-card { padding: 1.375rem; }
//       .reply-form { padding: 1.5rem; }
//       .post-actions { flex-wrap: wrap; }
//     }
//     @media (max-width: 640px) {
//       .back-btn { width: 100%; justify-content: center; margin-bottom: 1rem; }
//       .topic-header-inline { padding-bottom: 1rem; margin-bottom: 1rem; }
//       .topic-title { font-size: 1.25rem; }
//       .topic-stats { gap: 0.75rem; }
//       .stat-item { font-size: 0.8125rem; }
//       .post-card { padding: 1rem; }
//       .post-header { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
//       .author-badge { align-self: flex-start; }
//       .post-content { font-size: 0.875rem; }
//       .post-actions { gap: 0.5rem; }
//       .action-btn { font-size: 0.8125rem !important; padding: 0.5rem 0.875rem !important; }
//       .replies-section { padding-left: 0.75rem; border-left-width: 2px; margin-top: 1rem; }
//       .reply-card { padding: 0.875rem; }
//       .reply-content { padding-left: 0; font-size: 0.875rem;}
//       .reply-actions { padding-left: 0; }
//       .reply-form { padding: 1rem; }
//       .reply-form-header mat-icon { font-size: 24px; width: 24px; height: 24px; }
//       .reply-form-title { font-size: 1.125rem; }
//       .reply-textarea { font-size: 0.875rem; min-height: 100px; }
//       .reply-form-actions { flex-wrap: wrap; }
//       .reply-form-actions button { flex: 1; min-width: 120px; }
//     }
//   `]
// })
// export class TopicDetailComponent implements OnInit, OnChanges, OnDestroy {
//   @Input() topicId: string | null = null;

//   // 👇 This enables [topic]="selectedTopicDetail"
//   @Input() topic: TopicDetail | null = null;

//   @Output() back = new EventEmitter<void>();

//   // 👇 Matches (replySubmitted) used in ForumMain
//   @Output() replySubmitted = new EventEmitter<any>();

//   replyContent = '';
//   currentUser!: User;
//   isLoading = false;
//   error: string | null = null;

//   private topicSubscription: Subscription | null = null;

//   constructor(
//     private forumService: ForumService,
//     private userService: UserService,
//     private dialog: MatDialog
//   ) {
//     try {
//       const maybe = (this.userService as any).getCurrentUser?.();
//       if (maybe && typeof maybe.subscribe === 'function') {
//         maybe.subscribe((u: User) => { if (u) this.currentUser = u; });
//       } else if (maybe) {
//         this.currentUser = maybe as User;
//       }
//     } catch {
//       // leave undefined; UI guarded with ?.
//     }
//   }

//   ngOnInit(): void {
//     if (this.topicId && !this.topic) {
//       this.fetchTopicDetails(this.topicId);
//     }
//   }
  
//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['topicId'] && !changes['topicId'].firstChange && this.topicId) {
//       this.fetchTopicDetails(this.topicId);
//     }
//   }

//   ngOnDestroy(): void {
//     this.topicSubscription?.unsubscribe();
//   }

//   fetchTopicDetails(id: string): void {
//     this.isLoading = true;
//     this.error = null;
//     this.topicSubscription = this.forumService.getTopicById(id).subscribe({
//       next: (topicDetail) => {
//         this.topic = topicDetail;
//         this.isLoading = false;
//       },
//       error: (err) => {
//         console.error('Error fetching topic details:', err);
//         this.error = 'Failed to load topic details.';
//         this.isLoading = false;
//       }
//     });
//   }

//   onBack(): void {
//     this.back.emit();
//   }

//   submitReply(): void { 
//     if (this.replyContent.trim() && this.topic && this.topic.posts && this.topic.posts.length > 0) {
//       const mainPostId = this.topic.posts[0].postId;
//       this.forumService.addReplyToPost(mainPostId, this.replyContent)
//         .subscribe({
//           next: () => {
//             this.replyContent = '';
//             if (this.topicId) {
//               this.fetchTopicDetails(this.topicId);
//             }
//             this.replySubmitted.emit();
//           },
//           error: (err) => console.error('Error submitting reply:', err)
//         });
//     }
//   }

//   onLikePost(post: Post): void {
//     const alreadyLiked = this.isPostLikedByCurrentUser(post);
//     const likeAction = !alreadyLiked;
//     const payload = { postId: post.postId, replyId: null, like: likeAction };

//     this.forumService.toggleLike(payload).subscribe({
//       next: () => {
//         const userId = this.currentUser?.id;
//         if (!userId) { return; }

//         if (!post.likes) post.likes = [];
//         if (likeAction) {
//           if (!post.likes.includes(userId)) {
//             post.likes.push(userId);
//           }
//         } else {
//           post.likes = post.likes.filter(id => id !== userId);
//         }
//       },
//       error: (err) => {
//         console.error('Error toggling post like:', err);
//       }
//     });
//   }

//   onLikeReply(reply: Reply): void {
//     const alreadyLiked = this.isReplyLikedByCurrentUser(reply);
//     const likeAction = !alreadyLiked;
//     const payload = { postId: null, replyId: reply.replyId, like: likeAction };

//     this.forumService.toggleLike(payload).subscribe({
//       next: () => {
//         const userId = this.currentUser?.id;
//         if (!userId) { return; }

//         if (!reply.likes) reply.likes = [];
//         if (likeAction) {
//           if (!reply.likes.includes(userId)) {
//             reply.likes.push(userId);
//           }
//         } else {
//           reply.likes = reply.likes.filter(id => id !== userId);
//         }
//       },
//       error: (err) => {
//         console.error('Error toggling reply like:', err);
//       }
//     });
//   }

//   onReplyToPost(postToReplyTo: Post): void {
//     this.openReplyDialog(postToReplyTo, null);
//   }

//   onReplyToReply(parentPost: Post, replyToReplyTo: Reply): void {
//     this.openReplyDialog(parentPost, replyToReplyTo);
//   }

//   private openReplyDialog(parentPost: Post, parentReply: Reply | null): void {
//     const dialogRef = this.dialog.open(ReplyDialogComponent, {
//       width: '600px',
//       maxWidth: '90vw',
//       data: {
//         post: parentPost,
//         replyingTo: parentReply,
//         currentUser: this.currentUser
//       } as ReplyDialogData
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result && typeof result === 'string' && this.topic) { 
//         const content = result;
//         if (parentReply) {
//           this.forumService.addNestedReply(parentPost.postId, parentReply.replyId, content)
//             .subscribe({
//               next: () => {
//                 if (this.topicId) this.fetchTopicDetails(this.topicId);
//                 this.replySubmitted.emit();
//               },
//               error: (err) => console.error('Error adding nested reply:', err)
//             });
//         } else {
//           this.forumService.addReplyToPost(parentPost.postId, content)
//             .subscribe({
//               next: () => {
//                 if (this.topicId) this.fetchTopicDetails(this.topicId);
//                 this.replySubmitted.emit();
//               },
//               error: (err) => console.error('Error adding direct reply:', err)
//             });
//         }
//       }
//     });
//   }

//   isPostLikedByCurrentUser(post: Post): boolean {
//     const userId = this.currentUser?.id;
//     if (!userId) return false;
//     return (post.likes ?? []).includes(userId);
//   }

//   isReplyLikedByCurrentUser(reply: Reply): boolean {
//     const userId = this.currentUser?.id;
//     if (!userId) return false;
//     return (reply.likes ?? []).includes(userId);
//   }

//   getTimeAgo(dateInput: Date | string | undefined): string {
//     if (!dateInput) return '';
//     const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
//     if (isNaN(date.getTime())) return ''; 

//     const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

//     if (seconds < 60) return 'just now';
//     const minutes = Math.floor(seconds / 60);
//     if (minutes < 60) return `${minutes}m ago`;
//     const hours = Math.floor(minutes / 60);
//     if (hours < 24) return `${hours}h ago`;
//     const days = Math.floor(hours / 24);
//     if (days < 7) return `${days}d ago`;
//     const weeks = Math.floor(days / 7);
//     return `${weeks}w ago`;
//   }
// }

// // /src/app/pages/apps/conversational_forum/topic-detail/topic-detail.component.ts(no button working post reply )
// import {
//   Component,
//   EventEmitter,
//   Input,
//   Output,
//   OnChanges,
//   SimpleChanges,
//   OnInit,
//   OnDestroy
// } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { TopicDetail, Post, Reply, User } from 'src/app/models/forum.model';
// import { ForumService } from 'src/app/services/forum.service';
// import { UserService } from 'src/app/shared/userService';
// import { ReplyDialogComponent, ReplyDialogData } from '../reply-dialog.component';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-topic-detail',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatButtonModule,
//     MatIconModule,
//     MatDialogModule,
//     MatTooltipModule
//   ],
//   template: `
//     <ng-template #replyCardTemplate let-reply let-post="post">
//       <div class="reply-card">
//         <div class="author-info">
//           <img
//             [src]="reply.author?.avatar"
//             [alt]="reply.author?.name"
//             class="avatar-small"
//           />
//           <div class="author-details">
//             <div class="author-name">{{ reply.author?.name }}</div>
//             <div class="post-time">{{ getTimeAgo(reply.createdAt) }}</div>
//           </div>
//         </div>

//         <div class="reply-content">{{ reply.content }}</div>

//         <div class="reply-actions">
//           <button
//             class="action-btn-reply"
//             [class.liked]="isReplyLikedByCurrentUser(reply)"
//             (click)="onLikeReply(reply)"
//             [matTooltip]="
//               isReplyLikedByCurrentUser(reply) ? 'Unlike' : 'Like'
//             "
//           >
//             <mat-icon>thumb_up</mat-icon>
//             <span *ngIf="(reply.likes?.length ?? 0) > 0">
//               {{ reply.likes?.length ?? 0 }}
//             </span>
//             <span>
//               Like{{ (reply.likes?.length ?? 0) !== 1 ? 's' : '' }}
//             </span>
//           </button>
//           <button
//             class="action-btn-reply reply"
//             (click)="onReplyToPost(post)"
//             matTooltip="Reply to this post"
//           >
//             <mat-icon>reply</mat-icon>
//             <span>Reply</span>
//           </button>
//         </div>
//       </div>
//     </ng-template>

//     <div class="topic-detail" *ngIf="topic">
//       <button class="back-btn" (click)="onBack()">
//         <mat-icon>arrow_back</mat-icon>
//         <span>Back to topics</span>
//       </button>

//       <div class="posts-container">
//         <ng-container *ngFor="let post of topic.posts; let i = index">
//           <div class="post-card" [class.main-post]="i === 0">
//             <div *ngIf="i === 0" class="topic-header-inline">
//               <div class="header-top">
//                 <div class="topic-badges">
//                   <span
//                     class="category-badge"
//                     [attr.data-category]="topic.category"
//                   >
//                     {{ topic.category }}
//                   </span>
//                   <span *ngIf="topic.isPinned" class="pinned-badge">
//                     <mat-icon>push_pin</mat-icon>
//                     Pinned
//                   </span>
//                 </div>

//                 <div class="topic-stats">
//                   <div class="stat-item">
//                     <mat-icon>forum</mat-icon>
//                     <span>{{ topic.replyCount }}</span>
//                   </div>
//                   <div class="stat-item">
//                     <mat-icon>visibility</mat-icon>
//                     <span>{{ topic.viewCount }}</span>
//                   </div>
//                 </div>
//               </div>

//               <h1 class="topic-title">{{ topic.title }}</h1>

//               <div class="topic-footer">
//                 <mat-icon>schedule</mat-icon>
//                 <span>Last activity {{ getTimeAgo(topic.lastActivity) }}</span>
//               </div>
//             </div>

//             <div class="post-header">
//               <div class="author-info">
//                 <img
//   [src]="post?.author?.avatar || defaultAvatar"
//   [alt]="post?.author?.name || 'User avatar'"
//   class="avatar"
// />
//                 <div class="author-details">
//                   <div class="author-name">{{ post.author.name }}</div>
//                   <div class="post-time">
//                     <mat-icon class="time-icon">schedule</mat-icon>
//                     {{ getTimeAgo(post.createdAt) }}
//                   </div>
//                 </div>
//               </div>
//               <span *ngIf="i === 0" class="author-badge">
//                 <mat-icon>person</mat-icon>
//                 Topic Starter
//               </span>
//             </div>
//             <div class="reply-box-header">
//     <div class="author-info">
//         <!-- Corrected lines 4559 & 4560 - NOW USES avatarUrl -->
//         <img 
//   [src]="currentUser?.avatar || currentUser?.avatarUrl || defaultAvatar" 
//   [alt]="currentUser?.name || 'User'" 
//   class="avatar"
// />
//         <div class="reply-as">
//             <!-- Corrected line 4564 -->
//             Posting as {{ currentUser?.name || 'User' }}
//         </div>
//     </div>
// </div>

//             <div class="post-content">{{ post.content }}</div>

//             <div class="post-actions">
//               <button
//                 mat-stroked-button
//                 class="action-btn"
//                 [class.liked]="isPostLikedByCurrentUser(post)"
//                 (click)="onLikePost(post)"
//                 [matTooltip]="
//                   isPostLikedByCurrentUser(post)
//                     ? 'Unlike'
//                     : 'Like this post'
//                 "
//               >
//                 <mat-icon>
//                   {{
//                     isPostLikedByCurrentUser(post)
//                       ? 'thumb_up'
//                       : 'thumb_up_outline'
//                   }}
//                 </mat-icon>
//                 <span>
//                   {{
//                     (post.likes?.length ?? 0) > 0
//                       ? (post.likes?.length ?? 0)
//                       : ''
//                   }}
//                   {{
//                     (post.likes?.length ?? 0) === 1
//                       ? 'Like'
//                       : ((post.likes?.length ?? 0) > 1
//                           ? 'Likes'
//                           : 'Like')
//                   }}
//                 </span>
//               </button>
//               <button
//                 mat-stroked-button
//                 class="action-btn reply-btn"
//                 (click)="onReplyToPost(post)"
//                 matTooltip="Reply to this post"
//               >
//                 <mat-icon>reply</mat-icon>
//                 <span>Reply</span>
//               </button>
//             </div>

//             <div
//               *ngIf="(post.replies?.length ?? 0) > 0"
//               class="replies-section"
//               [class.flat]="i === 0"
//             >
//               <div class="replies-header">
//                 <mat-icon>
//                   {{ i === 0 ? 'forum' : 'subdirectory_arrow_right' }}
//                 </mat-icon>
//                 <span>
//                   {{ post.replies?.length ?? 0 }}
//                   {{
//                     (post.replies?.length ?? 0) === 1
//                       ? 'Reply'
//                       : 'Replies'
//                   }}
//                 </span>
//               </div>
//               <ng-container *ngFor="let reply of post.replies">
//                 <ng-container
//                   *ngTemplateOutlet="
//                     replyCardTemplate;
//                     context: { $implicit: reply, post: post }
//                   "
//                 ></ng-container>
//               </ng-container>
//             </div>
//           </div>
//         </ng-container>
//       </div>

//       <div class="reply-form">
//         <div class="reply-form-header">
//           <mat-icon>rate_review</mat-icon>
//           <h3 class="reply-form-title">Join the discussion</h3>
//         </div>
//         <div class="current-user-info">
//   <img
//     [src]="currentUser?.avatar || currentUser?.avatarUrl || defaultAvatar"
//     [alt]="currentUser?.name || 'User'"
//     class="avatar-small"
//   />
//   <span class="user-name">
//     Posting as {{ currentUser?.name || 'User' }}
//   </span>
// </div>
      
//         <textarea
//           class="reply-textarea"
//           placeholder="Share your thoughts, ask questions, or provide feedback..."
//           rows="5"
//           [(ngModel)]="replyContent"
//         ></textarea>
//         <div class="reply-form-actions">
//           <button
//             mat-button
//             (click)="replyContent = ''"
//             [disabled]="!replyContent.trim()"
//           >
//             <mat-icon>close</mat-icon>
//             Cancel
//           </button>
//           <button
//             mat-raised-button
//             color="primary"
//             class="post-btn"
//             [disabled]="!replyContent.trim()"
//             (click)="submitReply()"
//           >
//             <mat-icon>send</mat-icon>
//             Post Reply
//           </button>
//         </div>
//       </div>
//     </div>
//   `,
//   styles: [`
//      /* Aesthetic Improvements for Topic Detail */
//     .topic-detail {
//       max-width: 100%;
//       display: flex;
//       flex-direction: column;
//       gap: 1.5rem;
//     }

//     .back-btn {
//       color: #3b82f6;
//       display: inline-flex;
//       align-items: center;
//       gap: 0.5rem;
//       font-weight: 600;
//       margin-bottom: 0.5rem;
//       background: none;
//       border: none;
//       padding: 0;
//       cursor: pointer;
//       transition: color 0.2s;
//     }
//     .back-btn:hover {
//       color: #1d4ed8;
//     }

//     .posts-container {
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//     }

//     .post-card {
//       background: #ffffff;
//       border-radius: 0.75rem;
//       padding: 1.5rem;
//       box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
//       border: 1px solid #e5e7eb;
//     }

//     .post-card.main-post {
//       border: 2px solid #3b82f6;
//     }

//     .topic-header-inline {
//       border-bottom: 1px dashed #e5e7eb;
//       padding-bottom: 1rem;
//       margin-bottom: 1rem;
//     }

//     .header-top {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       margin-bottom: 0.75rem;
//     }

//     .topic-badges {
//       display: flex;
//       gap: 0.5rem;
//     }

//     .category-badge, .pinned-badge {
//       display: inline-flex;
//       align-items: center;
//       padding: 0.25rem 0.75rem;
//       border-radius: 9999px;
//       font-size: 0.75rem;
//       font-weight: 600;
//       text-transform: uppercase;
//     }

//     .category-badge {
//       background-color: #f3f4f6;
//       color: #4b5563;
//     }
//     .pinned-badge {
//       background-color: #fef3c7;
//       color: #b45309;
//     }
//     .pinned-badge mat-icon { font-size: 14px; width: 14px; height: 14px; margin-right: 0.25rem; }

//     .topic-stats {
//       display: flex;
//       gap: 1rem;
//       color: #6b7280;
//     }

//     .stat-item {
//       display: flex;
//       align-items: center;
//       font-size: 0.875rem;
//     }
//     .stat-item mat-icon { font-size: 16px; width: 16px; height: 16px; margin-right: 0.25rem; }

//     .topic-title {
//       font-size: 1.75rem;
//       font-weight: 700;
//       color: #111827;
//       margin: 0;
//     }

//     .topic-footer {
//       display: flex;
//       align-items: center;
//       color: #6b7280;
//       font-size: 0.875rem;
//     }
//     .topic-footer mat-icon { font-size: 16px; width: 16px; height: 16px; margin-right: 0.25rem; }

//     .post-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       margin-bottom: 1rem;
//     }

//     .author-info {
//       display: flex;
//       align-items: center;
//       gap: 0.75rem;
//     }

//     .avatar, .avatar-small {
//       width: 40px;
//       height: 40px;
//       border-radius: 50%;
//       object-fit: cover;
//       flex-shrink: 0;
//     }

//     .avatar-small {
//       width: 32px;
//       height: 32px;
//     }

//     .author-details {
//       display: flex;
//       flex-direction: column;
//       line-height: 1.2;
//     }

//     .author-name {
//       font-weight: 700;
//       color: #111827;
//     }

//     .post-time {
//       font-size: 0.75rem;
//       color: #6b7280;
//       display: flex;
//       align-items: center;
//     }
//     .time-icon { font-size: 14px; width: 14px; height: 14px; margin-right: 0.25rem; }

//     .author-badge {
//       background-color: #e0f2f1;
//       color: #0d9488;
//       padding: 0.25rem 0.75rem;
//       border-radius: 9999px;
//       font-size: 0.75rem;
//       font-weight: 600;
//       display: inline-flex;
//       align-items: center;
//     }
//     .author-badge mat-icon { font-size: 14px; width: 14px; height: 14px; margin-right: 0.25rem; }

//     .post-content {
//       line-height: 1.7;
//       color: #374151;
//       margin-bottom: 1.5rem;
//       padding: 0 0.5rem; /* slight indentation */
//     }

//     .post-actions {
//       display: flex;
//       gap: 0.75rem;
//       border-top: 1px solid #f3f4f6;
//       padding-top: 1rem;
//     }

//     .action-btn {
//       font-size: 0.875rem !important;
//       font-weight: 600 !important;
//       transition: background-color 0.2s, color 0.2s;
//       color: #6b7280 !important;
//       border-color: #d1d5db !important;
//     }
//     .action-btn.liked {
//       color: #3b82f6 !important;
//       border-color: #3b82f6 !important;
//     }
//     .action-btn:hover {
//         background-color: #f3f4f6 !important;
//     }

//     /* Replies Section */
//     .replies-section {
//       margin-top: 1.5rem;
//       padding-left: 1.5rem;
//       border-left: 3px solid #e5e7eb;
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//     }

//     .replies-header {
//       display: flex;
//       align-items: center;
//       font-weight: 600;
//       color: #4b5563;
//       font-size: 0.9375rem;
//       margin-bottom: 0.5rem;
//     }
//     .replies-header mat-icon { font-size: 18px; width: 18px; height: 18px; margin-right: 0.5rem; }

//     .reply-card {
//       background: #f9fafb;
//       border-radius: 0.5rem;
//       padding: 1rem;
//       border: 1px solid #f3f4f6;
//     }

//     .reply-content {
//       line-height: 1.6;
//       color: #4b5563;
//       margin: 0.75rem 0;
//       padding-left: 0.5rem;
//       font-size: 0.9375rem;
//     }

//     .reply-actions {
//       display: flex;
//       gap: 1rem;
//       padding-top: 0.5rem;
//     }

//     .action-btn-reply {
//       display: inline-flex;
//       align-items: center;
//       background: none;
//       border: none;
//       color: #6b7280;
//       font-size: 0.8125rem;
//       font-weight: 600;
//       cursor: pointer;
//       padding: 0.25rem 0;
//       transition: color 0.2s;
//     }
//     .action-btn-reply mat-icon { font-size: 16px; width: 16px; height: 16px; margin-right: 0.25rem; }
//     .action-btn-reply:hover { color: #3b82f6; }
//     .action-btn-reply.liked { color: #3b82f6; }


//     /* Reply Form */
//     .reply-form {
//       background: #ffffff;
//       border-radius: 0.75rem;
//       padding: 2rem;
//       box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
//       border: 1px solid #e5e7eb;
//     }

//     .reply-form-header {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       margin-bottom: 1rem;
//       border-bottom: 1px solid #f3f4f6;
//       padding-bottom: 0.75rem;
//     }

//     .reply-form-header mat-icon { color: #3b82f6; }
//     .reply-form-title {
//       font-size: 1.5rem;
//       font-weight: 700;
//       color: #111827;
//       margin: 0;
//     }

//     .current-user-info {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       margin-bottom: 1rem;
//     }
//     .user-name {
//       font-weight: 600;
//       color: #4b5563;
//     }

//     .reply-textarea {
//       width: 100%;
//       min-height: 120px;
//       padding: 0.75rem;
//       border: 1px solid #d1d5db;
//       border-radius: 0.5rem;
//       resize: vertical;
//       font-size: 1rem;
//       font-family: inherit;
//       transition: border-color 0.2s, box-shadow 0.2s;
//     }
//     .reply-textarea:focus {
//       outline: none;
//       border-color: #3b82f6;
//       box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
//     }

//     .reply-form-actions {
//       display: flex;
//       justify-content: flex-end;
//       gap: 0.75rem;
//       margin-top: 1rem;
//     }

//     .reply-form-actions button {
//       font-weight: 600;
//       padding: 0.5rem 1rem;
//     }

//     .post-btn:disabled {
//         opacity: 0.5;
//         cursor: not-allowed;
//     }

//     /* Media Queries */
//     @media (max-width: 768px) {
//       .topic-title { font-size: 1.5rem; }
//       .post-card { padding: 1.25rem; }
//       .reply-form { padding: 1.5rem; }
//       .post-actions { flex-wrap: wrap; }
//       .topic-header-inline { padding-bottom: 1rem; margin-bottom: 1rem; }
//     }
//     @media (max-width: 640px) {
//       .back-btn { width: 100%; justify-content: center; margin-bottom: 1rem; }
//       .topic-title { font-size: 1.25rem; }
//       .post-card { padding: 1rem; }
//       .post-header { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
//       .author-badge { align-self: flex-start; }
//       .post-content { font-size: 0.875rem; }
//       .post-actions { gap: 0.5rem; }
//       .replies-section { padding-left: 0.75rem; border-left-width: 2px; margin-top: 1rem; }
//       .reply-card { padding: 0.875rem; }
//       .reply-form { padding: 1rem; }
//       .reply-form-title { font-size: 1.25rem; }
//     }
//   `]
// })
// export class TopicDetailComponent implements OnInit, OnChanges, OnDestroy {
//   @Input() topicId: string | null = null;

//   // 👇 This enables [topic]="selectedTopicDetail"
//   @Input() topic: TopicDetail | null = null;

//   @Output() back = new EventEmitter<void>();

//   // 👇 Matches (replySubmitted) used in ForumMain
//   @Output() replySubmitted = new EventEmitter<any>();

//   replyContent = '';
//   currentUser: User | null = null;
//   isLoading = false;
//   error: string | null = null;
//   defaultAvatar = 'clearincorp-web/src/assets/avatar-0.jpg';

//   private topicSubscription: Subscription | null = null;

//   constructor(
//     private forumService: ForumService,
//     private userService: UserService,
//     private dialog: MatDialog,
    
//   )
//    {
//     try {
//       const maybe = (this.userService as any).getCurrentUse?.();
//       if (maybe && typeof maybe.subscribe === 'function') {
//         maybe.subscribe((u: User) => { if (u) this.currentUser = u; });
//       } else if (maybe) {
//         this.currentUser = maybe as User;
//       }
//     } catch {
//       // leave undefined; UI guarded with ?.
//     }
//   }
// private subs = new Subscription(); 
//   ngOnInit(): void {
//     if (this.topicId && !this.topic) {
//       this.fetchTopicDetails(this.topicId);
//     }
    
//   }
  
//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['topicId'] && !changes['topicId'].firstChange && this.topicId) {
//       this.fetchTopicDetails(this.topicId);
//     }
//   }

//   ngOnDestroy(): void {
//     this.topicSubscription?.unsubscribe();
     
//   }

//   fetchTopicDetails(id: string | number): void {
//     this.isLoading = true;
//     this.error = null;

//     this.subs.add(
//       this.forumService.getTitleWithPosts(id, 0, 10).subscribe({
//         next: (topicDetail) => {
//           this.topic = topicDetail;
//           this.isLoading = false;
//         },
//         error: (err) => {
//           console.error('Error fetching topic details:', err);
//           this.error = 'Failed to load topic details.';
//           this.isLoading = false;
//         }
//       })
//     );
//   }

//   onBack(): void {
//     this.back.emit();
//   }

//   submitReply(): void {
//     console.log('Button Clicked. Content:', this.replyContent);
//     if (this.replyContent.trim() && this.topic && this.topic.posts && this.topic.posts.length > 0) {
//         const mainPostId = this.topic.posts[0].postId;
//         console.log('Submitting reply to Post ID:', mainPostId);
//         // ... rest of the code
//     } else {
//         console.error('Submission prerequisites failed:', {
//             content: !!this.replyContent.trim(),
//             topicLoaded: !!this.topic,
//             postsExist: this.topic && this.topic.posts && this.topic.posts.length > 0
//         });
//     }
// }

// submitReply(): void { 
//     // This IF condition will now be TRUE!
    
//     if (this.replyContent.trim() && this.topic && this.topic.posts && this.topic.posts.length > 0) { 
      
//       // this.topic.posts[0] will now exist and contain the main post.
//       const mainPostId = this.topic.posts[0].postId; 
      
//       // The rest of the logic proceeds as intended.
//       this.forumService.addReplyToPost(mainPostId, this.replyContent)
//         .subscribe({
//           next: () => {
//             this.replyContent = '';
//             if (this.topicId) {
//               this.fetchTopicDetails(this.topicId);
//             }
//             this.replySubmitted.emit();
//           },
//           error: (err) => console.error('Error submitting reply:', err)
//         });
//     }
// }


//   onLikePost(post: Post): void {
//     const alreadyLiked = this.isPostLikedByCurrentUser(post);
//     const likeAction = !alreadyLiked;
//     const payload = { postId: post.postId, replyId: null, like: likeAction };

//     this.forumService.toggleLike(payload).subscribe({
//       next: () => {
//         const userId = this.currentUser?.id;
//         if (!userId) { return; }

//         if (!post.likes) post.likes = [];
//         if (likeAction) {
//           if (!post.likes.includes(userId)) {
//             post.likes.push(userId);
//           }
//         } else {
//           post.likes = post.likes.filter(id => id !== userId);
//         }
//       },
//       error: (err) => {
//         console.error('Error toggling post like:', err);
//       }
//     });
//   }

//   onLikeReply(reply: Reply): void {
//     const alreadyLiked = this.isReplyLikedByCurrentUser(reply);
//     const likeAction = !alreadyLiked;
//     const payload = { postId: null, replyId: reply.replyId, like: likeAction };

//     this.forumService.toggleLike(payload).subscribe({
//       next: () => {
//         const userId = this.currentUser?.id;
//         if (!userId) { return; }

//         if (!reply.likes) reply.likes = [];
//         if (likeAction) {
//           if (!reply.likes.includes(userId)) {
//             reply.likes.push(userId);
//           }
//         } else {
//           reply.likes = reply.likes.filter(id => id !== userId);
//         }
//       },
//       error: (err) => {
//         console.error('Error toggling reply like:', err);
//       }
//     });
//   }

//   onReplyToPost(postToReplyTo: Post): void {
//     this.openReplyDialog(postToReplyTo, null);
//   }

//   onReplyToReply(parentPost: Post, replyToReplyTo: Reply): void {
//     this.openReplyDialog(parentPost, replyToReplyTo);
//   }

//   private openReplyDialog(parentPost: Post, parentReply: Reply | null): void {
//     const dialogRef = this.dialog.open(ReplyDialogComponent, {
//       width: '600px',
//       maxWidth: '90vw',
//       data: {
//         post: parentPost,
//         replyingTo: parentReply,
//         currentUser: this.currentUser
//       } as ReplyDialogData
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result && typeof result === 'string' && this.topic) { 
//         const content = result;
//         if (parentReply) {
//           this.forumService.addNestedReply(parentPost.postId, parentReply.replyId, content)
//             .subscribe({
//               next: () => {
//                 if (this.topicId) this.fetchTopicDetails(this.topicId);
//                 this.replySubmitted.emit();
//               },
//               error: (err) => console.error('Error adding nested reply:', err)
//             });
//         } else {
//           this.forumService.addReplyToPost(parentPost.postId, content)
//             .subscribe({
//               next: () => {
//                 if (this.topicId) this.fetchTopicDetails(this.topicId);
//                 this.replySubmitted.emit();
//               },
//               error: (err) => console.error('Error adding direct reply:', err)
//             });
//         }
//       }
//     });
//   }

//   isPostLikedByCurrentUser(post: Post): boolean {
//     const userId = this.currentUser?.id;
//     if (!userId) return false;
//     return (post.likes ?? []).includes(userId);
//   }

//   isReplyLikedByCurrentUser(reply: Reply): boolean {
//     const userId = this.currentUser?.id;
//     if (!userId) return false;
//     return (reply.likes ?? []).includes(userId);
//   }

//   getTimeAgo(dateInput: Date | string | undefined): string {
//     if (!dateInput) return '';
//     const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
//     if (isNaN(date.getTime())) return ''; 

//     const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

//     if (seconds < 60) return 'just now';
//     const minutes = Math.floor(seconds / 60);
//     if (minutes < 60) return `${minutes}m ago`;
//     const hours = Math.floor(minutes / 60);
//     if (hours < 24) return `${hours}h ago`;
//     const days = Math.floor(hours / 24);
//     if (days < 7) return `${days}d ago`;
//     const weeks = Math.floor(days / 7);
//     return `${weeks}w ago`;
//   }
// }


// /src/app/pages/apps/conversational_forum/topic-detail/topic-detail.component.ts
// import {
//   Component,
//   EventEmitter,
//   Input,
//   Output,
//   OnChanges,
//   SimpleChanges,
//   OnInit,
//   OnDestroy
// } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { TopicDetail, Post, Reply, User } from 'src/app/models/forum.model';
// import { ForumService } from 'src/app/services/forum.service';
// import { UserService } from 'src/app/shared/userService';
// import { ReplyDialogComponent, ReplyDialogData } from '../reply-dialog.component';
// import { Subscription } from 'rxjs';

// // Define a placeholder structure for the user
// const ANONYMOUS_USER_BASE = {
//     id: 0, 
//     name: 'Anonymous User',
//     avatar: 'https://placehold.co/32x32/d1d5db/374151?text=U',
// };

// const ANONYMOUS_USER: User = {
//     ...ANONYMOUS_USER_BASE,
//     author: ANONYMOUS_USER_BASE as User, 
// };


// @Component({
//   selector: 'app-topic-detail',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatButtonModule,
//     MatIconModule,
//     MatDialogModule,
//     MatTooltipModule
//   ],
//   template: `
//     <ng-template #replyCardTemplate let-reply let-post="post">
//       <div class="reply-card">
//         <div class="author-info">
//           <img
//             [src]="reply.author?.avatar"
//             [alt]="reply.author?.name"
//             class="avatar-small"
//           />
//           <div class="author-details">
//             <div class="author-name">{{ reply.author?.name }}</div>
//             <div class="post-time">{{ getTimeAgo(reply.createdAt) }}</div>
//           </div>
//         </div>

//         <div class="reply-content">{{ reply.content }}</div>

//         <div class="reply-actions">
//           <button
//             class="action-btn-reply"
//             [class.liked]="isReplyLikedByCurrentUser(reply)"
//             (click)="onLikeReply(reply)"
//             [matTooltip]="
//               isReplyLikedByCurrentUser(reply) ? 'Unlike' : 'Like'
//             "
//           >
//             <mat-icon>thumb_up</mat-icon>
//             <span *ngIf="(reply.likes?.length ?? 0) > 0">
//               {{ reply.likes?.length ?? 0 }}
//             </span>
//             <span>
//               Like{{ (reply.likes?.length ?? 0) !== 1 ? 's' : '' }}
//             </span>
//           </button>
//           <button
//             class="action-btn-reply reply"
//             (click)="onReplyToPost(post)"
//             matTooltip="Reply to this post"
//           >
//             <mat-icon>reply</mat-icon>
//             <span>Reply</span>
//           </button>
//         </div>
//       </div>
//     </ng-template>

//     <div class="topic-detail" *ngIf="topic">
//       <button class="back-btn" (click)="onBack()">
//         <mat-icon>arrow_back</mat-icon>
//         <span>Back to topics</span>
//       </button>

//       <div class="posts-container">
//         <ng-container *ngFor="let post of topic.posts; let i = index">
//           <div class="post-card" [class.main-post]="i === 0">
//             <div *ngIf="i === 0" class="topic-header-inline">
//               <div class="header-top">
//                 <div class="topic-badges">
//                   <span
//                     class="category-badge"
//                     [attr.data-category]="topic.category"
//                   >
//                     {{ topic.category }}
//                   </span>
//                   <span *ngIf="topic.isPinned" class="pinned-badge">
//                     <mat-icon>push_pin</mat-icon>
//                     Pinned
//                   </span>
//                 </div>

//                 <div class="topic-stats">
//                   <div class="stat-item">
//                     <mat-icon>forum</mat-icon>
//                     <span>{{ topic.replyCount }}</span>
//                   </div>
//                   <div class="stat-item">
//                     <mat-icon>visibility</mat-icon>
//                     <span>{{ topic.viewCount }}</span>
//                   </div>
//                 </div>
//               </div>

//               <h1 class="topic-title">{{ topic.title }}</h1>

//               <div class="topic-footer">
//                 <mat-icon>schedule</mat-icon>
//                 <span>Last activity {{ getTimeAgo(topic.lastActivity) }}</span>
//               </div>
//             </div>

//             <div class="post-header">
//               <div class="author-info">
//                 <img
//                   [src]="post.author?.avatar"
//                   [alt]="post.author?.name"
//                   class="avatar"
//                 />
//                 <div class="author-details">
//                   <div class="author-name">{{ post.author?.name }}</div>
//                   <div class="post-time">
//                     <mat-icon class="time-icon">schedule</mat-icon>
//                     {{ getTimeAgo(post.createdAt) }}
//                   </div>
//                 </div>
//               </div>
//               <span *ngIf="i === 0" class="author-badge">
//                 <mat-icon>person</mat-icon>
//                 Topic Starter
//               </span>
//             </div>

//             <div class="post-content">{{ post.content }}</div>

//             <div class="post-actions">
//               <button
//                 mat-stroked-button
//                 class="action-btn"
//                 [class.liked]="isPostLikedByCurrentUser(post)"
//                 (click)="onLikePost(post)"
//                 [matTooltip]="
//                   isPostLikedByCurrentUser(post)
//                     ? 'Unlike'
//                     : 'Like this post'
//                 "
//               >
//                 <mat-icon>
//                   {{
//                     isPostLikedByCurrentUser(post)
//                       ? 'thumb_up'
//                       : 'thumb_up_outline'
//                   }}
//                 </mat-icon>
//                 <span>
//                   {{
//                     (post.likes?.length ?? 0) > 0
//                       ? (post.likes?.length ?? 0)
//                       : ''
//                   }}
//                   {{
//                     (post.likes?.length ?? 0) === 1
//                       ? 'Like'
//                       : ((post.likes?.length ?? 0) > 1
//                           ? 'Likes'
//                           : 'Like')
//                   }}
//                 </span>
//               </button>
//               <button
//                 mat-stroked-button
//                 class="action-btn reply-btn"
//                 (click)="onReplyToPost(post)"
//                 matTooltip="Reply to this post"
//               >
//                 <mat-icon>reply</mat-icon>
//                 <span>Reply</span>
//               </button>
//             </div>

//             <div
//               *ngIf="(post.replies?.length ?? 0) > 0"
//               class="replies-section"
//               [class.flat]="i === 0"
//             >
//               <div class="replies-header">
//                 <mat-icon>
//                   {{ i === 0 ? 'forum' : 'subdirectory_arrow_right' }}
//                 </mat-icon>
//                 <span>
//                   {{ post.replies?.length ?? 0 }}
//                   {{
//                     (post.replies?.length ?? 0) === 1
//                       ? 'Reply'
//                       : 'Replies'
//                   }}
//                 </span>
//               </div>
//               <ng-container *ngFor="let reply of post.replies">
//                 <ng-container
//                   *ngTemplateOutlet="
//                     replyCardTemplate;
//                     context: { $implicit: reply, post: post }
//                   "
//                 ></ng-container>
//               </ng-container>
//             </div>
//           </div>
//         </ng-container>
//       </div>

//       <div class="reply-form">
//         <div class="reply-form-header">
//           <mat-icon>rate_review</mat-icon>
//           <h3 class="reply-form-title">Join the discussion</h3>
//         </div>
//         <div class="current-user-info">
//           <img
//             [src]="currentUser?.avatar"
//             [alt]="currentUser?.name"
//             class="avatar-small"
//           />
//           <span class="user-name">
//             Posting as {{ currentUser?.name || 'User' }}
//           </span>
//         </div>
      
//         <textarea
//           class="reply-textarea"
//           placeholder="Share your thoughts, ask questions, or provide feedback..."
//           rows="5"
//           [(ngModel)]="replyContent"
//         ></textarea>
//         <div class="reply-form-actions">
//           <button
//             mat-button
//             (click)="replyContent = ''"
//             [disabled]="!replyContent.trim()"
//           >
//             <mat-icon>close</mat-icon>
//             Cancel
//           </button>
//           <button
//             mat-raised-button
//             color="primary"
//             class="post-btn"
//             [disabled]="!replyContent.trim()"
//             (click)="submitReply()"
//           >
//             <mat-icon>send</mat-icon>
//             Post Reply
//           </button>
//         </div>
//       </div>
//     </div>
//   `,
//   styles: [`
//     /* General Container Styles */
//     .topic-detail { 
//       max-width: 900px;
//       margin: 0 auto;
//       padding: 0 1rem;
//     }

//     /* Back Button */
//     .back-btn {
//       color: #3f51b5; /* Primary color */
//       background: #f1f5fd;
//       border-radius: 9999px; /* Pill shape */
//       padding: 0.5rem 1rem;
//       margin-bottom: 1.5rem;
//       font-weight: 600;
//       display: inline-flex;
//       align-items: center;
//       gap: 0.5rem;
//       transition: background 0.2s;
//     }
//     .back-btn:hover {
//       background: #e2e8f0;
//     }
//     .back-btn mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     /* Posts Container */
//     .posts-container {
//       display: flex;
//       flex-direction: column;
//       gap: 1.5rem;
//     }

//     /* Post Card Styles */
//     .post-card {
//       background-color: #ffffff;
//       border-radius: 12px;
//       box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
//       padding: 1.5rem;
//       border: 1px solid #f3f4f6;
//       transition: box-shadow 0.3s ease;
//     }
//     .main-post {
//       border-top: 4px solid #3f51b5; /* Highlight the main post */
//       padding-top: 1.25rem;
//     }

//     /* Topic Header (Only for main post) */
//     .topic-header-inline {
//       padding-bottom: 1rem;
//       margin-bottom: 1.5rem;
//       border-bottom: 1px solid #e5e7eb;
//     }
//     .header-top {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       margin-bottom: 0.75rem;
//     }
//     .topic-title {
//       font-size: 2rem;
//       font-weight: 700;
//       color: #1f2937;
//       margin: 0.5rem 0;
//       line-height: 1.2;
//     }
//     .topic-footer {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       font-size: 0.875rem;
//       color: #6b7280;
//     }
//     .topic-footer mat-icon {
//       font-size: 16px;
//       width: 16px;
//       height: 16px;
//     }

//     /* Badges and Stats */
//     .category-badge {
//       display: inline-block;
//       padding: 0.25rem 0.75rem;
//       border-radius: 9999px;
//       font-size: 0.75rem;
//       font-weight: 600;
//       background-color: #eef2ff;
//       color: #4f46e5;
//     }
//     .pinned-badge {
//       display: inline-flex;
//       align-items: center;
//       gap: 0.25rem;
//       font-size: 0.75rem;
//       color: #f59e0b;
//       margin-left: 0.75rem;
//     }
//     .topic-stats {
//       display: flex;
//       gap: 1rem;
//       color: #6b7280;
//     }
//     .stat-item {
//       display: flex;
//       align-items: center;
//       gap: 0.25rem;
//       font-size: 0.875rem;
//     }
//     .stat-item mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     /* Post Header (Author Info) */
//     .post-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       margin-bottom: 1rem;
//     }
//     .author-info {
//       display: flex;
//       align-items: center;
//       gap: 1rem;
//     }
//     .avatar {
//       width: 48px;
//       height: 48px;
//       border-radius: 50%;
//       object-fit: cover;
//       border: 2px solid #e5e7eb;
//     }
//     .author-name {
//       font-weight: 700;
//       color: #1f2937;
//     }
//     .post-time {
//       display: flex;
//       align-items: center;
//       font-size: 0.875rem;
//       color: #6b7280;
//       margin-top: 0.125rem;
//     }
//     .time-icon {
//       font-size: 14px;
//       width: 14px;
//       height: 14px;
//       margin-right: 0.25rem;
//     }
//     .author-badge {
//       display: flex;
//       align-items: center;
//       font-size: 0.75rem;
//       color: #3f51b5;
//       font-weight: 600;
//       background: #f1f5fd;
//       padding: 0.25rem 0.6rem;
//       border-radius: 9999px;
//     }

//     /* Post Content */
//     .post-content {
//       line-height: 1.7;
//       color: #374151;
//       margin-bottom: 1.5rem;
//       white-space: pre-wrap; /* Respects formatting */
//     }

//     /* Action Buttons */
//     .post-actions {
//       display: flex;
//       gap: 0.75rem;
//       padding-top: 1rem;
//       border-top: 1px solid #f3f4f6;
//     }
//     .action-btn {
//       text-transform: uppercase;
//       font-size: 0.8125rem !important;
//       font-weight: 600;
//       border-color: #d1d5db !important;
//       color: #4b5563 !important;
//     }
//     .action-btn.liked {
//       background-color: #eef2ff !important;
//       color: #3f51b5 !important;
//       border-color: #3f51b5 !important;
//     }
//     .action-btn mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     /* Replies Section */
//     .replies-section {
//       margin-top: 2rem;
//       padding-left: 1.5rem;
//       border-left: 3px solid #e5e7eb; /* Visual indicator for nesting */
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//     }
//     .replies-header {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       font-size: 0.9375rem;
//       font-weight: 600;
//       color: #374151;
//       margin-bottom: 0.5rem;
//     }
//     .replies-header mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//       color: #9ca3af;
//     }
//     .replies-section.flat {
//       border-left: none; /* No nesting line for replies on the main post */
//       padding-left: 0;
//     }

//     /* Reply Card */
//     .reply-card {
//       background-color: #f9fafb;
//       padding: 1rem;
//       border-radius: 8px;
//       border: 1px solid #e5e7eb;
//     }
//     .reply-card .author-info {
//       margin-bottom: 0.5rem;
//     }
//     .reply-card .author-name {
//       font-size: 0.9375rem;
//     }
//     .reply-card .avatar-small {
//       width: 32px;
//       height: 32px;
//       border-radius: 50%;
//       object-fit: cover;
//     }
//     .reply-card .reply-content {
//       line-height: 1.5;
//       font-size: 0.9375rem;
//       color: #4b5563;
//       margin: 0.75rem 0;
//       padding-left: 40px; /* Align with author name */
//     }

//     /* Reply Actions (inside reply card) */
//     .reply-actions {
//       display: flex;
//       gap: 0.5rem;
//       padding-left: 40px; /* Align with reply content */
//     }
//     .action-btn-reply {
//       background: none;
//       border: none;
//       color: #6b7280;
//       font-size: 0.8125rem;
//       font-weight: 500;
//       cursor: pointer;
//       display: inline-flex;
//       align-items: center;
//       gap: 0.25rem;
//       padding: 0.25rem 0.5rem;
//       border-radius: 6px;
//       transition: color 0.2s, background 0.2s;
//     }
//     .action-btn-reply:hover {
//       background-color: #e5e7eb;
//       color: #1f2937;
//     }
//     .action-btn-reply.liked {
//       color: #3f51b5;
//     }
//     .action-btn-reply mat-icon {
//       font-size: 16px;
//       width: 16px;
//       height: 16px;
//     }

//     /* Reply Form */
//     .reply-form {
//       background-color: #ffffff;
//       border-radius: 12px;
//       box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
//       padding: 2rem;
//       margin-top: 2rem;
//       border: 1px solid #e5e7eb;
//     }
//     .reply-form-header {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       color: #3f51b5;
//       margin-bottom: 1rem;
//     }
//     .reply-form-title {
//       font-size: 1.5rem;
//       font-weight: 600;
//       margin: 0;
//     }
//     .current-user-info {
//       display: flex;
//       align-items: center;
//       gap: 0.75rem;
//       margin-bottom: 1rem;
//       color: #6b7280;
//       font-size: 0.9375rem;
//     }
//     .reply-textarea {
//       width: 100%;
//       min-height: 120px;
//       padding: 1rem;
//       border: 1px solid #d1d5db;
//       border-radius: 8px;
//       resize: vertical;
//       font-size: 1rem;
//       color: #374151;
//       transition: border-color 0.2s, box-shadow 0.2s;
//     }
//     .reply-textarea:focus {
//       border-color: #3f51b5;
//       outline: none;
//       box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.2);
//     }
//     .reply-form-actions {
//       display: flex;
//       justify-content: flex-end;
//       gap: 0.75rem;
//       margin-top: 1rem;
//     }
//     .post-btn {
//       font-weight: 600;
//       padding: 0.625rem 1.5rem;
//     }

//     /* Mobile Responsiveness */
//     @media (max-width: 768px) {
//       .topic-detail { padding: 0 0.5rem; }
//       .topic-title { font-size: 1.75rem; }
//       .post-card { padding: 1.25rem; }
//       .post-header { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
//       .author-badge { align-self: flex-start; margin-top: 0.5rem; }
//       .reply-form { padding: 1.5rem; }
//       .reply-form-actions { flex-direction: column-reverse; gap: 0.5rem; }
//       .reply-form-actions button { width: 100%; }
//       .replies-section { padding-left: 1rem; }
//     }
//   `]
// })
// export class TopicDetailComponent implements OnInit, OnChanges, OnDestroy {
//   @Input() topicId: string | null = null;
//   @Input() topic: TopicDetail | null = null;
//   @Output() back = new EventEmitter<void>();
//   @Output() replySubmitted = new EventEmitter<any>();

//   replyContent = '';
//   currentUser!: User;
//   isLoading = false;
//   error: string | null = null;

//   private userSubscription: Subscription | null = null;
//   private topicSubscription: Subscription | null = null;

//   constructor(
//     private forumService: ForumService,
//     private userService: UserService,
//     private dialog: MatDialog
//   ) {
//     this.currentUser = ANONYMOUS_USER;
//   }

//   ngOnInit(): void {
//     this.loadCurrentUser();

//     if (this.topicId && !this.topic) {
//       this.fetchTopicDetails(this.topicId);
//     }
//   }

//   loadCurrentUser(): void {
//     try {
//         const maybe = (this.userService as any).getCurrentUser?.();
        
//         if (maybe && typeof maybe.subscribe === 'function') {
//             this.userSubscription = maybe.subscribe((u: User) => { 
//                 if (u && u.id) {
//                     this.currentUser = u; 
//                 } else {
//                     console.warn("User service returned null/empty user object. Using anonymous placeholder.");
//                 }
//             });
//         } else if (maybe && maybe.id) {
//             this.currentUser = maybe as User;
//         }
//     } catch (e) {
//         console.error("Error fetching current user synchronously:", e);
//     }
//   }
  
//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['topicId'] && !changes['topicId'].firstChange && this.topicId) {
//       this.fetchTopicDetails(this.topicId);
//     }
//   }

//   ngOnDestroy(): void {
//     this.topicSubscription?.unsubscribe();
//     this.userSubscription?.unsubscribe();
//   }

//   fetchTopicDetails(id: string): void {
//     this.isLoading = true;
//     this.error = null;
//     this.topicSubscription = this.forumService.getTopicById(id).subscribe({
//       next: (topicDetail) => {
//         this.topic = topicDetail;
//         this.isLoading = false;
//       },
//       error: (err) => {
//         console.error('Error fetching topic details:', err);
//         this.error = 'Failed to load topic details.';
//         this.isLoading = false;
//       }
//     });
//   }

//   onBack(): void {
//     this.back.emit();
//   }

//   submitReply(): void { 
//     if (!this.currentUser || this.currentUser.id === ANONYMOUS_USER.id) {
//         console.error('Submission failed: User is not authenticated or user ID is missing.');
//         return; 
//     }

//     if (this.replyContent.trim() && this.topic && this.topic.posts && this.topic.posts.length > 0) {
//       const mainPostId = this.topic.posts[0].postId;
//       this.forumService.addReplyToPost(mainPostId, this.replyContent)
//         .subscribe({
//           next: () => {
//             this.replyContent = '';
//             if (this.topicId) {
//               this.fetchTopicDetails(this.topicId);
//             }
//             this.replySubmitted.emit();
//           },
//           error: (err) => console.error('Error submitting reply:', err)
//         });
//     }
//   }

//   onLikePost(post: Post): void {
//     if (!this.currentUser || this.currentUser.id === ANONYMOUS_USER.id) {
//         console.error('Like failed: User is not authenticated.');
//         return; 
//     }
//     const alreadyLiked = this.isPostLikedByCurrentUser(post);
//     const likeAction = !alreadyLiked;
//     const payload = { postId: post.postId, replyId: null, like: likeAction };

//     this.forumService.toggleLike(payload).subscribe({
//       next: () => {
//         const userId = this.currentUser?.id;
//         if (!userId) { return; }

//         if (!post.likes) post.likes = [];
//         if (likeAction) {
//           if (!post.likes.includes(userId)) {
//             post.likes.push(userId);
//           }
//         } else {
//           post.likes = post.likes.filter(id => id !== userId);
//         }
//       },
//       error: (err) => {
//         console.error('Error toggling post like:', err);
//       }
//     });
//   }

//   onLikeReply(reply: Reply): void {
//     if (!this.currentUser || this.currentUser.id === ANONYMOUS_USER.id) {
//         console.error('Like failed: User is not authenticated.');
//         return; 
//     }
//     const alreadyLiked = this.isReplyLikedByCurrentUser(reply);
//     const likeAction = !alreadyLiked;
//     const payload = { postId: null, replyId: reply.replyId, like: likeAction };

//     this.forumService.toggleLike(payload).subscribe({
//       next: () => {
//         const userId = this.currentUser?.id;
//         if (!userId) { return; }

//         if (!reply.likes) reply.likes = [];
//         if (likeAction) {
//           if (!reply.likes.includes(userId)) {
//             reply.likes.push(userId);
//           }
//         } else {
//           reply.likes = reply.likes.filter(id => id !== userId);
//         }
//       },
//       error: (err) => {
//         console.error('Error toggling reply like:', err);
//       }
//     });
//   }

//   onReplyToPost(postToReplyTo: Post): void {
//     this.openReplyDialog(postToReplyTo, null);
//   }

//   onReplyToReply(parentPost: Post, replyToReplyTo: Reply): void {
//     this.openReplyDialog(parentPost, replyToReplyTo);
//   }

//   private openReplyDialog(parentPost: Post, parentReply: Reply | null): void {
//     if (!this.currentUser || this.currentUser.id === ANONYMOUS_USER.id) {
//         console.error('Cannot open reply dialog: User is not authenticated.');
//         return; 
//     }

//     const dialogRef = this.dialog.open(ReplyDialogComponent, {
//       width: '600px',
//       maxWidth: '90vw',
//       data: {
//         post: parentPost,
//         replyingTo: parentReply,
//         currentUser: this.currentUser
//       } as ReplyDialogData
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result && typeof result === 'string' && this.topic) { 
//         const content = result;
//         if (parentReply) {
//           this.forumService.addNestedReply(parentPost.postId, parentReply.replyId, content)
//             .subscribe({
//               next: () => {
//                 if (this.topicId) this.fetchTopicDetails(this.topicId);
//                 this.replySubmitted.emit();
//               },
//               error: (err) => console.error('Error adding nested reply:', err)
//             });
//         } else {
//           this.forumService.addReplyToPost(parentPost.postId, content)
//             .subscribe({
//               next: () => {
//                 if (this.topicId) this.fetchTopicDetails(this.topicId);
//                 this.replySubmitted.emit();
//               },
//               error: (err) => console.error('Error adding direct reply:', err)
//             });
//         }
//       }
//     });
//   }

//   isPostLikedByCurrentUser(post: Post): boolean {
//     const userId = this.currentUser?.id;
//     if (!userId || userId === ANONYMOUS_USER.id) return false;
//     return (post.likes ?? []).includes(userId);
//   }

//   isReplyLikedByCurrentUser(reply: Reply): boolean {
//     const userId = this.currentUser?.id;
//     if (!userId || userId === ANONYMOUS_USER.id) return false;
//     return (reply.likes ?? []).includes(userId);
//   }

//   getTimeAgo(dateInput: Date | string | undefined): string {
//     if (!dateInput) return '';
//     const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
//     if (isNaN(date.getTime())) return ''; 

//     const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

//     if (seconds < 60) return 'just now';
//     const minutes = Math.floor(seconds / 60);
//     if (minutes < 60) return `${minutes}m ago`;
//     const hours = Math.floor(minutes / 60);
//     if (hours < 24) return `${hours}h ago`;
//     const days = Math.floor(hours / 24);
//     if (days < 7) return `${days}d ago`;
//     const weeks = Math.floor(days / 7);
//     return `${weeks}w ago`;
//   }
// }

// import {
//   Component,
//   EventEmitter,
//   Input,
//   Output,
//   OnChanges,
//   SimpleChanges,
//   OnInit,
//   OnDestroy
// } from '@angular/core';
// import { CommonModule, SlicePipe } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { TopicDetail, Post, Reply, User } from 'src/app/models/forum.model';
// import { ForumService } from 'src/app/services/forum.service';
// import { UserService } from 'src/app/shared/userService';
// import { ReplyDialogComponent, ReplyDialogData } from '../reply-dialog.component';
// import { Subscription } from 'rxjs';

// // Base64 SVG for a generic, non-static user icon
// const ANONYMOUS_AVATAR_SVG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iMTIiIGZpbGw9IiNDRTJGM0QiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSI5IiByPSIzIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTIgMTZjLTMuMzMgMC01Ljc4IDEuOTItNi40NyA0LjAxYy0uMS40Ny0uMS43NS42NC44NEM4Ljk0IDIyLjI2IDEwLjgzIDIyLjUgMTIgMjIuNWMxLjE3IDAgMy4wNi0uMjQgNS44My0xLjYzYy43NS0uNDUuNTctLjM1LjY0LS44NEwxOC40NyAxNkMxNy43OCAxNC45MiAxNS4zMyAxMyAxMiAxM1oiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=';

// const ANONYMOUS_USER_BASE: Omit<User, 'author'> = {
//     id: 0, 
//     name: 'Anonymous User',
//     avatar: ANONYMOUS_AVATAR_SVG,
// };


// @Component({
//   selector: 'app-topic-detail',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatButtonModule,
//     MatIconModule,
//     MatDialogModule,
//     MatTooltipModule,
//     SlicePipe // Make sure SlicePipe is available if used in the template (although it's in CommonModule)
//   ],
//   template: `
//     <ng-template #replyCardTemplate let-reply let-post="post">
//       <div class="reply-card">
//         <div class="author-info">
//           <img
//             [src]="reply.author?.avatar || ANONYMOUS_AVATAR_SVG"
//             [alt]="reply.author?.name"
//             class="avatar-small"
//           />
//           <div class="author-details">
//             <div class="author-name">{{ reply.author?.name || 'User' }}</div>
//             <div class="post-time">{{ getTimeAgo(reply.createdAt) }}</div>
//           </div>
//         </div>

//         <div class="reply-content">{{ reply.content }}</div>

//         <div class="reply-actions">
//           <button
//             class="action-btn-reply"
//             [class.liked]="isReplyLikedByCurrentUser(reply)"
//             (click)="onLikeReply(reply)"
//             [matTooltip]="
//               isReplyLikedByCurrentUser(reply) ? 'Unlike' : 'Like'
//             "
//           >
//             <mat-icon>thumb_up</mat-icon>
//             <span *ngIf="(reply.likes?.length ?? 0) > 0">
//               {{ reply.likes?.length ?? 0 }}
//             </span>
//             <span>
//               Like{{ (reply.likes?.length ?? 0) !== 1 ? 's' : '' }}
//             </span>
//           </button>
//           <button
//             class="action-btn-reply reply"
//             (click)="onReplyToPost(post)"
//             matTooltip="Reply to this post"
//           >
//             <mat-icon>reply</mat-icon>
//             <span>Reply</span>
//           </button>
//         </div>
//       </div>
//     </ng-template>

//     <div class="topic-detail" *ngIf="topic">
//       <button class="back-btn" (click)="onBack()">
//         <mat-icon>arrow_back</mat-icon>
//         <span>Back to topics</span>
//       </button>

//       <div class="posts-container">
//         <ng-container *ngFor="let post of topic.posts; let i = index">
//           <div class="post-card" [class.main-post]="i === 0">
//             <div *ngIf="i === 0" class="topic-header-inline">
//               <div class="header-top">
//                 <div class="topic-badges">
//                   <span
//                     class="category-badge"
//                     [attr.data-category]="topic.category"
//                   >
//                     {{ topic.category }}
//                   </span>
//                   <span *ngIf="topic.isPinned" class="pinned-badge">
//                     <mat-icon>push_pin</mat-icon>
//                     Pinned
//                   </span>
//                 </div>

//                 <div class="topic-stats">
//                   <div class="stat-item">
//                     <mat-icon>forum</mat-icon>
//                     <span>{{ topic.replyCount }}</span>
//                   </div>
//                   <div class="stat-item">
//                     <mat-icon>visibility</mat-icon>
//                     <span>{{ topic.viewCount }}</span>
//                   </div>
//                 </div>
//               </div>

//               <h1 class="topic-title">{{ topic.title }}</h1>

//               <div class="topic-footer">
//                 <mat-icon>schedule</mat-icon>
//                 <span>Last activity {{ getTimeAgo(topic.lastActivity) }}</span>
//               </div>
//             </div>

//             <div class="post-header">
//               <div class="author-info">
//                 <img
//                   [src]="post.author?.avatar || ANONYMOUS_AVATAR_SVG"
//                   [alt]="post.author?.name || 'User'"
//                   class="avatar"
//                 />
//                 <div class="author-details">
//                   <div class="author-name">{{ post.author?.name || 'User' }}</div>
//                   <div class="post-time">
//                     <mat-icon class="time-icon">schedule</mat-icon>
//                     {{ getTimeAgo(post.createdAt) }}
//                   </div>
//                 </div>
//               </div>
//               <span *ngIf="i === 0" class="author-badge">
//                 <mat-icon>person</mat-icon>
//                 Topic Starter
//               </span>
//             </div>

//             <div class="post-content">{{ post.content }}</div>

//             <div class="post-actions">
//               <button
//                 mat-stroked-button
//                 class="action-btn"
//                 [class.liked]="isPostLikedByCurrentUser(post)"
//                 (click)="onLikePost(post)"
//                 [matTooltip]="
//                   isPostLikedByCurrentUser(post)
//                     ? 'Unlike'
//                     : 'Like this post'
//                 "
//               >
//                 <mat-icon>
//                   {{
//                     isPostLikedByCurrentUser(post)
//                       ? 'thumb_up'
//                       : 'thumb_up_outline'
//                   }}
//                 </mat-icon>
//                 <span>
//                   {{
//                     (post.likes?.length ?? 0) > 0
//                       ? (post.likes?.length ?? 0)
//                       : ''
//                   }}
//                   {{
//                     (post.likes?.length ?? 0) === 1
//                       ? 'Like'
//                       : ((post.likes?.length ?? 0) > 1
//                           ? 'Likes'
//                           : 'Like')
//                   }}
//                 </span>
//               </button>
//               <button
//                 mat-stroked-button
//                 class="action-btn reply-btn"
//                 (click)="onReplyToPost(post)"
//                 matTooltip="Reply to this post"
//               >
//                 <mat-icon>reply</mat-icon>
//                 <span>Reply</span>
//               </button>
//             </div>

//             <div
//               *ngIf="(post.replies?.length ?? 0) > 0"
//               class="replies-section"
//               [class.flat]="i === 0"
//             >
//               <div class="replies-header">
//                 <mat-icon>
//                   {{ i === 0 ? 'forum' : 'subdirectory_arrow_right' }}
//                 </mat-icon>
//                 <span>
//                   {{ post.replies?.length ?? 0 }}
//                   {{
//                     (post.replies?.length ?? 0) === 1
//                       ? 'Reply'
//                       : 'Replies'
//                   }}
//                 </span>
//               </div>
//               <ng-container *ngFor="let reply of post.replies">
//                 <ng-container
//                   *ngTemplateOutlet="
//                     replyCardTemplate;
//                     context: { $implicit: reply, post: post }
//                   "
//                 ></ng-container>
//               </ng-container>
//             </div>
//           </div>
//         </ng-container>
//       </div>

//       <div class="reply-form">
//         <div class="reply-form-header">
//           <mat-icon>rate_review</mat-icon>
//           <h3 class="reply-form-title">Join the discussion</h3>
//         </div>
//         <div class="current-user-info">
//           <img
//             [src]="currentUser?.avatar || ANONYMOUS_AVATAR_SVG"
//             [alt]="currentUser?.name || 'User'"
//             class="avatar-small"
//           />
//           <span class="user-name">
//             Posting as {{ currentUser?.name || 'User' }}
//           </span>
//         </div>
      
//         <textarea
//           class="reply-textarea"
//           placeholder="Share your thoughts, ask questions, or provide feedback..."
//           rows="5"
//           [(ngModel)]="replyContent"
//         ></textarea>
//         <div class="reply-form-actions">
//           <button
//             mat-button
//             (click)="replyContent = ''"
//             [disabled]="!replyContent.trim()"
//           >
//             <mat-icon>close</mat-icon>
//             Cancel
//           </button>
//           <button
//             mat-raised-button
//             color="primary"
//             class="post-btn"
//             [disabled]="!replyContent.trim()"
//             (click)="submitReply()"
//           >
//             <mat-icon>send</mat-icon>
//             Post Reply
//           </button>
//         </div>
//       </div>
//     </div>
//   `,
//   styles: [`
//     /* Aesthetic Improvements for Topic Detail */
//     .topic-detail {
//       max-width: 100%;
//       display: flex;
//       flex-direction: column;
//       gap: 1.5rem;
//     }

//     .back-btn {
//       color: #3b82f6;
//       display: inline-flex;
//       align-items: center;
//       gap: 0.5rem;
//       font-weight: 600;
//       margin-bottom: 0.5rem;
//       background: none;
//       border: none;
//       padding: 0;
//       cursor: pointer;
//       transition: color 0.2s;
//     }
//     .back-btn:hover {
//       color: #1d4ed8;
//     }

//     .posts-container {
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//     }

//     .post-card {
//       background: #ffffff;
//       border-radius: 0.75rem;
//       padding: 1.5rem;
//       box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
//       border: 1px solid #e5e7eb;
//     }

//     .post-card.main-post {
//       border: 2px solid #3b82f6;
//     }

//     .topic-header-inline {
//       border-bottom: 1px dashed #e5e7eb;
//       padding-bottom: 1rem;
//       margin-bottom: 1rem;
//     }

//     .header-top {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       margin-bottom: 0.75rem;
//     }

//     .topic-badges {
//       display: flex;
//       gap: 0.5rem;
//     }

//     .category-badge, .pinned-badge {
//       display: inline-flex;
//       align-items: center;
//       padding: 0.25rem 0.75rem;
//       border-radius: 9999px;
//       font-size: 0.75rem;
//       font-weight: 600;
//       text-transform: uppercase;
//     }

//     .category-badge {
//       background-color: #f3f4f6;
//       color: #4b5563;
//     }
//     .pinned-badge {
//       background-color: #fef3c7;
//       color: #b45309;
//     }
//     .pinned-badge mat-icon { font-size: 14px; width: 14px; height: 14px; margin-right: 0.25rem; }

//     .topic-stats {
//       display: flex;
//       gap: 1rem;
//       color: #6b7280;
//     }

//     .stat-item {
//       display: flex;
//       align-items: center;
//       font-size: 0.875rem;
//     }
//     .stat-item mat-icon { font-size: 16px; width: 16px; height: 16px; margin-right: 0.25rem; }

//     .topic-title {
//       font-size: 1.75rem;
//       font-weight: 700;
//       color: #111827;
//       margin: 0;
//     }

//     .topic-footer {
//       display: flex;
//       align-items: center;
//       color: #6b7280;
//       font-size: 0.875rem;
//     }
//     .topic-footer mat-icon { font-size: 16px; width: 16px; height: 16px; margin-right: 0.25rem; }

//     .post-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       margin-bottom: 1rem;
//     }

//     .author-info {
//       display: flex;
//       align-items: center;
//       gap: 0.75rem;
//     }

//     .avatar, .avatar-small {
//       width: 40px;
//       height: 40px;
//       border-radius: 50%;
//       object-fit: cover;
//       flex-shrink: 0;
//     }

//     .avatar-small {
//       width: 32px;
//       height: 32px;
//     }

//     .author-details {
//       display: flex;
//       flex-direction: column;
//       line-height: 1.2;
//     }

//     .author-name {
//       font-weight: 700;
//       color: #111827;
//     }

//     .post-time {
//       font-size: 0.75rem;
//       color: #6b7280;
//       display: flex;
//       align-items: center;
//     }
//     .time-icon { font-size: 14px; width: 14px; height: 14px; margin-right: 0.25rem; }

//     .author-badge {
//       background-color: #e0f2f1;
//       color: #0d9488;
//       padding: 0.25rem 0.75rem;
//       border-radius: 9999px;
//       font-size: 0.75rem;
//       font-weight: 600;
//       display: inline-flex;
//       align-items: center;
//     }
//     .author-badge mat-icon { font-size: 14px; width: 14px; height: 14px; margin-right: 0.25rem; }

//     .post-content {
//       line-height: 1.7;
//       color: #374151;
//       margin-bottom: 1.5rem;
//       padding: 0 0.5rem; /* slight indentation */
//     }

//     .post-actions {
//       display: flex;
//       gap: 0.75rem;
//       border-top: 1px solid #f3f4f6;
//       padding-top: 1rem;
//     }

//     .action-btn {
//       font-size: 0.875rem !important;
//       font-weight: 600 !important;
//       transition: background-color 0.2s, color 0.2s;
//       color: #6b7280 !important;
//       border-color: #d1d5db !important;
//     }
//     .action-btn.liked {
//       color: #3b82f6 !important;
//       border-color: #3b82f6 !important;
//     }
//     .action-btn:hover {
//         background-color: #f3f4f6 !important;
//     }

//     /* Replies Section */
//     .replies-section {
//       margin-top: 1.5rem;
//       padding-left: 1.5rem;
//       border-left: 3px solid #e5e7eb;
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//     }

//     .replies-header {
//       display: flex;
//       align-items: center;
//       font-weight: 600;
//       color: #4b5563;
//       font-size: 0.9375rem;
//       margin-bottom: 0.5rem;
//     }
//     .replies-header mat-icon { font-size: 18px; width: 18px; height: 18px; margin-right: 0.5rem; }

//     .reply-card {
//       background: #f9fafb;
//       border-radius: 0.5rem;
//       padding: 1rem;
//       border: 1px solid #f3f4f6;
//     }

//     .reply-content {
//       line-height: 1.6;
//       color: #4b5563;
//       margin: 0.75rem 0;
//       padding-left: 0.5rem;
//       font-size: 0.9375rem;
//     }

//     .reply-actions {
//       display: flex;
//       gap: 1rem;
//       padding-top: 0.5rem;
//     }

//     .action-btn-reply {
//       display: inline-flex;
//       align-items: center;
//       background: none;
//       border: none;
//       color: #6b7280;
//       font-size: 0.8125rem;
//       font-weight: 600;
//       cursor: pointer;
//       padding: 0.25rem 0;
//       transition: color 0.2s;
//     }
//     .action-btn-reply mat-icon { font-size: 16px; width: 16px; height: 16px; margin-right: 0.25rem; }
//     .action-btn-reply:hover { color: #3b82f6; }
//     .action-btn-reply.liked { color: #3b82f6; }


//     /* Reply Form */
//     .reply-form {
//       background: #ffffff;
//       border-radius: 0.75rem;
//       padding: 2rem;
//       box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
//       border: 1px solid #e5e7eb;
//     }

//     .reply-form-header {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       margin-bottom: 1rem;
//       border-bottom: 1px solid #f3f4f6;
//       padding-bottom: 0.75rem;
//     }

//     .reply-form-header mat-icon { color: #3b82f6; }
//     .reply-form-title {
//       font-size: 1.5rem;
//       font-weight: 700;
//       color: #111827;
//       margin: 0;
//     }

//     .current-user-info {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       margin-bottom: 1rem;
//     }
//     .user-name {
//       font-weight: 600;
//       color: #4b5563;
//     }

//     .reply-textarea {
//       width: 100%;
//       min-height: 120px;
//       padding: 0.75rem;
//       border: 1px solid #d1d5db;
//       border-radius: 0.5rem;
//       resize: vertical;
//       font-size: 1rem;
//       font-family: inherit;
//       transition: border-color 0.2s, box-shadow 0.2s;
//     }
//     .reply-textarea:focus {
//       outline: none;
//       border-color: #3b82f6;
//       box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
//     }

//     .reply-form-actions {
//       display: flex;
//       justify-content: flex-end;
//       gap: 0.75rem;
//       margin-top: 1rem;
//     }

//     .reply-form-actions button {
//       font-weight: 600;
//       padding: 0.5rem 1rem;
//     }

//     .post-btn:disabled {
//         opacity: 0.5;
//         cursor: not-allowed;
//     }

//     /* Media Queries */
//     @media (max-width: 768px) {
//       .topic-title { font-size: 1.5rem; }
//       .post-card { padding: 1.25rem; }
//       .reply-form { padding: 1.5rem; }
//       .post-actions { flex-wrap: wrap; }
//       .topic-header-inline { padding-bottom: 1rem; margin-bottom: 1rem; }
//     }
//     @media (max-width: 640px) {
//       .back-btn { width: 100%; justify-content: center; margin-bottom: 1rem; }
//       .topic-title { font-size: 1.25rem; }
//       .post-card { padding: 1rem; }
//       .post-header { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
//       .author-badge { align-self: flex-start; }
//       .post-content { font-size: 0.875rem; }
//       .post-actions { gap: 0.5rem; }
//       .replies-section { padding-left: 0.75rem; border-left-width: 2px; margin-top: 1rem; }
//       .reply-card { padding: 0.875rem; }
//       .reply-form { padding: 1rem; }
//       .reply-form-title { font-size: 1.25rem; }
//     }
//   `]
// })
// export class TopicDetailComponent implements OnInit, OnChanges, OnDestroy {
//   @Input() topicId: string | null = null;
//   @Input() topic: TopicDetail | null = null;
//   @Output() back = new EventEmitter<void>();
//   @Output() replySubmitted = new EventEmitter<any>();

//   replyContent = '';
//   currentUser!: User;
//   isLoading = false;
//   error: string | null = null;
  
//   // Expose local constant to template
//   readonly ANONYMOUS_AVATAR_SVG = ANONYMOUS_AVATAR_SVG;
//   readonly ANONYMOUS_USER_ID = ANONYMOUS_USER_BASE.id;

//   private topicSubscription: Subscription | null = null;

//   constructor(
//     private forumService: ForumService,
//     private userService: UserService,
//     private dialog: MatDialog
//   ) {
//     this.loadCurrentUser();
//   }
  
//   loadCurrentUser(): void {
//     // 1. Initialize with anonymous fallback
//     this.currentUser = ANONYMOUS_USER_BASE as User;

//     try {
//       const maybe = (this.userService as any).getCurrentUser?.();
//       if (maybe && typeof maybe.subscribe === 'function') {
//         maybe.subscribe((u: User) => { 
//           if (u && u.id) {
//             // Use user data, applying the local SVG if the backend avatar is missing
//             this.currentUser = {
//               ...u,
//               avatar: u.avatar || ANONYMOUS_AVATAR_SVG
//             } as User;
//           }
//         });
//       } else if (maybe && maybe.id) {
//         this.currentUser = {
//           ...maybe,
//           avatar: maybe.avatar || ANONYMOUS_AVATAR_SVG
//         } as User;
//       }
//     } catch (e) {
//       console.error('Error loading current user from UserService:', e);
//     }
//   }

//   ngOnInit(): void {
//     if (this.topicId && !this.topic) {
//       this.fetchTopicDetails(this.topicId);
//     }
//   }
  
//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['topicId'] && !changes['topicId'].firstChange && this.topicId) {
//       this.fetchTopicDetails(this.topicId);
//     }
//   }

//   ngOnDestroy(): void {
//     this.topicSubscription?.unsubscribe();
//   }

//   fetchTopicDetails(id: string): void {
//     this.isLoading = true;
//     this.error = null;
//     this.topicSubscription = this.forumService.getTopicById(id).subscribe({
//       next: (topicDetail) => {
//         // Data sanitization filter applied here
//         if (topicDetail && topicDetail.posts) {
//           topicDetail.posts = topicDetail.posts.filter(post => 
//             post !== null && post !== undefined && 
//             post.author !== null && post.author !== undefined
//           );
//         }
        
//         this.topic = topicDetail;
//         this.isLoading = false;
//       },
//       error: (err) => {
//         console.error('Error fetching topic details:', err);
//         this.error = 'Failed to load topic details.';
//         this.isLoading = false;
//       }
//     });
//   }

//   onBack(): void {
//     this.back.emit();
//   }

//   submitReply(): void { 
//     // Authentication Guard Check
//     if (!this.currentUser || this.currentUser.id === this.ANONYMOUS_USER_ID) {
//         console.error('Submission failed: User is not authenticated or user ID is missing.');
//         // Prevent API call if user is anonymous
//         return; 
//     }
    
//     if (this.replyContent.trim() && this.topic && this.topic.posts && this.topic.posts.length > 0) {
//       const mainPostId = this.topic.posts[0].postId;
//       this.forumService.addReplyToPost(mainPostId, this.replyContent)
//         .subscribe({
//           next: () => {
//             this.replyContent = '';
//             if (this.topicId) {
//               this.fetchTopicDetails(this.topicId);
//             }
//             this.replySubmitted.emit();
//           },
//           error: (err) => {
//             console.error('API ERROR: Failed to submit main reply. Check user auth status and post ID.', err);
//           }
//         });
//     } else if (!this.replyContent.trim()) {
//       console.warn('Reply attempt blocked: Content is empty.');
//     }
//   }

//   onLikePost(post: Post): void {
//     const alreadyLiked = this.isPostLikedByCurrentUser(post);
//     const likeAction = !alreadyLiked;
//     const payload = { postId: post.postId, replyId: null, like: likeAction };

//     this.forumService.toggleLike(payload).subscribe({
//       next: () => {
//         const userId = this.currentUser?.id;
//         if (!userId || userId === this.ANONYMOUS_USER_ID) { 
//              console.warn('Cannot like: User not authenticated.');
//              return; 
//         }

//         if (!post.likes) post.likes = [];
//         if (likeAction) {
//           if (!post.likes.includes(userId)) {
//             post.likes.push(userId);
//           }
//         } else {
//           post.likes = post.likes.filter(id => id !== userId);
//         }
//       },
//       error: (err) => {
//         console.error('Error toggling post like:', err);
//       }
//     });
//   }

//   onLikeReply(reply: Reply): void {
//     const alreadyLiked = this.isReplyLikedByCurrentUser(reply);
//     const likeAction = !alreadyLiked;
//     const payload = { postId: null, replyId: reply.replyId, like: likeAction };

//     this.forumService.toggleLike(payload).subscribe({
//       next: () => {
//         const userId = this.currentUser?.id;
//         if (!userId || userId === this.ANONYMOUS_USER_ID) { 
//             console.warn('Cannot like: User not authenticated.');
//             return; 
//         }

//         if (!reply.likes) reply.likes = [];
//         if (likeAction) {
//           if (!reply.likes.includes(userId)) {
//             reply.likes.push(userId);
//           }
//         } else {
//           reply.likes = reply.likes.filter(id => id !== userId);
//         }
//       },
//       error: (err) => {
//         console.error('Error toggling reply like:', err);
//       }
//     });
//   }

//   onReplyToPost(postToReplyTo: Post): void {
//     this.openReplyDialog(postToReplyTo, null);
//   }

//   onReplyToReply(parentPost: Post, replyToReplyTo: Reply): void {
//     this.openReplyDialog(parentPost, replyToReplyTo);
//   }

//   private openReplyDialog(parentPost: Post, parentReply: Reply | null): void {
//     const dialogRef = this.dialog.open(ReplyDialogComponent, {
//       width: '600px',
//       maxWidth: '90vw',
//       data: {
//         post: parentPost,
//         replyingTo: parentReply,
//         currentUser: this.currentUser
//       } as ReplyDialogData
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result && typeof result === 'string' && this.topic) { 
//         const content = result;
        
//         // Authentication Guard Check for Dialog Submission
//         if (!this.currentUser || this.currentUser.id === this.ANONYMOUS_USER_ID) {
//             console.error('Dialog Submission failed: User is not authenticated.');
//             return; 
//         }

//         if (parentReply) {
//           this.forumService.addNestedReply(parentPost.postId, parentReply.replyId, content)
//             .subscribe({
//               next: () => {
//                 if (this.topicId) this.fetchTopicDetails(this.topicId);
//                 this.replySubmitted.emit();
//               },
//               error: (err) => console.error('Error adding nested reply:', err)
//             });
//         } else {
//           this.forumService.addReplyToPost(parentPost.postId, content)
//             .subscribe({
//               next: () => {
//                 if (this.topicId) this.fetchTopicDetails(this.topicId);
//                 this.replySubmitted.emit();
//               },
//               error: (err) => console.error('Error adding direct reply:', err)
//             });
//         }
//       }
//     });
//   }

//   isPostLikedByCurrentUser(post: Post): boolean {
//     const userId = this.currentUser?.id;
//     if (!userId || userId === this.ANONYMOUS_USER_ID) return false;
//     return (post.likes ?? []).includes(userId);
//   }

//   isReplyLikedByCurrentUser(reply: Reply): boolean {
//     const userId = this.currentUser?.id;
//     if (!userId || userId === this.ANONYMOUS_USER_ID) return false;
//     return (reply.likes ?? []).includes(userId);
//   }

//   getTimeAgo(dateInput: Date | string | undefined): string {
//     if (!dateInput) return '';
//     const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
//     if (isNaN(date.getTime())) return ''; 

//     const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

//     if (seconds < 60) return 'just now';
//     const minutes = Math.floor(seconds / 60);
//     if (minutes < 3600 / 60) return `${minutes}m ago`;
//     const hours = Math.floor(minutes / 60);
//     if (hours < 24) return `${hours}h ago`;
//     const days = Math.floor(hours / 24);
//     if (days < 7) return `${days}d ago`;
//     const weeks = Math.floor(days / 7);
//     return `${weeks}w ago`;
//   }
// }




// import {
//   Component,
//   EventEmitter,
//   Input,
//   Output,
//   OnChanges,
//   SimpleChanges,
//   OnInit,
//   OnDestroy
// } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { MatTooltipModule } from '@angular/material/tooltip';

// import { TopicDetail, Post, Reply, User } from 'src/app/models/forum.model';
// import { ForumService } from 'src/app/services/forum.service';
// import { UserService } from 'src/app/shared/userService';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-topic-detail',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatButtonModule,
//     MatIconModule,
//     MatDialogModule,
//     MatTooltipModule
//   ],
//   template: `
//     <!-- Reply card: matches DTO (loginUserName, likesCount, children) -->
//     <ng-template #replyCardTemplate let-reply let-post="post">
//       <div class="reply-card">
//         <div class="author-info">
//           <img
//             [src]="defaultAvatar"
//             [alt]="reply.loginUserName || 'User avatar'"
//             class="avatar-small"
//           />
//           <div class="author-details">
//             <div class="author-name">{{ reply.loginUserName || 'Unknown user' }}</div>
//             <div class="post-time">{{ getTimeAgo(reply.createdAt) }}</div>
//           </div>
//         </div>

//         <div class="reply-content">{{ reply.content }}</div>

//         <div class="reply-actions">
//           <button
//             class="action-btn-reply"
//             [class.liked]="isReplyLikedByCurrentUser(reply)"
//             (click)="onLikeReply(reply)"
//             [matTooltip]="isReplyLikedByCurrentUser(reply) ? 'Unlike' : 'Like'"
//           >
//             <mat-icon>thumb_up</mat-icon>
//             <span *ngIf="(reply.likesCount ?? 0) > 0">
//               {{ reply.likesCount ?? 0 }}
//             </span>
//             <span>Like{{ (reply.likesCount ?? 0) !== 1 ? 's' : '' }}</span>
//           </button>

//           <button
//             class="action-btn-reply reply"
//             (click)="onReplyToPost(post)"
//             matTooltip="Reply to this post"
//           >
//             <mat-icon>reply</mat-icon>
//             <span>Reply</span>
//           </button>
//         </div>

//         <!-- Nested children -->
//         <div *ngIf="(reply.children?.length ?? 0) > 0" class="replies-section">
//           <div *ngFor="let child of (reply.children ?? [])" class="reply-card">
//             <div class="author-info">
//               <img
//                 [src]="defaultAvatar"
//                 [alt]="child.loginUserName || 'User avatar'"
//                 class="avatar-small"
//               />
//               <div class="author-details">
//                 <div class="author-name">{{ child.loginUserName || 'Unknown user' }}</div>
//                 <div class="post-time">{{ getTimeAgo(child.createdAt) }}</div>
//               </div>
//             </div>
//             <div class="reply-content">{{ child.content }}</div>
//           </div>
//         </div>
//       </div>
//     </ng-template>

//     <div class="topic-detail" *ngIf="topic">
//       <button class="back-btn" (click)="onBack()">
//         <mat-icon>arrow_back</mat-icon>
//         <span>Back to topics</span>
//       </button>

//       <div class="posts-container">
//         <ng-container *ngFor="let post of (topic.posts ?? []); let i = index">
//           <div class="post-card" [class.main-post]="i === 0">
//             <!-- Topic header (use first post’s metadata/time for 'last activity') -->
//             <div *ngIf="i === 0" class="topic-header-inline">
//               <div class="header-top">
//                 <div class="topic-badges">
//                   <span
//                     class="category-badge"
//                     [attr.data-category]="post.topicName"
//                   >
//                     {{ post.topicName || 'Topic' }}
//                   </span>
//                   <span *ngIf="post.pinned" class="pinned-badge">
//                     <mat-icon>push_pin</mat-icon>
//                     Pinned
//                   </span>
//                 </div>

//                 <div class="topic-stats">
//                   <div class="stat-item">
//                     <mat-icon>forum</mat-icon>
//                     <span>{{ getTotalReplies(topic) }}</span>
//                   </div>
//                   <div class="stat-item">
//                     <mat-icon>visibility</mat-icon>
//                     <span>{{ getTotalViews(topic) }}</span>
//                   </div>
//                 </div>
//               </div>

//               <h1 class="topic-title">{{ topic.title }}</h1>

//               <div class="topic-footer">
//                 <mat-icon>schedule</mat-icon>
//                 <span>Last activity {{ getTimeAgo(post.lastActivityAt ?? post.createdAt) }}</span>
//               </div>
//             </div>

//             <!-- Post header -->
//             <div class="post-header">
//               <div class="author-info">
//                 <img
//                   [src]="defaultAvatar"
//                   [alt]="post.loginUserName || 'User avatar'"
//                   class="avatar"
//                 />
//                 <div class="author-details">
//                   <div class="author-name">{{ post.loginUserName || 'Unknown user' }}</div>
//                   <div class="post-time">
//                     <mat-icon class="time-icon">schedule</mat-icon>
//                     {{ getTimeAgo(post.createdAt) }}
//                   </div>
//                 </div>
//               </div>
//               <span *ngIf="post.pinned" class="author-badge">
//                 <mat-icon>push_pin</mat-icon>
//                 Pinned
//               </span>
//             </div>

//             <!-- Current user preview -->
//             <div class="reply-box-header">
              
//             </div>

//             <!-- Post content -->
//             <div class="post-content">{{ post.content }}</div>

//             <!-- Post actions -->
//             <div class="post-actions">
//               <button
//                 mat-stroked-button
//                 class="action-btn"
//                 [class.liked]="isPostLikedByCurrentUser(post)"
//                 (click)="onLikePost(post)"
//                 [matTooltip]="isPostLikedByCurrentUser(post) ? 'Unlike' : 'Like this post'"
//               >
//                 <mat-icon>
//                   {{ isPostLikedByCurrentUser(post) ? 'thumb_up' : 'thumb_up_outline' }}
//                 </mat-icon>
//                 <span>
//                   {{ post.likesCount > 0 ? post.likesCount : '' }}
//                   {{ post.likesCount === 1 ? 'Like' : (post.likesCount > 1 ? 'Likes' : 'Like') }}
//                 </span>
//               </button>

//               <button
//                 mat-stroked-button
//                 class="action-btn reply-btn"
//                 (click)="onReplyToPost(post)"
//                 matTooltip="Reply to this post"
//               >
//                 <mat-icon>reply</mat-icon>
//                 <span>Reply</span>
//               </button>
//             </div>

//             <!-- Replies -->
//             <div
//               *ngIf="(post.replies?.length ?? 0) > 0"
//               class="replies-section"
//               [class.flat]="i === 0"
//             >
//               <div class="replies-header">
//                 <mat-icon>{{ i === 0 ? 'forum' : 'subdirectory_arrow_right' }}</mat-icon>
//                 <span>
//                   {{ post.replies?.length ?? 0 }}
//                   {{ (post.replies?.length ?? 0) === 1 ? 'Reply' : 'Replies' }}
//                 </span>
//               </div>

//               <ng-container *ngFor="let reply of (post.replies ?? [])">
//                 <ng-container
//                   *ngTemplateOutlet="
//                     replyCardTemplate;
//                     context: { $implicit: reply, post: post }
//                   "
//                 ></ng-container>
//               </ng-container>
//             </div>
//           </div>
//         </ng-container>
//       </div>

//       <!-- Bottom reply form -->
//       <div class="reply-form">
//         <div class="reply-form-header">
//           <mat-icon>rate_review</mat-icon>
//           <h3 class="reply-form-title">Join the discussion</h3>
//         </div>

//         <div class="current-user-info">
//           <img
//             [src]="currentUser?.avatar || currentUser?.avatarUrl || defaultAvatar"
//             [alt]="currentUser?.name || 'User'"
//             class="avatar-small"
//           />
          
//         </div>

//         <textarea
//           class="reply-textarea"
//           placeholder="Share your thoughts, ask questions, or provide feedback..."
//           rows="5"
//           [(ngModel)]="replyContent"
//         ></textarea>

//         <!-- Reply form actions -->
//         <div class="reply-form-actions">
//         <button
//           mat-button
//           (click)="replyContent = ''"
//           [disabled]="isBlank(replyContent)"
//         >
//           <mat-icon>close</mat-icon>
//           Cancel
//         </button>

//         <button
//           mat-raised-button
//           color="primary"
//           class="post-btn"
//           [disabled]="isBlank(replyContent)"
//         (click)="createNewPostForTitle(newPostText); newPostText = ''"
//         >
//           <mat-icon>send</mat-icon>
//           Create Post
//         </button>
//       </div>

//       </div>
//     </div>
//   `,
//  styles: [`
//     .topic-detail {
//       max-width: 100%;
//     }

//     .back-btn {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       padding: 0.625rem 1.125rem;
//       border: none;
//       background: white;
//       color: #6b7280;
//       border-radius: 0.5rem;
//       font-size: 0.9375rem;
//       font-weight: 500;
//       cursor: pointer;
//       margin-bottom: 1.5rem;
//       transition: all 0.2s;
//       box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
//     }

//     .back-btn:hover {
//       background: #f3f4f6;
//       color: #1f2937;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//     }

//     .back-btn mat-icon {
//       font-size: 20px;
//       width: 20px;
//       height: 20px;
//     }

//     .topic-header-inline {
//       padding-bottom: 1.5rem;
//       margin-bottom: 1.5rem;
//       border-bottom: 2px solid #e5e7eb;
//     }

//     .header-top {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       gap: 1rem;
//       margin-bottom: 1rem;
//     }

//     .topic-badges {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       flex-wrap: wrap;
//     }

//     .topic-stats {
//       display: flex;
//       gap: 1rem;
//       align-items: center;
//     }

//     .stat-item {
//       display: flex;
//       align-items: center;
//       gap: 0.375rem;
//       color: #6b7280;
//       font-size: 0.875rem;
//       font-weight: 600;
//     }

//     .stat-item mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     .category-badge {
//       display: flex;
//       align-items: center;
//       gap: 0.25rem;
//       padding: 0.375rem 0.75rem;
//       border-radius: 0.5rem;
//       font-size: 0.8125rem;
//       font-weight: 600;
//       background: #eff6ff;
//       color: #2563eb;
//     }

//     .category-badge[data-category="Tax & Legal"] {
//       background: #fef3c7;
//       color: #d97706;
//     }

//     .category-badge[data-category="Business Growth"] {
//       background: #d1fae5;
//       color: #059669;
//     }

//     .category-badge[data-category="Success Stories"] {
//       background: #fce7f3;
//       color: #db2777;
//     }

//     .category-badge[data-category="LLC Formation"] {
//       background: #ede9fe;
//       color: #7c3aed;
//     }

//     .pinned-badge {
//       display: flex;
//       align-items: center;
//       gap: 0.375rem;
//       padding: 0.375rem 0.75rem;
//       border-radius: 0.5rem;
//       font-size: 0.8125rem;
//       font-weight: 600;
//       background: #fef3c7;
//       color: #d97706;
//     }

//     .pinned-badge mat-icon {
//       font-size: 16px;
//       width: 16px;
//       height: 16px;
//     }

//     .topic-title {
//       font-size: 1.75rem;
//       font-weight: 700;
//       color: #111827;
//       margin: 0 0 0.875rem 0;
//       line-height: 1.3;
//     }

//     .topic-footer {
//       display: flex;
//       align-items: center;
//       gap: 0.375rem;
//       color: #6b7280;
//       font-size: 0.875rem;
//     }

//     .topic-footer mat-icon {
//       font-size: 16px;
//       width: 16px;
//       height: 16px;
//     }

//     .posts-container {
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//       margin-bottom: 1.5rem;
//     }

//     .post-card {
//       background: white;
//       border: 1px solid #e5e7eb;
//       border-radius: 0.75rem;
//       padding: 1.5rem;
//       transition: all 0.2s;
//       box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
//     }

//     .post-card:hover {
//       box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
//     }

//     .post-card.main-post {
//       border-color: #2563eb;
//       border-width: 2px;
//       background: linear-gradient(to bottom, #eff6ff, white);
//     }

//     .post-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       margin-bottom: 1rem;
//       gap: 1rem;
//     }

//     .author-info {
//       display: flex;
//       align-items: center;
//       gap: 0.75rem;
//     }

//     .avatar {
//       width: 2.75rem;
//       height: 2.75rem;
//       border-radius: 9999px;
//       background: #e5e7eb;
//       border: 2px solid white;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//     }

//     .avatar-small {
//       width: 2rem;
//       height: 2rem;
//       border-radius: 9999px;
//       background: #e5e7eb;
//       border: 2px solid white;
//       box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
//     }

//     .author-details {
//       display: flex;
//       flex-direction: column;
//       gap: 0.125rem;
//     }

//     .author-name {
//       font-weight: 600;
//       color: #111827;
//       font-size: 0.9375rem;
//     }

//     .post-time {
//       display: flex;
//       align-items: center;
//       gap: 0.25rem;
//       font-size: 0.8125rem;
//       color: #9ca3af;
//     }

//     .time-icon {
//       font-size: 14px !important;
//       width: 14px !important;
//       height: 14px !important;
//     }

//     .author-badge {
//       display: flex;
//       align-items: center;
//       gap: 0.375rem;
//       padding: 0.375rem 0.75rem;
//       border-radius: 0.5rem;
//       font-size: 0.8125rem;
//       font-weight: 600;
//       background: #dbeafe;
//       color: #2563eb;
//       white-space: nowrap;
//     }

//     .author-badge mat-icon {
//       font-size: 16px;
//       width: 16px;
//       height: 16px;
//     }

//     .post-content {
//       color: #374151;
//       line-height: 1.7;
//       font-size: 0.9375rem;
//       margin-bottom: 1.25rem;
//       white-space: pre-wrap;
//     }

//     .post-actions {
//       display: flex;
//       gap: 0.75rem;
//       padding-top: 1rem;
//       border-top: 1px solid #f3f4f6;
//     }

//     .action-btn {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       padding: 0.5rem 1rem !important;
//       border-radius: 0.5rem !important;
//       font-weight: 500 !important;
//       font-size: 0.875rem !important;
//       transition: all 0.2s;
//       border-color: #e5e7eb !important;
//       color: #6b7280 !important;
//     }

//     .action-btn:hover:not(.liked) {
//       background: #f9fafb !important;
//       border-color: #d1d5db !important;
//       color: #374151 !important;
//     }

//     .action-btn.liked {
//       background: #dbeafe !important;
//       border-color: #93c5fd !important;
//       color: #2563eb !important;
//     }

//     .action-btn mat-icon {
//       font-size: 20px;
//       width: 20px;
//       height: 20px;
//     }

//     .reply-btn {
//       color: #059669 !important;
//     }

//     .reply-btn:hover {
//       background: #d1fae5 !important;
//       border-color: #6ee7b7 !important;
//       color: #047857 !important;
//     }

//     .replies-section {
//       margin-top: 1.5rem;
//       padding-left: 2.5rem;
//       border-left: 3px solid #e5e7eb;
//     }

//     .replies-section.flat {
//       margin-top: 0;
//       padding-left: 0;
//       border-left: none;
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//     }

//     .replies-header {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       margin-bottom: 0.75rem;
//       color: #6b7280;
//       font-size: 0.875rem;
//       font-weight: 600;
//     }

//     .replies-header mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     .reply-card {
//       background: white;
//       border: 1px solid #e5e7eb;
//       border-radius: 0.625rem;
//       padding: 1.25rem;
//       transition: all 0.2s;
//       display: flex;
//       flex-direction: column;
//       gap: 0.75rem;
//     }

//     .replies-section.flat .reply-card {
//         margin-bottom: 0;
//     }

//     .replies-section:not(.flat) .reply-card {
//       background: #f9fafb;
//     }

//     .reply-card:hover {
//       border-color: #d1d5db;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
//     }

//     .reply-content {
//       color: #374151;
//       line-height: 1.6;
//       font-size: 0.9375rem;
//       white-space: pre-wrap;
//       margin: 0;
//       padding: 0;
//     }

//     .reply-actions {
//       display: flex;
//       gap: 0.5rem;
//       padding: 0;
//       margin-top: 0.5rem;
//     }

//     .action-btn-reply {
//       display: inline-flex;
//       align-items: center;
//       gap: 0.5rem;
//       padding: 0.375rem 0.875rem;
//       border-radius: 0.375rem;
//       font-size: 0.875rem;
//       font-weight: 500;
//       cursor: pointer;
//       border: 1px solid #d1d5db;
//       background-color: transparent;
//       color: #6b7280;
//       transition: all 0.2s;
//     }

//     .action-btn-reply:hover {
//       background-color: #f3f4f6;
//     }

//     .action-btn-reply mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     .action-btn-reply.liked {
//       background-color: #e0eaff;
//       color: #3b82f6;
//       border-color: transparent;
//     }

//     .action-btn-reply.liked:hover {
//       background-color: #d1e0ff;
//     }

//     .reply-form {
//       background: white;
//       border: 2px solid #e5e7eb;
//       border-radius: 0.875rem;
//       padding: 1.75rem;
//       box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
//     }

//     .reply-form-header {
//       display: flex;
//       align-items: center;
//       gap: 0.75rem;
//       margin-bottom: 1.25rem;
//     }

//     .reply-form-header mat-icon {
//       color: #2563eb;
//       font-size: 28px;
//       width: 28px;
//       height: 28px;
//     }

//     .reply-form-title {
//       font-size: 1.25rem;
//       font-weight: 700;
//       color: #111827;
//       margin: 0;
//     }

//     .current-user-info {
//       display: flex;
//       align-items: center;
//       gap: 0.625rem;
//       margin-bottom: 1rem;
//       padding: 0.75rem;
//       background: #f9fafb;
//       border-radius: 0.5rem;
//     }

//     .user-name {
//       font-size: 0.875rem;
//       font-weight: 500;
//       color: #6b7280;
//     }

//     .reply-textarea {
//       width: 100%;
//       padding: 1rem;
//       border: 2px solid #e5e7eb;
//       border-radius: 0.625rem;
//       font-size: 0.9375rem;
//       font-family: inherit;
//       line-height: 1.6;
//       resize: vertical;
//       transition: all 0.2s;
//       min-height: 120px;
//     }

//     .reply-textarea:focus {
//       outline: none;
//       border-color: #2563eb;
//       box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
//     }

//     .reply-textarea::placeholder {
//       color: #9ca3af;
//     }

//     .reply-form-actions {
//       display: flex;
//       justify-content: flex-end;
//       gap: 0.75rem;
//       margin-top: 1rem;
//     }

//     .reply-form-actions button {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       font-weight: 600 !important;
//     }

//     .reply-form-actions button mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     .post-btn {
//       background: #2563eb !important;
//       color: white !important;
//       padding: 0.625rem 1.5rem !important;
//     }

//     .post-btn:hover:not(:disabled) {
//       background: #1d4ed8 !important;
//       box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);
//     }

//     .post-btn:disabled {
//       opacity: 0.5;
//     }

//     @media (max-width: 768px) {
//       .topic-header-inline { padding-bottom: 1.25rem; margin-bottom: 1.25rem; }
//       .header-top { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
//       .topic-title { font-size: 1.5rem; }
//       .post-card { padding: 1.375rem; }
//       .reply-form { padding: 1.5rem; }
//       .post-actions { flex-wrap: wrap; }
//     }

//     @media (max-width: 640px) {
//       .back-btn { width: 100%; justify-content: center; margin-bottom: 1rem; }
//       .topic-header-inline { padding-bottom: 1rem; margin-bottom: 1rem; }
//       .topic-title { font-size: 1.25rem; }
//       .topic-stats { gap: 0.75rem; }
//       .stat-item { font-size: 0.8125rem; }
//       .post-card { padding: 1rem; }
//       .post-header { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
//       .author-badge { align-self: flex-start; }
//       .post-content { font-size: 0.875rem; }
//       .post-actions { gap: 0.5rem; }
//       .action-btn { font-size: 0.8125rem !important; padding: 0.5rem 0.875rem !important; }
//       .replies-section { padding-left: 0.75rem; border-left-width: 2px; margin-top: 1rem; }
//       .reply-card { padding: 0.875rem; }
//       .reply-content { padding-left: 0; font-size: 0.875rem;}
//       .reply-actions { padding-left: 0; }
//       .reply-form { padding: 1rem; }
//       .reply-form-header mat-icon { font-size: 24px; width: 24px; height: 24px; }
//       .reply-form-title { font-size: 1.125rem; }
//       .reply-textarea { font-size: 0.875rem; min-height: 100px; }
//       .reply-form-actions { flex-wrap: wrap; }
//       .reply-form-actions button { flex: 1; min-width: 120px; }
//     }
//   `]
// })
// export class TopicDetailComponent implements OnInit, OnChanges, OnDestroy {
//   @Input() topicId: string | null = null;
//   @Input() topic: TopicDetail | null = null;

//   @Output() back = new EventEmitter<void>();
//   @Output() replySubmitted = new EventEmitter<any>();
//   newPostText = '';
//   replyContent = '';
//   currentUser: User | null = null;
//   isLoading = false;
//   error: string | null = null;

//   defaultAvatar = 'assets/avatar-0.jpg';
//   isBlank(v?: string | null): boolean {
//   return !(v && v.trim());
// }

//   private likedPosts = new Set<number>();
//   private likedReplies = new Set<number>();
//   private subs = new Subscription();

//   constructor(
//     private forumService: ForumService,
//     private userService: UserService,
//     private dialog: MatDialog
//   ) {
//     try {
//       const maybe = (this.userService as any).getCurrentUser?.() || (this.userService as any).getCurrentUse?.();
//       if (maybe && typeof maybe.subscribe === 'function') {
//         this.subs.add(maybe.subscribe((u: User) => { if (u) this.currentUser = u; }));
//       } else if (maybe) {
//         this.currentUser = maybe as User;
//       }
//     } catch {}
//   }

//   ngOnInit(): void {
//     if (this.topicId && !this.topic) {
//       this.fetchTopicDetails(this.topicId);
//     }
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['topicId'] && !changes['topicId'].firstChange && this.topicId) {
//       this.fetchTopicDetails(this.topicId);
//     }
//   }

//   ngOnDestroy(): void {
//     this.subs.unsubscribe();
//   }

//   fetchTopicDetails(id: string | number): void {
//     this.isLoading = true;
//     this.error = null;

//     this.subs.add(
//       this.forumService.getTitleWithPosts(id, 0, 10).subscribe({
//         next: (topicDetail) => {
//           this.topic = topicDetail;
//           this.isLoading = false;
//         },
//         error: (err) => {
//           console.error('Error fetching topic details:', err);
//           this.error = 'Failed to load topic details.';
//           this.isLoading = false;
//         }
//       })
//     );
//   }

//   onBack(): void {
//     this.back.emit();
//   }

//   submitReply(): void {
//     if (this.replyContent.trim() && this.topic?.posts?.length) {
//       const mainPostId = this.topic.posts[0].postId;
//       this.forumService.addReplyToPost(mainPostId, this.replyContent).subscribe({
//         next: () => {
//           this.replyContent = '';
//           if (this.topicId) this.fetchTopicDetails(this.topicId);
//           this.replySubmitted.emit();
//         },
//         error: (err) => console.error('Error submitting reply:', err)
//       });
//     }
//   }
// // topic-detail.component.ts (where you want to create a new post under the current Title)
// // createNewPostForTitle(content: string) {
// //   if (!this.topic) return; // need the current Title dto loaded
// //   const req = {
// //     topicId: this.topic.topicId,
// //     titleId: this.topic.titleId,
// //     descriptionMd: content.trim()
// //   };

// //   this.forumService.createPost(req).subscribe({
// //     next: (created) => {
// //       // Optimistically update the UI
// //       if (!this.topic) return;
// //       // Convert PostDto -> your local Post shape if they differ;
// //       // if your Post is compatible, you can push directly:
// //       this.topic.posts = [created as any, ...(this.topic.posts ?? [])];

// //       // Or refetch to be 100% consistent:
// //       // if (this.topicId) this.fetchTopicDetails(this.topicId);
// //     },
// //     error: (err) => {
// //       console.error('Failed to create post', err);
// //     }
// //   });
// // }

// createNewPostForTitle(text: string): void {
//   const descriptionMd = (text ?? '').trim();
//   if (!descriptionMd || !this.topic?.titleId) return;

//   const topicId = this.topic.topicId ?? 0; // set correctly per your UI

//   this.forumService.createPost({
//     topicId,
//     titleId: this.topic.titleId,
//     descriptionMd
//   }).subscribe({
//     next: (_post) => {
//       // refresh to see the new content (backend returns `content` in the DTO)
//       if (this.topicId) this.fetchTopicDetails(this.topicId);
//     },
//     error: (err) => console.error('Create post failed', err)
//   });
// }

//   onLikePost(post: Post): void {
//     const wasLiked = this.isPostLikedByCurrentUser(post);
//     const likeAction = !wasLiked;

//     this.forumService.toggleLike({ postId: post.postId, replyId: null }).subscribe({
//       next: () => {
//         if (likeAction) {
//           this.likedPosts.add(post.postId);
//           post.likesCount = (post.likesCount ?? 0) + 1;
//         } else {
//           this.likedPosts.delete(post.postId);
//           post.likesCount = Math.max(0, (post.likesCount ?? 0) - 1);
//         }
//       },
//       error: (err) => console.error('Error toggling post like:', err)
//     });
//   }

//   onLikeReply(reply: Reply): void {
//     const wasLiked = this.isReplyLikedByCurrentUser(reply);
//     const likeAction = !wasLiked;

//     this.forumService.toggleLike({ postId: null, replyId: reply.replyId }).subscribe({
//       next: () => {
//         if (likeAction) {
//           this.likedReplies.add(reply.replyId);
//           reply.likesCount = (reply.likesCount ?? 0) + 1;
//         } else {
//           this.likedReplies.delete(reply.replyId);
//           reply.likesCount = Math.max(0, (reply.likesCount ?? 0) - 1);
//         }
//       },
//       error: (err) => console.error('Error toggling reply like:', err)
//     });
//   }

//   onReplyToPost(postToReplyTo: Post): void {
//     // open dialog (left as-is if you already wired ReplyDialogComponent),
//     // or directly call addReplyToPost with `replyContent`
//     // this.openReplyDialog(postToReplyTo, null);
//   }

//   // local like-state helpers
//   isPostLikedByCurrentUser(post: Post): boolean {
//     return this.likedPosts.has(post.postId);
//   }
//   isReplyLikedByCurrentUser(reply: Reply): boolean {
//     return this.likedReplies.has(reply.replyId);
//   }

//   // Aggregate stats for header
//   getTotalReplies(topic: TopicDetail | null): number {
//     if (!topic?.posts?.length) return 0;
//     return topic.posts.reduce((sum, p) => sum + (p.replyCount ?? 0), 0);
//   }
//   getTotalViews(topic: TopicDetail | null): number {
//     if (!topic?.posts?.length) return 0;
//     return topic.posts.reduce((sum, p) => sum + (p.viewsCount ?? 0), 0);
//   }

//   getTimeAgo(iso: string | null | undefined): string {
//     if (!iso) return '';
//     const date = new Date(iso);
//     if (isNaN(date.getTime())) return '';
//     const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
//     if (seconds < 60) return 'just now';
//     const minutes = Math.floor(seconds / 60);
//     if (minutes < 60) return `${minutes}m ago`;
//     const hours = Math.floor(minutes / 60);
//     if (hours < 24) return `${hours}h ago`;
//     const days = Math.floor(hours / 24);
//     if (days < 7) return `${days}d ago`;
//     const weeks = Math.floor(days / 7);
//     return `${weeks}w ago`;
//   }
// }


// import {
//   Component, EventEmitter, Input, Output, OnInit, OnChanges, OnDestroy, SimpleChanges
// } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { Subscription } from 'rxjs';

// import { ForumService } from 'src/app/services/forum.service';
// import { UserService } from 'src/app/shared/userService';
// import { ReplyDialogComponent, ReplyDialogData } from '../reply-dialog.component';

// // ==== DTO types (match your backend) ====
// export interface ReplyDto {
//   replyId: number;
//   postId: number;
//   parentReplyId: number | null;
//   loginUserId: number;
//   loginUserName: string;
//   content: string;
//   depth: number;
//   likesCount: number;
//   deleted: boolean;
//   createdAt: string;
//   editedAt: string | null;
//   children?: ReplyDto[];
// }

// export interface PostDto {
//   postId: number;
//   loginUserId: number;
//   loginUserName: string;
//   topicId: number;
//   topicName: string;
//   titleId: number;
//   title: string;
//   content: string;
//   pinned: boolean;
//   pinnedById: number | null;
//   likesCount: number;
//   viewsCount: number;
//   replyCount: number;
//   deleted: boolean;
//   createdAt: string;
//   editedAt: string | null;
//   lastActivityAt: string | null;
//   replies: ReplyDto[] | null;
// }

// export interface TopicDetailDto {
//   titleId: number;
//   topicId: number;
//   title: string;
//   descriptionMd: string;
//   createdAt: string;
//   createdById: number;
//   createdByName: string;
//   posts: PostDto[];
// }

// @Component({
//   selector: 'app-topic-detail',
//   standalone: true,
//   imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule],
//   template: `
//     <!-- Reply card (uses loginUserName, likesCount, children) -->
//     <ng-template #replyCard let-reply let-parentPost="post">
//       <div class="reply-card">
//         <div class="author-info">
//           <img [src]="defaultAvatar" [alt]="reply.loginUserName || 'User avatar'" class="avatar-small" />
//           <div class="author-details">
//             <div class="author-name">{{ reply.loginUserName || 'User' }}</div>
//             <div class="post-time">{{ getTimeAgo(reply.createdAt) }}</div>
//           </div>
//         </div>

//         <div class="reply-content">{{ reply.content }}</div>

//         <div class="reply-actions">
//           <button class="action-btn-reply"
//                   [class.liked]="false"
//                   (click)="onLikeReply(reply)"
//                   matTooltip="Like">
//             <mat-icon>thumb_up</mat-icon>
//             <span *ngIf="(reply.likesCount ?? 0) > 0">{{ reply.likesCount }}</span>
//             <span>Like{{ (reply.likesCount ?? 0) !== 1 ? 's' : '' }}</span>
//           </button>

//           <button class="action-btn-reply reply"
//                   (click)="onReplyToReply(parentPost, reply)"
//                   matTooltip="Reply to this reply">
//             <mat-icon>reply</mat-icon>
//             <span>Reply</span>
//           </button>
//         </div>

//         <!-- nested children -->
//         <div *ngIf="(reply.children?.length ?? 0) > 0" class="replies-section nested">
//           <div *ngFor="let child of reply.children" class="reply-card">
//             <div class="author-info">
//               <img [src]="defaultAvatar" [alt]="child.loginUserName || 'User avatar'" class="avatar-small" />
//               <div class="author-details">
//                 <div class="author-name">{{ child.loginUserName || 'User' }}</div>
//                 <div class="post-time">{{ getTimeAgo(child.createdAt) }}</div>
//               </div>
//             </div>
//             <div class="reply-content">{{ child.content }}</div>
//           </div>
//         </div>
//       </div>
//     </ng-template>

//     <div class="topic-detail" *ngIf="topic">
//       <button class="back-btn" (click)="onBack()">
//         <mat-icon>arrow_back</mat-icon>
//         <span>Back to topics</span>
//       </button>

//     <div class="topic-detail" *ngIf="topic">
//       <!-- title header from first post/meta -->
//       <div class="title-card" *ngIf="topic.posts?.length">
//         <div class="header-top">
//           <div class="topic-badges">
//             <span class="category-badge" [attr.data-category]="topic.posts[0].topicName">
//               {{ topic.posts[0].topicName || 'Topic' }}
//             </span>
//           </div>
//           <div class="topic-stats">
//             <div class="stat-item"><mat-icon>forum</mat-icon><span>{{ getTotalReplies(topic) }}</span></div>
//             <div class="stat-item"><mat-icon>visibility</mat-icon><span>{{ getTotalViews(topic) }}</span></div>
//           </div>
//         </div>

//         <h1 class="topic-title">{{ topic.title }}</h1>

//         <div class="topic-footer">
//           <mat-icon>schedule</mat-icon>
//           <span>
//             Last activity
//             {{
//               getTimeAgo(topic.posts[0].lastActivityAt || topic.posts[0].createdAt)
//             }}
//           </span>
//         </div>
//       </div>
      

//       <!-- Post list -->
//       <div class="posts-container">
//         <div class="post-card" *ngFor="let post of topic.posts; let i = index" [class.main-post]="i === 0">
//           <div class="post-header">
//             <div class="author-info">
//               <img [src]="defaultAvatar" [alt]="post.loginUserName || 'User avatar'" class="avatar" />
//               <div class="author-details">
//                 <div class="author-name">{{ post.loginUserName || 'User' }}</div>
//                 <div class="post-time"><mat-icon class="time-icon">schedule</mat-icon>{{ getTimeAgo(post.createdAt) }}</div>
//               </div>
//             </div>

//             <span *ngIf="post.pinned" class="author-badge"><mat-icon>push_pin</mat-icon>Pinned</span>
//           </div>

//           <div class="post-content">{{ post.content }}</div>

//           <div class="post-actions">
//             <button mat-stroked-button class="action-btn" (click)="onLikePost(post)" matTooltip="Like this post">
//               <mat-icon>thumb_up</mat-icon>
//               <span>
//                 {{ post.likesCount > 0 ? post.likesCount : '' }}
//                 {{ post.likesCount === 1 ? 'Like' : (post.likesCount > 1 ? 'Likes' : 'Like') }}
//               </span>
//             </button>

//             <button mat-stroked-button class="action-btn reply-btn" (click)="onReplyToPost(post)" matTooltip="Reply">
//               <mat-icon>reply</mat-icon><span>Reply</span>
//             </button>
//           </div>

//           <!-- replies -->
//           <div *ngIf="(post.replies?.length ?? 0) > 0" class="replies-section" [class.flat]="i === 0">
//             <div class="replies-header">
//               <mat-icon>{{ i === 0 ? 'forum' : 'subdirectory_arrow_right' }}</mat-icon>
//               <span>
//                 {{ post.replies?.length ?? 0 }}
//                 {{ (post.replies?.length ?? 0) === 1 ? 'Reply' : 'Replies' }}
//               </span>
//             </div>

//             <ng-container *ngFor="let reply of (post.replies ?? [])">
//               <ng-container *ngTemplateOutlet="replyCard; context: { $implicit: reply, post: post }"></ng-container>
//             </ng-container>
//           </div>
//         </div>
//       </div>

//       <!-- Composer (Create Post for this Title) -->
//       <div class="reply-form">
//         <div class="reply-form-header">
//           <mat-icon>rate_review</mat-icon>
//           <h3 class="reply-form-title">Join the discussion</h3>
//         </div>

//         <textarea class="reply-textarea"
//                   placeholder="Share your thoughts, ask questions, or provide feedback..."
//                   rows="5"
//                   [(ngModel)]="newPostText"></textarea>

//         <div class="reply-form-actions">
//           <button mat-button (click)="newPostText=''" [disabled]="isBlank(newPostText)">
//             <mat-icon>close</mat-icon> Cancel
//           </button>

//           <button mat-raised-button color="primary" class="post-btn"
//                   [disabled]="isBlank(newPostText)"
//                   (click)="createNewPostForTitle(newPostText); newPostText=''">
//             <mat-icon>send</mat-icon> Create Post
//           </button>
//         </div>
//       </div>
//     </div>
//   `,
//   styles: [`
//     .topic-detail{max-width:100%;display:flex;flex-direction:column;gap:1.25rem}
//     .title-card{background:#f8fbff;border-radius:.75rem;padding:1.25rem;border:1px solid #dbeafe}
//     .header-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:.5rem}
//     .topic-badges{display:flex;gap:.5rem}
//     .category-badge{background:#eef2ff;color:#4338ca;border-radius:9999px;padding:.25rem .6rem;font-size:.75rem;font-weight:600}
//     .topic-stats{display:flex;gap:1rem;color:#6b7280}
//     .stat-item{display:flex;align-items:center;gap:.25rem}
//     .topic-title{margin:0 0 .25rem 0;font-size:1.6rem;font-weight:800;color:#111827}
//     .topic-footer{display:flex;align-items:center;gap:.4rem;color:#6b7280;font-size:.9rem}
//     .posts-container{display:flex;flex-direction:column;gap:1rem}
//     .post-card{background:#fff;border-radius:.75rem;padding:1.25rem;border:1px solid #e5e7eb}
//     .post-card.main-post{border:2px solid #93c5fd}
//     .post-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem}
//     .author-info{display:flex;align-items:center;gap:.75rem}
//     .avatar{width:40px;height:40px;border-radius:50%;object-fit:cover}
//     .avatar-small{width:32px;height:32px;border-radius:50%;object-fit:cover}
//     .author-details{display:flex;flex-direction:column;line-height:1.2}
//     .author-name{font-weight:700;color:#111827}
//     .post-time{display:flex;align-items:center;gap:.3rem;color:#6b7280;font-size:.8rem}
//     .author-badge{background:#e0f2f1;color:#0d9488;border-radius:9999px;padding:.2rem .6rem;font-size:.75rem;font-weight:600;display:inline-flex;align-items:center;gap:.25rem}
//     .post-content{line-height:1.7;color:#374151;margin:.5rem 0 1rem}
//     .post-actions{display:flex;gap:.6rem;border-top:1px solid #f3f4f6;padding-top:.75rem}
//     .action-btn{font-size:.9rem;font-weight:600;color:#6b7280;border-color:#d1d5db}
//     .reply-btn{}
//     .replies-section{margin-top:1rem;padding-left:1.25rem;border-left:3px solid #e5e7eb;display:flex;flex-direction:column;gap:.75rem}
//     .replies-section.nested{margin-top:.5rem;border-left:2px solid #f3f4f6}
//     .replies-header{display:flex;align-items:center;gap:.4rem;color:#4b5563;font-weight:600}
//     .reply-card{background:#f9fafb;border:1px solid #f3f4f6;border-radius:.5rem;padding:.75rem}
//     .reply-content{color:#4b5563;line-height:1.6;margin:.5rem 0}
//     .reply-actions{display:flex;gap:.8rem}
//     .action-btn-reply{display:inline-flex;align-items:center;gap:.25rem;background:none;border:none;color:#6b7280;font-weight:600;cursor:pointer}
//     .action-btn-reply:hover{color:#3b82f6}
//     .reply-form{background:#fff;border-radius:.75rem;padding:1.25rem;border:1px solid #e5e7eb}
//     .reply-form-header{display:flex;align-items:center;gap:.5rem;margin-bottom:.75rem;border-bottom:1px solid #f3f4f6;padding-bottom:.5rem}
//     .reply-textarea{width:100%;min-height:120px;padding:.75rem;border:1px solid #d1d5db;border-radius:.5rem;resize:vertical}
//     .reply-form-actions{display:flex;justify-content:flex-end;gap:.6rem;margin-top:.75rem}
//     @media (max-width:640px){.post-card{padding:1rem}.replies-section{padding-left:.75rem}}
//   `]
// })
// export class TopicDetailComponent implements OnInit, OnChanges, OnDestroy {
//   @Input() topicId: number | string | null = null;
//   @Input() topic: TopicDetailDto | null = null;
//   @Output() back = new EventEmitter<void>();
//   @Output() replySubmitted = new EventEmitter<void>();

//   defaultAvatar = 'assets/avatar-0.jpg';
//   newPostText = '';
//   private subs = new Subscription();

//   constructor(
//     private forumService: ForumService,
//     private userService: UserService,
//     private dialog: MatDialog
//   ) {}

//   onBack(): void {
//     this.back.emit();
//   }

//   ngOnInit(): void {
//     if (this.topicId && !this.topic) this.fetch(this.topicId);
//   }
//   ngOnChanges(ch: SimpleChanges): void {
//     if (ch['topicId'] && !ch['topicId'].firstChange && this.topicId) this.fetch(this.topicId);
//   }
//   ngOnDestroy(): void { this.subs.unsubscribe(); }

//   // --- API ---
//   fetch(id: number | string) {
//     this.subs.add(
//       this.forumService.getTitleWithPosts(id, 0, 20).subscribe({
//         next: (t) => this.topic = t,
//         error: (e) => console.error('load topic failed', e)
//       })
//     );
//   }

//   createNewPostForTitle(text: string) {
//     if (this.isBlank(text) || !this.topic) return;
//     const req = { topicId: this.topic.topicId, titleId: this.topic.titleId, descriptionMd: text };
//     this.subs.add(
//       this.forumService.createPost(req).subscribe({
//         next: () => { if (this.topicId) this.fetch(this.topicId); },
//         error: (e) => console.error('create post failed', e)
//       })
//     );
//   }

//   onReplyToPost(post: PostDto) {
//     const ref = this.dialog.open(ReplyDialogComponent, {
//       width: '600px', maxWidth: '90vw',
//       data: { post, replyingTo: null } as ReplyDialogData
//     });
//     ref.afterClosed().subscribe(content => {
//       if (!content) return;
//       this.forumService.addReplyToPost(post.postId, content).subscribe({
//         next: () => { if (this.topicId) this.fetch(this.topicId); this.replySubmitted.emit(); }
//       });
//     });
//   }

//   onReplyToReply(parentPost: PostDto, reply: ReplyDto) {
//     const ref = this.dialog.open(ReplyDialogComponent, {
//       width: '600px', maxWidth: '90vw',
//       data: { post: parentPost, replyingTo: reply } as ReplyDialogData
//     });
//     ref.afterClosed().subscribe(content => {
//       if (!content) return;
//       this.forumService.addNestedReply(parentPost.postId, reply.replyId, content).subscribe({
//         next: () => { if (this.topicId) this.fetch(this.topicId); this.replySubmitted.emit(); }
//       });
//     });
//   }

//   onLikePost(post: PostDto) {
//   // backend toggles based on which id is present
//   this.forumService.toggleLike({ postId: post.postId, replyId: null }).subscribe({
//     next: () => {
//       // optimistic UI; if you prefer exact counts, re-fetch the topic here
//       post.likesCount = (post.likesCount ?? 0) + 1;
//     },
//     error: (e) => console.error('toggle like (post) failed', e)
//   });
// }

// onLikeReply(reply: ReplyDto) {
//   this.forumService.toggleLike({ postId: null, replyId: reply.replyId }).subscribe({
//     next: () => {
//       reply.likesCount = (reply.likesCount ?? 0) + 1;
//     },
//     error: (e) => console.error('toggle like (reply) failed', e)
//   });
// }


//   // --- UI helpers ---
//   isBlank(s?: string | null) { return !s || s.trim().length === 0; }
//   getTotalReplies(t: TopicDetailDto) { return (t.posts ?? []).reduce((a,p)=>a+(p.replyCount ?? (p.replies?.length ?? 0)),0); }
//   getTotalViews(t: TopicDetailDto) { return (t.posts ?? []).reduce((a,p)=>a+(p.viewsCount ?? 0),0); }
//   getTimeAgo(iso?: string | null): string {
//     if (!iso) return '';
//     const d = new Date(iso); const s = Math.floor((Date.now()-d.getTime())/1000);
//     if (s<60) return 'just now'; const m=Math.floor(s/60); if(m<60) return `${m}m ago`;
//     const h=Math.floor(m/60); if(h<24) return `${h}h ago`;
//     const days=Math.floor(h/24); if(days<7) return `${days}d ago`;
//     const w=Math.floor(days/7); return `${w}w ago`;
//   }
// }

// src/app/pages/apps/conversational_forum/topic-detail/topic-detail.component.ts
// import {
//   Component,
//   Input,
//   Output,
//   EventEmitter,
//   ViewChild,
//   ElementRef,
// } from '@angular/core';
// import { MatMenuTrigger } from '@angular/material/menu';
// import { ForumService, PostDto, ReplyDto, TitleDto,Page } from 'src/app/services/forum.service';
// import { finalize } from 'rxjs/operators';

// type ContextType = 'title' | 'post' | 'reply';
// export type TitleWithPostsVM = TitleDto & {
//   /** original page object from backend (if present) */
//   postsPage?: Page<PostDto> | null;
//   /** normalized list used by the template */
//   posts: PostDto[];
// };
// @Component({
//   selector: 'app-topic-detail',
//   standalone: true,
//   template: `
//     <!-- Context menu (right-click) -->
//     <div #contextAnchor [style.position]="'fixed'"
//          [style.left.px]="contextMenuPos.x"
//          [style.top.px]="contextMenuPos.y"></div>

//     <mat-menu #contextMenu="matMenu">
//       <button mat-menu-item (click)="onAction('edit')">
//         <mat-icon>edit</mat-icon><span>Edit</span>
//       </button>
//       <button mat-menu-item (click)="onAction('delete')">
//         <mat-icon>delete</mat-icon><span>Delete</span>
//       </button>
//       <button mat-menu-item (click)="onAction('report')">
//         <mat-icon>flag</mat-icon><span>Report</span>
//       </button>
//     </mat-menu>

//     <div class="topic-detail" *ngIf="topic">
//       <button class="back-btn" (click)="onBack()">
//         <mat-icon>arrow_back</mat-icon><span>Back to topics</span>
//       </button>

//       <!-- Title header / stats -->
//       <div class="title-card">
//         <div class="header-top">
//           <div class="topic-badges">
//             <span class="category-badge">{{ topic?.title || 'Topic' }}</span>
//           </div>
//           <div class="topic-stats">
//             <div class="stat-item"><mat-icon>forum</mat-icon><span>{{ getTotalReplies(topic) }}</span></div>
//             <div class="stat-item"><mat-icon>visibility</mat-icon><span>{{ getTotalViews(topic) }}</span></div>
//           </div>
//         </div>

//         <h1 class="topic-title"
//             (contextmenu)="openContextMenu($event, 'title', topic)">
//           {{ topic.title }}
//         </h1>

//         <div class="topic-footer">
//           <mat-icon>schedule</mat-icon>
//           <span>Last activity {{ getTimeAgo(topic.posts?.[0]?.lastActivityAt || topic.posts?.[0]?.createdAt) }}</span>
//         </div>
//       </div>

//       <!-- Post list -->
//       <div class="posts-container">
//         <div class="post-card"
//              *ngFor="let post of topic.posts; let i = index"
//              [class.main-post]="i === 0"
//              (contextmenu)="openContextMenu($event, 'post', post)">
//           <div class="post-header">
//             <div class="author-info">
//               <img [src]="defaultAvatar"
//                    [alt]="post.loginUserName || 'User avatar'"
//                    class="avatar" />
//               <div class="author-details">
//                 <div class="author-name">{{ post.loginUserName || 'User' }}</div>
//                 <div class="post-time"><mat-icon class="time-icon">schedule</mat-icon>{{ getTimeAgo(post.createdAt) }}</div>
//               </div>
//             </div>
//             <span *ngIf="post.pinned" class="author-badge"><mat-icon>push_pin</mat-icon>Pinned</span>
//           </div>

//           <div class="post-content">{{ post.content }}</div>

//           <div class="post-actions">
//             <button mat-stroked-button class="action-btn" (click)="onLikePost(post)" matTooltip="Like this post">
//               <mat-icon>thumb_up</mat-icon>
//               <span>
//                 {{ post.likesCount > 0 ? post.likesCount : '' }}
//                 {{ post.likesCount === 1 ? 'Like' : (post.likesCount > 1 ? 'Likes' : 'Like') }}
//               </span>
//             </button>

//             <button mat-stroked-button class="action-btn reply-btn" (click)="onReplyToPost(post)" matTooltip="Reply">
//               <mat-icon>reply</mat-icon><span>Reply</span>
//             </button>
//           </div>

//           <!-- replies -->
//           <div *ngIf="(post.replies?.length ?? 0) > 0" class="replies-section" [class.flat]="i === 0">
//             <div class="replies-header">
//               <mat-icon>{{ i === 0 ? 'forum' : 'subdirectory_arrow_right' }}</mat-icon>
//               <span>
//                 {{ post.replies?.length ?? 0 }}
//                 {{ (post.replies?.length ?? 0) === 1 ? 'Reply' : 'Replies' }}
//               </span>
//             </div>

//             <div class="reply-card"
//                  *ngFor="let reply of (post.replies ?? [])"
//                  (contextmenu)="openContextMenu($event, 'reply', reply, post)">
//               <div class="author-info">
//                 <img [src]="defaultAvatar" [alt]="reply.loginUserName || 'User avatar'" class="avatar-small" />
//                 <div class="author-details">
//                   <div class="author-name">{{ reply.loginUserName || 'User' }}</div>
//                   <div class="post-time">{{ getTimeAgo(reply.createdAt) }}</div>
//                 </div>
//               </div>
//               <div class="reply-content">{{ reply.content }}</div>
//               <div class="reply-actions">
//                 <button class="action-btn-reply" (click)="onLikeReply(reply)" matTooltip="Like">
//                   <mat-icon>thumb_up</mat-icon>
//                   <span *ngIf="(reply.likesCount ?? 0) > 0">{{ reply.likesCount }}</span>
//                   <span>Like{{ (reply.likesCount ?? 0) !== 1 ? 's' : '' }}</span>
//                 </button>
//                 <button class="action-btn-reply reply" (click)="onReplyToReply(post, reply)" matTooltip="Reply">
//                   <mat-icon>reply</mat-icon><span>Reply</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <!-- Composer (Create Post for this Title) -->
//       <div class="reply-form">
//         <div class="reply-form-header">
//           <mat-icon>rate_review</mat-icon>
//           <h3 class="reply-form-title">Join the discussion</h3>
//         </div>

//         <textarea class="reply-textarea"
//                   placeholder="Share your thoughts, ask questions, or provide feedback..."
//                   rows="5"
//                   [(ngModel)]="newPostText"></textarea>

//         <div class="reply-form-actions">
//           <button mat-button (click)="newPostText=''" [disabled]="isBlank(newPostText)">
//             <mat-icon>close</mat-icon> Cancel
//           </button>

//           <button mat-raised-button color="primary" class="post-btn"
//                   [disabled]="isBlank(newPostText)"
//                   (click)="createNewPostForTitle(newPostText); newPostText=''">
//             <mat-icon>send</mat-icon> Create Post
//           </button>
//         </div>
//       </div>
//     </div>

//     <!-- Context menu trigger (programmatic) -->
//     <button mat-icon-button #menuTrigger="matMenuTrigger" [matMenuTriggerFor]="contextMenu" style="display:none"></button>
//   `,
//   styles: [`
//     .topic-detail{max-width:100%;display:flex;flex-direction:column;gap:1.25rem}
//     .title-card{background:#f8fbff;border-radius:.75rem;padding:1.25rem;border:1px solid #dbeafe}
//     .header-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:.5rem}
//     .topic-badges{display:flex;gap:.5rem}
//     .category-badge{background:#eef2ff;color:#4338ca;border-radius:9999px;padding:.25rem .6rem;font-size:.75rem;font-weight:600}
//     .topic-stats{display:flex;gap:1rem;color:#6b7280}
//     .stat-item{display:flex;align-items:center;gap:.25rem}
//     .topic-title{margin:0 0 .25rem 0;font-size:1.6rem;font-weight:800;color:#111827; cursor:context-menu;}
//     .topic-footer{display:flex;align-items:center;gap:.4rem;color:#6b7280;font-size:.9rem}
//     .posts-container{display:flex;flex-direction:column;gap:1rem}
//     .post-card{background:#fff;border-radius:.75rem;padding:1.25rem;border:1px solid #e5e7eb}
//     .post-card.main-post{border:2px solid #93c5fd}
//     .post-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem}
//     .author-info{display:flex;align-items:center;gap:.75rem}
//     .avatar{width:40px;height:40px;border-radius:50%;object-fit:cover}
//     .avatar-small{width:32px;height:32px;border-radius:50%;object-fit:cover}
//     .author-details{display:flex;flex-direction:column;line-height:1.2}
//     .author-name{font-weight:700;color:#111827}
//     .post-time{display:flex;align-items:center;gap:.3rem;color:#6b7280;font-size:.8rem}
//     .author-badge{background:#e0f2f1;color:#0d9488;border-radius:9999px;padding:.2rem .6rem;font-size:.75rem;font-weight:600;display:inline-flex;align-items:center;gap:.25rem}
//     .post-content{line-height:1.7;color:#374151;margin:.5rem 0 1rem}
//     .post-actions{display:flex;gap:.6rem;border-top:1px solid #f3f4f6;padding-top:.75rem}
//     .replies-section{margin-top:1rem;padding-left:1.25rem;border-left:3px solid #e5e7eb;display:flex;flex-direction:column;gap:.75rem}
//     .replies-header{display:flex;align-items:center;gap:.4rem;color:#4b5563;font-weight:600}
//     .reply-card{background:#f9fafb;border:1px solid #f3f4f6;border-radius:.5rem;padding:.75rem}
//     .reply-content{color:#4b5563;line-height:1.6;margin:.5rem 0}
//     .reply-actions{display:flex;gap:.8rem}
//     .action-btn-reply{display:inline-flex;align-items:center;gap:.25rem;background:none;border:none;color:#6b7280;font-weight:600;cursor:pointer}
//     .action-btn-reply:hover{color:#3b82f6}
//     .reply-form{background:#fff;border-radius:.75rem;padding:1.25rem;border:1px solid #e5e7eb}
//     .reply-form-header{display:flex;align-items:center;gap:.5rem;margin-bottom:.75rem;border-bottom:1px solid #f3f4f6;padding-bottom:.5rem}
//     .reply-textarea{width:100%;min-height:120px;padding:.75rem;border:1px solid #d1d5db;border-radius:.5rem;resize:vertical}
//     .reply-form-actions{display:flex;justify-content:flex-end;gap:.6rem;margin-top:.75rem}
//     .back-btn{display:inline-flex;align-items:center;gap:.4rem}
//     @media (max-width:640px){.post-card{padding:1rem}.replies-section{padding-left:.75rem}}
//   `]
// })
// export class TopicDetailComponent {
//   @Input() topic!: TitleWithPostsVM; // treat posts as array (your template expects array)
//   @Output() back = new EventEmitter<void>();
//   @Output() replySubmitted = new EventEmitter<{ postId: number }>();

//   @ViewChild('menuTrigger', { read: MatMenuTrigger }) menuTrigger!: MatMenuTrigger;
//   @ViewChild('contextAnchor') contextAnchor!: ElementRef<HTMLElement>;

//   defaultAvatar = '/assets/images/users/1.jpg';
//   newPostText = '';

//   // context menu state
//   contextMenuPos = { x: 0, y: 0 };
//   private context: { type: ContextType; target: any; parentPost?: PostDto } | null = null;

//   isBusy = false;

//   constructor(private forum: ForumService) {}

//   // ---- UI helpers ----
//   isBlank(v: string | null | undefined) { return !v || !v.trim(); }

//   getTimeAgo(iso?: string | null): string {
//     if (!iso) return 'just now';
//     const then = new Date(iso).getTime();
//     const now = Date.now();
//     const s = Math.max(1, Math.floor((now - then) / 1000));
//     if (s < 60) return `${s}s ago`;
//     const m = Math.floor(s / 60);
//     if (m < 60) return `${m}m ago`;
//     const h = Math.floor(m / 60);
//     if (h < 24) return `${h}h ago`;
//     const d = Math.floor(h / 24);
//     return `${d}d ago`;
//   }

//   getTotalReplies(t: TitleWithPostsVM) {
//     return (t.posts || []).reduce((acc, p) => acc + (p.replyCount ?? p.replies?.length ?? 0), 0);
//     // you also render replies array, so this stays consistent
//   }

//   getTotalViews(t: TitleWithPostsVM) {
//     return (t.posts || []).reduce((acc, p) => acc + (p.viewsCount || 0), 0);
//   }

//   onBack() { this.back.emit(); }

//   // ---- Context menu ----
//   openContextMenu(event: MouseEvent, type: ContextType, target: any, parentPost?: PostDto) {
//     event.preventDefault();
//     this.contextMenuPos = { x: event.clientX, y: event.clientY };
//     this.context = { type, target, parentPost };
//     // Note: Angular Material anchors to the trigger element; we still open programmatically.
//     // Menu will open at the hidden trigger; your fixed-position anchor div marks the pointer for any future custom positioning needs.
//     this.menuTrigger.openMenu();
//   }

//   onAction(action: 'edit' | 'delete' | 'report') {
//     if (!this.context) return;
//     const { type, target, parentPost } = this.context;

//     if (action === 'edit') this.editItem(type, target);
//     if (action === 'delete') this.deleteItem(type, target, parentPost);
//     if (action === 'report') this.reportItem(type, target);
//   }

//   // ---- Actions ----
//   private editItem(type: ContextType, target: any) {
//     if (type === 'title') {
//       const newTitle = prompt('Edit title', this.topic.title || '');
//       if (newTitle == null || !newTitle.trim()) return;

//       const newDesc = prompt('Edit description (Markdown)', (this.topic as any).descriptionMd || '');
//       // description is optional in edit; send if provided
//       this.isBusy = true;
//       this.forum.edit({
//         titleId: (this.topic as any).titleId,
//         newTitle: newTitle.trim(),
//         newDescriptionMd: newDesc ?? undefined
//       }).pipe(finalize(() => (this.isBusy = false)))
//         .subscribe(updated => {
//           if ((updated as any).title) {
//             this.topic.title = (updated as any).title;
//             (this.topic as any).descriptionMd = (updated as any).descriptionMd ?? (this.topic as any).descriptionMd;
//           }
//         });
//     }

//     if (type === 'post') {
//       const post: PostDto = target;
//       const edited = prompt('Edit post (Markdown)', post.content || '');
//       if (edited == null || !edited.trim()) return;

//       this.isBusy = true;
//       this.forum.edit({
//         postId: post.postId,
//         newContentMd: edited.trim()
//       }).pipe(finalize(() => (this.isBusy = false)))
//         .subscribe(updated => {
//           if ((updated as any).postId === post.postId) {
//             post.content = (updated as any).content;
//             post.editedAt = (updated as any).editedAt ?? new Date().toISOString();
//           }
//         });
//     }

//     if (type === 'reply') {
//       const reply: ReplyDto = target;
//       const edited = prompt('Edit reply (Markdown)', reply.content || '');
//       if (edited == null || !edited.trim()) return;

//       this.isBusy = true;
//       this.forum.edit({
//         replyId: reply.replyId,
//         newContentMd: edited.trim()
//       }).pipe(finalize(() => (this.isBusy = false)))
//         .subscribe(updated => {
//           if ((updated as any).replyId === reply.replyId) {
//             reply.content = (updated as any).content;
//             reply.editedAt = (updated as any).editedAt ?? new Date().toISOString();
//           }
//         });
//     }
//   }

//   private deleteItem(type: ContextType, target: any, parentPost?: PostDto) {
//     if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

//     if (type === 'post') {
//       const post: PostDto = target;
//       this.isBusy = true;
//       this.forum.deleteItem({ postId: post.postId })
//         .pipe(finalize(() => (this.isBusy = false)))
//         .subscribe(() => {
//           const idx = this.topic.posts.findIndex(p => p.postId === post.postId);
//           if (idx >= 0) this.topic.posts.splice(idx, 1);
//         });
//     }

//     if (type === 'reply') {
//       const reply: ReplyDto = target;
//       this.isBusy = true;
//       this.forum.deleteItem({ replyId: reply.replyId })
//         .pipe(finalize(() => (this.isBusy = false)))
//         .subscribe(() => {
//           // remove from its parent post replies
//           const p = parentPost ?? this.topic.posts.find(pp => (pp.replies ?? []).some(r => r.replyId === reply.replyId));
//           if (p?.replies) {
//             const idx = p.replies.findIndex(r => r.replyId === reply.replyId);
//             if (idx >= 0) p.replies.splice(idx, 1);
//           }
//         });
//     }

//     if (type === 'title') {
//       const titleId = (this.topic as any).titleId;
//       this.isBusy = true;
//       this.forum.deleteTitle(titleId)
//         .pipe(finalize(() => (this.isBusy = false)))
//         .subscribe(() => {
//           // Bubble back to list after delete
//           alert('Title deleted');
//           this.onBack();
//         });
//     }
//   }

//   private reportItem(type: ContextType, target: any) {
//     if (type === 'post') {
//       const post: PostDto = target;
//       this.forum.reportItem({ postId: post.postId }).subscribe(res => {
//         alert(`Reported post (#${res.post_id}). Total reports: ${res.report_count}`);
//       });
//     } else if (type === 'reply') {
//       const reply: ReplyDto = target;
//       this.forum.reportItem({ replyId: reply.replyId }).subscribe(res => {
//         alert(`Reported reply (#${res.reply_id}). Total reports: ${res.report_count}`);
//       });
//     } else {
//       alert('Reporting a title is not supported via this menu.');
//     }
//   }

//   // ---- Likes ----
//   onLikePost(post: PostDto) {
//     this.forum.toggleLike({ postId: post.postId }).subscribe(newCount => {
//       post.likesCount = newCount;
//     });
//   }

//   onLikeReply(reply: ReplyDto) {
//     this.forum.toggleLike({ replyId: reply.replyId }).subscribe(newCount => {
//       (reply as any).likesCount = newCount;
//     });
//   }

//   // ---- Compose ----
//   createNewPostForTitle(markdown: string) {
//     if (this.isBlank(markdown)) return;
//     const req = {
//       topicId: (this.topic as any).topicId,
//       titleId: (this.topic as any).titleId,
//       descriptionMd: markdown.trim(),
//     };
//     this.isBusy = true;
//     this.forum.createPost(req).pipe(finalize(() => (this.isBusy = false)))
//       .subscribe(created => {
//         // add as newest post on top
//         const newPost: PostDto = {
//           ...created,
//           replies: created.replies ?? [],
//         };
//         this.topic.posts = [newPost, ...(this.topic.posts || [])];
//         this.replySubmitted.emit({ postId: newPost.postId });
//       });
//   }

//   onReplyToPost(post: PostDto) {
//     const content = prompt('Write your reply (Markdown)');
//     if (!content || !content.trim()) return;

//     const req = {
//       postId: post.postId,
//       parentReplyId: null,
//       contentMd: content.trim(),
//     };
//     this.forum.createReply(req).subscribe(created => {
//       post.replies = post.replies ?? [];
//       post.replies.push(created);
//       post.replyCount = (post.replyCount || 0) + 1;
//       this.replySubmitted.emit({ postId: post.postId });
//     });
//   }

//   onReplyToReply(post: PostDto, parent: ReplyDto) {
//     const content = prompt('Reply to this comment (Markdown)');
//     if (!content || !content.trim()) return;

//     const req = {
//       postId: post.postId,
//       parentReplyId: parent.replyId,
//       contentMd: content.trim(),
//     };
//     this.forum.createReply(req).subscribe(created => {
//       post.replies = post.replies ?? [];
//       post.replies.push(created); // flat list render
//       post.replyCount = (post.replyCount || 0) + 1;
//       this.replySubmitted.emit({ postId: post.postId });
//     });
//   }
// }
// // src/app/pages/apps/conversational_forum/topic-detail/topic-detail.component.ts
// import {
//   Component, Input, Output, EventEmitter, ViewChild, ElementRef
// } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { finalize } from 'rxjs/operators';

// import { ForumService, PostDto, ReplyDto, TitleDto, Page } from 'src/app/services/forum.service';

// export type TitleWithPostsVM = TitleDto & {
//   /** Keep original page (if backend returns Page<PostDto>) */
//   postsPage?: Page<PostDto> | null;
//   /** Normalized array used by the template */
//   posts: PostDto[];
// };

// type ContextType = 'title' | 'post' | 'reply';

// @Component({
//   selector: 'app-topic-detail',
//   standalone: true,
//   imports: [CommonModule, FormsModule, MatMenuModule, MatIconModule, MatButtonModule, MatTooltipModule],
//   template: `
//     <!-- Context menu (right-click) -->
//     <div #contextAnchor [style.position]="'fixed'"
//          [style.left.px]="contextMenuPos.x"
//          [style.top.px]="contextMenuPos.y"></div>

//     <mat-menu #contextMenu="matMenu">
//       <button mat-menu-item (click)="onAction('edit')">
//         <mat-icon>edit</mat-icon><span>Edit</span>
//       </button>
//       <button mat-menu-item (click)="onAction('delete')">
//         <mat-icon>delete</mat-icon><span>Delete</span>
//       </button>
//       <button mat-menu-item (click)="onAction('report')">
//         <mat-icon>flag</mat-icon><span>Report</span>
//       </button>
//     </mat-menu>

//     <div class="topic-detail" *ngIf="topic">
//       <button class="back-btn" (click)="onBack()">
//         <mat-icon>arrow_back</mat-icon><span>Back to topics</span>
//       </button>

//       <!-- Title header / stats -->
//       <div class="title-card">
//         <div class="header-top">
//           <div class="topic-badges">
//             <span class="category-badge">{{ topic?.title || 'Topic' }}</span>
//           </div>
//           <div class="topic-stats">
//             <div class="stat-item"><mat-icon>forum</mat-icon><span>{{ getTotalReplies(topic) }}</span></div>
//             <div class="stat-item"><mat-icon>visibility</mat-icon><span>{{ getTotalViews(topic) }}</span></div>
//           </div>
//         </div>

//         <h1 class="topic-title"
//             (contextmenu)="openContextMenu($event, 'title', topic)">
//           {{ topic.title }}
//         </h1>

//         <div class="topic-footer">
//           <mat-icon>schedule</mat-icon>
//           <span>Last activity {{ getTimeAgo(topic.posts?.[0]?.lastActivityAt || topic.posts?.[0]?.createdAt) }}</span>
//         </div>
//       </div>

//       <!-- Post list -->
//       <div class="posts-container">
//         <div class="post-card"
//              *ngFor="let post of topic.posts; let i = index"
//              [class.main-post]="i === 0"
//              (contextmenu)="openContextMenu($event, 'post', post)">
//           <div class="post-header">
//             <div class="author-info">
//               <img [src]="defaultAvatar"
//                    [alt]="post.loginUserName || 'User avatar'"
//                    class="avatar" />
//               <div class="author-details">
//                 <div class="author-name">{{ post.loginUserName || 'User' }}</div>
//                 <div class="post-time"><mat-icon class="time-icon">schedule</mat-icon>{{ getTimeAgo(post.createdAt) }}</div>
//               </div>
//             </div>
//             <span *ngIf="post.pinned" class="author-badge"><mat-icon>push_pin</mat-icon>Pinned</span>
//           </div>

//           <div class="post-content">{{ post.content }}</div>

//           <div class="post-actions">
//             <button mat-stroked-button class="action-btn" (click)="onLikePost(post)" matTooltip="Like this post">
//               <mat-icon>thumb_up</mat-icon>
//               <span>
//                 {{ post.likesCount > 0 ? post.likesCount : '' }}
//                 {{ post.likesCount === 1 ? 'Like' : (post.likesCount > 1 ? 'Likes' : 'Like') }}
//               </span>
//             </button>

//             <button mat-stroked-button class="action-btn reply-btn" (click)="onReplyToPost(post)" matTooltip="Reply">
//               <mat-icon>reply</mat-icon><span>Reply</span>
//             </button>
//           </div>

//           <!-- replies -->
//           <div *ngIf="(post.replies?.length ?? 0) > 0" class="replies-section" [class.flat]="i === 0">
//             <div class="replies-header">
//               <mat-icon>{{ i === 0 ? 'forum' : 'subdirectory_arrow_right' }}</mat-icon>
//               <span>
//                 {{ post.replies?.length ?? 0 }}
//                 {{ (post.replies?.length ?? 0) === 1 ? 'Reply' : 'Replies' }}
//               </span>
//             </div>

//             <div class="reply-card"
//                  *ngFor="let reply of (post.replies ?? [])"
//                  (contextmenu)="openContextMenu($event, 'reply', reply, post)">
//               <div class="author-info">
//                 <img [src]="defaultAvatar" [alt]="reply.loginUserName || 'User avatar'" class="avatar-small" />
//                 <div class="author-details">
//                   <div class="author-name">{{ reply.loginUserName || 'User' }}</div>
//                   <div class="post-time">{{ getTimeAgo(reply.createdAt) }}</div>
//                 </div>
//               </div>
//               <div class="reply-content">{{ reply.content }}</div>
//               <div class="reply-actions">
//                 <button class="action-btn-reply" (click)="onLikeReply(reply)" matTooltip="Like">
//                   <mat-icon>thumb_up</mat-icon>
//                   <span *ngIf="(reply.likesCount ?? 0) > 0">{{ reply.likesCount }}</span>
//                   <span>Like{{ (reply.likesCount ?? 0) !== 1 ? 's' : '' }}</span>
//                 </button>
//                 <button class="action-btn-reply reply" (click)="onReplyToReply(post, reply)" matTooltip="Reply">
//                   <mat-icon>reply</mat-icon><span>Reply</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <!-- Composer (Create Post for this Title) -->
//       <div class="reply-form">
//         <div class="reply-form-header">
//           <mat-icon>rate_review</mat-icon>
//           <h3 class="reply-form-title">Join the discussion</h3>
//         </div>

//         <textarea class="reply-textarea"
//                   placeholder="Share your thoughts, ask questions, or provide feedback..."
//                   rows="5"
//                   [(ngModel)]="newPostText"></textarea>

//         <div class="reply-form-actions">
//           <button mat-button (click)="newPostText=''" [disabled]="isBlank(newPostText)">
//             <mat-icon>close</mat-icon> Cancel
//           </button>

//         <button mat-raised-button color="primary" class="post-btn"
//                 [disabled]="isBlank(newPostText)"
//                 (click)="createNewPostForTitle(newPostText); newPostText=''">
//           <mat-icon>send</mat-icon> Create Post
//         </button>
//         </div>
//       </div>
//     </div>

//     <!-- Context menu trigger (programmatic) -->
//     <button mat-icon-button #menuTrigger="matMenuTrigger" [matMenuTriggerFor]="contextMenu" style="display:none"></button>
//   `,
//   styles: [`
//     .topic-detail{max-width:100%;display:flex;flex-direction:column;gap:1.25rem}
//     .title-card{background:#f8fbff;border-radius:.75rem;padding:1.25rem;border:1px solid #dbeafe}
//     .header-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:.5rem}
//     .topic-badges{display:flex;gap:.5rem}
//     .category-badge{background:#eef2ff;color:#4338ca;border-radius:9999px;padding:.25rem .6rem;font-size:.75rem;font-weight:600}
//     .topic-stats{display:flex;gap:1rem;color:#6b7280}
//     .stat-item{display:flex;align-items:center;gap:.25rem}
//     .topic-title{margin:0 0 .25rem 0;font-size:1.6rem;font-weight:800;color:#111827; cursor:context-menu;}
//     .topic-footer{display:flex;align-items:center;gap:.4rem;color:#6b7280;font-size:.9rem}
//     .posts-container{display:flex;flex-direction:column;gap:1rem}
//     .post-card{background:#fff;border-radius:.75rem;padding:1.25rem;border:1px solid #e5e7eb}
//     .post-card.main-post{border:2px solid #93c5fd}
//     .post-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem}
//     .author-info{display:flex;align-items:center;gap:.75rem}
//     .avatar{width:40px;height:40px;border-radius:50%;object-fit:cover}
//     .avatar-small{width:32px;height:32px;border-radius:50%;object-fit:cover}
//     .author-details{display:flex;flex-direction:column;line-height:1.2}
//     .author-name{font-weight:700;color:#111827}
//     .post-time{display:flex;align-items:center;gap:.3rem;color:#6b7280;font-size:.8rem}
//     .author-badge{background:#e0f2f1;color:#0d9488;border-radius:9999px;padding:.2rem .6rem;font-size:.75rem;font-weight:600;display:inline-flex;align-items:center;gap:.25rem}
//     .post-content{line-height:1.7;color:#374151;margin:.5rem 0 1rem}
//     .post-actions{display:flex;gap:.6rem;border-top:1px solid #f3f4f6;padding-top:.75rem}
//     .replies-section{margin-top:1rem;padding-left:1.25rem;border-left:3px solid #e5e7eb;display:flex;flex-direction:column;gap:.75rem}
//     .replies-header{display:flex;align-items:center;gap:.4rem;color:#4b5563;font-weight:600}
//     .reply-card{background:#f9fafb;border:1px solid #f3f4f6;border-radius:.5rem;padding:.75rem}
//     .reply-content{color:#4b5563;line-height:1.6;margin:.5rem 0}
//     .reply-actions{display:flex;gap:.8rem}
//     .action-btn-reply{display:inline-flex;align-items:center;gap:.25rem;background:none;border:none;color:#6b7280;font-weight:600;cursor:pointer}
//     .action-btn-reply:hover{color:#3b82f6}
//     .reply-form{background:#fff;border-radius:.75rem;padding:1.25rem;border:1px solid #e5e7eb}
//     .reply-form-header{display:flex;align-items:center;gap:.5rem;margin-bottom:.75rem;border-bottom:1px solid #f3f4f6;padding-bottom:.5rem}
//     .reply-textarea{width:100%;min-height:120px;padding:.75rem;border:1px solid #d1d5db;border-radius:.5rem;resize:vertical}
//     .reply-form-actions{display:flex;justify-content:flex-end;gap:.6rem;margin-top:.75rem}
//     .back-btn{display:inline-flex;align-items:center;gap:.4rem}
//     @media (max-width:640px){.post-card{padding:1rem}.replies-section{padding-left:.75rem}}
//   `]
// })
// export class TopicDetailComponent {
//   /** Expect the VM with posts as a plain array (created in forum-main via toVM()). */
//   @Input() topic!: TitleWithPostsVM;
//   @Output() back = new EventEmitter<void>();
//   @Output() replySubmitted = new EventEmitter<{ postId: number }>();

//   @ViewChild('menuTrigger', { read: MatMenuTrigger }) menuTrigger!: MatMenuTrigger;
//   @ViewChild('contextAnchor') contextAnchor!: ElementRef<HTMLElement>;

//   defaultAvatar = '/assets/images/users/1.jpg';
//   newPostText = '';

//   // context menu state
//   contextMenuPos = { x: 0, y: 0 };
//   private context: { type: ContextType; target: any; parentPost?: PostDto } | null = null;

//   isBusy = false;

//   constructor(private forum: ForumService) {}

//   // -------- UI helpers ----------
//   isBlank(v: string | null | undefined) { return !v || !v.trim(); }

//   getTimeAgo(iso?: string | null): string {
//     if (!iso) return 'just now';
//     const then = new Date(iso).getTime();
//     const now = Date.now();
//     const s = Math.max(1, Math.floor((now - then) / 1000));
//     if (s < 60) return `${s}s ago`;
//     const m = Math.floor(s / 60);
//     if (m < 60) return `${m}m ago`;
//     const h = Math.floor(m / 60);
//     if (h < 24) return `${h}h ago`;
//     const d = Math.floor(h / 24);
//     return `${d}d ago`;
//   }

//   getTotalReplies(t: TitleWithPostsVM) {
//     return (t.posts || []).reduce((acc, p) => acc + (p.replyCount ?? p.replies?.length ?? 0), 0);
//   }

//   getTotalViews(t: TitleWithPostsVM) {
//     return (t.posts || []).reduce((acc, p) => acc + (p.viewsCount || 0), 0);
//   }

//   onBack() { this.back.emit(); }

//   // -------- Context menu ----------
//   openContextMenu(event: MouseEvent, type: ContextType, target: any, parentPost?: PostDto) {
//     event.preventDefault();
//     this.contextMenuPos = { x: event.clientX, y: event.clientY };
//     this.context = { type, target, parentPost };
//     this.menuTrigger.openMenu();
//   }

//   onAction(action: 'edit' | 'delete' | 'report') {
//     if (!this.context) return;
//     const { type, target, parentPost } = this.context;

//     if (action === 'edit')   this.editItem(type, target);
//     if (action === 'delete') this.deleteItem(type, target, parentPost);
//     if (action === 'report') this.reportItem(type, target);
//   }

//   // -------- Actions: Edit/Delete/Report ----------
//   private editItem(type: ContextType, target: any) {
//     if (type === 'title') {
//       const newTitle = prompt('Edit title', this.topic.title || '');
//       if (newTitle == null || !newTitle.trim()) return;

//       const newDesc = prompt('Edit description (Markdown)', (this.topic as any).descriptionMd || '');
//       this.isBusy = true;
//       this.forum.edit({
//         titleId: (this.topic as any).titleId,
//         newTitle: newTitle.trim(),
//         newDescriptionMd: newDesc ?? undefined
//       }).pipe(finalize(() => (this.isBusy = false)))
//         .subscribe(updated => {
//           if ((updated as any).title) {
//             this.topic.title = (updated as any).title;
//             (this.topic as any).descriptionMd = (updated as any).descriptionMd ?? (this.topic as any).descriptionMd;
//           }
//         });
//     }

//     if (type === 'post') {
//       const post: PostDto = target;
//       const edited = prompt('Edit post (Markdown)', post.content || '');
//       if (edited == null || !edited.trim()) return;

//       this.isBusy = true;
//       this.forum.edit({
//         postId: post.postId,
//         newContentMd: edited.trim()
//       }).pipe(finalize(() => (this.isBusy = false)))
//         .subscribe(updated => {
//           if ((updated as any).postId === post.postId) {
//             post.content = (updated as any).content;
//             post.editedAt = (updated as any).editedAt ?? new Date().toISOString();
//           }
//         });
//     }

//     if (type === 'reply') {
//       const reply: ReplyDto = target;
//       const edited = prompt('Edit reply (Markdown)', reply.content || '');
//       if (edited == null || !edited.trim()) return;

//       this.isBusy = true;
//       this.forum.edit({
//         replyId: reply.replyId,
//         newContentMd: edited.trim()
//       }).pipe(finalize(() => (this.isBusy = false)))
//         .subscribe(updated => {
//           if ((updated as any).replyId === reply.replyId) {
//             reply.content = (updated as any).content;
//             reply.editedAt = (updated as any).editedAt ?? new Date().toISOString();
//           }
//         });
//     }
//   }

//   private deleteItem(type: ContextType, target: any, parentPost?: PostDto) {
//     if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

//     if (type === 'post') {
//       const post: PostDto = target;
//       this.isBusy = true;
//       this.forum.deleteItem({ postId: post.postId })
//         .pipe(finalize(() => (this.isBusy = false)))
//         .subscribe(() => {
//           const idx = this.topic.posts.findIndex(p => p.postId === post.postId);
//           if (idx >= 0) this.topic.posts.splice(idx, 1);
//         });
//     }

//     if (type === 'reply') {
//       const reply: ReplyDto = target;
//       this.isBusy = true;
//       this.forum.deleteItem({ replyId: reply.replyId })
//         .pipe(finalize(() => (this.isBusy = false)))
//         .subscribe(() => {
//           const p = parentPost ?? this.topic.posts.find(pp => (pp.replies ?? []).some(r => r.replyId === reply.replyId));
//           if (p?.replies) {
//             const idx = p.replies.findIndex(r => r.replyId === reply.replyId);
//             if (idx >= 0) p.replies.splice(idx, 1);
//           }
//         });
//     }

//     if (type === 'title') {
//       const titleId = (this.topic as any).titleId;
//       this.isBusy = true;
//       this.forum.deleteTitle(titleId)
//         .pipe(finalize(() => (this.isBusy = false)))
//         .subscribe(() => {
//           alert('Title deleted');
//           this.onBack();
//         });
//     }
//   }

//   private reportItem(type: ContextType, target: any) {
//     if (type === 'post') {
//       const post: PostDto = target;
//       this.forum.reportItem({ postId: post.postId }).subscribe(res => {
//         alert(`Reported post (#${res.post_id}). Total reports: ${res.report_count}`);
//       });
//     } else if (type === 'reply') {
//       const reply: ReplyDto = target;
//       this.forum.reportItem({ replyId: reply.replyId }).subscribe(res => {
//         alert(`Reported reply (#${res.reply_id}). Total reports: ${res.report_count}`);
//       });
//     } else {
//       alert('Reporting a title is not supported via this menu.');
//     }
//   }

//   // -------- Likes ----------
//   onLikePost(post: PostDto) {
//     this.forum.toggleLike({ postId: post.postId }).subscribe(newCount => {
//       post.likesCount = newCount;
//     });
//   }

//   onLikeReply(reply: ReplyDto) {
//     this.forum.toggleLike({ replyId: reply.replyId }).subscribe(newCount => {
//       (reply as any).likesCount = newCount;
//     });
//   }

//   // -------- Compose ----------
//   createNewPostForTitle(markdown: string) {
//     if (this.isBlank(markdown)) return;
//     const req = {
//       topicId: (this.topic as any).topicId,
//       titleId: (this.topic as any).titleId,
//       descriptionMd: markdown.trim(),
//     };
//     this.isBusy = true;
//     this.forum.createPost(req).pipe(finalize(() => (this.isBusy = false)))
//       .subscribe(created => {
//         const newPost: PostDto = { ...created, replies: created.replies ?? [] };
//         this.topic.posts = [newPost, ...(this.topic.posts || [])];
//         this.replySubmitted.emit({ postId: newPost.postId });
//       });
//   }

//   onReplyToPost(post: PostDto) {
//     const content = prompt('Write your reply (Markdown)');
//     if (!content || !content.trim()) return;

//     const req = { postId: post.postId, parentReplyId: null, contentMd: content.trim() };
//     this.forum.createReply(req).subscribe(created => {
//       post.replies = post.replies ?? [];
//       post.replies.push(created);
//       post.replyCount = (post.replyCount || 0) + 1;
//       this.replySubmitted.emit({ postId: post.postId });
//     });
//   }

//   onReplyToReply(post: PostDto, parent: ReplyDto) {
//     const content = prompt('Reply to this comment (Markdown)');
//     if (!content || !content.trim()) return;

//     const req = { postId: post.postId, parentReplyId: parent.replyId, contentMd: content.trim() };
//     this.forum.createReply(req).subscribe(created => {
//       post.replies = post.replies ?? [];
//       post.replies.push(created); // flat render
//       post.replyCount = (post.replyCount || 0) + 1;
//       this.replySubmitted.emit({ postId: post.postId });
//     });
//   }
// }


// src/app/pages/apps/conversational_forum/topic-detail/topic-detail.component.ts
// import {
//   Component, Input, Output, EventEmitter, ViewChild, ElementRef
// } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { finalize } from 'rxjs/operators';

// import { ForumService, PostDto, ReplyDto, TitleDto, Page } from 'src/app/services/forum.service';

// // Important: do NOT extend TitleDto directly because TitleDto.posts is (Page<PostDto> & PostDto[]).
// // Instead, omit 'posts' and redefine it as a pure array for the view.
// export type TitleWithPostsVM = Omit<TitleDto, 'posts'> & {
//   postsPage?: Page<PostDto> | null; // keep original page if backend returned Page<>
//   posts: PostDto[];                 // normalized array used by the template
// };

// type ContextType = 'title' | 'post' | 'reply';

// @Component({
//   selector: 'app-topic-detail',
//   standalone: true,
//   imports: [CommonModule, FormsModule, MatMenuModule, MatIconModule, MatButtonModule, MatTooltipModule],
//   template: `
//     <!-- Context menu (right-click) -->
//     <div #contextAnchor [style.position]="'fixed'"
//          [style.left.px]="contextMenuPos.x"
//          [style.top.px]="contextMenuPos.y"></div>

//     <mat-menu #contextMenu="matMenu">
//       <button mat-menu-item (click)="onAction('edit')">
//         <mat-icon>edit</mat-icon><span>Edit</span>
//       </button>
//       <button mat-menu-item (click)="onAction('delete')">
//         <mat-icon>delete</mat-icon><span>Delete</span>
//       </button>
//       <button mat-menu-item (click)="onAction('report')">
//         <mat-icon>flag</mat-icon><span>Report</span>
//       </button>
//     </mat-menu>

//     <div class="topic-detail" *ngIf="topic">
//       <button class="back-btn" (click)="onBack()">
//         <mat-icon>arrow_back</mat-icon><span>Back to topics</span>
//       </button>

//       <!-- Title header / stats -->
//       <div class="title-card">
//         <div class="header-top">
//           <div class="topic-badges">
//             <span class="category-badge">{{ topic?.title || 'Topic' }}</span>
//           </div>
//           <div class="topic-stats">
//             <div class="stat-item"><mat-icon>forum</mat-icon><span>{{ getTotalReplies(topic) }}</span></div>
//             <div class="stat-item"><mat-icon>visibility</mat-icon><span>{{ getTotalViews(topic) }}</span></div>
//           </div>
//         </div>

//         <h1 class="topic-title"
//             (contextmenu)="openContextMenu($event, 'title', topic)">
//           {{ topic.title }}
//         </h1>

//         <div class="topic-footer">
//           <mat-icon>schedule</mat-icon>
//           <span>Last activity {{ getTimeAgo(topic.posts?.[0]?.lastActivityAt || topic.posts?.[0]?.createdAt) }}</span>
//         </div>
//       </div>

//       <!-- Post list -->
//       <div class="posts-container">
//         <div class="post-card"
//              *ngFor="let post of topic.posts; let i = index"
//              [class.main-post]="i === 0"
//              (contextmenu)="openContextMenu($event, 'post', post)">
//           <div class="post-header">
//             <div class="author-info">
//               <img [src]="defaultAvatar"
//                    [alt]="post.loginUserName || 'User avatar'"
//                    class="avatar" />
//               <div class="author-details">
//                 <div class="author-name">{{ post.loginUserName || 'User' }}</div>
//                 <div class="post-time"><mat-icon class="time-icon">schedule</mat-icon>{{ getTimeAgo(post.createdAt) }}</div>
//               </div>
//             </div>
//             <span *ngIf="post.pinned" class="author-badge"><mat-icon>push_pin</mat-icon>Pinned</span>
//           </div>

//           <div class="post-content">{{ post.content }}</div>

//           <div class="post-actions">
//             <button mat-stroked-button class="action-btn" (click)="onLikePost(post)" matTooltip="Like this post">
//               <mat-icon>thumb_up</mat-icon>
//               <span>
//                 {{ post.likesCount > 0 ? post.likesCount : '' }}
//                 {{ post.likesCount === 1 ? 'Like' : (post.likesCount > 1 ? 'Likes' : 'Like') }}
//               </span>
//             </button>

//             <button mat-stroked-button class="action-btn reply-btn" (click)="onReplyToPost(post)" matTooltip="Reply">
//               <mat-icon>reply</mat-icon><span>Reply</span>
//             </button>
//           </div>

//           <!-- replies -->
//           <div *ngIf="(post.replies?.length ?? 0) > 0" class="replies-section" [class.flat]="i === 0">
//             <div class="replies-header">
//               <mat-icon>{{ i === 0 ? 'forum' : 'subdirectory_arrow_right' }}</mat-icon>
//               <span>
//                 {{ post.replies?.length ?? 0 }}
//                 {{ (post.replies?.length ?? 0) === 1 ? 'Reply' : 'Replies' }}
//               </span>
//             </div>

//             <div class="reply-card"
//                  *ngFor="let reply of (post.replies ?? [])"
//                  (contextmenu)="openContextMenu($event, 'reply', reply, post)">
//               <div class="author-info">
//                 <img [src]="defaultAvatar" [alt]="reply.loginUserName || 'User avatar'" class="avatar-small" />
//                 <div class="author-details">
//                   <div class="author-name">{{ reply.loginUserName || 'User' }}</div>
//                   <div class="post-time">{{ getTimeAgo(reply.createdAt) }}</div>
//                 </div>
//               </div>
//               <div class="reply-content">{{ reply.content }}</div>
//               <div class="reply-actions">
//                 <button class="action-btn-reply" (click)="onLikeReply(reply)" matTooltip="Like">
//                   <mat-icon>thumb_up</mat-icon>
//                   <span *ngIf="(reply.likesCount ?? 0) > 0">{{ reply.likesCount }}</span>
//                   <span>Like{{ (reply.likesCount ?? 0) !== 1 ? 's' : '' }}</span>
//                 </button>
//                 <button class="action-btn-reply reply" (click)="onReplyToReply(post, reply)" matTooltip="Reply">
//                   <mat-icon>reply</mat-icon><span>Reply</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <!-- Composer (Create Post for this Title) -->
//       <div class="reply-form">
//         <div class="reply-form-header">
//           <mat-icon>rate_review</mat-icon>
//           <h3 class="reply-form-title">Join the discussion</h3>
//         </div>

//         <textarea class="reply-textarea"
//                   placeholder="Share your thoughts, ask questions, or provide feedback..."
//                   rows="5"
//                   [(ngModel)]="newPostText"></textarea>

//         <div class="reply-form-actions">
//           <button mat-button (click)="newPostText=''" [disabled]="isBlank(newPostText)">
//             <mat-icon>close</mat-icon> Cancel
//           </button>

//           <button mat-raised-button color="primary" class="post-btn"
//                   [disabled]="isBlank(newPostText)"
//                   (click)="createNewPostForTitle(newPostText); newPostText=''">
//             <mat-icon>send</mat-icon> Create Post
//           </button>
//         </div>
//       </div>
//     </div>

//     <!-- Context menu trigger (programmatic) -->
//     <button mat-icon-button #menuTrigger="matMenuTrigger" [matMenuTriggerFor]="contextMenu" style="display:none"></button>
//   `,
//   styles: [`
   
//     .topic-detail {
//       max-width: 100%;
//     }

//     .back-btn {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       padding: 0.625rem 1.125rem;
//       border: none;
//       background: white;
//       color: #6b7280;
//       border-radius: 0.5rem;
//       font-size: 0.9375rem;
//       font-weight: 500;
//       cursor: pointer;
//       margin-bottom: 1.5rem;
//       transition: all 0.2s;
//       box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
//     }

//     .back-btn:hover {
//       background: #f3f4f6;
//       color: #1f2937;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//     }

//     .back-btn mat-icon {
//       font-size: 20px;
//       width: 20px;
//       height: 20px;
//     }

//     .topic-header-inline {
//       padding-bottom: 1.5rem;
//       margin-bottom: 1.5rem;
//       border-bottom: 2px solid #e5e7eb;
//     }

//     .header-top {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       gap: 1rem;
//       margin-bottom: 1rem;
//     }

//     .topic-badges {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       flex-wrap: wrap;
//     }

//     .topic-stats {
//       display: flex;
//       gap: 1rem;
//       align-items: center;
//     }

//     .stat-item {
//       display: flex;
//       align-items: center;
//       gap: 0.375rem;
//       color: #6b7280;
//       font-size: 0.875rem;
//       font-weight: 600;
//     }

//     .stat-item mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     .category-badge {
//       display: flex;
//       align-items: center;
//       gap: 0.25rem;
//       padding: 0.375rem 0.75rem;
//       border-radius: 0.5rem;
//       font-size: 0.8125rem;
//       font-weight: 600;
//       background: #eff6ff;
//       color: #2563eb;
//     }

//     .category-badge[data-category="Tax & Legal"] {
//       background: #fef3c7;
//       color: #d97706;
//     }

//     .category-badge[data-category="Business Growth"] {
//       background: #d1fae5;
//       color: #059669;
//     }

//     .category-badge[data-category="Success Stories"] {
//       background: #fce7f3;
//       color: #db2777;
//     }

//     .category-badge[data-category="LLC Formation"] {
//       background: #ede9fe;
//       color: #7c3aed;
//     }

//     .pinned-badge {
//       display: flex;
//       align-items: center;
//       gap: 0.375rem;
//       padding: 0.375rem 0.75rem;
//       border-radius: 0.5rem;
//       font-size: 0.8125rem;
//       font-weight: 600;
//       background: #fef3c7;
//       color: #d97706;
//     }

//     .pinned-badge mat-icon {
//       font-size: 16px;
//       width: 16px;
//       height: 16px;
//     }

//     .topic-title {
//       font-size: 1.75rem;
//       font-weight: 700;
//       color: #111827;
//       margin: 0 0 0.875rem 0;
//       line-height: 1.3;
//     }

//     .topic-footer {
//       display: flex;
//       align-items: center;
//       gap: 0.375rem;
//       color: #6b7280;
//       font-size: 0.875rem;
//     }

//     .topic-footer mat-icon {
//       font-size: 16px;
//       width: 16px;
//       height: 16px;
//     }

//     .posts-container {
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//       margin-bottom: 1.5rem;
//     }

//     .post-card {
//       background: white;
//       border: 1px solid #e5e7eb;
//       border-radius: 0.75rem;
//       padding: 1.5rem;
//       transition: all 0.2s;
//       box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
//     }

//     .post-card:hover {
//       box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
//     }

//     .post-card.main-post {
//       border-color: #2563eb;
//       border-width: 2px;
//       background: linear-gradient(to bottom, #eff6ff, white);
//     }

//     .post-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       margin-bottom: 1rem;
//       gap: 1rem;
//     }

//     .author-info {
//       display: flex;
//       align-items: center;
//       gap: 0.75rem;
//     }

//     .avatar {
//       width: 2.75rem;
//       height: 2.75rem;
//       border-radius: 9999px;
//       background: #e5e7eb;
//       border: 2px solid white;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//     }

//     .avatar-small {
//       width: 2rem;
//       height: 2rem;
//       border-radius: 9999px;
//       background: #e5e7eb;
//       border: 2px solid white;
//       box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
//     }

//     .author-details {
//       display: flex;
//       flex-direction: column;
//       gap: 0.125rem;
//     }

//     .author-name {
//       font-weight: 600;
//       color: #111827;
//       font-size: 0.9375rem;
//     }

//     .post-time {
//       display: flex;
//       align-items: center;
//       gap: 0.25rem;
//       font-size: 0.8125rem;
//       color: #9ca3af;
//     }

//     .time-icon {
//       font-size: 14px !important;
//       width: 14px !important;
//       height: 14px !important;
//     }

//     .author-badge {
//       display: flex;
//       align-items: center;
//       gap: 0.375rem;
//       padding: 0.375rem 0.75rem;
//       border-radius: 0.5rem;
//       font-size: 0.8125rem;
//       font-weight: 600;
//       background: #dbeafe;
//       color: #2563eb;
//       white-space: nowrap;
//     }

//     .author-badge mat-icon {
//       font-size: 16px;
//       width: 16px;
//       height: 16px;
//     }

//     .post-content {
//       color: #374151;
//       line-height: 1.7;
//       font-size: 0.9375rem;
//       margin-bottom: 1.25rem;
//       white-space: pre-wrap;
//     }

//     .post-actions {
//       display: flex;
//       gap: 0.75rem;
//       padding-top: 1rem;
//       border-top: 1px solid #f3f4f6;
//     }

//     .action-btn {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       padding: 0.5rem 1rem !important;
//       border-radius: 0.5rem !important;
//       font-weight: 500 !important;
//       font-size: 0.875rem !important;
//       transition: all 0.2s;
//       border-color: #e5e7eb !important;
//       color: #6b7280 !important;
//     }

//     .action-btn:hover:not(.liked) {
//       background: #f9fafb !important;
//       border-color: #d1d5db !important;
//       color: #374151 !important;
//     }

//     .action-btn.liked {
//       background: #dbeafe !important;
//       border-color: #93c5fd !important;
//       color: #2563eb !important;
//     }

//     .action-btn mat-icon {
//       font-size: 20px;
//       width: 20px;
//       height: 20px;
//     }

//     .reply-btn {
//       color: #059669 !important;
//     }

//     .reply-btn:hover {
//       background: #d1fae5 !important;
//       border-color: #6ee7b7 !important;
//       color: #047857 !important;
//     }

//     .replies-section {
//       margin-top: 1.5rem;
//       padding-left: 2.5rem;
//       border-left: 3px solid #e5e7eb;
//     }

//     .replies-section.flat {
//       margin-top: 0;
//       padding-left: 0;
//       border-left: none;
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//     }

//     .replies-header {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       margin-bottom: 0.75rem;
//       color: #6b7280;
//       font-size: 0.875rem;
//       font-weight: 600;
//     }

//     .replies-header mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     .reply-card {
//       background: white;
//       border: 1px solid #e5e7eb;
//       border-radius: 0.625rem;
//       padding: 1.25rem;
//       transition: all 0.2s;
//       display: flex;
//       flex-direction: column;
//       gap: 0.75rem;
//     }

//     .replies-section.flat .reply-card {
//         margin-bottom: 0;
//     }

//     .replies-section:not(.flat) .reply-card {
//       background: #f9fafb;
//     }

//     .reply-card:hover {
//       border-color: #d1d5db;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
//     }

//     .reply-content {
//       color: #374151;
//       line-height: 1.6;
//       font-size: 0.9375rem;
//       white-space: pre-wrap;
//       margin: 0;
//       padding: 0;
//     }

//     .reply-actions {
//       display: flex;
//       gap: 0.5rem;
//       padding: 0;
//       margin-top: 0.5rem;
//     }

//     .action-btn-reply {
//       display: inline-flex;
//       align-items: center;
//       gap: 0.5rem;
//       padding: 0.375rem 0.875rem;
//       border-radius: 0.375rem;
//       font-size: 0.875rem;
//       font-weight: 500;
//       cursor: pointer;
//       border: 1px solid #d1d5db;
//       background-color: transparent;
//       color: #6b7280;
//       transition: all 0.2s;
//     }

//     .action-btn-reply:hover {
//       background-color: #f3f4f6;
//     }

//     .action-btn-reply mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     .action-btn-reply.liked {
//       background-color: #e0eaff;
//       color: #3b82f6;
//       border-color: transparent;
//     }

//     .action-btn-reply.liked:hover {
//       background-color: #d1e0ff;
//     }

//     .reply-form {
//       background: white;
//       border: 2px solid #e5e7eb;
//       border-radius: 0.875rem;
//       padding: 1.75rem;
//       box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
//     }

//     .reply-form-header {
//       display: flex;
//       align-items: center;
//       gap: 0.75rem;
//       margin-bottom: 1.25rem;
//     }

//     .reply-form-header mat-icon {
//       color: #2563eb;
//       font-size: 28px;
//       width: 28px;
//       height: 28px;
//     }

//     .reply-form-title {
//       font-size: 1.25rem;
//       font-weight: 700;
//       color: #111827;
//       margin: 0;
//     }

//     .current-user-info {
//       display: flex;
//       align-items: center;
//       gap: 0.625rem;
//       margin-bottom: 1rem;
//       padding: 0.75rem;
//       background: #f9fafb;
//       border-radius: 0.5rem;
//     }

//     .user-name {
//       font-size: 0.875rem;
//       font-weight: 500;
//       color: #6b7280;
//     }

//     .reply-textarea {
//       width: 100%;
//       padding: 1rem;
//       border: 2px solid #e5e7eb;
//       border-radius: 0.625rem;
//       font-size: 0.9375rem;
//       font-family: inherit;
//       line-height: 1.6;
//       resize: vertical;
//       transition: all 0.2s;
//       min-height: 120px;
//     }

//     .reply-textarea:focus {
//       outline: none;
//       border-color: #2563eb;
//       box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
//     }

//     .reply-textarea::placeholder {
//       color: #9ca3af;
//     }

//     .reply-form-actions {
//       display: flex;
//       justify-content: flex-end;
//       gap: 0.75rem;
//       margin-top: 1rem;
//     }

//     .reply-form-actions button {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       font-weight: 600 !important;
//     }

//     .reply-form-actions button mat-icon {
//       font-size: 18px;
//       width: 18px;
//       height: 18px;
//     }

//     .post-btn {
//       background: #2563eb !important;
//       color: white !important;
//       padding: 0.625rem 1.5rem !important;
//     }

//     .post-btn:hover:not(:disabled) {
//       background: #1d4ed8 !important;
//       box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);
//     }

//     .post-btn:disabled {
//       opacity: 0.5;
//     }

//     @media (max-width: 768px) {
//       .topic-header-inline { padding-bottom: 1.25rem; margin-bottom: 1.25rem; }
//       .header-top { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
//       .topic-title { font-size: 1.5rem; }
//       .post-card { padding: 1.375rem; }
//       .reply-form { padding: 1.5rem; }
//       .post-actions { flex-wrap: wrap; }
//     }

//     @media (max-width: 640px) {
//       .back-btn { width: 100%; justify-content: center; margin-bottom: 1rem; }
//       .topic-header-inline { padding-bottom: 1rem; margin-bottom: 1rem; }
//       .topic-title { font-size: 1.25rem; }
//       .topic-stats { gap: 0.75rem; }
//       .stat-item { font-size: 0.8125rem; }
//       .post-card { padding: 1rem; }
//       .post-header { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
//       .author-badge { align-self: flex-start; }
//       .post-content { font-size: 0.875rem; }
//       .post-actions { gap: 0.5rem; }
//       .action-btn { font-size: 0.8125rem !important; padding: 0.5rem 0.875rem !important; }
//       .replies-section { padding-left: 0.75rem; border-left-width: 2px; margin-top: 1rem; }
//       .reply-card { padding: 0.875rem; }
//       .reply-content { padding-left: 0; font-size: 0.875rem;}
//       .reply-actions { padding-left: 0; }
//       .reply-form { padding: 1rem; }
//       .reply-form-header mat-icon { font-size: 24px; width: 24px; height: 24px; }
//       .reply-form-title { font-size: 1.125rem; }
//       .reply-textarea { font-size: 0.875rem; min-height: 100px; }
//       .reply-form-actions { flex-wrap: wrap; }
//       .reply-form-actions button { flex: 1; min-width: 120px; }
//     }
//   `]
// })
// export class TopicDetailComponent {
//   @Input() topic!: TitleWithPostsVM;   // VM with posts as array
//   @Output() back = new EventEmitter<void>();
//   @Output() replySubmitted = new EventEmitter<{ postId: number }>();

//   @ViewChild('menuTrigger', { read: MatMenuTrigger }) menuTrigger!: MatMenuTrigger;
//   @ViewChild('contextAnchor') contextAnchor!: ElementRef<HTMLElement>;

//   defaultAvatar = 'clearincorp-web/src/assets/avatar-0.jpg';
//   newPostText = '';

//   contextMenuPos = { x: 0, y: 0 };
//   private context: { type: ContextType; target: any; parentPost?: PostDto } | null = null;

//   isBusy = false;

//   constructor(private forum: ForumService) {}

//   // UI helpers
//   isBlank(v: string | null | undefined) { return !v || !v.trim(); }

//   getTimeAgo(iso?: string | null): string {
//     if (!iso) return 'just now';
//     const then = new Date(iso).getTime();
//     const now = Date.now();
//     const s = Math.max(1, Math.floor((now - then) / 1000));
//     if (s < 60) return `${s}s ago`;
//     const m = Math.floor(s / 60);
//     if (m < 60) return `${m}m ago`;
//     const h = Math.floor(m / 60);
//     if (h < 24) return `${h}h ago`;
//     const d = Math.floor(h / 24);
//     return `${d}d ago`;
//   }

//   getTotalReplies(t: TitleWithPostsVM) {
//     return (t.posts || []).reduce((acc, p) => acc + (p.replyCount ?? p.replies?.length ?? 0), 0);
//   }

//   getTotalViews(t: TitleWithPostsVM) {
//     return (t.posts || []).reduce((acc, p) => acc + (p.viewsCount || 0), 0);
//   }

//   onBack() { this.back.emit(); }

//   // Context menu
//   openContextMenu(event: MouseEvent, type: ContextType, target: any, parentPost?: PostDto) {
//     event.preventDefault();
//     this.contextMenuPos = { x: event.clientX, y: event.clientY };
//     this.context = { type, target, parentPost };
//     this.menuTrigger.openMenu();
//   }

//   onAction(action: 'edit' | 'delete' | 'report') {
//     if (!this.context) return;
//     const { type, target, parentPost } = this.context;

//     if (action === 'edit')   this.editItem(type, target);
//     if (action === 'delete') this.deleteItem(type, target, parentPost);
//     if (action === 'report') this.reportItem(type, target);
//   }

//   // Edit/Delete/Report
//   private editItem(type: ContextType, target: any) {
//     if (type === 'title') {
//       const newTitle = prompt('Edit title', this.topic.title || '');
//       if (newTitle == null || !newTitle.trim()) return;

//       const newDesc = prompt('Edit description (Markdown)', (this.topic as any).descriptionMd || '');
//       this.isBusy = true;
//       this.forum.edit({
//         titleId: (this.topic as any).titleId,
//         newTitle: newTitle.trim(),
//         newDescriptionMd: newDesc ?? undefined
//       }).pipe(finalize(() => (this.isBusy = false)))
//         .subscribe(updated => {
//           if ((updated as any).title) {
//             this.topic.title = (updated as any).title;
//             (this.topic as any).descriptionMd = (updated as any).descriptionMd ?? (this.topic as any).descriptionMd;
//           }
//         });
//     }

//     if (type === 'post') {
//       const post: PostDto = target;
//       const edited = prompt('Edit post (Markdown)', post.content || '');
//       if (edited == null || !edited.trim()) return;

//       this.isBusy = true;
//       this.forum.edit({
//         postId: post.postId,
//         newContentMd: edited.trim()
//       }).pipe(finalize(() => (this.isBusy = false)))
//         .subscribe(updated => {
//           if ((updated as any).postId === post.postId) {
//             post.content = (updated as any).content;
//             post.editedAt = (updated as any).editedAt ?? new Date().toISOString();
//           }
//         });
//     }

//     if (type === 'reply') {
//       const reply: ReplyDto = target;
//       const edited = prompt('Edit reply (Markdown)', reply.content || '');
//       if (edited == null || !edited.trim()) return;

//       this.isBusy = true;
//       this.forum.edit({
//         replyId: reply.replyId,
//         newContentMd: edited.trim()
//       }).pipe(finalize(() => (this.isBusy = false)))
//         .subscribe(updated => {
//           if ((updated as any).replyId === reply.replyId) {
//             reply.content = (updated as any).content;
//             reply.editedAt = (updated as any).editedAt ?? new Date().toISOString();
//           }
//         });
//     }
//   }

//   private deleteItem(type: ContextType, target: any, parentPost?: PostDto) {
//     if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

//     if (type === 'post') {
//       const post: PostDto = target;
//       this.isBusy = true;
//       this.forum.deleteItem({ postId: post.postId })
//         .pipe(finalize(() => (this.isBusy = false)))
//         .subscribe(() => {
//           const idx = this.topic.posts.findIndex(p => p.postId === post.postId);
//           if (idx >= 0) this.topic.posts.splice(idx, 1);
//         });
//     }

//     if (type === 'reply') {
//       const reply: ReplyDto = target;
//       this.isBusy = true;
//       this.forum.deleteItem({ replyId: reply.replyId })
//         .pipe(finalize(() => (this.isBusy = false)))
//         .subscribe(() => {
//           const p = parentPost ?? this.topic.posts.find(pp => (pp.replies ?? []).some(r => r.replyId === reply.replyId));
//           if (p?.replies) {
//             const idx = p.replies.findIndex(r => r.replyId === reply.replyId);
//             if (idx >= 0) p.replies.splice(idx, 1);
//           }
//         });
//     }

//     if (type === 'title') {
//       const titleId = (this.topic as any).titleId;
//       this.isBusy = true;
//       this.forum.deleteTitle(titleId)
//         .pipe(finalize(() => (this.isBusy = false)))
//         .subscribe(() => {
//           alert('Title deleted');
//           this.onBack();
//         });
//     }
//   }

//   private reportItem(type: ContextType, target: any) {
//     if (type === 'post') {
//       const post: PostDto = target;
//       this.forum.reportItem({ postId: post.postId }).subscribe(res => {
//         alert(`Reported post (#${res.post_id}). Total reports: ${res.report_count}`);
//       });
//     } else if (type === 'reply') {
//       const reply: ReplyDto = target;
//       this.forum.reportItem({ replyId: reply.replyId }).subscribe(res => {
//         alert(`Reported reply (#${res.reply_id}). Total reports: ${res.report_count}`);
//       });
//     } else {
//       alert('Reporting a title is not supported via this menu.');
//     }
//   }

//   // Likes
//   onLikePost(post: PostDto) {
//     this.forum.toggleLike({ postId: post.postId }).subscribe(newCount => {
//       post.likesCount = newCount;
//     });
//   }

//   onLikeReply(reply: ReplyDto) {
//     this.forum.toggleLike({ replyId: reply.replyId }).subscribe(newCount => {
//       (reply as any).likesCount = newCount;
//     });
//   }

//   // Compose
//   createNewPostForTitle(markdown: string) {
//     if (this.isBlank(markdown)) return;
//     const req = {
//       topicId: (this.topic as any).topicId,
//       titleId: (this.topic as any).titleId,
//       descriptionMd: markdown.trim(),
//     };
//     this.isBusy = true;
//     this.forum.createPost(req).pipe(finalize(() => (this.isBusy = false)))
//       .subscribe(created => {
//         const newPost: PostDto = { ...created, replies: created.replies ?? [] };
//         this.topic.posts = [newPost, ...(this.topic.posts || [])];
//         this.replySubmitted.emit({ postId: newPost.postId });
//       });
//   }

//   onReplyToPost(post: PostDto) {
//     const content = prompt('Write your reply (Markdown)');
//     if (!content || !content.trim()) return;

//     const req = { postId: post.postId, parentReplyId: null, contentMd: content.trim() };
//     this.forum.createReply(req).subscribe(created => {
//       post.replies = post.replies ?? [];
//       post.replies.push(created);
//       post.replyCount = (post.replyCount || 0) + 1;
//       this.replySubmitted.emit({ postId: post.postId });
//     });
//   }

//   onReplyToReply(post: PostDto, parent: ReplyDto) {
//     const content = prompt('Reply to this comment (Markdown)');
//     if (!content || !content.trim()) return;

//     const req = { postId: post.postId, parentReplyId: parent.replyId, contentMd: content.trim() };
//     this.forum.createReply(req).subscribe(created => {
//       post.replies = post.replies ?? [];
//       post.replies.push(created); // flat render
//       post.replyCount = (post.replyCount || 0) + 1;
//       this.replySubmitted.emit({ postId: post.postId });
//     });
//   }
// }



import {
  Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit, OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { finalize } from 'rxjs/operators';

import { ForumService, PostDto, ReplyDto, TitleDto, Page } from 'src/app/services/forum.service';
import { WsService, WsEvent } from 'src/app/services/ws.service';

// Important: do NOT extend TitleDto directly because TitleDto.posts is (Page<PostDto> & PostDto[]).
// Instead, omit 'posts' and redefine it as a pure array for the view.
export type TitleWithPostsVM = Omit<TitleDto, 'posts'> & {
  postsPage?: Page<PostDto> | null; // keep original page if backend returned Page<>
  posts: PostDto[];                 // normalized array used by the template
};

type ContextType = 'title' | 'post' | 'reply';

@Component({
  selector: 'app-topic-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, MatMenuModule, MatIconModule, MatButtonModule, MatTooltipModule],
  template: `
    <!-- Context menu (right-click) -->
    <div #contextAnchor [style.position]="'fixed'"
         [style.left.px]="contextMenuPos.x"
         [style.top.px]="contextMenuPos.y"></div>

    <mat-menu #contextMenu="matMenu">
      <button mat-menu-item (click)="onAction('edit')">
        <mat-icon>edit</mat-icon><span>Edit</span>
      </button>
      <button mat-menu-item (click)="onAction('delete')">
        <mat-icon>delete</mat-icon><span>Delete</span>
      </button>
      <button mat-menu-item (click)="onAction('report')">
        <mat-icon>flag</mat-icon><span>Report</span>
      </button>
    </mat-menu>

    <div class="topic-detail" *ngIf="topic">
      <button class="back-btn" (click)="onBack()">
        <mat-icon>arrow_back</mat-icon><span>Back to topics</span>
      </button>

      <!-- Title header / stats -->
      <div class="title-card">
        <div class="header-top">
          <div class="topic-badges">
            <span class="category-badge">{{ topic?.title || 'Topic' }}</span>
          </div>
          <div class="topic-stats">
            <div class="stat-item"><mat-icon>forum</mat-icon><span>{{ getTotalReplies(topic) }}</span></div>
            <div class="stat-item"><mat-icon>visibility</mat-icon><span>{{ getTotalViews(topic) }}</span></div>
          </div>
        </div>

        <h1 class="topic-title"
            (contextmenu)="openContextMenu($event, 'title', topic)">
          {{ topic.title }}
        </h1>

        <div class="topic-footer">
          <mat-icon>schedule</mat-icon>
          <span>Last activity {{ getTimeAgo(topic.posts?.[0]?.lastActivityAt || topic.posts?.[0]?.createdAt) }}</span>
        </div>
      </div>

      <!-- Post list -->
      <div class="posts-container">
        <div class="post-card"
             *ngFor="let post of topic.posts; let i = index"
             [class.main-post]="i === 0"
             (contextmenu)="openContextMenu($event, 'post', post)">
          <div class="post-header">
            <div class="author-info">
              <img [src]="defaultAvatar"
                   [alt]="post.loginUserName || 'User avatar'"
                   class="avatar" />
              <div class="author-details">
                <div class="author-name">{{ post.loginUserName || 'User' }}</div>
                <div class="post-time"><mat-icon class="time-icon">schedule</mat-icon>{{ getTimeAgo(post.createdAt) }}</div>
              </div>
            </div>
            <span *ngIf="post.pinned" class="author-badge"><mat-icon>push_pin</mat-icon>Pinned</span>
          </div>

          <div class="post-content">{{ post.content }}</div>

          <div class="post-actions">
            <button mat-stroked-button class="action-btn" (click)="onLikePost(post)" matTooltip="Like this post">
              <mat-icon>thumb_up</mat-icon>
              <span>
                {{ post.likesCount > 0 ? post.likesCount : '' }}
                {{ post.likesCount === 1 ? 'Like' : (post.likesCount > 1 ? 'Likes' : 'Like') }}
              </span>
            </button>

            <button mat-stroked-button class="action-btn reply-btn" (click)="onReplyToPost(post)" matTooltip="Reply">
              <mat-icon>reply</mat-icon><span>Reply</span>
            </button>
          </div>

          <!-- replies -->
          <div *ngIf="(post.replies?.length ?? 0) > 0" class="replies-section" [class.flat]="i === 0">
            <div class="replies-header">
              <mat-icon>{{ i === 0 ? 'forum' : 'subdirectory_arrow_right' }}</mat-icon>
              <span>
                {{ post.replies?.length ?? 0 }}
                {{ (post.replies?.length ?? 0) === 1 ? 'Reply' : 'Replies' }}
              </span>
            </div>

            <div class="reply-card"
                 *ngFor="let reply of (post.replies ?? [])"
                 (contextmenu)="openContextMenu($event, 'reply', reply, post)">
              <div class="author-info">
                <img [src]="defaultAvatar" [alt]="reply.loginUserName || 'User avatar'" class="avatar-small" />
                <div class="author-details">
                  <div class="author-name">{{ reply.loginUserName || 'User' }}</div>
                  <div class="post-time">{{ getTimeAgo(reply.createdAt) }}</div>
                </div>
              </div>
              <div class="reply-content">{{ reply.content }}</div>
              <div class="reply-actions">
                <button class="action-btn-reply" (click)="onLikeReply(reply)" matTooltip="Like">
                  <mat-icon>thumb_up</mat-icon>
                  <span *ngIf="(reply.likesCount ?? 0) > 0">{{ reply.likesCount }}</span>
                  <span>Like{{ (reply.likesCount ?? 0) !== 1 ? 's' : '' }}</span>
                </button>
                <button class="action-btn-reply reply" (click)="onReplyToReply(post, reply)" matTooltip="Reply">
                  <mat-icon>reply</mat-icon><span>Reply</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Composer (Create Post for this Title) -->
      <div class="reply-form">
        <div class="reply-form-header">
          <mat-icon>rate_review</mat-icon>
          <h3 class="reply-form-title">Join the discussion</h3>
        </div>

        <textarea class="reply-textarea"
                  placeholder="Share your thoughts, ask questions, or provide feedback..."
                  rows="5"
                  [(ngModel)]="newPostText"></textarea>

        <div class="reply-form-actions">
          <button mat-button (click)="newPostText=''" [disabled]="isBlank(newPostText)">
            <mat-icon>close</mat-icon> Cancel
          </button>

          <button mat-raised-button color="primary" class="post-btn"
                  [disabled]="isBlank(newPostText)"
                  (click)="createNewPostForTitle(newPostText); newPostText=''">
            <mat-icon>send</mat-icon> Create Post
          </button>
        </div>
      </div>
    </div>

    <!-- Context menu trigger (programmatic) -->
    <button mat-icon-button #menuTrigger="matMenuTrigger" [matMenuTriggerFor]="contextMenu" style="display:none"></button>
  `,
  styles: [`
    .topic-detail {
      max-width: 100%;
    }

    .back-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.625rem 1.125rem;
      border: none;
      background: white;
      color: #6b7280;
      border-radius: 0.5rem;
      font-size: 0.9375rem;
      font-weight: 500;
      cursor: pointer;
      margin-bottom: 1.5rem;
      transition: all 0.2s;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .back-btn:hover {
      background: #f3f4f6;
      color: #1f2937;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .back-btn mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .topic-header-inline {
      padding-bottom: 1.5rem;
      margin-bottom: 1.5rem;
      border-bottom: 2px solid #e5e7eb;
    }

    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .topic-badges {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .topic-stats {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      color: #6b7280;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .stat-item mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .category-badge {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.375rem 0.75rem;
      border-radius: 0.5rem;
      font-size: 0.8125rem;
      font-weight: 600;
      background: #eff6ff;
      color: #2563eb;
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
      gap: 0.375rem;
      padding: 0.375rem 0.75rem;
      border-radius: 0.5rem;
      font-size: 0.8125rem;
      font-weight: 600;
      background: #fef3c7;
      color: #d97706;
    }

    .pinned-badge mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .topic-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 0.875rem 0;
      line-height: 1.3;
    }

    .topic-footer {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      color: #6b7280;
      font-size: 0.875rem;
    }

    .topic-footer mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .posts-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .post-card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 0.75rem;
      padding: 1.5rem;
      transition: all 0.2s;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }

    .post-card:hover {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
    }

    .post-card.main-post {
      border-color: #2563eb;
      border-width: 2px;
      background: linear-gradient(to bottom, #eff6ff, white);
    }

    .post-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
      gap: 1rem;
    }

    .author-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .avatar {
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 9999px;
      background: #e5e7eb;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .avatar-small {
      width: 2rem;
      height: 2rem;
      border-radius: 9999px;
      background: #e5e7eb;
      border: 2px solid white;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .author-details {
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
    }

    .author-name {
      font-weight: 600;
      color: #111827;
      font-size: 0.9375rem;
    }

    .post-time {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.8125rem;
      color: #9ca3af;
    }

    .time-icon {
      font-size: 14px !important;
      width: 14px !important;
      height: 14px !important;
    }

    .author-badge {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.375rem 0.75rem;
      border-radius: 0.5rem;
      font-size: 0.8125rem;
      font-weight: 600;
      background: #dbeafe;
      color: #2563eb;
      white-space: nowrap;
    }

    .author-badge mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .post-content {
      color: #374151;
      line-height: 1.7;
      font-size: 0.9375rem;
      margin-bottom: 1.25rem;
      white-space: pre-wrap;
    }

    .post-actions {
      display: flex;
      gap: 0.75rem;
      padding-top: 1rem;
      border-top: 1px solid #f3f4f6;
    }

    .action-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem !important;
      border-radius: 0.5rem !important;
      font-weight: 500 !important;
      font-size: 0.875rem !important;
      transition: all 0.2s;
      border-color: #e5e7eb !important;
      color: #6b7280 !important;
    }

    .action-btn:hover:not(.liked) {
      background: #f9fafb !important;
      border-color: #d1d5db !important;
      color: #374151 !important;
    }

    .action-btn.liked {
      background: #dbeafe !important;
      border-color: #93c5fd !important;
      color: #2563eb !important;
    }

    .action-btn mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .reply-btn {
      color: #059669 !important;
    }

    .reply-btn:hover {
      background: #d1fae5 !important;
      border-color: #6ee7b7 !important;
      color: #047857 !important;
    }

    .replies-section {
      margin-top: 1.5rem;
      padding-left: 2.5rem;
      border-left: 3px solid #e5e7eb;
    }

    .replies-section.flat {
      margin-top: 0;
      padding-left: 0;
      border-left: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .replies-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
      color: #6b7280;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .replies-header mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .reply-card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 0.625rem;
      padding: 1.25rem;
      transition: all 0.2s;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .replies-section.flat .reply-card {
        margin-bottom: 0;
    }

    .replies-section:not(.flat) .reply-card {
      background: #f9fafb;
    }

    .reply-card:hover {
      border-color: #d1d5db;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .reply-content {
      color: #374151;
      line-height: 1.6;
      font-size: 0.9375rem;
      white-space: pre-wrap;
      margin: 0;
      padding: 0;
    }

    .reply-actions {
      display: flex;
      gap: 0.5rem;
      padding: 0;
      margin-top: 0.5rem;
    }

    .action-btn-reply {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.375rem 0.875rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      border: 1px solid #d1d5db;
      background-color: transparent;
      color: #6b7280;
      transition: all 0.2s;
    }

    .action-btn-reply:hover {
      background-color: #f3f4f6;
    }

    .action-btn-reply mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .action-btn-reply.liked {
      background-color: #e0eaff;
      color: #3b82f6;
      border-color: transparent;
    }

    .action-btn-reply.liked:hover {
      background-color: #d1e0ff;
    }

    .reply-form {
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 0.875rem;
      padding: 1.75rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }

    .reply-form-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.25rem;
    }

    .reply-form-header mat-icon {
      color: #2563eb;
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    .reply-form-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #111827;
      margin: 0;
    }

    .current-user-info {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      margin-bottom: 1rem;
      padding: 0.75rem;
      background: #f9fafb;
      border-radius: 0.5rem;
    }

    .user-name {
      font-size: 0.875rem;
      font-weight: 500;
      color: #6b7280;
    }

    .reply-textarea {
      width: 100%;
      padding: 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 0.625rem;
      font-size: 0.9375rem;
      font-family: inherit;
      line-height: 1.6;
      resize: vertical;
      transition: all 0.2s;
      min-height: 120px;
    }

    .reply-textarea:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
    }

    .reply-textarea::placeholder {
      color: #9ca3af;
    }

    .reply-form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      margin-top: 1rem;
    }

    .reply-form-actions button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600 !important;
    }

    .reply-form-actions button mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .post-btn {
      background: #2563eb !important;
      color: white !important;
      padding: 0.625rem 1.5rem !important;
    }

    .post-btn:hover:not(:disabled) {
      background: #1d4ed8 !important;
      box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);
    }

    .post-btn:disabled {
      opacity: 0.5;
    }

    @media (max-width: 768px) {
      .topic-header-inline { padding-bottom: 1.25rem; margin-bottom: 1.25rem; }
      .header-top { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
      .topic-title { font-size: 1.5rem; }
      .post-card { padding: 1.375rem; }
      .reply-form { padding: 1.5rem; }
      .post-actions { flex-wrap: wrap; }
    }

    @media (max-width: 640px) {
      .back-btn { width: 100%; justify-content: center; margin-bottom: 1rem; }
      .topic-header-inline { padding-bottom: 1rem; margin-bottom: 1rem; }
      .topic-title { font-size: 1.25rem; }
      .topic-stats { gap: 0.75rem; }
      .stat-item { font-size: 0.8125rem; }
      .post-card { padding: 1rem; }
      .post-header { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
      .author-badge { align-self: flex-start; }
      .post-content { font-size: 0.875rem; }
      .post-actions { gap: 0.5rem; }
      .action-btn { font-size: 0.8125rem !important; padding: 0.5rem 0.875rem !important; }
      .replies-section { padding-left: 0.75rem; border-left-width: 2px; margin-top: 1rem; }
      .reply-card { padding: 0.875rem; }
      .reply-content { padding-left: 0; font-size: 0.875rem;}
      .reply-actions { padding-left: 0; }
      .reply-form { padding: 1rem; }
      .reply-form-header mat-icon { font-size: 24px; width: 24px; height: 24px; }
      .reply-form-title { font-size: 1.125rem; }
      .reply-textarea { font-size: 0.875rem; min-height: 100px; }
      .reply-form-actions { flex-wrap: wrap; }
      .reply-form-actions button { flex: 1; min-width: 120px; }
    }
  `]
})
export class TopicDetailComponent {
  @Input() topic!: TitleWithPostsVM;   // VM with posts as array
  @Output() back = new EventEmitter<void>();
  @Output() replySubmitted = new EventEmitter<{ postId: number }>();

  @ViewChild('menuTrigger', { read: MatMenuTrigger }) menuTrigger!: MatMenuTrigger;
  @ViewChild('contextAnchor') contextAnchor!: ElementRef<HTMLElement>;

  defaultAvatar = 'clearincorp-web/src/assets/avatar-0.jpg';
  newPostText = '';

  contextMenuPos = { x: 0, y: 0 };
  private context: { type: ContextType; target: any; parentPost?: PostDto } | null = null;

  isBusy = false;

  constructor(private forum: ForumService, private ws: WsService) {}

  // UI helpers
  isBlank(v: string | null | undefined) { return !v || !v.trim(); }

  getTimeAgo(iso?: string | null): string {
    if (!iso) return 'just now';
    const then = new Date(iso).getTime();
    const now = Date.now();
    const s = Math.max(1, Math.floor((now - then) / 1000));
    if (s < 60) return `${s}s ago`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    return `${d}d ago`;
  }

  getTotalReplies(t: TitleWithPostsVM) {
    return (t.posts || []).reduce((acc, p) => acc + (p.replyCount ?? p.replies?.length ?? 0), 0);
  }

  getTotalViews(t: TitleWithPostsVM) {
    return (t.posts || []).reduce((acc, p) => acc + (p.viewsCount || 0), 0);
  }

  onBack() { this.back.emit(); }

  // Context menu
  openContextMenu(event: MouseEvent, type: ContextType, target: any, parentPost?: PostDto) {
    event.preventDefault();
    this.contextMenuPos = { x: event.clientX, y: event.clientY };
    this.context = { type, target, parentPost };
    this.menuTrigger.openMenu();
  }

  onAction(action: 'edit' | 'delete' | 'report') {
    if (!this.context) return;
    const { type, target, parentPost } = this.context;

    if (action === 'edit')   this.editItem(type, target);
    if (action === 'delete') this.deleteItem(type, target, parentPost);
    if (action === 'report') this.reportItem(type, target);
  }

  // Edit/Delete/Report
  private editItem(type: ContextType, target: any) {
    if (type === 'title') {
      const newTitle = prompt('Edit title', this.topic.title || '');
      if (newTitle == null || !newTitle.trim()) return;

      const newDesc = prompt('Edit description (Markdown)', (this.topic as any).descriptionMd || '');
      this.isBusy = true;
      this.forum.edit({
        titleId: (this.topic as any).titleId,
        newTitle: newTitle.trim(),
        newDescriptionMd: newDesc ?? undefined
      }).pipe(finalize(() => (this.isBusy = false)))
        .subscribe(updated => {
          if ((updated as any).title) {
            this.topic.title = (updated as any).title;
            (this.topic as any).descriptionMd = (updated as any).descriptionMd ?? (this.topic as any).descriptionMd;
          }
        });
    }

    if (type === 'post') {
      const post: PostDto = target;
      const edited = prompt('Edit post (Markdown)', post.content || '');
      if (edited == null || !edited.trim()) return;

      this.isBusy = true;
      this.forum.edit({
        postId: post.postId,
        newContentMd: edited.trim()
      }).pipe(finalize(() => (this.isBusy = false)))
        .subscribe(updated => {
          if ((updated as any).postId === post.postId) {
            post.content = (updated as any).content;
            post.editedAt = (updated as any).editedAt ?? new Date().toISOString();
          }
        });
    }

    if (type === 'reply') {
      const reply: ReplyDto = target;
      const edited = prompt('Edit reply (Markdown)', reply.content || '');
      if (edited == null || !edited.trim()) return;

      this.isBusy = true;
      this.forum.edit({
        replyId: reply.replyId,
        newContentMd: edited.trim()
      }).pipe(finalize(() => (this.isBusy = false)))
        .subscribe(updated => {
          if ((updated as any).replyId === reply.replyId) {
            reply.content = (updated as any).content;
            reply.editedAt = (updated as any).editedAt ?? new Date().toISOString();
          }
        });
    }
  }

  private deleteItem(type: ContextType, target: any, parentPost?: PostDto) {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

    if (type === 'post') {
      const post: PostDto = target;
      this.isBusy = true;
      this.forum.deleteItem({ postId: post.postId })
        .pipe(finalize(() => (this.isBusy = false)))
        .subscribe(() => {
          const idx = this.topic.posts.findIndex(p => p.postId === post.postId);
          if (idx >= 0) this.topic.posts.splice(idx, 1);
        });
    }

    if (type === 'reply') {
      const reply: ReplyDto = target;
      this.isBusy = true;
      this.forum.deleteItem({ replyId: reply.replyId })
        .pipe(finalize(() => (this.isBusy = false)))
        .subscribe(() => {
          const p = parentPost ?? this.topic.posts.find(pp => (pp.replies ?? []).some(r => r.replyId === reply.replyId));
          if (p?.replies) {
            const idx = p.replies.findIndex(r => r.replyId === reply.replyId);
            if (idx >= 0) p.replies.splice(idx, 1);
          }
        });
    }

    if (type === 'title') {
      const titleId = (this.topic as any).titleId;
      this.isBusy = true;
      this.forum.deleteTitle(titleId)
        .pipe(finalize(() => (this.isBusy = false)))
        .subscribe(() => {
          alert('Title deleted');
          this.onBack();
        });
    }
  }

  private reportItem(type: ContextType, target: any) {
    if (type === 'post') {
      const post: PostDto = target;
      this.forum.reportItem({ postId: post.postId }).subscribe(res => {
        alert(`Reported post (#${res.post_id}). Total reports: ${res.report_count}`);
      });
    } else if (type === 'reply') {
      const reply: ReplyDto = target;
      this.forum.reportItem({ replyId: reply.replyId }).subscribe(res => {
        alert(`Reported reply (#${res.reply_id}). Total reports: ${res.report_count}`);
      });
    } else {
      alert('Reporting a title is not supported via this menu.');
    }
  }

  // Likes
  onLikePost(post: PostDto) {
    this.forum.toggleLike({ postId: post.postId }).subscribe(newCount => {
      post.likesCount = newCount;
    });
  }

  onLikeReply(reply: ReplyDto) {
    this.forum.toggleLike({ replyId: reply.replyId }).subscribe(newCount => {
      (reply as any).likesCount = newCount;
    });
  }

  // Compose
  createNewPostForTitle(markdown: string) {
    if (this.isBlank(markdown)) return;
    const req = {
      topicId: (this.topic as any).topicId,
      titleId: (this.topic as any).titleId,
      descriptionMd: markdown.trim(),
    };
    this.isBusy = true;
    this.forum.createPost(req).pipe(finalize(() => (this.isBusy = false)))
      .subscribe(created => {
        const newPost: PostDto = { ...created, replies: created.replies ?? [] };
        this.topic.posts = [newPost, ...(this.topic.posts || [])];
        this.replySubmitted.emit({ postId: newPost.postId });
      });
  }

  onReplyToPost(post: PostDto) {
    const content = prompt('Write your reply (Markdown)');
    if (!content || !content.trim()) return;

    const req = { postId: post.postId, parentReplyId: null, contentMd: content.trim() };
    this.forum.createReply(req).subscribe(created => {
      post.replies = post.replies ?? [];
      post.replies.push(created);
      post.replyCount = (post.replyCount || 0) + 1;
      this.replySubmitted.emit({ postId: post.postId });
    });
  }

  onReplyToReply(post: PostDto, parent: ReplyDto) {
    const content = prompt('Reply to this comment (Markdown)');
    if (!content || !content.trim()) return;

    const req = { postId: post.postId, parentReplyId: parent.replyId, contentMd: content.trim() };
    this.forum.createReply(req).subscribe(created => {
      post.replies = post.replies ?? [];
      post.replies.push(created); // flat render
      post.replyCount = (post.replyCount || 0) + 1;
      this.replySubmitted.emit({ postId: post.postId });
    });
  }
}
