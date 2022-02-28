import { getterTypes } from "./../../src/store/modules/articles";
import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import Element from "element-ui";
import HomePage from "@/views/Home.vue";

Vue.use(Element);

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Home.vue", () => {
  const $t = jest.fn();
  const getters = {
    [getterTypes.searchedArticles]: () => [
      { title: "title" },
      { title: "title" },
    ],
  };
  const store = new Vuex.Store({
    modules: {
      articles: {
        state: {
          articles: [{ title: "title" }],
        },
        getters,
      },
    },
  });
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(HomePage, {
      localVue,
      store,
      mocks: {
        $t,
      },
    });
  });

  it("checks default values", () => {
    expect(wrapper.vm.searchValue).toBeFalsy();
    expect(wrapper.vm.viewMode).toBeTruthy();
    expect(wrapper.vm.articles).toBeTruthy();
  });

  it("checks function changeView", () => {
    wrapper.vm.changeView();
    expect(wrapper.vm.viewMode).toBeFalsy();
  });

  it("calls function changeView", () => {
    wrapper.vm.changeView = jest.fn();
    wrapper.vm.changeView();
    expect(wrapper.vm.changeView).toHaveBeenCalledTimes(1);
  });

  it("checks function onSearch when no search value", () => {
    wrapper.vm.searchValue = "";
    wrapper.vm.onSearch();
    expect(wrapper.vm.articles).toStrictEqual([{ title: "title" }]);
  });

  it("checks function onSearch when search value", () => {
    wrapper.vm.searchValue = "mock";
    wrapper.vm.onSearch();
    expect(wrapper.vm.articles).toStrictEqual(
      getters[getterTypes.searchedArticles]()
    );
  });
});
