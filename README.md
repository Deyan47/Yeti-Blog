# Yeti-Blog

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.3

Angular application where you can read, write and comment blogs.

# 🛠 Built with:

- Angular
- Angular animations
- Custom loader spinner
- Firebase Firestore Database
- Firestore Authentication
- Firestore Image Storage
- Custom validation alerts (toasts)
- Google Sign-In
- CKEditor
- IpData

# Permissions:

| **Permissions**          | Logged in User | Guest | Admin |
| ------------------------ | -------------- | ----- | ----- |
| Home page                | ✅             | ✅    | ✅    |
| All Blogs                | ✅             | ✅    | ✅    |
| Blog Article             | ✅             | ✅    | ✅    |
| Blog Article -> likes    | ✅             | ❌    | ✅    |
| Blog Article -> comments | ✅             | ❌    | ✅    |
| Profile                  | ✅             | ✅    | ✅    |
| Login/ Register          | ❌             | ✅    | ❌    |
| Writing a blog           | ✅             | ❌    | ✅    |
| Leaderboard              | ✅             | ❌    | ✅    |
| Bookmarks                | ✅             | ❌    | ✅    |
| Profile page             | ✅             | ✅    | ✅    |
| Chat                     | ✅             | ❌    | ✅    |
| Admin Dashboard          | ❌             | ❌    | ✅    |
| Admin users manage       | ❌             | ❌    | ✅    |
| Admin chat manage        | ❌             | ❌    | ✅    |
| Admin blogs manage       | ❌             | ❌    | ✅    |
| Admin logs manage        | ❌             | ❌    | ✅    |

## Public Pages:

**Home page**

This is the landing page of the application, from here you can view all the blogs.

**All Blogs**

In this page, all written blogs are displayed, here you can get brief information about the blog (such as likes, comments, views etc.). The page also allows you to sort the blogs by the number of views each one has. You can also search blogs by category (or tag) using the buttons on the right side of the page.

**Writing a blog**

From this page, you can create a new blog. After choosing a title and tags, you can add a heading image for the blog, This image will be uploaded to the Fireabase Image storage. Using the **CKEditor**, you have a great opportunity while writing your content. You can place hyperlinks, bullets, and other text editor magic. Upon clicking the blue submit button, your blog will be created.

**Blog Article page**

After clicking 'Read More' on the all blogs page, you will be redirected to the blog article page. Here you can view the whole blog article, as well as see it's image in it's whole beauty. The blog writer and the administrator can edit/or delete/ a blog once it is written. On this page you can also see all the comments the other users have posted. After you login you will also be able to post comments and like the blog using the heart button. From here, the reader can see relevent articles on the right and continue reading them.

**User profile page**

After you click on the author of a blog article, you will be redirected to their profile. Here you can see all the blogs they have written, their bio, and their achievements. For now the achievements are are given after the user surpasses a certain amount of blogs written (currently ; 1, 5, 10, 20, 50 and 100). The owner of the profile, as well as the admin, can see the last 10 people who visited that profile.

**Leaderboard page**

Here you can see the bloggers with the most blogs written.

**Chat**

On this page everyone in the website can openly chat with the others. Their messages will be hidden after one day. Clicking on a message will take you to the writer's profile page.

**Bookmarks**

On this page the user can see the blogs they have bookmarked so that they can view them at a later time. They can also remove the blogs from their bookmark list using the red delete button

**Login and Register pages**

Here the guest can register and login. If they already have a profile, they can you the google sign in button!

## Admin Pages:

**Admin Dashboard**

On this page the admin can see the count of blogs, user, messages and records save in the database. Upon clicking one of the cards, the admin will be redirected to the corresponding management page.

**Chat Management**

The administrator can see ALL sent messages.Ever. The admin can also delete messages, if they sound too inappropriate :)

**Blogs Management**

Here the administrator can see a more detailed info about the blogs, such as their ID's, creation dates, likes and other. From here, the admin can also delete the blogs.

**Users Management**

In this table the admin can see more info about the users, such as their ID's, emails and other. From here the admin can also freeze and unfreeze users. Frozen users cannot acces the chat, cannot write blogs and comment on existing blogs.

**Logs Management**

Here, the admin can see the saved logs. A log is saved when a user visits the Home, Blog or Profile pages. This info is collected only for statistical reasons. The admin can also delete the logs if they choose to.
