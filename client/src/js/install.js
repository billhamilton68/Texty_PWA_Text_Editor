const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

// Save the 'beforeinstallprompt' event, so it can be triggered later.
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  // Update the install button visibility: e.g. show the button
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  // Hide the button
  butInstall.style.display = 'none';

  if (deferredPrompt) {
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    deferredPrompt = null;
  }
});

// Handle the 'appinstalled' event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA installed successfully!');

});