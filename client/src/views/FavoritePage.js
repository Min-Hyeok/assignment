import { store } from "../store";
import { Component } from "../_core";

export class FavoritePage extends Component {

    template () {
        const { favorites } = store.state;
        const reversed = [ ...favorites ].reverse();
        console.log(favorites);

        return `
            <h1>즐겨찾기 목록</h1>
            <div>
                ${reversed.map(({ idx, title, imageUrl, mediaName, url, summaryContent}) => `
                    <article data-idx="${idx}">
                        <a href="/#!/detail/${encodeURIComponent(url)}">
                            <img src="${imageUrl}" alt="${title}" />
                            <p>${title}</p>
                            <p>${mediaName}</p>
                            <p>${summaryContent}</p>
                        </a>
                        <button class="favorite-remove">★</button>
                    </article>
                `).join('')}
            </div>
        `
    }

    eventInit () {
        this.el.addEventListener('click', (e) => {
            if (!e.target.classList.contains('favorite-remove')) return;
            const favorites = [ ...store.state.favorites ];
            const idx = Number(e.target.closest('[data-idx]').dataset.idx);
            favorites.splice(favorites.findIndex(v => v.idx === idx), 1);
            store.commit('SET_FAVORITES', favorites);
        })
    }

}
