// // import { Injectable } from '@angular/core';
// // import { BehaviorSubject, Observable, map } from 'rxjs';
// // import { Topic, TopicDetail, Post, Notification, User, Reply, Category } from 'src/app/models/forum.model';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class ForumService {
// //   private currentUser: User = {
// //     id: 'user-1',
// //     name: 'You',
// //     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1'
// //   };

// //   private mockUsers: User[] = [
// //     { id: 'user-2', name: 'Sarah Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
// //     { id: 'user-3', name: 'Mike Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
// //     { id: 'user-4', name: 'Emma Williams', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' },
// //     { id: 'user-5', name: 'David Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
// //     { id: 'user-6', name: 'Jessica Davis', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica' },
// //     { id: 'user-7', name: 'Chris Miller', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chris' }
// //   ];

// //   private allTopics: TopicDetail[] = [];
// //   private topicsDetailSubject = new BehaviorSubject<TopicDetail[]>([]);
// //   private notificationsSubject = new BehaviorSubject<Notification[]>([]);

// //   public topics$: Observable<Topic[]>;
// //   public notifications$ = this.notificationsSubject.asObservable();

// //   constructor() {
// //     this.initializeMockData();
// //     this.topics$ = this.topicsDetailSubject.asObservable().pipe(
// //       map(details => details.map(this.mapToTopic))
// //     );
// //   }

// //   private mapToTopic(detail: TopicDetail): Topic {
// //     const { posts, ...topic } = detail;
// //     return {
// //       ...topic,
// //       preview: posts[0]?.content
// //     };
// //   }

// //   public getTopics(): Observable<Topic[]> {
// //     return this.topics$;
// //   }

// //   public getTopicById(id: string): TopicDetail | null {
// //     const topic = this.allTopics.find(t => t.id === id);
// //     return topic ? JSON.parse(JSON.stringify(topic)) : null;
// //   }

// //   public searchTopics(query: string): Topic[] {
// //     const lowerQuery = query.toLowerCase();
// //     const filteredDetails = this.allTopics.filter(topic =>
// //       topic.title.toLowerCase().includes(lowerQuery) ||
// //       (topic.posts[0]?.content.toLowerCase().includes(lowerQuery)) ||
// //       topic.category.toLowerCase().includes(lowerQuery)
// //     );
// //     return filteredDetails.map(this.mapToTopic);
// //   }

// //   public filterByCategory(category: string | null): void {
// //     if (!category) {
// //       this.topicsDetailSubject.next([...this.allTopics]);
// //     } else {
// //       const filtered = this.allTopics.filter(t => t.category === category);
// //       this.topicsDetailSubject.next(filtered);
// //     }
// //   }

// //   public createTopic(title: string, category: Category, content: string): TopicDetail {
// //     const newPost: Post = {
// //       id: `post-${Date.now()}`, author: this.currentUser, content, createdAt: new Date(), likes: [], replies: []
// //     };
// //     const newTopic: TopicDetail = {
// //       id: `topic-${Date.now()}`, title, category, author: this.currentUser, replyCount: 0, viewCount: 1, lastActivity: new Date(), createdAt: new Date(), isPinned: false, posts: [newPost]
// //     };

// //     this.allTopics.unshift(newTopic);
// //     this.topicsDetailSubject.next([...this.allTopics]);
// //     return newTopic;
// //   }

// //   public addReplyToTopic(topicId: string, content: string, topicStarterPostId: string): void {
// //     const topic = this.allTopics.find(t => t.id === topicId);
// //     if (!topic) return;

// //     const newPost: Post = {
// //       id: `post-${Date.now()}`,
// //       author: this.currentUser,
// //       content,
// //       createdAt: new Date(),
// //       likes: [],
// //       replies: []
// //     };

// //     topic.posts.push(newPost);
// //     topic.replyCount++;
// //     topic.lastActivity = new Date();
// //     this.topicsDetailSubject.next([...this.allTopics]);
// //   }

// //   public addNestedReply(topicId: string, postId: string, content: string): void {
// //     const topic = this.allTopics.find(t => t.id === topicId);
// //     if (!topic) return;

// //     const post = topic.posts.find(p => p.id === postId);
// //     if (!post) return;

// //     const newReply: Reply = {
// //       id: `reply-${Date.now()}`,
// //       author: this.currentUser,
// //       content,
// //       createdAt: new Date(),
// //       likes: []
// //     };

// //     post.replies.push(newReply);
// //     topic.replyCount++;
// //     topic.lastActivity = new Date();
// //     this.topicsDetailSubject.next([...this.allTopics]);
// //   }

// //   public togglePostLike(topicId: string, postId: string): void {
// //     const topic = this.allTopics.find(t => t.id === topicId);
// //     if (!topic) return;
// //     const post = topic.posts.find(p => p.id === postId);
// //     if (!post) return;
// //     const likeIndex = post.likes.indexOf(this.currentUser.id);
// //     if (likeIndex > -1) {
// //       post.likes.splice(likeIndex, 1);
// //     } else {
// //       post.likes.push(this.currentUser.id);
// //     }
// //     this.topicsDetailSubject.next([...this.allTopics]);
// //   }

// //   public toggleReplyLike(topicId: string, postId: string, replyId: string): void {
// //     const topic = this.allTopics.find(t => t.id === topicId);
// //     if (!topic) return;
// //     const post = topic.posts.find(p => p.id === postId);
// //     if (!post) return;
// //     const reply = post.replies.find(r => r.id === replyId);
// //     if (!reply) return;
// //     const likeIndex = reply.likes.indexOf(this.currentUser.id);
// //     if (likeIndex > -1) {
// //       reply.likes.splice(likeIndex, 1);
// //     } else {
// //       reply.likes.push(this.currentUser.id);
// //     }
// //     this.topicsDetailSubject.next([...this.allTopics]);
// //   }

// //   public getNotifications(): Observable<Notification[]> {
// //     return this.notifications$;
// //   }

// //   public markNotificationAsRead(id: string): void {
// //     const notifications = this.notificationsSubject.value;
// //     const notification = notifications.find(n => n.id === id);
// //     if (notification) {
// //       notification.isRead = true;
// //       this.notificationsSubject.next([...notifications]);
// //     }
// //   }

// //   public markAllNotificationsAsRead(): void {
// //     const notifications = this.notificationsSubject.value;
// //     notifications.forEach(n => n.isRead = true);
// //     this.notificationsSubject.next([...notifications]);
// //   }

// //   public getUnreadCount(): Observable<number> {
// //     return this.notifications$.pipe(
// //       map(notifications => notifications.filter(n => !n.isRead).length)
// //     );
// //   }

// //   public getCurrentUser(): User {
// //     return this.currentUser;
// //   }

// //   private initializeMockData(): void {
// //     const fromNow = (value: number, unit: 'minutes' | 'hours' | 'days'): Date => {
// //       const ms = {
// //         minutes: 60 * 1000,
// //         hours: 60 * 60 * 1000,
// //         days: 24 * 60 * 60 * 1000,
// //       };
// //       return new Date(Date.now() - value * ms[unit]);
// //     };

// //     const userYou = this.currentUser;
// //     const userSarah = this.mockUsers[0];
// //     const userMike = this.mockUsers[1];
// //     const userEmma = this.mockUsers[2];
// //     const userDavid = this.mockUsers[3];
// //     const userJessica = this.mockUsers[4];
// //     const userChris = this.mockUsers[5];

// //     this.allTopics = [
// //       {
// //         id: 'topic-1',
// //         title: 'Benefits of forming an LLC in Delaware vs my home state?',
// //         category: 'LLC Formation',
// //         author: userSarah,
// //         replyCount: 4, viewCount: 234,
// //         lastActivity: fromNow(2, 'hours'),
// //         createdAt: fromNow(5, 'days'),
// //         isPinned: true,
// //         posts: [
// //           {
// //             id: 'post-101',
// //             author: userSarah,
// //             content: "I'm based in Texas and I'm starting an e-commerce business. I've heard Delaware is popular because of its business-friendly laws, but is it really worth the extra cost and complexity for a small, single-owner business like mine?",
// //             createdAt: fromNow(5, 'days'),
// //             likes: [userMike.id, userEmma.id, userChris.id],
// //             replies: [],
// //           },
// //           {
// //             id: 'post-102',
// //             author: userDavid,
// //             content: 'For most small businesses, your home state is simpler and cheaper. Delaware really shines for larger corporations that plan to seek venture capital or go public. The Court of Chancery is a big draw for them.',
// //             createdAt: fromNow(3, 'days'),
// //             likes: [userYou.id, userSarah.id],
// //             replies: [
// //               {
// //                 id: 'reply-102a',
// //                 author: userSarah,
// //                 content: 'That makes sense. Thanks, David! I will probably stick with Texas for now.',
// //                 createdAt: fromNow(2, 'days'),
// //                 likes: [userDavid.id],
// //               },
// //             ],
// //           },
// //           {
// //             id: 'post-103',
// //             author: userEmma,
// //             content: "Don't forget about foreign qualification. If you form in Delaware but do business in Texas, you'll have to register as a foreign LLC in Texas anyway, which means double the paperwork and fees.",
// //             createdAt: fromNow(2, 'hours'),
// //             likes: [userSarah.id, userYou.id, userMike.id],
// //             replies: [],
// //           },
// //           {
// //             id: 'post-104',
// //             author: userChris,
// //             content: 'Also, consider liability protection. While Delaware law is robust, your home state’s laws will likely govern any lawsuits that occur there. So, the benefits might not be as great as they seem.',
// //             createdAt: fromNow(1, 'hours'),
// //             likes: [userSarah.id, userDavid.id],
// //             replies: [
// //               {
// //                 id: 'reply-104a',
// //                 author: userSarah,
// //                 content: 'Great point, Chris. I hadn\'t considered that.',
// //                 createdAt: fromNow(30, 'minutes'),
// //                 likes: [userChris.id],
// //               },
// //             ],
// //           }
// //         ],
// //       },
// //       {
// //         id: 'topic-2',
// //         title: 'Single-member LLC vs Multi-member LLC: Tax implications',
// //         category: 'Tax & Legal',
// //         author: userMike,
// //         replyCount: 3, viewCount: 489,
// //         lastActivity: fromNow(22, 'hours'),
// //         createdAt: fromNow(7, 'days'),
// //         isPinned: false,
// //         posts: [
// //           {
// //             id: 'post-201',
// //             author: userMike,
// //             content: "Can someone clearly explain the key tax differences between a single-member and a multi-member LLC? I'm currently a single-member LLC but I'm thinking about bringing on a business partner.",
// //             createdAt: fromNow(7, 'days'),
// //             likes: [userEmma.id, userJessica.id],
// //             replies: [
              
// //             ],
// //           },
// //         ],
// //       },

// //       {
// //         id: 'topic-3',
// //         title: 'Best accounting software for new LLCs?',
// //         category: 'Business Growth',
// //         author: userYou,
// //         replyCount: 2, viewCount: 342,
// //         lastActivity: fromNow(2, 'days'),
// //         createdAt: fromNow(12, 'days'),
// //         isPinned: false,
// //         posts: [
// //           {
// //             id: 'post-301',
// //             author: userYou,
// //             content: "Looking for recommendations on accounting software that's good for a new LLC. I need something that's easy to use and can grow with my business. I've looked at QuickBooks, Xero, and Wave. What do you all recommend?",
// //             createdAt: fromNow(12, 'days'),
// //             likes: [userDavid.id, userChris.id],
// //             replies: [
             
// //             ],
// //           },
// //         ],
// //       },

// //       {
// //         id: 'topic-4',
// //         title: 'Success Story: How my side hustle became a full-time business!',
// //         category: 'Success Stories',
// //         author: userEmma,
// //         replyCount: 2, viewCount: 610,
// //         lastActivity: fromNow(1, 'hours'),
// //         createdAt: fromNow(1, 'days'),
// //         isPinned: false,
// //         posts: [
// //           {
// //             id: 'post-401',
// //             author: userEmma,
// //             content: "Just wanted to share some good news! Three years ago, I started a small graphic design business on the side. Last month, I finally quit my day job to run it full-time! This forum was a huge help when I was setting up my LLC. Thanks to everyone for the great advice. Don't give up on your dreams!",
// //             createdAt: fromNow(1, 'days'),
// //             likes: [userYou.id, userSarah.id, userMike.id, userDavid.id, userJessica.id, userChris.id],
// //             replies: [
             
// //             ],
// //           },
// //         ],
// //       },
// //       {
// //         id: 'topic-5',
// //         title: 'How do I pay myself from my LLC?',
// //         category: 'Tax & Legal',
// //         author: userJessica,
// //         replyCount: 0,
// //         viewCount: 58,
// //         lastActivity: fromNow(3, 'days'),
// //         createdAt: fromNow(3, 'days'),
// //         isPinned: false,
// //         posts: [
// //           {
// //             id: 'post-501',
// //             author: userJessica,
// //             content: "I've just started my single-member LLC and I'm a bit confused about the correct way to pay myself. Do I just transfer money from my business account to my personal account? Is that considered a salary? Any advice would be appreciated!",
// //             createdAt: fromNow(3, 'days'),
// //             likes: [userYou.id, userDavid.id],
// //             replies: [],
// //           },
// //         ],
// //       },
// //       {
// //         id: 'topic-6',
// //         title: 'General discussion thread',
// //         category: 'General',
// //         author: userChris,
// //         replyCount: 1,
// //         viewCount: 102,
// //         lastActivity: fromNow(5, 'hours'),
// //         createdAt: fromNow(10, 'days'),
// //         isPinned: false,
// //         posts: [
// //           {
// //             id: 'post-601',
// //             author: userChris,
// //             content: 'Just a general thread to chat and get to know other business owners. What are you all working on this week?',
// //             createdAt: fromNow(10, 'days'),
// //             likes: [userJessica.id],
// //             replies: [
              
// //             ],
// //           },
// //         ],
// //       },
// //     ];

// //     this.notificationsSubject.next([
// //       {
// //         id: 'notif-1', type: 'reply', topicId: 'topic-1', topicTitle: 'Benefits of forming an LLC in Delaware?', author: userEmma, message: 'replied to a topic', createdAt: fromNow(2, 'hours'), isRead: false
// //       },
// //       {
// //         id: 'notif-2', type: 'mention', topicId: 'topic-2', topicTitle: 'Single-member vs Multi-member LLC', author: userYou, message: 'mentioned you in a reply', createdAt: fromNow(22, 'hours'), isRead: true
// //       },
// //       {
// //         id: 'notif-3', type: 'like', topicId: 'topic-3', topicTitle: 'Best accounting software for new LLCs?', author: userDavid, message: 'liked your post', createdAt: fromNow(2, 'days'), isRead: false
// //       },
// //       {
// //         id: 'notif-4', type: 'reply', topicId: 'topic-4', topicTitle: 'Success Story: How my side hustle became a full-time business!', author: userMike, message: 'replied to a topic you follow', createdAt: fromNow(1, 'hours'), isRead: false
// //       },
// //       {
// //         id: 'notif-5', type: 'like', topicId: 'topic-1', topicTitle: 'Benefits of forming an LLC in Delaware?', author: userChris, message: 'liked your reply', createdAt: fromNow(30, 'minutes'), isRead: true
// //       },
// //     ]);

// //     this.topicsDetailSubject.next([...this.allTopics]);
// //   }
// // }



// // src/app/services/forum.service.ts (Final API Version)
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { BehaviorSubject, Observable, map, tap ,switchMap, of} from 'rxjs'; // Added 'of' for stubs
// import { Topic, TopicDetail, Post, User, Reply, Notification, Category } from 'src/app/models/forum.model'; 
// import { UserService } from '../shared/userService';
// // Backend DTO interfaces (If defined in a separate file, remove these exports)
// export interface PostDto {
//     postId: number | string;
//     topicId: number | string;
//     title?: string;
//     content?: string;
//     createdAt: string;
//     lastActivityAt?: string;
//     loginUserId: number | string;
//     loginUserName?: string;
//     likes?: string[];
//     replies?: ReplyDto[];
//     replyCount?: number;
//     viewsCount?: number;
//     pinned?: boolean;
//     topicName?: string;
// }

