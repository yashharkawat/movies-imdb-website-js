const api_key="f2261eb2";
const data_request="https://www.omdbapi.com/?apikey=f2261eb2&";
const poster_request="https://img.omdbapi.com/?apikey=f2261eb2&";

let page=1;
let search_text='harry';
let total_results=0;
async function get_data(search_text,index){
    const url=`${data_request}s=${search_text}&page=${index}`;
    console.log(url);
    const request=await fetch(url);
    //console.log(url);
    const data=await request.json();
    total_results=data.totalResults;
    //console.log(data.totalResults);
    const movies=data.Search;

    
    return movies;
    //console.log(movies);
}

document.addEventListener('DOMContentLoaded',()=>{
    const search_button=document.querySelector('.search_button');
    search_button.addEventListener('click',async (e)=>{
        //console.log('clicked');
        const search=document.querySelector('.search');
        const search_string=search.value;
        //console.log(search);
        search.value=null;
        const movies=await get_data(search_string,1);
        display_movies(movies);
        search_text=search_string;
        //=get_data(se)
        //get_data(search_string);
    })
    document.addEventListener('keypress',async (e)=>{
        if(e.key==='Enter'){
            const search=document.querySelector('.search');
            const search_string=search.value;
            if(search_string!==''){
                search.value=null;
                get_data(search_string);
                const movies=await get_data(search_string,1);
                display_movies(movies);
                search_text=search_string;
                //get_data(search_string);
            }
        }
    })
    
    function display_movies(movies){
        page_navigation(Math.ceil(total_results/10),page);
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
    const previous=document.querySelector('.previous');
    const next=document.querySelector('.next');

    previous.addEventListener('click',async (e)=>{
       
        if(page>1){
            page--;
            const movies=await get_data(search_text,page);
            display_movies(movies);
        }
        
    })
    next.addEventListener('click',async (e)=>{
        page++;
        const movies=await get_data(search_text,page);
        display_movies(movies);
    })

    function create_pages(num){
        const element=document.createElement('button');
        element.classList.add('pages');
        element.textContent=num;
        
        element.addEventListener('click',async (e)=>{
            page=e.target.innerText;
            const movies=await get_data(search_text,page);
            display_movies(movies);
        })
        return element;
    }
    
    function page_navigation(total_pages,page_num){
        const page_navigation=document.querySelector('.page_number_navigation');
        page_navigation.innerHTML=null;
        page_num=parseInt(page_num);
        if(total_pages>5){
            const starting_pages=document.createElement('div');    
            const ending_pages=document.createElement('div'); 
            const middle_pages=document.createElement('div'); 
            const text_element=document.createElement('div'); 
            text_element.textContent='...........';
            const text_element2=document.createElement('div'); 
            text_element2.textContent='...........';
            middle_pages.appendChild(text_element2);
            middle_pages.classList.add('middle_pages');
            if(page_num>2&&page_num<total_pages-1){
                starting_pages.appendChild(create_pages(1));
                

                
                for(let i=-1;i<=1;i++){
                    const page=page_num+i;
                    console.log(page);
                    middle_pages.appendChild(create_pages(page));
                }
                middle_pages.appendChild(text_element);
                console.log(middle_pages);
                ending_pages.appendChild(create_pages(total_pages));
            }
            else if(page_num<=2){
                for(let i=1;i<=3;i++){
                    starting_pages.appendChild(create_pages(i));
                }
                middle_pages.appendChild(text_element);
                ending_pages.appendChild(create_pages(total_pages));
            }
            else{
                starting_pages.appendChild(create_pages(1));
                middle_pages.appendChild(text_element);
                for(let i=2;i>=0;i--){
                    const page=total_pages-i;
                    ending_pages.appendChild(create_pages(page));
                }
            }
            //const pages=document.createElement('div');
            page_navigation.append(starting_pages,middle_pages,ending_pages);

        }
        else{
            for(let i=1;i<=total_pages;i++){
                page_navigation.append(create_pages(i));
            }
            
        }
    
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

