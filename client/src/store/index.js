import { Store } from "../_core";
import { favoriteRepository } from "../repositories";

export const store = new Store({
    state: {
        favorites: favoriteRepository.get() || [],
    },

    mutations: {
        SET_FAVORITES (state, payload) {
            state.favorites = payload;
            favoriteRepository.set(payload);
        }
    },
});
