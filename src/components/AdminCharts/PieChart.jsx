import ReactApexChart from 'react-apexcharts';
const PieChart = ({ response, chartId, factor, name }) => {
            const labels = response.map((item) => item[factor]);
            const data = response.map((item) => item[name]);


            const options = {
                series:  data,
                options:{
                    chart: {
                        type: "pie",
                        height: 350,
                    },
                    labels: labels,
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
                <ReactApexChart options={options.options} series={options.series} type="pie" height={350} />
                
            </div>
        </div>
    );
};

export default PieChart;