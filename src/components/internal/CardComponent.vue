<template>
  <div class="card-container">
    <a style="width: 100%" @click="this.$router.push({ path: `/${contentData.content_type}/${contentData.id}` })">
      <div class="card-top">
        <img
            :src="contentData.img_src"
            alt="thumbnail2410"
            class="card-film-icon"
            @error="replaceByDefault"
        />
        <div class="card-tag">
          <span class="card-genre Caption"><span>{{
              contentData.category.split(',').slice(0, 3).join(',')
            }}</span></span>
        </div>
      </div>
    </a>

    <div class="card-bottom">
      <div class="card-bottom-header">
        <div class="card-name">
          <span>{{ contentData.title }}</span>
          <div class="tooltip">{{ contentData.title }}</div>
        </div>
        <span class="card-description">
          <span style="overflow: hidden">{{ contentData.description }}</span>
        </span>
        <span class="card-extra-property">
          <span>{{ contentData.extra_prop.split(',')[0] }}</span>
        </span>
      </div>
      <div class="card-bottom-actions">
        <label class="label-select">Оценить
          <SelectionMark class="card-select rate-set"
              :contentType="ObjectType"
              :contentId="contentData.id"
              :ObjectAction="contentData.rating"
              />
        </label>
        <label class="label-select">Списки
          <SelectionContent :ObjectType="ObjectType" :ObjectId="contentData.id" :ObjectAction="contentData.action" class="card-select list-add"/>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import SelectionMark from "@/components/UI/SelectionMark.vue";
import SelectionContent from "@/components/UI/SelectionContent.vue";

const DEFAULT_IMG = "https://i.pinimg.com/originals/a6/15/46/a6154624251b16c421b23da5c9511000.jpg";

export class ContentData {
  constructor(id, type, img_src, alt_image, category, title, description, extra_prop, action, rating) {
    this.id = id;
    this.content_type = type;
    this.img_src = img_src;
    this.category = category ?? "";
    this.alt_image = alt_image;
    this.title = title;
    this.description = description;
    this.extra_prop = extra_prop ? extra_prop.toString() : "";
    this.action = action;
    this.rating = rating;
  }
}

export default {
  name: 'CardComponent',
  components: {SelectionContent, SelectionMark},
  props: {
    ObjectType: {
      type: String,
      required: true,
    },
    contentData: {
      type: ContentData,
      required: true
    }
  },
  methods: {
    replaceByDefault(e) {
      e.target.src = DEFAULT_IMG
    }
  }
}
</script>

<style scoped>
@import "~@/assets/css/styles.scss";
</style>