// export interface ReplyDto {
//     replyId: number | string;
//     postId: number | string;
//     parentReplyId?: number | null;
//     content: string;
//     createdAt: string;
//     loginUserId: number | string;
//     loginUserName?: string;
//     likes?: string[];
// }

// export interface ForumTopicDto {
//     topicId: number | string;
//     topicName: string;
//     description?: string;
// }
// import { environment } from 'src/environments/environment';

// @Injectable({
//     providedIn: 'root'
// })
// export class ForumService {
//     private readonly apiUrl = `${environment.apiBaseUrl}/forum`;

//     private topicsSubject = new BehaviorSubject<Topic[]>([]);
//     public topics$ = this.topicsSubject.asObservable();

//     private selectedTopicSubject = new BehaviorSubject<TopicDetail | null>(null);
//     public selectedTopic$ = this.selectedTopicSubject.asObservable();

//     private availableTopicsSubject = new BehaviorSubject<ForumTopicDto[]>([]);
//     public availableTopics$ = this.availableTopicsSubject.asObservable();

//     // Stubs for notifications (Since API endpoints were not provided, these return mock data/empty observables)
//     private notificationsSubject = new BehaviorSubject<Notification[]>([]);
//     public notifications$ = this.notificationsSubject.asObservable();


//     constructor(private http: HttpClient, private userService: UserService) {
//         this.fetchAvailableTopics(); 
//     }

//     // --- Utility Methods ---

//     private getLoginUserId(): string | null {
//         return sessionStorage.getItem('login_user_id');
//     }

//     // ✅ FIX: Made public to resolve TS2341 in TopicDetailComponent
//     public getCurrentUser(): User {
//         const userModel = this.userService.getUserSnapshot();
//         const loginId = this.getLoginUserId();
//         const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${loginId || 'defaultUser'}`;

//         return {
//             id: loginId || 'unknown-user',
//             name: userModel ? `${userModel.firstName || ''} ${userModel.lastName || ''}`.trim() || 'You' : 'You',
//             avatar: userModel?.profileImageUrl || defaultAvatar
//         };
//     }
    
//     // --- Mapping Functions ---

//     // private mapToPost(dto: PostDto): Post {
//     //     return {
//     //         id: dto.postId.toString(), 
//     //         content: dto.content ?? '', 
//     //         author: {
//     //             id: dto.loginUserId.toString(),
//     //             name: dto.loginUserName || 'Unknown User',
//     //             avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${dto.loginUserId}`
//     //         },
//     //         createdAt: new Date(dto.createdAt),
//     //         likes: dto.likes ?? [],
//     //         replies: dto.replies ? dto.replies.map(r => this.mapToReply(r)) : [],
//     //         likesCount: dto.likes?.length ?? 0 // Assuming likesCount can be calculated from likes[] for now, or use a specific DTO field if available
//     //     };
//     // }

//     // src/app/services/forum.service.ts (Corrected mapToPost)

// private mapToPost(dto: PostDto): Post {
//     // 1. Safely extract IDs, defaulting to '0' or 'system-user' if null/undefined
//     const postId = dto.postId?.toString() ?? '0'; 
//     const loginUserId = dto.loginUserId?.toString() ?? 'system-user';
    
//     // 2. Ensure createdAt is a Date object, handling null safely
//     const createdAt = dto.createdAt ? new Date(dto.createdAt) : new Date();

//     return {
//         id: postId, // Safely handled
//         content: dto.content ?? '', 
//         author: {
//             id: loginUserId, // Safely handled
//             name: dto.loginUserName || 'Unknown User',
//             // Use the safely handled ID for the avatar seed
//             avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${loginUserId}`
//         },
//         createdAt: createdAt, // Safely handled
//         likes: dto.likes ?? [],
//         replies: dto.replies ? dto.replies.map(r => this.mapToReply(r)) : [],
//         likesCount: dto.likes?.length ?? 0
//     };
// }
// // Note: Apply similar safe checks (e.g., dto.topicId?.toString() ?? '0') 
// // to mapToTopic and mapToTopicDetail as well.

//     private mapToReply(dto: ReplyDto): Reply {
//         return {
//             id: dto.replyId.toString(), 
//             content: dto.content,
//             author: {
//                 id: dto.loginUserId.toString(),
//                 name: dto.loginUserName || 'Unknown User',
//                 avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${dto.loginUserId}`
//             },
//             createdAt: new Date(dto.createdAt),
//             likes: dto.likes ?? [],
//             likesCount: dto.likes?.length ?? 0
//         };
//     }
//     private mapToTopic(dto: PostDto): Topic {
//         return {
//             id: dto.postId.toString(), 
//             title: dto.title ?? '',
//             category: dto.topicName || 'General', 
//             author: {
//                 id: dto.loginUserId.toString(),
//                 name: dto.loginUserName || 'Unknown User',
//                 avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${dto.loginUserId}`
//             },
//             replyCount: dto.replyCount ?? 0,
//             viewCount: dto.viewsCount ?? 0,
//             lastActivity: dto.lastActivityAt ? new Date(dto.lastActivityAt) : (dto.createdAt ? new Date(dto.createdAt) : new Date()),
//             createdAt: dto.createdAt ? new Date(dto.createdAt) : new Date(),
//             isPinned: dto.pinned ?? false,
//             preview: dto.content ? dto.content.substring(0, 100) + (dto.content.length > 100 ? '...' : '') : ''
//         };
//     }

//     private mapToTopicDetail(dto: PostDto): TopicDetail {
//         const mainPost = this.mapToPost(dto);
//         return {
//             id: dto.topicId.toString(), 
//             title: dto.title ?? '',
//             category: dto.topicName || 'General',
//              author: {
//                 id: dto.loginUserId.toString(),
//                 name: dto.loginUserName || 'Unknown User',
//                 avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${dto.loginUserId}`
//             },
//             replyCount: dto.replyCount ?? 0,
//             viewCount: dto.viewsCount ?? 0,
//             lastActivity: dto.lastActivityAt ? new Date(dto.lastActivityAt) : (dto.createdAt ? new Date(dto.createdAt) : new Date()),
//             createdAt: dto.createdAt ? new Date(dto.createdAt) : new Date(),
//             isPinned: dto.pinned ?? false,
//              posts: [mainPost], 
//              preview: dto.content ? dto.content.substring(0, 100) + (dto.content.length > 100 ? '...' : '') : ''
//         };
//     }


//     // --- API Calls (Restored) ---

//     public fetchAllTopics(page: number = 0, size: number = 20): Observable<Topic[]> {
//         const userId = this.getLoginUserId();
//         if (!userId) {
//             console.error('User not logged in');
//             return new Observable<Topic[]>(observer => observer.next([]));
//         }
//         let params = new HttpParams()
//             .set('login_user_id', userId)
//             .set('page', page.toString())
//             .set('size', size.toString());

//         return this.http.get<{ content: PostDto[], totalElements: number }>(`${this.apiUrl}/titles`, { params }).pipe(
//             map(response => response.content.map(this.mapToTopic)),
//             tap(topics => this.topicsSubject.next(topics))
//         );
//     }

//     public fetchPostsByTopicId(topicId: string, page: number = 0, size: number = 50): Observable<Post[]> {
//         const userId = this.getLoginUserId();
//          if (!userId) {
//             return new Observable<Post[]>(observer => observer.next([]));
//         }
//         let params = new HttpParams()
//             .set('topic_id', topicId)
//             .set('login_user_id', userId)
//             .set('page', page.toString())
//             .set('size', size.toString());

//         return this.http.get<{ content: PostDto[] }>(`${this.apiUrl}/posts/by-topic`, { params }).pipe(
//             map(response => response.content.map(dto => this.mapToPost(dto)))
//         );
//     }

//     public getTopicById(postId: string): Observable<TopicDetail> {
//         const userId = this.getLoginUserId();
//         if (!userId) {
//              return new Observable<TopicDetail>(observer => observer.error('User not logged in'));
//         }
//         let params = new HttpParams()
//             .set('post_id', postId)
//             .set('login_user_id', userId);

//         this.incrementViewCount(postId).subscribe();


//         return this.http.get<PostDto>(`${this.apiUrl}/post`, { params }).pipe(
//            map(postDto => {
//                 const topicDetail = this.mapToTopicDetail(postDto);

//                 return this.fetchPostsByTopicId(topicDetail.id).pipe(
//                     map(posts => {
//                         topicDetail.posts = posts;
//                          this.selectedTopicSubject.next(topicDetail);
//                         return topicDetail;
//                     })
//                 );
//             }),
//             switchMap(observableTopicDetail => observableTopicDetail)
//         );
//     }

//     private incrementViewCount(postId: string): Observable<number> {
//         const userId = this.getLoginUserId();
//         if (!userId) {
//             return of(0); // Return Observable<number> for fire-and-forget
//         }
//         let params = new HttpParams()
//             .set('post_id', postId)
//             .set('login_user_id', userId);
        
//         return this.http.post<number>(`${this.apiUrl}/post/view`, null, { params });
//     }

//     public searchTopics(query: string, page: number = 0, size: number = 20): Observable<Topic[]> {
//          let params = new HttpParams()
//             .set('query', query)
//             .set('page', page.toString())
//             .set('size', size.toString());

//         return this.http.get<PostDto[]>(`${this.apiUrl}/search`, { params }).pipe(
//             map(dtos => dtos.map(this.mapToTopic)),
//              tap(topics => this.topicsSubject.next(topics))
//         );
//     }

//     public filterByCategory(category: string | null): void {
//         this.fetchAllTopics().subscribe(allTopics => {
//              if (!category) {
//                  this.topicsSubject.next(allTopics);
//              } else {
//                  const filtered = allTopics.filter(t => t.category === category);
//                  this.topicsSubject.next(filtered);
//              }
//         });
//     }

//     public fetchAvailableTopics(): void {
//          this.http.get<ForumTopicDto[]>(`${this.apiUrl}/topics`).subscribe(topics => {
//             this.availableTopicsSubject.next(topics);
//         });
//     }

//     public createTopic(title: string, topicId: number, content: string): Observable<Post> {
//         const userId = this.getLoginUserId();
//         if (!userId) {
//              return new Observable<Post>(observer => observer.error('User not logged in'));
//         }
//         const body = {
//             topicId: topicId,
//             title: title,
//             descriptionMd: content 
//         };
//         let params = new HttpParams().set('login_user_id', userId);

//         return this.http.post<PostDto>(`${this.apiUrl}/posts`, body, { params }).pipe(
//             map(dto => this.mapToPost(dto)),
//             tap(() => this.fetchAllTopics().subscribe())
//         );
//     }

//     // ✅ FIX: Renamed methods in components will call this one.
//     public addReplyToPost(postId: string, content: string): Observable<Reply> {
//         const userId = this.getLoginUserId();
//          if (!userId) {
//              return new Observable<Reply>(observer => observer.error('User not logged in'));
//         }
//         const body = {
//             postId: parseInt(postId, 10),
//             parentReplyId: null, 
//             contentMd: content
//         };
//          let params = new HttpParams().set('login_user_id', userId);

//         return this.http.post<ReplyDto>(`${this.apiUrl}/replies`, body, { params }).pipe(
//             map(dto => this.mapToReply(dto)),
//              tap(() => { 
//                 const currentTopic = this.selectedTopicSubject.value;
//                 if (currentTopic) {
//                     this.getTopicById(currentTopic.posts[0].id).subscribe();
//                 }
//             })
//         );
//     }

//      // ✅ FIX: Renamed methods in components will call this one.
//      public addNestedReply(postId: string, parentReplyId: string, content: string): Observable<Reply> {
//         const userId = this.getLoginUserId();
//          if (!userId) {
//             return new Observable<Reply>(observer => observer.error('User not logged in'));
//         }
//         const body = {
//             postId: parseInt(postId, 10),
//             parentReplyId: parseInt(parentReplyId, 10), 
//             contentMd: content
//         };
//          let params = new HttpParams().set('login_user_id', userId);

//         return this.http.post<ReplyDto>(`${this.apiUrl}/replies`, body, { params }).pipe(
//             map(dto => this.mapToReply(dto)),
//             tap(() => {
//                 const currentTopic = this.selectedTopicSubject.value;
//                 if (currentTopic) {
//                      this.getTopicById(currentTopic.posts[0].id).subscribe();
//                 }
//             })
//         );
//     }

//     public toggleLike(postId: string | null, replyId: string | null): Observable<number> {
//         const userId = this.getLoginUserId();
//         if (!userId) {
//              return new Observable<number>(observer => observer.error('User not logged in'));
//         }
//          let params = new HttpParams().set('login_user_id', userId);
//          if (postId) {
//              params = params.set('post_id', postId);
//          }
//          if (replyId) {
//              params = params.set('reply_id', replyId);
//          }

//         return this.http.post<number>(`${this.apiUrl}/likes`, null, { params }).pipe(
//             tap(() => { 
//                 const currentTopic = this.selectedTopicSubject.value;
//                  if (currentTopic) {
//                     this.getTopicById(currentTopic.posts[0].id).subscribe();
//                 } else if (postId) {
//                      this.fetchAllTopics().subscribe();
//                  }
//             })
//         );
//     }

//     // --- Notification Stubs (Added to resolve TS2339) ---
//     public getNotifications(): Observable<Notification[]> {
//         return this.notifications$; // Returns empty array subject
//     }

//     public getUnreadCount(): Observable<number> {
//          return this.notifications$.pipe(
//             map(notifications => notifications.filter(n => !n.isRead).length)
//         );
//     }
//     public markNotificationAsRead(id: string): void {
//         console.warn(`[STUB] markNotificationAsRead called for ID: ${id}`);
//     }

//     public markAllNotificationsAsRead(): void {
//         console.warn('[STUB] markAllNotificationsAsRead called');
//     }
// }



// // src/app/services/forum.service.ts (FINAL & ROBUST VERSION)
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { BehaviorSubject, Observable, map, tap ,switchMap, of} from 'rxjs';
// import { Topic, TopicDetail, Post, User, Reply, Notification, Category } from 'src/app/models/forum.model'; 
// import { UserService } from '../shared/userService';
// import { environment } from 'src/environments/environment';

// // NOTE: These DTO interfaces are placeholders; ensure they match your backend precisely.
// export interface PostDto {
//     postId?: number | string; // Made optional for safety
//     topicId?: number | string; // Made optional for safety
//     title?: string;
//     content?: string;
//     createdAt?: string;
//     lastActivityAt?: string;
//     loginUserId?: number | string; // Made optional for safety
//     loginUserName?: string;
//     likes?: string[];
//     replies?: ReplyDto[];
//     replyCount?: number;
//     viewsCount?: number;
//     pinned?: boolean;
//     topicName?: string;
//     likesCount?: number; 
// }
// export interface ReplyDto {
//     replyId?: number | string;
//     postId?: number | string;
//     parentReplyId?: number | null;
//     content: string;
//     createdAt?: string;
//     loginUserId?: number | string;
//     loginUserName?: string;
//     likes?: string[];
//     likesCount?: number;
// }
// export interface ForumTopicDto {
//     topicId?: number | string;
//     topicName: string;
//     description?: string;
// }


// @Injectable({
//     providedIn: 'root'
// })
// export class ForumService {
//     private readonly apiUrl = `${environment.apiBaseUrl}/forum`;

//     private topicsSubject = new BehaviorSubject<Topic[]>([]);
//     public topics$ = this.topicsSubject.asObservable();

//     private selectedTopicSubject = new BehaviorSubject<TopicDetail | null>(null);
//     public selectedTopic$ = this.selectedTopicSubject.asObservable();

//     private availableTopicsSubject = new BehaviorSubject<ForumTopicDto[]>([]);
//     public availableTopics$ = this.availableTopicsSubject.asObservable();

