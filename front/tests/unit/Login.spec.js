import { mount, createLocalVue } from "@vue/test-utils";
import Login from "@/components/pages/Login.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

describe("Login render", () => {
  test("Render login page", () => {
    const localVue = createLocalVue();
    localVue.use(BootstrapVue);
    localVue.use(IconsPlugin);

    const wrapper = mount(Login, {
      localVue,
    });
    expect(wrapper.exists());
  });

  test("Check login components", () => {
    const localVue = createLocalVue();
    localVue.use(BootstrapVue);
    localVue.use(IconsPlugin);
    const wrapper = mount(Login, {
      localVue,
    });

    expect(wrapper.find('#username').exists()).toBe(true)
    expect(wrapper.find('#email').exists()).toBe(true)
    expect(wrapper.find('#password').exists()).toBe(true)


    wrapper.setData({ username: 'test' })
    wrapper.setData({ email: 'test' })
    wrapper.setData({ password: 'test' })

    wrapper.find('.btn').trigger('click')

    expect(wrapper.find('.b-toast-danger').exists()).toBe(true)

  });
});
