import { hubService } from "../services";
import { store } from "../store";
import { Component } from "../_core";

export class DetailPage extends Component {

    stateInit () {
        return {
            content: '',
            loading: true,
            items: []
        }
    }

    get selectedItem () {
        const paths = location.hash.split('/');
        const url = decodeURIComponent(paths.pop());
        return store.state.favorites.find(v => v.url === url)
    }

    async componentDidMounted() {
        const paths = location.hash.split('/');
        if (paths.length === 0) {
            alert('존재하지 않는 페이지입니다.');
            history.back();
        }

        const url = paths.pop();
        const idx = Number(decodeURIComponent(url).split('/').pop());

        const [ content, items ] = await Promise.all([
            hubService.getDetailContent(url),
            hubService.getContentInfo(idx)
        ]);

        this.setState({ content, items, idx, loading: false });
    }

    componentDidUpdate() {
        const exceptionList = ['.d_header_page_share_l', '.comment_info', '.article_author', '.article_tag', '.d_article_share'];

        exceptionList.forEach(v => {
            const el = this.el.querySelector(v);

            el && el.remove();
        });
    }

    template() {
        const { content, loading } = this.state;
        return `
            <div class="detail-page">
                ${loading ? `
                    <div class="loader-container">
                        <div class="loader">Loading...</div>
                    </div>
                ` : content}

                ${content && `
                    <div class="detail-page__prev">
                        <button class="base-button" onclick="history.back(); return false;">목록으로</button>
                        <button class="base-button base-button__icon favorite">★</button>
                    </div>
                `}
            </div>
        `
    }

    eventInit () {
        this.el.addEventListener('click', (e) => {
            if (!e.target.classList.contains('favorite')) return;

            const { items, idx } = this.state;
            const favorites = Array.from([ ...store.state.favorites ]);
            const itemIndex = favorites.findIndex(v => v && v.idx === idx);

            if (itemIndex === -1 && items) {
                favorites.push(items);
                alert('즐겨찾기에 추가되었습니다.');
            } else {
                favorites.splice(itemIndex, 1);
                alert('즐겨찾기에서 삭제되었습니다.');
            }

            store.commit('SET_FAVORITES', favorites);
        })
    }
}
