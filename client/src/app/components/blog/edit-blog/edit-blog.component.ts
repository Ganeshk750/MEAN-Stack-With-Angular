import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  message;
  messageClass;
  blog;
  processing = false;
  currentUrl;
  loading = true;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) { }


    // Function to Submit Update
    updateBlogSubmit() {
      this.processing = true; // Lock form fields
      // Function to send blog object to backend
      this.blogService.editBlog(this.blog).subscribe(data => {
        // Check if PUT request was a success or not
        if (!data.success) {
          this.messageClass = 'alert alert-danger'; 
          this.message = data.message; 
          this.processing = false; 
        } else {
          this.messageClass = 'alert alert-success'; 
          this.message = data.message; 
          // After two seconds, navigate back to blog page
          setTimeout(() => {
            this.router.navigate(['/blog']); 
          }, 2000);
        }
      });
    }


  // Function to go back to previous page
  goBack() {
    this.location.back();
  }


  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; 
    // Function to GET current blog with id in params
    this.blogService.getSingleBlog(this.currentUrl.id).subscribe(data => {
      // Check if GET request was success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; 
        this.message = data.message; 
      } else {
        this.blog = data.blog; 
        this.loading = false; 
      }
    });

  }

}
