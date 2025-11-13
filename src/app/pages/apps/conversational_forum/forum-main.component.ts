// // // // src/app/pages/apps/conversational_forum/forum-main.component.ts

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ForumHeaderComponent } from './forum-header/forum-header.component';
// import { SearchBarComponent } from './search-bar/search-bar.component';
// import { CategoryFilterComponent } from './category-filter/category-filter.component';
// import { TopicsListComponent } from './topics-list/topics-list.component';
// import { TopicDetailComponent } from './topic-detail/topic-detail.component';
// import { CreateTopicModalComponent } from './create-topic-modal/create-topic-modal.component';
// import { NotificationsPanelComponent } from './notifications-panel/notifications-panel.component';
// import { ForumService } from 'src/app/services/forum.service';
// import { Topic, TopicDetail, Category } from 'src/app/models/forum.model';
// import { MaterialModule } from 'src/app/material.module';

// @Component({
//   selector: 'app-forum-main',
//   standalone: true,
//   imports: [
//     CommonModule, ForumHeaderComponent, SearchBarComponent, CategoryFilterComponent, TopicsListComponent, TopicDetailComponent, CreateTopicModalComponent,MaterialModule, NotificationsPanelComponent
//   ],
//   template: `
//    <mat-card class="cardWithShadow">
//       <mat-card-content class="p-24">
//     <div class="forum-container">
//       <app-forum-header
//         (createTopicClicked)="showCreateModal = true"
//         (notificationsClicked)="showNotifications = true"
//       ></app-forum-header>
//       <main class="main-content">
//         <div class="container">
//           <div *ngIf="!selectedTopic" class="topics-view">
//             <app-search-bar (search)="onSearch($event)"></app-search-bar>
//             <app-category-filter (categorySelected)="onCategorySelected($event)"></app-category-filter>
//             <app-topics-list [topics]="displayedTopics" (topicSelected)="onTopicSelected($event)"></app-topics-list>
//           </div>
//           <div *ngIf="selectedTopic" class="detail-view">
//             <app-topic-detail
//               [topic]="selectedTopic"
//               (back)="onBack()"
//               (replySubmitted)="onReplySubmitted($event)"
//             ></app-topic-detail>
//           </div>
//         </div>
//       </main>
//       <app-create-topic-modal
//         *ngIf="showCreateModal"
//         (close)="showCreateModal = false"
//         (topicCreated)="onTopicCreated($event)"
//       ></app-create-topic-modal>
//       <app-notifications-panel
//         *ngIf="showNotifications"
//         (close)="showNotifications = false"
//         (notificationClicked)="onNotificationClicked($event)"
//       ></app-notifications-panel>
//     </div>
//      </mat-card-content>
//       </mat-card>
//   `,
//   styles: [`
//     .forum-container { min-height: 100vh; background: #f9fafb; display: flex; flex-direction: column; }
//     .main-content { flex: 1; padding: 2rem 0; }
//     .container {
//       max-width: 1400px; /* MODIFIED */
//       margin: 0 auto;
//       padding: 0 1.5rem;
//     }
//     .topics-view, .detail-view { display: flex; flex-direction: column; gap: 1.5rem; }
//     @media (max-width: 640px) {
//       .main-content { padding: 1.5rem 0; }
//       .container { padding: 0 1rem; }
//       .topics-view, .detail-view { gap: 1rem; }
//     }
//   `]
// })
// export class ForumMainComponent {
//   allTopics: Topic[] = [];
//   displayedTopics: Topic[] = [];
//   selectedTopic: TopicDetail | null = null;
//   showCreateModal = false;
//   showNotifications = false;

//   constructor(private forumService: ForumService) {
//     this.forumService.topics$.subscribe(topics => {
//       this.allTopics = topics;
//       this.displayedTopics = topics;
//     });
//   }

//   onSearch(query: string): void {
//     if (!query.trim()) {
//       this.displayedTopics = this.allTopics;
//     } else {
//       this.displayedTopics = this.forumService.searchTopics(query);
//     }
//   }

//   onCategorySelected(category: string | null): void {
//     this.forumService.filterByCategory(category);
//   }

//   onTopicSelected(topic: Topic): void {
//     this.selectedTopic = this.forumService.getTopicById(topic.id);
//   }

//   onBack(): void {
//     this.selectedTopic = null;
//   }

//   onReplySubmitted(replyData: { content: string; parentPostId: string }): void {
//     if (this.selectedTopic) {
//       this.forumService.addReplyToTopic(this.selectedTopic.id, replyData.content, replyData.parentPostId);
//       this.selectedTopic = this.forumService.getTopicById(this.selectedTopic.id); // Refresh data
//     }
//   }

//   onTopicCreated(data: { title: string, category: string, content: string }): void {
//     this.forumService.createTopic(data.title, data.category as Category, data.content);
//     this.showCreateModal = false;
//   }

//   onNotificationClicked(topicId: string): void {
//     this.showNotifications = false;
//     this.selectedTopic = this.forumService.getTopicById(topicId);
//   }
// }




// // import { Component, OnInit, OnDestroy } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { Subscription } from 'rxjs';
// // import { ForumHeaderComponent } from './forum-header/forum-header.component';
// // import { SearchBarComponent } from './search-bar/search-bar.component';
// // import { CategoryFilterComponent } from './category-filter/category-filter.component';
// // import { TopicsListComponent } from './topics-list/topics-list.component';
// // import { TopicDetailComponent } from './topic-detail/topic-detail.component';
// // import { CreateTopicModalComponent } from './create-topic-modal/create-topic-modal.component';
// // import { NotificationsPanelComponent } from './notifications-panel/notifications-panel.component';
// // import { ForumService } from 'src/app/services/forum.service';
// // import { Topic, Post } from 'src/app/models/forum.model';
// // import { MaterialModule } from 'src/app/material.module';
// // import { WsService } from 'src/app/services/ws.service';

// // @Component({
// //   selector: 'app-forum-main',
// //   standalone: true,
// //   imports: [
// //     CommonModule,
// //     ForumHeaderComponent,
// //     SearchBarComponent,
// //     CategoryFilterComponent,
// //     TopicsListComponent,
// //     TopicDetailComponent,
// //     CreateTopicModalComponent,
// //     MaterialModule,
// //     NotificationsPanelComponent
// //   ],
// //   template: `
// //    <mat-card class="cardWithShadow">
// //       <mat-card-content class="p-24">
// //         <div class="forum-container">
// //           <app-forum-header
// //             (createTopicClicked)="showCreateModal = true"
// //             (notificationsClicked)="showNotifications = true"
// //           ></app-forum-header>

// //           <main class="main-content">
// //             <div class="container">
              
// //               <div *ngIf="!selectedTopicId" class="topics-view">
// //                 <app-search-bar (search)="onSearch($event)"></app-search-bar>
// //                 <app-category-filter (categorySelected)="onCategorySelected($event)"></app-category-filter>
                
// //                 <app-topics-list
// //                   *ngIf="!isLoadingTopics"
// //                   [topics]="displayedTopics"
// //                   (topicSelected)="onTopicSelected($event)"
// //                 ></app-topics-list>
// //               </div>

// //               <div *ngIf="selectedTopicId" class="detail-view">
// //                 <app-topic-detail
// //                   [topicId]="selectedTopicId"
// //                   (back)="onBack()"
// //                 ></app-topic-detail>
// //               </div>
// //             </div>
// //           </main>

// //           <app-create-topic-modal
// //             *ngIf="showCreateModal"
// //             (close)="showCreateModal = false"
// //             (topicCreated)="onTopicCreated($event)"
// //           ></app-create-topic-modal>

// //           <app-notifications-panel
// //             *ngIf="showNotifications"
// //             (close)="showNotifications = false"
// //             (notificationClicked)="onNotificationClicked($event)"
// //           ></app-notifications-panel>

// //         </div>
// //       </mat-card-content>
// //     </mat-card>
// //   `,
// //   styles: [`
// //     .forum-container { min-height: 100vh; background: #f9fafb; display: flex; flex-direction: column; }
// //     .main-content { flex: 1; padding: 2rem 0; }
// //     .container { max-width: 1400px; margin: 0 auto; padding: 0 1.5rem; }
// //     .topics-view, .detail-view { display: flex; flex-direction: column; gap: 1.5rem; }
// //     div[loading], .loading-indicator {
// //       padding: 2rem; text-align: center; color: #6b7280; font-style: italic;
// //     }
// //     @media (max-width: 640px) {
// //       .main-content { padding: 1.5rem 0; }
// //       .container { padding: 0 1rem; }
// //       .topics-view, .detail-view { gap: 1rem; }
// //     }
// //   `]
// // })
// // export class ForumMainComponent implements OnInit, OnDestroy {

// //   displayedTopics: Topic[] = [];
// //   selectedTopicId: string | null = null;
// //   showCreateModal = false;
// //   showNotifications = false;
// //   isLoadingTopics = false;

// //   private topicsSubscription: Subscription | null = null;
// //   private searchSubscription: Subscription | null = null;
// //   private wsSubscription: Subscription | null = null;

// //   constructor(
// //     private forumService: ForumService,
// //     private wsService: WsService
// //   ) {}

// //   ngOnInit(): void {
// //     this.isLoadingTopics = true;

// //     // Subscribe to topic stream
// //     this.topicsSubscription = this.forumService.topics$.subscribe(topics => {
// //       this.displayedTopics = topics;
// //       this.isLoadingTopics = false;
// //     });

// //     this.loadInitialTopics();

// //     // Initialize WebSocket connection
// //     this.wsService.connect();

// //     // Subscribe to title-wide updates (e.g., for new topics)
// //     this.wsService.subscribeToTopic('/topic/title.1');

// //     // Listen for WebSocket events
// //     this.wsSubscription = this.wsService.events$.subscribe((event: any) => {
// //       console.log('[WS Event Received]', event);

// //       if (event.type === 'postCreated') {
// //         console.log('New post created:', event.payload);
// //         // Refresh the main topic list
// //         this.loadInitialTopics();
// //       }

// //       // FIX: Add explicit null check for TS2531
// //       if (event.type === 'replyAdded' && this.selectedTopicId && this.selectedTopicId === event.refId?.toString()) {
// //         console.log('New reply in selected topic:', event.payload);
// //         // FIX: The method returns an Observable, so .subscribe() is correct (resolves TS2339).
// //         // Added explicit error handler to satisfy strict compilation (TS7006).
// //         this.forumService.getTopicById(this.selectedTopicId).subscribe({ 
// //             next: () => {},
// //             error: (e: any) => console.error('Error refreshing topic detail on WS update', e)
// //         }); 
// //       }
// //     });
// //   }

// //   ngOnDestroy(): void {
// //     this.topicsSubscription?.unsubscribe();
// //     this.searchSubscription?.unsubscribe();
// //     this.wsSubscription?.unsubscribe();
// //     this.wsService.disconnect();
// //   }

// //   loadInitialTopics(): void {
// //     this.isLoadingTopics = true;
// //     // FIX: Add explicit type for error (TS7006)
// //     this.forumService.fetchAllTopics().subscribe({
// //       error: (err: any) => {
// //         console.error('Error loading initial topics:', err);
// //         this.isLoadingTopics = false;
// //       }
// //     });
// //   }

// //   onSearch(query: string): void {
// //     this.isLoadingTopics = true;
// //     this.selectedTopicId = null;
// //     this.searchSubscription?.unsubscribe();

// //     if (!query.trim()) {
// //       this.loadInitialTopics();
// //     } else {
// //        // FIX: The method returns an Observable, so .subscribe() is correct (resolves TS2339).
// //        // FIX: Add explicit type for error (TS7006)
// //       this.searchSubscription = this.forumService.searchTopics(query).subscribe({
// //         error: (err: any) => {
// //           console.error('Error searching topics:', err);
// //           this.isLoadingTopics = false;
// //         }
// //       });
// //     }
// //   }

// //   onCategorySelected(category: string | null): void {
// //     this.isLoadingTopics = true;
// //     this.selectedTopicId = null;
// //     this.forumService.filterByCategory(category);
// //     setTimeout(() => (this.isLoadingTopics = false), 100);
// //   }

// //   onTopicSelected(topic: Topic): void {
// //     this.selectedTopicId = topic.id;
// //     // Subscribe to the post-specific topic for real-time updates
// //     this.wsService.subscribeToTopic(`/topic/post.${topic.id}`);
// //   }

// //   onBack(): void {
// //     // Unsubscribe from the post topic when leaving detail view
// //     if (this.selectedTopicId) {
// //         this.wsService.unsubscribeFromTopic(`/topic/post.${this.selectedTopicId}`);
// //     }
// //     this.selectedTopicId = null;
// //     this.loadInitialTopics();
// //   }

// //   onTopicCreated(newPost: Post): void {
// //     console.log('Topic created (Post):', newPost);
// //     this.showCreateModal = false;
// //     this.loadInitialTopics();
// //   }

// //   onNotificationClicked(event: any): void {
// //     console.log('Notification clicked:', event);
// //     this.showNotifications = false;
// //   }
// // }


// // conversational_forum/forum-main.component.ts (FINAL)
// // import { Component, OnInit, OnDestroy } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { Subscription } from 'rxjs';
// // import { ForumHeaderComponent } from './forum-header/forum-header.component';
// // import { SearchBarComponent } from './search-bar/search-bar.component';
// // import { CategoryFilterComponent } from './category-filter/category-filter.component';
// // import { TopicsListComponent } from './topics-list/topics-list.component';
// // import { TopicDetailComponent } from './topic-detail/topic-detail.component';
// // import { CreateTopicModalComponent } from './create-topic-modal/create-topic-modal.component';
// // import { NotificationsPanelComponent } from './notifications-panel/notifications-panel.component';
// // import { ForumService } from 'src/app/services/forum.service';
// // import { TopicDetail, Post } from 'src/app/models/forum.model';
// // import { MaterialModule } from 'src/app/material.module';
// // import { WsService } from 'src/app/services/ws.service';

