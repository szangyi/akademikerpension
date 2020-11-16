window.addEventListener('DOMContentLoaded', getData);

const datalink = "http://efcreations.es/t9w1/wp-json/wp/v2/change?_embed";

function getData() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log("URLSearchParams " + window.location);
    const the_change_id = urlParams.get("change_id"); //getting the id from the URL
    console.log(the_change_id);

    //routing in the script
    if (the_change_id) {
        fetch("http://efcreations.es/t9w1/wp-json/wp/v2/change/" + the_change_id + "?_embed")
            .then(res => res.json())
            .then(showChange) //skipping the forEach loop
    } else if (!the_change_id && window.location.pathname == "/singlechange.html") {
        //alert("hello");
        //https://stackoverflow.com/questions/503093/how-do-i-redirect-to-another-webpage
        window.location.replace("index.html");
    } else {
        fetch(datalink)
            .then(res => res.json())
            .then(handleData)
    }
}


/*fetch("http://efcreations.es/t9w1/wp-json/wp/v2/change")
    .then(initial => initial.json())
    .then(handleData);
*/

function handleData(data) {
    console.log(data);
    data.forEach(showChange);
}

function showChange(change) {
    console.log(change)
    const template = document.querySelector("template").content;
    const copy = template.cloneNode(true);
    console.log(change._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url)

    copy.querySelector(".title").textContent = change.title.rendered;
    copy.querySelector(".shortdescription").textContent = change.short_description;
    //copy.querySelector(".product_image").src = change._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
    //copy.querySelector('article').style.backgroundImage = "url('https://it-studerende.dk/test/student.png')";
    copy.querySelector('article').style.backgroundImage = change._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;

    /*copy.querySelector(".content").innerHTML = change.content.rendered;*/


    const a = copy.querySelector('a');
    if (a) {
        a.href += change.id;
    }


    const divChangeLongDescription = copy.querySelector('.longdescription');
    if (divChangeLongDescription) {
        divChangeLongDescription.innerHTML = change.content.rendered;
    }

    document.querySelector("main").appendChild(copy);
}
