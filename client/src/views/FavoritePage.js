import { store } from "../store";
import { Component } from "../_core";

export class FavoritePage extends Component {

    template () {
        const { favorites } = store.state;
        const reversed = [ ...favorites ].reverse();

        return `
            <section class="base__section">
                <div class="base-card">
                    <h2 class="base-card__category">즐겨찾기 목록</h2>
                    <div class="base-card__list">
                        ${reversed.map(({ idx, title, imageUrl, mediaName, url, summaryContent}) => `
                            <article class="base-card__item base-card__item--space-bottom" data-idx="${idx}">
                                <a href="/#!/detail/${encodeURIComponent(url)}">
                                    <img src="${imageUrl}" alt="${title}" />
                                    <p class="base-card__title base-card__title--clamp base-card__title--bold">${title}</p>
                                    <p class="base-card__media">${mediaName}</p>
                                    <p class="base-card__content">${summaryContent}</p>
                                </a>
                                <button class="base-card__favorite base-button base-button__icon favorite-remove">★</button>
                            </article>
                        `).join('')}
                    </div>
                </div>
            </section>
        `
    }

    eventInit () {
        this.el.addEventListener('click', (e) => {
            if (!e.target.classList.contains('favorite-remove')) return;

            const favorites = [ ...store.state.favorites ];
            const idx = Number(e.target.closest('[data-idx]').dataset.idx);

            favorites.splice(favorites.findIndex(v => v.idx === idx), 1);
            store.commit('SET_FAVORITES', favorites);
            alert('즐겨찾기에서 삭제되었습니다.');
        })
    }

}
