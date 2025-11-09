var settingsMenu = document.querySelector(".setting-menu");
var darkBtn = document.getElementById("dark-btn");

function settingsMenuToggle(){
    settingsMenu.classList.toggle("setting-menu-height");
}
function darkMode(){
    darkBtn.classList.toggle("dark-btn-on");
    document.body.classList.toggle("dark-theme");

    if(localStorage.getItem("theme") == "light"){
        localStorage.setItem("theme", "dark")
    }
    else{
        localStorage.setItem("theme", "light");
    }
}

if(localStorage.getItem("theme") == "light"){
    darkBtn.classList.remove("dark-btn-on");
    document.body.classList.remove("dark-theme");
}
else if(localStorage.getItem("theme") == "dark"){
    darkBtn.classList.add("dark-btn-on");
    document.body.classList.add("dark-theme");
}
else{
    localStorage.setItem("theme", "light");
}

//My funcion de Stories

const myStories = [
    {
        id: 0,
        author: 'Crear Historia',
        profileUrl: "images/upload.png",
        storiesUrl: "linear-gradient(transparent, rgba(0,0,0,0.5)), url('images/StoryPic.png')"
    },
    {
        id: 1,
        author: 'Pam',
        profileUrl: 'images/jpg-red/Pam B/PamPerfil.png',
        storiesUrl: 'linear-gradient(transparent, rgba(0,0,0,0.5)), url("images/jpg-red/Pam B/PamStory.png")',
        fullStory: 'images/jpg-red/Pam B/PamStory.png',
    },
    {
        id: 2,
        author: 'Tony',
        profileUrl: 'images/jpg-red/Tony S/TonyPerfil.png',
        storiesUrl: "linear-gradient(transparent, rgba(0,0,0,0.5)), url('images/jpg-red/Tony S/TonyStory.png')",
        fullStory: 'images/jpg-red/Tony S/TonyStory.png',
    },
    {
        id: 3,
        author: 'Anakin',
        profileUrl: 'images/jpg-red/Anakin/AnakinPerfil.png',
        storiesUrl: "linear-gradient(transparent, rgba(0,0,0,0.5)), url('images/jpg-red/Anakin/AnakinStory.png')",
        fullStory: 'images/jpg-red/Anakin/AnakinStory.png',
    },
    {
        id: 4,
        author: 'Jim',
        profileUrl: 'images/jpg-red/Jim/jimhalpert_1.jpg',
        storiesUrl: "linear-gradient(transparent, rgba(0,0,0,0.5)), url('images/jpg-red/Jim/JimStory.jpg')",
        fullStory: 'images/jpg-red/Jim/JimStory.jpg',
    },
    {
        id: 5,
        author: 'Emmet',
        profileUrl: 'images/jpg-red/Emmet/EmmPerfil.png',
        storiesUrl: "linear-gradient(transparent, rgba(0,0,0,0.5)), url('images/jpg-red/Emmet/EmmStory.png')",
        fullStory: 'images/jpg-red/Emmet/EmmStory.png',
    },
    {
        id: 6,
        author: 'Happy',
        profileUrl: 'images/jpg-red/Happy H/HappPerfil.png',
        storiesUrl: "linear-gradient(transparent, rgba(0,0,0,0.5)), url('images/jpg-red/Happy H/HappyStory.png')",
        fullStory: 'images/jpg-red/Happy H/HappyStory.png',
    },
    {
        id: 7,
        author: 'Marty',
        profileUrl: 'images/jpg-red/Marty/McflyPerfil.png',
        storiesUrl: "linear-gradient(transparent, rgba(0,0,0,0.5)), url('images/jpg-red/Marty/MartyStory.png')",
        fullStory: 'images/jpg-red/Marty/MartyStory.png'
    },
    {
        id: 8,
        author: 'Michael',
        profileUrl: 'images/jpg-red/Michael/MichPerfilv1.png',
        storiesUrl: "linear-gradient(transparent, rgba(0,0,0,0.5)), url('images/jpg-red/Michael/MichStory.png')",
        fullStory: 'images/jpg-red/Michael/MichStory.png',
    },
    {
        id: 9,
        author: 'Padme',
        profileUrl: 'images/jpg-red/Padme/PadmPerfil.png',
        storiesUrl: "linear-gradient(transparent, rgba(0,0,0,0.5)), url('images/jpg-red/Padme/PadmStory.png')",
        fullStory: 'images/jpg-red/Padme/PadmStory.png',
    }
];

