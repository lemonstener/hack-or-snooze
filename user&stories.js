// This script is all about user and story functions

const BASE_URL = 'https://hack-or-snooze-v3.herokuapp.com';
const user = JSON.parse(localStorage.getItem("user")) || {};

// Signup function
async function signup(obj) {
    const response = await axios.post(`${BASE_URL}/signup`, obj);
    console.log(response.data);
    const result = response.data;
    user.createdAt = result.user.createdAt;
    user.favorites = result.user.favorites;
    user.name = result.user.name;
    user.stories = result.user.stories;
    user.updatedAt = result.user.updatedAt;
    user.username = result.user.username;
    user.token = result.token;
    localStorage.setItem('user', JSON.stringify(user));
    populateNav();
    loginForm.classList.toggle('hidden');
    storyList.classList.toggle('hidden');
}

// Login function
async function login(username, password) {
    const response = await axios({
        url: `${BASE_URL}/login`,
        method: "POST",
        data: { user: { username, password } },
    });
    const result = response.data;
    user.createdAt = result.user.createdAt;
    user.favorites = result.user.favorites;
    user.name = result.user.name;
    user.stories = result.user.stories;
    user.updatedAt = result.user.updatedAt;
    user.username = result.user.username;
    user.token = result.token;
    localStorage.setItem('user', JSON.stringify(user));
    populateNav();
    loginForm.classList.toggle('hidden');
    storyList.classList.toggle('hidden');
}



// Function to create a story
async function addStory(obj) {
    const response = await axios.post(`${BASE_URL}/stories`, obj);
}


//Function to delete a story
async function removeStory(id) {
    const response = await axios.delete(`${BASE_URL}/stories/${id}?token=${user.token}`);
    document.getElementById(id).remove();
}


// Favorites functions 
async function addRemoveFavorite(obj) {
    if (!obj.classList.contains('checked')) {
        obj.classList = 'fas fa-star checked';
        await addToFavorites(storyId = obj.parentElement.id);
    } else {
        obj.classList = 'far fa-star';
        await removeFromFavorites(obj.parentElement.id);
    }

}

async function addToFavorites(id) {
    const response = await axios.post(`${BASE_URL}/users/${user.username}/favorites/${id}?token=${user.token}`);
    console.log(response.data);
}

async function removeFromFavorites(id) {
    const response = await axios.delete(`${BASE_URL}/users/${user.username}/favorites/${id}?token=${user.token}`);
    console.log(response.data);
}


// General function to fetch the data of the current user
async function getUser() {
    const res = await axios.get(`${BASE_URL}/users/${user.username}?token=${user.token}`);
    return (res.data.user);
}
