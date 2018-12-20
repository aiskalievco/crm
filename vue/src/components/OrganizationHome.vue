<template>
    <div>

        <form action="" @submit.prevent="addCourse" class="courses-form">

            <h3>Add course</h3>

            <div class="courses__input-wrapper">
                <label>Course name: </label><br>
                <input type="text" v-model="name" placeholder="Name of the course" class="courses__input">
            </div>

            <div class="courses__input-wrapper">
                <label>Course Description: </label><br>
                <input type="text" v-model="desc" placeholder="Description" class="courses__input">
            </div>

            <div class="courses__input-wrapper courses__button-wrapper">
                <input type="submit" class="courses__button" value="Add">
            </div>

        </form>

        <hr>

        <div class="courses-list__wrapper">
            <h3>Course list</h3>
            <ul class="list courses-list">
                <li v-for="course in courses" class="courses-list__item">
                    <ul class="list courses-list__info">
                        <li><span>Name: </span> {{ course.name }}</li>
                        <li><span>Description: </span> {{ course.description }}</li>
                        <li><button @click.prevent="deleteCourse"
                                    class="course-delete" :value="course.id">delete</button>
                            <router-link :to="generateLink(course.id)"
                                         class="link course-delete course-more">more</router-link></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Course from '../store/entities/Course'
    export default {
        data() {
            return {
                name: '',
                desc: '',
                resource: null
            };
        },
        methods: {
            addCourse() {
                let name = this.name;
                let des = this.desc;

                this.resource = this.$resource('addcourse');
                let dataToSend = {
                    name: name,
                    description: des,
                    organizationId: this.companyId
                };

                this.resource.save(dataToSend).then(function(response) {
                    this.clearCourse();
                    let courses = this.courses;
                    let tmp = [];
                    tmp.push(new Course(response.data.id, response.data.name, response.data.description));
                    for(let i = 0; i < courses.length; i++) {
                        tmp.push(courses[i]);
                    }
                    this.$store.commit('setCourses', tmp);
                }, function(error){});
            },
            deleteCourse(event) {
                let id = +event.target.value;
              this.resource = this.$resource('deletecourse');
              this.resource.save({id: id}).then(function(response){
                    this.deleteFromStore(id);
                  },
              function(error){});
            },
            clearCourse() {
                this.name = '';
                this.desc = '';
            },
            deleteFromStore(id) {
                let courses = this.courses;
                let tmp = [];
                for (let i=0; i < courses.length; i++) {
                    if (courses[i].id !== id)
                        tmp.push(courses[i]);
                }
                this.$store.commit('setCourses', tmp);
            },
            generateLink(id) {
                return '/course/' + id + '/schedule';
            }
        },
        computed: {
            courses() {
                return this.$store.getters.getCourses;
            },
            companyId() {
                return this.$store.getters.getCompanyId;
            }
        }
    }
</script>

<style scoped>

    .courses-form {
        max-width: 600px;
        margin: 0 auto;
        text-align: left;
        display: inline-block;
        padding: 20px;
        background: #f1f1f1;
        margin-bottom: 20px;
    }

    .courses-form h3 {
        font-size: 26px;
        margin: 10px;
        text-align: center;
        margin-top: 0;
    }

    .courses__input-wrapper {
        margin-bottom: 10px;
    }

    .courses__input-wrapper label {
        font-weight: normal;
        font-size: 18px;
        display: inline-block;
        margin-bottom: 5px;
    }

    .courses__input {
        box-sizing: border-box;
        padding: 8px 20px;
        border-radius: 20px;
        outline: none;
        border: 1px solid #000;
        font-size: 17px;
    }

    .courses__button {
        outline: none;
        padding: 8px;
        min-width: 100px;
        background: #0069ff;
        color: #fff;
        border: 1px solid #0069ff;
        border-radius: 20px;
        cursor: pointer;
    }

    .courses__button-wrapper {
        text-align: center;
    }

    .list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .courses-list__wrapper {
        text-align: center;
    }

    .courses-list {
        display: inline-block;
        text-align: left;
    }

    .courses-list__item {
        margin-bottom: 20px;
        padding: 10px;
        background: #f1f1f1;
    }

    .courses-list__info li {
        font-weight: normal;
        font-size: 18px;
        margin-bottom: 5px;
    }

    .courses-list__info li span {
        font-weight: bold;
    }

    .course-delete {
        outline: none;
        padding: 8px;
        min-width: 100px;
        text-transform: capitalize;
        background: #0069ff;
        color: #fff;
        border: 1px solid #0069ff;
        border-radius: 20px;
        cursor: pointer;
        margin-top: 5px;
    }

    .courses-list__wrapper h3 {
        font-size: 25px;
        margin: 20px;
    }

    .link {
        text-decoration: none;
        color: inherit;
    }

    .course-more {
        color: #fff;
        font-size: 16px;
        min-width: 60px;
        display: inline-block;
        vertical-align: top;
        text-align: center;
    }

</style>