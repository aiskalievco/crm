<template>
    <div class="courses-component__form-wrapper">

        <form action="" @submit.prevent="addData" class="courses-form">

            <h3>Add Schedule</h3>

            <div class="courses__input-wrapper">
                <label>Time: </label><br>
                <input type="datetime-local" v-model="time" placeholder="First name" class="courses__input">
            </div>

            <div class="courses__input-wrapper">
                <label>Select group: </label><br>
                <select v-model="selectedGroup" placeholder="Group" class="courses__input">
                    <option v-for="group in groups" :value="group.id">{{group.name}}</option>
                </select>
            </div>

            <div class="courses__input-wrapper">
                <label>Select room: </label><br>
                <select v-model="selectedRoom" placeholder="Rooms" class="courses__input">
                    <option v-for="room in rooms" :value="room.id">{{room.number}}</option>
                </select>
            </div>

            <div class="courses__input-wrapper">
                <label>Select Instructor: </label><br>
                <select v-model="selectedInstructor" placeholder="Instructors" class="courses__input">
                    <option v-for="instructor in instructors"
                            :value="instructor.id">{{instructor.firstName + " " + instructor.secondName}}
                    </option>
                </select>
            </div>

            <div class="courses__input-wrapper courses__button-wrapper">
               <button @click.prevent="cancelAdd" class="courses__button">Cancel</button>
                <input type="submit" class="courses__button" value="Add">
            </div>

        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                time: '',
                groups: [],
                rooms: [],
                instructors: [],
                selectedGroup: 'groups',
                selectedRoom: 'rooms',
                selectedInstructor: 'instructors',
                resource: null
            }
        },
        props: {
            courseId: {},
            cancelAdding: {},
            getSchedule: {}
        },
        methods: {
            addData() {
                this.resource = this.$resource('createschedule');
                this.resource.save({time: this.time, roomId: +this.selectedRoom,
                courseId: this.courseId, groupId: +this.selectedGroup,
                instructorId: +this.selectedInstructor}).then(function(response){
                    this.getSchedule();
                    this.cancelAdd();
                },function(error){});

            },
            cancelAdd() {
                this.clear();
                this.cancelAdding(false);
            },
            clear() {
                this.time = '';
                this.selectedGroup = '';
                this.selectedInstructor = '';
                this.selectedRoom = '';
                this.resource = null;
            },
            loadData() {
                this.resource = this.$resource('getgroups');
                this.resource.save({id: this.courseId}).then(function(response){
                    this.groups = response.data;
                }, function(error){});

                this.resource = this.$resource('getrooms');
                this.resource.save({id: this.courseId}).then(function(response){
                    this.rooms = response.data;
                }, function(error){});

                this.resource = this.$resource('getinstructors');
                this.resource.save({id: this.courseId}).then(function(response){
                    this.instructors = response.data;
                }, function(error){});
            }
        },
        created() {
            this.loadData();
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

    .courses-component__form-wrapper {
        text-align: center;
    }
</style>