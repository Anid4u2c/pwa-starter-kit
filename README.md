[![Built with pwa–starter–kit](https://img.shields.io/badge/built_with-pwa–starter–kit_-blue.svg)](https://github.com/Polymer/pwa-starter-kit "Built with pwa–starter–kit")
[![Build status](https://api.travis-ci.org/Polymer/pwa-starter-kit.svg?branch=master)](https://travis-ci.org/Polymer/pwa-starter-kit)

> ## 🛠 Status: In Development
> [PWA Starter Kit](https://github.com/Polymer/pwa-starter-kit/) is currently in development,
>meaning the [PWA Ownerless Kit](https://github.com/Polymer/pwa-starter-kit/) is working towards
>mirroring it's development based on the [master branch](https://github.com/Polymer/pwa-starter-kit/).
>
>
> See the list of Known [Issues](https://github.com/Polymer/pwa-starter-kit/issues) and [TODOs](https://github.com/Polymer/pwa-starter-kit#todos), from the source, for updates.

# PWA Ownerless Kit

This app is a based on the [PWA Starter Kit](https://pwa-starter-kit.polymer-project.org/), which is a starting point for building PWAs. Out of the box, the template
gives you the following features:
- all the PWA goodness (manifest, service worker)
- a responsive layout
- application theming
- example of using Redux for state management
- offline UI
- simple routing solution
- fast time-to-interactive and first-paint through the PRPL pattern
- easy deployment to prpl-server or static hosting
- unit and integrating testing starting points
- documentation about other advanced patterns.

### Actions Required to Become Ownerless
1. `index.html`
    * Replaced "my-app" with "app-page", and "My App" with "PWA Ownerless Kit".
1. `package.json`
    * (OPTIONAL) Changed "name" to "pwa-ownerless-kit" and "repository" to "Anid4u2c/pwa-ownerless-kit".
1. `polymer.json`
    * Replaced "my-app" with "app-page".
1. `push-manifest.json`
    * Replaced "my-app" with "app-page", and "my-" with "app-page-".    
1. `/src/actions/app.js`
    * Replaced '../components/my-view[1|2|3].js' with '../components/app-page-view[1|2|3].js'..
1. `/src/components/counter-element.js`
    * Replaced "my" with "app", for './app-icons.js'.
1. `/src/components/shop-products.js`
    * Replaced "my" with "app", for './app-icons.js'.
1. Renamed `/src/components/my-app.js` to `/src/components/app-page.js`
    * Replaced "my-app" with "app-page", and "MyApp" with "AppPage".
    * Replaced "<my-view[1|2|3]>" with "<app-page-view[1|2|3]>".
    * Replaced "my" with "app", for './app-icons.js'.
1. Renamed `/src/components/my-icons.js` to `/src/components/app-icons.js`
    * Replaced "my-icons" with "app-icons", and "MyIcons" with "AppIcons".
1. Renamed `/src/components/my-view1.js` to `/src/components/app-page-view1.js`
    * Replaced "my-view1" with "app-page-view1", and "MyView1" with "AppPageView1".
1. Renamed `/src/components/my-view2.js` to `/src/components/app-page-view2.js`
    * Replaced "my-view2" with "app-page-view1", and "MyView2" with "AppPageView2".
1. Renamed `/src/components/my-view3.js` to `/src/components/app-page-view3.js`
    * Replaced "my-view3" with "app-page-view1", and "MyView3" with "AppPageView3".
1. Renamed `/src/components/my-view404.js` to `/src/components/app-page-view404.js`
    * Replaced "my-view404" with "app-page-view1", and "MyView404" with "AppPageView404".