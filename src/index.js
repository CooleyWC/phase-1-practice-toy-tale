let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  //Fetch Andy's Toys
  fetch('http://localhost:3000/toys')
    .then((response)=>response.json())
    .then(function(toyData){
      // console.log(toyData);
      let toyCollection = document.querySelector('#toy-collection');
      toyData.forEach(function(element){
        const toyCard = document.createElement('div');
        toyCard.setAttribute('class', 'card');

        const createHeader = document.createElement('h2');
        createHeader.textContent = element.name;
        toyCard.appendChild(createHeader);

        const createImage = document.createElement('img');
        createImage.setAttribute('src', element.image);
        createImage.setAttribute('class', 'toy-avatar');
        toyCard.appendChild(createImage);

        const createPara = document.createElement('p');
        createPara.textContent=`${element.likes} Likes`;
        toyCard.appendChild(createPara);
       
        const createBtn = document.createElement('button');
        createBtn.setAttribute('class', 'like-btn'); 
        createBtn.id = element.id;
        createBtn.textContent = 'Like';
        toyCard.appendChild(createBtn)
        toyCollection.appendChild(toyCard);

        createBtn.addEventListener('click',(likeEvent)=>{
          console.log('i have been clicked')
          let getId = createBtn.id;
          let newLikes = createPara.textContent.split(' ')[0];
          let updatedLikes = parseInt(newLikes, 10)+1;
          console.log(getId)
          console.log(updatedLikes);
          updateToyLikes(getId, updatedLikes);

        })
      })
      // console.log(toyCollection);
    });
  //provided code
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', event =>{
        event.preventDefault()
        postNewToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
//new code


  function postNewToy(toyData){

  
  const toyInputData = {
    name:toyData.name.value,
    image:toyData.image.value,
    likes:0
  };
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
      body: JSON.stringify(toyInputData)
      })
      .then(response => response.json())
      .then(data => {
        postNewToy(data)
      })
      .catch(error=> console.log("Error", error))
      //post newToy Function
      function postNewToy(toyData){
        let toyCollection = document.querySelector('#toy-collection');
        const toyCard = document.createElement('div');
        toyCard.setAttribute('class', 'card');

        const createHeader = document.createElement('h2');
        createHeader.textContent = toyData.name;
        toyCard.appendChild(createHeader);

        const createImage = document.createElement('img');
        createImage.setAttribute('src', toyData.image);
        createImage.setAttribute('class', 'toy-avatar');
        toyCard.appendChild(createImage);

        const createPara = document.createElement('p');
        createPara.textContent=`${toyData.likes} Likes`;
        toyCard.appendChild(createPara);
       
        const createBtn = document.createElement('button');
        createBtn.setAttribute('class', 'like-btn'); 
        createBtn.id = toyData.id;
        createBtn.textContent = 'Like';
        toyCard.appendChild(createBtn)
        toyCollection.appendChild(toyCard)

        createBtn.addEventListener('click',(likeEvent)=>{
          console.log('i have been clicked')
          let getId = createBtn.id;
          let newLikes = createPara.textContent.split(' ')[0];
          let updatedLikes = parseInt(newLikes, 10)+1;
          console.log(getId)
          console.log(updatedLikes);
          updateToyLikes(getId, updatedLikes);

        })
      }
}
    //send patch
  function updateToyLikes(getId, newLikes){
    const url = `http://localhost:3000/toys/${getId}`;
    const data = {
      likes: newLikes
    };
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response=>response.json())
    .then(updatedToyLikes=>{
      // console.log(updatedToyLikes);
      let likeParas =document.getElementById(getId);
      let prevSibling = likeParas.previousElementSibling;
      // console.log(prevSibling);
      prevSibling.textContent = `${updatedToyLikes.likes} Likes`;
      // console.log(updatedToyLikes.likes)
    })
    .catch(error=>console.log('Error:', error))
  }
});




/* Toy Likes PsuedoCode
- add event listener to like element
- get the toy id
- update like text content based on the click
- submit patch request
- update toy card

*/