// // @Component({
// //   selector: 'app-forum-main',
// //   standalone: true,
// //   imports: [
// //     CommonModule,
// //     ForumHeaderComponent,
// //     SearchBarComponent,
// //     CategoryFilterComponent,
// //     TopicsListComponent,
// //     TopicDetailComponent,
// //     CreateTopicModalComponent,
// //     MaterialModule,
// //     NotificationsPanelComponent
// //   ],
// //   template: `
// //     <mat-card class="cardWithShadow">
// //       <mat-card-content class="p-24">
// //         <div class="forum-container">
// //           <app-forum-header
// //             (createTopicClicked)="showCreateModal = true"
// //             (notificationsClicked)="showNotifications = true"
// //           ></app-forum-header>

// //           <main class="main-content">
// //             <div class="container">
// //               <div *ngIf="!selectedTopicId" class="topics-view">
// //                 <app-search-bar (search)="onSearch($event)"></app-search-bar>
// //                 <app-category-filter (categorySelected)="onCategorySelected($event)"></app-category-filter>
                
// //                 <app-topics-list
// //                   *ngIf="!isLoadingTopics"
// //                   [topics]="displayedTopics"
// //                   (topicSelected)="onTopicSelected($event)"
// //                 ></app-topics-list>
// //               </div>

// //               <div *ngIf="selectedTopicId" class="detail-view">
// //                 <app-topic-detail
// //                   [topicId]="selectedTopicId"
// //                   (back)="onBack()"
// //                 ></app-topic-detail>
// //               </div>
// //             </div>
// //           </main>

// //           <app-create-topic-modal
// //             *ngIf="showCreateModal"
// //             (close)="showCreateModal = false"
// //             (topicCreated)="onTopicCreated($event)"
// //           ></app-create-topic-modal>

// //           <app-notifications-panel
// //             *ngIf="showNotifications"
// //             (close)="showNotifications = false"
// //             (notificationClicked)="onNotificationClicked($event)"
// //           ></app-notifications-panel>

// //         </div>
// //       </mat-card-content>
// //     </mat-card>
// //   `,
// //     styles: [`
// //     .forum-container { min-height: 100vh; background: #f9fafb; display: flex; flex-direction: column; }
// //     .main-content { flex: 1; padding: 2rem 0; }
// //     .container {
// //       max-width: 1400px; /* MODIFIED */
// //       margin: 0 auto;
// //       padding: 0 1.5rem;
// //     }
// //     .topics-view, .detail-view { display: flex; flex-direction: column; gap: 1.5rem; }
// //     @media (max-width: 640px) {
// //       .main-content { padding: 1.5rem 0; }
// //       .container { padding: 0 1rem; }
// //       .topics-view, .detail-view { gap: 1rem; }
// //     }
// //   `]

// // })
// // export class ForumMainComponent implements OnInit, OnDestroy {

// //   displayedTopics: TopicDetail[] = [];  // ✅ FIXED TYPE
// //   selectedTopicId: string | null = null;
// //   showCreateModal = false;
// //   showNotifications = false;
// //   isLoadingTopics = false;

// //   private topicsSubscription: Subscription | null = null;
// //   private searchSubscription: Subscription | null = null;
// //   private wsSubscription: Subscription | null = null;

// //   constructor(
// //     private forumService: ForumService,
// //     private wsService: WsService
// //   ) {}

// //   ngOnInit(): void {
// //     this.isLoadingTopics = true;

// //     this.topicsSubscription = this.forumService.topics$.subscribe(topics => {
// //       this.displayedTopics = topics;
// //       this.isLoadingTopics = false;
// //     });
// //     console.log("[ForumMainComponent] Initializing and loading topics...");
    
// //     this.loadInitialTopics();

// //     this.wsService.connect();
// //     console.log("Forum Connected to WebSocket/STOMP endpoint.");
    
// //     this.wsService.subscribeToTopic('/topic/title.1');

// //     this.wsSubscription = this.wsService.events$.subscribe((event: any) => {
// //       if (event.type === 'postCreated') {
// //         this.loadInitialTopics();
// //       }

// //       if (event.type === 'replyAdded' && this.selectedTopicId && this.selectedTopicId === event.refId?.toString()) {
// //         this.forumService.getTopicById(this.selectedTopicId).subscribe({
// //             next: () => {},
// //             error: (e: any) => console.error('Error refreshing topic detail on WS update', e)
// //         });
// //       }
// //     });
// //   }

// //   ngOnDestroy(): void {
// //     this.topicsSubscription?.unsubscribe();
// //     this.searchSubscription?.unsubscribe();
// //     this.wsSubscription?.unsubscribe();
// //     this.wsService.disconnect();
// //   }

// //   loadInitialTopics(): void {
// //     this.isLoadingTopics = true;
// //     this.forumService.fetchAllTopics().subscribe({
// //       error: (err: any) => {
// //         console.error('Error loading initial topics:', err);
// //         this.isLoadingTopics = false;
// //       }
// //     });
// //   }

// //   onSearch(query: string): void {
// //     this.isLoadingTopics = true;
// //     this.selectedTopicId = null;
// //     this.searchSubscription?.unsubscribe();

// //     if (!query.trim()) {
// //       this.loadInitialTopics();
// //     } else {
// //       this.searchSubscription = this.forumService.searchTopics(query).subscribe({
// //         error: (err: any) => {
// //           console.error('Error searching topics:', err);
// //           this.isLoadingTopics = false;
// //         }
// //       });
// //     }
// //   }

// //   onCategorySelected(category: string | null): void {
// //     this.isLoadingTopics = true;
// //     this.selectedTopicId = null;
// //     this.forumService.filterByCategory(category);
// //     setTimeout(() => (this.isLoadingTopics = false), 100);
// //   }

// //   onTopicSelected(topic: TopicDetail): void {  // ✅ FIXED TYPE
// //     this.selectedTopicId = topic.topicId.toString();
// //     this.wsService.subscribeToTopic(`/topic/post.${topic.topicId}`);
// //   }

// //   onBack(): void {
// //     if (this.selectedTopicId) {
// //         this.wsService.unsubscribeFromTopic(`/topic/post.${this.selectedTopicId}`);
// //     }
// //     this.selectedTopicId = null;
// //     this.loadInitialTopics();
// //   }

// //   onTopicCreated(eventData: any): void { 
// //     console.log('Topic creation completed:', eventData);
// //     this.showCreateModal = false;
// //     this.loadInitialTopics();
// //   }

// //   onNotificationClicked(event: any): void {
// //     console.log('Notification clicked:', event);
// //     this.showNotifications = false;
// //   }
// // }


// // src/app/pages/apps/conversational_forum/forum-main.component.ts
// // import { Component, OnInit, OnDestroy } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { Subscription } from 'rxjs';
// // import { ForumHeaderComponent } from './forum-header/forum-header.component';
// // import { SearchBarComponent } from './search-bar/search-bar.component';
// // import { CategoryFilterComponent } from './category-filter/category-filter.component';
// // import { TopicsListComponent } from './topics-list/topics-list.component';
// // import { TopicDetailComponent } from './topic-detail/topic-detail.component';
// // import { CreateTopicModalComponent } from './create-topic-modal/create-topic-modal.component';
// // import { NotificationsPanelComponent } from './notifications-panel/notifications-panel.component';
// // import { ForumService } from 'src/app/services/forum.service';
// // import { Topic} from 'src/app/models/forum.model';
// // import { MaterialModule } from 'src/app/material.module';
// // import { WsService } from 'src/app/services/ws.service';
// // export interface Page<T> {
// //   content: T[];
// //   pageable: any;
// //   totalElements: number;
// //   totalPages: number;
// //   last: boolean;
// //   size: number;
// //   number: number;
// //   sort: any;
// //   numberOfElements: number;
// //   first: boolean;
// //   empty: boolean;
// // }
// // @Component({
// //   selector: 'app-forum-main',
// //   standalone: true,
// //   imports: [
// //     CommonModule,
// //     ForumHeaderComponent,
// //     SearchBarComponent,
// //     CategoryFilterComponent,
// //     TopicsListComponent,
// //     TopicDetailComponent,
// //     CreateTopicModalComponent,
// //     MaterialModule,
// //     NotificationsPanelComponent
// //   ],
// //   template: `
// //     <mat-card class="cardWithShadow">
// //       <mat-card-content class="p-24">
// //         <div class="forum-container">
// //           <app-forum-header
// //             (createTopicClicked)="showCreateModal = true"
// //             (notificationsClicked)="showNotifications = true"
// //           ></app-forum-header>

// //           <main class="main-content">
// //             <div class="container">
// //               <div *ngIf="!selectedTopicId" class="topics-view">
// //                 <app-search-bar (search)="onSearch($event)"></app-search-bar>
// //                 <app-category-filter (categorySelected)="onCategorySelected($event)"></app-category-filter>
                
// //                 <app-topics-list
// //                   *ngIf="!isLoadingTopics"
// //                   [topics]="displayedTopics"
// //                   (topicSelected)="onTopicSelected($event)"
// //                 ></app-topics-list>
// //               </div>

// //               <div *ngIf="selectedTopicId" class="detail-view">
// //                 <app-topic-detail
// //                   [topicId]="selectedTopicId"
// //                   (back)="onBack()"
// //                 ></app-topic-detail>
// //               </div>
// //             </div>
// //           </main>

// //           <app-create-topic-modal
// //             *ngIf="showCreateModal"
// //             (close)="showCreateModal = false"
// //             (topicCreated)="onTopicCreated($event)"
// //           ></app-create-topic-modal>

// //           <app-notifications-panel
// //             *ngIf="showNotifications"
// //             (close)="showNotifications = false"
// //             (notificationClicked)="onNotificationClicked($event)"
// //           ></app-notifications-panel>

// //         </div>
// //       </mat-card-content>
// //     </mat-card>
// //   `,
// //       styles: [`
// //     .forum-container { min-height: 100vh; background: #f9fafb; display: flex; flex-direction: column; }
// //     .main-content { flex: 1; padding: 2rem 0; }
// //     .container {
// //       max-width: 1400px; /* MODIFIED */
// //       margin: 0 auto;
// //       padding: 0 1.5rem;
// //     }
// //     .topics-view, .detail-view { display: flex; flex-direction: column; gap: 1.5rem; }
// //     @media (max-width: 640px) {
// //       .main-content { padding: 1.5rem 0; }
// //       .container { padding: 0 1rem; }
// //       .topics-view, .detail-view { gap: 1rem; }
// //     }
// //   `]

// // })
// // export class ForumMainComponent implements OnInit, OnDestroy {

// //   displayedTopics: Topic[] = [];   // use lightweight Topic[] for list
// //   selectedTopicId: string | null = null;
// //   showCreateModal = false;
// //   showNotifications = false;
// //   isLoadingTopics = false;

// //   private topicsSubscription: Subscription | null = null;
// //   private searchSubscription: Subscription | null = null;
// //   private wsSubscription: Subscription | null = null;

// //   constructor(
// //     private forumService: ForumService,
// //     private wsService: WsService
// //   ) {}

// //   ngOnInit(): void {
// //     this.isLoadingTopics = true;

// //     // subscribe to initial topics stream via fetchAllTopics() since ForumService returns a paged response
// //     this.topicsSubscription = this.forumService.fetchAllTopics().subscribe({
// //       next: (page: Page<Topic>) => {
// //         // assume the Page<Topic> shape exposes the array of items as `content` (common for paged APIs)
// //         this.displayedTopics = page?.content ?? [];
// //         this.isLoadingTopics = false;
// //       },
// //       error: (err: any) => {
// //         console.error('Error loading topics on init:', err);
// //         this.isLoadingTopics = false;
// //       }
// //     });
// //     console.log("[ForumMainComponent] Initializing and loading topics...");
    
// //     this.loadInitialTopics();

// //     this.wsService.connect();
// //     console.log("Forum Connected to WebSocket/STOMP endpoint.");
    
// //     // keep a topic titles subscription for real-time title changes
// //     this.wsService.subscribeToTopic?.('/topic/title.1');

// //     // subscribe to general ws events stream if available
// //     if (this.wsService.events$) {
// //       this.wsSubscription = this.wsService.events$.subscribe((event: any) => {
// //         if (event.type === 'postCreated') {
// //           this.loadInitialTopics();
// //         }

// //         if (event.type === 'replyAdded' && this.selectedTopicId && this.selectedTopicId === event.refId?.toString()) {
// //           this.forumService.getTopicById(this.selectedTopicId).subscribe({
// //               next: () => {},
// //               error: (e: any) => console.error('Error refreshing topic detail on WS update', e)
// //           });
// //         }
// //       });
// //     }
// //   }

// //   ngOnDestroy(): void {
// //     this.topicsSubscription?.unsubscribe();
// //     this.searchSubscription?.unsubscribe();
// //     this.wsSubscription?.unsubscribe();
// //     this.wsService.disconnect();
// //   }

// //   loadInitialTopics(): void {
// //     this.isLoadingTopics = true;
// //     this.forumService.fetchAllTopics().subscribe({
// //       next: (res: any) => {
// //         // some forumService.fetchAllTopics may update topics$ itself; whatever, keep spinner control
// //         this.isLoadingTopics = false;
// //       },
// //       error: (err: any) => {
// //         console.error('Error loading initial topics:', err);
// //         this.isLoadingTopics = false;
// //       }
// //     });
// //   }

// //   onSearch(query: string): void {
// //     this.isLoadingTopics = true;
// //     this.selectedTopicId = null;
// //     this.searchSubscription?.unsubscribe();

// //     if (!query.trim()) {
// //       this.loadInitialTopics();
// //     } else {
// //       this.searchSubscription = this.forumService.searchTopics(query).subscribe({
// //         next: () => { this.isLoadingTopics = false; },
// //         error: (err: any) => {
// //           console.error('Error searching topics:', err);
// //           this.isLoadingTopics = false;
// //         }
// //       });
// //     }
// //   }

