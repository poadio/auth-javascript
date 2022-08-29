var supabase = supabase.createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
window.userToken = null;

function load() {
    function updateUI() {
        if (!supabase.auth.session()) {
            document.getElementById('auth').style.display = '';
            document.getElementById('content').style.display = 'none';
        } else {
            document.getElementById('auth').style.display = 'none';
            document.getElementById('content').style.display = '';
        }
    }
    supabase.auth.onAuthStateChange(async(event, session) => {
        console.log('event: ', event);
        updateUI();
    });
    if (!supabase.auth.session()) {
        document.getElementById('auth').style.display = '';
        document.getElementById('content').style.display = 'none';
    } else {
        document.getElementById('auth').style.display = 'none';
        document.getElementById('content').style.display = '';
    }

    function signInWithGithub() {
        supabase.auth.signIn({
            provider: 'github',
        });
    }

    function signInWithEmail() {
        supabase.auth
            .signIn({
                email: $('#email').val(),
                password: $('#password').val(),
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
        supabase.auth
            .signIn({
                email: $('#email_magic').val(),
            })
            .then(function(response) {
                console.log(response);
                if (response.error) return alert('ERROR:\n' + response.error.message);
                alert('Mail has been sent successfully');
            })
            .catch(function(e) {
                console.log(e);
            });
    }

    function signUpWithEmail() {
        supabase.auth
            .signUp({
                email: $('#email').val(),
                password: $('#password').val(),
            })
            .then(function(response) {
                console.log(response);
                if (response.error) return alert('ERROR:\n' + response.error.message);
            })
            .catch(function(e) {
                console.log(e);
            });
    }

    function logout() {
        supabase.auth.signOut();
    }
    $('#login_via_github').click(signInWithGithub);
    $('#logout').click(logout);
    $('#signup_via_email').click(signUpWithEmail);
    $('#signin_via_email').click(signInWithEmail);
    $('#signin_via_magic_link').click(signInWithMagic);
}

document.addEventListener('DOMContentLoaded', load);