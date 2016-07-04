import { Component } from '@angular/core';
@Component({
    selector: 'reddit-article',
    host: {
    class: 'row'
    },
    template: require('./article.html')
})
export class ArticleComponent {
    article: Article;
    constructor() {
        this.article = new Article('Angular 2', 'http://angular.io', 10);
    }
    voteUp(): boolean {
        this.article.voteUp();
        return false;
    }
    voteDown(): boolean {
        this.article.voteDown();
        return false;
    }
}

class Article {
    title: string;
    link: string;
    votes: number;
    constructor(title: string, link: string, votes?: number) {
        this.title = title;
        this.link = link;
        this.votes = votes || 0;
    }
    voteUp(): void {
        this.votes += 1;
    }
    voteDown(): void {
        this.votes -= 1;
    }
}