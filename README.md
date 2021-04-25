# FileShare-API
This is a RESTful api which you can use to build a file sharing web app.

**NOTE** : Before using the api, you'll need to configure some environment varibles. Refer to the *.envexample* file inside for help.

API endpoints:

**TO UPLOAD FILE:**
- Request :
  - ENDPOINT : POST to 'APP_BASE_URI/api/upload'
  - Req payload : multipart/formdata with filename 'myfile'
 - Response :
   - content-type : 'json'
   - body : {uuid, downloadPageLink} 

**Link to Download page:**
- Request :
  - ENDPOINT : GET to 'FRONTEND_BASE_URI/api/download/:uuid'
- Response :
  - content-type : 'json'
  - body : [{file}] //Array of File objects (*refer to file model to review the file schema*)
 
 **File download:**
 - Request :
   - ENDPOINT : GET to 'APP_BASE_URI/api/download/:uuid/:filename'
 
 **Removing and unlinking a file:**
 - Request :
   - Endpoint : GET to 'APP_BASE_URL/api/delete/:uuid/:filename 
 - Response :
   - content-type : 'json'
   - body : [{file}] //Array of File objects(now updated)
   



