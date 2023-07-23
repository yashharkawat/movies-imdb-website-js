document.addEventListener('DOMContentLoaded', async (e) => {
    const rating_buttons = document.querySelector('.rating-stars');
    rating_buttons.childNodes.forEach((child)=>{
        child.addEventListener('click',(e)=>{
            const rating=e.target.getAttribute('data-rating');
            add_rating(rating);
            localStorage.setItem('rating',rating);
        })
    })
    const data_request="https://www.omdbapi.com/?apikey=f2261eb2&";

    const id=localStorage.getItem('prompt_id');
    console.log(id);
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
