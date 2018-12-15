<template>
    <div>
        <div class="course-component">
            <h1 class="course-component__header">Rooms</h1>

            <div class="courses-component__form-wrapper">

                <form action="" @submit.prevent="addData" class="courses-form">

                    <h3>Add Room</h3>

                    <div class="courses__input-wrapper">
                        <label>Room number: </label><br>
                        <input type="text" v-model="number" placeholder="Number of the room" class="courses__input">
                    </div>

                    <div class="courses__input-wrapper">
                        <label>Room floor: </label><br>
                        <input type="number"
                               v-model="floor" placeholder="Floor of the room" class="courses__input">
                    </div>

                    <div class="courses__input-wrapper courses__button-wrapper">
                        <input type="submit" class="courses__button" value="Add">
                    </div>

                </form>
            </div>

            <hr>

            <ol class="list course-component__list">
                <li class="course-component__item" v-for="dat in data">
                    <ul class="list course-component__inner">
                        <li class="course-component__element"><span>id: </span> {{dat.id}}</li>
                        <li class="course-component__element"><span>number: </span> {{dat.number}}</li>
                        <li class="course-component__element"><span>floor: </span> {{dat.floor}}</li>
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
                resource: null,
                number: '',
                floor: 0
            }
        },
        props: {
            courseId: {}
        },
        methods: {
            getData() {
                this.resource = this.$resource('getrooms');
                this.resource.save({id: this.courseId}).then(
                    function(response){
                        this.data = response.data;
                    },
                    function(error){});
            },
            deleteData(event) {
                this.resource = this.$resource('deleteroom');
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
            },
            addData() {
                this.resource = this.$resource('addroom');
                this.resource.save({number: this.number, courseId: this.courseId, floor: this.floor}).then(
                    function(response) {

                        let tmp = [];
                        tmp.push(response.data);
                        for (let i = 0; i < this.data.length; i++) {
                            tmp.push(this.data[i]);
                        }
                        this.data = tmp;
                        this.number = '';
                        this.floor = 0;

                    }, function(error){}
                );
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

    .courses-component__form-wrapper {
        text-align: center;
    }
</style>