//     private notificationsSubject = new BehaviorSubject<Notification[]>([]);
//     public notifications$ = this.notificationsSubject.asObservable();


//     constructor(private http: HttpClient, private userService: UserService) {
//         this.fetchAvailableTopics(); 
//     }

//     private getLoginUserId(): string | null {
//         return sessionStorage.getItem('login_user_id');
//     }

//     public getCurrentUser(): User {
//         const userModel = this.userService.getUserSnapshot();
//         const loginId = this.getLoginUserId();
//         const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${loginId || 'defaultUser'}`;

//         return {
//             id: loginId || 'unknown-user',
//             name: userModel ? `${userModel.firstName || ''} ${userModel.lastName || ''}`.trim() || 'You' : 'You',
//             avatar: userModel?.profileImageUrl || defaultAvatar
//         };
//     }
    
//     // ⚠️ CRITICAL FIXES APPLIED HERE
//     private mapToPost(dto: PostDto): Post {
//         // Safely extract IDs, defaulting to '0' or 'system-user'
//         const postId = dto.postId?.toString() ?? '0'; 
//         const loginUserId = dto.loginUserId?.toString() ?? 'system-user';
//         const createdAt = dto.createdAt ? new Date(dto.createdAt) : new Date();

//         return {
//             id: postId, 
//             content: dto.content ?? '', 
//             author: {
//                 id: loginUserId,
//                 name: dto.loginUserName || 'Unknown User',
//                 avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${loginUserId}`
//             },
//             createdAt: createdAt,
//             likes: dto.likes ?? [],
//             replies: dto.replies ? dto.replies.map(r => this.mapToReply(r)) : [],
//             likesCount: dto.likesCount ?? 0
//         };
//     }

//     private mapToReply(dto: ReplyDto): Reply {
//         // Safely extract IDs
//         const replyId = dto.replyId?.toString() ?? '0';
//         const loginUserId = dto.loginUserId?.toString() ?? 'system-user';
//         const createdAt = dto.createdAt ? new Date(dto.createdAt) : new Date();

//         return {
//             id: replyId, 
//             content: dto.content,
//             author: {
//                 id: loginUserId,
//                 name: dto.loginUserName || 'Unknown User',
//                 avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${loginUserId}`
//             },
//             createdAt: createdAt,
//             likes: dto.likes ?? [],
//             likesCount: dto.likesCount ?? 0
//         };
//     }
    
//     private mapToTopic(dto: PostDto): Topic {
//         // Safely extract IDs
//         const postId = dto.postId?.toString() ?? '0';
//         const loginUserId = dto.loginUserId?.toString() ?? 'system-user';
//         const createdAt = dto.createdAt ? new Date(dto.createdAt) : new Date();

//         return {
//             id: postId, 
//             title: dto.title ?? '',
//             category: dto.topicName || 'General', 
//             author: {
//                 id: loginUserId,
//                 name: dto.loginUserName || 'Unknown User',
//                 avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${loginUserId}`
//             },
//             replyCount: dto.replyCount ?? 0,
//             viewCount: dto.viewsCount ?? 0,
//             lastActivity: dto.lastActivityAt ? new Date(dto.lastActivityAt) : createdAt,
//             createdAt: createdAt,
//             isPinned: dto.pinned ?? false,
//             preview: dto.content ? dto.content.substring(0, 100) + (dto.content.length > 100 ? '...' : '') : ''
//         };
//     }

//     private mapToTopicDetail(dto: PostDto): TopicDetail {
//         const mainPost = this.mapToPost(dto);
//         // Safely extract IDs
//         const topicId = dto.topicId?.toString() ?? '0';
//         const loginUserId = dto.loginUserId?.toString() ?? 'system-user';
//         const createdAt = dto.createdAt ? new Date(dto.createdAt) : new Date();

//         return {
//             id: topicId, 
//             title: dto.title ?? '',
//             category: dto.topicName || 'General',
//              author: {
//                 id: loginUserId,
//                 name: dto.loginUserName || 'Unknown User',
//                 avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${loginUserId}`
//             },
//             replyCount: dto.replyCount ?? 0,
//             viewCount: dto.viewsCount ?? 0,
//             lastActivity: dto.lastActivityAt ? new Date(dto.lastActivityAt) : createdAt,
//             createdAt: createdAt,
//             isPinned: dto.pinned ?? false,
//              posts: [mainPost], 
//              preview: dto.content ? dto.content.substring(0, 100) + (dto.content.length > 100 ? '...' : '') : ''
//         };
//     }
// public filterByCategory(category: string | null): void {
//         // Fetches all topics (using the live API call)
//         this.fetchAllTopics().subscribe(allTopics => {
//              if (!category) {
//                  // If category is null, show all fetched topics
//                  this.topicsSubject.next(allTopics);
//              } else {
//                  // Filter the topics locally based on the category name
//                  const filtered = allTopics.filter(t => t.category === category);
//                  this.topicsSubject.next(filtered);
//              }
//         });
//     }

//     // --- API Calls (Restored) ---

//     public fetchAllTopics(page: number = 0, size: number = 20): Observable<Topic[]> {
//         const userId = this.getLoginUserId();
//         if (!userId) { return new Observable<Topic[]>(observer => observer.next([])); }
//         let params = new HttpParams().set('login_user_id', userId).set('page', page.toString()).set('size', size.toString());

//         // Assuming /titles returns PostDto (based on ForumController.java listTitles/PostDto return pattern)
//         return this.http.get<{ content: PostDto[], totalElements: number }>(`${this.apiUrl}/titles`, { params }).pipe(
//             map(response => response.content.map(this.mapToTopic)), // This line should now be safe
//             tap(topics => this.topicsSubject.next(topics))
//         );
//     }
    
//     public getTopicById(postId: string): Observable<TopicDetail> {
//         const userId = this.getLoginUserId();
//         if (!userId) { return new Observable<TopicDetail>(observer => observer.error('User not logged in')); }
//         let params = new HttpParams().set('post_id', postId).set('login_user_id', userId);

//         this.incrementViewCount(postId).subscribe();

//         return this.http.get<PostDto>(`${this.apiUrl}/post`, { params }).pipe(
//            map(postDto => {
//                 const topicDetail = this.mapToTopicDetail(postDto);

//                 return this.fetchPostsByTopicId(topicDetail.id).pipe(
//                     map(posts => {
//                         topicDetail.posts = posts;
//                          this.selectedTopicSubject.next(topicDetail);
//                         return topicDetail;
//                     })
//                 );
//             }),
//             switchMap(observableTopicDetail => observableTopicDetail)
//         );
//     }
    
//     // ... (Other service methods omitted for brevity)
//     private incrementViewCount(postId: string): Observable<number> { return of(0); }
//     public searchTopics(query: string, page: number = 0, size: number = 20): Observable<Topic[]> { return of([]); }
//     public fetchPostsByTopicId(topicId: string, page: number = 0, size: number = 50): Observable<Post[]> { return of([]); }
//     public fetchAvailableTopics(): void { /* ... */ }
//     public createTopic(title: string, topicId: number, content: string): Observable<Post> { return of({} as Post); }
//     public addReplyToPost(postId: string, content: string): Observable<Reply> { return of({} as Reply); }
//     public addNestedReply(postId: string, parentReplyId: string, content: string): Observable<Reply> { return of({} as Reply); }
//     public toggleLike(postId: string | null, replyId: string | null): Observable<number> { return of(0); }
//     public getNotifications(): Observable<Notification[]> { return of([]); }
//     public getUnreadCount(): Observable<number> { return of(0); }
//     public markNotificationAsRead(id: string): void { /* ... */ }
//     public markAllNotificationsAsRead(): void { /* ... */ }
// }

// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable, inject } from '@angular/core';
// import { environment } from 'src/environments/environment';
// import { PostDto, ReplyDto, TitleDto, ForumTopicDto, Page } from '../models/forum.model';

// @Injectable({ providedIn: 'root' })
// export class ForumService {
//   private http = inject(HttpClient);
//   private api = environment.apiBaseUrl;

//   private userId = this.getLoginUserId();

//   private withUser(params: Record<string, any> = {}) {
//     return new HttpParams({ fromObject: { ...params, login_user_id: String(this.userId) } });
//   }

//   private getLoginUserId(): number {
//     const match = document.cookie.match(/custom:login_user_id=([^;]+)/);
//     return match ? +match[1] : 0;
//   }

//   getTopics() {
//     return this.http.get<ForumTopicDto[]>(`${this.api}/forum/topics`);
//   }

//   getTitles(topicId?: number, page = 0, size = 10) {
//     const params = topicId ? { topic_id: topicId, page, size } : { page, size };
//     return this.http.get<Page<TitleDto>>(`${this.api}/forum/titles`, { params });
//   }

//   getTitlePosts(titleId: number, page = 0, size = 10) {
//     return this.http.get<TitleDto>(`${this.api}/forum/title-posts`, {
//       params: { title_id: titleId, page, size }
//     });
//   }

//   getPost(postId: number) {
//     return this.http.get<PostDto>(`${this.api}/forum/post`, {
//       params: this.withUser({ post_id: postId })
//     });
//   }

//   getPostReplies(postId: number, page = 0, size = 10) {
//     return this.http.get<Page<ReplyDto>>(`${this.api}/forum/post/replies`, {
//       params: { post_id: postId, page, size }
//     });
//   }
  

//   createPost(dto: any) {
//     const { loginUserId, ...body } = dto;
//     return this.http.post(`${this.api}/forum/posts`, body, {
//       params: this.withUser()
//     });
//   }

//   addReply(dto: any) {
//     return this.http.post(`${this.api}/forum/replies`, dto, {
//       params: this.withUser()
//     });
//   }

//   toggleLike(dto: { postId?: number; replyId?: number; like: boolean }) {
//     return this.http.post(`${this.api}/forum/likes`, dto, {
//       params: this.withUser()
//     });
//   }

//   togglePin(postId: number) {
//     return this.http.post(`${this.api}/forum/post/pin-toggle`, { postId }, {
//       params: this.withUser()
//     });
//   }

//   checkDuplicateTitle(title: string, excludeId?: number) {
//     const params: any = { title };
//     if (excludeId) params.exclude_title_id = excludeId;
//     return this.http.get(`${this.api}/forum/titles/check`, { params });
//   }
// }
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable, inject } from '@angular/core';
// import { environment } from 'src/environments/environment';

// import { Notification, User, TopicDetail } from '../models/forum.model';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// @Injectable({ providedIn: 'root' })
// export class ForumService {

//   private http = inject(HttpClient);
//   private api = environment.apiBaseUrl;
//   private userId = this.getLoginUserId();

//   // Updated topics$ to use TopicDetail[]
//   public topics$ = new BehaviorSubject<TopicDetail[]>([]);

//   private withUser(params: Record<string, any> = {}) {
//     return new HttpParams({ fromObject: { ...params, login_user_id: String(this.userId) } });
//   }

//   private getLoginUserId(): number {
//     const match = document.cookie.match(/custom:login_user_id=([^;]+)/);
//     return match ? +match[1] : 0;
//   }

//   // ✅ Returns Observable<User> correctly
//   getCurrentUser(): Observable<User> {
//     return this.http.get<User>(`${this.api}/forum/me`);
//   }

//   getNotifications(): Observable<Notification[]> {
//     return this.http.get<Notification[]>(`${this.api}/forum/notifications`, {
//       params: this.withUser()
//     });
//   }

//   markNotificationAsRead(id: string): Observable<any> {
//     return this.http.post(`${this.api}/forum/notifications/read`, { id }, {
//       params: this.withUser()
//     });
//   }

//   markAllNotificationsAsRead(): Observable<any> {
//     return this.http.post(`${this.api}/forum/notifications/read-all`, {}, {
//       params: this.withUser()
//     });
//   }

//   // ✅ Fetch all topics and update BehaviorSubject
//   fetchAllTopics(): Observable<TopicDetail[]> {
//     const login_user_id = localStorage.getItem('login_user_id');
//     return this.http.get<TopicDetail[]>(`${this.api}/forum/topics`, {
//       params: this.withUser()
//     }).pipe(
//       tap((topics: TopicDetail[]) => {
//         this.topics$.next(topics);
//       })
//     );
//   }

//   getTopicById(id: string | number): Observable<TopicDetail> {
//     return this.http.get<TopicDetail>(`${this.api}/forum/topic/${id}`, {
//       params: this.withUser()
//     });
//   }

//   searchTopics(query: string): Observable<TopicDetail[]> {
//     return this.http.get<TopicDetail[]>(`${this.api}/forum/topics/search`, {
//       params: this.withUser({ query })
//     });
//   }

//   filterByCategory(category: string | null): void {
//     this.http.get<TopicDetail[]>(`${this.api}/forum/topics`, {
//       params: this.withUser({ category })
//     }).subscribe((topics) => this.topics$.next(topics));
//   }

//   addReplyToPost(postId: number, content: string): Observable<any> {
//     return this.http.post(`${this.api}/forum/post/reply`, { postId, content }, {
//       params: this.withUser()
//     });
//   }

//   addNestedReply(postId: number, parentReplyId: number, content: string): Observable<any> {
//     return this.http.post(`${this.api}/forum/post/nested-reply`, { postId, parentReplyId, content }, {
//       params: this.withUser()
//     });
//   }

//   // ✅ Expecting toggleLike payload as { postId | replyId | like }
//   toggleLike(payload: { postId: number | null, replyId: number | null, like: boolean }): Observable<any> {
//     return this.http.post(`${this.api}/forum/like`, payload, {
//       params: this.withUser()
//     });
//   }
// }


// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable, inject } from '@angular/core';
// import { environment } from 'src/environments/environment';

// import { BehaviorSubject, Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { Notification, User, Topic, TopicDetail } from '../models/forum.model'; // Assuming these models exist
// // NOTE: Notification, User, Topic, TopicDetail must be imported if used

// // --- INTERFACE STUBS ---
// export interface PostCreateRequest {
//   topicId: number;
//   titleId: number;
//   descriptionMd: string;
// }

// export interface ReplyCreateRequest {
//   postId: number;
//   parentReplyId: number | null;
//   contentMd: string;
// }

// export interface TitleCreateRequest {
//   topicId: number;
//   title: string;
//   descriptionMd: string;
// }

// export interface ForumTopicDto {
//   topicId: number;
//   topicName: string;
// }

// export interface Page<T> {
//   content: T[];
//   pageable: any;
//   totalElements: number;
//   totalPages: number;
//   last: boolean;
//   size: number;
//   number: number;
//   sort: any;
//   numberOfElements: number;
//   first: boolean;
//   empty: boolean;
// }

// // ------------------------------------------

// @Injectable({ providedIn: 'root' })
// export class ForumService {

//   private http = inject(HttpClient);
//   private api = environment.apiBaseUrl;
//   private userId = this.getLoginUserId();
  
//   // FIX: Renamed to clearly hold the master list of Categories/Topics
//   public topicCategories$ = new BehaviorSubject<ForumTopicDto[]>([]); 
  
//   // FIX: New BehaviorSubject to hold the list of titles/posts being displayed
//   public displayTitles$ = new BehaviorSubject<Topic[]>([]); 

//   private withUser(params: Record<string, any> = {}) {
//     return new HttpParams({ fromObject: { ...params, login_user_id: String(this.userId) } });
//   }

//   private getLoginUserId(): number {
//     const match = document.cookie.match(/custom:login_user_id=([^;]+)/);
//     return match ? +match[1] : 0;
//   }

//   // =========================================================
//   // === RESTORED METHODS (For Notification/User/Topic Detail)
//   // =========================================================

//   /**
//    * FIX: Restored for component compatibility. Assumes this endpoint exists.
//    */
//   getCurrentUser(): Observable<User> {
//     return this.http.get<User>(`${this.api}/forum/me`);
//   }

