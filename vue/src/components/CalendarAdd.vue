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
                let isSubscribe = confirm("Are you want to subscribe to that group?");
                if (isSubscribe) {
                    this.resource = this.$resource('signupgroup');
                    this.resource.save({userId: this.person.id, groupId: event.YOUR_DATA.groupId}).then(
                        function(response) {
                            alert("You've benn successfully added to the course-group");
                            this.$router.push('/');
                        }, function(error){}
                    );
                }
                console.log(event);
            },
            goBack() {
                this.$router.push('/');
            },
            loadEvents() {
                this.resource = this.$resource('getschedule');
                this.resource.save({id: this.id}).then(
                    function (response) {
                        let temp = [];
                        response.data.forEach(function(el, ind){
                            let date = moment(el.time.split(' ')[0], 'DD.MM.YYYY');
                            temp.push({title: "Inst: "+el.Instructor.firstName+' '+el.Instructor.secondName,
                                start: date, YOUR_DATA: {
                                    groupId: el.group.id
                                }});
                        });
                        this.events = temp;
                    }, function(error){}
                );
            }
        },
        computed: {
          person() {
              return this.$store.getters.getCurrentPerson;
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