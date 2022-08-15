fetch(" http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    
    /*   <section class="items" id="items"> 
<!--           <a href="./product.html?id=42">
                <article>
                        <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
                        <h3 class="productName">Kanap name1</h3>
                        <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
                 </article>
          </a> -->
        </section> */

    const container = document.querySelector("#items") ;

    for (let i = 0; i < data.length; i++) {
      const linkelt = document.createElement("a");

      linkelt.href = "./product.html?id=" + data[i]._id;

      const articleelt = document.createElement("article");

      const imageelt = document.createElement("img");
      imageelt.src = data[i].imageUrl;
      imageelt.alt = data[i].name;

      const h3elt = document.createElement("h3");
      h3elt.classList.add("productName");
      h3elt.textContent = data[i].name;

      const pelt = document.createElement("p");
      pelt.classList.add("productDescription");
      pelt.textContent = data[i].description;

      articleelt.appendChild(imageelt);
      articleelt.appendChild(h3elt);
      articleelt.appendChild(pelt);
      linkelt.appendChild(articleelt);
      container.appendChild(linkelt);

      /* const couleurElement = document.createElement("p");
    couleurElement.innerText = data.colors; 

    const idElement = document.createElement("p");
    idElement.innerText = products._id;

    const nameElement = document.createElement("h2");
    nameElement.innerText = products.name;

    const priceElement = document.createElement("p");
    priceElement.innerText = "Prix : " + products.price +" € ";

    const imageElement = document.createElement("img");
    imageElement.src = products.imageUrl;

    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = products.description ?? "(Aucune description)";

    const altElement = document.createElement("h2");
    altElement.innerText = products.altTxt; */

      /* const sectionitems = document.getElementsByTagName("article");



    sectionitems.appendChild(couleurElement);
    sectionitems.appendChild(idElement);
    sectionitems.appendChild(nameElement);
    sectionitems.appendChild(priceElement);
    sectionitems.appendChild(imageElement);
    sectionitems.appendChild(descriptionElement);
    sectionitems.appendChild(altElement); */
    }
  });
console.log("Hello");
