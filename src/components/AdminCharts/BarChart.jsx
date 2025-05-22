import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
const BarChart = ({ response, chartId, factor, name }) => {
            const labels = response.map((item) => item[factor]);
            const data = response.map((item) => item[name]);

            const options = {
                series: [{ data: data }],
                options:{
                    chart: {
                        type: "bar",
                        height: 350,
                      },
                      xaxis: {
                        categories: labels,
                      },
                      theme: {
                        monochrome: {
                          enabled: true,
                          color: "#4CAF50",
                          shadeTo: "light",
                          shadeIntensity: 1,
                        },
                      },
                      tooltip: {
                        y: {
                          formatter: (value) => value.toFixed(2),
                        },
                      },
                }
            };
        

    return (
        <div className="mx-auto max-w-2xl">
            <div id={chartId}>
                <ReactApexChart options={options.options} series={options.series} type="bar" height={350} />
                
            </div>
        </div>
    );
};

export default BarChart;