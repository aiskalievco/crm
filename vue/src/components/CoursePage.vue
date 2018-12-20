<template>
    <div class="course-page">
        <div class="course-page__menu-wrapper">
            <ul class="list course-page__menu">
                <router-link class="course-page__item" active-class="active"
                             :to="{name: 'schedule'}" tag="li">
                    <a class="link course-page__link">Schedules</a>
                </router-link>
                <router-link class="course-page__item" active-class="active"
                             :to="{name: 'group'}" tag="li">
                    <a class="link course-page__link">Groups</a>
                </router-link>
                <router-link class="course-page__item" active-class="active"
                             :to="{name: 'room'}" tag="li">
                    <a class="link course-page__link">Rooms</a>
                </router-link>
                <router-link class="course-page__item" active-class="active"
                             :to="{name: 'instructor'}" tag="li">
                    <a class="link course-page__link">Instructors</a>
                </router-link>
            </ul>
        </div>

        <router-link class="course-page__item course-page__item--new"
                     to="/" tag="div">
            <a class="link course-page__link">&larr; Back to Courses</a>
        </router-link>

        <router-view :courseId="id"></router-view>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                id: +this.$route.params['id']
            }
        },
        watch: {
            $route(toR, fromR) {
                this.id = toR.params['id'];
            }
        }
    }
</script>

<style scoped>

    .list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .course-page__menu {
        display: flex;
    }

    .course-page__item {
        padding: 10px;
        background: #0069ff;
        color: #fff;
        font-size: 18px;
        border-right: 1px solid #fff;
    }

    .course-page__item:hover {
        background: mediumblue;
    }

    .course-page__link {
        display: inline-block;
        vertical-align: top;
        width: 100%;
    }

    .link {
        color: inherit;
        text-decoration: none;
    }

    .course-page__menu-wrapper {
        margin-bottom: 20px;
    }

    .active {
        background: mediumblue;
    }

    .course-page__item--new {
        display: inline-block;
        border-radius: 20px;
    }

</style>