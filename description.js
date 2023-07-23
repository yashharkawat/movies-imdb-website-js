document.addEventListener('DOMContentLoaded',()=>{
    console.log("hi");
    const id=localStorage.getItem('id');
    description(id);
})
const data_request="https://www.omdbapi.com/?apikey=f2261eb2&";

async function description(id){

   // console.log(id);
    const url=`${data_request}i=${id}`;
    //console.log(url);
    const request=await fetch(url);
    //console.log(url);
    const data=await request.json();
    console.log(data);
    
    const name_date=document.createElement('div');
    const rating=document.createElement('div');

    const title=document.createElement('h2');
    title.innerText=await data.Title;

    //console.log(title.innerText);

    const time=document.createElement('div');
    time.classList.add('time');
    const year=document.createElement('div');
    year.innerText=await data.DVD.split(' ')[2];

    const rated=document.createElement('div');
    rated.innerText=await data.Rated;

    const duration=document.createElement('div');
    duration.innerText=await data.Runtime;

    time.append(year,rated,duration);
    name_date.append(title,time);

    const imdb_rating=document.createElement('div');
    imdb_rating.classList.add('imdb_rating');
    const imdb_rating_text=document.createElement('div');
    const imdb_rating_value=document.createElement('div');
    imdb_rating_value.innerText=await data.imdbRating;
    imdb_rating_text.innerText="IMDB Rating";
    
    imdb_rating.append(imdb_rating_text,imdb_rating_value);

    const your_rating=document.createElement('div');
    your_rating.classList.add('your_rating');
    const your_rating_text=document.createElement('div');
    const your_rating_value=document.createElement('div');
    your_rating_value.innerText=0;
    your_rating_text.innerText="Your Rating";
    
    your_rating.append(your_rating_text,your_rating_value);
    

    rating.append(imdb_rating,your_rating);
    rating.classList.add('rating');
    //console.log(document);
    //window.location.href = 'description.html';
    
    document.addEventListener('DOMContentLoaded',()=>{
        console.log(hi);
    })
    const name=document.querySelector('.name');
    name.append(name_date,rating);
    //console.log('hello');

    const image=document.createElement('div');
    image.classList.add('image');
    const img=document.createElement('img');
    img.setAttribute('src',data.Poster);
    image.append(img);
    const details=document.createElement('div');
    details.classList.add('details');
    let txt='Movie Description:\n';
    txt+=data.Plot;
    details.textContent=txt;

    const Genre=document.createElement('div');

    txt=`Genre: ${data.Genre}`;
    
    Genre.textContent=txt;
    Genre.style.marginTop='30px';
    details.append(Genre);

    


    const Awards=document.createElement('div');

    txt=`Awards: ${data.Awards}`;

    Awards.textContent=txt;
    Awards.style.marginTop='30px';
    details.append(Awards);

    const description=document.querySelector('.description');
    description.append(image,details);

    const actors=document.createElement('div');

    txt=`Actors: ${data.Actors}`;
    
    actors.textContent=txt;
    actors.style.marginTop='30px';
    details.append(actors);

    const Writer=document.createElement('div');

    txt=`Writer: ${data.Writer}`;

    Writer.textContent=txt;
    Writer.style.marginTop='30px';
    details.append(Writer);

    
}
document.addEventListener('DOMContentLoaded',()=>{
    console.log(hi);
})