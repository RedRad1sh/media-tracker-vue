<template>
    <transition>
        <div v-if="show" class='modal-shadow'>
            <div class="recommendations-help modal">
                <div class='modal-title'>Как настроить систему рекомендаций?</div>
                <div class="modal-content help-description">
                    <span>
                        1. Выберите списки, на основе которых будут формироваться
                        рекомендации (пункт "Учитываемые списки")
                    </span>
                    <br />
                    <span>
                        2. Выберите тип контента для рекомендаций.
                    </span>
                    <br />
                    <span>
                        3. Добавьте фильтрацию по жанрам и годам выпуска
                    </span>
                    <br />
                    <span>Нажмите кнопку “Сформировать рекомендации”</span>
                </div>
                <div class="modal-footer">
                    <button class="modal-footer__button" @click="closeModal">
                        Ок
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'HelpComponentModal',
    data: function () {
        return {
            show: false
        }
    },
    methods: {
        closeModal: function () {
            this.show = false
        }
    }
}
</script>
<style scoped lang="scss">
.recommendations-help {
    color: #e4e5f4;
    height: auto;
    font-size: 22px;
    max-width: fit-content;
    text-align: center;
    margin: 15px 0 10px 10px;
}

.help-description {
    font-weight: 200;
    font-size: 16px;
    display: grid;
    text-align: left;
    margin-left: 10px;
    margin-top: 10px;
}
.modal-shadow {
    position: fixed;
    top: 0;
    left: 0;
    min-height: 100vh;
    width: 100%;
    background: rgba(0, 0, 0, 0.39);
    z-index: 100000;
}

.modal {
    background: #150c16;
    border-radius: 8px;
    padding: 15px;
    min-width: 520px;
    max-width: 60%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 200;

    &-title {
        margin-top: 10px;
        color: #ffdace;
    }

    &-content {
        margin-bottom: 20px;
        margin-top: 20px
    }

    &-footer {
        &__button {
            background-color: #0971c7;
            color: #fff;
            border: none;
            text-align: center;
            padding: 8px;
            font-size: 17px;
            font-weight: 500;
            border-radius: 8px;
            min-width: 150px;
        }
    }
}
</style>