// //   onCategorySelected(category: string | null): void {
// //     this.isLoadingTopics = true;
// //     this.selectedTopicId = null;
// //     this.forumService.filterByCategory(category);
// //     setTimeout(() => (this.isLoadingTopics = false), 100);
// //   }

// //   onTopicSelected(topic: Topic): void {
// //     // topics-list emits Topic — convert to topicId string for topic-detail
// //     this.selectedTopicId = topic.topicId.toString();
// //     this.wsService.subscribeToTopic?.(`/topic/post.${topic.topicId}`);
// //   }

// //   onBack(): void {
// //     if (this.selectedTopicId) {
// //         this.wsService.unsubscribeFromTopic?.(`/topic/post.${this.selectedTopicId}`);
// //     }
// //     this.selectedTopicId = null;
// //     this.loadInitialTopics();
// //   }

// //   onTopicCreated(eventData: any): void { 
// //     console.log('Topic creation completed:', eventData);
// //     this.showCreateModal = false;
// //     this.loadInitialTopics();
// //   }
  

// //   onNotificationClicked(event: any): void {
// //     console.log('Notification clicked:', event);
// //     this.showNotifications = false;
// //   }
// // }


// // import { Component, OnInit, OnDestroy, inject } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { Subscription } from 'rxjs';

// // // CRITICAL FIX: Using absolute paths for reliable service resolution
// // import { ForumService, Page, ForumTopicDto, TitleCreateRequest } from 'src/app/services/forum.service';
// // import { WsService } from 'src/app/services/ws.service'; 
// // import { Topic, TopicDetail } from 'src/app/models/forum.model'; // Assuming Topic model exists
// // import { ForumHeaderComponent } from './forum-header/forum-header.component';
// // import { SearchBarComponent } from './search-bar/search-bar.component';
// // import { CategoryFilterComponent } from './category-filter/category-filter.component';
// // import { TopicsListComponent } from './topics-list/topics-list.component';
// // import { TopicDetailComponent } from './topic-detail/topic-detail.component';
// // import { CreateTopicModalComponent } from './create-topic-modal/create-topic-modal.component';
// // import { NotificationsPanelComponent } from './notifications-panel/notifications-panel.component';
// // import { MaterialModule } from 'src/app/material.module';

// // @Component({
// //   selector: 'app-forum-main',
// //   standalone: true,
// //   imports: [
// //     CommonModule,
// //     ForumHeaderComponent,
// //     SearchBarComponent,
// //     CategoryFilterComponent,
// //     TopicsListComponent,
// //     TopicDetailComponent,
// //     CreateTopicModalComponent,
// //     NotificationsPanelComponent,
// //     MaterialModule // Include MaterialModule if using MatCard, etc.
// //   ],
// //   template: `
// //     <mat-card class="cardWithShadow">
// //       <mat-card-content class="p-24">
// //         <div class="forum-container">
// //           <app-forum-header
// //             (createTopicClicked)="showCreateModal = true"
// //             (notificationsClicked)="showNotifications = true"
// //           ></app-forum-header>

// //           <main class="main-content">
// //             <div class="container">
// //               <div *ngIf="!selectedTopicId" class="topics-view">
// //                 <app-search-bar (search)="onSearch($event)"></app-search-bar>
// //                 <app-category-filter (categorySelected)="onCategorySelected($event)"></app-category-filter>
                
// //                 <app-topics-list
// //                   *ngIf="!isLoadingTopics"
// //                   [topics]="displayedTopics"
// //                   (topicSelected)="onTopicSelected($event)"
// //                 ></app-topics-list>
// //               </div>

// //               <div *ngIf="selectedTopicId" class="detail-view">
// //                 <app-topic-detail
// //                   [topicId]="selectedTopicId"
// //                   (back)="onBack()"
// //                 ></app-topic-detail>
// //               </div>
// //             </div>
// //           </main>

// //           <app-create-topic-modal
// //             *ngIf="showCreateModal"
// //             (close)="showCreateModal = false"
// //             (topicCreated)="onTopicCreated($event)"
// //           ></app-create-topic-modal>

// //           <app-notifications-panel
// //             *ngIf="showNotifications"
// //             (close)="showNotifications = false"
// //             (notificationClicked)="onNotificationClicked($event)"
// //           ></app-notifications-panel>

// //         </div>
// //       </mat-card-content>
// //     </mat-card>
// //   `,
// //       styles: [`
// //     .forum-container { min-height: 100vh; background: #f9fafb; display: flex; flex-direction: column; }
// //     .main-content { flex: 1; padding: 2rem 0; }
// //     .container {
// //       max-width: 1400px; /* MODIFIED */
// //       margin: 0 auto;
// //       padding: 0 1.5rem;
// //     }
// //     .topics-view, .detail-view { display: flex; flex-direction: column; gap: 1.5rem; }
// //     @media (max-width: 640px) {
// //       .main-content { padding: 1.5rem 0; }
// //       .container { padding: 0 1rem; }
// //       .topics-view, .detail-view { gap: 1rem; }
// //     }
// //   `]


// // })
// // export class ForumMainComponent implements OnInit, OnDestroy {

// //   displayedTopics: Topic[] = [];
// //   selectedTopicId: string | null = null;
// //   showCreateModal = false;
// //   showNotifications = false;
// //   isLoadingTopics = false;

// //   private topicsSubscription: Subscription | null = null;
// //   private searchSubscription: Subscription | null = null;
// //   private wsSubscription: Subscription | null = null;

// //   // Consistent modern property injection style
// //   private forumService = inject(ForumService);
// //   private wsService = inject(WsService);

// //   ngOnInit(): void {
// //     this.isLoadingTopics = true;

// //     // STEP 1: Load the master list of Categories (Must run first for lookups)
// //     // This populates topicCategories$
// //     this.forumService.listAllTopics().subscribe(); 

// //     // STEP 2: Subscribe to the main list of Titles (displayTitles$)
// //     // This updates the local displayedTopics array whenever the list changes (e.g., filter, refresh)
// //     this.topicsSubscription = this.forumService.displayTitles$.subscribe((topics: Topic[]) => {
// //       this.displayedTopics = topics;
// //       this.isLoadingTopics = false;
// //     });
    
// //     // STEP 3: Trigger the initial API call to populate displayTitles$
// //     this.refreshTopicList(); 

// //     console.log("[ForumMainComponent] Initializing and loading topics...");
    
// //     this.wsService.connect();
// //     console.log("Forum Connected to WebSocket/STOMP endpoint.");
    
// //     this.wsService.subscribeToTopic?.('/topic/title.1');

// //     if (this.wsService.events$) {
// //       this.wsSubscription = this.wsService.events$.subscribe((event: any) => {
// //         if (event.type === 'postCreated') {
// //           this.refreshTopicList();
// //         }

// //         if (event.type === 'replyAdded' && this.selectedTopicId && this.selectedTopicId === event.refId?.toString()) {
// //           this.forumService.getTopicById(this.selectedTopicId).subscribe({
// //               next: () => {},
// //               error: (e: any) => console.error('Error refreshing topic detail on WS update', e)
// //           });
// //         }
// //       });
// //     }
// //   }

// //   ngOnDestroy(): void {
// //     this.topicsSubscription?.unsubscribe();
// //     this.searchSubscription?.unsubscribe();
// //     this.wsSubscription?.unsubscribe();
// //     this.wsService.disconnect();
// //   }
  
// //   refreshTopicList(): void {
// //     this.isLoadingTopics = true;
    
// //     // Calls GET /forum/titles (with no topic_id) and updates displayTitles$ via tap()
// //     this.forumService.fetchAllTopics().subscribe({
// //       next: (res) => { // Let TypeScript infer res as Page<Topic>
// //         this.isLoadingTopics = false;
// //       },
// //       error: (err: any) => {
// //         console.error('Error loading initial topics:', err);
// //         this.isLoadingTopics = false;
// //       }
// //     });
// //   }
  
// //   // 🎯 CRITICAL FIX HERE: Robust Topic ID lookup and API CALL execution
// //   onTopicCreated(eventData: { title: string, category: string, content: string }): void { 
// //     console.log('Attempting to create title with data:', eventData);
    
// //     // 1. Prepare and validate submitted category name
// //     const submittedCategoryName = eventData.category ? eventData.category.trim() : '';

// //     if (!submittedCategoryName) {
// //         console.error('Validation Error: Category name is empty.');
// //         this.showCreateModal = false;
// //         return;
// //     }
    
// //     // 2. Lookup Topic ID
// //     const allTopics = this.forumService.topicCategories$.getValue();
    
// //     // CRITICAL: Use robust trimmed comparison to fix "Topic ID not found" errors
// //     const foundTopic = allTopics.find(t => t.topicName.trim() === submittedCategoryName);

// //     if (foundTopic) {
// //         const topicId = foundTopic.topicId;
        
// //         const creationRequest: TitleCreateRequest = {
// //             topicId: topicId,
// //             title: eventData.title,
// //             descriptionMd: eventData.content
// //         };

// //         // 3. EXECUTE THE API CALL (POST /forum/titles)
// //         this.forumService.createTitle(creationRequest).subscribe({
// //             next: (newTitle) => {
// //                 console.log('API SUCCESS: POST /forum/titles', newTitle);
// //                 this.showCreateModal = false;
// //                 this.refreshTopicList(); // Refresh list to show new item
// //             },
// //             error: (err) => {
// //                 console.error('API ERROR: Failed to create title via service call.', err);
// //                 this.showCreateModal = false;
// //             }
// //         });
// //     } else {
// //         console.error(`Error: Topic ID not found for submitted category: "${eventData.category}". Check if GET /forum/topics returned this exact name.`);
// //         this.showCreateModal = false;
// //     }
// //   }

// //   // --- Other existing methods ---
  
// //   onSearch(query: string): void {
// //     this.isLoadingTopics = true;
// //     this.selectedTopicId = null;
// //     this.searchSubscription?.unsubscribe();

// //     if (!query.trim()) {
// //       this.refreshTopicList();
// //     } else {
// //       this.searchSubscription = this.forumService.searchTopics(query).subscribe({
// //         next: (topics: Topic[]) => { 
// //           this.displayedTopics = topics;
// //           this.isLoadingTopics = false; 
// //         },
// //         error: (err: any) => {
// //           console.error('Error searching topics:', err);
// //           this.isLoadingTopics = false;
// //         }
// //       });
// //     }
// //   }
  
// //   onCategorySelected(categoryName: string | null): void {
// //     this.isLoadingTopics = true;
// //     this.selectedTopicId = null;
// //     // This triggers the service to perform the ID lookup and then call listTitles
// //     this.forumService.filterByCategory(categoryName); 
// //     setTimeout(() => (this.isLoadingTopics = false), 100); 
// //   }

// //   onTopicSelected(topic: Topic): void {
// //     this.selectedTopicId = topic.topicId.toString();
// //     this.wsService.subscribeToTopic?.(`/topic/post.${topic.topicId}`);
// //   }

// //   onBack(): void {
// //     if (this.selectedTopicId) {
// //         this.wsService.unsubscribeFromTopic?.(`/topic/post.${this.selectedTopicId}`);
// //     }
// //     this.selectedTopicId = null;
// //     this.refreshTopicList();
// //   }
  
// //   onNotificationClicked(event: any): void {
// //     console.log('Notification clicked:', event);
// //     this.showNotifications = false;
// //   }
// // }



// // import { Component, OnInit, OnDestroy, inject } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { Subscription } from 'rxjs';

// // // CRITICAL FIX: Using absolute paths for reliable service resolution
// // import { ForumService, Page, ForumTopicDto, TitleCreateRequest } from 'src/app/services/forum.service';
// // import { WsService } from 'src/app/services/ws.service'; 
// // import { Topic, TopicDetail } from 'src/app/models/forum.model'; 
// // import { ForumHeaderComponent } from './forum-header/forum-header.component';
// // import { SearchBarComponent } from './search-bar/search-bar.component';
// // import { CategoryFilterComponent } from './category-filter/category-filter.component';
// // import { TopicsListComponent } from './topics-list/topics-list.component';
// // import { TopicDetailComponent } from './topic-detail/topic-detail.component';
// // import { CreateTopicModalComponent } from './create-topic-modal/create-topic-modal.component';
// // import { NotificationsPanelComponent } from './notifications-panel/notifications-panel.component';
// // import { MaterialModule } from 'src/app/material.module';

