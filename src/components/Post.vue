<template>
  <div class="post" @click="postClick">
    <b-card>
      <h4 class="card-title">
        {{post.title}}
      </h4>
      <p class="card-text">
        <small class="text-muted">{{post.author}}</small>
      </p>
      <b-badge variant="success" @click="edit($event)">Edit</b-badge>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Post',
  methods: {
    edit(event) {
      event.stopPropagation();
      this.$emit('edit', this.post._id);
    },
    postClick() {
      this.$emit('postClick', this.post._id);
    }
  },
  props: ['post']
};
</script>

<style scoped>
  div.post {
    cursor: pointer;
  }
</style>

