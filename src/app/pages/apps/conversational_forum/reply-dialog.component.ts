// import { Component, Inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
// import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatDividerModule } from '@angular/material/divider';
// // 1. Import MatIconModule, MatIconRegistry, and DomSanitizer
// import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
// import { DomSanitizer } from '@angular/platform-browser';
// import { Post, Reply, User } from 'src/app/models/forum.model';

// // --- SVG Icon Definitions ---
// // It's a good practice to define the raw SVG content for the icons you need.
// const HEART_ICON = `
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
//     <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//   </svg>
// `;

// const HEART_SOLID_ICON = `
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-1.344-.688 15.182 15.182 0 01-1.17-1.114c-1.68-1.58-2.9-3.336-3.72-5.118-1.46-3.155.05-6.657 2.45-8.288a5.249 5.249 0 013.197-1.025 5.249 5.249 0 014.288 2.057 5.253 5.253 0 014.288-2.057 5.25 5.25 0 013.197 1.025c2.4 1.63 3.91 5.133 2.45 8.288-1.46 3.155-2.9 3.336-3.72 5.118a15.182 15.182 0 01-1.17 1.114 15.247 15.247 0 01-1.344.688l-.022.012-.007.003z" />
//   </svg>
// `;

// const X_MARK_ICON = `
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
//     <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//   </svg>
// `;


// export interface ReplyDialogData {
//   post: Post;
//   currentUser: User;
// }

// @Component({
//   selector: 'app-reply-dialog',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatDialogModule,
//     MatButtonModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatTooltipModule,
//     MatDividerModule,
//     // 2. Add MatIconModule to imports
//     MatIconModule
//   ],
//   template: `
//     <div class="reply-dialog-container">
//       <div class="dialog-header">
//         <h2 mat-dialog-title>Replying to {{ data.post.author.name }}</h2>
//         <button mat-icon-button (click)="onCancel()" matTooltip="Close">
//           <mat-icon svgIcon="x-mark"></mat-icon>
//         </button>
//       </div>

//       <mat-dialog-content>
//         <div class="post-context">
//           <div class="post-header">
//             <img [src]="data.post.author.avatar" [alt]="data.post.author.name" class="avatar">
//             <span class="author-name">{{ data.post.author.name }}</span>
//             <span class="post-time">• Original Post</span>
//           </div>
//           <p class="post-content">{{ data.post.content }}</p>
//         </div>

//         <mat-divider></mat-divider>

//         <div *ngIf="data.post.replies.length > 0" class="replies-container">
//           <h3 class="replies-title">{{ data.post.replies.length }} {{ data.post.replies.length === 1 ? 'Reply' : 'Replies' }}</h3>
//           <div class="replies-list">
//             <div *ngFor="let reply of data.post.replies" class="reply-item">
//               <img [src]="reply.author.avatar" [alt]="reply.author.name" class="avatar avatar-sm">
//               <div class="reply-body">
//                 <div class="reply-header">
//                   <span class="author-name">{{ reply.author.name }}</span>
//                   <span class="post-time">• {{ getTimeAgo(reply.createdAt) }}</span>
//                 </div>
//                 <p class="reply-content">{{ reply.content }}</p>
//                 <div class="reply-actions">
//                   <button
//                     class="like-btn"
//                     [class.liked]="isReplyLiked(reply)"
//                     (click)="onLikeReply(reply)"
//                     [matTooltip]="isReplyLiked(reply) ? 'Unlike' : 'Like'"
//                   >
//                     <mat-icon [svgIcon]="isReplyLiked(reply) ? 'heart-solid' : 'heart'"></mat-icon>
//                     <span *ngIf="reply.likes.length > 0">{{ reply.likes.length }}</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div class="new-reply-form">
//           <img [src]="data.currentUser.avatar" [alt]="data.currentUser.name" class="avatar">
//           <mat-form-field appearance="outline" class="reply-input">
//             <mat-label>Your reply</mat-label>
//             <textarea
//               matInput
//               [(ngModel)]="replyContent"
//               placeholder="Share your thoughts..."
//               rows="3"
//             ></textarea>
//           </mat-form-field>
//         </div>
//       </mat-dialog-content>

//       <mat-dialog-actions align="end">
//         <button mat-button (click)="onCancel()">Cancel</button>
//         <button
//           mat-flat-button
//           color="primary"
//           [disabled]="!replyContent.trim()"
//           (click)="onSubmit()"
//         >
//           Post Reply
//         </button>
//       </mat-dialog-actions>
//     </div>
//   `,
//   styles: [`
//     :host {
//       --primary-color: #3b82f6;
//       --text-color-primary: #1f2937;
//       --text-color-secondary: #6b7280;
//       --surface-hover: #f3f4f6;
//       --border-color: #e5e7eb;
//       --liked-color: #ef4444;
//     }

