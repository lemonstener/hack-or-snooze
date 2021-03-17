// This script generates the main portion of the page

const userField = document.querySelectorAll('.user-field');
const storyList = document.querySelector('#stories-list');


// User field refers to all the nav buttons that the current user has access to
// and only appear when logged in
for (let item of userField) {
    item.classList.toggle('hidden');
}


// getStories pulls the last 25 stories added to the Hack or Snooze API
async function getStories() {
    document.querySelector('#profile-section').classList.add('hidden');
    document.querySelector('#submit').classList.add('hidden');
    const res = await axios.get("https://hack-or-snooze-v3.herokuapp.com/stories");
    let counter = 1;
    let favorites = [];
    if (checkForLoggedInUser()) {
        const res = await getUser();
        favorites = res.favorites;
    }
    storyList.innerHTML = '';
    for (let story of res.data.stories) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.setAttribute('id', `${story.storyId}`)
        li.innerHTML =
            `<i class="far fa-star"></i>
            ${counter}.
            <a href=${story.url}>${story.title}</a> <small>(${story.url})</small> by <b>${story.author}</b>
            <p>posted by <b>${story.username}</b></p>`;
        storyList.append(li);
        counter++;
        if (favorites.length > 0) {
            for (let story of favorites) {
                if (story.storyId === li.id) {
                    li.children[0].classList = 'fas fa-star checked'
                }
            }
        }
    }
    if (checkForLoggedInUser()) {
        const stars = document.querySelectorAll('.fa-star');
        for (let star of stars) {
            star.addEventListener('click', async function () {
                await addRemoveFavorite(star);
            });
        }
    }
}

getStories();

function checkForLoggedInUser() {
    if (localStorage.length !== 0) {
        return true;
    }
}

populateNav();





