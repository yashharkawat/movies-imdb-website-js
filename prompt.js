let rating=0;
document.addEventListener('DOMContentLoaded', async (e) => {
    const rating_buttons = document.querySelector('.rating-stars');
    rating_buttons.childNodes.forEach((child)=>{
        child.addEventListener('click',(e)=>{
            rating=e.target.getAttribute('data-rating');
            add_rating(rating);
            localStorage.setItem('rating',rating);
        })
    })
    const data_request="https://www.omdbapi.com/?apikey=f2261eb2&";

    const id=localStorage.getItem('prompt_id');
    //console.log(id);
    const url=`${data_request}i=${id}`;
    //console.log(url);
    const request=await fetch(url);
    //console.log(url);
    const data=await request.json();
    console.log(data);
    const title=document.querySelector('.movie_name');
    title.textContent=await data.Title;
    const rate=document.querySelector('.submit-rating');
    rate.addEventListener('click',(e)=>{
    window.location.href='index.html';
    const new_movie={Poster:data.Poster,Title:data.Title,Year:data.DVD.split(' ')[2],imdbID:data.imdbID,Rating:rating};
    //let index=localStorage.getItem('index');
    let movies=JSON.parse(localStorage.getItem('movies'));

    let k=0;
    movies.forEach((movie)=>{
        if(movie.imdbID==new_movie.imdbID){
            movie.Rating=new_movie.Rating;
            k++;
            //console.log('hi');
        }
    })
    if(k==0){
        movies.forEach(movie=>{
            if("Rating" in movie){
            }
            else if(k==0){
                
                movie.Rating=new_movie.Rating;
                movie.Poster=new_movie.Poster;
                movie.imdbID=new_movie.imdbID;
                movie.Year=new_movie.Year;
                movie.Title=new_movie.Title;
                k++;
                //console.log('by');
            }
        })
    }
    if(k==0){
        movies[0]=new_movie;
        //console.log('haha');
    }
    localStorage.setItem('movies',JSON.stringify(movies));
})

    

})
function add_rating(rating){
    const svg_buttons = document.querySelectorAll('.svg');
    svg_buttons.forEach((button)=>{
        //console.log(button.getAttribute('data-rating'));
        const index=button.getAttribute('data-rating');
        if(index<=rating){
            //console.log(child);
            //button.classList.add('color');
            button.firstElementChild.setAttribute('fill','yellow');
        }
        else{
            button.firstElementChild.setAttribute('fill','none');
        }
    })
}
