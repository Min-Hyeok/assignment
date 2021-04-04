import { Component } from "../_core";

export class MainContent extends Component {

    template () {
        const { items, title } = this.props;
        return `
            <div class="base-card">
                <h2 class="base-card__category">${title}</h2>
                <div class="base-card__list">
                    ${items.map(({ idx, title, imageUrl, mediaName, url, summaryContent}) => `
                        <article class="base-card__item" data-idx="${idx}">
                            <a href="/#!/detail/${encodeURIComponent(url)}">
                                <img src="${imageUrl}" alt="${title}" />
                                <p class="base-card__title base-card__title--clamp base-card__title--bold">${title}</p>
                                <p class="base-card__media">${mediaName}</p>
                                <p class="base-card__content">${summaryContent}</p>
                            </a>
                            <button class="base-card__favorite base-button base-button__icon favorite">★</button>
                        </article>
                    `).join('')}
                </div>
            </div>
        `
    }

    eventInit () {
        if (!this.el) return;

        this.el.addEventListener('click', (e) => {
            if (!e.target.classList.contains('favorite')) return;
            const { items, toggleFavorite } = this.props;
            const idx = Number(e.target.closest('[data-idx]').dataset.idx);
            const item = items.find(v => v.idx === idx);
            toggleFavorite(item);
        })
    }

}
