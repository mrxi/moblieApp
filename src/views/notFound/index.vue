<template>
<!-- <van-empty
  :image="mapImg"
  image-size="90%"
/> -->
<img :src="mapImg" alt="" srcset="" class="img">
</template>
<script setup>
  import mapImg from '@/assets/notFound.png'
</script>

<style  scoped>
.img{
width: 100%;
height: 90vh;
}
</style>
