import { hubService } from "../services";
import { Category } from "../services/HubService";
import { store } from "../store";
import { Component } from "../_core";

const CategoryTitleMap = {
    [Category.LIFE]: '라이프',
    [Category.FOOD]: '푸드',
    [Category.TRIP]: '여행',
    [Category.CULTURE]: '문화',
}

export class SubPage extends Component {

    stateInit() {
        return {
            items: [],
            title: '',
            loading: true,
        }
    }

    async componentDidMounted() {
        const paths = location.hash.split('/');
        if (paths.length === 0) {
            alert('존재하지 않는 페이지입니다.');
            history.back();
        }

        const category = paths.pop();
        if (!Object.values(Category).includes(category)) {
            alert('존재하지 않는 페이지입니다.');
            history.back();
        }
        const items = await hubService.getSubContents(category);
        this.setState({ items, title: CategoryTitleMap[category], loading: false });
    }

    template() {
        const { items, title, loading } = this.state;
        return `
            <h1>${title}</h1>
            ${ loading ? '로딩 중입니다.' : '' }
            ${ items.length === 0 ? '컨텐츠가 없습니다.' : '' }
            <div>
                ${items.map(({ idx, title, imageUrl, mediaName, url, summaryContent}) => `
                    <article data-idx="${idx}">
                        <a href="/#!/detail/${encodeURIComponent(url)}">
                            <img src="${imageUrl}" alt="${title}" />
                            <p>${title}</p>
                            <p>${mediaName}</p>
                            <p>${summaryContent}</p>
                        </a>
                        <button class="favorite-toggle">★</button>
                    </article>
                `).join('')}
            </div>
        `
    }

    eventInit () {
        this.el.addEventListener('click', (e) => {
            if (!e.target.classList.contains('favorite-toggle')) return;
            const favorites = [ ...store.state.favorites ];
            const idx = Number(e.target.closest('[data-idx]').dataset.idx);
            const itemIndex = favorites.findIndex(v => v && v.idx === idx);
            const item = this.state.items.find(v => v.idx === idx);
            if (itemIndex === -1 && item) {
                favorites.push(item);
            } else {
                favorites.splice(itemIndex, 1);
            }
            store.commit('SET_FAVORITES', favorites);
        })
    }
}
