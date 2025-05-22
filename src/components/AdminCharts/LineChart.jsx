import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
const LineChart = ({ response, chartId, name }) => {
            const data = response.map((item) => [
                new Date(item.year, item.month).getTime(),
                item[name],
            ]);

            const options = {
                series: [{ data: data }],
                options:{
                    chart: {
                        type: "line",
                        height: 350,
                        zoom: { enabled: false },
                        toolbar: { show: false },
                    },
                    dataLabels: { enabled: false },
                    stroke: { curve: "smooth", width: 2 },
                    xaxis: {
                        type: "datetime",
                        labels: {
                            datetimeFormatter: {
                                year: "yyyy",
                                month: "MMM 'yy",
                            },
                        },
                    },
                    yaxis: { type: "numeric", decimalsInFloat: 2 },
                    tooltip: { x: { format: "MMM yyyy" } },
                    fill: {
                        colors: ["#4CAF50"],
                        type: "line",
                        gradient: {
                            shadeIntensity: 1,
                            opacityFrom: 0.5,
                            opacityTo: 0.7,
                            stops: [100, 100],
                        },
                    },
                }
            };
        

    return (
        <div className="mx-auto max-w-2xl">
            <div id={chartId}>
                <ReactApexChart options={options.options} series={options.series} type="line" height={350} />
                
            </div>
        </div>
    );
};

export default LineChart;