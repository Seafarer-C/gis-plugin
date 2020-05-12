<template>
  <div class="gis-form-title">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'gisFormTitle',
  props: {
    title: String,
    buttons: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style>
</style>