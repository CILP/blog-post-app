<template>
  <div id="createPostForm">
    <b-form>
      <b-form-group id="titleGroup"
        label="Post title:"
        label-for="title">
        <b-form-input id="title"
          v-model="form.title"
          type="text"
          required
          placeholder="Enter a title">
        </b-form-input>
      </b-form-group>

      <b-form-group id="contentGroup"
        label="Post content:"
        label-for="content">
        <b-form-textarea id="content"
          v-model="form.content"
          type="text"
          required
          :rows="3"
          :max-rows="12"
          placeholder="Enter the post content">
        </b-form-textarea>
      </b-form-group>

      <b-form-group id="authorGroup"
        label="Author name"
        label-for="author">
        <b-form-input id="author"
          v-model="form.author"
          type="text"
          required
          placeholder="Enter your name">
        </b-form-input>
      </b-form-group>
    </b-form>
    <b-btn class="mt-3" variant="outline-danger" @click="cancel">Cancel</b-btn>
    <b-btn class="mt-3" variant="success" @click="ok">Submit</b-btn>
  </div>
</template>

<script>
export default {
  name: 'CreatePostForm',
  data() {
    return {
      form: {
        title: '',
        content: '',
        author: ''
      }
    };
  },
  methods: {
    cancel: function() {
      this.$emit('cancel');
      this.reset();
    },
    ok: function() {
      this.$emit('ok', Object.assign({}, this.form));
      this.reset();
    },
    reset: function() {
      this.form.title = '';
      this.form.content = '';
      this.form.author = '';
    }
  }
}
</script>
