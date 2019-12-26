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
  blog;
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
 getSingleBlog(id):Observable<any> {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get<any>(this.domain + '/blog/singleBlog/' + id, this.options);
  }

  // Function to edit/update blog post
  editBlog(blog):Observable<any> {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put<any>(this.domain + '/blog/updateBlog/', blog, this.options);
  }

  // Function to delete a blog
  deleteBlog(id):Observable<any> {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.delete<any>(this.domain + '/blog/deleteBlog/' + id, this.options);
  }

  // Function to like a blog post
  likeBlog(id):Observable<any> {
    const blogData = { id: id };
    return this.http.put<any>(this.domain + '/blog/likeBlog/', blogData, this.options);
  }

  // Function to dislike a blog post
  dislikeBlog(id):Observable<any> {
    const blogData = { id: id };
    return this.http.put<any>(this.domain + '/blog/dislikeBlog/', blogData, this.options);
  }

  // Function to post a comment on a blog post
  postComment(id, comment):Observable<any> {
    this.createAuthenticationHeaders(); // Create headers
    // Create blogData to pass to backend
    const blogData = {
      id: id,
      comment: comment
    }
    return this.http.post<any>(this.domain + '/blog/comment', blogData, this.options);

  } 

}