//   /**
//    * FIX: Restored for component compatibility. Assumes this endpoint exists.
//    */
//   getNotifications(): Observable<Notification[]> {
//     return this.http.get<Notification[]>(`${this.api}/forum/notifications`, {
//       params: this.withUser()
//     });
//   }

//   /**
//    * FIX: Restored for component compatibility. Assumes this endpoint exists.
//    */
//   markNotificationAsRead(id: string): Observable<any> {
//     return this.http.post(`${this.api}/forum/notifications/read`, { id }, {
//       params: this.withUser()
//     });
//   }
  
//   /**
//    * FIX: Restored for component compatibility. Assumes this endpoint exists.
//    */
//   getTopicById(id: string | number): Observable<TopicDetail> {
//     // Backend API: GET /forum/title-posts?title_id={id} [cite: uploaded:ForumController.java]
//     return this.http.get<TopicDetail>(`${this.api}/forum/title-posts`, {
//         params: this.withUser({ title_id: String(id) })
//     });
//   }

//   // =========================================================
//   // === LISTING / SEARCH (Aligned)
//   // =========================================================

//   /**
//    * ✅ API: GET /forum/topics (Master Topic List)
//    */
//   listAllTopics(): Observable<ForumTopicDto[]> {
//     return this.http.get<ForumTopicDto[]>(`${this.api}/forum/topics`).pipe(
//       tap((topics: ForumTopicDto[]) => {
//         this.topicCategories$.next(topics);
//       })
//     );
//   }

//   /**
//    * ✅ API: GET /forum/titles
//    * FIX: Renamed from fetchAllTopics to match the general listing endpoint.
//    * Also ensures the displayTitles$ stream is updated with the list content.
//    */
//   listTitles(topicId: number | null = null, page: number = 0, size: number = 20): Observable<Page<Topic>> {
//     const params: Record<string, any> = { page: String(page), size: String(size) };
//     if (topicId !== null) {
//       params['topic_id'] = String(topicId);
//     }
    
//     return this.http.get<Page<Topic>>(`${this.api}/forum/titles`, {
//       params: this.withUser(params)
//     }).pipe(
//       tap((pageResponse: Page<Topic>) => {
//         this.displayTitles$.next(pageResponse.content || []);
//       })
//     );
//   }
  
//   // FIX: Renamed and restored `fetchAllTopics` as a convenience wrapper for component compatibility
//   fetchAllTopics(): Observable<Page<Topic>> {
//       return this.listTitles();
//   }


//   /**
//    * ✅ API: GET /forum/search
//    */
//   searchTopics(query: string, page: number = 0, size: number = 50): Observable<Topic[]> {
//     // Backend API: GET /forum/search?query={query}&page=0&size=50 [cite: uploaded:ForumController.java]
//     return this.http.get<Topic[]>(`${this.api}/forum/search`, {
//       params: this.withUser({ query, page, size })
//     });
//   }

//   /**
//    * ✅ API: GET /forum/titles (Filtering logic corrected in previous step)
//    * This function now accepts the topic NAME, converts it to ID, and fetches titles.
//    */
//   filterByCategory(topicName: string | null): void {
//     let topicId: number | null = null;
//     const allTopics = this.topicCategories$.getValue();

//     if (topicName && allTopics.length > 0) {
//       const foundTopic = allTopics.find(t => t.topicName === topicName);
//       if (foundTopic) {
//         topicId = foundTopic.topicId;
//       }
//     }
    
//     // Call listTitles which updates displayTitles$
//     this.listTitles(topicId).subscribe();
//   }

//   // =========================================================
//   // === COMMANDS (Aligned)
//   // =========================================================

//   /**
//    * ✅ API: POST /forum/titles
//    */
//   createTitle(req: TitleCreateRequest): Observable<any> {
//     const params = {
//       topic_id: String(req.topicId),
//       title: req.title,
//       descriptionMd: req.descriptionMd
//     };
//     return this.http.post(`${this.api}/forum/titles`, null, {
//       params: this.withUser(params)
//     });
//   }

//   /**
//    * ✅ API: POST /forum/posts
//    */
//   createPost(req: PostCreateRequest): Observable<any> {
//     return this.http.post(`${this.api}/forum/posts`, req, {
//       params: this.withUser()
//     });
//   }

//   /**
//    * ✅ API: POST /forum/replies (Top-level reply)
//    */
//   addReplyToPost(postId: number, contentMd: string): Observable<any> {
//     const req: ReplyCreateRequest = { postId, parentReplyId: null, contentMd };
//     return this.http.post(`${this.api}/forum/replies`, req, {
//       params: this.withUser()
//     });
//   }

//   /**
//    * ✅ API: POST /forum/replies (Nested reply)
//    */
//   addNestedReply(postId: number, parentReplyId: number, contentMd: string): Observable<any> {
//     const req: ReplyCreateRequest = { postId, parentReplyId, contentMd };
//     return this.http.post(`${this.api}/forum/replies`, req, {
//       params: this.withUser()
//     });
//   }
  
//   /**
//    * ✅ API: POST /forum/likes
//    * FIX: Switched back to single object payload to resolve component error.
//    */
//   toggleLike(payload: { postId: number | null, replyId: number | null }): Observable<number> {
//     const params: Record<string, any> = {};
    
//     if (payload.postId !== null) {
//       params['post_id'] = String(payload.postId);
//     }
//     if (payload.replyId !== null) {
//       params['reply_id'] = String(payload.replyId);
//     }

//     return this.http.post<number>(`${this.api}/forum/likes`, null, {
//       params: this.withUser(params)
//     });
//   }

//   /**
//    * ✅ API: DELETE /forum/delete
//    * FIX: responseType set to 'text' to match backend string return.
//    */
//   deleteItem(postId: number | null, replyId: number | null): Observable<string> {
//     const params: Record<string, any> = {};
//     if (postId !== null) {
//       params['post_id'] = String(postId);
//     }
//     if (replyId !== null) {
//       params['reply_id'] = String(replyId);
//     }
    
//     return this.http.delete(`${this.api}/forum/delete`, {
//       params: this.withUser(params),
//       responseType: 'text' as 'text'
//     });
//   }

//   /**
//    * ✅ API: POST /forum/post/pin-toggle
//    */
//   togglePinned(postId: number): Observable<any> {
//     const params = { post_id: String(postId) };
//     return this.http.post(`${this.api}/forum/post/pin-toggle`, null, {
//       params: this.withUser(params)
//     });
//   }

//   /**
//    * ✅ API: PUT /forum/edit
//    */
//   editItem(
//     titleId: number,
//     postId: number | null = null,
//     replyId: number | null = null,
//     newContentMd: string | null = null,
//     newTitle: string | null = null,
//     newDescriptionMd: string | null = null
//   ): Observable<any> {
//     const params: Record<string, any> = { title_id: String(titleId) };

//     if (postId !== null) params['post_id'] = String(postId);
//     if (replyId !== null) params['reply_id'] = String(replyId);
//     if (newContentMd !== null) params['new_content_md'] = newContentMd;
//     if (newTitle !== null) params['new_title'] = newTitle;
//     if (newDescriptionMd !== null) params['new_description_md'] = newDescriptionMd;

//     return this.http.put(`${this.api}/forum/edit`, null, {
//       params: this.withUser(params)
//     });
//   }
// }



// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable, inject } from '@angular/core';
// import { environment } from 'src/environments/environment';

// import { BehaviorSubject, Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// // Assuming these models exist in forum.model.ts for component types
// import { Notification, User, Topic, TopicDetail } from '../models/forum.model'; 

// // --- INTERFACE STUBS (DTOs & Utility Models) ---

// // FIX 1: Page<T> interface definition is INCLUDED HERE for self-containment
// export interface Page<T> {
//   content: T[];
//   pageable: any;
//   totalElements: number;
//   totalPages: number;
//   last: boolean;
//   size: number;
//   number: number;
//   sort: any;
//   numberOfElements: number;
//   first: boolean;
//   empty: boolean;
// }

// // Maps to backend DTOs for data creation
// export interface PostCreateRequest {
//   topicId: number;
//   titleId: number;
//   descriptionMd: string; // Maps to descriptionMd in PostCreateRequestDto
// }

// export interface ReplyCreateRequest {
//   postId: number;
//   parentReplyId: number | null;
//   contentMd: string; // Maps to contentMd in ReplyCreateRequestDto
// }

// export interface TitleCreateRequest {
//   topicId: number;
//   title: string;
//   descriptionMd: string;
// }

// export interface ForumTopicDto {
//   topicId: number;
//   topicName: string;
// }

// /** Maps to backend DTO TitleCheckResponse */
// export interface TitleCheckResponse {
//     titleId: number | null;
//     topicId: number | null;
//     title: string;
//     exists: boolean;
//     available: boolean;
// }
// // ------------------------------------------

// @Injectable({ providedIn: 'root' })
// export class ForumService {

//   private http = inject(HttpClient);
//   private api = environment.apiBaseUrl;
//   private userId = this.getLoginUserId(); 
  
//   // Master list of categories (from GET /forum/topics)
//   public topicCategories$ = new BehaviorSubject<ForumTopicDto[]>([]); 
//   // List of titles/posts being displayed (from GET /forum/titles)
//   public displayTitles$ = new BehaviorSubject<Topic[]>([]); 

//   /** Helper to include login_user_id as a query parameter. */
//   private withUser(params: Record<string, any> = {}) {
//     return new HttpParams({ fromObject: { ...params, login_user_id: String(this.userId) } });
//   }

//   private getLoginUserId(): number {
//     const match = document.cookie.match(/custom:login_user_id=([^;]+)/);
//     return match ? +match[1] : 0;
//   }

//   // =========================================================
//   // === NOTIFICATION METHODS (RESTORED)
//   // =========================================================

//   getNotifications(): Observable<Notification[]> {
//     return this.http.get<Notification[]>(`${this.api}/forum/notifications`, {
//       params: this.withUser()
//     });
//   }

//   markNotificationAsRead(id: string): Observable<any> {
//     return this.http.post(`${this.api}/forum/notifications/read`, { id }, {
//       params: this.withUser()
//     });
//   }

//   getCurrentUser(): Observable<User> {
//     return this.http.get<User>(`${this.api}/forum/me`);
//   }
  
//   // =========================================================
//   // === RETRIEVAL AND LISTING (GET)
//   // =========================================================

//   /**
//    * ✅ API: GET /forum/topics
//    */
//   listAllTopics(): Observable<ForumTopicDto[]> {
//     return this.http.get<ForumTopicDto[]>(`${this.api}/forum/topics`).pipe(
//       tap((topics: ForumTopicDto[]) => {
//         this.topicCategories$.next(topics);
//       })
//     );
//   }

//   /**
//    * ✅ API: GET /forum/title-posts
//    */
//   getTopicById(id: string | number): Observable<TopicDetail> {
//     return this.http.get<TopicDetail>(`${this.api}/forum/title-posts`, {
//         params: this.withUser({ title_id: String(id) })
//     });
//   }

//   /**
//    * ✅ API: GET /forum/titles
//    */
//   listTitles(topicId: number | null = null, page: number = 0, size: number = 20): Observable<Page<Topic>> {
//     const params: Record<string, any> = { page: String(page), size: String(size) };
//     if (topicId !== null) {
//       params['topic_id'] = String(topicId); 
//     }
    
//     return this.http.get<Page<Topic>>(`${this.api}/forum/titles`, {
//       params: this.withUser(params)
//     }).pipe(
//       tap((pageResponse: Page<Topic>) => {
//         // This tap ensures the BehaviorSubject is updated for components subscribing to it
//         this.displayTitles$.next(pageResponse.content || []); 
//       })
//     );
//   }
  
//   /** Convenience wrapper for listTitles (no filter). */
//   fetchAllTopics(): Observable<Page<Topic>> {
//       return this.listTitles();
//   }

//   /**
//    * ✅ API: GET /forum/search
//    */
//   searchTopics(query: string, page: number = 0, size: number = 50): Observable<Topic[]> {
//     return this.http.get<Topic[]>(`${this.api}/forum/search`, {
//       params: this.withUser({ query, page, size })
//     });
//   }
  
//   /** Handles the UI filtering flow (Name -> ID lookup -> API Call) */
//   filterByCategory(topicName: string | null): void {
//     let topicId: number | null = null;
//     const allTopics = this.topicCategories$.getValue();

//     if (topicName && allTopics.length > 0) {
//       const submittedName = topicName.trim();
//       const foundTopic = allTopics.find(t => t.topicName.trim() === submittedName);
//       if (foundTopic) {
//         topicId = foundTopic.topicId;
//       }
//     }
//     this.listTitles(topicId).subscribe();
//   }
  
//   /**
//    * ✅ API: GET /forum/titles/check
//    */
//   checkTitleAvailability(title: string, excludeId: number | null = null): Observable<TitleCheckResponse> {
//       const params: Record<string, any> = { title };
//       if (excludeId !== null) {
//           params['exclude_title_id'] = String(excludeId);
//       }
//       return this.http.get<TitleCheckResponse>(`${this.api}/forum/titles/check`, {
//           params: this.withUser(params)
//       });
//   }

//   // =========================================================
//   // === CREATION AND MODIFICATION (POST/PUT/DELETE)
//   // =========================================================

//   /**
//    * ✅ API: POST /forum/titles (Creation)
//    */
//   createTitle(req: TitleCreateRequest): Observable<any> {
//     const params = {
//       topic_id: String(req.topicId),
//       title: req.title,
//       descriptionMd: req.descriptionMd
//     };
//     return this.http.post(`${this.api}/forum/titles`, null, {
//       params: this.withUser(params)
//     });
//   }

//   /**
//    * ✅ API: POST /forum/posts (Creation)
//    */
//   createPost(req: PostCreateRequest): Observable<any> {
//     return this.http.post(`${this.api}/forum/posts`, req, {
//       params: this.withUser()
//     });
//   }

//   /**
//    * ✅ API: POST /forum/replies (Top-level reply)
//    */
//   addReplyToPost(postId: number, contentMd: string): Observable<any> {
//     const req: ReplyCreateRequest = { postId, parentReplyId: null, contentMd };
//     return this.http.post(`${this.api}/forum/replies`, req, {
//       params: this.withUser()
//     });
//   }

//   /**
//    * ✅ API: POST /forum/replies (Nested reply / Reply Children)
//    */
//   addNestedReply(postId: number, parentReplyId: number, contentMd: string): Observable<any> {
//     const req: ReplyCreateRequest = { postId, parentReplyId, contentMd };
//     return this.http.post(`${this.api}/forum/replies`, req, {
//       params: this.withUser()
//     });
//   }
  
//   /**
//    * ✅ API: POST /forum/likes (Toggle Like/Dislike)
//    */
//   toggleLike(payload: { postId: number | null, replyId: number | null }): Observable<number> {
//     const params: Record<string, any> = {};
//     if (payload.postId !== null) { params['post_id'] = String(payload.postId); }
//     if (payload.replyId !== null) { params['reply_id'] = String(payload.replyId); }

//     return this.http.post<number>(`${this.api}/forum/likes`, null, {
//       params: this.withUser(params)
//     });
//   }

//   /**
//    * ✅ API: POST /forum/post/pin-toggle (Pin Toggle)
//    */
//   togglePinned(postId: number): Observable<any> {
//     const params = { post_id: String(postId) };
//     return this.http.post(`${this.api}/forum/post/pin-toggle`, null, {
//       params: this.withUser(params)
//     });
//   }
  
//   /**
//    * ✅ API: PUT /forum/edit (Edit Titles, Posts, or Replies)
//    */
//   editItem(
//     titleId: number,
//     postId: number | null = null,
//     replyId: number | null = null,
//     newContentMd: string | null = null,
//     newTitle: string | null = null,
//     newDescriptionMd: string | null = null
//   ): Observable<any> {
//     const params: Record<string, any> = { title_id: String(titleId) };

