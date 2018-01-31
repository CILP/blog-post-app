<template>
  <div id="postContent" class="postContent">
    <h1 class="title">{{post.title}}</h1>
    <p class="content">{{post.content}}</p>
    <b-btn class="mt-3" variant="success" block @click="close">Close</b-btn>
  </div>
</template>

<script>
export default {
  name: 'PostContent',
  props: ['post'],
  methods: {
    close: function() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
  .postContent {
    text-align: left;
  }
</style>

