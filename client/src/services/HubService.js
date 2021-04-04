import { RestClient } from "../_core";

export const Category = {
    LIFE: 'life',
    TRIP: 'trip',
    FOOD: 'food',
    CULTURE: 'culture',
}

const Paths = {
    BEST: '/best',
    MAIN: '/main',
    DETAIL: '/detail',
    INFO: '/content/info',
    [Category.LIFE]: '/content/life',
    [Category.TRIP]: '/content/trip',
    [Category.FOOD]: '/content/food',
    [Category.CULTURE]: '/content/culture',
}

export class HubService {
    #client;

    constructor() {
        this.#client = new RestClient('/api', 5000);
    }

    getMainContents() {
        try {
            return this.#client.get(Paths.MAIN);
        } catch (e) { 
            console.info('메인 컨텐츠를 가져오는 도중에 에러가 발생했습니다.');
            console.info(e);
            return {};
        }
    }

    getBestContents() {
        try {
            return this.#client.get(Paths.BEST);
        } catch (e) { 
            console.info('랭킹 컨텐츠를 가져오는 도중에 에러가 발생했습니다.');
            console.info(e);
            return {};
        }
    }

    getSubContents(category, page) {
        try {
            return this.#client.get(Paths[category] + `${page ? `?page=${page}` : ``}`);
        } catch (e) { 
            console.info('서브페이지 컨텐츠를 가져오는 도중에 에러가 발생했습니다.');
            console.info(e);
            return [];
        }
    }

    getDetailContent(url) {
        try {
            return this.#client.get(`${Paths.DETAIL}/${encodeURIComponent(url)}`);
        } catch (e) { 
            console.info('상세페이지 컨텐츠를 가져오는 도중에 에러가 발생했습니다.');
            console.info(e);
            return null;
        }
    }

    getContentInfo(idx) {
        try {
            return this.#client.get(`${Paths.INFO}/${idx}`);
        } catch (e) {
            console.info('컨텐츠의 상세정보를 가져오는 도중에 에러가 발생했습니다.');
            console.info(e);
            return null;
        }
    }
}
