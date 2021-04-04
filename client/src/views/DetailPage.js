import { hubService } from "../services";
import { store } from "../store";
import { Component } from "../_core";

export class DetailPage extends Component {

    stateInit () {
        return {
            content: '상세페이지 로딩 중입니다.',
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

        const content = await hubService.getDetailContent(url);
        this.setState({ content });
    }

    componentDidUpdate() {
        const shared = this.el.querySelector('.d_header_page_share_l');
        const comment = this.el.querySelector('.comment_info');
        const author = this.el.querySelector('.article_author');

        comment && comment.remove();
        shared && shared.remove();
        author && author.remove();
    }

    template() {
        const { content } = this.state;
        return `
            <div class="detail-page">
                ${content}

                ${content && `
                    <div class="detail-page__prev">
                        <button class="base-button" onclick="history.back(); return false;">목록으로</button>
                    </div>
                `}
            </div>
        `
    }
}