//     if (postId !== null) params['post_id'] = String(postId);
//     if (replyId !== null) params['reply_id'] = String(replyId);
//     if (newContentMd !== null) params['new_content_md'] = newContentMd;
//     if (newTitle !== null) params['new_title'] = newTitle;
//     if (newDescriptionMd !== null) params['new_description_md'] = newDescriptionMd;

//     return this.http.put(`${this.api}/forum/edit`, null, {
//       params: this.withUser(params)
//     });
//   }

//   /**
//    * ✅ API: DELETE /forum/delete (Delete Content - Post or Reply)
//    */
//   deleteItem(postId: number | null, replyId: number | null): Observable<string> {
//     const params: Record<string, any> = {};
//     if (postId !== null) {
//       params['post_id'] = String(postId);
//     }
//     if (replyId !== null) {
//       params['reply_id'] = String(replyId);
//     }
    
//     return this.http.delete(`${this.api}/forum/delete`, {
//       params: this.withUser(params),
//       responseType: 'text' 
//     }) as Observable<string>;
//   }
// }

// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable, inject } from '@angular/core';
// import { environment } from 'src/environments/environment';

// import { BehaviorSubject, Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// // Assuming these models exist in forum.model.ts for component types
// import { Notification, User, Topic, TopicDetail } from '../models/forum.model'; 

// // --- INTERFACE STUBS (DTOs & Utility Models) ---

// // FIX 1: Page<T> interface definition is INCLUDED HERE for self-containment
// export interface Page<T> {
//   content: T[];
//   pageable: any;
//   totalElements: number;
//   totalPages: number;
//   last: boolean;
//   size: number;
//   number: number;
//   sort: any;
//   numberOfElements: number;
//   first: boolean;
//   empty: boolean;
// }

// // Maps to backend DTOs for data creation
// export interface PostCreateRequest {
//   topicId: number;
//   titleId: number;
//   descriptionMd: string; // Maps to descriptionMd in PostCreateRequestDto
// }

// export interface ReplyCreateRequest {
//   postId: number;
//   parentReplyId: number | null;
//   contentMd: string; // Maps to contentMd in ReplyCreateRequestDto
// }

// export interface TitleCreateRequest {
//   topicId: number;
//   title: string;
//   descriptionMd: string;
// }

// export interface ForumTopicDto {
//   topicId: number;
//   topicName: string;
// }

// /** Maps to backend DTO TitleCheckResponse */
// export interface TitleCheckResponse {
//     titleId: number | null;
//     topicId: number | null;
//     title: string;
//     exists: boolean;
//     available: boolean;
// }
// // ------------------------------------------

// @Injectable({ providedIn: 'root' })
// export class ForumService {

//   private http = inject(HttpClient);
//   private api = environment.apiBaseUrl;
//   private userId = this.getLoginUserId(); 
  
//   // Master list of categories (from GET /forum/topics)
//   public topicCategories$ = new BehaviorSubject<ForumTopicDto[]>([]); 
//   // List of titles/posts being displayed (from GET /forum/titles)
//   public displayTitles$ = new BehaviorSubject<Topic[]>([]); 

//   /** Helper to include login_user_id as a query parameter. */
//   private withUser(params: Record<string, any> = {}) {
//     return new HttpParams({ fromObject: { ...params, login_user_id: String(this.userId) } });
//   }

//   private getLoginUserId(): number {
//     const match = document.cookie.match(/custom:login_user_id=([^;]+)/);
//     return match ? +match[1] : 0;
//   }

//   // =========================================================
//   // === NOTIFICATION METHODS (RESTORED)
//   // =========================================================

//   getNotifications(): Observable<Notification[]> {
//     return this.http.get<Notification[]>(`${this.api}/forum/notifications`, {
//       params: this.withUser()
//     });
//   }

//   markNotificationAsRead(id: string): Observable<any> {
//     return this.http.post(`${this.api}/forum/notifications/read`, { id }, {
//       params: this.withUser()
//     });
//   }

//   getCurrentUser(): Observable<User> {
//     return this.http.get<User>(`${this.api}/forum/me`);
//   }
  
//   // =========================================================
//   // === RETRIEVAL AND LISTING (GET)
//   // =========================================================

//   /**
//    * ✅ API: GET /forum/topics
//    */
//   listAllTopics(): Observable<ForumTopicDto[]> {
//     return this.http.get<ForumTopicDto[]>(`${this.api}/forum/topics`).pipe(
//       tap((topics: ForumTopicDto[]) => {
//         this.topicCategories$.next(topics);
//       })
//     );
//   }

//   /**
//    * ✅ API: GET /forum/title-posts
//    */
//   getTopicById(id: string | number): Observable<TopicDetail> {
//     return this.http.get<TopicDetail>(`${this.api}/forum/title-posts`, {
//         params: this.withUser({ title_id: String(id) })
//     });
//   }

//   /**
//    * ✅ API: GET /forum/titles
//    */
//   listTitles(topicId: number | null = null, page: number = 0, size: number = 20): Observable<Page<Topic>> {
//     const params: Record<string, any> = { page: String(page), size: String(size) };
//     if (topicId !== null) {
//       params['topic_id'] = String(topicId); 
//     }
    
//     return this.http.get<Page<Topic>>(`${this.api}/forum/titles`, {
//       params: this.withUser(params)
//     }).pipe(
//       tap((pageResponse: Page<Topic>) => {
//         // This tap ensures the BehaviorSubject is updated for components subscribing to it
//         this.displayTitles$.next(pageResponse.content || []); 
//       })
//     );
//   }
  
//   /** Convenience wrapper for listTitles (no filter). */
//   fetchAllTopics(): Observable<Page<Topic>> {
//       return this.listTitles();
//   }

//   /**
//    * ✅ API: GET /forum/search
//    */
//   searchTopics(query: string, page: number = 0, size: number = 50): Observable<Topic[]> {
//     return this.http.get<Topic[]>(`${this.api}/forum/search`, {
//       params: this.withUser({ query, page, size })
//     });
//   }
  
//   /** Handles the UI filtering flow (Name -> ID lookup -> API Call) */
//   filterByCategory(topicName: string | null): void {
//     let topicId: number | null = null;
//     const allTopics = this.topicCategories$.getValue();

//     if (topicName && allTopics.length > 0) {
//       const submittedName = topicName.trim();
//       // CRITICAL: Use trimmed comparison for robustness
//       const foundTopic = allTopics.find(t => t.topicName.trim() === submittedName);
//       if (foundTopic) {
//         topicId = foundTopic.topicId;
//       }
//     }
//     this.listTitles(topicId).subscribe();
//   }
  
//   /**
//    * ✅ API: GET /forum/titles/check
//    */
//   checkTitleAvailability(title: string, excludeId: number | null = null): Observable<TitleCheckResponse> {
//       const params: Record<string, any> = { title };
//       if (excludeId !== null) {
//           params['exclude_title_id'] = String(excludeId);
//       }
//       return this.http.get<TitleCheckResponse>(`${this.api}/forum/titles/check`, {
//           params: this.withUser(params)
//       });
//   }

//   // =========================================================
//   // === CREATION AND MODIFICATION (POST/PUT/DELETE)
//   // =========================================================

//   /**
//    * ✅ API: POST /forum/titles (Creation)
//    */
//   createTitle(req: TitleCreateRequest): Observable<any> {
//     const params = {
//       topic_id: String(req.topicId),
//       title: req.title,
//       descriptionMd: req.descriptionMd
//     };
//     return this.http.post(`${this.api}/forum/titles`, null, {
//       params: this.withUser(params)
//     });
//   }

//   /**
//    * ✅ API: POST /forum/posts (Creation)
//    */
//   createPost(req: PostCreateRequest): Observable<any> {
//     return this.http.post(`${this.api}/forum/posts`, req, {
//       params: this.withUser()
//     });
//   }

//   /**
//    * ✅ API: POST /forum/replies (Top-level reply)
//    */
//   addReplyToPost(postId: number, contentMd: string): Observable<any> {
//     const req: ReplyCreateRequest = { postId, parentReplyId: null, contentMd };
//     return this.http.post(`${this.api}/forum/replies`, req, {
//       params: this.withUser()
//     });
//   }

//   /**
//    * ✅ API: POST /forum/replies (Nested reply / Reply Children)
//    */
//   addNestedReply(postId: number, parentReplyId: number, contentMd: string): Observable<any> {
//     const req: ReplyCreateRequest = { postId, parentReplyId, contentMd };
//     return this.http.post(`${this.api}/forum/replies`, req, {
//       params: this.withUser()
//     });
//   }
  
//   /**
//    * ✅ API: POST /forum/likes (Toggle Like/Dislike)
//    */
//   toggleLike(payload: { postId: number | null, replyId: number | null }): Observable<number> {
//     const params: Record<string, any> = {};
//     if (payload.postId !== null) { params['post_id'] = String(payload.postId); }
//     if (payload.replyId !== null) { params['reply_id'] = String(payload.replyId); }

//     return this.http.post<number>(`${this.api}/forum/likes`, null, {
//       params: this.withUser(params)
//     });
//   }

//   /**
//    * ✅ API: POST /forum/post/pin-toggle (Pin Toggle)
//    */
//   togglePinned(postId: number): Observable<any> {
//     const params = { post_id: String(postId) };
//     return this.http.post(`${this.api}/forum/post/pin-toggle`, null, {
//       params: this.withUser(params)
//     });
//   }
  
//   /**
//    * ✅ API: PUT /forum/edit (Edit Titles, Posts, or Replies)
//    */
//   editItem(
//     titleId: number,
//     postId: number | null = null,
//     replyId: number | null = null,
//     newContentMd: string | null = null,
//     newTitle: string | null = null,
//     newDescriptionMd: string | null = null
//   ): Observable<any> {
//     const params: Record<string, any> = { title_id: String(titleId) };

//     if (postId !== null) params['post_id'] = String(postId);
//     if (replyId !== null) params['reply_id'] = String(replyId);
//     if (newContentMd !== null) params['new_content_md'] = newContentMd;
//     if (newTitle !== null) params['new_title'] = newTitle;
//     if (newDescriptionMd !== null) params['new_description_md'] = newDescriptionMd;

//     return this.http.put(`${this.api}/forum/edit`, null, {
//       params: this.withUser(params)
//     });
//   }

//   /**
//    * ✅ API: DELETE /forum/delete (Delete Content - Post or Reply)
//    */
//   deleteItem(postId: number | null, replyId: number | null): Observable<string> {
//     const params: Record<string, any> = {};
//     if (postId !== null) {
//       params['post_id'] = String(postId);
//     }
//     if (replyId !== null) {
//       params['reply_id'] = String(replyId);
//     }
    
//     return this.http.delete(`${this.api}/forum/delete`, {
//       params: this.withUser(params),
//       responseType: 'text' 
//     }) as Observable<string>;
//   }
// }
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable, inject } from '@angular/core';
// import { environment } from 'src/environments/environment';

// import { BehaviorSubject, Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// // Assuming these models exist in forum.model.ts for component types
// import { Notification, User, Topic, TopicDetail } from '../models/forum.model'; 

// // --- INTERFACE STUBS (DTOs & Utility Models) ---

// export interface Page<T> {
//   content: T[];
//   pageable: any;
//   totalElements: number;
//   totalPages: number;
//   last: boolean;
//   size: number;
//   number: number;
//   sort: any;
//   numberOfElements: number;
//   first: boolean;
//   empty: boolean;
// }

// export interface PostCreateRequest {
//   topicId: number;
//   titleId: number;
//   descriptionMd: string;
// }

// export interface ReplyCreateRequest {
//   postId: number;
//   parentReplyId: number | null;
//   contentMd: string;
// }
// export interface TopicReplyCreateRequest {
//   topicId: number;
//   contentMd: string;
// }

// export interface TitleCreateRequest {
//   topicId: number;
//   title: string;
//   descriptionMd: string;
// }

// export interface ForumTopicDto {
//   topicId: number;
//   topicName: string;
// }

// /** Maps to backend DTO TitleCheckResponse */
// export interface TitleCheckResponse {
//     titleId: number | null;
//     topicId: number | null;
//     title: string;
//     exists: boolean;
//     available: boolean;
// }
// // ------------------------------------------

// @Injectable({ providedIn: 'root' })
// export class ForumService {

//   private http = inject(HttpClient);
//   private api = environment.apiBaseUrl;
//   private userId = this.getLoginUserId(); 
  
//   public topicCategories$ = new BehaviorSubject<ForumTopicDto[]>([]); 
//   public displayTitles$ = new BehaviorSubject<Topic[]>([]); 

//   /** Helper to include login_user_id as a query parameter. */
//   private withUser(params: Record<string, any> = {}) {
//     return new HttpParams({ fromObject: { ...params, login_user_id: String(this.userId) } });
//   }

//   private getLoginUserId(): number {
//     const match = document.cookie.match(/custom:login_user_id=([^;]+)/);
//     // FIX: Changed default from 0 (invalid) to 1 (known test user) to avoid 400 Bad Request
//     return match ? +match[1] : 1; 
//   }

//   // =========================================================
//   // === NOTIFICATION METHODS (RESTORED FIX)
//   // =========================================================

//   /** FIX: Restored for notifications-panel.component.ts */
//   getNotifications(): Observable<Notification[]> {
//     return this.http.get<Notification[]>(`${this.api}/forum/notifications`, {
//       params: this.withUser()
//     });
//   }

//   /** FIX: Restored for notifications-panel.component.ts */
//   markNotificationAsRead(id: string): Observable<any> {
//     return this.http.post(`${this.api}/forum/notifications/read`, { id }, {
//       params: this.withUser()
//     });
//   }

//   // =========================================================
//   // === Placeholder & Listing Methods
//   // =========================================================
  
//   getCurrentUser(): Observable<User> {
//     return this.http.get<User>(`${this.api}/forum/me`);
//   }

//   listAllTopics(): Observable<ForumTopicDto[]> {
//     return this.http.get<ForumTopicDto[]>(`${this.api}/forum/topics`).pipe(
//       tap((topics: ForumTopicDto[]) => { this.topicCategories$.next(topics); })
//     );
//   }
//   getTopicById(id: string | number): Observable<TopicDetail> {
//     return this.http.get<TopicDetail>(`${this.api}/forum/title-posts`, {
//         params: this.withUser({ title_id: String(id) })
//     });
//   }
//   listTitles(topicId: number | null = null, page: number = 0, size: number = 20): Observable<Page<Topic>> {
//     const params: Record<string, any> = { page: String(page), size: String(size) };
//     if (topicId !== null) { params['topic_id'] = String(topicId); }
//     return this.http.get<Page<Topic>>(`${this.api}/forum/titles`, { params: this.withUser(params) }).pipe(
//       tap((pageResponse: Page<Topic>) => { this.displayTitles$.next(pageResponse.content || []); })
//     );
//   }
//   fetchAllTopics(): Observable<Page<Topic>> { return this.listTitles(); }
//   searchTopics(query: string, page: number = 0, size: number = 50): Observable<Topic[]> {
//     return this.http.get<Topic[]>(`${this.api}/forum/search`, { params: this.withUser({ query, page, size }) });
//   }
//   filterByCategory(topicName: string | null): void {
//     let topicId: number | null = null;
//     const allTopics = this.topicCategories$.getValue();
//     if (topicName && allTopics.length > 0) {
//       const submittedName = topicName.trim();
//       const foundTopic = allTopics.find(t => t.topicName.trim() === submittedName);
//       if (foundTopic) { topicId = foundTopic.topicId; }
//     }
//     this.listTitles(topicId).subscribe();
//   }
//   checkTitleAvailability(title: string, excludeId: number | null = null): Observable<TitleCheckResponse> {
//       const params: Record<string, any> = { title };
//       if (excludeId !== null) { params['exclude_title_id'] = String(excludeId); }
//       return this.http.get<TitleCheckResponse>(`${this.api}/forum/titles/check`, { params: this.withUser(params) });
//   }

//   // =========================================================
//   // === CREATION AND MODIFICATION (POST/PUT/DELETE)
//   // =========================================================

