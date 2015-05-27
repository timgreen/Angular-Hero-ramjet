Angular-Hero-ramjet
============

Create hero transitions with Angular, similar to those implemented by Google's Material Design and Polymer's [core-animated-pages](https://www.polymer-project.org/docs/elements/core-elements.html#core-animated-pages).

Unlike [Angular-Hero](https://github.com/DevAndyLee/Angular-Hero), Angular-Hero-ramjet use [ramjet](https://github.com/Rich-Harris/ramjet) to do the transform.

##Example

TODO(timgreen): new demo

Example project here: [Angular-Hero-Sample](https://github.com/DevAndyLee/Angular-Hero-Sample)

<img src="sample/angular-hero-sample.gif" />

###Install with Bower

TODO(timgreen):

```
bower install https://github.com/timgreen/Angular-Hero-ramjet.git#ramjet
```

##Usage

1. Include `alAngularHeroRamjet` as a dependency in your Angular app.

    ```js
    angular.module('app', ['alAngularHeroRamjet'])
    ```

2. Declare the page transitions to use on the `ng-view` or `ng-viewport` element, including `hero-ramjet-transition`:
    ```html
    <div ng-view class="page-transition hero-ramjet-transition"></div>
    ```
3. Identify hero elements with the `hero-ramjet` class and `hero-id` attribute:
    ```html
    <div class="name hero-ramjet" hero-id="name">{{contact.name}}</div>
    ```

    The `hero-id` attribute should be the same on both pages to trigger a hero animation from one to the other.
