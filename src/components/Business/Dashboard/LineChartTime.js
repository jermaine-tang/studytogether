import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  data: function () {
    return {
        
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: ''
            },
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                line: {
                    fill: false
                }
            }
        }
    }
  },
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
}
