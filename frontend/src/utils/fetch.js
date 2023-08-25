
/* ------------------ FETCH APIs defined below for CRUD operations ---------------- */

// GET : Takes in url as only parameter; returns json response of all data in DB
// POST : Takes in url, body, and optional header parameter; returns json response of posted body in DB
// DELETE : Takes in url as only parameter; return json response of success
// UPDATE : Takes in url, body and optional header paramters; returns json response of updated body in DB

export async function getData(url = ""){
   const response = await fetch(url, {
       method: "GET",
       headers: {
           "Content-Type": "application/json",
       }
   });
   const responseJSON = await response.json();
   return responseJSON;
}

export async function postData(url = "", data = {}, header = {}){
   const response = await fetch(url, {
       method: "POST",
       headers: {
           "Content-Type": "application/json",
            ...header,
       },
       body: JSON.stringify(data)
   });
   const responseJSON = await response.json();
   return responseJSON;
}

export async function updateData(url = "", data = {}, header = {}){
   const response = await fetch(url, {
       method: "PUT",
       headers: {
           "Content-Type": "application/json",
            ...header
       },
       body: JSON.stringify(data)
   });
   const responseJSON = await response.json();
   return responseJSON;
}

export async function deleteData(url = "", header = {}){
   const response = await fetch(url, {
       method: "DELETE",
       headers: {
           "Content-Type": "application/json",
            ...header
       }
   });
   const responseJSON = await response.json();
   return responseJSON;
}