//     /* 4. Add styles for mat-icon to ensure proper size and alignment */
//     mat-icon {
//       width: 16px;
//       height: 16px;
//       font-size: 16px;
//     }

//     .dialog-header mat-icon {
//       width: 24px;
//       height: 24px;
//       font-size: 24px;
//     }

//     .reply-dialog-container {
//       width: 600px;
//       max-width: 90vw;
//       display: flex;
//       flex-direction: column;
//     }

//     .dialog-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       padding: 0 12px 0 24px;
//       flex-shrink: 0;
//     }
    
//     .dialog-header h2 {
//       font-size: 1.125rem;
//       font-weight: 600;
//     }

//     mat-dialog-content {
//       padding: 0 24px 20px;
//     }

//     .post-header, .reply-header {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//     }

//     .avatar {
//       width: 40px;
//       height: 40px;
//       border-radius: 50%;
//       object-fit: cover;
//       flex-shrink: 0;
//     }
//     .avatar-sm {
//       width: 32px;
//       height: 32px;
//     }

//     .author-name {
//       font-weight: 600;
//       color: var(--text-color-primary);
//     }

//     .post-time {
//       font-size: 0.8rem;
//       color: var(--text-color-secondary);
//     }
    
//     .post-context {
//       padding: 16px 0;
//     }
//     .post-content, .reply-content {
//       color: var(--text-color-primary);
//       margin: 8px 0 0;
//       white-space: pre-wrap;
//       word-wrap: break-word;
//       line-height: 1.6;
//     }
    
//     mat-divider {
//       margin: 8px 0;
//     }

//     .replies-container {
//       padding: 16px 0;
//     }
    
//     .replies-title {
//       font-size: 0.9rem;
//       font-weight: 600;
//       color: var(--text-color-secondary);
//       margin: 0 0 16px;
//     }

//     .replies-list {
//       max-height: 35vh;
//       overflow-y: auto;
//       padding-right: 8px; /* For scrollbar spacing */
//     }

//     .reply-item {
//       display: flex;
//       gap: 12px;
//     }
//     .reply-item:not(:last-child) {
//       margin-bottom: 20px;
//     }

//     .reply-body {
//       display: flex;
//       flex-direction: column;
//       width: 100%;
//     }

//     .reply-actions {
//       margin-top: 4px;
//     }

//     .like-btn {
//       display: inline-flex;
//       align-items: center;
//       gap: 6px;
//       padding: 4px 8px;
//       border: 1px solid transparent;
//       background: none;
//       color: var(--text-color-secondary);
//       border-radius: 99px;
//       font-size: 0.8rem;
//       font-weight: 500;
//       cursor: pointer;
//       transition: all 0.2s ease;
//     }
//     .like-btn:hover {
//       background: var(--surface-hover);
//       border-color: var(--border-color);
//     }
//     .like-btn.liked {
//       color: var(--liked-color);
//     }

//     /* Target the mat-icon inside a liked button */
//     .like-btn.liked mat-icon {
//       color: var(--liked-color);
//     }

//     .new-reply-form {
//       display: flex;
//       gap: 12px;
//       padding-top: 24px;
//     }
//     .reply-input {
//       flex-grow: 1;
//     }
    
//     mat-dialog-actions {
//       padding: 8px 24px;
//       border-top: 1px solid var(--border-color);
//       background-color: #f9fafb;
//     }
//   `]
// })
// export class ReplyDialogComponent {
//   replyContent = '';

//   constructor(
//     public dialogRef: MatDialogRef<ReplyDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: ReplyDialogData,
//     // 5. Inject MatIconRegistry and DomSanitizer
//     private matIconRegistry: MatIconRegistry,
//     private domSanitizer: DomSanitizer
//   ) {
//     // 6. Register the icons
//     this.matIconRegistry.addSvgIconLiteral('heart', this.domSanitizer.bypassSecurityTrustHtml(HEART_ICON));
//     this.matIconRegistry.addSvgIconLiteral('heart-solid', this.domSanitizer.bypassSecurityTrustHtml(HEART_SOLID_ICON));
//     this.matIconRegistry.addSvgIconLiteral('x-mark', this.domSanitizer.bypassSecurityTrustHtml(X_MARK_ICON));
//   }

