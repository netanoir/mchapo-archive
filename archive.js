let orientation = [];
      const orientationWrapper = document.getElementById("orientation-blocks");

      const axiosArena = axios.create({
        baseURL: "https://api.are.na/v2/",
      });

      let loading = document.createElement("div");
      loading.className = "loading";
      loading.innerHTML = 'loading zines...';
      orientationWrapper.appendChild(loading);

      axiosArena.defaults.headers.Authorization = 'Bearer ---' ;
      axiosArena.get("channels/100-days-of-zines?per=300").then(response => {
        console.log(response);
        if (response.data && response.data.contents.length > 1) {
          orientationWrapper.removeChild(loading);
          createOrientation(response.data.contents);
        } else {

        }
      });

      function createOrientation(orientationData) {
        for (let i=0; i<orientationData.length; i++) {
          // block
          let block = document.createElement("div");
          block.className = "block";

          if (orientationData[i].source) {
            block = document.createElement("a");
            block.className = "block";
            block.href = orientationData[i].source.url;
            block.target = "_blank";
          }

          if (orientationData[i].class === "Channel") {
            block = document.createElement("a");
            block.className = "channel";
            block.href = `https://are.na/${orientationData[i].user.slug}/${orientationData[i].slug}`;
            block.target = "_blank";
          }

          //  image
          if (orientationData[i].image && orientationData[i].image) {
            const image = document.createElement("img");
            image.className = "image";
            image.src = orientationData[i].image.square.url;
            block.appendChild(image);
          }
          // title
          if (orientationData[i].title) {
            const title = document.createElement("div");
            title.className = "title";
            title.innerHTML = orientationData[i].title;
            block.appendChild(title);
          }

          // text
          if (orientationData[i].class === "Text") {
            const text = document.createElement("div");
            text.className = "text";
            text.innerHTML = orientationData[i].content;
            block.appendChild(text);
          }

          orientationWrapper.appendChild(block);
        }
      }

      let coll = document.getElementsByClassName("collapse");
let i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

let links = document.links;

for (let i = 0, linksLength = links.length; i < linksLength; i += 1) {
   if (links[i].hostname != window.location.hostname) {
       links[i].target = '_blank';
   } 
}