// // @Component({
// //   selector: 'app-forum-main',
// //   standalone: true,
// //   imports: [
// //     CommonModule,
// //     ForumHeaderComponent,
// //     SearchBarComponent,
// //     CategoryFilterComponent,
// //     TopicsListComponent,
// //     TopicDetailComponent,
// //     CreateTopicModalComponent,
// //     NotificationsPanelComponent,
// //     MaterialModule
// //   ],
// //   template: `
// //    <mat-card class="cardWithShadow">
// //       <mat-card-content class="p-24">
// //     <div class="forum-container">
// //       <app-forum-header
// //         (createTopicClicked)="showCreateModal = true"
// //         (notificationsClicked)="showNotifications = true"
// //       ></app-forum-header>
// //       <main class="main-content">
// //         <div class="container">
// //           <div *ngIf="!selectedTopic" class="topics-view">
// //             <app-search-bar (search)="onSearch($event)"></app-search-bar>
// //             <app-category-filter (categorySelected)="onCategorySelected($event)"></app-category-filter>
// //             <app-topics-list [topics]="displayedTopics" (topicSelected)="onTopicSelected($event)"></app-topics-list>
// //           </div>
// //           <div *ngIf="selectedTopic" class="detail-view">
// //             <app-topic-detail
// //               [topic]="selectedTopic"
// //               (back)="onBack()"
// //               (replySubmitted)="onReplySubmitted($event)"
// //             ></app-topic-detail>
// //           </div>
// //         </div>
// //       </main>
// //       <app-create-topic-modal
// //         *ngIf="showCreateModal"
// //         (close)="showCreateModal = false"
// //         (topicCreated)="onTopicCreated($event)"
// //       ></app-create-topic-modal>
// //       <app-notifications-panel
// //         *ngIf="showNotifications"
// //         (close)="showNotifications = false"
// //         (notificationClicked)="onNotificationClicked($event)"
// //       ></app-notifications-panel>
// //     </div>
// //      </mat-card-content>
// //       </mat-card>
// //   `,
// //   styles: [`
// //     .forum-container { min-height: 100vh; background: #f9fafb; display: flex; flex-direction: column; }
// //     .main-content { flex: 1; padding: 2rem 0; }
// //     .container {
// //       max-width: 1400px; /* MODIFIED */
// //       margin: 0 auto;
// //       padding: 0 1.5rem;
// //     }
// //     .topics-view, .detail-view { display: flex; flex-direction: column; gap: 1.5rem; }
// //     @media (max-width: 640px) {
// //       .main-content { padding: 1.5rem 0; }
// //       .container { padding: 0 1rem; }
// //       .topics-view, .detail-view { gap: 1rem; }
// //     }
// //   `]
// // })
// // export class ForumMainComponent implements OnInit, OnDestroy {

// //   displayedTopics: Topic[] = [];
// //   selectedTopicId: string | null = null;
// //   showCreateModal = false;
// //   showNotifications = false;
// //   isLoadingTopics = false;

// //   private topicsSubscription: Subscription | null = null;
// //   private searchSubscription: Subscription | null = null;
// //   private wsSubscription: Subscription | null = null;

// //   // Consistent modern property injection style
// //   private forumService = inject(ForumService);
// //   private wsService = inject(WsService);

// //   ngOnInit(): void {
// //     this.isLoadingTopics = true;

// //     // STEP 1: Load the master list of Categories (Must run first for lookups)
// //     // This populates topicCategories$
// //     this.forumService.listAllTopics().subscribe(); 

// //     // STEP 2: Subscribe to the main list of Titles (displayTitles$)
// //     this.topicsSubscription = this.forumService.displayTitles$.subscribe((topics: Topic[]) => {
// //       this.displayedTopics = topics;
// //       this.isLoadingTopics = false;
// //     });
    
// //     // STEP 3: Trigger the initial API call to populate displayTitles$
// //     this.refreshTopicList(); 

// //     console.log("[ForumMainComponent] Initializing and loading topics...");
    
// //     this.wsService.connect();
// //     console.log("Forum Connected to WebSocket/STOMP endpoint.");
    
// //     this.wsService.subscribeToTopic?.('/topic/title.1');

// //     if (this.wsService.events$) {
// //       this.wsSubscription = this.wsService.events$.subscribe((event: any) => {
// //         if (event.type === 'postCreated') {
// //           this.refreshTopicList();
// //         }

// //         if (event.type === 'replyAdded' && this.selectedTopicId && this.selectedTopicId === event.refId?.toString()) {
// //           this.forumService.getTopicById(this.selectedTopicId).subscribe({
// //               next: () => {},
// //               error: (e: any) => console.error('Error refreshing topic detail on WS update', e)
// //           });
// //         }
// //       });
// //     }
// //   }

// //   ngOnDestroy(): void {
// //     this.topicsSubscription?.unsubscribe();
// //     this.searchSubscription?.unsubscribe();
// //     this.wsSubscription?.unsubscribe();
// //     this.wsService.disconnect();
// //   }
  
// //   refreshTopicList(): void {
// //     this.isLoadingTopics = true;
    
// //     // Calls GET /forum/titles (with no topic_id) and updates displayTitles$ via tap()
// //     this.forumService.fetchAllTopics().subscribe({
// //       next: (res) => { // Let TypeScript infer res as Page<Topic>
// //         this.isLoadingTopics = false;
// //       },
// //       error: (err: any) => {
// //         console.error('Error loading initial topics:', err);
// //         this.isLoadingTopics = false;
// //       }
// //     });
// //   }
  
// //   // 🎯 CRITICAL FIX HERE: Robust Topic ID lookup and API CALL execution
// //   onTopicCreated(eventData: { title: string, category: string, content: string }): void { 
// //     console.log('Attempting to create title with data:', eventData);
    
// //     // 1. Prepare and validate submitted category name
// //     const submittedCategoryName = eventData.category ? eventData.category.trim() : '';

// //     if (!submittedCategoryName) {
// //         console.error('Validation Error: Category name is empty.');
// //         this.showCreateModal = false;
// //         return;
// //     }
    
// //     // 2. Lookup Topic ID
// //     const allTopics = this.forumService.topicCategories$.getValue();
    
// //     // CRITICAL: Use robust trimmed comparison
// //     const foundTopic = allTopics.find(t => t.topicName.trim() === submittedCategoryName);

// //     if (foundTopic) {
// //         const topicId = foundTopic.topicId;
        
// //         const creationRequest: TitleCreateRequest = {
// //             topicId: topicId,
// //             title: eventData.title,
// //             descriptionMd: eventData.content
// //         };

// //         // 3. EXECUTE THE API CALL (POST /forum/titles)
// //         this.forumService.createTitle(creationRequest).subscribe({
// //             next: (newTitle) => {
// //                 console.log('API SUCCESS: POST /forum/titles', newTitle);
// //                 this.showCreateModal = false;
// //                 this.refreshTopicList(); // Refresh list to show new item
// //             },
// //             error: (err) => {
// //                 console.error('API ERROR: Failed to create title via service call.', err);
// //                 this.showCreateModal = false;
// //             }
// //         });
// //     } else {
// //         console.error(`Error: Topic ID not found for submitted category: "${eventData.category}". Check if GET /forum/topics returned this exact name.`);
// //         this.showCreateModal = false;
// //     }
// //   }
// //   onReplySubmitted(event: any): void {
// //       console.log('Reply submitted (handler placeholder):', event);
// //       // Logic here would likely trigger fetchTopicDetail(this.selectedTopicId)
// //   }

// //   // --- Other existing methods (omitted for brevity) ---
  
// //   onSearch(query: string): void {
// //     this.isLoadingTopics = true;
// //     this.selectedTopicId = null;
// //     this.searchSubscription?.unsubscribe();

// //     if (!query.trim()) {
// //       this.refreshTopicList();
// //     } else {
// //       this.searchSubscription = this.forumService.searchTopics(query).subscribe({
// //         next: (topics: Topic[]) => { 
// //           this.displayedTopics = topics;
// //           this.isLoadingTopics = false; 
// //         },
// //         error: (err: any) => {
// //           console.error('Error searching topics:', err);
// //           this.isLoadingTopics = false;
// //         }
// //       });
// //     }
// //   }
  
// //   onCategorySelected(categoryName: string | null): void {
// //     this.isLoadingTopics = true;
// //     this.selectedTopicId = null;
// //     this.forumService.filterByCategory(categoryName); 
// //     setTimeout(() => (this.isLoadingTopics = false), 100); 
// //   }

// //   onTopicSelected(topic: Topic): void {
// //     this.selectedTopicId = topic.topicId.toString();
// //     this.wsService.subscribeToTopic?.(`/topic/post.${topic.topicId}`);
// //   }

// //   onBack(): void {
// //     if (this.selectedTopicId) {
// //         this.wsService.unsubscribeFromTopic?.(`/topic/post.${this.selectedTopicId}`);
// //     }
// //     this.selectedTopicId = null;
// //     this.refreshTopicList();
// //   }
  
// //   onNotificationClicked(event: any): void {
// //     console.log('Notification clicked:', event);
// //     this.showNotifications = false;
// //   }
// // }


// // import { Component, OnInit, OnDestroy, inject } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { Subscription } from 'rxjs';

// // // CRITICAL FIX: Using absolute paths for reliable service resolution
// // import { ForumService, Page, ForumTopicDto, TitleCreateRequest } from 'src/app/services/forum.service';
// // import { WsService } from 'src/app/services/ws.service'; // <--- FIX APPLIED HERE
// // import { Topic, TopicDetail } from 'src/app/models/forum.model'; 
// // import { ForumHeaderComponent } from './forum-header/forum-header.component';
// // import { SearchBarComponent } from './search-bar/search-bar.component';
// // import { CategoryFilterComponent } from './category-filter/category-filter.component';
// // import { TopicsListComponent } from './topics-list/topics-list.component';
// // import { TopicDetailComponent } from './topic-detail/topic-detail.component';
// // import { CreateTopicModalComponent } from './create-topic-modal/create-topic-modal.component';
// // import { NotificationsPanelComponent } from './notifications-panel/notifications-panel.component';
// // import { MaterialModule } from 'src/app/material.module';

// // @Component({
// //   selector: 'app-forum-main',
// //   standalone: true,
// //   imports: [
// //     CommonModule,
// //     ForumHeaderComponent,
// //     SearchBarComponent,
// //     CategoryFilterComponent,
// //     TopicsListComponent,
// //     TopicDetailComponent,
// //     CreateTopicModalComponent,
// //     NotificationsPanelComponent,
// //     MaterialModule
// //   ],
// //   template: `
// //    <mat-card class="cardWithShadow">
// //       <mat-card-content class="p-24">
// //     <div class="forum-container">
// //       <app-forum-header
// //         (createTopicClicked)="showCreateModal = true"
// //         (notificationsClicked)="showNotifications = true"
// //       ></app-forum-header>
// //       <main class="main-content">
// //         <div class="container">
// //           <!-- FIX: Check against selectedTopicDetail existence, which is the actual object -->
// //           <div *ngIf="!selectedTopicDetail" class="topics-view">
// //             <app-search-bar (search)="onSearch($event)"></app-search-bar>
// //             <app-category-filter (categorySelected)="onCategorySelected($event)"></app-category-filter>
// //             <app-topics-list [topics]="displayedTopics" (topicSelected)="onTopicSelected($event)"></app-topics-list>
// //           </div>
// //           <!-- FIX: Check against selectedTopicDetail existence -->
// //           <div *ngIf="selectedTopicDetail" class="detail-view">
// //             <app-topic-detail
// //               [topic]="selectedTopicDetail" <!-- FIX: Bind to the TopicDetail object -->
// //               (back)="onBack()"
// //               (replySubmitted)="onReplySubmitted($event)"
// //             ></app-topic-detail>
// //           </div>
// //         </div>
// //       </main>
// //       <app-create-topic-modal
// //         *ngIf="showCreateModal"
// //         (close)="showCreateModal = false"
// //         (topicCreated)="onTopicCreated($event)"
// //       ></app-create-topic-modal>
// //       <app-notifications-panel
// //         *ngIf="showNotifications"
// //         (close)="showNotifications = false"
// //         (notificationClicked)="onNotificationClicked($event)"
// //       ></app-notifications-panel>
// //     </div>
// //      </mat-card-content>
// //       </mat-card>
// //   `,
// //   styles: [`
// //     .forum-container { min-height: 100vh; background: #f9fafb; display: flex; flex-direction: column; }
// //     .main-content { flex: 1; padding: 2rem 0; }
// //     .container {
// //       max-width: 1400px; /* MODIFIED */
// //       margin: 0 auto;
// //       padding: 0 1.5rem;
// //     }
// //     .topics-view, .detail-view { display: flex; flex-direction: column; gap: 1.5rem; }
// //     @media (max-width: 640px) {
// //       .main-content { padding: 1.5rem 0; }
// //       .container { padding: 0 1rem; }
// //       .topics-view, .detail-view { gap: 1rem; }
// //     }
// //   `]
// // })
// // export class ForumMainComponent implements OnInit, OnDestroy {

// //   displayedTopics: Topic[] = [];
// //   selectedTopicId: string | null = null;
// //   // FIX: Added local state for the detail object (used by app-topic-detail)
// //   selectedTopicDetail: TopicDetail | null = null; 
// //   showCreateModal = false;
// //   showNotifications = false;
// //   isLoadingTopics = false;

// //   private topicsSubscription: Subscription | null = null;
// //   private searchSubscription: Subscription | null = null;
// //   private wsSubscription: Subscription | null = null;

// //   // Consistent modern property injection style
// //   private forumService = inject(ForumService);
// //   private wsService = inject(WsService);

// //   ngOnInit(): void {
// //     this.isLoadingTopics = true;

// //     // STEP 1: Load the master list of Categories (Must run first for lookups)
// //     // This populates topicCategories$
// //     this.forumService.listAllTopics().subscribe(); 

// //     // STEP 2: Subscribe to the main list of Titles (displayTitles$)
// //     this.topicsSubscription = this.forumService.displayTitles$.subscribe((topics: Topic[]) => {
// //       this.displayedTopics = topics;
// //       this.isLoadingTopics = false;
// //     });
    
// //     // STEP 3: Trigger the initial API call to populate displayTitles$
// //     this.refreshTopicList(); 

// //     console.log("[ForumMainComponent] Initializing and loading topics...");
    
// //     this.wsService.connect();
// //     console.log("Forum Connected to WebSocket/STOMP endpoint.");
    
// //     this.wsService.subscribeToTopic?.('/topic/title.1');

// //     if (this.wsService.events$) {
// //       this.wsSubscription = this.wsService.events$.subscribe((event: any) => {
// //         if (event.type === 'postCreated') {
// //           this.refreshTopicList();
// //         }

// //         // When a reply is added, refresh the detail view if the user is looking at it
// //         if (event.type === 'replyAdded' && this.selectedTopicId && this.selectedTopicId === event.refId?.toString()) {
// //           this.fetchTopicDetail(this.selectedTopicId); // Use a dedicated detail fetcher
// //         }
// //       });
// //     }
// //   }

