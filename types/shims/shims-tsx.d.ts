import Vue, { VNode } from 'vue';
import { ComponentRenderProxy } from '@vue/composition-api';

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends ComponentRenderProxy {}
    interface ElementAttributesProperty {
      // eslint-disable-next-line @typescript-eslint/ban-types
      $props: any;
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    [propName: string]: any;
  }
}
