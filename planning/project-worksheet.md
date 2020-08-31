# Project Overview

## Project Description

For Project Three of the General Assembly SEI course, we were assigned to create a website that shows our knowledge and understanding of CRUD and RESTful APIs. We have to create the backend using Ruby on Rails. We create our frontend using HTML, CSS, JavaScript and Vue. We deployed our backend and frontend to Heroku and Netlify, respectively.

For this project, we will be building a video hosting website (using Youtube API) and host videos pertaining specifically to web developers. The website's purpose is to allow users to watch different web development videos. All users can browse through the homepage to select videos they want to watch. Users can also register an account for our website. Registered users have the abilities to comment on videos and use the like and dislike feature, unlike unregistered users.

## User Stories

- Users see a grid of videos on homepage
- Users can click on one video to watch it on the video player
- Users can create their own accounts
- Users can log in and comment on each video
- Users can edit comments or delete them
- Users can navigate using the navigation bar
- Users can like and dislike videos

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Saturday, August 22nd (Day 1)| Project Description / Wireframes / Priority Matrix / Timeline `backend` & `frontend` | Complete
|Sunday, August 23nd (Day 2)| Building out the `frontend` frame | Complete
|Monday, August 24th (Day 3)| Working on `backend`| Complete
|Tuesday, August 25th (Day 4)| Finishing up `backend` & fetching to `frontend` | Complete
|Wednesday, August 26th (Day 5)| Fixing breakcases | Complete
|Thursday, August 27th (Day 6)| Bug Fixes & Deployment | Complete
|Friday, August 28th (Day 7)| Post-MVP & CSS in the `frontend`| Complete
|Saturday, August 29th (Day 8)| Seeding videos in our database & more CSS| Complete
|Sunday, August 30th (Day 9)| Finish Documentation | Incomplete
|Monday, August 31st (Day 10)| Presentations | Incomplete

## Wireframes

- [Mobile](https://res.cloudinary.com/dpggcudix/image/upload/v1598051059/Screen_Shot_2020-08-21_at_7.03.51_PM_y3anyn.png)
- [Desktop](https://res.cloudinary.com/dpggcudix/image/upload/v1598051059/Screen_Shot_2020-08-21_at_7.03.36_PM_mjwsgq.png)


## Time / Priority Matrix 

- [Time / Priority Matrix](https://res.cloudinary.com/dpggcudix/image/upload/v1598048081/Screen_Shot_2020-08-21_at_6.14.31_PM_tdxcxn.png)

## MVP / PostMVP

#### MVP 

:heavy_check_mark: Login with Username and Password <br>
:heavy_check_mark: Mobile responsiveness first <br>
:heavy_check_mark: User Dashboard / Homepage <br>
:heavy_check_mark: Deploy frontend <br>
:heavy_check_mark: Hamburger menu  <br>
:heavy_check_mark: Navigation bar (Fixed) <br>
:heavy_check_mark: Video thumbnails displayed on homepage <br>
:heavy_check_mark: Navigating to video when clicked <br>
:heavy_check_mark: Ability to comment (CRUD) <br>
:heavy_check_mark: Abilty to like and dislike <br>
:heavy_check_mark: Meet the team page <br>
:heavy_check_mark: Landing page <br>

#### PostMVP 

:heavy_check_mark: CSS Animations <br>
:construction: Search Bar <br>
:construction: More User Customization <br>
:construction: Dark Mode <br>
:heavy_check_mark: Refactoring <br>
:heavy_check_mark: Fixing up bugs <br>

## Functional Components

### MVP
| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Authentication | H | 1hr | 2hr | 2hr|
| User Dashboard / Homepage | H | 3hr | 2hr | 2hr|
| Deploying Frontend | L | 0hr | 0hr | 0hr|
| Mobile Responsiveness | H | 3hr| 6hr | 6hr |
| Hamburger Menu | M | 1hr | 3hr | 3hr|
| Fixed Navigation Bar | H | 1hrs| 0hr | 0hr |
| Video Thumbnails | H | 3hr | 2hr | 2hr |
| Navigating to seperate page | H | 3hr | 0hr | 0hr |
| Total | H | 15hrs| 15hrs | 15hrs |

### PostMVP
| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| CSS Animations | L | 10hr | 6hr | 6hr|
| Search Bar | L | 3hr | 0hr | 0hr|
| More User Customization | L | 4hr | 0hr | 0hr|
| Dark Mode | L | 2hr | 0hr | 0hr|
| Refactoring & Fixing Bugs | L | 10hr | 6hr | 6hr|
| Total | H | 29hrs| 12hrs | 12hrs |

## Additional Libraries

 - [Bootstrap](https://getbootstrap.com/)
 - [FontAwesome](https://fontawesome.com/)
 - [Vue](https://vuejs.org/)

## Code Snippet

```
showVideo: function(id) {
            fetch(`${this.devURL}/videos/${id}`, {
                method: "get",
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then((response) => response.json())
            .then((data) => {
                this.videoSource = "https://youtube.com/embed/" + data.data.videoID 
                this.video_title = data.data.title
            })
        }
```

This code above represents how we get to display one video on the video player page when you click on it in the video homepage. We had to make sure the source of our video would be a link to the actual youtube video with it's very own Youtube ID. Luckily for us, the Youtube API allowed us to grab it's very own video ID. We just had to concatenate the video ID with the https://youtube.com/embed/. Each video has their unique ID, so we grab a different one for each video, and a the video player will be able to play the unique one. 

## Issues and Resolutions

One of the main issues this project had was the comments section, and specifically opening up the update and delete textarea or option. When you press on one of the update comment button or delete comment button, we only wanted it to pop up for just one of the comments. Initially, when we did that, all the comments would open up their update div or their delete div, even though it wasn't suppose to be the case. The right scenario would be to open up the div only for the comment it was choosing to update/delete, and not all. 

Jeremy helped us out on this one, and we used a v-if statement. Instead of linking the data to a boolean value, we did it with a number instead, and we chose 0. Everytime we click an update button, the update button would recieve a ID toggled on to it that is equal to the comment ID, and therefore if the ID of the divs that pop open when you click on the the buttons are equal to the ID of the buttons, it would open, but only if it equates to the button's ID. This ID is the same because they both are linked to the comment's ID through v-bind:id. Since the comments are unique, only the selected on get's opened while the other ones don't because their ID's don't match. 