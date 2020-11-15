window.addEventListener('DOMContentLoaded', getData);

const datalink = "http://efcreations.es/t9w1/wp-json/wp/v2/change?_embed";

function getData() {
    fetch(datalink)
        .then(res => res.json())
        .then(handleData);
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
    const template = document.querySelector("template#productTemplate").content;
    const copy = template.cloneNode(true);
    //console.log(change._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)

    copy.querySelector(".title").textContent = change.title.rendered;
    copy.querySelector(".shortdescription").textContent = change.short_description;
    //copy.querySelector(".product_image").src = change._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;

    /*copy.querySelector(".content").innerHTML = change.content.rendered;*/


    const a = copy.querySelector('a');
    if (a) {
        a.href += change.id;
    }


    document.querySelector("main").appendChild(copy);
}