//   onCancel(): void {
//     this.dialogRef.close();
//   }

//   onSubmit(): void {
//     if (this.replyContent.trim()) {
//       this.dialogRef.close(this.replyContent);
//     }
//   }

//   isReplyLiked(reply: Reply): boolean {
//     return reply.likes.includes(this.data.currentUser.id);
//   }

//   onLikeReply(reply: Reply): void {
//     const currentUserId = this.data.currentUser.id;
//     const index = reply.likes.indexOf(currentUserId);

//     if (index > -1) {
//       reply.likes.splice(index, 1);
//     } else {
//       reply.likes.push(currentUserId);
//     }
//   }

//   getTimeAgo(date: Date): string {
//     const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

//     if (seconds < 60) return 'just now';
//     if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
//     if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
//     return `${Math.floor(seconds / 86400)}d ago`;
//   }
// }
// import { Component, Inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
// import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatIconModule } from '@angular/material/icon';
// import { Post, User } from 'src/app/models/forum.model';

// export interface ReplyDialogData {
//   post: Post;
//   currentUser: User;
// }

// @Component({
//   selector: 'app-reply-dialog',
//   standalone: true,
//   imports: [
//     CommonModule, FormsModule, MatDialogModule, MatButtonModule,
//     MatFormFieldModule, MatInputModule, MatIconModule
//   ],
//   template: `
//     <div class="reply-dialog-header">
//         <h2 mat-dialog-title>Replying to {{ data.post.author.name }}</h2>
//         <button mat-icon-button (click)="onCancel()" aria-label="Close dialog">
//           <mat-icon>close</mat-icon>
//         </button>
//     </div>

//       <mat-dialog-content>
//         <div class="post-context">
//           <div class="context-header">
//             <img [src]="data.post.author.avatar" [alt]="data.post.author.name" class="avatar">
//             <span class="author-name">{{ data.post.author.name }}</span>
//           </div>
//           <p class="post-content">{{ data.post.content | slice:0:150 }}{{ data.post.content.length > 150 ? '...' : '' }}</p>
//         </div>

//         <div class="new-reply-form">
//           <img [src]="data.currentUser.avatar" [alt]="data.currentUser.name" class="avatar">
//           <mat-form-field appearance="outline" class="reply-input">
//             <mat-label>Your reply</mat-label>
//             <textarea
//               matInput
//               [(ngModel)]="replyContent"
//               cdkTextareaAutosize
//               #autosize="cdkTextareaAutosize"
//               cdkAutosizeMinRows="3"
//               cdkAutosizeMaxRows="8"
//               placeholder="Share your thoughts..."
//             ></textarea>
//           </mat-form-field>
//         </div>
//       </mat-dialog-content>

//       <mat-dialog-actions align="end">
//         <button mat-stroked-button (click)="onCancel()">Cancel</button>
//         <button
//           mat-flat-button
//           color="primary"
//           [disabled]="!replyContent.trim()"
//           (click)="onSubmit()"
//         >
//           Post Reply
//         </button>
//       </mat-dialog-actions>
//   `,
//   styles: [`
//     .reply-dialog-header {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         padding: 0 12px 0 24px;
//         border-bottom: 1px solid #e5e7eb;
//     }
//      h2[mat-dialog-title] {
//         font-size: 1.25rem;
//         font-weight: 600;
//         margin-bottom: 0;
//      }

//     mat-dialog-content {
//       padding: 20px 24px;
//     }
    
//     .post-context {
//       background-color: #f9fafb;
//       border-radius: 0.5rem;
//       padding: 1rem;
//       margin-bottom: 1.5rem;
//       border: 1px solid #f3f4f6;
//     }
//     .context-header {
//         display: flex;
//         align-items: center;
//         gap: 0.75rem;
//     }
//     .avatar {
//       width: 32px;
//       height: 32px;
//       border-radius: 50%;
//     }
//     .author-name {
//       font-weight: 600;
//     }
//     .post-content {
//       margin: 0.75rem 0 0;
//       color: #6b7280;
//       line-height: 1.6;
//     }

//     .new-reply-form {
//       display: flex;
//       gap: 1rem;
//       align-items: flex-start;
//     }
//     .reply-input {
//       flex-grow: 1;
//     }
    
//     mat-dialog-actions {
//       padding: 12px 24px;
//     }
//   `]
// })
// export class ReplyDialogComponent {
//   replyContent = '';
//   post: Post;
//   currentUser: User;

//   constructor(
//     public dialogRef: MatDialogRef<ReplyDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: ReplyDialogData,
//   ) {}