//   /**
//    * ✅ API: POST /forum/titles (Creation)
//    */
//   createTitle(req: TitleCreateRequest): Observable<any> {
//     const params = {
//       topic_id: String(req.topicId), 
//       title: req.title, 
//       descriptionMd: req.descriptionMd
//     };
    
//     return this.http.post(`${this.api}/forum/titles`, null, { 
//       params: this.withUser(params)
//     });
//   }

//   createPost(req: PostCreateRequest): Observable<any> {
//     return this.http.post(`${this.api}/forum/posts`, req, { params: this.withUser() });
//   }

//   addReplyToPost(postId: number, contentMd: string): Observable<any> {
//     const req: ReplyCreateRequest = { postId, parentReplyId: null, contentMd };
//     return this.http.post(`${this.api}/forum/replies`, req, { params: this.withUser() });
//   }

//   addNestedReply(postId: number, parentReplyId: number, contentMd: string): Observable<any> {
//     const req: ReplyCreateRequest = { postId, parentReplyId, contentMd };
//     return this.http.post(`${this.api}/forum/replies`, req, { params: this.withUser() });
//   }
//   addReplyToTopic(topicId: number, contentMd: string): Observable<any> {
//     const req: TopicReplyCreateRequest = { topicId, contentMd };
//     // Assuming a RESTful endpoint like /topics/{id}/replies
//     return this.http.post(`${this.api}/forum/topics/${topicId}/replies`, req, { params: this.withUser() });
// }
  
//   toggleLike(payload: { postId: number | null, replyId: number | null }): Observable<number> {
//     const params: Record<string, any> = {};
//     if (payload.postId !== null) { params['post_id'] = String(payload.postId); }
//     if (payload.replyId !== null) { params['reply_id'] = String(payload.replyId); }
//     return this.http.post<number>(`${this.api}/forum/likes`, null, { params: this.withUser(params) });
//   }

//   togglePinned(postId: number): Observable<any> {
//     const params = { post_id: String(postId) };
//     return this.http.post(`${this.api}/forum/post/pin-toggle`, null, { params: this.withUser(params) });
//   }
  
//   editItem(
//     titleId: number, postId: number | null = null, replyId: number | null = null,
//     newContentMd: string | null = null, newTitle: string | null = null, newDescriptionMd: string | null = null
//   ): Observable<any> {
//     const params: Record<string, any> = { title_id: String(titleId) };
//     if (postId !== null) params['post_id'] = String(postId);
//     if (replyId !== null) params['reply_id'] = String(replyId);
//     if (newContentMd !== null) params['new_content_md'] = newContentMd;
//     if (newTitle !== null) params['new_title'] = newTitle;
//     if (newDescriptionMd !== null) params['new_description_md'] = newDescriptionMd;
//     return this.http.put(`${this.api}/forum/edit`, null, { params: this.withUser(params) });
//   }

//   deleteItem(postId: number | null, replyId: number | null): Observable<string> {
//     const params: Record<string, any> = {};
//     if (postId !== null) { params['post_id'] = String(postId); }
//     if (replyId !== null) { params['reply_id'] = String(replyId); }
//     return this.http.delete(`${this.api}/forum/delete`, { params: this.withUser(params), responseType: 'text' }) as Observable<string>;
//   }
// }

// /src/app/services/forum.service.ts
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable, inject } from '@angular/core';
// import { environment } from 'src/environments/environment';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { Notification, User, Topic, TopicDetail } from '../models/forum.model';

// // ---------- Shared paging interface ----------
// export interface Page<T> {
//   content: T[];
//   pageable: any;
//   totalElements: number;
//   totalPages: number;
//   last: boolean;
//   size: number;
//   number: number;
//   sort: any;
//   numberOfElements: number;
//   first: boolean;
//   empty: boolean;
// }

// // ---------- Request DTOs ----------
// export interface PostCreateRequest {
//   topicId: number;
//   titleId: number;
//   descriptionMd: string;   // <-- MUST be descriptionMd (backend expects this)
// }

// export interface ReplyCreateRequest {
//   postId: number;
//   parentReplyId: number | null;
//   contentMd: string;
// }

// export interface TitleCreateRequest {
//   topicId: number;
//   title: string;
//   descriptionMd: string;
// }

// // ---------- Other DTOs ----------
// export interface ForumTopicDto {
//   topicId: number;
//   topicName: string;
// }

// export interface TitleCheckResponse {
//   titleId: number | null;
//   topicId: number | null;
//   title: string;
//   exists: boolean;
//   available: boolean;
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
//   pinnedById?: number | null;
//   likesCount: number;
//   viewsCount: number;
//   replyCount: number;
//   deleted: boolean;
//   createdAt: string;
//   editedAt?: string | null;
//   lastActivityAt?: string | null;
//   replies: Array<{
//     replyId: number;
//     postId: number;
//     parentReplyId?: number | null;
//     loginUserId: number;
//     loginUserName: string;
//     content: string;
//     depth: number;
//     likesCount: number;
//     deleted: boolean;
//     createdAt: string;
//     editedAt?: string | null;
//   }>;
// }
// @Injectable({ providedIn: 'root' })
// export class ForumService {
//   private http = inject(HttpClient);

//   // Trim possible trailing slash from env base to avoid //forum
//   private api = environment.apiBaseUrl.replace(/\/+$/, '');

//   private userId = this.getLoginUserId();

//   public topicCategories$ = new BehaviorSubject<ForumTopicDto[]>([]);
//   public displayTitles$   = new BehaviorSubject<Topic[]>([]);

//   // ---------- Helpers ----------
//   /** Always include login_user_id as query parameter where backend expects it */
//   private withUser(params: Record<string, any> = {}) {
//     return new HttpParams({
//       fromObject: {
//         ...Object.fromEntries(
//           Object.entries(params).map(([k, v]) => [k, String(v)])
//         ),
//         login_user_id: String(this.userId)
//       }
//     });
//   }

//   /** Use cookie set by your Lambda authorizer / gateway. Fallback to 1 for local testing. */
//   private getLoginUserId(): number {
//     const match = document.cookie.match(/custom:login_user_id=([^;]+)/);
//     return match ? +match[1] : 1;
//   }

//   // =========================================================
//   // Notifications (if you have a separate controller for these)
//   // =========================================================
//   getNotifications(): Observable<Notification[]> {
//     return this.http.get<Notification[]>(`${this.api}/forum/notifications`, {
//       params: this.withUser()
//     });
//   }

//   markNotificationAsRead(id: string): Observable<any> {
//     return this.http.post(`${this.api}/forum/notifications/read`, { id }, {
//       params: this.withUser()
//     });
//   }

//   // =========================================================
//   // Users / Topics / Titles
//   // =========================================================
//   /** If you have a /forum/me endpoint elsewhere */
//   getTitleWithPosts(titleId: number | string, page = 0, size = 10): Observable<TopicDetail> {
//     const params = new HttpParams()
//       .set('title_id', String(titleId))
//       .set('page', String(page))
//       .set('size', String(size));
//     return this.http.get<TopicDetail>(`${this.api}/forum/title-posts`, { params });
//   }

//   /** GET /forum/topics → list of {topicId, topicName} */
//   listAllTopics(): Observable<ForumTopicDto[]> {
//     return this.http.get<ForumTopicDto[]>(`${this.api}/forum/topics`).pipe(
//       tap((topics) => this.topicCategories$.next(topics))
//     );
//   }

//   /**
//    * GET /forum/title-posts?title_id=…
//    * Backend returns TitleDto (title + paginated posts). If your UI model is TopicDetail,
//    * make sure TopicDetail matches TitleDto shape.
//    *
//    * NOTE: backend signature does NOT require login_user_id for this one,
//    * but passing an extra query param is harmless. If you want to avoid it, call
//    * without withUser().
//    */
//   getTopicById(id: string | number): Observable<TopicDetail> {
//     const params = new HttpParams({ fromObject: { title_id: String(id) } });
//     return this.http.get<TopicDetail>(`${this.api}/forum/title-posts`, { params });
//   }

//   /**
//    * GET /forum/titles[?topic_id]
//    */
//   listTitles(topicId: number | null = null, page = 0, size = 20): Observable<Page<Topic>> {
//     const params: Record<string, any> = { page, size };
//     if (topicId !== null) params['topic_id'] = topicId;

//     return this.http.get<Page<Topic>>(`${this.api}/forum/titles`, {
//       params: new HttpParams({
//         fromObject: Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]))
//       })
//     }).pipe(
//       tap((pageResponse) => this.displayTitles$.next(pageResponse?.content || []))
//     );
//   }

//   fetchAllTopics(): Observable<Page<Topic>> {
//     return this.listTitles();
//   }

//   /** GET /forum/search */
//   searchTopics(query: string, page = 0, size = 50): Observable<Topic[]> {
//     const params = new HttpParams({ fromObject: { query, page: String(page), size: String(size) } });
//     return this.http.get<Topic[]>(`${this.api}/forum/search`, { params });
//   }

//   /** Helper to refresh titles stream for UI by category name */
//   filterByCategory(topicName: string | null): void {
//     let topicId: number | null = null;
//     const all = this.topicCategories$.getValue();
//     if (topicName && all.length > 0) {
//       const needle = topicName.trim();
//       const found = all.find(t => t.topicName.trim() === needle);
//       if (found) topicId = found.topicId;
//     }
//     this.listTitles(topicId).subscribe();
//   }

//   /** GET /forum/titles/check */
//   checkTitleAvailability(title: string, excludeId: number | null = null): Observable<TitleCheckResponse> {
//     const obj: Record<string, any> = { title };
//     if (excludeId !== null) obj['exclude_title_id'] = excludeId;
//     const params = new HttpParams({ fromObject: Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, String(v)])) });
//     return this.http.get<TitleCheckResponse>(`${this.api}/forum/titles/check`, { params });
//   }

//   // =========================================================
//   // Create / Edit / Delete
//   // =========================================================

//   /** POST /forum/titles  (query params only) */
//   createTitle(req: TitleCreateRequest): Observable<any> {
//     const params = this.withUser({
//       topic_id: req.topicId,
//       title: req.title,
//       descriptionMd: req.descriptionMd
//     });
//     return this.http.post(`${this.api}/forum/titles`, null, { params });
//   }

//   /** POST /forum/posts (body: PostCreateRequestDto) */
//  createPost(req: PostCreateRequest): Observable<PostDto> {
//   return this.http.post<PostDto>(`${this.api}/forum/posts`, req, {
//     params: this.withUser() // adds ?login_user_id=<cookie or fallback>
//   });
// }

//   /**
//    * ✅ POST /forum/replies (body: ReplyCreateRequestDto)
//    * Use this for both direct replies and nested replies by setting parentReplyId.
//    */
//   addReplyToPost(postId: number, contentMd: string): Observable<any> {
//     const body: ReplyCreateRequest = { postId, parentReplyId: null, contentMd };
//     return this.http.post(`${this.api}/forum/replies`, body, {
//       params: this.withUser()
//     });
//   }

//   addNestedReply(postId: number, parentReplyId: number, contentMd: string): Observable<any> {
//     const body: ReplyCreateRequest = { postId, parentReplyId, contentMd };
//     return this.http.post(`${this.api}/forum/replies`, body, {
//       params: this.withUser()
//     });
//   }

//   /**
//    * ❌ NOT SUPPORTED by your ForumController
//    * Keeping commented as reference; do NOT call this from UI.
//    */
//   // addReplyToTopic(topicId: number, contentMd: string): Observable<any> {
//   //   return this.http.post(`${this.api}/forum/topics/${topicId}/replies`, { topicId, contentMd }, {
//   //     params: this.withUser()
//   //   });
//   // }

//   /** POST /forum/likes?post_id=…&reply_id=… */
//   toggleLike(payload: { postId: number | null; replyId: number | null }): Observable<number> {
//     const obj: Record<string, any> = {};
//     if (payload.postId !== null) obj['post_id'] = payload.postId;
//     if (payload.replyId !== null) obj['reply_id'] = payload.replyId;
//     return this.http.post<number>(`${this.api}/forum/likes`, null, {
//       params: this.withUser(obj)
//     });
//   }

//   /** POST /forum/post/pin-toggle?post_id=… */
//   togglePinned(postId: number): Observable<any> {
//     return this.http.post(`${this.api}/forum/post/pin-toggle`, null, {
//       params: this.withUser({ post_id: postId })
//     });
//   }

//   /** PUT /forum/edit?title_id=&post_id=&reply_id=&new_* */
//   editItem(
//     titleId: number,
//     postId: number | null = null,
//     replyId: number | null = null,
//     newContentMd: string | null = null,
//     newTitle: string | null = null,
//     newDescriptionMd: string | null = null
//   ): Observable<any> {
//     const obj: Record<string, any> = { title_id: titleId };
//     if (postId !== null)          obj['post_id'] = postId;
//     if (replyId !== null)         obj['reply_id'] = replyId;
//     if (newContentMd !== null)    obj['new_content_md'] = newContentMd;
//     if (newTitle !== null)        obj['new_title'] = newTitle;
//     if (newDescriptionMd !== null) obj['new_description_md'] = newDescriptionMd;

//     return this.http.put(`${this.api}/forum/edit`, null, {
//       params: this.withUser(obj)
//     });
//   }

//   /** DELETE /forum/delete?post_id=&reply_id= */
//   deleteItem(postId: number | null, replyId: number | null): Observable<string> {
//     const obj: Record<string, any> = {};
//     if (postId !== null) obj['post_id'] = postId;
//     if (replyId !== null) obj['reply_id'] = replyId;

//     return this.http.delete(`${this.api}/forum/delete`, {
//       params: this.withUser(obj),
//       responseType: 'text'
//     }) as unknown as Observable<string>;
//   }
// }

// /src/app/services/forum.service.ts
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable, inject } from '@angular/core';
// import { environment } from 'src/environments/environment';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { Notification, Topic, TopicDetail } from '../models/forum.model';

// // ---------- Shared paging interface ----------
// export interface Page<T> {
//   content: T[];
//   pageable: any;
//   totalElements: number;
//   totalPages: number;
//   last: boolean;
//   size: number;
//   number: number;
//   sort: any;
//   numberOfElements: number;
//   first: boolean;
//   empty: boolean;
// }

// // ---------- Request DTOs ----------
// export interface PostCreateRequest {
//   topicId: number;
//   titleId: number;
//   descriptionMd: string; // backend expects descriptionMd
// }
// export interface ReplyCreateRequest {
//   postId: number;
//   parentReplyId: number | null;
//   contentMd: string;
// }
// export interface TitleCreateRequest {
//   topicId: number;
//   title: string;
//   descriptionMd: string;
// }

// // ---------- Other DTOs ----------
// export interface ForumTopicDto {
//   topicId: number;
//   topicName: string;
// }
// export interface TitleCheckResponse {
//   titleId: number | null;
//   topicId: number | null;
//   title: string;
//   exists: boolean;
//   available: boolean;
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
//   pinnedById?: number | null;
//   likesCount: number;
//   viewsCount: number;
//   replyCount: number;
//   deleted: boolean;
//   createdAt: string;
//   editedAt?: string | null;
//   lastActivityAt?: string | null;
//   replies: Array<{
//     replyId: number;
//     postId: number;
//     parentReplyId?: number | null;
//     loginUserId: number;
//     loginUserName: string;
//     content: string;
//     depth: number;
//     likesCount: number;
//     deleted: boolean;
//     createdAt: string;
//     editedAt?: string | null;
//   }>;
// }



// @Injectable({ providedIn: 'root' })
// export class ForumService {
//   private http = inject(HttpClient);
//   // Trim trailing slash so we don't get //forum
//   private api = environment.apiBaseUrl.replace(/\/+$/, '');

//   // Streams for your UI
//   public topicCategories$ = new BehaviorSubject<ForumTopicDto[]>([]);
//   public displayTitles$   = new BehaviorSubject<Topic[]>([]);

