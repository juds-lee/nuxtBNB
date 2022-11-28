import Vue from 'vue'
import VCalendar from 'v-calendar';
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

Vue.use(VCalendar, {
    componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
    ...,                // ...other defaults
  });
Vue.component('date-picker', DatePicker)