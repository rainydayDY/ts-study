/**
* svg图标组件
* @author dongyu
* @createDate 2018/03/09
*/
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SvgIcon extends Vue {
  @Prop({required: true}) private iconClass!: string;
  @Prop() private className!: string;

  get iconName(): string {
      return `#icon-${this.iconClass}`;
  }

  get svgClass(): string {
    return this.className ? 'svg-icon ' + this.className : 'svg-icon';
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
