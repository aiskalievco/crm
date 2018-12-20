<template>
    <div>
        <button @click.prevent="goBack" class="calendar-button">&larr; Go Back</button>
        <full-calendar :events="events" @eventClick="eventClick"></full-calendar>
    </div>
</template>

<script>
    import FullCalendar from 'vue-fullcalendar'
    import moment from 'moment'
    export default {
        data() {
            return {
                events: [],
                resource: null
            }
        },
        props: {
            id: {}
        },
        components: {
            fullCalendar: FullCalendar
        },
        methods: {
            eventClick(event, jsEvent, pos) {
                console.log(event);
            },
            goBack() {
                this.$router.push('/');
            },
            loadEvents() {
                this.resource = this.$resource('getgroupschedule');
                this.resource.save({id: this.id}).then(
                    function (response) {
                        let temp = [];
                        response.data.forEach(function(el, ind){
                            let date = moment(el.time.split(' ')[0], 'DD.MM.YYYY');
                            temp.push({title: "room: "+el.room.number, start: date});
                        });
                        this.events = temp;
                    }, function(error){}
                );
            }
        },
        mounted() {
            this.loadEvents();
        }
    }
</script>

<style scoped>

    .calendar-button {
        outline: none;
        border: 1px solid #0069ff;
        background: #0069ff;
        color: white;
        padding: 10px;
        font-weight: bold;
        cursor: pointer;
    }

</style>