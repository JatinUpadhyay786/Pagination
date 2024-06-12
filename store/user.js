import axios from "axios";
export const state = () => ({
  data: [],
  currentPage: 1,
  totalPages: 0,
});

export const mutations = { 
  SET_DATA(state, payload) { 
    payload.response = payload.response.filter((itm) =>
      itm.title.includes(payload.word)
    );
    state.currentPage = payload.page;
    state.totalPages = Math.ceil(payload.response.length / 10);
    const start = payload.page * 10 - 10;
    const end = payload.page * 10;
    let result = payload.response.slice(start, end);
    state.data = result;
  },
};

export const actions = {
  async FETCH_DATA(context, payload) {
    console.log("Actions", payload);
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      context.commit("SET_DATA", {
        response: response.data || [],
        page: payload.page,
        word: payload.searchWord,
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  },
};
