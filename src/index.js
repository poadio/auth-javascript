var omneedia;
var el = function(o) {
    return document.querySelector(o);
};

function updateUI() {
    if (!omneedia.auth.session()) {
        el('#auth').style.display = '';
        el('#content').style.display = 'none';
    } else {
        el('#auth').style.display = 'none';
        el('#content').style.display = '';
    }
    el('#login_via_github').addEventListener('click', signInWithGithub);
    el('#logout').addEventListener('click', logout);
    el('#signup_via_email').addEventListener('click', signUpWithEmail);
    el('#signin_via_email').addEventListener('click', signInWithEmail);
    el('#signin_via_magic_link').addEventListener('click', signInWithMagic);
}

function signInWithGithub() {
    omneedia.auth.signIn({
        provider: 'github',
    });
}

function signInWithEmail() {
    omneedia.auth
        .signIn({
            email: el('#email').value,
            password: el('#password').value,
        })
        .then(function(response) {
            console.log(response);
            if (response.error) return alert('ERROR:\n' + response.error.message);
        })
        .catch(function(e) {
            console.log(e);
        });
}

function signInWithMagic() {
    omneedia.auth
        .signIn({
            email: el('#email_magic').value,
        })
        .then(function(response) {
            if (response.error) return alert('ERROR:\n' + response.error.message);
            alert('Mail has been sent successfully');
        })
        .catch(function(e) {
            console.log(e);
        });
}

function signUpWithEmail() {
    omneedia.auth
        .signUp({
            email: el('#email').value,
            password: el('#password').value,
        })
        .then(function(response) {
            if (response.error) return alert('ERROR:\n' + response.error.message);
            alert('email sent successfully.');
        })
        .catch(function(e) {
            console.log(e);
        });
}

function logout() {
    omneedia.auth.signOut();
}

function load() {
    console.log('load');
    omneedia = window.omneedia.createClient(env.OMNEEDIA_URL, env.OMNEEDIA_KEY);
    /**
     * Listen to state change event
     */
    omneedia.auth.onAuthStateChange(async(event, session) => {
        console.log('event: ', event);
        updateUI();
    });
    /**
     * UpdateUI based on sessison
     */
    updateUI();
}

window.addEventListener('load', load);