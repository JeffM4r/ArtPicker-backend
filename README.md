
<h1>ArtPicker</h1>
<br>
<p> <b>The Mars project is a robot guide API<b> </p>
 
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![NODE.JS](https://camo.githubusercontent.com/2e5a624f533563052290ad30aed4ecc1092945a458c80cd753d108807e0293b5/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6e6f6465206a732532302d2532333230323332612e7376673f267374796c653d666f722d7468652d626164676526636f6c6f723d333339393333266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d666666666666)![EXPRESS](https://camo.githubusercontent.com/56960eb8a4e655c887ee533f3d6b29ad57255c69a3e07b0455f29af3ad4947fd/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f457870726573732532302d2532333230323332612e7376673f267374796c653d666f722d7468652d626164676526636f6c6f723d303030303030266c6f676f3d45787072657373266c6f676f436f6c6f723d666666666666)
 
 </div>
 
 ## INSTALLATION
 
 ```
# Clone this repository
$ git clone https://github.com/JeffM4r/ArtPicker-frontend.git

# Go into the repository
$ cd ArtPicker-backend/

# Install dependencies
$ npm install
  
# Create .env file
use .env.example as a guide
(is needed a Cloudinary account, setup "upload preset" creating a new one called "artPicker" and a Postgres database)

# Setup Prisma
$ npx prisma migrate dev
  
 ```
 
 ## USAGE
  
 ```
 # Run the app
 $ npm run dev
 ```
 
 POST ```auth/signup```<br>
 
 Need to receive through the body a parameter ```userName```, ```email```, ```password``` and ```image``` in base64 <br>
 
 ```
 {
  userName:"testMan",
  email: "test@outlook.com",
  password: "Test123456",
  image:"data:image/jpeg;base64,/9j/4..." 
 }
 ```
 
 POST ```auth/signin```<br>
 
 Need to receive through the body a parameter ```email``` and ```password```<br>
 
 ```
 {
  email: "test@outlook.com",
  password: "Test123456"
 }
 ```
  
 GET ```auth/user```<br>
 
 Need to receive through the headers a parameter ```Authorization```<br>
 
 ```
 Header
 Authorization: "Bearer (accessToken...)" 
 ```
  
 POST ```auth/token```<br>
 
 Need to receive through the headers a parameter ```Authorization```<br>
 
 ```
 Header
 Authorization: "Bearer (refreshToken...)"
 ``` 
  
 GET ```posts```<br>
 
 Will receive an array of objects(posts)<br>
  
 GET ```posts/:id```<br>
 
 Will receive an object(post)<br>
  
 POST ```posts```<br>
 
 Need to receive through the headers a parameter ```Authorization```<br>
 and a body with ```title```, ```subtitle``` and ```image```
 
 ```
 Header
 Authorization: "Bearer (accessToken...)" 
 ```
 ```
 {
  title: "name of the art",
  subtitle: "description of the art",
  image:"data:image/jpeg;base64,/9j/4..."
 }
 ```
  
 GET ```comments/:postId```<br>
 
 Will receive an array of objects(comments)<br>
  
 POST ```comments/:postId````<br>
 
 Need to receive through the headers a parameter ```Authorization```<br>
 and a body with ```comment```
 
 ```
 Header
 Authorization: "Bearer (accessToken...)" 
 ```
 ```
 {
  comment: "comment about the art",
 }
 ```
 
