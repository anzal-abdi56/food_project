//function for posting
function postOrganization(){
   const form = document.getElementById("postForm") 
   const name = document.getElementById("name").value
   const image = document.getElementById("image").value
   const mission = document.getElementById("mission").value


   form.addEventListener("submit",(e)=>{
    e.preventDefault()

    fetch("http://localhost:3000/donations",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            name:name,
            image:image,
            mission:mission
        })
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        alert("Organization has been added.")
    })
    .catch(error=>console.log(error))
   })

}

// function to get
function getOrganizations(){
    fetch("http://localhost:3000/donations")
    .then(res=>res.json())
    .then(data=>displayOrganizations(data))
}

//function to display organizations
function displayOrganizations(organizations){
    let body = document.querySelector("tbody")
    organizations.forEach(organization=>{
        const row = document.createElement("tr")
        row.innerHTML = `
           <th scope='row'><img src='${organization.image}' alt='picture'</th>
           <td>${organization.name}</td>
           <td>${organization.mission}</td>
           <td><button class="btn btn-info" id="view_${organization.id}">View Organization</button></td>
           <td><button class="btn btn-success" id="update_${organization.id}">Update Organization</button></td>
           <td><button class="btn btn-danger" id="delete_${organization.id}">Delete Organization</button></td>
        `
        body.appendChild(row)
        
        let id =organization.id
        //view button
        const viewButton = document.getElementById(`view_${organization.id}`)
        viewButton.addEventListener("click",()=>getOneOrganization(id))

        //update button
        const updateButton = document.getElementById(`update_${organization.id}`)
        updateButton.addEventListener("click",()=>{
            //show form
            updateForm.style.display="block"
            //Add values

        const nameInput = document.getElementById("updateName") 
        const imageInput = document.getElementById("updateImage") 
        const missionInput = document.getElementById("updateMission") 

        nameInput.value = organization.name
        imageInput.value = organization.image
        missionInput.value = organization.mission

        //Add event listener

        const updateButton = document.getElementById("updateButton")
        updateButton.addEventListener("click", ()=>updateOrganization(id))

        })
       
       /*Delete button*/
       const deleteButton = document.getElementById(`delete_${organization.id}`)
       deleteButton.addEventListener("click",()=>deleteOrganization(id))
    })
}
getOrganizations()

function getOneOrganization(id){
    fetch(`http://localhost:3000/donations/${id}`)
    .then(response=>response.json())
    .then(data=>{
        const container = document.getElementById("organizationsDetails")
        container.className="card"
        container.innerHTML=`  
  <img src="${data.image}" class="card-img-top" alt="picture">
  <div class="card-body">
    <h5 class="card-title">${data.name}</h5>
    <h6 class="card.text">${data.mission}</h6>
    <a href="#" class="btn btn-primary" id="backButton">Back</a>
  </div>

        ` 
         //back button
     const backButton = document.getElementById("backButton")
     backButton.addEventListener("click",()=>{
     const detailsCard = document.getElementById("organizationsDetails")
     detailsCard.style.display="none"

     detailsContainer.style.display="block"
    })
    })

    //hide table
    const detailsContainer = document.getElementById("organizationsContainer")
    detailsContainer.style.display="none"
   
}
//hide update form
const updateForm = document.getElementById("updateForm")
updateForm.style.display="none"

function updateOrganization(id){
    updateForm.addEventListener("submit",(e)=>{
        e.preventDefault()
    })
        const nameInput = document.getElementById("updateName").value 
        const imageInput = document.getElementById("updateImage").value
        const missionInput = document.getElementById("updateMission").value 
        fetch(`http://localhost:3000/donations/${id}`,{
            method:"PATCH",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                name:nameInput,
                image:imageInput,
                mission:missionInput,
            })
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
}

function deleteOrganization(id){
    fetch(`http://localhost:3000/donations/${id}`,{
        method:"DELETE"
    })
    .then(response=>response.json)
    .then(data=>{
        console.log(data)
        alert("Organization has been deleted")
    })
        
    .catch(error=>console.log(error))
}
function searchOrganization(){
    const form = document.getElementById("searchForm")
    const input = document.getElementById("organization").value

    form.addEventListener("submit",(e)=>{
        e.preventDefault()

        fetch(`http://localhost:3000/donations?organization=${input}`)
        .then(res=>res.json())
        .then(data=>console.log(data))
    })
}
const searchButton = document.getElementById("searchButton")
searchButton.addEventListener("click", searchOrganization)