// //   ngOnDestroy(): void {
// //     this.topicsSubscription?.unsubscribe();
// //     this.searchSubscription?.unsubscribe();
// //     this.wsSubscription?.unsubscribe();
// //     this.wsService.disconnect();
// //   }
  
// //   // Dedicated function to refresh the main list
// //   refreshTopicList(): void {
// //     this.isLoadingTopics = true;
    
// //     // Calls GET /forum/titles (with no topic_id) and updates displayTitles$ via tap()
// //     this.forumService.fetchAllTopics().subscribe({
// //       next: (res) => { // Let TypeScript infer res as Page<Topic>
// //         this.isLoadingTopics = false;
// //       },
// //       error: (err: any) => {
// //         console.error('Error loading initial topics:', err);
// //         this.isLoadingTopics = false;
// //       }
// //     });
// //   }

// //   // Dedicated function to fetch and set the selected topic detail
// //   fetchTopicDetail(topicId: string): void {
// //       this.forumService.getTopicById(topicId).subscribe({
// //           next: (detail: TopicDetail) => {
// //               this.selectedTopicDetail = detail; // Set the data object for the detail view
// //           },
// //           error: (e) => {
// //               console.error('Error fetching topic detail:', e);
// //               // Handle error: maybe redirect back to the main list
// //               this.selectedTopicDetail = null; 
// //               this.selectedTopicId = null;
// //           }
// //       });
// //   }

// //   // FIX: Placeholder for missing method
// //   onReplySubmitted(event: any): void {
// //       console.log('Reply submitted (handler placeholder):', event);
// //       // Logic here would likely trigger fetchTopicDetail(this.selectedTopicId)
// //   }
  
// //   // 🎯 CRITICAL FIX HERE: Robust Topic ID lookup and API CALL execution
// //   onTopicCreated(eventData: { title: string, category: string, content: string }): void { 
// //     console.log('Attempting to create title with data:', eventData);
    
// //     // 1. Prepare and validate submitted category name
// //     const submittedCategoryName = eventData.category ? eventData.category.trim() : '';

// //     if (!submittedCategoryName) {
// //         console.error('Validation Error: Category name is empty.');
// //         this.showCreateModal = false;
// //         return;
// //     }
    
// //     // 2. Lookup Topic ID
// //     const allTopics = this.forumService.topicCategories$.getValue();
    
// //     // CRITICAL: Use robust trimmed comparison
// //     const foundTopic = allTopics.find(t => t.topicName.trim() === submittedCategoryName);

// //     if (foundTopic) {
// //         const topicId = foundTopic.topicId;
        
// //         const creationRequest: TitleCreateRequest = {
// //             topicId: topicId,
// //             title: eventData.title,
// //             descriptionMd: eventData.content
// //         };

// //         // 3. EXECUTE THE API CALL (POST /forum/titles)
// //         this.forumService.createTitle(creationRequest).subscribe({
// //             next: (newTitle) => {
// //                 console.log('API SUCCESS: POST /forum/titles', newTitle);
// //                 this.showCreateModal = false;
// //                 this.refreshTopicList(); // Refresh list to show new item
// //             },
// //             error: (err) => {
// //                 console.error('API ERROR: Failed to create title via service call.', err);
// //                 this.showCreateModal = false;
// //             }
// //         });
// //     } else {
// //         console.error(`Error: Topic ID not found for submitted category: "${eventData.category}". Check if GET /forum/topics returned this exact name.`);
// //         this.showCreateModal = false;
// //     }
// //   }

// //   // --- Other existing methods ---
  
// //   onSearch(query: string): void {
// //     this.isLoadingTopics = true;
// //     this.selectedTopicId = null;
// //     this.selectedTopicDetail = null; // Clear detail view
// //     this.searchSubscription?.unsubscribe();

// //     if (!query.trim()) {
// //       this.refreshTopicList();
// //     } else {
// //       this.searchSubscription = this.forumService.searchTopics(query).subscribe({
// //         next: (topics: Topic[]) => { 
// //           this.displayedTopics = topics;
// //           this.isLoadingTopics = false; 
// //         },
// //         error: (err: any) => {
// //           console.error('Error searching topics:', err);
// //           this.isLoadingTopics = false;
// //         }
// //       });
// //     }
// //   }
  
// //   onCategorySelected(categoryName: string | null): void {
// //     this.isLoadingTopics = true;
// //     this.selectedTopicId = null;
// //     this.selectedTopicDetail = null; // Clear detail view
// //     this.forumService.filterByCategory(categoryName); 
// //     setTimeout(() => (this.isLoadingTopics = false), 100); 
// //   }

// //   onTopicSelected(topic: Topic): void {
// //     // 1. Set the ID to manage the current state
// //     this.selectedTopicId = topic.topicId.toString();
// //     this.selectedTopicDetail = null; // Clear old detail before loading new one

// //     // 2. Fetch the full detail object needed by app-topic-detail
// //     this.fetchTopicDetail(this.selectedTopicId); 

// //     // 3. Subscribe to real-time updates for this specific topic
// //     this.wsService.subscribeToTopic?.(`/topic/post.${topic.topicId}`);
// //   }

// //   onBack(): void {
// //     if (this.selectedTopicId) {
// //         this.wsService.unsubscribeFromTopic?.(`/topic/post.${this.selectedTopicId}`);
// //     }
// //     this.selectedTopicId = null;
// //     this.selectedTopicDetail = null;
// //     this.refreshTopicList();
// //   }
  
// //   onNotificationClicked(event: any): void {
// //     console.log('Notification clicked:', event);
// //     this.showNotifications = false;
// //   }
// //   isReplyLiked(reply: any): boolean {
// //     // Implement logic to check if the current user has liked the reply
// //     // For now, return a placeholder based on likesCount
// //     return reply.likesCount > 0;
// // }

// // // Fixes TS2554 for onLikeReply
// // onLikeReply(post: any, reply: any): void {
// //     console.log('Toggle like on reply:', reply.replyId);
// //     // Call forumService.toggleLike({ postId: null, replyId: reply.replyId })
// // }

// // // Fixes TS2339 for submitReply
// // submitReply(): void {
// //     console.log('Submitting reply (placeholder).');
// //     // Implement logic to call addReplyToPost or addNestedReply
// // }
// // }

// // import { Component, OnInit, OnDestroy, inject } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { Subscription } from 'rxjs';

// // // CRITICAL FIX: Using absolute paths for reliable service resolution
// // import { ForumService, Page, ForumTopicDto, TitleCreateRequest } from 'src/app/services/forum.service';
// // import { WsService } from 'src/app/services/ws.service'; 
// // import { Topic, TopicDetail } from 'src/app/models/forum.model'; 
// // import { ForumHeaderComponent } from './forum-header/forum-header.component';
// // import { SearchBarComponent } from './search-bar/search-bar.component';
// // import { CategoryFilterComponent } from './category-filter/category-filter.component';
// // import { TopicsListComponent } from './topics-list/topics-list.component';
// // import { TopicDetailComponent } from './topic-detail/topic-detail.component';
// // import { CreateTopicModalComponent } from './create-topic-modal/create-topic-modal.component';
// // import { NotificationsPanelComponent } from './notifications-panel/notifications-panel.component';
// // import { MaterialModule } from 'src/app/material.module';

// // @Component({
// //   selector: 'app-forum-main',
// //   standalone: true,
// //   imports: [
// //     CommonModule,
// //     ForumHeaderComponent,
// //     SearchBarComponent,
// //     CategoryFilterComponent,
// //     TopicsListComponent,
// //     TopicDetailComponent,
// //     CreateTopicModalComponent,
// //     NotificationsPanelComponent,
// //     MaterialModule
// //   ],
// //   template: `
// //    <mat-card class="cardWithShadow">
// //       <mat-card-content class="p-24">
// //     <div class="forum-container">
// //       <app-forum-header
// //         (createTopicClicked)="showCreateModal = true"
// //         (notificationsClicked)="showNotifications = true"
// //       ></app-forum-header>
// //       <main class="main-content">
// //         <div class="container">
// //           <!-- FIX: Check against selectedTopicDetail existence -->
// //           <div *ngIf="!selectedTopicDetail" class="topics-view">
// //             <app-search-bar (search)="onSearch($event)"></app-search-bar>
// //             <app-category-filter (categorySelected)="onCategorySelected($event)"></app-category-filter>
// //             <app-topics-list [topics]="displayedTopics" (topicSelected)="onTopicSelected($event)"></app-topics-list>
// //           </div>
// //           <!-- FIX: Check against selectedTopicDetail existence -->
// //           <div *ngIf="selectedTopicDetail" class="detail-view">
// //             <!-- FIX: Correctly close tag and bind to the TopicDetail object -->
// //             <app-topic-detail
// //               [topic]="selectedTopicDetail"
// //               (back)="onBack()"
// //               (replySubmitted)="onReplySubmitted($event)"
// //             ></app-topic-detail>
// //           </div>
// //         </div>
// //       </main>
// //       <app-create-topic-modal
// //         *ngIf="showCreateModal"
// //         (close)="showCreateModal = false"
// //         (topicCreated)="onTopicCreated($event)"
// //       ></app-create-topic-modal>
// //       <app-notifications-panel
// //         *ngIf="showNotifications"
// //         (close)="showNotifications = false"
// //         (notificationClicked)="onNotificationClicked($event)"
// //       ></app-notifications-panel>
// //     </div>
// //      </mat-card-content>
// //       </mat-card>
// //   `,
// //   styles: [`
// //     .forum-container { min-height: 100vh; background: #f9fafb; display: flex; flex-direction: column; }
// //     .main-content { flex: 1; padding: 2rem 0; }
// //     .container {
// //       max-width: 1400px; /* MODIFIED */
// //       margin: 0 auto;
// //       padding: 0 1.5rem;
// //     }
// //     .topics-view, .detail-view { display: flex; flex-direction: column; gap: 1.5rem; }
// //     @media (max-width: 640px) {
// //       .main-content { padding: 1.5rem 0; }
// //       .container { padding: 0 1rem; }
// //       .topics-view, .detail-view { gap: 1rem; }
// //     }
// //   `]
// // })
// // export class ForumMainComponent implements OnInit, OnDestroy {

// //   displayedTopics: Topic[] = [];
// //   selectedTopicId: string | null = null;
// //   // FIX: Added local state for the detail object (used by app-topic-detail)
// //   selectedTopicDetail: TopicDetail | null = null; 
// //   showCreateModal = false;
// //   showNotifications = false;
// //   isLoadingTopics = false;

// //   private topicsSubscription: Subscription | null = null;
// //   private searchSubscription: Subscription | null = null;
// //   private wsSubscription: Subscription | null = null;

// //   // Consistent modern property injection style
// //   private forumService = inject(ForumService);
// //   private wsService = inject(WsService);

// //   ngOnInit(): void {
// //     this.isLoadingTopics = true;

// //     // STEP 1: Load the master list of Categories (Must run first for lookups)
// //     this.forumService.listAllTopics().subscribe(); 

// //     // STEP 2: Subscribe to the main list of Titles (displayTitles$)
// //     this.topicsSubscription = this.forumService.displayTitles$.subscribe((topics: Topic[]) => {
// //       this.displayedTopics = topics;
// //       this.isLoadingTopics = false;
// //     });
    
// //     // STEP 3: Trigger the initial API call to populate displayTitles$
// //     this.refreshTopicList(); 

// //     console.log("[ForumMainComponent] Initializing and loading topics...");
    
// //     this.wsService.connect();
// //     console.log("Forum Connected to WebSocket/STOMP endpoint.");
    
// //     this.wsService.subscribeToTopic?.('/topic/title.1');

// //     if (this.wsService.events$) {
// //       this.wsSubscription = this.wsService.events$.subscribe((event: any) => {
// //         if (event.type === 'postCreated') {
// //           this.refreshTopicList();
// //         }

// //         if (event.type === 'replyAdded' && this.selectedTopicId && this.selectedTopicId === event.refId?.toString()) {
// //           this.fetchTopicDetail(this.selectedTopicId); 
// //         }
// //       });
// //     }
// //   }

// //   ngOnDestroy(): void {
// //     this.topicsSubscription?.unsubscribe();
// //     this.searchSubscription?.unsubscribe();
// //     this.wsSubscription?.unsubscribe();
// //     this.wsService.disconnect();
// //   }
  
// //   refreshTopicList(): void {
// //     this.isLoadingTopics = true;
    
// //     // Calls GET /forum/titles (with no topic_id) and updates displayTitles$ via tap()
// //     this.forumService.fetchAllTopics().subscribe({
// //       next: (res) => { 
// //         this.isLoadingTopics = false;
// //       },
// //       error: (err: any) => {
// //         console.error('Error loading initial topics:', err);
// //         this.isLoadingTopics = false;
// //       }
// //     });
// //   }

// //   // Dedicated function to fetch and set the selected topic detail
// //   fetchTopicDetail(topicId: string): void {
// //       this.forumService.getTopicById(topicId).subscribe({
// //           next: (detail: TopicDetail) => {
// //               this.selectedTopicDetail = detail; // Set the data object for the detail view
// //           },
// //           error: (e) => {
// //               console.error('Error fetching topic detail:', e);
// //               // Handle error: redirect back to the main list
// //               this.selectedTopicDetail = null; 
// //               this.selectedTopicId = null;
// //           }
// //       });
// //   }

// //   // FIX: Placeholder for missing method referenced in template
// //   onReplySubmitted(event: any): void {
// //       console.log('Reply submitted (handler placeholder):', event);
// //       // Logic here would likely trigger fetchTopicDetail(this.selectedTopicId)
// //   }
  
// //   // 🎯 CRITICAL FIX HERE: Robust Topic ID lookup and API CALL execution
// //   onTopicCreated(eventData: { title: string, category: string, content: string }): void { 
// //     console.log('Attempting to create title with data:', eventData);
    
// //     // 1. Prepare and validate submitted category name
// //     const submittedCategoryName = eventData.category ? eventData.category.trim() : '';

