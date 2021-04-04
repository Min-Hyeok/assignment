import { Component } from "../_core";

export class RankingContent extends Component {
    template () {
        const { items } = this.props;
        return `
            <div class="base-card">
                <h2 class="base-card__category">랭킹 컨텐츠</h2>
                <div class="base-card__list">
                    ${items.map(({ idx, title, mediaName, url }, index) => `
                        <article class="base-card__item base-card__item--ranking">
                            <a href="/#!/detail/${encodeURIComponent(url)}">
                                <span class="base-card__rank">${index + 1}</span>
                                <p class="base-card__title base-card__title--small">${title}</p>
                                <p class="base-card__media">${mediaName}</p>
                            </a>
                        </article>
                    `).join('')}
                </div>
            </div>
        `
    }
}
