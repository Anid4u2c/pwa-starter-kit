[![Built with pwa–starter–kit](https://img.shields.io/badge/built_with-pwa–starter–kit_-blue.svg)](https://github.com/Polymer/pwa-starter-kit "Built with pwa–starter–kit")
[![Build status](https://api.travis-ci.org/Polymer/pwa-starter-kit.svg?branch=master)](https://travis-ci.org/Polymer/pwa-starter-kit)

> ## Status: No longer under development
> 
> This  project is no longer under development.

# PWA Ownerless Kit

This app is a based on the [PWA Starter Kit](https://pwa-starter-kit.polymer-project.org/), which is a starting point for building PWAs. Out of the box, the template
gives you the following features:
- All the PWA goodness (manifest, service worker)
- A responsive layout
- Application theming
- Example of using Redux for state management
- Offline UI
- Simple routing solution
- Fast time-to-interactive and first-paint through the PRPL pattern
- Easy deployment to prpl-server or static hosting
- Unit and integrating testing starting points
- Documentation about other advanced patterns.

### [Gulp Tasks](https://github.com/Anid4u2c/pwa-ownerless-kit/blob/ownerless/gulpfile.js) Required to Become Ownerless
1. Rename web components and their constructors (according to 'ownerless naming conventions') from within `src/components/*`:
    * `button-shared-styles.js` &#8594; `styles-shared-button.js`
        * `ButtonSharedStyles` &#8594; `SharedStylesButton`
    * `my-app.js` &#8594; `app-page.js`
        * `MyApp` &#8594; `AppPage`
    * `my-icons.js` &#8594; `app-icons.js`
        * `MyIcons` &#8594; `AppIcons`
    * `my-view1.js` &#8594; `app-page-view1.js`
        * `MyView1` &#8594; `AppPageView1`
    * `my-view2.js` &#8594; `app-page-view2.js`
        * `MyView2` &#8594; `AppPageView2`
    * `my-view3.js` &#8594; `app-page-view3.js`
        * `MyView3` &#8594; `AppPageView3`
    * `my-view404.js` &#8594; `app-page-view404.js`
        * `MyView404` &#8594; `AppPageView404`
    * `shared-styles.js` &#8594; `styles-shared.js`
        * `SharedStyles` &#8594; `StylesShared`
1. Search and replace instances of text, including 'my-app', and 'my-view' (which catches all 4 views).
    * `index.html` 
        * "my-app" with "app-page"
        * "My App" with "PWA Ownerless Kit"
    * `manifest.json` 
        * "My App" with "PWA Ownerless Kit"
    * `polymer.json` 
        * "my-app" with "app-page"
    * `push-manifest.json` 
        *  "my-app" with "app-page"
        * "my-view" with "app-page-view"
    * `src/actions/*` 
        * "my-view" with "app-page-view"
1. (OPTIONAL) Configure "Firebase Hosting + Firebase Functions" to allow deployment of the PWA Ownerless Kit:
    * See [this enhanced gist](https://gist.github.com/Anid4u2c/67d3374595d8a68f4d8bcf6d167dea4e) and complete the steps.