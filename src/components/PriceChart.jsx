import { useEffect, useState } from 'react';

import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

const PriceChart = ({ response, number=0 }) => {

    const data = response.data.prices.map((item) => [new Date(item.date).getTime(), item.price.toFixed(3)]);
    const options = {
        series: [{ data: data }],
        options:{

            chart: {
                id: "area-datetime"+number,
                type: "area",
                height: 350,
                zoom: { enabled: false },
                toolbar: { show: false },
            },
            dataLabels: { enabled: false },
            stroke: { curve: "smooth", width: 2 },
            xaxis: {
                type: "datetime",
                min: data.at(0)[0],
                labels: {
                    datetimeFormatter: {
                        year: "yyyy",
                        month: "MMM 'yy",
                        day: "dd MMM",
                        hour: "HH:mm",
                    },
                },
            },
            yaxis: { type: "numeric" },
            tooltip: { x: { format: "dd MMM yyyy" } },
            fill: {
                colors: ["#4CAF50"],
                type: "gradient",
                gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.7, stops: [100, 100] },
            },
        }
    };
    const [state, setState] = useState(options);
    useEffect(() => {
        setState(options)
    }, [response]);

    function priceChange(activeEl, timeline){
        var pcs = document.querySelectorAll(".priceChange"+number);
        Array.prototype.forEach.call(pcs, function (pc) {
          pc.remove();
        });
        const notification = document.createElement("div");
        const triangulo = document.createElement("div");
        notification.innerText = response.data.priceChange[timeline] >= 0.00 ? `+${response.data.priceChange[timeline].toFixed(2)}%` : response.data.priceChange[timeline].toFixed(2) + "%";
        notification.className = "priceChange"+number;
        notification.style.position = "absolute";
        notification.style.left = `${activeEl.target.offsetLeft + 20 - notification.offsetWidth}px`;
        notification.style.top = `${activeEl.target.offsetTop + 30}px`;;
        notification.style.color = "#FFFFFF";
        notification.style.zIndex = "1000";
        notification.style.backgroundColor =  response.data.priceChange[timeline] >= 0.00 ? "#4CAF50" : "#FF0000";
        notification.style.padding = "5px 10px";
        notification.style.borderRadius = "5px";
        triangulo.className = "priceChange"+number;
        triangulo.style.clipPath = "polygon(50% 0%, 100% 50%, 0% 50%)";
        triangulo.style.position = "absolute";
        triangulo.style.padding = "10px 15px";
        triangulo.style.backgroundColor = response.data.priceChange[timeline] >= 0.00 ? "#4CAF50" : "#FF0000";
        triangulo.style.left = `${activeEl.target.offsetLeft + 23}px`;


        activeEl.target.appendChild(notification);
        activeEl.target.appendChild(triangulo);


        setTimeout(() => {
          notification.remove();
          triangulo.remove();
        }, 3000);
    }

    const updateData = (e, timeline) => {
        setState({
            selection: timeline
        })

        switch (timeline) {
            case 'one_month':

                ApexCharts.exec(
                    'area-datetime'+number,
                    'zoomX',
                    new Date(data.at(-1)[0] - 30 * 24 * 60 * 60 * 1000).getTime(),
                    data.at(-1)[0],
                )
                priceChange(e, timeline)
                break
            case 'six_month':
                ApexCharts.exec(
                    'area-datetime'+number,
                    'zoomX',
                    new Date(data.at(-1)[0] - 6 * 30 * 24 * 60 * 60 * 1000).getTime(),
                    data.at(-1)[0],
                )
                priceChange(e, timeline)

                break
            case 'one_year':
                ApexCharts.exec(
                    'area-datetime'+number,
                    'zoomX',
                    new Date(data.at(-1)[0] - 365 * 24 * 60 * 60 * 1000).getTime(),
                    data.at(-1)[0],
                )
                priceChange(e, timeline)

                break
            case 'ytd':
                ApexCharts.exec(
                    'area-datetime'+number,
                    'zoomX',
                    new Date(new Date(data.at(-1)[0]).getFullYear(), 0, 1).getTime(),
                    data.at(-1)[0],
                )
                priceChange(e, timeline)

                break
            case 'all':
                ApexCharts.exec(
                    'area-datetime'+number,
                    'zoomX',
                    data.at(0)[0],
                    data.at(-1)[0],
                )
                priceChange(e, timeline)
                break

            default:
        }
    }


    return (
        <div id="chart" className="mx-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className="grid grid-cols-5 gap-4 max-w-md sm:self-center">
              <button id={"one_month"+number}
                  onClick={(e) => updateData(e, 'one_month')} 
                  className={`col-span-1 hover:font-semibold hover:cursor-pointer ${state.selection === 'one_month' ? 'font-bold' : ''}`}>
                1M
              </button>
               
              <button id={"six_month"+number}
                  onClick={(e) => updateData(e, 'six_month')} 
                  className={`col-span-1 hover:font-semibold hover:cursor-pointer ${state.selection === 'six_month' ? 'font-bold' : ''}`}>
                6M
              </button>
               
              <button id={"one_year"+number}
                  onClick={(e) => updateData(e, 'one_year')} 
                  className={`col-span-1 hover:font-semibold hover:cursor-pointer ${state.selection === 'one_year' ? 'font-bold' : ''}`}>
                1Y
              </button>
               
              <button id={"ytd"+number}
                  onClick={(e) => updateData(e, 'ytd')} 
                  className={`col-span-1 hover:font-semibold hover:cursor-pointer ${state.selection === 'ytd' ? 'font-bold' : ''}`}>
                YTD
              </button>
               
              <button id={"all"+number}
                  onClick={(e) => updateData(e, 'all')} 
                  className={`col-span-1 hover:font-semibold hover:cursor-pointer ${state.selection === 'all' ? 'font-bold' : ''}`}>
                ALL
              </button>
            </div>
          
            <div id={"chart-timeline"+number}>
                <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
            </div>
      </div>
    );
}





export default PriceChart;