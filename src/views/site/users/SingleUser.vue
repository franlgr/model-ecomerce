<template>
  <main class="profile-page">
    <section class="block h-500-px mt-64"></section>
    <section class="py-16 bg-blueGray-200">
      <div class="container mx-auto px-4">
        <div
          class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"
        >
          <div class="bg-[#22c55e]">
            <router-link
              :to="{ name: 'site-users' }"
              class="btn btn-outline bg-white m-4 ml-8 hover:text-blackwhite"
              >Back</router-link
            >
          </div>
          <div class="px-6 pb-24">
            <div class="flex flex-wrap justify-center">
              <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                <div class="relative">
                  <img
                    alt="..."
                    src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                    class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                  />
                </div>
              </div>
              <div
                class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center"
              >
                <div class="py-6 px-3 mt-32 sm:mt-0">
                  <button
                    class="bg-green-500 active:bg-green-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    @click="openEmailClient(user.email)"
                  >
                    Connect
                  </button>
                </div>
              </div>
              <div class="w-full lg:w-4/12 px-4 lg:order-1">
                <div class="flex justify-center py-4 lg:pt-4 pt-8">
                  <div class="mr-4 p-3 text-center">
                    <span
                      class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
                      >{{ totalProducts }}</span
                    ><span class="text-sm text-blueGray-400">Products</span>
                  </div>
                  <div class="mr-4 p-3 text-center">
                    <span
                      class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
                      >{{ totalEvents }}</span
                    ><span class="text-sm text-blueGray-400">Events</span>
                  </div>
                  <div class="lg:mr-4 p-3 text-center">
                    <span
                      class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
                      >{{ totalBlogs }}</span
                    ><span class="text-sm text-blueGray-400">Blogs</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- {{ user }} -->
            <div class="text-center mt-12">
              <!-- img redounde full -->
              <img
                alt="..."
                :src="user.image"
                class="shadow-md rounded-full max-w-full mx-auto"
                style="max-width: 120px"
              />
              <h3
                class="text-4xl font-semibold leading-normal text-blueGray-700 mb-2"
              >
                {{ user.name + ' ' + user.lastname }}
              </h3>
              <div
                class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
              >
                <i
                  class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"
                ></i>
                {{ user.city }}
              </div>
              <div
                class="mb-2 text-blueGray-600"
                v-for="permission in user.permissions"
                :key="permission.index"
              >
                <i class="fa-solid fa-key mr-2 text-lg text-blueGray-400"></i
                >{{ permission }}
              </div>
            </div>
            <div
              class="mt-10 py-10 border-t border-blueGray-200 text-center"
              v-if="user.content"
            >
              <div class="flex flex-wrap justify-center">
                <div class="w-full lg:w-9/12 px-4">
                  <p
                    class="mb-4 text-lg leading-relaxed text-blueGray-700"
                    v-html="user.content"
                  ></p>
                </div>
              </div>
              <div class="flex">
                <div class="flex pb-4 m-auto">
                  <FacebookShareButton></FacebookShareButton>
                  <TwitterShareButton></TwitterShareButton>
                  <LinkedinShareButton></LinkedinShareButton>
                  <WhatsappShareButton></WhatsappShareButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
  import FeathersClient from '@/FeathersClient';
  import { mapActions } from 'vuex';
  import FacebookShareButton from '@/components/site/social/FacebookShareButton.vue';
  import TwitterShareButton from '@/components/site/social/TwitterShareButton.vue';
  import LinkedinShareButton from '@/components/site/social/LinkedinShareButton.vue';
  import WhatsappShareButton from '@/components/site/social/WhatsappShareButton.vue';
  export default {
    data() {
      return {
        user: {},
        totalProducts: 0,
        totalEvents: 0,
        totalBlogs: 0,
      };
    },
    async mounted() {
      this.fetchUser();
      this.fetchTotalProducts();
      this.fetchTotalEvents();
      this.fetchTotalBlogs();
    },
    methods: {
      ...mapActions(['loadingSet']),
      async fetchUser() {
        this.loadingSet(true);
        try {
          const user = await FeathersClient.service('users').get(
            this.$route.params.id,
          );
          this.user = user;
          this.loadingSet(false);
        } catch (error) {
          console.log(error);
          this.loadingSet(false);
        }
      },
      openEmailClient(email) {
        const mailtoLink = `mailto:${email}`;
        window.open(mailtoLink, '_blank');
      },
      //traer cantidad de productos
      //traer cantidad de eventos
      //traer cantidad de blogs

      async fetchTotalProducts() {
        try {
          const totalProducts = await FeathersClient.service('products').find({
            query: {
              user_id: this.$route.params.id,
            },
          });
          console.log(totalProducts.total);
          this.totalProducts = totalProducts.total;
        } catch (error) {
          console.log(error);
        }
      },
      async fetchTotalEvents() {
        try {
          const totalEvents = await FeathersClient.service('events').find({
            query: {
              user_id: this.$route.params.id,
            },
          });
          console.log(totalEvents.total);
          this.totalEvents = totalEvents.total;
        } catch (error) {
          console.log(error);
        }
      },
      async fetchTotalBlogs() {
        try {
          const totalBlogs = await FeathersClient.service('blogs').find({
            query: {
              user_id: this.$route.params.id,
            },
          });
          console.log(totalBlogs.total);
          this.totalBlogs = totalBlogs.total;
        } catch (error) {
          console.log(error);
        }
      },
    },
    components: {
      FacebookShareButton,
      TwitterShareButton,
      LinkedinShareButton,
      WhatsappShareButton,
    },
  };
</script>