//   onCancel(): void {
//     this.dialogRef.close();
//   }

//   onSubmit(): void {
//     if (this.replyContent.trim()) {
//       this.dialogRef.close(this.replyContent);
//     }
//   }
// }
// import { Component, Inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
// import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatIconModule } from '@angular/material/icon';
// import { Post, User, Reply } from 'src/app/models/forum.model';

// // Added Reply to the import
// export interface ReplyDialogData {
//   post: Post;
//   replyingTo: Reply | null; // Note: You pass this from TopicDetail but don't use it yet in the dialog template.
//   currentUser: User;
// }

// @Component({
//   selector: 'app-reply-dialog',
//   standalone: true,
//   imports: [
//     CommonModule, FormsModule, MatDialogModule, MatButtonModule,
//     MatFormFieldModule, MatInputModule, MatIconModule
//   ],
//   template: `
//     <div class="reply-dialog-header">
//         <!-- 🚀 FIX 1: Added ?. to data.post.author -->
//         <h2 mat-dialog-title>Replying to {{ data.post.author.name || 'Post Author' }}</h2>
//         <button mat-icon-button (click)="onCancel()" aria-label="Close dialog">
//           <mat-icon>close</mat-icon>
//         </button>
//     </div>

//       <mat-dialog-content>
//         <div class="post-context">
//           <div class="context-header">
//             <!-- 🚀 FIX 2: Added ?. to data.post.author -->
//             <img [src]="data.post.author.avatarUrl" [alt]="data.post.author.name" class="avatar">
//             <span class="author-name">{{ data.post.author.name }}</span>
//           </div>
//           <p class="post-content">{{ data.post.content | slice:0:150 }}{{ data.post.content.length > 150 ? '...' : '' }}</p>
//         </div>

//         <div class="new-reply-form">
//           <!-- 🚀 FIX 3: Added ?. to data.currentUser -->
//           <img [src]="data.currentUser.avatarUrl" [alt]="data.currentUser.name" class="avatar">
//           <mat-form-field appearance="outline" class="reply-input">
//             <mat-label>Your reply</mat-label>
//             <textarea
//               matInput
//               [(ngModel)]="replyContent"
//               cdkTextareaAutosize
//               #autosize="cdkTextareaAutosize"
//               cdkAutosizeMinRows="3"
//               cdkAutosizeMaxRows="8"
//               placeholder="Share your thoughts..."
//             ></textarea>
//           </mat-form-field>
//         </div>
//       </mat-dialog-content>

//       <mat-dialog-actions align="end">
//         <button mat-stroked-button (click)="onCancel()">Cancel</button>
//         <button
//           mat-flat-button
//           color="primary"
//           [disabled]="!replyContent.trim()"
//           (click)="onSubmit()"
//         >
//           Post Reply
//         </button>
//       </mat-dialog-actions>
//   `,
//   styles: [`
//     .reply-dialog-header {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         padding: 0 12px 0 24px;
//         border-bottom: 1px solid #e5e7eb;
//     }
//      h2[mat-dialog-title] {
//         font-size: 1.25rem;
//         font-weight: 600;
//         margin-bottom: 0;
//      }

//     mat-dialog-content {
//       padding: 20px 24px;
//     }
    
//     .post-context {
//       background-color: #f9fafb;
//       border-radius: 0.5rem;
//       padding: 1rem;
//       margin-bottom: 1.5rem;
//       border: 1px solid #f3f4f6;
//     }
//     .context-header {
//         display: flex;
//         align-items: center;
//         gap: 0.75rem;
//     }
//     .avatar {
//       width: 32px;
//       height: 32px;
//       border-radius: 50%;
//     }
//     .author-name {
//       font-weight: 600;
//     }
//     .post-content {
//       margin: 0.75rem 0 0;
//       color: #6b7280;
//       line-height: 1.6;
//     }

//     .new-reply-form {
//       display: flex;
//       gap: 1rem;
//       align-items: flex-start;
//     }
//     .reply-input {
//       flex-grow: 1;
//     }
    
//     mat-dialog-actions {
//       padding: 12px 24px;
//     }
//   `]
// })
// export class ReplyDialogComponent {
//   replyContent = '';
//   // These properties are not needed as you access data directly from 'data' injection. 
//   // Commenting them out for clean TypeScript, though leaving them won't break anything.
//   // post: Post; 
//   // currentUser: User;

//   constructor(
//     public dialogRef: MatDialogRef<ReplyDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: ReplyDialogData,
//   ) {
//     // If you had used the removed post/currentUser properties, 
//     // you would initialize them here: 
//     // this.post = data.post; 
//     // this.currentUser = data.currentUser;
//   }

