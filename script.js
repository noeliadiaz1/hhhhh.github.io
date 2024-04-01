const registerButton = document.getElementById('registerButton');
const loginButton = document.getElementById('loginButton');

let publicKeyCredentialCreationOptions = null;

registerButton.addEventListener('click', async () => {
    try {
        const credentialCreationOptions = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

        publicKeyCredentialCreationOptions = credentialCreationOptions;

        const credential = await navigator.credentials.create({ publicKey: credentialCreationOptions });
        console.log(credential);

        // Envía el credential al servidor para completar el registro
    } catch (error) {
        console.error(error);
    }
});

loginButton.addEventListener('click', async () => {
    try {
        const credentialRequestOptions = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

        const assertion = await navigator.credentials.get({ publicKey: credentialRequestOptions });
        console.log(assertion);

        // Envía la assertion al servidor para verificar la autenticación
    } catch (error) {
        console.error(error);
    }
});
