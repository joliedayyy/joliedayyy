// Create a variable for the API endpoint. In this example, we're accessing Xano's API
let xanoUrl = new URL('https://designmanager.loominous.com/items/Designs');

// Define a function (set of operations) to get restaurant information.
// This will use the GET request on the URL endpoint
function getDesigns() {

    // Create a request variable and assign a new XMLHttpRequest object to it.
    // XMLHttpRequest is the standard way you access an API in plain Javascript.
    let request = new XMLHttpRequest();

    // Define a function (set of operations) to get restaurant information.
    // Creates a variable that will take the URL from above and makes sure it displays as a string. 
    // We then add the word 'category" so the API endpoint becomes https://designmanager.loominous.com/items/Designs
    let url = xanoUrl.toString()


    // Remember the 'request' was defined above as the standard way to access an API in Javascript.
    // GET is the verb we're using to GET data from Xano
    request.open('GET', url, true)

    // When the 'request' or API request loads, do the following...
    request.onload = function() {

        // Store what we get back from the Xano API as a variable called 'data' and converts it to a javascript object
        let data = JSON.parse(this.response)

        // Status 200 = Success. Status 400 = Problem.  This says if it's successful and no problems, then execute 
        if (request.status >= 200 && request.status < 400) {

            // Map a variable called cardContainer to the Webflow element called "Cards-Container"
            const cardContainer = document.getElementById("Cards-Container")

            // This is called a For Loop. This goes through each object being passed back from the Xano API and does something.
            // Specifically, it says "For every element in Data (response from API), call each individual item restaurant"
            data.data.forEach(design => {

                // For each category, create a div called card and style with the "sample-card" class
                const style = document.getElementById('samplestyle')
                // Copy the card and it's style
                const card = style.cloneNode(true)

                card.setAttribute('id', '');
                card.style.display = 'block';

                // For each restaurant, Create an image and use the restaurant image coming from the API
                const img = card.getElementsByTagName('IMG')[0]
                img.src = design.main_photo_url + "?tpl=big:box"; // using Xano's template engine to re-size the pictures down and make them a box

                // For each restaurant, create an h3 and set the text content to the restaurant's title
                const h3 = card.getElementsByTagName('H3')[0]
                h3.textContent = design.Name;

                // For each restaurant, create an paragraph and set the text content to the restaurant's description
                const p = card.getElementsByTagName('P')[0]
                p.textContent = `${design.Notes.substring(0, 240)}` // Limit to 240 chars

card.appendChild(img)
card.appendChild(h3)
card.appendChild(p);

                // Place the card into the div "Cards-Container" 

                cardContainer.appendChild(card);
            })
        }
    }

    // Send Designs request to API
    request.send();
}



// This fires all of the defined functions when the document is "ready" or loaded
(function() {
    getDesigns();
})();