//   onCancel(): void {
//     this.dialogRef.close();
//   }

//   onSubmit(): void {
//     if (this.replyContent.trim()) {
//       this.dialogRef.close(this.replyContent);
//     }
//   }
// }


import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TextFieldModule } from '@angular/cdk/text-field'; // ⬅️ needed for cdkTextareaAutosize
import { Post, User, Reply } from 'src/app/models/forum.model';

export interface ReplyDialogData {
  post: Post;                 // uses loginUserName, content, createdAt, etc.
  replyingTo: Reply | null;   // optional: nested reply target
  currentUser: User | null;   // may be null during first render
}

@Component({
  selector: 'app-reply-dialog',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatDialogModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatIconModule, TextFieldModule
  ],
  template: `
    <div class="reply-dialog-header">
      <h2 mat-dialog-title>Replying to {{ data.post?.loginUserName || 'Post Author' }}</h2>
      <button mat-icon-button (click)="onCancel()" aria-label="Close dialog">
        <mat-icon>close</mat-icon>
      </button>
    </div>

    <mat-dialog-content>
      <div class="post-context">
        <div class="context-header">
          <img [src]="defaultAvatar" [alt]="data.post?.loginUserName || 'User avatar'" class="avatar">
          <span class="author-name">{{ data.post?.loginUserName || 'Unknown user' }}</span>
          <span class="time">{{ getTimeAgo(data.post?.createdAt) }}</span>
        </div>
        <p class="post-content">
          {{ data.post?.content || '—' }}
        </p>
      </div>

      <div class="new-reply-form">
        <img
          [src]="data.currentUser?.avatar || data.currentUser?.avatarUrl || defaultAvatar"
          [alt]="data.currentUser?.name || 'You'"
          class="avatar"
        />
        <mat-form-field appearance="outline" class="reply-input">
          <mat-label>Your reply</mat-label>
          <textarea
            matInput
            [(ngModel)]="replyContent"
            cdkTextareaAutosize
            #autosize="cdkTextareaAutosize"
            cdkAutosizeMinRows="3"
            cdkAutosizeMaxRows="8"
            placeholder="Share your thoughts..."
          ></textarea>
        </mat-form-field>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-stroked-button (click)="onCancel()">Cancel</button>
      <button
        mat-flat-button
        color="primary"
        [disabled]="isBlank(replyContent)"
        (click)="onSubmit()"
      >
        Post Reply
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .reply-dialog-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 0 12px 0 24px; border-bottom: 1px solid #e5e7eb;
    }
    h2[mat-dialog-title] { font-size: 1.25rem; font-weight: 600; margin-bottom: 0; }

    mat-dialog-content { padding: 20px 24px; }

    .post-context {
      background: #f9fafb; border-radius: 8px; padding: 12px; margin-bottom: 16px;
      border: 1px solid #f3f4f6;
    }
    .context-header { display: flex; align-items: center; gap: 10px; }
    .avatar { width: 32px; height: 32px; border-radius: 50%; }
    .author-name { font-weight: 600; }
    .time { font-size: 12px; color: #6b7280; margin-left: auto; }
    .post-content { margin: 8px 0 0; color: #374151; line-height: 1.6; }

    .new-reply-form { display: flex; gap: 12px; align-items: flex-start; }
    .reply-input { flex: 1; }

    mat-dialog-actions { padding: 12px 24px; }
  `]
})
export class ReplyDialogComponent {
  replyContent = '';
  defaultAvatar = 'assets/avatar-0.jpg'; // ensure this path exists

  constructor(
    public dialogRef: MatDialogRef<ReplyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReplyDialogData
  ) {}

  isBlank(v: string | null | undefined): boolean {
    return !v || !v.trim();
  }

  onCancel(): void { this.dialogRef.close(); }

  onSubmit(): void {
    if (!this.isBlank(this.replyContent)) {
      this.dialogRef.close(this.replyContent.trim());
    }
  }

  getTimeAgo(dateInput?: string | Date | null): string {
    if (!dateInput) return '';
    const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(d.getTime())) return '';
    const s = Math.floor((Date.now() - d.getTime()) / 1000);
    if (s < 60) return 'just now';
    const m = Math.floor(s / 60); if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60); if (h < 24) return `${h}h ago`;
    const days = Math.floor(h / 24); if (days < 7) return `${days}d ago`;
    const w = Math.floor(days / 7); return `${w}w ago`;
  }
}