//   // ----------------- Helpers -----------------
//   /** Read login_user_id fresh from session storage each time. */
//   private getLoginUserIdFromSession(): number {
//     // 1) sessionStorage (source of truth)
//     const fromSession = sessionStorage.getItem('login_user_id');
//     if (fromSession && !isNaN(+fromSession)) return +fromSession;

//     // 2) fallback: localStorage (sometimes you persist here)
//     const fromLocal = localStorage.getItem('login_user_id');
//     if (fromLocal && !isNaN(+fromLocal)) return +fromLocal;

//     // 3) optional: try userData blob
//     try {
//       const userData = sessionStorage.getItem('userData') || localStorage.getItem('userData');
//       if (userData) {
//         const parsed = JSON.parse(userData);
//         // If you store loginUserId inside userData, map it here:
//         if (parsed?.loginUserId && !isNaN(+parsed.loginUserId)) return +parsed.loginUserId;
//       }
//     } catch { /* ignore JSON issues */ }

//     // 4) last resort fallback for local dev
//     return 1;
//   }

//   /** Always add login_user_id as a query param; merges with provided params. */
//   private withUser(params: Record<string, any> = {}): HttpParams {
//     const loginUserId = this.getLoginUserIdFromSession();
//     const merged: Record<string, string> = {
//       ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
//       login_user_id: String(loginUserId),
//     };
//     return new HttpParams({ fromObject: merged });
//   }

//   // =========================================================
//   // Notifications (optional)
//   // =========================================================
//   getNotifications(): Observable<Notification[]> {
//     return this.http.get<Notification[]>(`${this.api}/forum/notifications`, {
//       params: this.withUser()
//     });
//   }
//   markNotificationAsRead(id: string): Observable<any> {
//     return this.http.post(`${this.api}/forum/notifications/read`, { id }, {
//       params: this.withUser()
//     });
//   }

//   // =========================================================
//   // Titles & Topics
//   // =========================================================
//   /** Title + paginated posts */
//   getTitleWithPosts(titleId: number | string, page = 0, size = 10): Observable<TopicDetail> {
//     const params = this.withUser({
//       title_id: String(titleId),
//       page: String(page),
//       size: String(size)
//     });
//     return this.http.get<TopicDetail>(`${this.api}/forum/title-posts`, { params });
//   }

//   /** Convenience alias (same endpoint) */
//   getTopicById(id: string | number): Observable<TopicDetail> {
//     const params = this.withUser({ title_id: String(id) });
//     return this.http.get<TopicDetail>(`${this.api}/forum/title-posts`, { params });
//   }

//   /** All forum categories */
//   listAllTopics(): Observable<ForumTopicDto[]> {
//     return this.http.get<ForumTopicDto[]>(`${this.api}/forum/topics`, {
//       params: this.withUser()
//     }).pipe(
//       tap((topics) => this.topicCategories$.next(topics))
//     );
//   }

//   /** Titles list (optionally by topicId) */
//   listTitles(topicId: number | null = null, page = 0, size = 20): Observable<Page<Topic>> {
//     const paramsObj: Record<string, any> = { page, size };
//     if (topicId !== null) paramsObj['topic_id'] = topicId;

//     return this.http.get<Page<Topic>>(`${this.api}/forum/titles`, {
//       params: this.withUser(paramsObj)
//     }).pipe(
//       tap((pageResponse) => this.displayTitles$.next(pageResponse?.content || []))
//     );
//   }

//   fetchAllTopics(): Observable<Page<Topic>> {
//     return this.listTitles();
//   }

//   /** Search titles/topics */
//   searchTopics(query: string, page = 0, size = 50): Observable<Topic[]> {
//     return this.http.get<Topic[]>(`${this.api}/forum/search`, {
//       params: this.withUser({ query, page: String(page), size: String(size) })
//     });
//   }

//   /** Helper to refresh titles stream by category name */
//   filterByCategory(topicName: string | null): void {
//     let topicId: number | null = null;
//     const all = this.topicCategories$.getValue();
//     if (topicName && all.length > 0) {
//       const needle = topicName.trim();
//       const found = all.find(t => t.topicName.trim() === needle);
//       if (found) topicId = found.topicId;
//     }
//     this.listTitles(topicId).subscribe();
//   }

//   /** Check title availability */
//   checkTitleAvailability(title: string, excludeId: number | null = null): Observable<TitleCheckResponse> {
//     const obj: Record<string, any> = { title };
//     if (excludeId !== null) obj['exclude_title_id'] = excludeId;
//     return this.http.get<TitleCheckResponse>(`${this.api}/forum/titles/check`, {
//       params: this.withUser(obj)
//     });
//   }

//   // =========================================================
//   // Create / Edit / Delete
//   // =========================================================
//   /** Create a new Title (query params) */
//   createTitle(req: TitleCreateRequest): Observable<any> {
//     const params = this.withUser({
//       topic_id: req.topicId,
//       title: req.title,
//       descriptionMd: req.descriptionMd
//     });
//     return this.http.post(`${this.api}/forum/titles`, null, { params });
//   }

//   /** Create a new Post under a Title */
//   createPost(req: PostCreateRequest): Observable<PostDto> {
//     return this.http.post<PostDto>(`${this.api}/forum/posts`, req, {
//       params: this.withUser()
//     });
//   }

//   /** Add a direct reply to a post */
//   addReplyToPost(postId: number, contentMd: string): Observable<any> {
//     const body: ReplyCreateRequest = { postId, parentReplyId: null, contentMd };
//     return this.http.post(`${this.api}/forum/replies`, body, {
//       params: this.withUser()
//     });
//   }

//   /** Add a nested reply (reply to a reply) */
//   addNestedReply(postId: number, parentReplyId: number, contentMd: string): Observable<any> {
//     const body: ReplyCreateRequest = { postId, parentReplyId, contentMd };
//     return this.http.post(`${this.api}/forum/replies`, body, {
//       params: this.withUser()
//     });
//   }

//   /** Toggle like (backend uses query params post_id and/or reply_id) */
//   toggleLike(payload: { postId: number | null; replyId: number | null }): Observable<number> {
//     const obj: Record<string, any> = {};
//     if (payload.postId !== null) obj['post_id'] = payload.postId;
//     if (payload.replyId !== null) obj['reply_id'] = payload.replyId;
//     return this.http.post<number>(`${this.api}/forum/likes`, null, {
//       params: this.withUser(obj)
//     });
//   }

//   /** Toggle pin on a post */
//   togglePinned(postId: number): Observable<any> {
//     return this.http.post(`${this.api}/forum/post/pin-toggle`, null, {
//       params: this.withUser({ post_id: postId })
//     });
//   }

//   /** Edit (title / post / reply) via multi-purpose endpoint */
//   editItem(
//     titleId: number,
//     postId: number | null = null,
//     replyId: number | null = null,
//     newContentMd: string | null = null,
//     newTitle: string | null = null,
//     newDescriptionMd: string | null = null
//   ): Observable<any> {
//     const obj: Record<string, any> = { title_id: titleId };
//     if (postId !== null)           obj['post_id'] = postId;
//     if (replyId !== null)          obj['reply_id'] = replyId;
//     if (newContentMd !== null)     obj['new_content_md'] = newContentMd;
//     if (newTitle !== null)         obj['new_title'] = newTitle;
//     if (newDescriptionMd !== null) obj['new_description_md'] = newDescriptionMd;

//     return this.http.put(`${this.api}/forum/edit`, null, {
//       params: this.withUser(obj)
//     });
//   }

//   /** Delete post or reply */
//   deleteItem(postId: number | null, replyId: number | null): Observable<string> {
//     const obj: Record<string, any> = {};
//     if (postId !== null) obj['post_id'] = postId;
//     if (replyId !== null) obj['reply_id'] = replyId;

//     return this.http.delete(`${this.api}/forum/delete`, {
//       params: this.withUser(obj),
//       responseType: 'text'
//     }) as unknown as Observable<string>;
//   }
// }




// //   // src/app/services/forum.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';

// // ---------- Shared Types ----------
// export interface Page<T> {
//   content: T[];
//   pageable: {
//     pageNumber: number;
//     pageSize: number;
//     sort?: any;
//     offset?: number;
//     paged?: boolean;
//     unpaged?: boolean;
//   };
//   totalElements: number;
//   totalPages:  number;
//   last:         boolean;
//   size:         number;
//   number:       number;
//   sort?:        any;
//   numberOfElements: number;
//   first:        boolean;
//   empty:        boolean;
// }

// // ---------- Request DTOs ----------
// export interface PostCreateRequestDto {
//   topicId: number;
//   titleId: number;
//   descriptionMd: string; // backend expects "descriptionMd"
// }
// export interface ReplyCreateRequestDto {
//   postId: number;
//   parentReplyId: number | null;
//   contentMd: string;
// }
// export interface TitleCreateRequest {
//   topicId: number;
//   title: string;
//   descriptionMd: string;
// }

// // ---------- Response DTOs ----------
// export interface ForumTopicDto {
//   topicId: number;
//   topicName: string;
// }
// export interface TitleCheckResponse {
//   titleId: number | null;
//   topicId: number | null;
//   title: string;
//   exists: boolean;
//   available: boolean;
// }

// export interface ReplyDto {
//   replyId: number;
//   postId: number;
//   parentReplyId?: number | null;
//   loginUserId: number;
//   loginUserName: string;
//   content: string;
//   depth: number;
//   likesCount: number;
//   deleted: boolean;
//   createdAt: string;
//   editedAt?: string | null;
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
//   pinnedById?: number | null;
//   likesCount: number;
//   viewsCount: number;
//   replyCount: number;
//   deleted: boolean;
//   createdAt: string;
//   editedAt?: string | null;
//   lastActivityAt?: string | null;
//   replies: ReplyDto[];
// }

// export interface TitleDto {
//   titleId: number;
//   topicId: number;
//   title: string;
//   descriptionMd: string;
//   category?: string | null;
//   isPinned?: boolean;
//   replyCount?: number;
//   viewCount?: number;
//   lastActivity?: string | null;
//   createdAt?: string;
//   posts?: Page<PostDto> | null;
// }

// @Injectable({ providedIn: 'root' })
// export class ForumService {
//   private readonly base = this.join(environment.apiBaseUrl, 'forum');

//   constructor(private http: HttpClient) {}

//   // ====== LOGIN USER HELPER ======
//   /** Always read fresh from session/local storage */
//   private getLoginUserIdFromSession(): number {
//     const s = sessionStorage.getItem('login_user_id');
//     if (s && !isNaN(+s)) return +s;
//     const l = localStorage.getItem('login_user_id');
//     if (l && !isNaN(+l)) return +l;

//     try {
//       const blob = sessionStorage.getItem('userData') || localStorage.getItem('userData');
//       if (blob) {
//         const parsed = JSON.parse(blob);
//         if (parsed?.loginUserId && !isNaN(+parsed.loginUserId)) return +parsed.loginUserId;
//       }
//     } catch {}

//     return 1; // local fallback
//   }

//   /** Attach login_user_id to params */
//   private withLogin(params?: HttpParams): HttpParams {
//     const id = String(this.getLoginUserIdFromSession());
//     const p = params ?? new HttpParams();
//     return p.set('login_user_id', id);
//   }

//   /** Build params safely */
//   private params(obj: Record<string, string | number | boolean | null | undefined>): HttpParams {
//     let p = new HttpParams();
//     Object.entries(obj).forEach(([k, v]) => {
//       if (v !== null && v !== undefined) p = p.set(k, String(v));
//     });
//     return p;
//   }

//   private join(a: string, b: string): string {
//     if (!a.endsWith('/')) a += '/';
//     return a + b.replace(/^\//, '');
//   }

  

//   // ====== POSTS ======
//   createPost(req: PostCreateRequestDto): Observable<PostDto> {
//     const url = this.join(this.base, 'posts');
//     const params = this.withLogin();
//     return this.http.post<PostDto>(url, req, { params });
//   }

//   listByTopic(topicId: number, page = 0, size = 20): Observable<Page<PostDto>> {
//     const url = this.join(this.base, 'posts/by-topic');
//     let params = this.params({ topic_id: topicId, page, size });
//     params = this.withLogin(params);
//     return this.http.get<Page<PostDto>>(url, { params });
//   }

//   listByAuthor(page = 0, size = 20): Observable<Page<PostDto>> {
//     const url = this.join(this.base, 'posts/by-user');
//     let params = this.params({ page, size });
//     params = this.withLogin(params);
//     return this.http.get<Page<PostDto>>(url, { params });
//   }

//   listAllPosts(page = 0, size = 20): Observable<Page<PostDto>> {
//     const url = this.join(this.base, 'all-posts');
//     let params = this.params({ page, size });
//     params = this.withLogin(params);
//     return this.http.get<Page<PostDto>>(url, { params });
//   }

//   getPost(postId: number): Observable<PostDto> {
//     const url = this.join(this.base, 'post');
//     let params = this.params({ post_id: postId });
//     params = this.withLogin(params);
//     return this.http.get<PostDto>(url, { params });
//   }

//   edit(options: {
//     titleId?: number;
//     postId?: number;
//     replyId?: number;
//     newContentMd?: string;
//     newTitle?: string;
//     newDescriptionMd?: string;
//   }): Observable<PostDto | ReplyDto | TitleDto | { message: string }> {
//     const url = this.join(this.base, 'edit');
//     let params = this.params({
//       title_id: options.titleId,
//       post_id: options.postId,
//       reply_id: options.replyId,
//       new_content_md: options.newContentMd,
//       new_title: options.newTitle,
//       new_description_md: options.newDescriptionMd,
//     });
//     params = this.withLogin(params);
//     return this.http.put<PostDto | ReplyDto | TitleDto | { message: string }>(url, null, { params });
//   }

//   togglePinned(postId: number): Observable<PostDto> {
//     const url = this.join(this.base, 'post/pin-toggle');
//     let params = this.params({ post_id: postId });
//     params = this.withLogin(params);
//     return this.http.post<PostDto>(url, null, { params });
//   }

//   viewPost(postId: number): Observable<number> {
//     const url = this.join(this.base, 'post/view');
//     let params = this.params({ post_id: postId });
//     params = this.withLogin(params);
//     return this.http.post<number>(url, null, { params });
//   }

//   toggleLike(opts: { postId?: number; replyId?: number }): Observable<number> {
//     const url = this.join(this.base, 'likes');
//     let params = this.params({ post_id: opts.postId, reply_id: opts.replyId });
//     params = this.withLogin(params);
//     return this.http.post<number>(url, null, { params });
//   }

//   deleteItem(opts: { postId?: number; replyId?: number }): Observable<string> {
//     const url = this.join(this.base, 'delete');
//     let params = this.params({ post_id: opts.postId, reply_id: opts.replyId });
//     params = this.withLogin(params);
//     return this.http.delete(url, { params, responseType: 'text' });
//   }

//   // ====== REPLIES ======
//   createReply(req: ReplyCreateRequestDto): Observable<ReplyDto> {
//     const url = this.join(this.base, 'replies');
//     const params = this.withLogin();
//     return this.http.post<ReplyDto>(url, req, { params });
//   }

//   listTopReplies(postId: number, page = 0, size = 50): Observable<Page<ReplyDto>> {
//     const url = this.join(this.base, 'post/replies');
//     let params = this.params({ post_id: postId, page, size });
//     params = this.withLogin(params);
//     return this.http.get<Page<ReplyDto>>(url, { params });
//   }

//   listChildReplies(replyId: number, page = 0, size = 50): Observable<Page<ReplyDto>> {
//     const url = this.join(this.base, 'reply/children');
//     let params = this.params({ reply_id: replyId, page, size });
//     params = this.withLogin(params);
//     return this.http.get<Page<ReplyDto>>(url, { params });
//   }
// listTitlesByTopicAndCategory(
//   topicId: number,
//   category: string,
//   page: number = 0,
//   size: number = 20
// ): Observable<Page<TitleDto>> {
//   const url = this.join(this.base, 'titles');
//   let params = this.params({
//     topic_id: topicId,
//     category: category,  // Ensure category is a string
//     page,
//     size
//   });
//   params = this.withLogin(params);
//   return this.http.get<Page<TitleDto>>(url, { params });
// }

