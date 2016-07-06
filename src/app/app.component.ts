/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from 'angular2/http';

import { AppState } from './app.service';
import { Home } from './home';
import { RouterActive } from './router-active';
import { ArticleComponent, Article } from './redditarticle';

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
            <reddit-article *ngFor="let article of sortedArticles()" [article]="article">
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
    articles: Article[];
    constructor() {
        this.articles = [
            new Article('Angular 2', 'http://angular.io', 3),
            new Article('Fullstack', 'http://fullstack.io', 2),
            new Article('Angular Homepage', 'http://angular.io', 1),
        ];
    }
    addArticle(title: HTMLInputElement, link: HTMLInputElement): void {
        this.articles.push(new Article(title.value, link.value, 0));
        title.value = '';
        link.value = '';
    }
    sortedArticles(): Article[] {
        return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
    }
}

