<template>
    <div class="user-home">

        <h2 class="user-home__greeting">Hello {{ person.login }}</h2>

        <div class="user-home__input-wrapper">
            <input v-model="pattern" @keyup="search"
                   type="text" placeholder="Search for courses" class="user-home__input">
        </div>

        <h3 v-if="isSearching" class="user-home__search-header">Search results for
            <span>{{ pattern }}</span></h3>


        <div v-if="isSearching" class="user-home__search-result">

            <ul v-if="courses.length" class="list user-home__search-blocks">
                <li v-for="course in courses">
                    <router-link :to="{name: 'calendaradd', params: {id: course.id}}" class="link search-block">
                        <h3 class="search-block__header">{{ course.name }}</h3>
                        <p class="search-block__text">
                            {{ course.description }}
                        </p>
                    </router-link>
                </li>
            </ul>

            <div v-else class="search-block__none">
                Nothing found on this pattern. Please try again!
            </div>

        </div>

        <div v-else class="user-home__group-result">
            <h2 class="user-home__header">Enrolled courses: </h2>

            <ul class="list user-home__groups">
                <li v-for="group in groups" class="user-home__group">
                    <router-link :to="{name: 'calendar', params: {id: group.id}}" class="link user-home__group-inner">
                        <h3 class="user-home__group-header">{{ group.course.name + ' - ' + group.name }}</h3>
                        <p class="user-home__group-text">
                            {{ group.course.description }}
                        </p>
                    </router-link>
                </li>
            </ul>

        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                pattern: '',
                isSearching: false,
                courses: [],
                resource: null
            }
        },
        methods: {
            search() {
                if (this.pattern) {
                    this.isSearching = true;
                    this.resource = this.$resource('searchcourses');
                    this.resource.save({pattern: this.pattern}).then(
                        function (response) {
                            this.courses = response.data;
                        }, function (error) {}
                    );
                } else this.isSearching = false;
            }
        },
        computed: {
            groups() {
                return this.$store.getters.getGroups;
            },
            person() {
                return this.$store.getters.getCurrentPerson;
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

    .user-home {
        padding: 20px 0;
    }

    .user-home__input-wrapper {
        margin-bottom: 25px;
    }

    .user-home__input {
        outline: none;
        padding: 13px;
        font-size: 18px;
        width: 65%;
        box-sizing: border-box;
        border: 1px solid lightgray;
        box-shadow: 2px 2px 10px lightgray;
    }

    .user-home__groups {
        border: 2px dashed #0069ff;
        width: 65%;
        box-sizing: border-box;
        padding: 20px;
        margin: 0 auto;
        padding-bottom: 0;
    }

    .user-home__group {
        margin-bottom: 20px;
        width: 100%;
    }

    .user-home__group-inner {
        background: #f1f1f1;
        padding: 10px 30px;
        box-sizing: border-box;
        width: 100%;
        vertical-align: top;
        display: block;
        margin: 0 auto;
    }

    .user-home__group-inner:hover {
        background: #e8e8e8;
    }

    .user-home__group-header {
        margin: 10px 0;
        font-size: 23px;
    }

    .user-home__group-text {
        margin: 0;
        padding-bottom: 10px;
        font-weight: normal;
        font-size: 18px;
        font-style: italic;
    }

    .link {
        color: inherit;
        text-decoration: none;
        cursor: pointer;
    }

    .user-home__header {
        font-size: 30px;
        margin: 0;
        margin-bottom: 20px;
    }

    .user-home__greeting {
        margin: 20px;
        margin-top: 0;
        font-size: 40px;
    }

    .user-home__search-header {
        margin: 20px;
        font-size: 28px;
        font-weight: normal;
    }

    .user-home__search-header span {
        text-decoration: underline;
    }

    .search-block {
        box-sizing: border-box;
        display: block;
        padding: 10px;
        background: #0069ff;
        color: #ffffff;
        margin-bottom: 20px;
        box-shadow: 5px 8px 10px lightgray;
    }

    .search-block__header {
        margin: 20px;
        font-size: 25px;
        padding-bottom: 10px;
        border-bottom: 2px solid #ffffff;
    }

    .search-block__text {
        font-size: 18px;
        font-weight: normal;
        margin: 0;
        margin-bottom: 20px;
    }

    .user-home__search-blocks {
        display: flex;
        justify-content: center;
    }

    .user-home__search-blocks li {
        width: 32%;
        margin-right: 3%;
    }

    .user-home__search-blocks li:last-child {
        margin-right: 0;
    }

    .search-block__none {
        color: grey;
        font-weight: normal;
        font-size: 25px;
        margin: 20px;
    }

</style>