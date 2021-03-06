import { Component } from "./_core";
import { Home, SubPage, FavoritePage, DetailPage } from "./views";

export class App extends Component {

    routing(el) {
        const selectedPath = location.hash.replace('#!', '');
        const routes = {
            '/home': Home,
            '/sub': SubPage,
            '/favorite': FavoritePage,
            '/detail': DetailPage,
        }
        let selectedRoute = Home;
        for (const path of Object.keys(routes)) {
            if (selectedPath.includes(path)) {
                selectedRoute = routes[path];
                break;
            }
        }
        new selectedRoute(el);

    }

    componentDidMounted() {
        const $main = this.el.querySelector('#main');

        window.addEventListener('popstate', (e) => this.routing($main));

        this.routing($main);
    }
    
    template () {
        return `        
            <header class="header">
                <div class="header__wrap">
                    <h3 class="header__logo">
                        <a href="#"><img src="https://hub.zum.com/resources/pc/images/logo_zum_2x-78df1cde157641c8f4178f86826539e8.png" alt="허브줌" /></a>
                    </h3>
                    <ul class="header__navigation">
                        <li class="header__category"><a href="/#!/home">HOME</a></li>
                        <li class="header__category"><a href="/#!/sub/life">라이프</a></li>
                        <li class="header__category"><a href="/#!/sub/trip">여행</a></li>
                        <li class="header__category"><a href="/#!/sub/food">푸드</a></li>
                        <li class="header__category"><a href="/#!/sub/culture">문화</a></li>
                        <li class="header__category"><a href="/#!/favorite">즐겨찾기</a></li>
                    </ul>
                </div>
            </header>
            <main id="main" class="main"></main>
            <footer class="footer">
                <div class="footer__content">
                    Copyright &copy; 2021 김민혁 All Right Reserved
                </div>
            </footer>
        `
    }

}