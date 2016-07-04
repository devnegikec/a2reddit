/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from 'angular2/http';

import { AppState } from './app.service';
import { Home } from './home';
import { RouterActive } from './router-active';
import { ArticleComponent } from './redditarticle';
@Component({
    selector: 'app',
    directives: [ArticleComponent],
    template: `
        <form class="ui large form segment">
            <h3 class="ui header">Add a Link</h3>
            <div class="field">
                <label for="title">Title:</label>
                <input name="title" #newtitle>
            </div>
            <div class="field">
                <label for="link">Link:</label>
                <input name="link" #newlink>
            </div>
            <button (click)="addArticle(newtitle, newlink)"
                class="ui positive right floated button">
                Submit link
            </button>
        </form>
        <div class="ui grid posts">
            <reddit-article>
            </reddit-article>
        </div>
        `,
  providers: [HTTP_PROVIDERS]
})


@RouteConfig([
  { path: '/',      name: 'Index', component: Home, useAsDefault: true },
  { path: '/home',  name: 'Home',  component: Home },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') }
])
export class App{
    constructor() {
    }
    addArticle(title: HTMLInputElement, link: HTMLInputElement): void {
        console.log(`Adding article title: ${title.value} and link: ${link.value}`);
    }
}

