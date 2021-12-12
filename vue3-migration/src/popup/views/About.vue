<template>
  <div class="about">
    <p>
      <a target="_blank" type="primary" :href="srcCodeURL">Source Code on GitHub</a>
    </p>
    <p>
      <a target="_blank" type="primary" :href="HuakunShenGitHubURL">Author: Huakun Shen</a>
    </p>
  </div>
</template>

<script lang="ts">
import { srcCodeURL, HuakunShenGitHubURL } from '../../core/constants';
export default {
  data: () => {
    return {
      srcCodeURL,
      HuakunShenGitHubURL,
    };
  },
};
</script>
