const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault();
    
    // Stash the event so it can be triggered later.
    deferredPrompt = event;
    
    // Update UI to notify the user they can add to home screen
    butInstall.style.display = 'block';
});

butInstall.addEventListener('click', async () => {

    // Hide the app provided install promotion
    if (!deferredPrompt) {
        return;
    }

    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // Optionally, send analytics event with outcome of user choice
    console.log(`User response to the install prompt: ${outcome}`);
    
    // We've used the prompt, and can't use it again, throw it away
    deferredPrompt = null;

    butInstall.style.display = 'none';
});

window.addEventListener('appinstalled', (event) => {
    // Hide the app provided install promotion
    console.log('J.A.T.E had been installed');
});
