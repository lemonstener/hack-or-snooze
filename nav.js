// This script has to do with the navbar and how different buttons bahave

const logo = document.querySelector('#logo');
const loginSignUpLink = document.querySelector('#login-signup-link');
const navLinks = document.querySelectorAll('.user-field');
const loginForm = document.querySelector('#login-signup-form');

// Login form variables
const loginBTN = document.querySelector('#login-btn');

// Signup form variables
const signUpBTN = document.querySelector('#signup-btn');
const createName = document.querySelector('#create-name');
const createUser = document.querySelector('#create-user');
const createPass = document.querySelector('#create-pass');

// Right side of nav
const logOutLink = document.querySelector('#logout');
const profileLink = document.querySelector('#profile');

// Left side of nav
const submitLink = document.querySelector('#submit-link');
const favoritesLink = document.querySelector('#favorites-link');
const myStoriesLink = document.querySelector('#my-stories-link');

// Submit and profile sections
const submit = document.querySelector('#submit');
const submitButton = document.querySelector('#submit-button');
const profileSection = document.querySelector('#profile-section');


logo.addEventListener('click', async function () {
    storyList.classList.remove('hidden');
    loginForm.classList.add('hidden');
    current = '';
    await getStories();
})


// Submit
submitLink.addEventListener('click', function () {
    submit.classList.remove('hidden');
    profileSection.classList.add('hidden');
    storyList.classList.add('hidden');
})


submitButton.addEventListener('click', async function (e) {
    const storyTitle = document.querySelector('#submit-title');
    const storyAuthor = document.querySelector('#submit-author');
    const storyURL = document.querySelector('#submit-url');
    e.preventDefault();
    if (storyTitle.value !== '' &&
        storyAuthor.value !== '' &&
        storyURL.value !== '') {
        const storyObj = {
            "token": user.token,
            "story": {
                "title": storyTitle.value,
                "author": storyAuthor.value,
                "url": storyURL.value
            }
        };
        await addStory(storyObj);
    }
    submit.classList.add('hidden');
    storyList.classList.remove('hidden');
    getStories();
    localStorage.setItem('user', JSON.stringify(user));
    storyTitle.value = '';
    storyAuthor.value = '';
    storyURL.value = '';
})



//Favorites
favoritesLink.addEventListener('click', async function () {
    submit.classList.add('hidden');
    profileSection.classList.add('hidden');
    storyList.innerHTML = '';
    const response = await getUser();
    const reversed = response.favorites;
    reversed.reverse()
    for (let story of reversed) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.setAttribute('id', story.storyId)
        li.innerHTML =
            `<i class="fas fa-star checked"></i>
            <a href=${story.url}>${story.title}</a> <small>(${story.url})</small> by <b>${story.author}</b>
                <p>posted by <b>${story.username}</b></p>`;
        storyList.append(li);
    }
    const stars = document.querySelectorAll('.fa-star');
    for (let star of stars) {
        star.addEventListener('click', async function () {
            await addRemoveFavorite(star);
        });
    }
    storyList.classList.remove('hidden');
    return;
})


// My stories
myStoriesLink.addEventListener('click', async function () {
    submit.classList.add('hidden');
    profileSection.classList.add('hidden');
    storyList.innerHTML = '';
    const response = await getUser();
    const reversed = response.stories;
    reversed.reverse()
    for (let story of reversed) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.setAttribute('id', story.storyId);
        li.innerHTML =
            `<i class="fas fa-trash-alt"></i>
            <a href=${story.url}>${story.title}</a> <small>(${story.url})</small> by <b>${story.author}</b>
                <p>posted by <b>${story.username}</b></p>`;
        storyList.append(li);
    }
    const trashBins = document.querySelectorAll('.fas');
    for (let bin of trashBins) {
        bin.addEventListener('click', function () {
            removeStory(bin.parentElement.id);
        })
    }
    storyList.classList.remove('hidden');
    return;
})


// Profile
profileLink.addEventListener('click', function () {
    document.querySelector('#p1').innerText = `Name: ${user.name}`;
    document.querySelector('#p2').innerText = `Username: ${user.username}`;
    document.querySelector('#p3').innerText = `Account created: ${user.createdAt.substr(0, 10)}`;
    storyList.classList.add('hidden');
    submit.classList.add('hidden')
    profileSection.classList.remove('hidden');
})

// Logout
logOutLink.addEventListener('click', function () {
    localStorage.clear();
    for (let item of userField) {
        item.classList.add('hidden');
    }
    loginSignUpLink.classList.remove('hidden');
    storyList.classList.remove('hidden');
    getStories();
    const stars = document.querySelectorAll('.fa-star');
})


// If a user is logged in the navbar changes
function populateNav() {
    if (checkForLoggedInUser()) {
        for (let item of userField) {
            item.classList.remove('hidden');
        }
        loginSignUpLink.classList.add('hidden');
        document.querySelector('#profile').innerText = user.username;
    }
    return;
}


// When clicked the 'login/signup' link will show the signup form and hide the stories
loginSignUpLink.addEventListener('click', function () {
    loginForm.classList.remove('hidden');
    storyList.classList.add('hidden');
})


// Logging in
loginBTN.addEventListener('click', async function (e) {
    e.preventDefault();
    const loginUser = document.querySelector('#login-user');
    const loginPass = document.querySelector('#login-pass');
    await login(loginUser.value, loginPass.value);
    await getStories();
})


// Creating a new user
signUpBTN.addEventListener('click', async function (e) {
    e.preventDefault();
    if (createName.value !== '' &&
        createUser.value !== '' &&
        createPass.value !== '') {
        const userObj = {
            "user": {
                "name": createName.value,
                "username": createUser.value,
                "password": createPass.value
            }
        };
        await signup(userObj);
    }
})

