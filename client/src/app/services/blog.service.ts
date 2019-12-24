import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  
  
  domain = this.authService.domain;
  //domain = "http://localhost:8080";
  options;
  
  constructor(private http: HttpClient, private authService: AuthService) { }

  createAuthenticationHeaders() {
    // this.loadToken();
    this.authService.loadToken();
     this.options = {
       headers: new HttpHeaders({
         'Content-Type':  'application/json',
         'Authorization': this.authService.authToken
       })
     };
     
   };

  // Function to create a new blog post
  newBlog(blog):Observable<any> {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post<any>(this.domain + '/blog/newBlog', blog, this.options);
  }

  // Function to get all blogs from the database
   getAllBlogs():Observable<any>  {
    this.createAuthenticationHeaders(); 
    return this.http.get<any>(this.domain + '/blog/allBlogs', this.options);
  }

  // Function to get the blog using the id
 /* getSingleBlog(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'blogs/singleBlog/' + id, this.options);
  }

  // Function to edit/update blog post
  editBlog(blog) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + 'blogs/updateBlog/', blog, this.options);
  }

  // Function to delete a blog
  deleteBlog(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.delete(this.domain + 'blogs/deleteBlog/' + id, this.options);
  }

  // Function to like a blog post
  likeBlog(id) {
    const blogData = { id: id };
    return this.http.put(this.domain + 'blogs/likeBlog/', blogData, this.options);
  }

  // Function to dislike a blog post
  dislikeBlog(id) {
    const blogData = { id: id };
    return this.http.put(this.domain + 'blogs/dislikeBlog/', blogData, this.options);
  }

  // Function to post a comment on a blog post
  postComment(id, comment) {
    this.createAuthenticationHeaders(); // Create headers
    // Create blogData to pass to backend
    const blogData = {
      id: id,
      comment: comment
    }
    return this.http.post(this.domain + 'blogs/comment', blogData, this.options);

  } */

}
