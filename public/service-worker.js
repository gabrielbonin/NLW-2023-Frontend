console.log('Service Worker Loaded...');

self.addEventListener('push', function (event) {
  const body = event.data?.text() ?? ''

  event.waitUntil(
    self.registration.showNotification('Push Notification', {
      body,
      icon: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
    })
  )
})