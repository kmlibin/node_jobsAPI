# Node Jobs API

render deployment: https://jobs-api-si2u.onrender.com

Combines authentication knowledge with basic CRUD functionality to create an API. Users can register, login, and essentially manage a variety of jobs as part of a job search. You can create a job, update the job, edit, and delete jobs from a list. The job routes are all protected with auth middleware, which was the most time consuming part of this project. Once the user is authenticated, a token is created and sent to the frontend so the user can access their specific jobs dashboard. 

### Languages / Libraries / Tools

JavaScript, Node.js, Express, Mongo Atlas, Mongoose

#### a sampling of libraries: 
Bcrypt(for hashing passwords), dotenv (to load environment variables), jsonwebtoken (for generating tokens), swagger ui express (for documentation), HttpStatusCode

All Keys Generator, APIMatic, deployed with Render

### What I learned / Challenges

I need to focus more on errors, particularly the duplicate/validation errors. It's been awhile since I've learned/used classes, so that was a good refresher, but I still would like to continue practicing them.

Sometimes I also got a bit confused about when the token was created/sent and how it was sent back to the frontend. I think in this case, it would be helpful to have a frontend I could create and connect it to. 

Middleware is still a bit iffy to me - again, I think some of that confusion could be solved by setting up a working frontend. I'm still not always entirely clear at what point I need to implement it. 

Essentially, a lot of it boils down to repetition and remembering when to complete each step. This is where it would be quite helpful to build my own project. I think I now definitely have enough knowledge to do so...coming soon!