const storiesContainer = document.querySelector('.story-gallery');
let actuallyActive = 0;

const createElement = () => {
    myStories.forEach((s, i) => {
        const story = document.createElement('div');
        const fragment = document.createDocumentFragment();
        story.classList.add('story');
         if (s.id === 0){
            story.classList.add('story1');
        }
        story.style.backgroundImage = s.storiesUrl
        const img = document.createElement('img');
        img.src = s.profileUrl;
        const author = document.createElement('p');
        author.textContent = s.author

        story.appendChild(img);
        story.appendChild(author);

        fragment.appendChild(story);

        storiesContainer.appendChild(fragment);

        if(s.id !== 0) {
        story.addEventListener('click', () => {
             showFullView(i);
         })}
    })
};

createElement();

// Stories fullview

const storiesFullView = document.querySelector('.stories-full-view')
const closeBtn = document.querySelector('.close-btn')
const storyImageFull = document.querySelector('.stories-full-view .storyy img')
const storyAuthorFull = document.querySelector('.stories-full-view .storyy .author')

const showFullView = (index) => {
    actuallyActive = index;
    updateFullView();
    storiesFullView.classList.add('active');
}

closeBtn.addEventListener('click', () => {
    storiesFullView.classList.remove('active');
});

const updateFullView = () => {
    const story = myStories[actuallyActive];
    if (!story) return;

    storyImageFull.classList.add('fading');

    const onTransitionEnd = (e) => {
        if(e.target !== storyImageFull || e.propertyName !== 'opacity') return;
        storyImageFull.removeEventListener('transitionend', onTransitionEnd);
        storyImageFull.src = myStories[actuallyActive].fullStory;
        storyAuthorFull.textContent = myStories[actuallyActive].author;

        const onImgLoad = () => {
            storyImageFull.removeEventListener('load', onImgLoad);
            requestAnimationFrame(() => {
                storyImageFull.classList.remove('fading');
            })
        }
        storyImageFull.addEventListener('transitionend', onTransitionEnd)
        if(storyImageFull.complete){
            setTimeout(() =>{
                storyImageFull.classList.remove('fading');
            }, 0);
        }
    };

    void storyImageFull.offsetWidth;

    storyImageFull.classList.add('fading');

      const fallback = setTimeout(() => {
        storyImageFull.removeEventListener('transitionend', onTransitionEnd);

    storyImageFull.src = story.fullStory || '';
    storyAuthorFull.textContent = story.author || '';
    storyImageFull.classList.remove('fading');

    clearTimeout(fallback);
  }, 200);
}

// Left and Right Story

const nextBtn = document.querySelector('.stories-container .next-btn');
const previousBtn = document.querySelector('.stories-container .previous-btn');
const storiesContent = document.querySelector('.stories-container .story-gallery');

let ticking = false

nextBtn.addEventListener("click", () => {
    storiesContent.scrollBy({left: 300, behavior: 'smooth'});
})
previousBtn.addEventListener("click", () => {
    storiesContent.scrollBy({left: -300, behavior: 'smooth'});
})

storiesContent.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { 
    if(storiesContent.scrollLeft <= 24) {
        previousBtn.classList.remove("active");
    }else{
        previousBtn.classList.add('active');
    }

    const maxScrollValue = storiesContent.scrollWidth - storiesContent.clientWidth - 24;

    if(storiesContent.scrollLeft >= maxScrollValue){
        nextBtn.classList.remove('active');
    } else{
        nextBtn.classList.add('active');
    }

    ticking = false;
  });
});


const nextBtnFull = document.querySelector('.stories-full-view .next-btn');
const previousBtnFull = document.querySelector('.stories-full-view .previous-btn') 

nextBtnFull.addEventListener('click', () => {
    if (actuallyActive >= myStories.length - 1) return
    actuallyActive++;
    updateFullView()
    if (actuallyActive >= myStories.length){
        nextBtn.classList.remove('active');
    } else{
        nextBtn.classList.add('active');
    }
});

previousBtnFull.addEventListener('click', () => {
    if (actuallyActive <=  1) return
    actuallyActive--;
    updateFullView()
})