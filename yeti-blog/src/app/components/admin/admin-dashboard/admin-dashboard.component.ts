import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Blog } from 'src/app/core/models/blog/blog';
import { ChatMessage } from 'src/app/core/models/chat/chat';
import { IpRecord } from 'src/app/core/models/ipRecord/ipRecord';
import { User } from 'src/app/core/models/user/user';

import { BlogService } from 'src/app/core/services/blog/blog.service';
import { ChatService } from 'src/app/core/services/chat/chat.service';
import { LogsService } from 'src/app/core/services/logs/logs.service';
import { UserServiceService } from 'src/app/core/services/user/user-service.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  
  logs: IpRecord[] = [];
  users$: Observable<User[]>;
  blogs$: Observable<Blog[]>;
  messages$: Observable<ChatMessage[]>;

  mostViewsFromCountryName!: string;

  get areLogsLoaded(): boolean {
    return (
      this.mostViewsFromCountryName != undefined
    );
  }

  constructor(
    private logsService: LogsService,
    private userService: UserServiceService,
    private blogService: BlogService,
    private chatService: ChatService,
    ) {
      this.users$ = this.userService.getAllUsers();
      this.blogs$ = this.blogService.getAllBlogs();
      this.messages$ = this.chatService.getAllMessages();
      
      this.loadLogs();
  }

  loadLogs() {
    this.logsService.getAllLogs().subscribe((logs) => {
      this.logs = logs;
      let groupedLogs: any = this.groupBy('country_name')(this.logs);
      let mostViewsFromCountryData = Object.values(groupedLogs).sort(
        (a: any, b: any) => b.length - a.length
      )[0] as any;
      this.mostViewsFromCountryName = mostViewsFromCountryData[0].country_name;
    });
  }

  groupBy(key: any) {
    return function group(array: any) {
      return array.reduce((acc: any, obj: any) => {
        const property = obj[key];
        acc[property] = acc[property] || [];
        acc[property].push(obj);
        return acc;
      }, {});
    };
    }
  
    ngOnInit(): void {}

  }
