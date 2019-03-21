<template>
  <div class="sea">
    <p class="title">resume</p>
    <span class="wave" v-for="n in 3" :key="n"></span>
  </div>
</template>

<script>
export default {
  name: "sea"
};
</script>

<style lang="stylus" scoped>
.sea
  --sea-s 150px
  --wave-s 500px
  position relative
  width var(--sea-s)
  height var(--sea-s)
  margin-bottom 25px
  border-radius 5px
  background-color whitesmoke
  background-image linear-gradient( darkblue, rgba(255, 255, 255, 0) 80%, rgba(255, 255, 255, 0.5))
  box-shadow 2px 5px 30px rgba(0, 0, 0, 0.2)
  overflow hidden
  display flex
  .title
    position absolute
    z-index 1
    width 100%
    text-align center
    margin-top 40%
    color #fff
    font-size 36px
    letter-spacing 2px
    text-transform uppercase
  .wave
    position absolute
    width var(--wave-s)
    height var(--wave-s)
    background-color deepskyblue
    left calc(-1 * (var(--wave-s) - var(--sea-s)) / 2)
    top calc((var(--sea-s) - var(--wave-s)) - 50px)
    filter opacity(0.4)
    border-radius 43%
    animation drift linear infinite
    animation-duration 5s
    &:nth-of-type(1)
      animation-duration 5s
    &:nth-of-type(2)
      animation-duration 7s
    &:nth-of-type(3)
      animation-duration 9s
      background-color red
      filter opacity(0.1)

@keyframes drift {
  from {
    transform rotate(360deg)
  }
}
</style>
