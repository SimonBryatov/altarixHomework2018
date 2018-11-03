window.onload = () => {
    document.getElementById('btn-find').onclick = getUserInfo;
    let input = document.getElementById('input-username')
    input.onkeydown = () => {
        if (event.keyCode == 13) document.getElementById('btn-find').click()
    }
    input.focus();
}

function getUserInfo() {
    const username = document.getElementById('input-username').value;
    document.getElementsByClassName('search-results')[0].innerHTML = `<div class='loader'></div>`
    fetch('https://api.github.com/search/users?q=' + username)
        .then((resp) => {
            if (resp.status !== 200) throw new Error();
            return resp.json()
        })
        .then((userData) => {
            renderSearchResults(userData.items);
        })
        .catch(() => renderError());
}

function renderError() {
    document.getElementsByClassName('search-results')[0].innerHTML = '<h2>Что-то пошло не так! Попробуй снова... \u{1F616}</h2>'
}

function renderSearchResults(userData) {
    userData = userData.slice(0, 5);
    if (userData.length > 0) {
        let listContentHTML = userData.map((userInfo, ind) => {
            let avatarHTML = `<img src='${userInfo.avatar_url}' alt='${userInfo.login}'/>`
            let usernameHTML = `<h3><a href='${userInfo.html_url}'>${userInfo.login}</a></h3>`
            return `<li class='list-item'><div class='list-item__content'><h4 class='list-number'>${ind + 1}.</h4>${avatarHTML + usernameHTML}</div></li>`
        }).join('');
        document.getElementsByClassName('search-results')[0].innerHTML = listContentHTML;
    } else {
        document.getElementsByClassName('search-results')[0].innerHTML = '<h2>Не найдено совпадений \u{1F614}</h2>'
    }
}