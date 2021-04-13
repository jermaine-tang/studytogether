import { Bar, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;


export default {
    extends: Bar,
    mixins: [reactiveProp],
    // props:['chartData','options'],
    data: function () {
      return {
          
          options: {
              legend: { display: false },
              title: {
                display: true,
                text: 'Total Monthly Spendings on Bookings (Time)'
              },
              responsive: true,
              maintainAspectRatio: false
          }
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
}