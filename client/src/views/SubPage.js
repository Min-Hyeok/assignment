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
            page: 1,
            category: ''
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
        this.setState({ items, title: CategoryTitleMap[category], loading: false, category: category });
    }

    template() {
        const { items, title, loading } = this.state;
        return `
            <section class="base__section">
                <div class="base-card">
                    <h2 class="base-card__category">${title}</h2>
                    ${ loading ? `
                        <div class="loader-container">
                            <div class="loader">Loading...</div>
                        </div>
                    ` : items.length === 0 ? '컨텐츠가 없습니다.' : '' }
                    <div class="base-card__list">
                        ${items.map(({ idx, title, imageUrl, mediaName, url, summaryContent}) => `
                            <article class="base-card__item base-card__item--space-bottom" data-idx="${idx}">
                                <a href="/#!/detail/${encodeURIComponent(url)}">
                                    <img src="${imageUrl}" alt="${title}" />
                                    <p class="base-card__title base-card__title--clamp base-card__title--bold">${title}</p>
                                    <p class="base-card__media">${mediaName}</p>
                                    <p class="base-card__content">${summaryContent}</p>
                                </a>
                                <button class="base-card__favorite base-button base-button__icon favorite-toggle">★</button>
                            </article>
                        `).join('')}
                    </div>
                </div>
            </section>
        `
    }

    eventInit () {
        this.el.addEventListener('click', (e) => {
            if (!e.target.classList.contains('favorite-toggle')) return;
            const favorites = Array.from([ ...store.state.favorites ]);
            const idx = Number(e.target.closest('[data-idx]').dataset.idx);
            const itemIndex = favorites.findIndex(v => v && v.idx === idx);
            const item = this.state.items.find(v => v.idx === idx);

            if (itemIndex === -1 && item) {
                favorites.push(item);
                alert('즐겨찾기에 추가되었습니다.');
            } else {
                favorites.splice(itemIndex, 1);
                alert('즐겨찾기에서 삭제되었습니다.');
            }

            store.commit('SET_FAVORITES', favorites);
        })
    }
}
