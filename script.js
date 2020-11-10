//function init() {
//    fetch("http://a-day.dk/T9/wp-json/wp/v2/posts").then(r => r.json()).then(function (data) {
//        categoriesReceived(data)
//    })
//}
//
//init();





fetch("http://www.a-day.dk/module-09/recreate/wp-json/wp/v2/property?_embed").then(r => r.json()).then(handleData)


function handleData(posts) {
    //    console.log(posts);
    posts.forEach(showPost)
}

function showPost(post) {
    console.log(post);
    const template = document.querySelector("template").content;

    const copy = template.cloneNode(true);
//    const img = copy.querySelector(".postimage");
//
//    img.setAttribute("src", `https://www.a-day.dk/module-09/recreate/wp-json/wp/v2/property?_embedded["wp:featuredmedia"][0].link`);

    copy.querySelector(".postimage").outerHTML = post._embedded["wp:featuredmedia"][0].link;
    //could not fix image :(


    copy.querySelector("h2").textContent = post.title.rendered;
    copy.querySelector(".bed").textContent = post.bed;
    copy.querySelector(".bath").textContent = post.bath;
    copy.querySelector(".sqfeet").textContent = post.sq_feet;

    document.querySelector("main").appendChild(copy);
}
