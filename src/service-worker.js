/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== "navigate") {
      return false;
    } // If this is a URL that starts with /_, skip.

    if (url.pathname.startsWith("/_")) {
      return false;
    } // If this looks like a URL for a resource, because it contains // a file extension, skip.

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    } // Return true to signal that we want to use the handler.

    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html")
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith(".png"), // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: "images",
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.
const checkAppVisibility = () => {
  return new Promise((resolve, reject) => {
    self.clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then(function (windowClients) {
        var clientIsVisible = false;

        for (var i = 0; i < windowClients.length; i++) {
          const windowClient = windowClients[i];

          if (windowClient.visibilityState === "visible") {
            clientIsVisible = true;

            break;
          }
        }

        return resolve(clientIsVisible);
      });
  });
};

self.addEventListener("push", (e) => {
  console.log("New Push Recieved...");
  console.log(e.data);
  const data = e.data.json();

  e.waitUntil(
    checkAppVisibility().then((isClientVisible) => {
      console.log("is client visible?", isClientVisible);
      if (isClientVisible === false)
        switch (data.event) {
          case "message_in":
            let title = "New message from " + data.payload.username;
            let notificationObject = {
              body: data.payload.content,
              icon: data.payload.icon,
              badge:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAAAXNSR0IArs4c6QAABURJREFUeF7tnH9oVWUYxz/Pvehauu1eM53hdFOxYv7Y7vyJRSFFFKaWQVamSUkaZCoSUVJkQWSmpIR/FZHYHwaya2TRD0IMoppbq8w/KkKCflE0FS2b84mzae22rZ33Pe+959ztnL+/z/d9nw/P++O89z1XsH2yOhrYibIAodTWxjhO+RZ4kcWy3Tg2YIBYx2f1HeB66/jggUtYJPuC2/h3CALrFHCx/6YcK5WdLJa1jl3/1y4ILC1kR3tp61UWyYpC9iGGZUA7hhXDMiBgII0rK4ZlQMBAGldWDMuAgIE0rqwYlgEBA2lcWTEsAwIG0riyYlgGBAykcWXFsAwIGEjjyhoMsBZUwubLDTLtkh4VZUt9Wl4xjgSKtrIsYXUxSnJtpkwOmgIbnLCUzZm0PBHD8kFAlRca0rLOhzRHMigrK4ZlUCYxrBhW3wSCrIaDr7JGw+YrDMqpmzQMWF8CtXbdDR61oMhgzQO8yyGh3HcoLlhecezTySRZ7BOY93KyNHhNdTkUHyyTzBv1FgRnV4RuHQObJpt04F9t4ecs037u1ztQXjMN60t/91hYP9HOLfqwGnUjwnN26fWMemgCrKiycysGWDsQHrRLr2fU1lqYP9LOrRhgfY4w1S69nlGvz4SJlutwtGG9qZWc5UdXoIYn4eA8EMtjgGjDatQnER53BSvItsHrQ3RhHdCxtPMNUOIK1vZauMZyvoo2rEZ9F+E6V6DKvCF4VTC3aFZWVp8CNgVLLTd6eRWsmxDMMXqwsroBeD5YWrnRQxPw9hxIDQnmGh1YB7ScdnYAzu+orxoHa2qCgYrGnLVfa1C8Lx5WAcOCp5TrMHIIvDEHShLBnQtfWV17p1kos4CFLjecveHYNQ1mp4ODCqeyslqwz1HWVMOq8W5ADWhYt42BRy2PYvrCW/hhWIDKuqcK1gbcJvQGTITt9RXirdZGj+XbFZBnWBsmwrKxRrn4Fouy0uZySORgVZbAM1fC9ArfuZsK38qk5CbTIE8fGVheR5aMgfWToNRse9DmzUF+kk8KX9WlZK8fba/D1zaQrP4EeN9JB37mpmF1DUwts7BSjmXSUm0RaRxiX1mNug1hvXGL5wO8F+IbRsHCSphSbuvSGfdzJiWVgRx8BtvD8hrI6hbgPqD/7aJyFKEZ5aPdDTxdW0bKZx/7lWVStseA/VrnCILBMmvrH3Vzm34MnTt/N08J1ZlSOebGrG+XsGDtAe50lpywPFMhu5359WEUFqzVwC5XySnsbUjJ7a78+vIJBVbTHzoucQZnw0aV05pk/Ixy+TWfwEKB5SV0uE2bBBocJvdyJiX3OvTrYRUarJY23ai4+4XayyyhzK9Lywf5AhYarKMn9JLTHXwvDv/0R+E3GcK0zDD5IR/AQoPlJdNyXLep2m9sewWitJ4byo0zhomzH3UvtBMqrKYTOjLRwXcIwx1Xwi8JZanrIRkqrPMT/cMCzzqG1WmnyiFJsjVTLvtd+IcOy0uiuU0/AWa6SKg3D1VOei9nCIcSQkt9hXxq01YkYH1xWqva/+IzYIRNEqYxhT9WNu1hP/rWkzrl7Fk+FCF/x37n+1D0sDpXx9+1ToX3811hAwJW54R/XCfJOd5DcPjjV25ZDxhYXlpHVIf/2cYuEZY5Hu0XVskCf0KXjyz+43n4hN4s53gJuNRlcwOqsrqDOXJcR5yBx1R5QOAiR9AeyaTEeG8Xia2DHwCtJ3VURwcrVblLAlzk9Y5zEgnq6ivkaz/tdtcUDazunW4+pZdpO1ejzEWYLTDHZ+JNSbh/ekqafepzZH8DrCTsW9pKLjwAAAAASUVORK5CYII=",
              tag: data.payload.thread_id,
              renotify: true,
              thread_id: data.payload.thread_id,
            };
            self.registration.showNotification(title, notificationObject);
            break;

          default:
            break;
        }
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  let url = `https://commamessenger.netlify.app/conversations/${event.notification.tag}`;
  event.waitUntil(self.clients.openWindow(url));
});