// //     if (!submittedCategoryName) {
// //         console.error('Validation Error: Category name is empty.');
// //         this.showCreateModal = false;
// //         return;
// //     }
    
// //     // 2. Lookup Topic ID
// //     const allTopics = this.forumService.topicCategories$.getValue();
    
// //     // CRITICAL: Use robust trimmed comparison
// //     const foundTopic = allTopics.find(t => t.topicName.trim() === submittedCategoryName);

// //     if (foundTopic) {
// //         const topicId = foundTopic.topicId;
        
// //         const creationRequest: TitleCreateRequest = {
// //             topicId: topicId,
// //             title: eventData.title,
// //             descriptionMd: eventData.content
// //         };

// //         // 3. EXECUTE THE API CALL (POST /forum/titles)
// //         this.forumService.createTitle(creationRequest).subscribe({
// //             next: (newTitle) => {
// //                 console.log('API SUCCESS: POST /forum/titles', newTitle);
// //                 this.showCreateModal = false;
// //                 this.refreshTopicList(); // Refresh list to show new item
// //             },
// //             error: (err) => {
// //                 console.error('API ERROR: Failed to create title via service call.', err);
// //                 this.showCreateModal = false;
// //             }
// //         });
// //     } else {
// //         console.error(`Error: Topic ID not found for submitted category: "${eventData.category}". Check if GET /forum/topics returned this exact name.`);
// //         this.showCreateModal = false;
// //     }
// //   }

// //   // --- Other existing methods ---
  
// //   onSearch(query: string): void {
// //     this.isLoadingTopics = true;
// //     this.selectedTopicId = null;
// //     this.selectedTopicDetail = null; // Clear detail view
// //     this.searchSubscription?.unsubscribe();

// //     if (!query.trim()) {
// //       this.refreshTopicList();
// //     } else {
// //       this.searchSubscription = this.forumService.searchTopics(query).subscribe({
// //         next: (topics: Topic[]) => { 
// //           this.displayedTopics = topics;
// //           this.isLoadingTopics = false; 
// //         },
// //         error: (err: any) => {
// //           console.error('Error searching topics:', err);
// //           this.isLoadingTopics = false;
// //         }
// //       });
// //     }
// //   }
  
// //   onCategorySelected(categoryName: string | null): void {
// //     this.isLoadingTopics = true;
// //     this.selectedTopicId = null;
// //     this.selectedTopicDetail = null; // Clear detail view
// //     this.forumService.filterByCategory(categoryName); 
// //     setTimeout(() => (this.isLoadingTopics = false), 100); 
// //   }

// //   onTopicSelected(topic: Topic): void {
// //     // 1. Set the ID to manage the current state
// //     this.selectedTopicId = topic.topicId.toString();
// //     this.selectedTopicDetail = null; // Clear old detail before loading new one

// //     // 2. Fetch the full detail object needed by app-topic-detail
// //     this.fetchTopicDetail(this.selectedTopicId); 

// //     // 3. Subscribe to real-time updates for this specific topic
// //     this.wsService.subscribeToTopic?.(`/topic/post.${topic.topicId}`);
// //   }

// //   onBack(): void {
// //     if (this.selectedTopicId) {
// //         this.wsService.unsubscribeFromTopic?.(`/topic/post.${this.selectedTopicId}`);
// //     }
// //     this.selectedTopicId = null;
// //     this.selectedTopicDetail = null;
// //     this.refreshTopicList();
// //   }
  
// //   onNotificationClicked(event: any): void {
// //     console.log('Notification clicked:', event);
// //     this.showNotifications = false;
// //   }
  
// // }





// // /src/app/pages/apps/conversational_forum/forum-main.component.ts
// import { Component, OnInit, OnDestroy, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Subscription } from 'rxjs';

// import {
//   ForumService,
//   Page,
//   ForumTopicDto,
//   TitleCreateRequest
// } from 'src/app/services/forum.service';
// import { WsService } from 'src/app/services/ws.service';
// import { Topic, TopicDetail } from 'src/app/models/forum.model';

// import { ForumHeaderComponent } from './forum-header/forum-header.component';
// import { SearchBarComponent } from './search-bar/search-bar.component';
// import { CategoryFilterComponent } from './category-filter/category-filter.component';
// import { TopicsListComponent } from './topics-list/topics-list.component';
// import { TopicDetailComponent } from './topic-detail/topic-detail.component';
// import { CreateTopicModalComponent } from './create-topic-modal/create-topic-modal.component';

// import { MaterialModule } from 'src/app/material.module';

// @Component({
//   selector: 'app-forum-main',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ForumHeaderComponent,
//     SearchBarComponent,
//     CategoryFilterComponent,
//     TopicsListComponent,
//     TopicDetailComponent,
//     CreateTopicModalComponent,
    
//     MaterialModule
//   ],
//   template: `
//     <mat-card class="cardWithShadow">
//       <mat-card-content class="p-24">
//         <div class="forum-container">
//           <app-forum-header
//             (createTopicClicked)="showCreateModal = true"
//             (notificationsClicked)="showNotifications = true"
//           ></app-forum-header>

//           <main class="main-content">
//             <div class="container">
//               <div *ngIf="!selectedTopicDetail" class="topics-view">
//                 <app-search-bar (search)="onSearch($event)"></app-search-bar>
//                 <app-category-filter
//                   (categorySelected)="onCategorySelected($event)"
//                 ></app-category-filter>
//                 <app-topics-list
//                   [topics]="displayedTopics"
//                   (topicSelected)="onTopicSelected($event)"
//                 ></app-topics-list>
//               </div>

//               <div *ngIf="selectedTopicDetail" class="detail-view">
//                 <app-topic-detail
//                   [topic]="selectedTopicDetail"
//                   (back)="onBack()"
//                   (replySubmitted)="onReplySubmitted($event)"
//                 ></app-topic-detail>
//               </div>
//             </div>
//           </main>

//           <app-create-topic-modal
//             *ngIf="showCreateModal"
//             (close)="showCreateModal = false"
//             (topicCreated)="onTopicCreated($event)"
//           ></app-create-topic-modal>

          
//         </div>
//       </mat-card-content>
//     </mat-card>
//   `,
//   styles: [`
//     .forum-container {
//       min-height: 100vh;
//       background: #f9fafb;
//       display: flex;
//       flex-direction: column;
//     }
//     .main-content {
//       flex: 1;
//       padding: 2rem 0;
//     }
//     .container {
//       max-width: 1400px;
//       margin: 0 auto;
//       padding: 0 1.5rem;
//     }
//     .topics-view,
//     .detail-view {
//       display: flex;
//       flex-direction: column;
//       gap: 1.5rem;
//     }
//     @media (max-width: 640px) {
//       .main-content { padding: 1.5rem 0; }
//       .container { padding: 0 1rem; }
//       .topics-view,
//       .detail-view { gap: 1rem; }
//     }
//   `]
// })
// export class ForumMainComponent implements OnInit, OnDestroy {
//   displayedTopics: Topic[] = [];
//   selectedTopicId: string | null = null;
//   selectedTopicDetail: TopicDetail | null = null;

//   showCreateModal = false;
//   showNotifications = false;
//   isLoadingTopics = false;

//   private topicsSubscription: Subscription | null = null;
//   private searchSubscription: Subscription | null = null;
//   private wsSubscription: Subscription | null = null;

//   private forumService = inject(ForumService);
//   private wsService = inject(WsService);

//   ngOnInit(): void {
//     this.isLoadingTopics = true;

//     this.forumService.listAllTopics().subscribe();

//     this.topicsSubscription = this.forumService.displayTitles$
//       .subscribe((topics: Topic[]) => {
//         this.displayedTopics = topics;
//         this.isLoadingTopics = false;
//       });

//     this.refreshTopicList();

//     this.wsService.connect();
//     this.wsService.subscribeToTopic?.('/topic/title.1');

//     if (this.wsService.events$) {
//       this.wsSubscription = this.wsService.events$
//         .subscribe((event: any) => {
//           if (event.type === 'postCreated') {
//             this.refreshTopicList();
//           }

//           if (
//             event.type === 'replyAdded' &&
//             this.selectedTopicId &&
//             this.selectedTopicId === event.refId?.toString()
//           ) {
//             this.fetchTopicDetail(this.selectedTopicId);
//           }
//         });
//     }
//   }

//   ngOnDestroy(): void {
//     this.topicsSubscription?.unsubscribe();
//     this.searchSubscription?.unsubscribe();
//     this.wsSubscription?.unsubscribe();
//     this.wsService.disconnect();
//   }

//   refreshTopicList(): void {
//     this.isLoadingTopics = true;
//     this.forumService.fetchAllTopics().subscribe({
//       next: () => {
//         this.isLoadingTopics = false;
//       },
//       error: (err: any) => {
//         console.error('Error loading initial topics:', err);
//         this.isLoadingTopics = false;
//       }
//     });
//   }

//   fetchTopicDetail(topicId: string): void {
//     this.forumService.getTopicById(topicId).subscribe({
//       next: (detail: TopicDetail) => {
//         this.selectedTopicDetail = detail;
//       },
//       error: (e) => {
//         console.error('Error fetching topic detail:', e);
//         this.selectedTopicDetail = null;
//         this.selectedTopicId = null;
//       }
//     });
//   }

//   onReplySubmitted(_: any): void {
//     if (this.selectedTopicId) {
//       this.fetchTopicDetail(this.selectedTopicId);
//     }
//   }

//   onTopicCreated(eventData: { title: string; category: string; content: string }): void {
//     console.log('Attempting to create title with data:', eventData);

//     const submittedCategoryName = eventData.category
//       ? eventData.category.trim()
//       : '';

//     if (!submittedCategoryName) {
//       console.error('Validation Error: Category name is empty.');
//       this.showCreateModal = false;
//       return;
//     }

//     const allTopics = this.forumService.topicCategories$.getValue();
//     const foundTopic = allTopics.find(
//       t => t.topicName.trim() === submittedCategoryName
//     );

//     if (foundTopic) {
//       const creationRequest: TitleCreateRequest = {
//         topicId: foundTopic.topicId,
//         title: eventData.title,
//         descriptionMd: eventData.content
//       };

//       this.forumService.createTitle(creationRequest).subscribe({
//         next: (newTitle: ForumTopicDto) => {
//           console.log('API SUCCESS: POST /forum/titles', newTitle);
//           this.showCreateModal = false;
//           this.refreshTopicList();
//         },
//         error: (err) => {
//           console.error('API ERROR: Failed to create title via service call.', err);
//           this.showCreateModal = false;
//         }
//       });
//     } else {
//       console.error(
//         `Error: Topic ID not found for submitted category: "${eventData.category}".`
//       );
//       this.showCreateModal = false;
//     }
//   }

//   onSearch(query: string): void {
//     this.isLoadingTopics = true;
//     this.selectedTopicId = null;
//     this.selectedTopicDetail = null;
//     this.searchSubscription?.unsubscribe();

//     if (!query.trim()) {
//       this.refreshTopicList();
//     } else {
//       this.searchSubscription = this.forumService.searchTopics(query).subscribe({
//         next: (topics: Topic[]) => {
//           this.displayedTopics = topics;
//           this.isLoadingTopics = false;
//         },
//         error: (err: any) => {
//           console.error('Error searching topics:', err);
//           this.isLoadingTopics = false;
//         }
//       });
//     }
//   }

//   onCategorySelected(categoryName: string | null): void {
//     this.isLoadingTopics = true;
//     this.selectedTopicId = null;
//     this.selectedTopicDetail = null;
//     this.forumService.filterByCategory(categoryName);
//     setTimeout(() => (this.isLoadingTopics = false), 100);
//   }

//   onTopicSelected(topic: Topic): void {
//     this.selectedTopicId = topic.topicId.toString();
//     this.selectedTopicDetail = null;
//     this.fetchTopicDetail(this.selectedTopicId);
//     this.wsService.subscribeToTopic?.(`/topic/post.${topic.topicId}`);
//   }

//   onBack(): void {
//     if (this.selectedTopicId) {
//       this.wsService.unsubscribeFromTopic?.(`/topic/post.${this.selectedTopicId}`);
//     }
//     this.selectedTopicId = null;
//     this.selectedTopicDetail = null;
//     this.refreshTopicList();
//   }

//   onNotificationClicked(event: any): void {
//     console.log('Notification clicked:', event);
//     this.showNotifications = false;
//   }
// }


// /src/app/pages/apps/conversational_forum/forum-main.component.ts
// src/app/pages/apps/conversational_forum/forum-main.component.ts
// // src/app/pages/apps/conversational_forum/forum-main.component.ts
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatCardModule } from '@angular/material/card';

// import { ForumService, TitleDto, PostDto, Page } from 'src/app/services/forum.service';
// import { TitleWithPostsVM } from './topic-detail/topic-detail.component';

// // child standalone components (adjust paths if different)
// import { ForumHeaderComponent } from './forum-header/forum-header.component';
// import { SearchBarComponent } from './search-bar/search-bar.component';
// import { CategoryFilterComponent } from './category-filter/category-filter.component';
// import { TopicsListComponent } from './topics-list/topics-list.component';
// import { TopicDetailComponent } from './topic-detail/topic-detail.component';
// import { CreateTopicModalComponent } from './create-topic-modal/create-topic-modal.component';

// // Small VM that matches what <app-topics-list> wants
// // (at minimum it needs a non-nullable category)
// type TopicItem = {
//   topicId: number;        // <-- required by TopicsList Topic type
//   titleId: number;        // handy for drill-in
//   title: string;
//   descriptionMd?: string;
//   category?: string;
//   __raw: TitleDto;        // keep original
// };