// listTitlesFiltered(topicId: number, category: string, page = 0, size = 20): Observable<Page<TitleDto>> {
//   const url = this.join(this.base, 'titles');  // Adjust endpoint as needed
//   let params = this.params({ topic_id: topicId, category, page, size });
//   params = this.withLogin(params);  // Attach login user ID to params
//   return this.http.get<Page<TitleDto>>(url, { params });
// }

//   // ====== SEARCH / TOPICS ======
//   search(query: string, page = 0, size = 50): Observable<PostDto[]> {
//     const url = this.join(this.base, 'search');
//     const params = this.params({ query, page, size });
//     return this.http.get<PostDto[]>(url, { params });
//   }

//   getAllTopicIdsAndNames(): Observable<ForumTopicDto[]> {
//     const url = this.join(this.base, 'topics');
//     return this.http.get<ForumTopicDto[]>(url);
//   }

  

//   // ====== TITLES ======
//   createTitle(req: TitleCreateRequest): Observable<TitleDto> {
//     const url = this.join(this.base, 'titles');
//     let params = this.params({
//       topic_id: req.topicId,
//       title: req.title,
//       descriptionMd: req.descriptionMd,
//     });
//     params = this.withLogin(params);
//     // Backend expects all fields as @RequestParam -> send as null body + params
//     return this.http.post<TitleDto>(url, null, { params });
//   }

//   getTitleWithPosts(titleId: number, page = 0, size = 10): Observable<TitleDto> {
//     const url = this.join(this.base, 'title-posts');
//     const params = this.params({ title_id: titleId, page, size });
//     return this.http.get<TitleDto>(url, { params });
//   }

//   listTitles(topicId?: number, page = 0, size = 20): Observable<Page<TitleDto>> {
//     const url = this.join(this.base, 'titles');
//     const params = this.params({ topic_id: topicId, page, size });
//     return this.http.get<Page<TitleDto>>(url, { params });
//   }

//   deleteTitle(titleId: number): Observable<string> {
//     const url = this.join(this.base, 'titles/delete');
//     let params = this.params({ title_id: titleId });
//     params = this.withLogin(params);
//     return this.http.delete(url, { params, responseType: 'text' });
//   }

//   checkTitleAvailableGlobally(title: string, excludeId?: number): Observable<TitleCheckResponse> {
//     const url = this.join(this.base, 'titles/check');
//     const params = this.params({ title, exclude_title_id: excludeId });
//     return this.http.get<TitleCheckResponse>(url, { params });
//   }

//   // ====== REPORTS / ADMIN ======
//   reportItem(opts: { postId?: number; replyId?: number }): Observable<{ type: 'post' | 'reply'; post_id?: number; reply_id?: number; report_count: number; }> {
//     const url = this.join(this.base, 'report');
//     let params = this.params({ post_id: opts.postId, reply_id: opts.replyId });
//     params = this.withLogin(params);
//     return this.http.post<{ type: 'post' | 'reply'; post_id?: number; reply_id?: number; report_count: number; }>(url, null, { params });
//   }

//   adminSoftDeleteItem(opts: { postId?: number; replyId?: number }): Observable<{ type: 'post' | 'reply'; post_id?: number; reply_id?: number; soft_deleted: true; }> {
//     const url = this.join(this.base, 'admin/soft-delete');
//     let params = this.params({ post_id: opts.postId, reply_id: opts.replyId });
//     params = this.withLogin(params);
//     return this.http.post<{ type: 'post' | 'reply'; post_id?: number; reply_id?: number; soft_deleted: true; }>(url, null, { params });
//   }

//   // ====== (Optional) Local Helper Often Used in Components ======
//   /** Simple client-side category filter if you need it in lists (prevents TS errors when referenced). */
//   filterByCategory<T extends { category?: string | null }>(items: T[], category: string | null | undefined): T[] {
//     if (!category || category === 'all') return items;
//     return (items || []).filter(i => (i.category || '').toLowerCase() === category.toLowerCase());
//   }
// }



// src/app/services/forum.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// ---------- Shared Types ----------
export interface Page<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort?: any;
    offset?: number;
    paged?: boolean;
    unpaged?: boolean;
  };
  totalElements: number;
  totalPages:  number;
  last:         boolean;
  size:         number;
  number:       number;
  sort?:        any;
  numberOfElements: number;
  first:        boolean;
  empty:        boolean;
}

// ---------- Request DTOs ----------
export interface PostCreateRequestDto {
  topicId: number;
  titleId: number;
  descriptionMd: string; // backend expects "descriptionMd"
}
export interface ReplyCreateRequestDto {
  postId: number;
  parentReplyId: number | null;
  contentMd: string;
}
export interface TitleCreateRequest {
  topicId: number;
  title: string;
  descriptionMd: string;
}

// ---------- Response DTOs ----------
export interface ForumTopicDto {
  topicId: number;
  topicName: string;
}
export interface TitleCheckResponse {
  titleId: number | null;
  topicId: number | null;
  title: string;
  exists: boolean;
  available: boolean;
}

export interface ReplyDto {
  replyId: number;
  postId: number;
  parentReplyId?: number | null;
  loginUserId: number;
  loginUserName: string;
  content: string;
  depth: number;
  likesCount: number;
  deleted: boolean;
  createdAt: string;
  editedAt?: string | null;
}

export interface PostDto {
  postId: number;
  loginUserId: number;
  loginUserName: string;
  topicId: number;
  topicName: string;
  titleId: number;
  title: string;
  content: string;
  pinned: boolean;
  pinnedById?: number | null;
  likesCount: number;
  viewsCount: number;
  replyCount: number;
  deleted: boolean;
  createdAt: string;
  editedAt?: string | null;
  lastActivityAt?: string | null;
  replies: ReplyDto[];
}

export interface TitleDto {
  titleId: number;
  topicId: number;
  title: string;
  descriptionMd: string;
  category?: string | null;
  isPinned?: boolean;
  replyCount?: number;
  viewCount?: number;
  lastActivity?: string | null;
  createdAt?: string;
  posts?: Page<PostDto> | null;
}

@Injectable({ providedIn: 'root' })
export class ForumService {
  private readonly base = this.join(environment.apiBaseUrl, 'forum');

  constructor(private http: HttpClient) {}

  // ====== LOGIN USER HELPER ======
  /** Always read fresh from session/local storage */
  private getLoginUserIdFromSession(): number {
    const s = sessionStorage.getItem('login_user_id');
    if (s && !isNaN(+s)) return +s;
    const l = localStorage.getItem('login_user_id');
    if (l && !isNaN(+l)) return +l;

    try {
      const blob = sessionStorage.getItem('userData') || localStorage.getItem('userData');
      if (blob) {
        const parsed = JSON.parse(blob);
        if (parsed?.loginUserId && !isNaN(+parsed.loginUserId)) return +parsed.loginUserId;
      }
    } catch {}

    return 1; // local fallback
  }

  /** Attach login_user_id to params */
  private withLogin(params?: HttpParams): HttpParams {
    const id = String(this.getLoginUserIdFromSession());
    const p = params ?? new HttpParams();
    return p.set('login_user_id', id);
  }

  /** Build params safely */
  private params(obj: Record<string, string | number | boolean | null | undefined>): HttpParams {
    let p = new HttpParams();
    Object.entries(obj).forEach(([k, v]) => {
      if (v !== null && v !== undefined) p = p.set(k, String(v));
    });
    return p;
  }

  private join(a: string, b: string): string {
    if (!a.endsWith('/')) a += '/';
    return a + b.replace(/^\//, '');
  }

  // ====== POSTS ======
  createPost(req: PostCreateRequestDto): Observable<PostDto> {
    const url = this.join(this.base, 'posts');
    const params = this.withLogin();
    return this.http.post<PostDto>(url, req, { params });
  }

  listByTopic(topicId: number, page = 0, size = 20): Observable<Page<PostDto>> {
    const url = this.join(this.base, 'posts/by-topic');
    let params = this.params({ topic_id: topicId, page, size });
    params = this.withLogin(params);
    return this.http.get<Page<PostDto>>(url, { params });
  }

  listByAuthor(page = 0, size = 20): Observable<Page<PostDto>> {
    const url = this.join(this.base, 'posts/by-user');
    let params = this.params({ page, size });
    params = this.withLogin(params);
    return this.http.get<Page<PostDto>>(url, { params });
  }

  listAllPosts(page = 0, size = 20): Observable<Page<PostDto>> {
    const url = this.join(this.base, 'all-posts');
    let params = this.params({ page, size });
    params = this.withLogin(params);
    return this.http.get<Page<PostDto>>(url, { params });
  }

  getPost(postId: number): Observable<PostDto> {
    const url = this.join(this.base, 'post');
    let params = this.params({ post_id: postId });
    params = this.withLogin(params);
    return this.http.get<PostDto>(url, { params });
  }

  edit(options: {
    titleId?: number;
    postId?: number;
    replyId?: number;
    newContentMd?: string;
    newTitle?: string;
    newDescriptionMd?: string;
  }): Observable<PostDto | ReplyDto | TitleDto | { message: string }> {
    const url = this.join(this.base, 'edit');
    let params = this.params({
      title_id: options.titleId,
      post_id: options.postId,
      reply_id: options.replyId,
      new_content_md: options.newContentMd,
      new_title: options.newTitle,
      new_description_md: options.newDescriptionMd,
    });
    params = this.withLogin(params);
    return this.http.put<PostDto | ReplyDto | TitleDto | { message: string }>(url, null, { params });
  }

  togglePinned(postId: number): Observable<PostDto> {
    const url = this.join(this.base, 'post/pin-toggle');
    let params = this.params({ post_id: postId });
    params = this.withLogin(params);
    return this.http.post<PostDto>(url, null, { params });
  }

  viewPost(postId: number): Observable<number> {
    const url = this.join(this.base, 'post/view');
    let params = this.params({ post_id: postId });
    params = this.withLogin(params);
    return this.http.post<number>(url, null, { params });
  }

  toggleLike(opts: { postId?: number; replyId?: number }): Observable<number> {
    const url = this.join(this.base, 'likes');
    let params = this.params({ post_id: opts.postId, reply_id: opts.replyId });
    params = this.withLogin(params);
    return this.http.post<number>(url, null, { params });
  }

  deleteItem(opts: { postId?: number; replyId?: number }): Observable<string> {
    const url = this.join(this.base, 'delete');
    let params = this.params({ post_id: opts.postId, reply_id: opts.replyId });
    params = this.withLogin(params);
    return this.http.delete(url, { params, responseType: 'text' });
  }

  // ====== REPLIES ======
  createReply(req: ReplyCreateRequestDto): Observable<ReplyDto> {
    const url = this.join(this.base, 'replies');
    const params = this.withLogin();
    return this.http.post<ReplyDto>(url, req, { params });
  }

  listTopReplies(postId: number, page = 0, size = 50): Observable<Page<ReplyDto>> {
    const url = this.join(this.base, 'post/replies');
    let params = this.params({ post_id: postId, page, size });
    params = this.withLogin(params);
    return this.http.get<Page<ReplyDto>>(url, { params });
  }

  listChildReplies(replyId: number, page = 0, size = 50): Observable<Page<ReplyDto>> {
    const url = this.join(this.base, 'reply/children');
    let params = this.params({ reply_id: replyId, page, size });
    params = this.withLogin(params);
    return this.http.get<Page<ReplyDto>>(url, { params });
  }

  // ====== SEARCH / TOPICS ======
  search(query: string, page = 0, size = 50): Observable<PostDto[]> {
    const url = this.join(this.base, 'search');
    const params = this.params({ query, page, size });
    return this.http.get<PostDto[]>(url, { params });
  }

  getAllTopicIdsAndNames(): Observable<ForumTopicDto[]> {
    const url = this.join(this.base, 'topics');
    return this.http.get<ForumTopicDto[]>(url);
  }

  // ====== TITLES ======
  createTitle(req: TitleCreateRequest): Observable<TitleDto> {
    const url = this.join(this.base, 'titles');
    let params = this.params({
      topic_id: req.topicId,
      title: req.title,
      descriptionMd: req.descriptionMd,
    });
    params = this.withLogin(params);
    // Backend expects all fields as @RequestParam -> send as null body + params
    return this.http.post<TitleDto>(url, null, { params });
  }

  getTitleWithPosts(titleId: number, page = 0, size = 10): Observable<TitleDto> {
    const url = this.join(this.base, 'title-posts');
    const params = this.params({ title_id: titleId, page, size });
    return this.http.get<TitleDto>(url, { params });
  }

  listTitles(topicId?: number, page = 0, size = 20): Observable<Page<TitleDto>> {
    const url = this.join(this.base, 'titles');
    const params = this.params({ topic_id: topicId, page, size });
    return this.http.get<Page<TitleDto>>(url, { params });
  }

  // ---- NEW: category + topic filters (server-side) ----
  listTitlesFiltered(opts: {
    topicId?: number;
    topicName?: string; // optional if backend supports topic_name
    category?: string | 'all' | null;
    page?: number;
    size?: number;
  }): Observable<Page<TitleDto>> {
    const { topicId, topicName, category, page = 0, size = 20 } = opts ?? {};
    const url = this.join(this.base, 'titles');

    const paramsObj: Record<string, string | number | boolean | null | undefined> = {
      topic_id: topicId,
      topic_name: topicName, // ignored by API if unsupported
      page,
      size
    };

    if (category && category !== 'all') {
      paramsObj['category'] = category;
    }

    const params = this.params(paramsObj);
    return this.http.get<Page<TitleDto>>(url, { params });
  }

  /** Convenience: topicId + category */
  listTitlesByTopicAndCategory(
    topicId: number,
    category: string | 'all' | null,
    page = 0,
    size = 20
  ): Observable<Page<TitleDto>> {
    return this.listTitlesFiltered({ topicId, category, page, size });
  }

  deleteTitle(titleId: number): Observable<string> {
    const url = this.join(this.base, 'titles/delete');
    let params = this.params({ title_id: titleId });
    params = this.withLogin(params);
    return this.http.delete(url, { params, responseType: 'text' });
  }

  checkTitleAvailableGlobally(title: string, excludeId?: number): Observable<TitleCheckResponse> {
    const url = this.join(this.base, 'titles/check');
    const params = this.params({ title, exclude_title_id: excludeId });
    return this.http.get<TitleCheckResponse>(url, { params });
  }

  // ====== REPORTS / ADMIN ======
  reportItem(opts: { postId?: number; replyId?: number }): Observable<{ type: 'post' | 'reply'; post_id?: number; reply_id?: number; report_count: number; }> {
    const url = this.join(this.base, 'report');
    let params = this.params({ post_id: opts.postId, reply_id: opts.replyId });
    params = this.withLogin(params);
    return this.http.post<{ type: 'post' | 'reply'; post_id?: number; reply_id?: number; report_count: number; }>(url, null, { params });
  }

  adminSoftDeleteItem(opts: { postId?: number; replyId?: number }): Observable<{ type: 'post' | 'reply'; post_id?: number; reply_id?: number; soft_deleted: true; }> {
    const url = this.join(this.base, 'admin/soft-delete');
    let params = this.params({ post_id: opts.postId, reply_id: opts.replyId });
    params = this.withLogin(params);
    return this.http.post<{ type: 'post' | 'reply'; post_id?: number; reply_id?: number; soft_deleted: true; }>(url, null, { params });
  }

  // ====== (Optional) Local Helper Often Used in Components ======
  /** Simple client-side category filter if you need it in lists (prevents TS errors when referenced). */
  filterByCategory<T extends { category?: string | null }>(items: T[], category: string | null | undefined): T[] {
    if (!category || category === 'all') return items;
    return (items || []).filter(i => (i.category || '').toLowerCase() === category.toLowerCase());
  }
}
