<template>
  <div class="home">
    <b-alert 
      class="mt-3"
      :show="message.success.show" 
      @dismissed="message.success.show = false" 
      variant="success" dismissible>
      {{message.success.text}}
    </b-alert>

    <b-alert
      class="mt-3"
      :show="message.error.show"
      @dismissed="message.error.show = false"
      variant="danger" dismissible>
      {{message.error.text}}
    </b-alert>

    <div class="cards">
      <b-card-group columns>
        <post v-for="post in posts"
          :post="post"
          :key="post._id"
          @postClick="openPost(post._id)"
          @edit="showEditPost(post._id)">
        </post>
      </b-card-group>
    </div>

    <b-button
      @click="showModal"
      v-b-tooltip.hover
      title="Add new Post"
      variant="success"
      class="fixed add">+
    </b-button>

    <b-modal ref="createModalRef" hide-footer title="Create blogpost">
      <create-post-form
        @cancel="hideModal()" 
        @ok="createBlogPost($event)">
      </create-post-form>
    </b-modal>

    <b-modal ref="editModalRef" hide-footer title="Edit blogpost">
      <edit-post-form
        :post="selectedPost"
        @cancel="hideEditPost()" 
        @ok="editBlogPost($event)">
      </edit-post-form>
    </b-modal>

    <b-modal ref="seeContentModalRef" hide-footer :title="selectedPost.author">
      <post-content
        :post="selectedPost"
        @close="closePost">
      </post-content>
    </b-modal>
  </div>
</template>

<script>
import Post from './Post.vue';
import CreatePostForm from '../shared/components/CreatePostForm.vue';
import EditPostForm from '../shared/components/EditPostForm.vue';
import PostContent from '../shared/components/PostContent.vue';

export default {
  name: 'Home',
  data() {
    return {
      posts: [],
      selectedPost: {},
      message: {
        success: {
          show: false,
          text: ''
        },
        error: {
          show: false,
          text: ''
        }
      }
    };
  },
  methods: {
    getPosts() {
      this.$http.get('http://localhost:3000/api/post').then(result => {
        this.posts = result.body.data.posts;
      });
    },
    showModal () {
      this.$refs.createModalRef.show()
    },
    hideModal () {
      this.$refs.createModalRef.hide()
    },
    closePost() {
      this.$refs.seeContentModalRef.hide();
    },
    openPost(id) {
      this.selectedPost = this.posts.find(p => p._id === id);
      this.$refs.seeContentModalRef.show();
    },
    showEditPost(id) {
      this.selectedPost = Object.assign({}, this.posts.find(p => p._id === id));
      this.$refs.editModalRef.show();
    },
    hideEditPost() {
      this.$refs.editModalRef.hide();
    },
    createBlogPost(post) {
      this.$http.post('http://localhost:3000/api/post', post, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': 'secret'
        }
      }).then(result => {
        const { success, message } = result.body;
        if (success) {
          this.message.success.text = message;
          this.message.success.show = true;
        } else {
          this.message.error.text = message;
          this.message.error.show = true;
        }

        this.getPosts();
        this.hideModal();
      });
    },
    editBlogPost(post) {
      const { title, content, author, _id } = post;
      this.$http.patch(`http://localhost:3000/api/post/${_id}`, {title, content, author}, {
        'Content-Type': 'application/json'
      }).then(result => {
        const { success, message } = result.body;
        if (success) {
          this.message.success.text = message;
          this.message.success.show = true;
        } else {
          this.message.error.text = message;
          this.message.error.show = true;
        }

        this.getPosts();
        this.hideEditPost();
      });
    }
  },
  mounted() {
    this.getPosts();
  },
  components: { Post, CreatePostForm, PostContent, EditPostForm }
};
</script>

<style scoped>
  div.cards {
    margin-top: 20px;
  }

  .fixed.add {
    position: fixed;
    right: 23px;
    bottom: 23px;
    width: 55px;
    height: 55px;
    border-radius: 50%;

    font-size: xx-large;
    padding: 0;
  }
</style>

<style>
  form .col-form-label {
    float: left;
  }
</style>

