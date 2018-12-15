<template>
    <div>
        <div class="course-component">
            <h1 class="course-component__header">Instructors</h1>

            <div class="course-component__button-wrapper">
                <button class="course-component__button">Add Instructor</button>
            </div>

            <hr>

            <ol class="list course-component__list">
                <li class="course-component__item" v-for="dat in data">
                    <ul class="list course-component__inner">
                        <li class="course-component__element"><span>id: </span> {{dat.id}}</li>
                        <li class="course-component__element">
                            <span>First Name: </span> {{dat.firstName}}</li>
                        <li class="course-component__element">
                            <span>Second name: </span> {{dat.secondName}}</li>
                        <li class="course-component__element">
                            <span>Specialization: </span> {{dat.specialization}}</li>
                    </ul>
                    <div class="course-component__delete-wrapper">
                        <button class="course-component__delete" @click="deleteData"
                                :value="dat.id">Delete</button>
                    </div>
                </li>
            </ol>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: [],
                resource: null
            }
        },
        props: {
            courseId: {}
        },
        methods: {
            getData() {
                this.resource = this.$resource('getinstructors');
                this.resource.save({id: this.courseId}).then(
                    function(response){
                        this.data = response.data;
                    },
                    function(error){});
            },
            deleteData(event) {
                this.resource = this.$resource('deleteinstructor');
                let id = +event.target.value;
                this.resource.save({id: id}).then(
                    function(response){
                        let tmp = [];
                        for (let i = 0; i < this.data.length; i++) {
                            if (this.data[i].id !== id)
                                tmp.push(this.data[i]);
                        }
                        this.data = tmp;
                    },
                    function(error){});
            }
        },
        created() {
            this.getData();
        }
    }
</script>

<style scoped>
    .course-component__button-wrapper {
        margin-bottom: 20px;
    }

    .course-component__button {
        outline: none;
        padding: 8px;
        min-width: 100px;
        text-transform: capitalize;
        background: #0069ff;
        color: #fff;
        border: 1px solid #0069ff;
        border-radius: 20px;
        cursor: pointer;
    }

    .list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .course-component__list {
        list-style: decimal;
        margin-left: 20px;
    }

    .course-component__item {
        margin-bottom: 10px;
        padding: 10px;
        background: #f1f1f1;
        display: flex;
        justify-content: space-between;
    }

    .course-component__item span {
        font-weight: bold;
    }

    .course-component__delete {
        outline: none;
        padding: 8px;
        min-width: 70px;
        text-transform: capitalize;
        background: #0069ff;
        color: #fff;
        border: 1px solid #0069ff;
        border-radius: 20px;
        cursor: pointer;
    }
</style>