<template>

    <div class="course-component">
        <h1 class="course-component__header">Schedules</h1>

        <div class="course-component__button-wrapper">
            <button class="course-component__button" @click="addButton">Add Schedule</button>
        </div>

        <hr>

        <add-schedule v-if="isAdding" :getSchedule="getSchedule"
                      :courseId="courseId" :cancelAdding="cancelAdding"></add-schedule>

        <ol v-else class="list course-component__list">
            <li class="course-component__item" v-for="schedule in schedules">
                <ul class="list course-component__inner">
                    <li class="course-component__element"><span>Time: </span> {{schedule.time}}</li>
                    <li class="course-component__element"><span>Room: </span> {{schedule.room.number}}</li>
                    <li class="course-component__element"><span>Group: </span> {{schedule.group.name}}</li>
                    <li class="course-component__element"><span>Instructor: </span>
                        {{schedule.Instructor.firstName + " " + schedule.Instructor.secondName}}
                        ({{ schedule.Instructor.specialization }})
                    </li>
                </ul>
                <div class="course-component__delete-wrapper">
                    <button class="course-component__delete" @click="deleteData"
                            :value="schedule.id">Delete</button>
                </div>
            </li>
        </ol>

    </div>

</template>

<script>
    import AddSchedule from './AddSchedule'
    export default {
        data() {
            return {
                schedules: [],
                resource: null,
                isAdding: false
            }
        },
        components: {
          addSchedule: AddSchedule
        },
        props: {
            courseId: {}
        },
        methods: {
            getSchedule() {
                this.resource = this.$resource('getschedule');
                this.resource.save({id: this.courseId}).then(
                    function(response){
                        this.schedules = response.data;
                    },
                function(error){});
            },
            deleteData(event) {
                this.resource = this.$resource('deleteschedule');
                let id = +event.target.value;
                this.resource.save({id: id}).then(
                    function(response){
                        let tmp = [];
                        for (let i = 0; i < this.schedules.length; i++) {
                            if (this.schedules[i].id !== id)
                                tmp.push(this.schedules[i]);
                        }
                        this.schedules = tmp;
                    },
                function(error){});
            },
            addButton() {
                this.isAdding = true;
            },
            cancelAdding(value) {
                this.isAdding = value;
            }
        },
        created() {
            this.getSchedule();
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