import { Component } from "../_core";

export class RankingContent extends Component {
    template () {
        const { items } = this.props;
        return `
            <h2>랭킹 컨텐츠</h2>
            <div>
                ${items.map(({ idx, title, mediaName, url }) => `
                    <article>
                        <a href="/#!/detail/${encodeURIComponent(url)}"
                            <p>${title}</p>
                            <p>${mediaName}</p>
                        </a>
                    </article>
                `).join('')}
            </div>
        `
    }
}
