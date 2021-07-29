import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Blog } from '../../models/blog/blog';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable()
export class BlogService {

  blogs: Observable<Blog[]>;
  
  constructor(public afs: AngularFirestore) {
    this.blogs = this.afs
      .collection('blogs')
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((a:any) => {
            const data = a.payload.doc.data() as Blog;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
  }

  getAllBlogs() {
    return this.blogs;
  }
}