// @Component({
//   selector: 'app-forum-main',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatCardModule,
//     ForumHeaderComponent,
//     SearchBarComponent,
//     CategoryFilterComponent,
//     TopicsListComponent,
//     TopicDetailComponent,
//     CreateTopicModalComponent
//   ],
//   template: `
//     <mat-card class="cardWithShadow">
//       <mat-card-content class="p-24">
//         <div class="forum-container">
//           <app-forum-header
//             (createTopicClicked)="showCreateModal = true"
//             (notificationsClicked)="showNotifications = true"
//           ></app-forum-header>

//           <main class="main-content">
//             <div class="container">
//               <div *ngIf="!selectedTopicDetail" class="topics-view">
//                 <app-search-bar (search)="onSearch($any($event))"></app-search-bar>

//                 <app-category-filter
//                   (categorySelected)="onCategorySelected($any($event))"
//                 ></app-category-filter>

//                 <app-topics-list
//                   [topics]="displayedTopicsForList"
//                   (topicSelected)="onTopicSelected($any($event))"
//                 ></app-topics-list>
//               </div>

//               <div *ngIf="selectedTopicDetail" class="detail-view">
//                 <app-topic-detail
//                   [topic]="selectedTopicDetail!"
//                   (back)="onBack()"
//                   (replySubmitted)="onReplySubmitted($any($event))"
//                 ></app-topic-detail>
//               </div>
//             </div>
//           </main>

//           <app-create-topic-modal
//             *ngIf="showCreateModal"
//             (close)="showCreateModal = false"
//             (topicCreated)="onTopicCreated($any($event))"
//           ></app-create-topic-modal>
//         </div>
//       </mat-card-content>
//     </mat-card>
//   `,
//   styles: [`
//     .forum-container { min-height: 100vh; background: #f9fafb; display: flex; flex-direction: column; }
//     .main-content { flex: 1; padding: 2rem 0; }
//     .container {
//       max-width: 1400px; /* MODIFIED */
//       margin: 0 auto;
//       padding: 0 1.5rem;
//     }
//     .topics-view, .detail-view { display: flex; flex-direction: column; gap: 1.5rem; }
//     @media (max-width: 640px) {
//       .main-content { padding: 1.5rem 0; }
//       .container { padding: 0 1rem; }
//       .topics-view, .detail-view { gap: 1rem; }
//     }
//   `]
// })
// export class ForumMainComponent {
//   // raw titles from backend
//   allTopics: TitleDto[] = [];
//   displayedTopics: TitleDto[] = [];

//   // mapped list for <app-topics-list>
//   displayedTopicsForList: TopicItem[] = [];

//   // detail view expects VM with posts array
//   selectedTopicDetail: TitleWithPostsVM | null = null;

//   // ui
//   showCreateModal = false;
//   showNotifications = false;
//   isLoading = false;

//   // filters
//   private currentCategory: string | null = null;
//   private currentSearch: string | null = null;

//   constructor(private forum: ForumService) {
//     this.loadInitialTitles();
//   }

//   // ----- data loading -----
//   private loadInitialTitles() {
//     this.isLoading = true;
//     this.forum.listTitles(undefined, 0, 20).subscribe({
//       next: page => {
//         this.allTopics = page.content ?? [];
//         this.applyFilters();
//       },
//       error: () => {},
//       complete: () => { this.isLoading = false; }
//     });
//   }

//   // Normalize TitleDto.posts (Page<> | array) into a VM for detail view
//   private toVM(res: TitleDto & { posts?: Page<PostDto> | PostDto[] | null | undefined }): TitleWithPostsVM {
//     const pageOrArray = res.posts as Page<PostDto> | PostDto[] | null | undefined;
//     const postsArray: PostDto[] = Array.isArray(pageOrArray) ? pageOrArray : (pageOrArray?.content ?? []);
//     const { posts: _ignored, ...rest } = res as any;

//     return {
//       ...(rest as Omit<TitleDto, 'posts'>),
//       postsPage: Array.isArray(pageOrArray) ? null : (pageOrArray ?? null),
//       posts: postsArray || []
//     };
//   }

//   // Map raw TitleDto[] to TopicItem[] for the topics list (fixes the TS2322)
//   private toTopicItems(list: TitleDto[]): TopicItem[] {
//     return (list || []).map(t => ({
//       topicId: (t as any).topicId ?? 0,        // <-- fill from backend dto
//       titleId: (t as any).titleId ?? 0,        // <-- keep as well
//       title: t.title ?? '',
//       descriptionMd: (t as any).descriptionMd ?? '',
//       category: (t as any).category ?? undefined,
//       __raw: t
//     }));
//   }
//   private applyFilters() {
//     let list = [...this.allTopics];

//     if (this.currentCategory && this.currentCategory !== 'all') {
//       list = this.forum.filterByCategory(list as any, this.currentCategory);
//     }

//     if (this.currentSearch && this.currentSearch.trim()) {
//       const q = this.currentSearch.trim().toLowerCase();
//       list = list.filter(t =>
//         (t.title || '').toLowerCase().includes(q) ||
//         (t as any).descriptionMd?.toLowerCase?.().includes(q)
//       );
//     }

//     this.displayedTopics = list;
//     this.displayedTopicsForList = this.toTopicItems(list);
//   }

//   // ----- UI events -----
//   onSearch(query: string) {
//     this.currentSearch = query;
//     this.applyFilters();
//   }

//   onCategorySelected(category: string) {
//     this.currentCategory = category;
//     this.applyFilters();
//   }

//   onTopicSelected(item: any) {
//     // item may be TopicItem or raw TitleDto
//     const topic: TitleDto = (item && item.__raw) ? item.__raw as TitleDto : item as TitleDto;
//     const titleId = (topic as any).titleId ?? item?.titleId;
//     if (!titleId) return;

//     this.isLoading = true;
//     this.forum.getTitleWithPosts(titleId, 0, 10).subscribe({
//       next: (res) => {
//         this.selectedTopicDetail = this.toVM(res);
//         if (this.selectedTopicDetail.posts?.[0]) {
//           this.forum.viewPost(this.selectedTopicDetail.posts[0].postId).subscribe(count => {
//             this.selectedTopicDetail!.posts[0].viewsCount = count;
//           });
//         }
//       },
//       error: () => {},
//       complete: () => { this.isLoading = false; }
//     });
//   }

//   onBack() { this.selectedTopicDetail = null; }

//   onReplySubmitted(_e: { postId: number }) {
//     if (!this.selectedTopicDetail) return;
//     const id = (this.selectedTopicDetail as any).titleId;
//     this.forum.getTitleWithPosts(id, 0, 10).subscribe(res => {
//       this.selectedTopicDetail = this.toVM(res);
//     });
//   }

//   onTopicCreated(created: TitleDto) {
//     this.allTopics = [created, ...this.allTopics];
//     this.applyFilters();
//     this.onTopicSelected(created);
//     this.showCreateModal = false;
//   }
// }


// // src/app/pages/apps/conversational_forum/forum-main.component.ts(inal working by12thnov)
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatCardModule } from '@angular/material/card';

// import { ForumService, TitleDto, PostDto, Page, ForumTopicDto } from 'src/app/services/forum.service';
// import { TitleWithPostsVM } from './topic-detail/topic-detail.component';

// // child standalone components (adjust paths if different)
// import { ForumHeaderComponent } from './forum-header/forum-header.component';
// import { SearchBarComponent } from './search-bar/search-bar.component';
// import { CategoryFilterComponent } from './category-filter/category-filter.component';
// import { TopicsListComponent } from './topics-list/topics-list.component';
// import { TopicDetailComponent } from './topic-detail/topic-detail.component';
// import { CreateTopicModalComponent } from './create-topic-modal/create-topic-modal.component';

// // Small VM that matches what <app-topics-list> wants
// type TopicItem = {
//   topicId: number;
//   titleId: number;
//   title: string;
//   descriptionMd?: string;
//   category?: string;
//   __raw: TitleDto;
// };

// @Component({
//   selector: 'app-forum-main',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatCardModule,
//     ForumHeaderComponent,
//     SearchBarComponent,
//     CategoryFilterComponent,
//     TopicsListComponent,
//     TopicDetailComponent,
//     CreateTopicModalComponent
//   ],
//   template: `
//     <mat-card class="cardWithShadow">
//       <mat-card-content class="p-24">
//         <div class="forum-container">
//           <app-forum-header
//             (createTopicClicked)="showCreateModal = true"
//             (notificationsClicked)="showNotifications = true"
//           ></app-forum-header>

//           <main class="main-content">
//             <div class="container">
//               <div *ngIf="!selectedTopicDetail" class="topics-view">
//                 <app-search-bar (search)="onSearch($any($event))"></app-search-bar>

//                 <app-category-filter
//                   (categorySelected)="onCategorySelected($any($event))"
//                 ></app-category-filter>

//                 <app-topics-list
//                   [topics]="displayedTopicsForList"
//                   (topicSelected)="onTopicSelected($any($event))"
//                 ></app-topics-list>
//               </div>

//               <div *ngIf="selectedTopicDetail" class="detail-view">
//                 <app-topic-detail
//                   [topic]="selectedTopicDetail!"
//                   (back)="onBack()"
//                   (replySubmitted)="onReplySubmitted($any($event))"
//                 ></app-topic-detail>
//               </div>
//             </div>
//           </main>

//           <app-create-topic-modal
//             *ngIf="showCreateModal"
//             (close)="showCreateModal = false"
//             (topicCreated)="onTopicCreated($any($event))"
//           ></app-create-topic-modal>
//         </div>
//       </mat-card-content>
//     </mat-card>
//   `,
//   styles: [`
//     .forum-container { min-height: 100vh; background: #f9fafb; display: flex; flex-direction: column; }
//     .main-content { flex: 1; padding: 2rem 0; }
//     .container { max-width: 1400px; margin: 0 auto; padding: 0 1.5rem; }
//     .topics-view, .detail-view { display: flex; flex-direction: column; gap: 1.5rem; }
//     @media (max-width: 640px) {
//       .main-content { padding: 1.5rem 0; }
//       .container { padding: 0 1rem; }
//       .topics-view, .detail-view { gap: 1rem; }
//     }
//   `]
// })
// export class ForumMainComponent {
//   // raw titles from backend
//   allTopics: TitleDto[] = [];
//   displayedTopics: TitleDto[] = [];

//   // mapped list for <app-topics-list>
//   displayedTopicsForList: TopicItem[] = [];

//   // detail view expects VM with posts array
//   selectedTopicDetail: TitleWithPostsVM | null = null;

//   // ui
//   showCreateModal = false;
//   showNotifications = false;
//   isLoading = false;

//   // filters
//   private currentCategory: string | null = null;
//   private currentSearch: string | null = null;

//   // topics catalog and selected topicId (resolved from category pill)
//   private topics: ForumTopicDto[] = [];
//   private selectedTopicId?: number;

//   // NEW: when server already applied category, skip client category filter
//   private serverAppliedCategory = false;

//   constructor(private forum: ForumService) {
//     // load topics {topicId, topicName} once
//     this.forum.getAllTopicIdsAndNames().subscribe(ts => this.topics = ts || []);
//     this.loadInitialTitles();
//   }

//   // ----- data loading -----
//   private loadInitialTitles() {
//     this.isLoading = true;
//     this.serverAppliedCategory = false; // reset: server not filtering here
//     this.forum.listTitles(undefined, 0, 20).subscribe({
//       next: page => {
//         this.allTopics = page.content ?? [];
//         this.applyFilters(false);
//       },
//       error: () => {},
//       complete: () => { this.isLoading = false; }
//     });
//   }

//   // Normalize TitleDto.posts (Page<> | array) into a VM for detail view
//   private toVM(res: TitleDto & { posts?: Page<PostDto> | PostDto[] | null | undefined }): TitleWithPostsVM {
//     const pageOrArray = res.posts as Page<PostDto> | PostDto[] | null | undefined;
//     const postsArray: PostDto[] = Array.isArray(pageOrArray) ? pageOrArray : (pageOrArray?.content ?? []);
//     const { posts: _ignored, ...rest } = res as any;

//     return {
//       ...(rest as Omit<TitleDto, 'posts'>),
//       postsPage: Array.isArray(pageOrArray) ? null : (pageOrArray ?? null),
//       posts: postsArray || []
//     };
//   }

//   // Map raw TitleDto[] to TopicItem[] for the topics list
//   private toTopicItems(list: TitleDto[]): TopicItem[] {
//     return (list || []).map(t => ({
//       topicId: (t as any).topicId ?? 0,
//       titleId: (t as any).titleId ?? 0,
//       title: t.title ?? '',
//       descriptionMd: (t as any).descriptionMd ?? '',
//       category: (t as any).category ?? undefined,
//       __raw: t
//     }));
//   }

//   // Apply search locally; category filtering is skipped when server already applied it
//   private applyFilters(skipCategory = false) {
//     let list = [...this.allTopics];

//     if (!skipCategory && this.currentCategory && this.currentCategory !== 'all') {
//       list = this.forum.filterByCategory(list as any, this.currentCategory);
//     }

//     if (this.currentSearch && this.currentSearch.trim()) {
//       const q = this.currentSearch.trim().toLowerCase();
//       list = list.filter(t =>
//         (t.title || '').toLowerCase().includes(q) ||
//         (t as any).descriptionMd?.toLowerCase?.().includes(q)
//       );
//     }

//     this.displayedTopics = list;
//     this.displayedTopicsForList = this.toTopicItems(list);
//   }

//   // ----- helpers -----
//   private resolveTopicIdByName(name?: string | null): number | undefined {
//     if (!name) return undefined;
//     const t = this.topics.find(x => x.topicName.toLowerCase() === name.toLowerCase());
//     return t?.topicId;
//   }

