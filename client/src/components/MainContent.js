import { Component } from "../_core";

export class MainContent extends Component {

    template () {
        const { items, title } = this.props;
        return `
            <h2>${title}</h2>
            <div>
                ${items.map(({ idx, title, imageUrl, mediaName, url, summaryContent}) => `
                    <article data-idx="${idx}">
                        <a href="/#!/detail/${encodeURIComponent(url)}">
                            <img src="${imageUrl}" alt="${title}" />
                            <p>${title}</p>
                            <p>${mediaName}</p>
                            <p>${summaryContent}</p>
                        </a>
                        <button class="favorite">★</button>
                    </article>
                `).join('')}
            </div>
        `
    }

    eventInit () {
        this.el.addEventListener('click', (e) => {
            if (!e.target.classList.contains('favorite')) return;
            const { items, toggleFavorite } = this.props;
            const idx = Number(e.target.closest('[data-idx]').dataset.idx);
            const item = items.find(v => v.idx === idx);
            toggleFavorite(item);
        })
    }

}
