<template>
  <div class="sliderItems" v-for="gift in gifts" :key="gift.id">
    <img
      class="sliderItemImg"
      :src="require(`@/assets/gifts/gift${gift.id}.png`)"
      alt="gift"
    />
    <span class="sliderItemTitle">{{ gift.title }}</span>
  </div>
</template>

<script>
export default {
  name: 'SliderItems',
  data() {
    return {
      gifts: [
        {
          id: 1,
          title: 'tulip nft art',
        },
        {
          id: 2,
          title: 'rose nft art',
        },
        {
          id: 3,
          title: 'mimosa nft art',
        },
        {
          id: 4,
          title: 'lotus nft art',
        },
        {
          id: 5,
          title: 'Lily of the valley nft art',
        },
        {
          id: 6,
          title: 'cornflower nft art',
        },
      ],
    };
  },
};
</script>

<style lang="stylus" scoped>
.sliderItems {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 0;
  box-sizing: border-box;
  width: 150px;
  height: 200px;
  background: rgba(3, 1, 6, 0.2);
  border-radius: 8px;
  border: 1px solid lightgrey;
}

.sliderItemImg {
  display: block;
  margin-bottom: 10px;
  width: 100%;
}

.sliderItemTitle {
  text-align: center;
  text-transform: uppercase;
  font-size: 9px;
  line-height: 12px;
}
</style>