//   private fetchByTopicAndCategory() {
//     // case: topic selected → server should filter by topicId (+ optional category)
//     if (this.selectedTopicId != null) {
//       this.isLoading = true;
//       this.serverAppliedCategory = (this.currentCategory != null && this.currentCategory !== 'all');
//       this.forum
//         .listTitlesByTopicAndCategory(this.selectedTopicId, this.currentCategory as any, 0, 20)
//         .subscribe({
//           next: p => { this.allTopics = p.content ?? []; this.applyFilters(true); }, // skip client category
//           error: () => {},
//           complete: () => { this.isLoading = false; }
//         });
//       return;
//     }

//     // case: All Topics but a specific category selected → server category only
//     if (this.currentCategory && this.currentCategory !== 'all') {
//       this.isLoading = true;
//       this.serverAppliedCategory = true;
//       this.forum
//         .listTitlesFiltered({ category: this.currentCategory as any, page: 0, size: 20 })
//         .subscribe({
//           next: p => { this.allTopics = p.content ?? []; this.applyFilters(true); }, // skip client category
//           error: () => {},
//           complete: () => { this.isLoading = false; }
//         });
//     } else {
//       // no server category
//       this.serverAppliedCategory = false;
//       this.loadInitialTitles();
//     }
//   }

//   // ----- UI events -----
//   onSearch(query: string) {
//     this.currentSearch = query;
//     this.applyFilters(this.serverAppliedCategory);
//   }

//   onCategorySelected(category: string) {
//     this.currentCategory = category || 'all';
//     this.selectedTopicId = (this.currentCategory === 'all')
//       ? undefined
//       : this.resolveTopicIdByName(this.currentCategory);
//     this.fetchByTopicAndCategory();
//   }

//   onTopicSelected(item: any) {
//     const topic: TitleDto = (item && item.__raw) ? item.__raw as TitleDto : item as TitleDto;
//     const titleId = (topic as any).titleId ?? item?.titleId;
//     if (!titleId) return;

//     this.isLoading = true;
//     this.forum.getTitleWithPosts(titleId, 0, 10).subscribe({
//       next: (res) => {
//         this.selectedTopicDetail = this.toVM(res);
//         if (this.selectedTopicDetail.posts?.[0]) {
//           this.forum.viewPost(this.selectedTopicDetail.posts[0].postId).subscribe(count => {
//             this.selectedTopicDetail!.posts[0].viewsCount = count;
//           });
//         }
//       },
//       error: () => {},
//       complete: () => { this.isLoading = false; }
//     });
//   }

//   onBack() { this.selectedTopicDetail = null; }

//   onReplySubmitted(_e: { postId: number }) {
//     if (!this.selectedTopicDetail) return;
//     const id = (this.selectedTopicDetail as any).titleId;
//     this.forum.getTitleWithPosts(id, 0, 10).subscribe(res => {
//       this.selectedTopicDetail = this.toVM(res);
//     });
//   }

//   onTopicCreated(created: TitleDto) {
//     this.allTopics = [created, ...this.allTopics];
//     this.applyFilters(this.serverAppliedCategory);
//     this.onTopicSelected(created);
//     this.showCreateModal = false;
//   }
// }


// src/app/pages/apps/conversational_forum/forum-main.component.ts
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { ForumService, TitleDto, PostDto, Page, ForumTopicDto } from 'src/app/services/forum.service';
import { TitleWithPostsVM } from './topic-detail/topic-detail.component';

import { ForumHeaderComponent } from './forum-header/forum-header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CategoryFilterComponent } from './category-filter/category-filter.component';
import { TopicsListComponent } from './topics-list/topics-list.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { CreateTopicModalComponent } from './create-topic-modal/create-topic-modal.component';

// 🔌 WS
import { WsService,WsEvent } from 'src/app/services/ws.service';

type TopicItem = {
  topicId: number;
  titleId: number;
  title: string;
  descriptionMd?: string;
  category?: string;
  __raw: TitleDto;
};

@Component({
  selector: 'app-forum-main',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ForumHeaderComponent,
    SearchBarComponent,
    CategoryFilterComponent,
    TopicsListComponent,
    TopicDetailComponent,
    CreateTopicModalComponent
  ],
  template: `
    <mat-card class="cardWithShadow">
      <mat-card-content class="p-24">
        <div class="forum-container">
          <app-forum-header
            (createTopicClicked)="showCreateModal = true"
            (notificationsClicked)="showNotifications = true"
          ></app-forum-header>

          <main class="main-content">
            <div class="container">
              <div *ngIf="!selectedTopicDetail" class="topics-view">
                <app-search-bar (search)="onSearch($any($event))"></app-search-bar>

                <app-category-filter
                  (categorySelected)="onCategorySelected($any($event))"
                ></app-category-filter>

                <app-topics-list
                  [topics]="displayedTopicsForList"
                  (topicSelected)="onTopicSelected($any($event))"
                ></app-topics-list>
              </div>

              <div *ngIf="selectedTopicDetail" class="detail-view">
                <app-topic-detail
                  [topic]="selectedTopicDetail!"
                  (back)="onBack()"
                  (replySubmitted)="onReplySubmitted($any($event))"
                ></app-topic-detail>
              </div>
            </div>
          </main>

          <app-create-topic-modal
            *ngIf="showCreateModal"
            (close)="showCreateModal = false"
            (topicCreated)="onTopicCreated($any($event))"
          ></app-create-topic-modal>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .forum-container { min-height: 100vh; background: #f9fafb; display: flex; flex-direction: column; }
    .main-content { flex: 1; padding: 2rem 0; }
    .container { max-width: 1400px; margin: 0 auto; padding: 0 1.5rem; }
    .topics-view, .detail-view { display: flex; flex-direction: column; gap: 1.5rem; }
    @media (max-width: 640px) {
      .main-content { padding: 1.5rem 0; }
      .container { padding: 0 1rem; }
      .topics-view, .detail-view { gap: 1rem; }
    }
  `]
})
export class ForumMainComponent implements OnDestroy {
  // raw titles from backend
  allTopics: TitleDto[] = [];
  displayedTopics: TitleDto[] = [];

  // mapped list for <app-topics-list>
  displayedTopicsForList: TopicItem[] = [];

  // detail view expects VM with posts array
  selectedTopicDetail: TitleWithPostsVM | null = null;

  // ui
  showCreateModal = false;
  showNotifications = false;
  isLoading = false;

  // filters
  private currentCategory: string | null = null;
  private currentSearch: string | null = null;

  // topics catalog and selected topicId (resolved from category pill)
  private topics: ForumTopicDto[] = [];
  private selectedTopicId?: number;

  // server already applied category?
  private serverAppliedCategory = false;

  // 🔌 WS: keep the destination we’re subscribed to so we can unsubscribe on back
  private currentWsDestination: string | null = null;

  constructor(
    private forum: ForumService,
    private ws: WsService
  ) {
    // connect WS once for the app (safe to call repeatedly)
    this.ws.connect();

    // load topics {topicId, topicName} once
    this.forum.getAllTopicIdsAndNames().subscribe(ts => this.topics = ts || []);

    this.loadInitialTitles();
  }

  ngOnDestroy(): void {
    // optional: disconnect all when this component is destroyed
    if (this.currentWsDestination) {
      this.ws.unsubscribeFromTopic(this.currentWsDestination);
      this.currentWsDestination = null;
    }
    // If this component stays alive, prefer to keep ws connection alive.
    // this.ws.disconnect();
  }

  // ----- data loading -----
  private loadInitialTitles() {
    this.isLoading = true;
    this.serverAppliedCategory = false; // reset: server not filtering here
    this.forum.listTitles(undefined, 0, 20).subscribe({
      next: page => {
        this.allTopics = page.content ?? [];
        this.applyFilters(false);
      },
      error: () => {},
      complete: () => { this.isLoading = false; }
    });
  }

  // Normalize TitleDto.posts (Page<> | array) into a VM for detail view
  private toVM(res: TitleDto & { posts?: Page<PostDto> | PostDto[] | null | undefined }): TitleWithPostsVM {
    const pageOrArray = res.posts as Page<PostDto> | PostDto[] | null | undefined;
    const postsArray: PostDto[] = Array.isArray(pageOrArray) ? pageOrArray : (pageOrArray?.content ?? []);
    const { posts: _ignored, ...rest } = res as any;

    return {
      ...(rest as Omit<TitleDto, 'posts'>),
      postsPage: Array.isArray(pageOrArray) ? null : (pageOrArray ?? null),
      posts: postsArray || []
    };
  }

  private toTopicItems(list: TitleDto[]): TopicItem[] {
    return (list || []).map(t => ({
      topicId: (t as any).topicId ?? 0,
      titleId: (t as any).titleId ?? 0,
      title: t.title ?? '',
      descriptionMd: (t as any).descriptionMd ?? '',
      category: (t as any).category ?? undefined,
      __raw: t
    }));
  }

  private applyFilters(skipCategory = false) {
    let list = [...this.allTopics];

    if (!skipCategory && this.currentCategory && this.currentCategory !== 'all') {
      list = this.forum.filterByCategory(list as any, this.currentCategory);
    }

    if (this.currentSearch && this.currentSearch.trim()) {
      const q = this.currentSearch.trim().toLowerCase();
      list = list.filter(t =>
        (t.title || '').toLowerCase().includes(q) ||
        (t as any).descriptionMd?.toLowerCase?.().includes(q)
      );
    }

    this.displayedTopics = list;
    this.displayedTopicsForList = this.toTopicItems(list);
  }

  private resolveTopicIdByName(name?: string | null): number | undefined {
    if (!name) return undefined;
    const t = this.topics.find(x => x.topicName.toLowerCase() === name.toLowerCase());
    return t?.topicId;
  }

  private fetchByTopicAndCategory() {
  // Ensure selectedTopicId and currentCategory are valid
  if (this.selectedTopicId == null || this.currentCategory == null || this.currentCategory === '') {
    console.error('Missing topic ID or category');
    return; // Exit if topicId or category is invalid
  }

  // topic selected → server filter by topicId (+ optional category)
  if (this.selectedTopicId != null) {
    this.isLoading = true;
    this.serverAppliedCategory = (this.currentCategory != null && this.currentCategory !== 'all');
    this.forum
      .listTitlesByTopicAndCategory(this.selectedTopicId, this.currentCategory, 0, 20)
      .subscribe({
        next: p => {
          this.allTopics = p.content ?? [];
          this.applyFilters(true);
        },
        error: () => {},
        complete: () => { this.isLoading = false; }
      });
    return;
  }

  // All Topics + specific category
  if (this.currentCategory && this.currentCategory !== 'all') {
    this.isLoading = true;
    this.serverAppliedCategory = true;
    this.forum
      .listTitlesFiltered({ category: this.currentCategory, page: 0, size: 20 })
      .subscribe({
        next: p => {
          this.allTopics = p.content ?? [];
          this.applyFilters(true);
        },
        error: () => {},
        complete: () => { this.isLoading = false; }
      });
  } else {
    this.serverAppliedCategory = false;
    this.loadInitialTitles();
  }
}


  // ----- WebSocket wiring -----
  private subscribeToTitleWs(titleId: number) {
    // clean previous
    if (this.currentWsDestination) {
      this.ws.unsubscribeFromTopic(this.currentWsDestination);
      this.currentWsDestination = null;
    }

    // subscribe to /topic/title.{id}
    const destination = `/topic/title.${titleId}`;
    this.currentWsDestination = destination;

    this.ws.subscribe(destination, (event: WsEvent<any>) => {
      // For simplicity: on ANY event for this title, refresh detail.
      // (Avoids tricky merge logic; it’s quick and correct.)
      // If needed later, switch on event.type and merge locally.
      if (this.selectedTopicDetail && (this.selectedTopicDetail as any).titleId === titleId) {
        this.refreshCurrentTitle();
      }
    });
  }

  private refreshCurrentTitle() {
    if (!this.selectedTopicDetail) return;
    const id = (this.selectedTopicDetail as any).titleId;
    if (!id) return;
    this.forum.getTitleWithPosts(id, 0, 10).subscribe(res => {
      this.selectedTopicDetail = this.toVM(res);
    });
  }

  // ----- UI events -----
  onSearch(query: string) {
    this.currentSearch = query;
    this.applyFilters(this.serverAppliedCategory);
  }

  onCategorySelected(category: string) {
    this.currentCategory = category || 'all';
    this.selectedTopicId = (this.currentCategory === 'all')
      ? undefined
      : this.resolveTopicIdByName(this.currentCategory);
    this.fetchByTopicAndCategory();
  }

  onTopicSelected(item: any) {
    const topic: TitleDto = (item && item.__raw) ? item.__raw as TitleDto : item as TitleDto;
    const titleId = (topic as any).titleId ?? item?.titleId;
    if (!titleId) return;

    this.isLoading = true;
    this.forum.getTitleWithPosts(titleId, 0, 10).subscribe({
      next: (res) => {
        this.selectedTopicDetail = this.toVM(res);

        // 🔌 WS: subscribe to updates for this title
        this.subscribeToTitleWs(titleId);

        // optional: bump first post views
        if (this.selectedTopicDetail.posts?.[0]) {
          this.forum.viewPost(this.selectedTopicDetail.posts[0].postId).subscribe(count => {
            this.selectedTopicDetail!.posts[0].viewsCount = count;
          });
        }
      },
      error: () => {},
      complete: () => { this.isLoading = false; }
    });
  }

  onBack() {
    // clean current WS subscription
    if (this.currentWsDestination) {
      this.ws.unsubscribeFromTopic(this.currentWsDestination);
      this.currentWsDestination = null;
    }
    this.selectedTopicDetail = null;
  }

  onReplySubmitted(_e: { postId: number }) {
    // your HTTP create already ran in child and succeeded.
    // server should broadcast -> our WS handler will refresh.
    // But we can also refresh immediately for snappy UI:
    this.refreshCurrentTitle();
  }

  onTopicCreated(created: TitleDto) {
    this.allTopics = [created, ...this.allTopics];
    this.applyFilters(this.serverAppliedCategory);
    this.onTopicSelected(created);
    this.showCreateModal = false;
  }
}
