const authEmailPassButton = document.getElementById('authEmailPassButton');
const createUserButton = document.getElementById('createUserButton');
const logOutButton = document.getElementById('logOutButton');
const authGitHubButton = document.getElementById('authGitHubButton');




// 2 - Inputs
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');

// 3 - Displays
const displayName = document.getElementById('displayName');

// 4 - Criar novo usuário
createUserButton.addEventListener('click', function () {
    firebase
        .auth()
        .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(() => {
            alert(`Bem vindo ${emailInput.value}`);
        })
        .catch(error => {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao cadastrar, verifique o erro no console.')
        });
});

// 5 - Autenticar com E-mail e Senha
authEmailPassButton.addEventListener('click', () => {
    firebase
        .auth()
        .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(result => {
            console.log(result);
            displayName.innerText = `Bem vindo ${emailInput.value}`;
            alert(`Autenticado ${emailInput.value}`);
        })
        .catch(error => {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao autenticar, verifique o erro no console.')
        });
});

// 6- Logout
logOutButton.addEventListener('click', () => {
    firebase
        .auth()
        .signOut()
        .then(() => {
            displayName.innerText = 'Você não está autenticado';
            alert('Você se deslogou');
        },  (error) => {
            console.error(error);
        });
});


// 7 - Autenticar Anônimo
authAnonymouslyButton.addEventListener('click', () => {
    firebase
        .auth()
        .signInAnonymously()
        .then(result => {
            console.log(result);
            displayName.innerText = 'Bem vindo, desconhecido';
            alert('Autenticado Anonimamente');
        })
        .catch(error => {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao autenticar, verifique o erro no console.')
        });
});

// 8 - Autenticação via Provider
function signIn(provider) {
    firebase.auth()
        .signInWithPopup(provider)
        .then(result => {
            console.log(result);
            const token = result.credential.accessToken;
            displayName.innerText = 'Bem vindo, ' + result.user.displayName;
        }).catch(error => {
            console.log(error);
            alert('Falha na autenticação');
        });
}

// 9 - Autenticar com GitHub
authGitHubButton.addEventListener('click', () => {
    const provider = new firebase.auth.GithubAuthProvider();
    signIn(provider);
});

// 10 - Autenticar com Google
authGoogleButton.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    signIn(provider);
});
