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

    template() {
        const { content } = this.state;
        return `
            ${content}
            <div>
                <a href="#!" class="list" onclick="history.back(); return false;">목록으로</a>
            </div>
        `
    }
}
