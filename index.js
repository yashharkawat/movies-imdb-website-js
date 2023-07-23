const api_key="f2261eb2";
const data_request="https://www.omdbapi.com/?apikey=f2261eb2&";
const poster_request="https://img.omdbapi.com/?apikey=f2261eb2&";
//let movies=[];

// async function get_data(search_text){
//     const url=`${data_request}s=${search_text}`;
//     const request=await fetch(url);
//     //console.log(url);
//     const data=await request.json();
//     //movies=data.Search;
//     //console.log(movies);
// }

async function get_poster(search_text){
    const url=`${data_request}s=${search_text}`;
    const request=await fetch(url);
    //console.log(url);
    const data=await request.json();
    let movies=data.Search;
    await movies.forEach(async (movie)=>{
        const url=`${poster_request}s=${search_text}&i=${movie.imdbID}`;
        const request=await fetch(url);
        const data=request.url;
        //console.log(request.json());
        movie.image_url=data;
        //console.log(request_url);
        //console.log(data);
    })
    //console.log(movies);
    return movies;
  //console.log(data);
}
//get_poster('harry');
//get_data("harry");
document.addEventListener('DOMContentLoaded',()=>{
    const search_button=document.querySelector('.search_button');
    search_button.addEventListener('click',async (e)=>{
        //console.log('clicked');
        const search=document.querySelector('.search');
        const search_string=search.value;
        //console.log(search);
        search.value=null;
        const movies=await get_poster(search_string);
        display_movies(movies);
        //=get_poster(se)
        //get_data(search_string);
    })
    document.addEventListener('keypress',async (e)=>{
        if(e.key==='Enter'){
            const search=document.querySelector('.search');
            const search_string=search.value;
            if(search_string!==''){
                search.value=null;
                get_poster(search_string);
                const movies=await get_poster(search_string);
                display_movies(movies);
                //get_data(search_string);
            }
        }
    })
    
    function display_movies(movies){
       // console.log(movies);
       const container=document.querySelector('.container1');
       container.innerHTML=null;
       const container2=document.querySelector('.container2');
       container2.innerHTML=null;
        
        movies.forEach((movie,index)=>{
            //console.log(movie);
            const movie_element=document.createElement('div');
            const movie_poster=document.createElement('img');
            movie_poster.setAttribute('src',movie.Poster);
            //console.log(movie.image_url);

            movie_poster.classList.add('movie_poster');

            const movie_description=document.createElement('div');
            movie_description.classList.add('movie_description');

            const movie_name=document.createElement('div');
            movie_name.innerText=movie.Title;
            movie_name.classList.add('movie_name');

            const svg_string = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="ipc-icon ipc-icon--star-border-inline" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M22.724 8.217l-6.786-.587-2.65-6.22c-.477-1.133-2.103-1.133-2.58 0l-2.65 6.234-6.772.573c-1.234.098-1.739 1.636-.8 2.446l5.146 4.446-1.542 6.598c-.28 1.202 1.023 2.153 2.09 1.510l5.818-3.495 5.819 3.509c1.065.643 2.37-.308 2.089-1.51l-1.542-6.612 5.145-4.446c.94-.810.45-2.348-.785-2.446zm-10.726 8.890l-5.272 3.174 1.402-5.983-4.655-4.026 6.141-.531 2.384-5.634 2.398 5.648 6.14.531-4.654 4.026 1.402 5.983-5.286-3.187z"></path></svg>';
            const parser = new DOMParser();
            const svg_DOM = parser.parseFromString(svg_string, 'image/svg+xml');
            const svg_element = svg_DOM.documentElement;
            svg_element.classList.add('movie_rating');

            movie_description.append(movie_name,svg_element);
            movie_element.append(movie_poster,movie_description);
            movie_element.classList.add('movie');

            const container_class=`.container${Math.floor(index/5)+1}`;
            //console.log(container_class);
            const container=document.querySelector(container_class);
            container.appendChild(movie_element);
        })
    }

})

// Poster
// : 
// "https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg"
// Title
// : 
// "Harry Potter and the Deathly Hallows: Part 2"
// Type
// : 
// "movie"
// Year
// : 
// "2011"
// image_url
// : 
// "https://img.omdbapi.com/?apikey=f2261eb2&s=harry&i=tt1201607"
// imdbID
// : 
// "tt1201607"
// [[Prototype]]
// : 
// Object

