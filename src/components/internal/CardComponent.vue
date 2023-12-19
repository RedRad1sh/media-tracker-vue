<template lang="">
    <div class="card-container">
        <a href="film-page.html" style="width: 100%" @click="this.$router.push({ path: '/FilmPage' })">
                    <div class="card-top">
                        <img
                                :src="contentData.img_src"
                                alt="thumbnail2410"
                                class="card-film-icon"
                                :onerror="contentData.alt_image"
                        />
                        <div class="card-tag">
                            <span class="card-genre Caption"><span>{{contentData.category}}</span></span>
                        </div>
                    </div>
                </a>

                <div class="card-bottom">
                    <div class="card-bottom-header">
                  <div class="card-name">
                    <span>{{contentData.title}}</span>
                    <div class="tooltip">{{contentData.title}}</div>
                  </div>
                        <span class="card-description">
                    <span style="overflow: hidden">
                        {{contentData.description}}
                    </span>
                  </span>
                        <span class="card-extra-property">
                    <span>{{contentData.extra_prop}}</span>
                  </span>
                    </div>
                    <div class="card-bottom-actions">
                        <label class="label-select">Оценить
                            <SelectionMark class="card-select rate-set"/>
                        </label>
                        <label class="label-select">Списки
                            <SelectionContent :ObjectType="ObjectType" class="card-select list-add"/>
                        </label>
                    </div>
                </div>
    </div>
</template>
<script>
import SelectionMark from "@/components/UI/SelectionMark.vue";
import SelectionContent from "@/components/UI/SelectionContent.vue";

export class ContentData {
    constructor(img_src, alt_image, category, title, description, extra_prop) {
        this.img_src = img_src;
        this.category = category;
        this.alt_image = alt_image;
        this.title = title;
        this.description = description;
        this.extra_prop = extra_prop;
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
            type: Object,
            required: true
        }
    }
}
</script>
<style>
@import "~@/assets/css/styles.scss";
</style>